var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var sizeOf = require('image-size');
var readChunk = require('read-chunk');
var imageType = require('image-type');
var Images  = require('../models/images');
var helper = require('../helper/helper');
var rh = require('../helper/response')
var apicache = require('apicache').options({ debug: true }).middleware;


router.get('/', function(request, response) {
  response.render('index', { title: 'MediaBox' });
  response.send("welcome to media box");
});

router.get('/:id/info', apicache('5 minutes'), function(request, response) {
  Images.findById(request.params.id, function(err, img) {
    if (err) {
      response.send(err);
    } else {
      response.json(img);
    }
  });
});

router.delete('/:id', function(request, response){
  Images.findById(request.params.id, function(err, img) {
    if ( img == null || err) {
      rh.renderMsg(response,"no object id");
    } else {
      fs.remove("public/uploads/"+img.name, function(err) {
        if (err) {
          rh.renderMsg(response,err);
        } else {
          Images.remove({ _id: request.params.id }, function(err) {
            if (err) {
              rh.renderMsg(response,"error delete db");
            } else {
              rh.renderMsg(response, "successfully deleted");
            }
          });
        }
      })
    }
  });
});

router.post("/", function(request, response){
  console.log("POST UPLOAD");
  var data = request.body.images;
  if ( typeof data == "string") {
    if ( 'images' in request.body && typeof data == "string" ) {

      // decode image
      var decodedImage = new Buffer(request.body.images, 'base64');
      // random file name
      var fileName = helper.randomAsciiString(32);

      // write file
      fs.writeFile("public/uploads/"+fileName, decodedImage, function (err) {
        if (err) {
          rh.renderMsg(response,err);
        } else {

          // get dimesions
          var dimensions = sizeOf("public/uploads/"+fileName);
          // get type
          var imgType = imageType(readChunk.sync("public/uploads/"+fileName, 0, 12));
          var extAllow = ['jpg','png','jpge','JPG'];

          // check file ext
          if (extAllow.indexOf(imgType) == -1 ) {
            rh.renderMsg(response, "ext not allow");
            return;
          }

          // rename file
          fs.rename("public/uploads/"+fileName, "public/uploads/"+fileName+"."+imgType, function(err) {
            if ( err ) {
              rh.renderMsg(response,err);
            } else {
              fs.chmodSync("public/uploads/"+fileName+"."+imgType, 0777);
              var images = new Images({
                base64data : request.body.images ,
                name : fileName+"."+imgType ,
                image_info: {
                  dimensions: {
                    width : dimensions.width ,
                    height : dimensions.height
                  },
                  type: imgType
                } ,
                create_date : helper.getTimeStamp()
              });

              images.save(function (err,resSave) {
                if (err) {
                  rh.renderMsg(response,err);
                } else {
                  var r = resSave.toObject();
                  delete r.name;
                  response.json(r);
                }
              });
            }
          });
        }
      });
      // end write file
    } else if ( 'images' in request.body ) {

    } else {
      // response upload error
      rh.renderMsg(response,"require images base64");
    }
  } else if (typeof data == "object")  {
    var resArr = [];
    //console.log(data);
    for (var i in data) {

      // decode image
      var decodedImage = new Buffer(data[i], 'base64');
      // random file name
      var fileName = helper.randomAsciiString(32);


      fs.writeFileSync("public/uploads/"+fileName, decodedImage);
      // end write file

      // get dimesions
      var dimensions = sizeOf("public/uploads/"+fileName);
      // get type
      var imgType = imageType(readChunk.sync("public/uploads/"+fileName, 0, 12));
      var extAllow = ['jpg','png','jpge','JPG'];

      // check file ext
      if (extAllow.indexOf(imgType) == -1 ) {
        rh.renderMsg(response, "ext not allow");
        return;
      }

      fs.renameSync("public/uploads/"+fileName, "public/uploads/"+fileName+"."+imgType);
      fs.chmodSync("public/uploads/"+fileName+"."+imgType, 0777);

      var images = new Images({
        base64data : data[i] ,
        name : fileName+"."+imgType ,
        image_info: {
          dimensions: {
            width : dimensions.width ,
            height : dimensions.height
          },
          type: imgType
        } ,
        create_date : helper.getTimeStamp()
      });
      //console.log(images);

      images.save(function (err,resSave) {
        if (err) {
          rh.renderMsg(response,err);
        } else {
          var r = resSave.toObject();
          delete r.name;
          //response.json(r);
          resArr.push(r);
          //console.log(resSave);
          if (resArr.length == data.length ) {
            response.send(resArr);
          }
        }
      });
    }
  }

});

module.exports = router;
