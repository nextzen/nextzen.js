Mapzen.js Release process
====

### Overview

We publish mapzen.js using [Github’s release process](https://github.com/blog/1547-release-your-software). When a commit is tagged as a release with a version number, a deploy script delivers a new version of mapzen.js (including npm package) and documentation.  Mapzen.js follows [SemVer](http://semver.org/) versioning rules. Releases are made at authors' discretion. Please note that `master` may be ahead of the latest release.

### Steps to release

1. Merge code _and documentation_ changes into master branch
2. Click "Draft a new release" on mapzen.js [release page](https://github.com/mapzen/mapzen.js/releases)
3. Tag version should use the following pattern: `release-vX.Y.Z` (ex.`release-v0.3.0`)
4. Release title should be the version number: `vX.Y.Z`
5. Description should be a list of changes organized into “Enhancements”, “Bug Fixes”, or "Misc".  Be thorough as this serves as our changelog.  If you are updating the version number of an upstream project (especially [Leaflet](https://github.com/Leaflet/Leaflet) and [Tangram](https://github.com/tangrams/tangram)), please include a link to the project's changelog.
6. Click “Publish release” button.

Once a version has been released, CircleCI will kick off the deploy script. The script adds the new version of mapzen.js to our CDN, releases the npm package with new version number, and copies documents in the [/docs](https://github.com/mapzen/mapzen.js/tree/master/docs) folder to an S3 bucket so that it can be scraped by mapzen-docs-generator.

