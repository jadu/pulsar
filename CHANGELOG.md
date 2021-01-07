# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/jadu/pulsar/issues?q=is%3Aclosed+milestone%3AUnreleased)
### Added
- Add CHANGELOG.md file [#1352](https://github.com/jadu/pulsar/pull/1352)

### Changed
- Sticky sidebar behaviour (used by XFP) is now more consistent and visually stable regardless of main content height [#1326](https://github.com/jadu/pulsar/pull/1326)

### Fixed
- Progress bar with warning state and a visible value failed colour contrast [#1350](https://github.com/jadu/pulsar/pull/1350)
- `form__group--top` modifier class now works when control label element is a `span` [#1330](https://github.com/jadu/pulsar/pull/1330)
- Form labels for choice block components are now properly aligned vertically with the inputs [#1332](https://github.com/jadu/pulsar/pull/1332)

### Security
- Stop (old) tooltip.js from directly interpreting selectors passed through options [#1359](https://github.com/jadu/pulsar/pull/1359)
- Add escaping on values which are extracted from DOM notes then output in the view [#1331](https://github.com/jadu/pulsar/pull/1331)
- Upgrade datatables.net-responsive-dt from 2.2.3 to 2.2.6 [#1336](https://github.com/jadu/pulsar/pull/1336)
- Upgrade datatables from 1.10.22 to 1.10.23 [#1346](https://github.com/jadu/pulsar/pull/1346)
- Upgrade datatables.net-buttons-dt from 1.6.1 to 1.6.5 [#1356](https://github.com/jadu/pulsar/pull/1356)
- Upgrade moment from 2.27.0 to 2.29.1 [#1357](https://github.com/jadu/pulsar/pull/1357)
- Upgrade timepicker from 1.13.3 to 1.13.16 [#1355](https://github.com/jadu/pulsar/pull/1355)
- Upgrade browser-sync from 2.17.3 to 2.26.13 [#1354](https://github.com/jadu/pulsar/pull/1354/)
- Upgrade grunt-real-favicon from 0.2.2 to 0.2.4 [#1354](https://github.com/jadu/pulsar/pull/1354/)
- Bump ini from 1.3.5 to 1.3.7 [#1344](https://github.com/jadu/pulsar/pull/1344)
- Bump bl from 1.2.2 to 1.2.3 [#1342](https://github.com/jadu/pulsar/pull/1342)

Versions released in 2020 or earlier are detailed in GH release notes https://github.com/jadu/pulsar/releases
