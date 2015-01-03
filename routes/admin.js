var express = require('express');
var Images = require('../models/images');
var router = express.Router();


router.get('/index', function (request, response) {
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
    Images.paginate({}, pages, limit, function(error, pageCount, paginatedResults, itemCount) {
        if (error) {
            console.error(error);
        } else {
            r.push({page_count: pageCount});
            r.push({data : paginatedResults});
            if (pages < pageCount ) {
                r.push({next:hostname+"/"+(parseInt(pages)+1) +"/"+limit});
            }
            if (pages > 1 ) {
                r.push({prev:hostname+"/"+(parseInt(pages)-1) +"/"+limit});
            }
            console.log('Pages:', pageCount);
            console.log(r);
            response.render('admin', {result : JSON.stringify(r)});
        }
    }, { columns: 'name create_date image_info' });

});

module.exports = router;
