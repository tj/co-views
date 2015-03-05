/**
 * Module dependencies.
 */

var co = require('co');
var views = require('..');

var render = views('examples', {
  ext: 'dust'
});

var tobi = {
  name: 'tobi',
  species: 'ferret'
};

var loki = {
  name: 'loki',
  species: 'ferret'
};

var luna = {
  name: 'luna',
  species: 'cat'
};

co(function *(){
  var a = render('ring', { user: tobi });
  var b = render('user.jade', { user: loki });
  var c = render('user.ejs', { user: luna });
  var html = yield [a, b, c];
  html = html.join('');
  console.log(html);
});