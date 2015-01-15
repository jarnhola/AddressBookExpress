var mongoose = require('mongoose');
var uri = "mongodb://localhost/users";

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

var users = new Schema({
    user:{type:String,index:{unique:true}},
    password:String,
    email:{type:String,format:{email:true}},
});

var User = mongoose.model("User", users);

var addresses = new Schema({
    name:String,
    address:String,
    email:{type:String,format:{email:true}},
    phonenumber:Number,
    bithday:Date
});

var Address = mongoose.model("Address", addresses);

exports.addUser = function(req,res){
    
    console.log(req.body);
    
    var temp = new User({
        name:req.body.user,
        password:req.body.password,
        email:req.body.email
    });
    
    temp.save(function(err){
        if(err){
            console.log(err);
            res.render("myerror",{});
        }
        else{
            res.redirect('/');
        }
    });
}

exports.getUsers = function(req,res){
 
    User.find(function(err,data){
       
        if(err){
            res.render("myerror",{});
        }
        else{
            res.render("names", {user_data:data}); //
        }
    });
}

exports.addAddress = function(req,res){

    console.log(req.body);
    
    var temp = new Address({
        name:req.body.user,
        password:req.body.password,
        email:req.body.email
    });
    
    temp.save(function(err){
        if(err){
            console.log(err);
            res.render("myerror",{});
        }
        else{
            res.redirect('/');
        }
    });
}
