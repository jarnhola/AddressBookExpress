var db = require('../modules/dbconn');

exports.login = function(req,res){
    db.User.find({username:req.body.user,password:req.body.pswd}, function(err,user){
        if(err || user.length === 0){
            console.log(req.body);
            res.render('index',{title:'Login',error:'Wrong username or password'});
        }
        else{
            console.log(user);
            req.session.logged = true;
            req.session.username = user[0].username;
            res.redirect('/getItems');
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

        // Create new User
        var temp = new db.User({
            username:req.body.user,
            password:req.body.pswd,
            email:req.body.email
        });

        temp.save(function(err){
            if(err){
                console.log(err);
                res.render('register',{error:'already in use'});
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
    db.Address.find({user:req.session.username},function(err,data){
        if(err){
            res.render("myerror",{});
        }
        else{
            console.log(data);
            res.render('names',{username:req.session.username, addressbook:data});
        }
    });
}

exports.addAddress = function(req,res){
    console.log(req.body);

    var temp = new db.Address({
        user:req.session.username,
        name:req.body.name,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone,
        birthday:new String(req.body.birthday)
    });

    temp.save(function(err){
        if(err){
            console.log(err);
            res.render('address',{error:'Can not save new contact'});
        }
        else{
            res.redirect('/getItems');
        }
    });
}

exports.getContactInfo = function(req,res){
    if(req.session.logged)
    {
        db.Address.findById(req.query.id,function(err,data){
            if(err){
                res.render('error');
            }
            else{
                res.render('addresspage',data);
            }
        });
    }
    else{
        res.render('index',{title:'Login',error:''});
    }
}