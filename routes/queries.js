var db = require('../modules/dbconn');

exports.login = function(req,res){
    db.User.find({username:req.body.user}, function(err,user){
        if(err || user.length === 0){
            console.log(req.body);
            res.render('index',{title:'Login',error:'Wrong username or password'});
        }
        else{
            console.log(user);
            req.session.kissa = true;
            res.redirect("getUsers");
        }
    });
}

exports.addUser = function(req,res){
    //Check that all fields are filled
    if(req.body.user == "" || req.body.pswd =="" || req.body.email == ""){
        res.render('register',{error:'Empty fields not allowed'});
    }
    else{
        console.log(req.body);

        var temp = new db.User({
            username:req.body.user,
            password:req.body.pswd,
            email:req.body.email
        });

        temp.save(function(err){
            if(err){
                console.log(err);
                res.render('register',{error:'Username not allowed'});
            }
            else{
                console.log("All ok");
                res.status(301);
                res.setHeader('location','http://localhost:3000');
                res.redirect('/');
            }
        });
    }
}

exports.getUsers = function(req,res){
    console.log('getUsers');
    db.User.find(function(err,data){
       
        if(err){
            res.render("myerror",{});
        }
        else{
            console.log(data);
            res.render('names',{username:req.body.username, addressbook:data});
        }
    });
}

exports.addAddress = function(req,res){
    if(req.body.user == "" || req.body.pswd =="" || req.body.email == ""){
        res.render('address',{error:'Empty fields not allowed'});
    }
    else{
        console.log(req.body);

        var temp = new db.Address({
            name:req.body.name,
            address:req.body.address,
            password:req.body.pswd,
            email:req.body.email,
            birthday:req.body.birthday
        });

        temp.save(function(err){
            if(err){
                console.log(err);
                res.render('address',{error:'There is something wrong'});
            }
            else{
                console.log("All ok");
                res.status(301);
                res.setHeader('location','http://localhost:3000/login');
                res.redirect('/getUsers');
            }
        });
    }
}
