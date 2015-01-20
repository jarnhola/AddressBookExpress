var express = require('express');
var db = require('../modules/dbconn');
var queries = require('../routes/queries');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index',{});
});

router.register = function(req,res){
    res.render("register",{title:"New User", error:""});
}

router.address = function(req,res){
    if(req.session.logged){
        res.render("address",{title:"New Address", error:""});
    }
    else{
        res.render('index',{title:'Login',error:''});
    }
    
}

router.showUserData = function(req,res){
    if(req.session.logged){
        queries.getUsers(req,res);
    }
    else{
        res.render('index',{title:'Login',error:''});
    }
}

router.logout = function(req,res){
    req.session.destroy();
    res.render('index',{title:'Login',error:''});
}
module.exports = router;
