var mongoose = require('mongoose');


// Connection URL


var imgschema=mongoose.Schema({
    imgname:{
        type:String
    },
    username:{
        type:String
    },
    address:{
        type:String
    },
    payment:{
        type:String
    }
});
var shoppingcart=mongoose.model('shoppingcart',imgschema);
module.exports=shoppingcart;
