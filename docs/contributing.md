---
layout: page
title: Notes for contributors
---

## Branches

All work should be done on branches, avoid working directly in `develop` (we may look at protecting the `develop` branch in the future).

* Always branch from `develop`
* Branch names **should be descriptive**. Avoid only using a GitHub/Jira ticket reference as these mean nothing to anyone outside Jadu looking at our repository.
* If a branch relates to a Jira ticket, use this at the start of the branch name in the same way e.g. `CMS-1234_my-awesome-feature`
* Don't tempt fate, push to your remote branch often, don't let loads of commits sit locally on your machine

## Commit messages

A properly formed git commit subject line should always be able to complete the following sentence:

> If applied, this commit will [your subject line here]

* Use [imperitive mood](https://en.wikipedia.org/wiki/Imperative_mood) as much as possible
* Don't detail the 'how', that's what the diff is for, explain the 'what' and 'why'
* Don't say 'Changed margins on main link' when saying 'Stop main link breaking out of the container' is much more useful to the person reviewing the code
* Unless there's an explicit reason for the change and they're in their own commit, dependencies and lockfiles can simply use 'Deps' or 'Lockfile' as their commit message
* If a commit message [references a GitHub issue](https://help.github.com/articles/closing-issues-via-commit-messages/), the related issue will be closed when the commit is merged


## Pull requests

* All pull requests should be reviewed by at least one other member of the Pulsar team before merging
* Feel free to work in a [pull request first](https://medium.com/practical-blend/pull-request-first-f6bb667a9b6#.mvytekxic) kind of way, use the `in progress` label to let others know that your PR isn't ready for review or merge
* Add the `awaiting review` label when the PR is ready to be reviewed
* If a pull request description [references a GitHub issue](https://help.github.com/articles/closing-issues-via-commit-messages/), the related issue will be closed when the pull request is merged
* PRs will be normally be merged into `develop`

## Builds & testing

**Travis** [https://travis-ci.org/jadu/pulsar](https://travis-ci.org/jadu/pulsar)

Builds Pulsar and runs php & js unit tests.

**Code Coverage** [https://codecov.io/github/jadu/pulsar](https://codecov.io/github/jadu/pulsar)

Reports on unit test coverage.

# Definition of Done

Features written for the Pulsar-UI core should only be released when they meet the following criteria (where applicable):

* Documentation written and published to GitBook
* [Changelog](README.md) updated
* Codepen example created (for documentation)
* UI tested on [supported devices and browsers](browsers_and_devices.md)
* PHPUnit tests written and green
* No warnings on the `grunt pre-commit` task
* No errors (JS/CSS) in [supported browsers](browsers_and_devices.md)
* Any decrease in [code coverage](http://codecov.io/github/jadu/pulsar) should be discussed
* Passing [Travis build task](http://travis-ci.org/jadu/pulsar)
