var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var sizeOf = require('image-size');
var readChunk = require('read-chunk');
var imageType = require('image-type');
var Images = require('../models/images');
var helper = require('../helper/helper');
var rh = require('../helper/response')
var apicache = require('apicache').options({debug: true}).middleware;
var lwip = require('lwip');

router.get('/', function (request, response) {
    response.render('index');
});


/**
 * @api {get} /list Get images List
 * @apiName GetImagesList
 * @apiGroup Images
 * @apiVersion 1.0.0
 * @apiDescription Request images List
 * default pages = 1 , limit = 10
 *
 *
 *
 * @apiSuccess {String} page_count page count results
 * @apiSuccess {Object} data data list object
 * @apiSuccess {String} data.name images file name
 * @apiSuccess {String} data.create_date timestamp create images
 * @apiSuccess {Object} data.image_info  Images data (example for an Object)
 * @apiSuccess {String} data.image_info.type Images type
 * @apiSuccess {Object} data.image_info.dimensions Images dimensions data
 * @apiSuccess {String} data.images_info.dimensions.width Images Width
 * @apiSuccess {String} data.images_info.dimensions.height Images Height
 * @apiSuccess {String} next link next
 * @apiSuccess {String} prev link prev
 */
router.get('/list', function (request, response) {
    var pages = request.params.pages;
    var limit = request.params.limit;
    var hostname = request.headers.host;
    if (pages == null) {
        pages = 1;
    }
    if (limit == null) {
        limit = 10;
    }
    var r = [];
    Images.paginate({}, pages, limit, function (error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.error(error);
        } else {
            r.push({page_count: pageCount});
            r.push({data: paginatedResults});
            if (pages < pageCount) {
                r.push({next: hostname + "/" + (parseInt(pages) + 1) + "/" + limit});
            }
            if (pages > 1) {
                r.push({prev: hostname + "/" + (parseInt(pages) - 1) + "/" + limit});
            }
            //console.log('Pages:', pageCount);
            //console.log(paginatedResults);
            response.json(r);
        }
    }, {columns: 'name create_date image_info'});
});

/**
 * @api {get} /list/:pages/:limit Get images List Custom
 * @apiName GetImagesListCustom
 * @apiGroup Images
 * @apiVersion 1.0.0
 * @apiDescription Request images List Custom pages limit
 *
 *
 * @apiParam {String} pages pages item.
 * @apiParam {String} items per page.
 *
 * @apiSuccess {String} page_count page count results
 * @apiSuccess {Object} data data list object
 * @apiSuccess {String} data.name images file name
 * @apiSuccess {String} data.create_date timestamp create images
 * @apiSuccess {Object} data.image_info  Images data (example for an Object)
 * @apiSuccess {String} data.image_info.type Images type
 * @apiSuccess {Object} data.image_info.dimensions Images dimensions data
 * @apiSuccess {String} data.images_info.dimensions.width Images Width
 * @apiSuccess {String} data.images_info.dimensions.height Images Height
 * @apiSuccess {String} next link next
 * @apiSuccess {String} prev link prev
 *
 * @apiSuccessExample {JSON} Success-Response:
 * {
 *  "page_count": 10
 *  } ,
 *  {
 *  "data":
 *  {
 *      "_id": "548e6c1128a8b689031794d4",
 *      "name": "kapp9yMJbxqS5UWudDltOkuSZ6kQD2yU.jpg",
 *      "create_date": "1418619921738",
 *      "image_info": {
 *      "type": "jpg",
 *      "dimensions": {
 *          "width": 720,
 *          "height": 480,
 *          }
 *      }
 *  },{
 *      "next": "http://apibox.co:3000/list/2/2"
 *  }, {
 *      "prev": "http://apibox.co:3000/list/0/2"
 *  }
 */

