---
layout: page
title: Datatables
category: Components
---

Datatables use the datatables.net plugin to provide a nice amount of functionality to your data. Pulsar's configuration includes plugins to make them responsive.

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
                <th class="table-responsive"></th>
                <th class="table-selection"></th>
                <th><a href="#">Column heading 1</a></th>
                <th><a href="#">Column heading 2</a></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="table-responsive">
                    {{ html.link({ 'class': 'table-child-toggle', 'href': '#', 'label': html.icon('plus-sign') }) }}
                </td>
                <td class="table-selection">
                    {{ html.icon('unchecked', { 'class': 'table-row-select js-select' }) }}
                </td>
                <td>Column data 1</td>
                <td>Column data 2</td>
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
                <th><a href="#">Name</a></th>
                <th><a href="#">Company</a></th>
                <th><a href="#">Phone</a></th>

            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Kuame Raymond</td>
                <td>Est Consulting</td>
                <td>07624 565808</td>
            </tr>
            <tr>
                <td>Oren Holden</td>
                <td>Aliquet Nec LLP</td>
                <td>(016977) 2970</td>
            </tr>
            <tr>
                <td>Timothy Armstrong</td>
                <td>Ac Arcu Nunc Ltd</td>
                <td>(016977) 1273</td>
            </tr>
            <tr>
                <td>Herrod Ramirez</td>
                <td>Quam Institute</td>
                <td>0845 46 49</td>
            </tr>
            <tr>
                <td>Samson Brennan</td>
                <td>Nec Cursus A Incorporated</td>
                <td>07367 530607</td>
            </tr>
            <tr>
                <td>Malcolm Weber</td>
                <td>Proin Vel Nisl Incorporated</td>
                <td>055 7602 7287</td>
            </tr>
            <tr>
                <td>Arden Boyle</td>
                <td>Dictum Eu Corp.</td>
                <td>056 9042 7231</td>
            </tr>
            <tr>
                <td>Dale Parrish</td>
                <td>Felis Purus Ac LLC</td>
                <td>0845 46 43</td>
            </tr>
            <tr>
                <td>Boris Pace</td>
                <td>Sed Libero Inc.</td>
                <td>07624 020948</td>
            </tr>
            <tr>
                <td>Rogan Higgins</td>
                <td>Cursus Consulting</td>
                <td>0832 036 7241</td>
            </tr>
            <tr>
                <td>Allistair Sheppard</td>
                <td>Quis Diam LLC</td>
                <td>0800 1111</td>
            </tr>
            <tr>
                <td>Kane Wyatt</td>
                <td>Maecenas Consulting</td>
                <td>0905 599 4811</td>
            </tr>
            <tr>
                <td>Kasper Barton</td>
                <td>Mauris Institute</td>
                <td>0968 659 5892</td>
            </tr>
            <tr>
                <td>Phelan Valencia</td>
                <td>Nec Eleifend Corp.</td>
                <td>0842 888 9100</td>
            </tr>
            <tr>
                <td>Jameson Duncan</td>
                <td>Orci Lacus Inc.</td>
                <td>0800 763 5320</td>
            </tr>
            <tr>
                <td>Merrill Lowery</td>
                <td>Penatibus Et Magnis Foundation</td>
                <td>0800 491969</td>
            </tr>
            <tr>
                <td>Mufutau Valentine</td>
                <td>Nulla Eget LLP</td>
                <td>0500 556251</td>
            </tr>
            <tr>
                <td>Lucius Barron</td>
                <td>Imperdiet Ornare LLC</td>
                <td>(0181) 519 7843</td>
            </tr>
            <tr>
                <td>Dieter Gross</td>
                <td>Enim Nunc Associates</td>
                <td>(023) 2654 9782</td>
            </tr>
            <tr>
                <td>Brody Lara</td>
                <td>Nunc Ac LLP</td>
                <td>0500 572843</td>
            </tr>
            <tr>
                <td>Avram Henry</td>
                <td>Natoque Corp.</td>
                <td>056 1762 1703</td>
            </tr>
            <tr>
                <td>Malachi Daniels</td>
                <td>Est LLC</td>
                <td>(0110) 722 4439</td>
            </tr>
            <tr>
                <td>Hiram Leach</td>
                <td>Mauris Nulla Institute</td>
                <td>(01556) 59782</td>
            </tr>
            <tr>
                <td>Malik Doyle</td>
                <td>Dolor Quisque Tincidunt Company</td>
                <td>0845 46 43</td>
            </tr>
            <tr>
                <td>Lev Delacruz</td>
                <td>Ut Nulla Consulting</td>
                <td>0500 790647</td>
            </tr>
            <tr>
                <td>Ryan Mckinney</td>
                <td>Lectus A Ltd</td>
                <td>0300 123 1610</td>
            </tr>
            <tr>
                <td>Ulysses Burt</td>
                <td>Fermentum Company</td>
                <td>(025) 8776 9859</td>
            </tr>
            <tr>
                <td>Porter Barnes</td>
                <td>Aliquam Fringilla Incorporated</td>
                <td>0800 129642</td>
            </tr>
            <tr>
                <td>Brennan Dorsey</td>
                <td>Adipiscing Lobortis LLP</td>
                <td>070 1846 3973</td>
            </tr>
            <tr>
                <td>Kato Dean</td>
                <td>Magnis Dis Industries</td>
                <td>0821 269 7735</td>
            </tr>
            <tr>
                <td>Blaze Glover</td>
                <td>Eu Tempor Company</td>
                <td>(010626) 28499</td>
            </tr>
            <tr>
                <td>Griffin Glass</td>
                <td>Aliquet Consulting</td>
                <td>0929 250 7365</td>
            </tr>
            <tr>
                <td>Keefe Foley</td>
                <td>Mauris Limited</td>
                <td>055 3461 1374</td>
            </tr>
            <tr>
                <td>Lucius Chang</td>
                <td>Tellus Industries</td>
                <td>070 0220 3583</td>
            </tr>
            <tr>
                <td>Abraham Whitley</td>
                <td>Phasellus Associates</td>
                <td>0843 730 2918</td>
            </tr>
            <tr>
                <td>Ulric Anthony</td>
                <td>Congue Institute</td>
                <td>0845 46 41</td>
            </tr>
            <tr>
                <td>Armand Gilmore</td>
                <td>Etiam Imperdiet Dictum Incorporated</td>
                <td>(016977) 5605</td>
            </tr>
            <tr>
                <td>Rudyard Leonard</td>
                <td>Porta Industries</td>
                <td>(01316) 88033</td>
            </tr>
            <tr>
                <td>Tyler Hayes</td>
                <td>Magna Phasellus Associates</td>
                <td>(015954) 36798</td>
            </tr>
            <tr>
                <td>Cairo Merritt</td>
                <td>Nam Company</td>
                <td>(014877) 26568</td>
            </tr>
            <tr>
                <td>Lucius Franks</td>
                <td>Quis Associates</td>
                <td>(016977) 3736</td>
            </tr>
            <tr>
                <td>Kane Buck</td>
                <td>Proin Eget Odio Ltd</td>
                <td>07624 518393</td>
            </tr>
            <tr>
                <td>James Smith</td>
                <td>Orci Consulting</td>
                <td>0967 947 3508</td>
            </tr>
            <tr>
                <td>Troy Hardy</td>
                <td>Leo In Lobortis Incorporated</td>
                <td>07624 095936</td>
            </tr>
            <tr>
                <td>Jonah Reilly</td>
                <td>Eget Nisi Dictum Company</td>
                <td>0800 881760</td>
            </tr>
            <tr>
                <td>Eric Henry</td>
                <td>Magnis Limited</td>
                <td>(0114) 016 3745</td>
            </tr>
            <tr>
                <td>Price Colon</td>
                <td>Enim Etiam Imperdiet Inc.</td>
                <td>07956 245844</td>
            </tr>
            <tr>
                <td>Connor Rutledge</td>
                <td>Phasellus Dolor Consulting</td>
                <td>(016977) 0656</td>
            </tr>
            <tr>
                <td>Lawrence Ferrell</td>
                <td>Vel Venenatis Vel Incorporated</td>
                <td>(016977) 6098</td>
            </tr>
            <tr>
                <td>Abraham Fischer</td>
                <td>Luctus Lobortis LLP</td>
                <td>07858 289171</td>
            </tr>
            <tr>
                <td>Reed Cline</td>
                <td>Laoreet Foundation</td>
                <td>0955 843 5294</td>
            </tr>
            <tr>
                <td>Asher Simmons</td>
                <td>Consequat Purus Corp.</td>
                <td>0906 296 0333</td>
            </tr>
            <tr>
                <td>George Reeves</td>
                <td>Placerat Augue LLP</td>
                <td>0845 46 40</td>
            </tr>
            <tr>
                <td>Leo Bridges</td>
                <td>Sapien Cras Dolor Associates</td>
                <td>(01393) 01760</td>
            </tr>
            <tr>
                <td>Sebastian Copeland</td>
                <td>Elit Company</td>
                <td>(013989) 66056</td>
            </tr>
            <tr>
                <td>Damian Acevedo</td>
                <td>Malesuada Associates</td>
                <td>055 6965 7998</td>
            </tr>
            <tr>
                <td>Thaddeus Mccarthy</td>
                <td>Pede Associates</td>
                <td>0323 844 3773</td>
            </tr>
            <tr>
                <td>Reese Jennings</td>
                <td>Dignissim Corp.</td>
                <td>076 7634 2413</td>
            </tr>
            <tr>
                <td>Bert Davidson</td>
                <td>Cum Sociis Natoque Ltd</td>
                <td>0313 495 4606</td>
            </tr>
            <tr>
                <td>Grady Cox</td>
                <td>Aenean Associates</td>
                <td>0800 1111</td>
            </tr>
            <tr>
                <td>Upton Peterson</td>
                <td>Mollis Lectus Pede Corp.</td>
                <td>0931 210 6321</td>
            </tr>
            <tr>
                <td>Acton Ware</td>
                <td>Enim Etiam Imperdiet Foundation</td>
                <td>056 6209 7113</td>
            </tr>
            <tr>
                <td>Nicholas Roman</td>
                <td>In Cursus Et LLC</td>
                <td>(01035) 680668</td>
            </tr>
            <tr>
                <td>Nash Park</td>
                <td>Laoreet Libero Et Institute</td>
                <td>0975 765 6966</td>
            </tr>
            <tr>
                <td>Thane Myers</td>
                <td>Non LLC</td>
                <td>0839 559 8249</td>
            </tr>
            <tr>
                <td>Denton Graves</td>
                <td>Sollicitudin Orci Sem Institute</td>
                <td>(0112) 890 3361</td>
            </tr>
            <tr>
                <td>Denton Fowler</td>
                <td>Mattis Integer Incorporated</td>
                <td>056 6445 7561</td>
            </tr>
            <tr>
                <td>Colin Raymond</td>
                <td>Lorem Corporation</td>
                <td>0800 818 7219</td>
            </tr>
            <tr>
                <td>Keefe Kelley</td>
                <td>Enim Foundation</td>
                <td>(014409) 33993</td>
            </tr>
            <tr>
                <td>Blake Nolan</td>
                <td>Risus Nunc Ac Incorporated</td>
                <td>0932 328 3625</td>
            </tr>
            <tr>
                <td>Jesse Gaines</td>
                <td>Sagittis Company</td>
                <td>0800 552947</td>
            </tr>
            <tr>
                <td>Lionel Alexander</td>
                <td>Integer Vulputate PC</td>
                <td>(01392) 78351</td>
            </tr>
            <tr>
                <td>Raymond Velasquez</td>
                <td>Elementum LLC</td>
                <td>0800 1111</td>
            </tr>
            <tr>
                <td>Harrison Rosario</td>
                <td>Ligula Associates</td>
                <td>(01661) 13086</td>
            </tr>
            <tr>
                <td>Robert Carpenter</td>
                <td>Orci Tincidunt PC</td>
                <td>0500 857067</td>
            </tr>
            <tr>
                <td>Keith Nash</td>
                <td>Non Nisi Limited</td>
                <td>055 9795 5685</td>
            </tr>
            <tr>
                <td>Xander Schroeder</td>
                <td>Elit Aliquam Inc.</td>
                <td>055 0095 0679</td>
            </tr>
            <tr>
                <td>Mason Hammond</td>
                <td>Sit Amet Risus Consulting</td>
                <td>07624 070079</td>
            </tr>
            <tr>
                <td>Abraham Mcbride</td>
                <td>Et Industries</td>
                <td>0800 189 3352</td>
            </tr>
            <tr>
                <td>Octavius Bartlett</td>
                <td>Luctus Ltd</td>
                <td>07624 332250</td>
            </tr>
            <tr>
                <td>Clinton Henderson</td>
                <td>Turpis Nec Mauris Company</td>
                <td>(0110) 476 4200</td>
            </tr>
            <tr>
                <td>Owen Weber</td>
                <td>Phasellus In Felis Inc.</td>
                <td>0800 142 9525</td>
            </tr>
            <tr>
                <td>Drew Torres</td>
                <td>Eu Associates</td>
                <td>(013276) 30792</td>
            </tr>
            <tr>
                <td>Dale Wade</td>
                <td>Nibh Aliquam Ornare Corporation</td>
                <td>07624 655717</td>
            </tr>
            <tr>
                <td>Aristotle Hess</td>
                <td>Suscipit Est PC</td>
                <td>(0118) 256 6675</td>
            </tr>
            <tr>
                <td>Channing Carver</td>
                <td>Curae; Limited</td>
                <td>0800 1111</td>
            </tr>
            <tr>
                <td>William Thompson</td>
                <td>Ut Pellentesque Eget Associates</td>
                <td>(01267) 925438</td>
            </tr>
            <tr>
                <td>Armando Fitzpatrick</td>
                <td>Nulla In Tincidunt Associates</td>
                <td>(0131) 988 5013</td>
            </tr>
            <tr>
                <td>Dalton Evans</td>
                <td>Egestas Associates</td>
                <td>0800 724057</td>
            </tr>
            <tr>
                <td>Brett Howell</td>
                <td>Justo Proin Non Consulting</td>
                <td>0800 780 3321</td>
            </tr>
            <tr>
                <td>Todd Armstrong</td>
                <td>Auctor Quis Tristique LLP</td>
                <td>0845 46 46</td>
            </tr>
            <tr>
                <td>Cameron Trujillo</td>
                <td>Ac Company</td>
                <td>076 7026 2806</td>
            </tr>
            <tr>
                <td>Travis Mckee</td>
                <td>Egestas Aliquam Corp.</td>
                <td>(016977) 5298</td>
            </tr>
            <tr>
                <td>Hamilton Maddox</td>
                <td>Ligula Consectetuer Corporation</td>
                <td>(022) 8243 0310</td>
            </tr>
            <tr>
                <td>Cole Mack</td>
                <td>Porttitor Interdum Ltd</td>
                <td>07624 880141</td>
            </tr>
            <tr>
                <td>Sean Benjamin</td>
                <td>Metus Sit Amet Limited</td>
                <td>0800 723532</td>
            </tr>
            <tr>
                <td>Caesar Lee</td>
                <td>Fusce LLP</td>
                <td>0800 1111</td>
            </tr>
            <tr>
                <td>Kamal Spencer</td>
                <td>Velit Industries</td>
                <td>(0131) 681 9309</td>
            </tr>
            <tr>
                <td>Mannix Reese</td>
                <td>Fusce Diam Nunc Institute</td>
                <td>0845 46 41</td>
            </tr>
            <tr>
                <td>Colt Combs</td>
                <td>Mi Ac Incorporated</td>
                <td>0800 506132</td>
            </tr>
        </tbody>
    </table>
</div>

(Because of the width of this documentation example, this table looks slighly different when used in a real UI.)

## Disable row selection

Datatables allow selection of rows by default, this behaviour can be disabled through the `data-selection` attribute. This will hide the related elements in the UI.

```html
<table class="table datatable" data-selection="false">
 ...
</table>
```

## No results

If a table has nothing to display we provide a helpful message to the user so they understand why nothing is shown. If they have the relevant permissions to add something to this table, you should provide a call to action.

The message will be shown automatically if the table body contains no rows, if can (and should) be customised by the `data-empty-table` attribute.

```html
<table class="table datatable" data-empty-table="There are currently no people to display">
    <thead>
        <tr>
            <th><a href="#">Name</a></th>
            <th><a href="#">Company</a></th>
            <th><a href="#">Phone</a></th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
```

<div class="pulsar-example">
    <table class="table datatable table--full" data-empty-table="There are currently no people to display">
        <thead>
            <tr>
                <th><a href="#">Name</a></th>
                <th><a href="#">Company</a></th>
                <th><a href="#">Phone</a></th>

            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
