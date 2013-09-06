
# co-render

  Template rendering for [co](https://github.com/visionmedia/co) using 
  [co-render](https://github.com/visionmedia/co-render). This module
  provides higher level sugar than co-render to reduce redundancy,
  for example specifying a views directory and default extension name.

## Installation

```
$ npm install co-views
```

 And install whichever engine(s) you use:

```
$ npm install ejs jade
```

## Options

 - `map` an object mapping extnames to engine names [`{}`]
 - `ext` default esxtname to use when missing [`html`]

### map

  For example if you wanted to use "swig" for .html files
  you would simply pass:

```js
{ map: { html: 'swig' } }
```

### ext

  Set the default template extension when none is passed to 
  the render function. This defaults to "html". For example
  if you mostly use Jade, then you'd likely want to assign
  this to:

```js
{ ext: 'jade' }
```

  Allowing you to invoke `render('user')` instead of 
  `render('user.jade')`.

## Example

  Render several users with different template engines in parallel:

```js
var co = require('co');
var views = require('co-views');

var render = views('examples', {
  map: { html: 'swig' }
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
  var a = render('user', { user: tobi });
  var b = render('user.jade', { user: loki });
  var c = render('user.ejs', { user: luna });
  var html = yield [a, b, c];
  html = html.join('');
  console.log(html);
});
```

# License

  MIT