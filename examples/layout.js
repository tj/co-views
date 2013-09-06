
/**
 * Module dependencies.
 */

var co = require('co');
var views = require('..');

var render = views('examples', {
  ext: 'ejs'
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

var db = {
  users: [tobi, loki, luna]
};

co(function *(){
  var users = yield renderEach('user', db.users);
  var html = yield render('layout', { title: 'Users', body: users });
  console.log(html);
});

/**
 * Render each `objs` with template `name`.
 *
 * This function executes render() calls in parallel,
 * but retains order, since co's array support
 * assigns results properly for us:
 *
 * https://github.com/visionmedia/co/blob/master/index.js#L148
 *
 * This is effectively equivalent to:
 *
 *   var a = render('user', { user: tobi });
 *   var b = render('user', { user: loki });
 *   var c = render('user', { user: jane });
 *   return a + b + c;
 *
 * @param {String} name
 * @param {Array} objs
 * @return {String}
 * @api public
 */

function *renderEach(name, objs) {
  var res = yield objs.map(function(obj){
    var opts = {};
    opts[name] = obj;
    return render(name, opts);
  });

  return res.join('\n');
}