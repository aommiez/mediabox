var express = require('express');
var router = express.Router();


router.get('/index', function (request, response) {
    response.render('admin', {title: 'Admin Media Box',});
});

module.exports = router;
