
/**
 * Module dependencies.
 */

var debug = require('debug')('co-views');
var render = require('co-render');
var path = require('path');
var extname = path.extname;
var join = path.join;

/**
 * Environment.
 */

var env = process.env.NODE_ENV || 'development';

/**
 * Pass views `dir` and `opts` to return
 * a render function.
 *
 *  - `map` an object mapping extnames to engine names [{}]
 *  - `default` default extname to use when missing [html]
 *  - `cache` cached compiled functions [NODE_ENV != 'development']
 *
 * @param {String} [dir]
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

module.exports = function(dir, opts){
  opts = opts || {};

  debug('views %s %j', dir, opts);

  // view directory
  dir = dir || 'views';

  // default extname
  var ext = opts.ext || opts.default || 'html';

  // engine map
  var map = opts.map || {};

  // engine settings
  var settingsMap = opts.settingsMap || {};

  // cache compiled templates
  var cache = opts.cache;
  if (null == cache) cache = 'development' != env;

  return function(view, locals){
    locals = locals || {};

    // default extname
    var e = extname(view);

    if (!e) {
      e = '.' + ext;
      view += e;
    }

    // remove leading '.'
    e = e.slice(1);

    // map engine
    locals.engine = map[e] || e;

    // map engine settings
    if (settingsMap[locals.engine]) {
      locals.engineSettings = settingsMap[locals.engine];
    }

    // resolve
    view = join(dir, view);

    // cache
    locals.cache = cache;

    debug('render %s %j', view, locals);
    return render(view, locals);
  };
};
