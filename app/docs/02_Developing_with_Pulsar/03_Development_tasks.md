There are a handful of tasks which can be used to aid development.

## Pre-commit checks

The following checks and tasks are run ever time you commit changes to the pulsar repository, if any of them fail you must resolve the issue before comitting.

 * Run unit tests
 * Check all js, css, scss, twig files use spaces instead of hard-tabs
 * Update the README file with the contents of /docs/01_Getting_started/01_Installation.md

You can run these checks manually (without needing to commit) with: 

    $ grunt pre-commit

## Unit tests

All PHP code should have unit tests written to test functionality, you can run the unit tests with:

    $ grunt phpunit

The unit tests are also run as part of pre-commit and build tasks.

## Smoke test

The smoke test takes screenshots of each tab in the /lexicon example and places them in `/tmp/screenshots` as a baseline. Subsequent runs of the smoke test takes another set of screenshot and compares them to the baseline and reports back on any differences (failures). 

The resulting failure image diffs are placed in `/tmp/failures`

Run the smoke test with:

    $ grunt smoketest