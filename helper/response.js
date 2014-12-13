/**
 * Created by MRG on 12/13/14 AD.
 */

var response = exports;
var helper = require('../helper/helper');

response.renderMsg = function ($response, $msg ) {
    return $response.json({
        "message": $msg,
        "date_time": helper.getTimeStamp()
    });
}

module.exports =  response;