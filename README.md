## Eraser Map for web

Eraser Map is a web map using the Bubble Wrap Tangram style.
* URLs that keep track of your location for easy sharing
* Raster tile fallback on browsers that don't support WebGL
* A rigorous test suite that uncludes both unit tests and integration tests

## Installation

To get started, clone the repo and run
```
npm install
```

We are using [Browserify](http://browserify.org/) to bundle up the Javascript files. To generate a new bundle.js run
```
npm run build
```

Testing is set up with [CircleCI](https://circleci.com/) and [Browserstack](https://www.browserstack.com/), and tied together with [Karma](https://karma-runner.github.io/0.13/index.html). The /test folder contains our tests, written in [Mocha](https://mochajs.org) and [Chai](http://chaijs.com/). To run the test suite, run
```
npm test
```
 
Keep in mind that you will need to set `BROWSERSTACK_USERNAME`, `BROWSERSTACK_KEY` [in your node env](https://github.com/browserstack/karma-browserstack-example#browserstack-configuration) before your test.

## Future Plans

We plan to use this repo to showcase the suite of Mapzen products, working in harmony together with easily shareable URLs.

* Mapzen Search to center the map
* Mapzen Turn-by-Turn to show multimodal directions
* Additional Tangram styles for the map
