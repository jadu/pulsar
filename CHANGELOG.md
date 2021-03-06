# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

⚠️ denotes a breaking change that may require changes to be made within Jadu products.

## [Unreleased](https://github.com/jadu/pulsar/issues?q=is%3Aclosed+milestone%3AUnreleased)
### Added
- Add CHANGELOG.md file [#1352](https://github.com/jadu/pulsar/pull/1352)
- Add ability for textareas to use common appended/prepended options [#1314](https://github.com/jadu/pulsar/pull/1314)
- Add table caption styles [#1361](https://github.com/jadu/pulsar/pull/1361)
- Add `.form__group--tight` modifier to reduce vertical spacing between form groups [#1360](https://github.com/jadu/pulsar/pull/1360)
- Add CK Editor focus styles (previously scratched in product) [#1370](https://github.com/jadu/pulsar/pull/1370)

### Changed
- Sticky sidebar behaviour (used by XFP) is now more consistent and visually stable regardless of main content height [#1326](https://github.com/jadu/pulsar/pull/1326)
- Update homebrew installation script path in makefile [#1362](https://github.com/jadu/pulsar/pull/1362)
- Form helper outputted error text is now prepended with a visually hidden `Error:` to improve SR experience [#1364](https://github.com/jadu/pulsar/pull/1364)
  - ⚠️ Products which use non-helper form components will need to implement this change in their markup
- Grunt sass now uses dart-sass insteasd of the deprecated libsass. [#1351](https://github.com/jadu/pulsar/pull/1351)
  - ⚠️ There is a change to how colour values are interpreted which may need a change within product sass files
- `html.datatable` and `form.repeater` helpers now correctly add `scope="col"` to TH elements
- Update Travis to build against PHP 7.2, 7.3 and 7.4 to cover all versions currently in use and planned [#1329](https://github.com/jadu/pulsar/pull/1329)

### Fixed
- Progress bar with warning state and a visible value failed colour contrast [#1350](https://github.com/jadu/pulsar/pull/1350)
- `form__group--top` modifier class now works when control label element is a `span` [#1330](https://github.com/jadu/pulsar/pull/1330)
- Form labels for choice block components are now properly aligned vertically with the inputs [#1332](https://github.com/jadu/pulsar/pull/1332)
- Mobile `form.compound` label spacing [#1366](https://github.com/jadu/pulsar/pull/1366)
- Stop 'more' navigation menu triggering when only one menu item is out of bounds [#1394](https://github.com/jadu/pulsar/pull/1394)
- Fix infinite loop in 'more' navigation menu [#1381](https://github.com/jadu/pulsar/pull/1381)
- Prevent situations where the last item in a piano list would be obscured [#1385](https://github.com/jadu/pulsar/pull/1385)

### Security
- Stop (old) tooltip.js from directly interpreting selectors passed through options [#1359](https://github.com/jadu/pulsar/pull/1359)
- Add escaping on values which are extracted from DOM notes then output in the view [#1331](https://github.com/jadu/pulsar/pull/1331)
- Upgrade datatables.net-responsive-dt from 2.2.3 to 2.2.6 [#1336](https://github.com/jadu/pulsar/pull/1336)
- Upgrade datatables.net-responsive from 2.2.3 to 2.2.6 [#1367](https://github.com/jadu/pulsar/pull/1367)
= Upgrade datatables.net-responsive from 2.2.6 to 2.2.7 [#1372](https://github.com/jadu/pulsar/pull/1372)
- Upgrade datatables from 1.10.22 to 1.10.23 [#1346](https://github.com/jadu/pulsar/pull/1346)
- Upgrade datatables.net-buttons-dt from 1.6.1 to 1.6.5 [#1356](https://github.com/jadu/pulsar/pull/1356)
- Upgrade elliptic from 6.5.3 to 6.5.3 [#1388](https://github.com/jadu/pulsar/pull/1388)
- Upgrade grunt from 1.0.3 to 1.3.0 [#1399](https://github.com/jadu/pulsar/pull/1399)
- Upgrade handlebars from 4.7.6 to 4.7.7 [#1396](https://github.com/jadu/pulsar/pull/1396)
- Upgrade hosted-git-info from 2.7.1 to 2.8.9 [#1400](https://github.com/jadu/pulsar/pull/1400)
- Upgrade lodash from 4.17.20 to 4.17.21 [#1398](https://github.com/jadu/pulsar/pull/1398)
- Upgrade moment from 2.27.0 to 2.29.1 [#1357](https://github.com/jadu/pulsar/pull/1357)
- Upgrade timepicker from 1.13.3 to 1.13.16 [#1355](https://github.com/jadu/pulsar/pull/1355)
- Upgrade ua-parser-js from 0.7.23 to 0.7.28 [#1395](https://github.com/jadu/pulsar/pull/1395)
- Upgrade undersctore from 1.12.0 to 1.13.1 [#1397](https://github.com/jadu/pulsar/pull/1397)
- Upgrade browser-sync from 2.17.3 to 2.26.13 [#1354](https://github.com/jadu/pulsar/pull/1354/)
- Upgrade grunt-real-favicon from 0.2.2 to 0.2.4 [#1354](https://github.com/jadu/pulsar/pull/1354/)
- Upgrade jstree from 3.3.9 to 3.3.11 [#1369](https://github.com/jadu/pulsar/pull/1369)
- Upgrade pikaday from 1.8.0 to 1.8.2 [#1368](https://github.com/jadu/pulsar/pull/1368)
- Bump ini from 1.3.5 to 1.3.7 [#1344](https://github.com/jadu/pulsar/pull/1344)
- Bump bl from 1.2.2 to 1.2.3 [#1342](https://github.com/jadu/pulsar/pull/1342)

Versions released in 2020 or earlier are detailed in GH release notes https://github.com/jadu/pulsar/releases
