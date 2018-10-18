var mongoose = require('mongoose');


// Connection URL


var Userschema = mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    mno:{
        type:Number
    }
});

var User = mongoose.model('User',Userschema);
module.exports=User;