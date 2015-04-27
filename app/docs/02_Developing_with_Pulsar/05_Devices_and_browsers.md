Our base level of platform and browser testing will follow the guidelines defined in the Government Service Design manual with the addition of testing in Windows 8/IE10 and Ubuntu/Firefox. We will use native versions of each browser, running in Virtual Machines where necessary and avoid using tools like IETester or switching rendering engines in IE Developer Tools. Testing of features with these browsers should be added to the Definition of Done. 

## Data collection

We base this list on actual data from our customers and are working to include analytics into our products to automatically gather it. In the meantime, you can contribute to the [Browser Data Repository](https://gitlab.hq.jadu.net/pulsar/browser-data/tree/master).

## Ideal, Compliant and Functional

<span class="label label--success">ideal</span> is Jadu’s definition of the most-enhanced experience; it represents the most modern, polished state of the front-end. For Desktop; we use Google Chrome as our representation of ideal; with Firefox and Safari just as competent (minus some minute rendering discrepancies). For mobile, we have defined Safari on iOS 7 as our representation of ideal.

<span class="label label--primary">compliant</span> is a deviation from ideal; a ‘compliant’ experience should be close in visual appearance and layout to the ideal experience, however, we allow for a number of visual deviations from ideal, such as a lack of rounded corners in IE8, or slight visual misalignment in IE7.

<span class="label">functional</span> is a deviation from compliant. A ‘functional’ experience is an experience where content is accessible to a user, where they can complete forms and use all the functionality within them without it being obscured. Visual misalignment and rendering bugs are perfectly acceptable unless they interfere with content and functionality; as long as the user can navigate to, read and complete the forms, we have created a functional experience.

Where “latest version” is listed, it means the latest stable version plus one version back, as these browsers regularly self-update.

### Desktop

<table class="table table-bordered table-striped">
<thead>
 <tr>
   <th>OS</th>
   <th>Browser</th>
   <th class="centered">Support</th>
 </tr>
</thead>
<tbody>

<tr>
 <td>Windows</td>
 <td>Google Chrome (latest version)</td>
 <td class="centered"><span class="label label--success">ideal</span></td>
</tr>
<tr>
 <td></td>
 <td>Mozilla Firefox (latest version)</td>
 <td class="centered"><span class="label label--primary">compliant</span></td>
</tr>
<tr>
 <td></td>
 <td>Internet Explorer 7+</td>
 <td class="centered"><span class="label label--primary">compliant</span></td>
</tr>
<tr>
 <td></td>
 <td>Internet Explorer 6</td>
 <td class="centered"><span class="label">functional</span></td>
</tr>

<tr>
 <td>Mac OS X</td>
 <td>Google Chrome (latest version)</td>
 <td class="centered"><span class="label label--success">ideal</span></td>
</tr>

<tr>
 <td></td>
 <td>Safari (latest version)</td>
 <td class="centered"><span class="label label--primary">compliant</span></td>
</tr>

<tr>
 <td></td>
 <td>Mozilla Firefox (latest version)</td>
 <td class="centered"><span class="label label--primary">compliant</span></td>
</tr>

<tr>
 <td>Ubuntu</td>
 <td>Mozilla Firefox (latest version)</td>
 <td class="centered"><span class="label label--primary">compliant</span></td>
</tr>

</tbody>
</table>

### Small screen devices

<table class="table table-bordered table-striped">
<thead>
 <tr>
   <th>OS</th>
   <th>Browser</th>
   <th class="centered">Support</th>
 </tr>
</thead>
<tbody>

<tr>
 <td>iOS 7</td>
 <td>Mobile Safari</td>
 <td class="centered"><span class="label label--success">ideal</span></td>
</tr>
<tr>
 <td>iOS 6</td>
 <td>Mobile Safari</td>
 <td class="centered"><span class="label label--primary">compliant</span></td>
</tr>
<tr>
 <td>iOS 5</td>
 <td>Mobile Safari</td>
 <td class="centered"><span class="label">functional</span></td>
</tr>


<tr>
 <td>Android 4.x</td>
 <td>Google Chrome</td>
 <td class="centered"><span class="label label--primary">compliant</span></td>
</tr>

</tbody>
</table>

