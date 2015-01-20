var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    if(req.session.logged === true)
    {
        res.send('secret');
        req.session.destroy(function(err) {});
    }
    else{
        res.redirect('/');
    }
    
});

module.exports = router;
