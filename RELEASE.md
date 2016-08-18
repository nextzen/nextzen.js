Mapzen.js Release process
====

We publish Mapzen.js using [Github’s release process](https://github.com/blog/1547-release-your-software). When a commit is tagged as a release with a version number, a deploy script delivers a new version of mapzen.js (including npm package) and documentation. Mapzen.js should be released whenever there is a change of version number. Mapzen.js follows [Semver](http://semver.org/) rules to decide when to bump up the version number.

Detailed release process:

1. After changes that need new release are merged to master branch, go to release tab on Mapzen.js repo page.
2. Click 'Draft a new release' button.
3. Put version number matching the pattern of `release-v*.*.*` (ex.`release-v0.3.0`)]
4. Write a release title reflecting main changes in the version. Details can go to the log part.
5. Click 'Publish release' button. (Hit that green button!)

When proper version number of Mapzen.js is tagged, CircleCI (our continous integration system) executes [the deploy script](https://github.com/mapzen/mapzen.js/blob/master/deploy.sh). The script puts a new version of mapzen.js in S3 bucket which can be accessed through mapzen CDN, released npm package with new version number, and copy documents in `docs` folder to S3 bucket so that it can be scraped by docs-generator.
