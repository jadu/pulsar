---
layout: page
title: Tagging a release
---

A new tag should be created when recent Pulsar changes are required for a co-inciding Continuum product release. CMS, XFP and CXM may lock to different Pulsar versions depending on which features they need for their most recent release.

* Merge `master` into `develop` (just in case previous version number bumps weren't brought into `develop`)
* Push `develop` (watch Travis for any build failures)
* Checkout `master`
* Merge `develop` into `master`
* Run `phpunit` and make sure tests pass
* Run `npm test` and make sure tests pass
* Run `grunt wraith` and observe/discuss any unexpected failures
* Bump the **major:minor:patch** version number as required using `grunt bump:major`, `grunt bump:minor` or  `grunt bump:patch`, this will also tag and push to the remote branch on GitHub
* [Travis](https://travis-ci.org/jadu/pulsar) will then build, run tests and create a release package on GitHub
* [Build and publish documentation](https://github.com/jadu/pulsar/wiki/Updating-Pulsar-Documentation) to GitHub pages
* Add the release notes to the [changelog](readme.md)
* Add the release notes to the [GitHub release](https://github.com/jadu/pulsar/releases)
* Attach any related GitHub issues and pull requests to a new [milestone](https://github.com/jadu/pulsar/milestones)
* 🎉
