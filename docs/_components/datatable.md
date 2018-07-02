---
layout: page
title: Datatables
category: Layout
---

Datatables use the datatables.net plugin to provide a nice amount of functionality to your data. Pulsar's configuration includes plugins to make them responsive. Where possible you should refer to the [datatable documentation](https://www.datatables.net).

## Dependencies

##### Javascript

The following libraries should be included in your product's `package.json`  file:

```javascript
/* package.json */

"devDependencies": {
    "datatables.net": "^1.10.11",
    "datatables.net-buttons": "^1.1.2",
    "datatables.net-buttons-dt": "^1.1.2",
    "datatables.net-dt": "^1.10.10",
    "datatables.net-responsive": "^2.0.2",
    "datatables.net-responsive-dt": "^2.0.0",
    "datatables.net-select": "^1.1.2",
    "datatables.net-select-dt": "^1.1.2"
}
```

##### Sass

You will need both the base tables styles, and the datatables extras.

```css
/* pulsar.scss */

@import '/path/to/bundles/pulsar/stylesheets/_component.tables';
@import '/path/to/bundles/pulsar/stylesheets/_component.datatables';
```

## Configuration

The `DataTable` plugin is called on any table containing the `datatable` class. Pulsar has a core configuration within `pulsarUIComponent`, but there may be times when you need to create your own custom config.

## Example usage

{% code_example html_helpers/datatable %}

