var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/graphs')
});

router.get('/graphs', function(req, res, next) {
  res.render('graph', { title: 'GraphFlow' });
})


module.exports = router;