router.get('/list/:pages/:limit', function (request, response) {
    var pages = request.params.pages;
    var limit = request.params.limit;
    var r = [];
    var hostname = request.headers.host;
    if (pages == null) {
        pages = 1;
    }
    if (limit == null) {
        limit = 10;
    }
    Images.paginate({}, pages, limit, function (error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.error(error);
        } else {
            r.push({page_count: pageCount});
            r.push({data: paginatedResults});
            if (pages < pageCount) {
                r.push({next: hostname + "/" + (parseInt(pages) + 1) + "/" + limit});
            }
            if (pages > 1) {
                r.push({prev: hostname + "/" + (parseInt(pages) - 1) + "/" + limit});
            }
            //console.log('Pages:', pageCount);
            //console.log(paginatedResults);
            response.json(r);
        }
    }, {columns: 'name create_date image_info'});
});


/**
 * @api {get} /:id Get images File
 * @apiName GetImagesOrignal
 * @apiGroup Images
 * @apiVersion 1.0.0
 * @apiDescription Request images File Orignal
 *
 *
 * @apiParam {String} id Images unique ID.
 *
 * @apiSuccess {Images} Images File
 *
 */

router.get('/:id', apicache('30 minutes'), function (request, response) {
    Images.findById(request.params.id, function (err, img) {
        if (err) {
            response.send(err);
        } else {
            var typeRes = "";
            if (img.image_info.type == "jpg" || img.image_info.type == "jpeg" || img.image_info.type == "jpe" || img.image_info.type == "JPG") {
                typeRes = "image/jpeg";
            } else if (img.image_info.type == "png") {
                typeRes = "image/png";
            }
            var buf = new Buffer(img.base64data, 'base64');
            response.setHeader('content-type', typeRes);
            response.send(buf);
        }
    });
});

/**
 * @api {get} /:id/custom/:width Get images File Fix Width
 * @apiName GetImagesFile
 * @apiGroup Images
 * @apiVersion 1.0.0
 * @apiDescription Request images File Fix Width Auto Height
 *
 *
 * @apiParam {String} id Images unique ID.
 * @apiParam {String} width value
 *
 * @apiSuccess {Images} Images File
 *
 */
router.get("/:id/custom/:width", function (request, response) {
    Images.findById(request.params.id, function (err, img) {
        if (err) {
            response.send(err);
        } else {
            var typeRes = "";
            var type = img.image_info.type;
            if (type == "jpg" || type == "jpeg" || type == "jpe") {
                typeRes = "image/jpeg";
            } else if (type == "png") {
                typeRes = "image/png";
            }
            lwip.open('public/uploads/' + img.name, function (err, image) {
                var ratio = request.params.width / image.width();
                image.scale(ratio, function (err, image) {
                    image.toBuffer(type, function (err, buffer) {
                        response.setHeader('content-type', typeRes);
                        response.send(buffer);
                    });
                });
            });
        }
    });
});
/**
 * @api {get} /:id/custom/:width/:height Get images Custom
 * @apiName GetImagesFileCustom
 * @apiGroup Images
 * @apiVersion 1.0.0
 * @apiDescription Request images File Custom
 *
 * @apiParam {String} id Images unique ID.
 * @apiParam {String} width width value param width = auto for auto width
 * @apiParam {String} height height value
 *
 * @apiSuccess {Images} Images File
 *
 */
