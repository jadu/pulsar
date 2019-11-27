# Contributing to Pulsar

* [Code of Conduct](https://github.com/jadu/pulsar/blob/develop/CODE_OF_CONDUCT.md)
* [Developer guide](https://pulsar.docs.jadu.net/guides/developer-guide)

## Branches

* Always branch from `develop`
* Branch names **should be descriptive**, prefaced with the GitHub issue number, e.g. `103_input-groups`
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
* Feel free to work in a [pull request first](https://medium.com/practical-blend/pull-request-first-f6bb667a9b6#.mvytekxic) kind of way, use a draft pull request to let others know that your PR isn't ready for review or merge
* If a pull request description [references a GitHub issue](https://help.github.com/articles/closing-issues-via-commit-messages/), the related issue will be closed when the pull request is merged
* PRs will be normally be merged into `develop`, there may be situations where a critical fix is released separately

## Builds & testing

**Travis** [https://travis-ci.org/jadu/pulsar](https://travis-ci.org/jadu/pulsar)

Builds Pulsar and runs php & js unit tests.

**Code Coverage** [https://codecov.io/github/jadu/pulsar](https://codecov.io/github/jadu/pulsar)

Reports on unit test coverage.

**Local JavaScript Test Suite**

The Pulsar test suite is configured to work in a regular chrome browser as well as a chrome headless environment.

Run tests in headless mode:

```
npm run test:headless

// watch

npm run test:headless -- --watch
```

Run tests in a local instance of chrome:

```
npm run test:browser

// watch

npm run test:browser:watch
```
