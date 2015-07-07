# superagent-rx

> A plugin for superagent that allows getting results as Rx.Observable.

## Installation

Install with [npm](http://npmjs.org):

    $ npm install superagent-rx

## Usage

```js
var superagent = require('superagent');
// load and apply plugin
var superagentRx = require('superagent-rx');
superagentRx(superagent);

superagent
  .get(requestUrl)
  .observe() // this returns Rx.Observable
  .subscribe(function(res) {
      should(res.body.test).equal('OK');
      done();
  });
```

## License

[MIT](http://www.opensource.org/licenses/mit-license)
