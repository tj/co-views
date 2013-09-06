
/**
 * Module dependencies.
 */

var debug = require('debug')('co-views');
var render = require('co-render');
var path = require('path');
var extname = path.extname;
var join = path.join;

/**
 * Pass views `dir` and `opts` to return
 * a render function.
 *
 *  - `map` an object mapping extnames to engine names [{}]
 *  - `ext` default extname to use when missing [html]
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
  var ext = opts.ext || 'html';

  // engine map
  var map = opts.map || {};

  return function(view, locals){
    locals = locals || {};

    // default extname
    var e = extname(view);

    if (!e) {
      e = '.' + ext;;
      view += e;
    }

    // remove leading '.'
    e = e.slice(1);

    // map engine
    locals.engine = map[e] || e;

    // resolve
    view = join(dir, view);

    debug('render %s %j', view, locals);
    return render(view, locals);
  };
};
