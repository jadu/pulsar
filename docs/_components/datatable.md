---
layout: page
title: Datatables
category: Components
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

## Markup

{% raw %}
```twig
{# index.html.twig #}

{% block tab_content %}
    <table class="table datatable table--full">
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
        <tbody>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td>
                    <a href="/edit">Name data</a>
                </td>
                <td>Company data</td>
                <td>Phone data</td>
                <td>
                    <a href="/action" class="table-action">Action</a>
                </td>
            </tr>
        </tbody>
    </table>
{% endblock tab_content %}
```
{% endraw %}

<div class="pulsar-example">
    <table class="table datatable table--full">
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
        <tbody>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Kuame Raymond</a></td>
                <td>Est Consulting</td>
                <td>07624 565808</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Oren Holden</a></td>
                <td>Aliquet Nec LLP</td>
                <td>(016977) 2970</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Timothy Armstrong</a></td>
                <td>Ac Arcu Nunc Ltd</td>
                <td>(016977) 1273</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Herrod Ramirez</a></td>
                <td>Quam Institute</td>
                <td>0845 46 49</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Samson Brennan</a></td>
                <td>Nec Cursus A Incorporated</td>
                <td>07367 530607</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Malcolm Weber</a></td>
                <td>Proin Vel Nisl Incorporated</td>
                <td>055 7602 7287</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Arden Boyle</a></td>
                <td>Dictum Eu Corp.</td>
                <td>056 9042 7231</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Dale Parrish</a></td>
                <td>Felis Purus Ac LLC</td>
                <td>0845 46 43</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Boris Pace</a></td>
                <td>Sed Libero Inc.</td>
                <td>07624 020948</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Rogan Higgins</a></td>
                <td>Cursus Consulting</td>
                <td>0832 036 7241</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Allistair Sheppard</a></td>
                <td>Quis Diam LLC</td>
                <td>0800 1111</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Kane Wyatt</a></td>
                <td>Maecenas Consulting</td>
                <td>0905 599 4811</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Kasper Barton</a></td>
                <td>Mauris Institute</td>
                <td>0968 659 5892</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Phelan Valencia</a></td>
                <td>Nec Eleifend Corp.</td>
                <td>0842 888 9100</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Jameson Duncan</a></td>
                <td>Orci Lacus Inc.</td>
                <td>0800 763 5320</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Merrill Lowery</a></td>
                <td>Penatibus Et Magnis Foundation</td>
                <td>0800 491969</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Mufutau Valentine</a></td>
                <td>Nulla Eget LLP</td>
                <td>0500 556251</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Lucius Barron</a></td>
                <td>Imperdiet Ornare LLC</td>
                <td>(0181) 519 7843</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Dieter Gross</a></td>
                <td>Enim Nunc Associates</td>
                <td>(023) 2654 9782</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Brody Lara</a></td>
                <td>Nunc Ac LLP</td>
                <td>0500 572843</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Avram Henry</a></td>
                <td>Natoque Corp.</td>
                <td>056 1762 1703</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Malachi Daniels</a></td>
                <td>Est LLC</td>
                <td>(0110) 722 4439</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Hiram Leach</a></td>
                <td>Mauris Nulla Institute</td>
                <td>(01556) 59782</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Malik Doyle</a></td>
                <td>Dolor Quisque Tincidunt Company</td>
                <td>0845 46 43</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Lev Delacruz</a></td>
                <td>Ut Nulla Consulting</td>
                <td>0500 790647</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Ryan Mckinney</a></td>
                <td>Lectus A Ltd</td>
                <td>0300 123 1610</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Ulysses Burt</a></td>
                <td>Fermentum Company</td>
                <td>(025) 8776 9859</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Porter Barnes</a></td>
                <td>Aliquam Fringilla Incorporated</td>
                <td>0800 129642</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Brennan Dorsey</a></td>
                <td>Adipiscing Lobortis LLP</td>
                <td>070 1846 3973</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Kato Dean</a></td>
                <td>Magnis Dis Industries</td>
                <td>0821 269 7735</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Blaze Glover</a></td>
                <td>Eu Tempor Company</td>
                <td>(010626) 28499</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Griffin Glass</a></td>
                <td>Aliquet Consulting</td>
                <td>0929 250 7365</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Keefe Foley</a></td>
                <td>Mauris Limited</td>
                <td>055 3461 1374</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Lucius Chang</a></td>
                <td>Tellus Industries</td>
                <td>070 0220 3583</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Abraham Whitley</a></td>
                <td>Phasellus Associates</td>
                <td>0843 730 2918</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Ulric Anthony</a></td>
                <td>Congue Institute</td>
                <td>0845 46 41</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Armand Gilmore</a></td>
                <td>Etiam Imperdiet Dictum Incorporated</td>
                <td>(016977) 5605</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Rudyard Leonard</a></td>
                <td>Porta Industries</td>
                <td>(01316) 88033</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Tyler Hayes</a></td>
                <td>Magna Phasellus Associates</td>
                <td>(015954) 36798</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Cairo Merritt</a></td>
                <td>Nam Company</td>
                <td>(014877) 26568</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Lucius Franks</a></td>
                <td>Quis Associates</td>
                <td>(016977) 3736</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Kane Buck</a></td>
                <td>Proin Eget Odio Ltd</td>
                <td>07624 518393</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">James Smith</a></td>
                <td>Orci Consulting</td>
                <td>0967 947 3508</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Troy Hardy</a></td>
                <td>Leo In Lobortis Incorporated</td>
                <td>07624 095936</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Jonah Reilly</a></td>
                <td>Eget Nisi Dictum Company</td>
                <td>0800 881760</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Eric Henry</a></td>
                <td>Magnis Limited</td>
                <td>(0114) 016 3745</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Price Colon</a></td>
                <td>Enim Etiam Imperdiet Inc.</td>
                <td>07956 245844</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Connor Rutledge</a></td>
                <td>Phasellus Dolor Consulting</td>
                <td>(016977) 0656</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Lawrence Ferrell</a></td>
                <td>Vel Venenatis Vel Incorporated</td>
                <td>(016977) 6098</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Abraham Fischer</a></td>
                <td>Luctus Lobortis LLP</td>
                <td>07858 289171</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Reed Cline</a></td>
                <td>Laoreet Foundation</td>
                <td>0955 843 5294</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Asher Simmons</a></td>
                <td>Consequat Purus Corp.</td>
                <td>0906 296 0333</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">George Reeves</a></td>
                <td>Placerat Augue LLP</td>
                <td>0845 46 40</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Leo Bridges</a></td>
                <td>Sapien Cras Dolor Associates</td>
                <td>(01393) 01760</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Sebastian Copeland</a></td>
                <td>Elit Company</td>
                <td>(013989) 66056</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Damian Acevedo</a></td>
                <td>Malesuada Associates</td>
                <td>055 6965 7998</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Thaddeus Mccarthy</a></td>
                <td>Pede Associates</td>
                <td>0323 844 3773</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Reese Jennings</a></td>
                <td>Dignissim Corp.</td>
                <td>076 7634 2413</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Bert Davidson</a></td>
                <td>Cum Sociis Natoque Ltd</td>
                <td>0313 495 4606</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Grady Cox</a></td>
                <td>Aenean Associates</td>
                <td>0800 1111</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Upton Peterson</a></td>
                <td>Mollis Lectus Pede Corp.</td>
                <td>0931 210 6321</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Acton Ware</a></td>
                <td>Enim Etiam Imperdiet Foundation</td>
                <td>056 6209 7113</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Nicholas Roman</a></td>
                <td>In Cursus Et LLC</td>
                <td>(01035) 680668</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Nash Park</a></td>
                <td>Laoreet Libero Et Institute</td>
                <td>0975 765 6966</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Thane Myers</a></td>
                <td>Non LLC</td>
                <td>0839 559 8249</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Denton Graves</a></td>
                <td>Sollicitudin Orci Sem Institute</td>
                <td>(0112) 890 3361</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Denton Fowler</a></td>
                <td>Mattis Integer Incorporated</td>
                <td>056 6445 7561</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Colin Raymond</a></td>
                <td>Lorem Corporation</td>
                <td>0800 818 7219</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Keefe Kelley</a></td>
                <td>Enim Foundation</td>
                <td>(014409) 33993</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Blake Nolan</a></td>
                <td>Risus Nunc Ac Incorporated</td>
                <td>0932 328 3625</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Jesse Gaines</a></td>
                <td>Sagittis Company</td>
                <td>0800 552947</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Lionel Alexander</a></td>
                <td>Integer Vulputate PC</td>
                <td>(01392) 78351</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Raymond Velasquez</a></td>
                <td>Elementum LLC</td>
                <td>0800 1111</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Harrison Rosario</a></td>
                <td>Ligula Associates</td>
                <td>(01661) 13086</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Robert Carpenter</a></td>
                <td>Orci Tincidunt PC</td>
                <td>0500 857067</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Keith Nash</a></td>
                <td>Non Nisi Limited</td>
                <td>055 9795 5685</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Xander Schroeder</a></td>
                <td>Elit Aliquam Inc.</td>
                <td>055 0095 0679</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Mason Hammond</a></td>
                <td>Sit Amet Risus Consulting</td>
                <td>07624 070079</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Abraham Mcbride</a></td>
                <td>Et Industries</td>
                <td>0800 189 3352</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Octavius Bartlett</a></td>
                <td>Luctus Ltd</td>
                <td>07624 332250</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Clinton Henderson</a></td>
                <td>Turpis Nec Mauris Company</td>
                <td>(0110) 476 4200</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Owen Weber</a></td>
                <td>Phasellus In Felis Inc.</td>
                <td>0800 142 9525</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Drew Torres</a></td>
                <td>Eu Associates</td>
                <td>(013276) 30792</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Dale Wade</a></td>
                <td>Nibh Aliquam Ornare Corporation</td>
                <td>07624 655717</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Aristotle Hess</a></td>
                <td>Suscipit Est PC</td>
                <td>(0118) 256 6675</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Channing Carver</a></td>
                <td>Curae; Limited</td>
                <td>0800 1111</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">William Thompson</a></td>
                <td>Ut Pellentesque Eget Associates</td>
                <td>(01267) 925438</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Armando Fitzpatrick</a></td>
                <td>Nulla In Tincidunt Associates</td>
                <td>(0131) 988 5013</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Dalton Evans</a></td>
                <td>Egestas Associates</td>
                <td>0800 724057</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Brett Howell</a></td>
                <td>Justo Proin Non Consulting</td>
                <td>0800 780 3321</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Todd Armstrong</a></td>
                <td>Auctor Quis Tristique LLP</td>
                <td>0845 46 46</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Cameron Trujillo</a></td>
                <td>Ac Company</td>
                <td>076 7026 2806</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Travis Mckee</a></td>
                <td>Egestas Aliquam Corp.</td>
                <td>(016977) 5298</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Hamilton Maddox</a></td>
                <td>Ligula Consectetuer Corporation</td>
                <td>(022) 8243 0310</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Cole Mack</a></td>
                <td>Porttitor Interdum Ltd</td>
                <td>07624 880141</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Sean Benjamin</a></td>
                <td>Metus Sit Amet Limited</td>
                <td>0800 723532</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Caesar Lee</a></td>
                <td>Fusce LLP</td>
                <td>0800 1111</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Kamal Spencer</a></td>
                <td>Velit Industries</td>
                <td>(0131) 681 9309</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Mannix Reese</a></td>
                <td>Fusce Diam Nunc Institute</td>
                <td>0845 46 41</td>
                <td><a href="#">Use</a></td>
            </tr>
            <tr>
                <td class="table-responsive">
                    <button class="btn btn--naked"><i class="icon-plus-sign table-child-toggle"><span class="hide">Expand</span></i></button>
                </td>
                <td class="table-selection">
                    <input type="checkbox" class="form__control checkbox js-select" aria-label="Select row" />
                </td>
                <td><a href="#">Colt Combs</a></td>
                <td>Mi Ac Incorporated</td>
                <td>0800 506132</td>
                <td><a href="#">Use</a></td>
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
