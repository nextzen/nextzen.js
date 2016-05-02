### Eraser Map for web

Eraser Map is a web map using the Bubble Wrap Tangram style, with future plans to integrate Mapzen Search and Mapzen Turn-by-Turn Directions.

## Installation

To get started, download the repo and run
`npm install`

We are using browserify to bundle up the JS scripts, to generate a new bundle run
`npm run build`

Testing is set up with CircleCI and Browserstack, and tied together with Karma. The /test folder contains our tests, written in Mocha. To run the test suite, run
`npm test`