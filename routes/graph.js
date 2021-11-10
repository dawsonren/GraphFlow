var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  res.send(`graph ${req.params.id}`);
});

router.post('/create/', function(req, res, next) {
  console.log('create a graph');
  res.redirect('graphs')
});

router.put('/:id/update/', function(req, res, next) {
  console.log(`update the graph ${req.params.id}`);
  res.redirect(`graph/${req.params.id}`)
});

router.delete('/:id/delete/', function(req, res, next) {
  res.send(`delete the graph ${req.params.id}`);
  res.redirect('graphs')
});

module.exports = router;
