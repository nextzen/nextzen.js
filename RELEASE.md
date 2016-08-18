Mapzen.js Release process
====

Mapzen.js is released through [git release process](https://github.com/blog/1547-release-your-software). Once the commit is tagged as a release with version number, deploy script is going to be run delivering new version of mapzen.js (including npm package) and documentation. Mapzen.js should be relased whenever there is a change of version number. Mapzen.js follows [Semver](http://semver.org/) rule to decided when to bump up the version number. Detailed release process is below.


1. After changes that need new release are merged to master branch, go to release tab on Mapzen.js repo page.
2. Click 'Draft a new release' button.
3. Put version number matching the pattern of `release-v*.*.*` (ex.`release-v0.3.0`)]
4. Make release title to reflect main changes of the version. Details can go to the log part.
5. Click 'Publish release' button. (Hit that green button!)

When proper version number of Mapzen.js is tagged, CircleCI(Continous integration system Mapzen.js is using) is going to execute [deploy script](https://github.com/mapzen/mapzen.js/blob/master/deploy.sh). The script puts new version of mapzen.js in s3 bucket which can be accessed through mapzen cdn, released npm package with new version number, and copy documents in `docs` folder to s3 bucket so that it can be scraped by docs-generator.
