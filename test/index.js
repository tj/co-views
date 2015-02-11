
var assert = require('assert');
var views = require('..');
var co = require('co');

describe('views', function(){
  it('should render jade template', function(){
    return co(function *(){
      var render = views(__dirname + '/fixtures');

      var tobi = {
        name: 'tobi',
        species: 'ferret'
      };

      var html = yield render('user.jade', { user: tobi });
      assert.equal(html, '<p>tobi is a ferret</p>');
    })
  })

  it('should merge opts.locals', function(){
    return co(function *(){
      var tobi = {
        name: 'tobi',
        species: 'ferret'
      };

      var render = views(__dirname + '/fixtures', {
        locals: {
          user: tobi
        }
      });

      var html = yield render('user.jade');
      assert.equal(html, '<p>tobi is a ferret</p>');
    })
  })
})
