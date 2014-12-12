var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var sizeOf = require('image-size');
var readChunk = require('read-chunk');
var imageType = require('image-type');
var Images  = require('../models/images');
var helper = require('../helper/helper');


router.get('/', function(request, response) {
  res.render('index', { title: 'MediaBox' });
  console.log("GET");
});

router.get('/:id', function(request, response) {
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
      response.json({
        "error_code": "100",
        "error_message": "no object id",
        "date_time": helper.getTimeStamp()
      });
    } else {
      console.log("public/uploads/"+img.name);
      fs.remove("public/uploads/"+img.name, function(err) {
        if (err) {
          response.json({
            "error_code": "100",
            "error_message": err,
            "date_time": helper.getTimeStamp()
          });
        } else {
          Images.remove({ _id: request.params.id }, function(err) {
            if (err) {
              response.json({
                "error_code": "100",
                "error_message": "error delete db",
                "date_time": helper.getTimeStamp()
              });
            } else {
              response.json({
                "error_code": "0",
                "error_message": "successfully deleted",
                "date_time": helper.getTimeStamp()
              });
            }
          });
        }
      })
    }
  });
});

router.post("/", function(request, response){
  console.log("POST UPLOAD");
  if ( 'images' in request.body && typeof request.body.images == "string" ) {

    // decode image
    var decodedImage = new Buffer(request.body.images, 'base64');
    // random file name
    var fileName = helper.randomAsciiString(32);

    // write file
    fs.writeFile("public/uploads/"+fileName, decodedImage, function (err) {
      if (err) {
        console.log(err);
        response.json({
          "error_code": "100",
          "error_message": err,
          "date_time": helper.getTimeStamp()
        });
      } else {

        // get dimesions
        var dimensions = sizeOf("public/uploads/"+fileName);
        // get type
        var imgType = imageType(readChunk.sync("public/uploads/"+fileName, 0, 12));
        var extAllow = ['jpg','png','jpge','JPG'];

        // check file ext
        if (extAllow.indexOf(imgType) == -1 ) {
          response.json({
            "error_code": "104",
            "error_message": "ext not allow",
            "date_time": helper.getTimeStamp()
          });
          return;
        }

        // rename file
        fs.rename("public/uploads/"+fileName, "public/uploads/"+fileName+"."+imgType, function(err) {
          if ( err ) {
            console.log('ERROR: ' + err);
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
                console.log('error');
                response.json({
                  "error_code": "102",
                  "error_message": "save to mongodb error",
                  "date_time": helper.getTimeStamp()
                });
              } else {
                var r = resSave.toObject();
                delete r.name;
                response.json(r);
                console.log(r);
              }
            });
          }
        });
      }
    });
    // end write file
  } else {
    // response upload error
    response.json({
      "error_code": "101",
      "error_message": "require images base64",
      "date_time": helper.getTimeStamp()
    });
  }
});


module.exports = router;
