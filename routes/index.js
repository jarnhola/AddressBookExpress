var express = require('express');
var router = express.Router();
db = require('../modules/dbconn');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index',{});
});

router.register = function(req,res){
    res.render("register",{});   
}

router.login = function(req,res){
    console.log(req.body);
    if(req.body.user=="jarno"){ 
        res.render("names",{});
    }
    else{
        console.log(req.body);
    }
}

module.exports = router;