<div class="pulsar-example">
    <div class="actionsbar">
        <div class="u-float-left">
            <div class="btn__group dropdown">
                <button id="actions_menu" data-toggle="dropdown" class="btn dropdown__toggle bulk-actions">Actions<span aria-label="0 rows selected" class="badge label--primary js-bulk-actions-badge" style="display: none;">0</span>&nbsp;<span class="caret"></span></button><ul class="dropdown__menu pull-left"><li><a href="#creatething"><i aria-hidden="true" class="icon-plus"></i>&nbsp;Create thing</a></li><li><a href="#newfilter" data-ui="show-filter-bar"><i aria-hidden="true" class="icon-filter"></i>&nbsp;New filter</a></li><li><span class="divider"></span></li><li data-toggle="tooltips" data-placement="right" data-container="body" title="Select one or more items to perform this bulk action" data-original-title="Select one or more items to perform this bulk action"><a href="#makecopy" data-bulk-action="" class="disabled"><i aria-hidden="true" class="icon-copy"></i>&nbsp;Make a copy</a></li><li data-toggle="tooltips" data-placement="right" data-container="body" title="Select one or more items to perform this bulk action" data-original-title="Select one or more items to perform this bulk action"><a href="#Changeowner" data-bulk-action="" class="disabled"><i aria-hidden="true" class="icon-user"></i>&nbsp;Change owner</a></li><li><span class="divider"></span></li><li data-toggle="tooltips" data-placement="right" data-container="body" title="Select one or more items to perform this bulk action" data-original-title="Select one or more items to perform this bulk action"><a href="#makelive" data-bulk-action="" class="disabled"><i aria-hidden="true" class="icon-check-circle"></i>&nbsp;Make live</a></li><li data-toggle="tooltips" data-placement="right" data-container="body" title="Select one or more items to perform this bulk action" data-original-title="Select one or more items to perform this bulk action"><a href="#takeoffline" data-bulk-action="" class="disabled"><i aria-hidden="true" class="icon-times-rectangle"></i>&nbsp;Take offline</a></li><li data-toggle="tooltips" data-placement="right" data-container="body" title="Select one or more items to perform this bulk action" data-original-title="Select one or more items to perform this bulk action"><a href="#makevisible" data-bulk-action="" class="disabled"><i aria-hidden="true" class="icon-eye-open"></i>&nbsp;Make visible</a></li><li data-toggle="tooltips" data-placement="right" data-container="body" title="Select one or more items to perform this bulk action" data-original-title="Select one or more items to perform this bulk action"><a href="#makeinvisible" data-bulk-action="" class="disabled"><i aria-hidden="true" class="icon-eye-slash"></i>&nbsp;Make invisible</a></li><li><span class="divider"></span></li><li data-toggle="tooltips" data-placement="right" data-container="body" title="Select one or more items to perform this bulk action" data-original-title="Select one or more items to perform this bulk action"><a href="#delete" data-bulk-action="" class="link--danger disabled"><i aria-hidden="true" class="icon-times"></i>&nbsp;Delete</a></li></ul>
            </div>
        </div>
        <div class="u-float-right">
            <button class="btn btn--primary">Create Thing</button>
        </div>
    </div>
    <table class="table datatable table--full table--horizontal" data-order='[[ 3, "desc" ]]' cellspacing="0">
        <thead>
            <tr>
                <th class="table-selection" data-orderable="false">
                    <input type="checkbox" class="form__control checkbox js-select-all" aria-label="Select all rows" data-toggle="tooltips" title="select all rows" data-placement="right" data-container="body" />
                </th>
                <th>Title</th>
                <th>Owner</th>
                <th>Modified</th>
                <th class="u-text-align-center shrink-to-fit">Live</th>
                <th class="u-text-align-center shrink-to-fit">Visible</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">The Terminator</a></td>
                <td>James Cameron</td>
                <td data-order="1991-07-01 12:00">01/07/1991 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="Live" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline" ></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Conan the Barbarian</a></td>
                <td>John Millius</td>
                <td data-order="2017-02-16 12:00">16/02/2017 12:34pm</td>

                <td data-order="offline" class="u-text-align-center"><i title="Offline" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-recrangle status--icon is-offline"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>
            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Predator</a></td>
                <td>John McTiernan</td>
                <td>01/01/1988 12:34pm</td>
     
                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>
            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Commando</a></td>
                <td>Mark L. Lester</td>
                <td data-order="1986-02-21 12:34">21/02/1986 12:34pm</td>
                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Terminator Genisys</a></td>
                <td>Alan Taylor</td>
                <td data-order="2015-06-25 12:34">25/06/2015 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Conan the Destroyer</a></td>
                <td>Richard Fleischer</td>
                <td data-order="1984-06-29 12:34">29/06/1984 12:34pm</td>

                <td data-order="offline" class="u-text-align-center"><i title="Offline" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-recrangle status--icon is-offline"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>
            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Terminator 2: Judgement Day</a></td>
                <td>James Cameron</td>
                <td data-order="1991-08-16 12:34:00">16/08/1991 12:34pm</td>
     
                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>
            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Twins</a></td>
                <td>Ivan Reitman</td>
                <td data-order="1988-12-08 12:34">08/12/1988 12:34pm</td>
                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Escape Plan</a></td>
                <td>Mikael Håfström</td>
                <td data-order="2013-10-18 12:00">18/10/2013 12:34pm</td>

                <td data-order="offline" class="u-text-align-center"><i title="Offline" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-recrangle status--icon is-offline"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>




            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">The Last Stand</a></td>
                <td>Kim Je-woon</td>
                <td data-order="2013-01-18 12:00">18/01/2013 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">True Lies</a></td>
                <td>James Cameron</td>
                <td data-order="1994-07-15 12:00">15/07/1994 12:34pm</td>

                <td data-order="offline" class="u-text-align-center"><i title="Offline" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-recrangle status--icon is-offline"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>
            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Aftermath</a></td>
                <td>Elliott Lester</td>
                <td data-order="2017-04-07 12:34">07/04/2017 12:34pm</td>
     
                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>
            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Sabotage</a></td>
                <td>David Ayer</td>
                <td data-order="2014-05-09">09/05/2014 12:34pm</td>
                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Total Recall</a></td>
                <td>Paul Verhoven</td>
                <td data-order="2012-08-29 12:00">29/08/2012 12:34pm</td>

                <td data-order="offline" class="u-text-align-center"><i title="Offline" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-recrangle status--icon is-offline"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Online" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Maggie</a></td>
                <td>Henry Hobson</td>
                <td data-order="2015-05-06 12:00">06/05/2015 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Red Sonja</a></td>
                <td>Richard Fleischer</td>
                <td data-order="1985-07-03 12:00">03/07/1985 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Kindergarten Cop</a></td>
                <td>Ivan Reitman</td>
                <td data-order="1991-02-01 12:00">01/02/1991 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">The Running Man</a></td>
                <td>Paul Michael Glaser</td>
                <td data-order="1987-11-13 12:00">13/11/1987 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Junior</a></td>
                <td>Ivan Reitman</td>
                <td data-order="1994-11-23 12:00">23/11/1994 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Last Action Hero</a></td>
                <td>John McTiernan</td>
                <td data-order="1993-07-30 12:00">30/07/1993 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Red Heat</a></td>
                <td>Walter Hill</td>
                <td data-order="1998-06-17 12:00">17/06/1998 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Raw Deal</a></td>
                <td>John Irvin</td>
                <td data-order="1986-06-06 12:00">06/06/1986 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Eraser</a></td>
                <td>Chuck Russell</td>
                <td data-order="1996-06-21 12:00">21/06/1996 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Jingle All the Way</a></td>
                <td>Brian Levant</td>
                <td data-order="1996-11-16 12:00">16/11/1996 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">The 6<sup>th</sup> Day</a></td>
                <td>Roger Spottiswoode</td>
                <td data-order="2000-11-13 12:00">13/11/2000 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="visible" class="u-text-align-center"><i title="Visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online"></i></td>
            </tr>

            <tr>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a class="link" href="#link-1">Collateral Damage</a></td>
                <td>Andrew Davis</td>
                <td data-order="2002-02-08 12:00">08/02/2002 12:34pm</td>

                <td data-order="live" class="u-text-align-center"><i title="" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-check-circle status--icon is-online" data-original-title="Live"></i></td>
                <td data-order="invisible" class="u-text-align-center"><i title="Not visible" data-placement="top" data-toggle="tooltips" aria-hidden="true" class="icon-times-rectangle status--icon is-offline"></i></td>
            </tr>
        </tbody>
    </table>
