/**
 * Created by MRG on 12/12/14 AD.
 */

var mongoose     = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
mongoose.plugin(mongoosePaginate);
var Schema       = mongoose.Schema;

var ImagesSchema   = new Schema({
    base64data : { type : String } ,
    name : { type : String } ,
    image_info: {
        dimensions: {
            width : { type : Number } ,
            height : { type : Number }
        },
        type: { type: String }
    } ,
    create_date : { type: String }
});

module.exports = mongoose.model('Images', ImagesSchema);