router.get("/:id/custom/:width/:height", function (request, response) {
    Images.findById(request.params.id, function (err, img) {
        if (err) {
            response.send(err);
        } else {
            var typeRes = "";
            var type = img.image_info.type;
            if (type == "jpg" || type == "jpeg" || type == "jpe") {
                typeRes = "image/jpeg";
            } else if (type == "png") {
                typeRes = "image/png";
            }

            if (request.params.width == "auto") {
                lwip.open('public/uploads/' + img.name, function (err, image) {
                    var ratio = request.params.height / image.height();
                    image.scale(ratio, function (err, image) {
                        image.toBuffer(type, function (err, buffer) {
                            response.setHeader('content-type', typeRes);
                            response.send(buffer);
                            return;
                        });
                    });
                });
            } else {
                if (request.params.height == null) {
                    lwip.open('public/uploads/' + img.name, function (err, image) {
                        var ratio = request.params.width / image.width();
                        image.scale(ratio, function (err, image) {
                            image.toBuffer(type, function (err, buffer) {
                                response.setHeader('content-type', typeRes);
                                response.send(buffer);
                            });
                        });
                    });
                } else {
                    lwip.open('public/uploads/' + img.name, function (err, image) {
                        image.resize(parseInt(request.params.width), parseInt(request.params.height), function (err, image) {
                            image.toBuffer(type, function (err, buffer) {
                                response.setHeader('content-type', typeRes);
                                response.send(buffer);
                            });
                        });
                    });
                }
            }

        }
    });
});


/**
 * @api {get} /:id/info Get images information
 * @apiName GetImagesInfo
 * @apiGroup Images
 * @apiVersion 1.0.0
 * @apiDescription Request images information
 *
 *
 * @apiParam {String} id Images unique ID.
 *
 * @apiSuccess {String} _id id Images unique ID
 * @apiSuccess {String} base64data Images encode base64
 * @apiSuccess {String} create_date timestamp create images
 * @apiSuccess {Object} image_info  Images data (example for an Object)
 * @apiSuccess {String} image_info.type Images type
 * @apiSuccess {Object} image_info.dimensions Images dimensions data
 * @apiSuccess {String} images_info.dimensions.width Images Width
 * @apiSuccess {String} images_info.dimensions.height Images Height
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     {
 *      "__v": 0,
 *      "base64data": " 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",
 *      "create_date": "1418704580210",
 *      "_id": "548fb6c4eb5bd1b7046ba330",
 *      "image_info": {
 *           "type": "jpg",
 *      "dimensions": {
 *           "width": 720,
 *           "height": 480
 *     }
 *
 */
router.get('/:id/info', apicache('60 minutes'), function (request, response) {
    Images.findById(request.params.id, function (err, img) {
        if (err) {
            response.send(err);
        } else {
            response.json(img);
        }
    });
});


/**
 * @api {delete} /:id Delete Images
 * @apiName DeleteImages
 * @apiGroup Images
 * @apiVersion 1.0.0
 * @apiParam {String} id Images unique ID.
 *
 * @apiSuccess {String} message delete message response
 * @apiSuccess {String} date_time  delete time.
 *
 * @apiSuccessExample Success-Response:
 *     {
 *        "message": "successfully deleted",
 *        "date_time": 1418626576195
 *    }
 *
 */

router.delete('/:id', function (request, response) {
    Images.findById(request.params.id, function (err, img) {
        if (img == null || err) {
            rh.renderMsg(response, "no object id");
        } else {
            fs.remove("public/uploads/" + img.name, function (err) {
                if (err) {
                    rh.renderMsg(response, err);
                } else {
                    Images.remove({_id: request.params.id}, function (err) {
                        if (err) {
                            rh.renderMsg(response, "error delete db");
                        } else {
                            rh.renderMsg(response, "successfully deleted");
                        }
                    });
                }
            })
        }
    });
});

/**
 * @api {post} / Upload Images
 * @apiName UploadImages
 * @apiGroup Images
 * @apiVersion 1.0.0
 *
 * @apiParam {String} images Base64 encode ( array )
 *
 * @apiSuccess {String} _id id Images unique ID
 * @apiSuccess {String} base64data Images encode base64
 * @apiSuccess {String} create_date timestamp create images
 * @apiSuccess {Object} image_info  Images data (example for an Object)
 * @apiSuccess {String} image_info.type Images type
 * @apiSuccess {Object} image_info.dimensions Images dimensions data
 * @apiSuccess {String} images_info.dimensions.width Images Width
 * @apiSuccess {String} images_info.dimensions.height Images Height
 *
 * @apiSuccessExample {JSON} Success-Response:
 *     {
 *      "__v": 0,
 *      "base64data": " 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",
 *      "create_date": "1418704580210",
 *      "_id": "548fb6c4eb5bd1b7046ba330",
 *      "image_info": {
 *           "type": "jpg",
 *      "dimensions": {
 *           "width": 720,
 *           "height": 480
 *     }
 *
 */

