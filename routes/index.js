var express = require('express');
var router = express.Router();
db = require('../modules/dbconn').getUsers;

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index',data);
    db(req,res);
});

router.register = function(req,res){
    res.render("user",{});   
}

module.exports = router;
