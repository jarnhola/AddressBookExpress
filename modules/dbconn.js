var mongoose = require('mongoose');
var uri = "mongodb://localhost/addressbook";

//Check if we can connect to mongodb...
mongoose.connect(uri,function(err,succ){
    if(err){
        console.log("Error: " + err);
    }
    else{
        console.log("Nicely connected to " + uri);
    }
});

var Schema = mongoose.Schema;

var user = new Schema({
    username:{type:String,index:{unique:true}},
    password:String,
    email:{type:String,format:{email:true}},
});

var address = new Schema({
    user:String,
    name:String,
    address:String,
    email:String,
    phone:String,
    birthday:String
});

var User = mongoose.model("User", user);
var Address = mongoose.model("Address", address);

exports.User = User;
exports.Address = Address;