router.post("/", function (request, response) {
    console.log("POST UPLOAD");
    var data = request.body.images;
    if (typeof data == "string") {
        if ('images' in request.body && typeof data == "string") {

            // decode image
            var decodedImage = new Buffer(request.body.images, 'base64');
            // random file name
            var fileName = helper.randomAsciiString(32);

            // write file
            fs.writeFile("public/uploads/" + fileName, decodedImage, function (err) {
                if (err) {
                    rh.renderMsg(response, err);
                } else {

                    // get dimesions
                    var dimensions = sizeOf("public/uploads/" + fileName);
                    // get type
                    var imgType = imageType(readChunk.sync("public/uploads/" + fileName, 0, 12));

                    var extAllow = ['jpg', 'png', 'jpge', 'JPG'];

                    // check file ext
                    if (extAllow.indexOf(imgType.ext) == -1) {
                        rh.renderMsg(response, "ext not allow");
                        return;
                    }

                    // rename file
                    fs.rename("public/uploads/" + fileName, "public/uploads/" + fileName + "." + imgType.ext, function (err) {
                        if (err) {
                            rh.renderMsg(response, err);
                        } else {
                            fs.chmodSync("public/uploads/" + fileName + "." + imgType.ext, 0777);
                            var images = new Images({
                                base64data: request.body.images,
                                name: fileName + "." + imgType.ext,
                                image_info: {
                                    dimensions: {
                                        width: dimensions.width,
                                        height: dimensions.height
                                    },
                                    type: imgType.ext
                                },
                                create_date: helper.getTimeStamp()
                            });

                            images.save(function (err, resSave) {
                                if (err) {
                                    rh.renderMsg(response, err);
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
        } else if ('images' in request.body) {

        } else {
            // response upload error
            rh.renderMsg(response, "require images base64");
        }
    } else if (typeof data == "object") {
        var resArr = [];
        //console.log(data);
        for (var i in data) {

            // decode image
            var decodedImage = new Buffer(data[i], 'base64');
            // random file name
            var fileName = helper.randomAsciiString(32);


            fs.writeFileSync("public/uploads/" + fileName, decodedImage);
            // end write file

            // get dimesions
            var dimensions = sizeOf("public/uploads/" + fileName);
            // get type
            var imgType = imageType(readChunk.sync("public/uploads/" + fileName, 0, 12));
            var extAllow = ['jpg', 'png', 'jpge', 'JPG'];

            // check file ext
            if (extAllow.indexOf(imgType.ext) == -1) {
                rh.renderMsg(response, "ext not allow");
                return;
            }

            fs.renameSync("public/uploads/" + fileName, "public/uploads/" + fileName + "." + imgType.ext);
            fs.chmodSync("public/uploads/" + fileName + "." + imgType.ext, 0777);

            var images = new Images({
                base64data: data[i],
                name: fileName + "." + imgType.ext,
                image_info: {
                    dimensions: {
                        width: dimensions.width,
                        height: dimensions.height
                    },
                    type: imgType.ext
                },
                create_date: helper.getTimeStamp()
            });
            //console.log(images);
            images.save(function (err, resSave) {
                if (err) {
                    rh.renderMsg(response, err);
                } else {
                    var r = resSave.toObject();
                    delete r.name;
                    //response.json(r);
                    resArr.push(r);
                    //console.log(resSave);
                    if (resArr.length == data.length) {
                        response.send(resArr);
                    }
                }
            });
        }
    }

});


module.exports = router;
