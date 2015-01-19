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
    res.render("address",{title:"New Address", error:""});
}

/*
router.error = function(req,res){

}*/
module.exports = router;
