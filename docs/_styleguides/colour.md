---
layout: page
title: Colour Styleguide
---

Pulsar uses a standardised colour palette which incorporates the colours defined in Jadu’s brand styleguide.

Particular care should be taken to ensure that the colour of any text against it's background must meet the [WCAG AA ratio for visual contrast](http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (4.5:1), which is especially important given that our main typeface (Proxima Nova) is rather thin. While there's no specific accessibility requirement that requires UI elements to meet the same contrast ratio, Pulsar requires that interactive elements like form control outlines also meet AA compliance.

Simply put, if you need to make sure an element is completely visible, whether that's for visually impaired users, or when displaying your UI on a cheap projector in a brightly lit room, use AA compliant colours.

Colour variables are defined in the `_palette.base.scss` file and can be used anywhere. You should aim to use the sass variables rather than the hex/rgb values where possible.

## Fetching colour values

Use the `color()` function to fetch a colour from the palette.

```css
color(jadu-blue);
```

Pass the optional 'tone' argument to fetch a variation of a colour if available in the palette.

```css
color(jadu-blue, light);
```

Use these in your Sass in place of regular colour values.

```css
.my-element {
    background-color: color(gray, light);
    color: color(text);
}
```

## Palettes

### State colours

This palette helps to communicate state, and the effect of a particular action.

<p data-height="160" data-theme-id="19151" data-slug-hash="VvjEVP" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/VvjEVP/'>docs - colour</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Each of the state variables has an alternate version which is used to define the colour of any overlaid text or icons. Eg: `color(success, alt)`.

### Monochromes

Used for colouring UI elements and providing contrast

<p data-height="300" data-theme-id="19151" data-slug-hash="qONQMV" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/qONQMV/'>docs - colour - monochromes</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Text and links

<p data-height="130" data-theme-id="19151" data-slug-hash="PPxBjx" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/PPxBjx/'>docs - colour - text & links</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

---

## Jadu principle colours

Our colours are what give us our personality. We’re bright, bold and confident. We’re clever but clear.

<p data-height="130" data-theme-id="19151" data-slug-hash="RWqBGM" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/RWqBGM/'>docs - colour - jadu branding</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Each of the principle colours has its individual palette. These can be used as combinations but with care and good reason. If in doubt, stick to the palette.

### Jadu red

Associated with CONTINUUM.

<p data-height="155" data-theme-id="19151" data-slug-hash="dYQzBy" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/dYQzBy/'>docs - color - jadu red</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Jadu blue

Associated with CMS.

<p data-height="155" data-theme-id="19151" data-slug-hash="epQEoL" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/epQEoL/'>epQEoL</a> by Paul Stanton (<a href='http://codepen.io/stfdsanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Jadu green

Associated with XFP.

<p data-height="155" data-theme-id="19151" data-slug-hash="gaQGMm" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/gaQGMm/'>docs - colour - jadu green</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Jadu teal

Associated with CXM.

<p data-height="155" data-theme-id="19151" data-slug-hash="yYQzJx" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/yYQzJx/'>docs - colour - teal</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Jadu pink

Associated with CP.

<p data-height="155" data-theme-id="19151" data-slug-hash="meQBrR" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/meQBrR/'>docs - colour - pink</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
