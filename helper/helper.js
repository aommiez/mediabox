/**
 * Created by MRG on 12/12/14 AD.
 */
var crypto = require('crypto');
var helper = exports;

helper.decodeBase64Image = function(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

helper.checkBase64 = function (raw) {
    return raw && typeof(raw) == 'string' && raw.match(/^data:image\/png;base64,/)
}

helper.randomString = function (length, chars) {
    if(!chars) {
        throw new Error('Argument \'chars\' is undefined');
    }

    var charsLength = chars.length;
    if(charsLength > 256) {
        throw new Error('Argument \'chars\' should not have more than 256 characters'
        + ', otherwise unpredictability will be broken');
    }

    var randomBytes = crypto.randomBytes(length)
    var result = new Array(length);

    var cursor = 0;
    for (var i = 0; i < length; i++) {
        cursor += randomBytes[i];
        result[i] = chars[cursor % charsLength]
    };

    return result.join('');
}


helper.randomAsciiString = function randomAsciiString(length) {
    return this.randomString(length,
        'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789');
}

helper.getTimeStamp = function () {
    var now = new Date();
    return now.getTime();
}

module.exports =  helper;