</div>

(Because of the width of this documentation example, this table looks slighly different when used in a real UI.)

## Disable row selection

Datatables allow selection of rows by default, this behaviour can be disabled through the `data-selection` attribute. This will hide the related elements in the UI.

```html
<table class="table datatable table--full" data-select="false">
 ...
</table>
```

## Set initial column sort

You can specify how the data should be sorted on initial load by supplying the `data-order` attribute, if you're using the responsive columns remember that these will affect which column index you supply.

For example, to sort our example table by name, this is the column `2` (zero indexed).

```html
<table class="table datatable table--full" data-order='[[ 2, "desc" ]]'>
    <thead>
        <tr>
            <td class="table-responsive"></td>
            <td class="table-selection"></td>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th data-orderable="false">Actions</th>
        </tr>
```

## Disable column sorting

Some columns don't need to allow sorting, such as an actions column where the data is the same for each row.

Add the `data-orderable="false"` to any `thead > th` or `thead > td` that you do not wish to be sorted.

```html
<table class="table datatable table--full">
    <thead>
        <tr>
            <th>Name</th>
            <th data-orderable="false">Actions</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

## Sorting date/time columns

To allow proper sorting of dates, use the `data-order` attribute to supply a `yyyy-mm-dd hh:mm` formatted string, this will be used when sorting the column.

```html
<td data-order="1982-04-02 12:00">02/04/1982 12:34pm</td>
```

## No results

If a table has nothing to display we provide a helpful message to the user so they understand why nothing is shown. If they have the relevant permissions to add something to this table, you should provide a call to action.

The message will be shown automatically if the table body contains no rows, if can (and should) be customised by the `data-empty-table` attribute.

```html
<table class="table datatable" data-empty-table="There are currently no people to display">
    <thead>
        <tr>
            <td class="table-responsive"></td>
            <td class="table-selection"></td>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th data-orderable="false">Actions</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

<div class="pulsar-example">
    <table class="table datatable table--full" data-empty-table="There are currently no people to display">
        <thead>
            <tr>
                <td class="table-responsive"></td>
                <td class="table-selection"></td>
                <th>Name</th>
                <th>Company</th>
                <th>Phone</th>
                <th data-orderable="false">Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
