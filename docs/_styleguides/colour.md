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

<div class="pulsar-example">

        <div class="swatch swatch--primary-base">
            <div class="swatch__colour">
                <span class="swatch__text">primary</span>
            </div>
            <div class="swatch__label">
                <code>color(primary)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>

        <div class="swatch swatch--info-base">
            <div class="swatch__colour">
                <span class="swatch__text">info</span>
            </div>
            <div class="swatch__label">
                <code>color(info)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>

        <div class="swatch swatch--success-base">
            <div class="swatch__colour">
                <span class="swatch__text">success</span>
            </div>
            <div class="swatch__label">
                <code>color(success)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>

        <div class="swatch swatch--warning-base">
            <div class="swatch__colour">
                <span class="swatch__text">warning</span>
            </div>
            <div class="swatch__label">
                <code>color(warning)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>

        <div class="swatch swatch--danger-base">
            <div class="swatch__colour">
                <span class="swatch__text">danger</span>
            </div>
            <div class="swatch__label">
                <code>color(danger)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>

        <div class="swatch swatch--inverse-base">
            <div class="swatch__colour">
                <span class="swatch__text">inverse</span>
            </div>
            <div class="swatch__label">
                <code>color(inverse)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>

</div>

Each of the state variables has an alternate version which is used to define the colour of any overlaid text or icons. Eg: `color(success, alt)`.

### Monochromes

Used for colouring UI elements and providing contrast

<div class="pulsar-example">
    <div class="swatch swatch--black">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(black)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>
            <div class="swatch swatch--gray-darker">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(gray, darker)</code>
                <span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>
            <div class="swatch swatch--gray-dark">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(gray, dark)</code>
<span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>
            <div class="swatch swatch--gray-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(gray)</code>
<span><i class="icon-ok"></i> AA Compliant</span>
            </div>
        </div>
            <div class="swatch swatch--gray-light">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(gray, light)</code>
            </div>
        </div>
            <div class="swatch swatch--gray-lighter">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(gray, lighter)</code>
            </div>
        </div>
<div class="swatch swatch--gray-lightest">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(gray, lightest)</code>
            </div>
        </div>
            <div class="swatch swatch--gray-off-white">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(gray, off-white)</code>
            </div>
        </div>
            <div class="swatch swatch--white">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(white)</code>
            </div>
        </div>

        </div>
</div>

### Text and links

<div class="pulsar-example">

            <div class="swatch swatch--text-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(text)</code>
            </div>
        </div>

            <div class="swatch swatch--text-light">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(text, light)</code>
            </div>
        </div>

            <div class="swatch swatch--link-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(link)</code>
            </div>
</div>

            <div class="swatch swatch--link-hover">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(link, hover)</code>
            </div>
        </div>
</div>

---

## Jadu principle colours

Our colours are what give us our personality. We’re bright, bold and confident. We’re clever but clear.

<div class="pulsar-example">

            <div class="swatch swatch--jadu-red-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-red)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-blue-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-blue)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-green-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-green)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-teal-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-teal)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-pink-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-pink)</code>
            </div>
        </div>
</div>

Each of the principle colours has its individual palette. These can be used as combinations but with care and good reason. If in doubt, stick to the palette.

### Jadu red

Associated with CONTINUUM.

<div class="pulsar-example">
    <div class="swatch swatch--jadu-red-darkest">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-red, darkest)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-red-dark">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-red, dark)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-red-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-red)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-red-light">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-red, light)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-red-pale">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-red, pale)</code>
            </div>
        </div>


</div>

### Jadu blue

Associated with CMS.

<div class="pulsar-example">
    <div class="swatch swatch--jadu-blue-darkest">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-blue, darkest)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-blue-dark">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-blue, dark)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-blue-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-blue)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-blue-light">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-blue, light)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-blue-pale">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-blue, pale)</code>
            </div>
        </div>
</div>

### Jadu green

Associated with XFP.

<div class="pulsar-example">
    <div class="swatch swatch--jadu-green-darkest">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-green, darkest)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-green-dark">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-green, dark)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-green-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-green)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-green-light">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-green, light)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-green-pale">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-green, pale)</code>
            </div>
        </div>
</div>

### Jadu teal

Associated with CXM.

<div class="pulsar-example">
                <div class="swatch swatch--jadu-teal-darkest">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-teal, darkest)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-teal-dark">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-teal, dark)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-teal-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-teal)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-teal-light">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-teal, light)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-teal-pale">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-teal, pale)</code>
            </div>
        </div>
</div>

### Jadu pink

Associated with CP.

<div class="pulsar-example">

            <div class="swatch swatch--jadu-pink-darkest">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-pink, darkest)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-pink-dark">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-pink, dark)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-pink-base">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-pink)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-pink-light">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-pink, light)</code>
            </div>
        </div>

            <div class="swatch swatch--jadu-pink-pale">
            <div class="swatch__colour">
            </div>
            <div class="swatch__label">
                <code>color(jadu-pink, pale)</code>
            </div>
        </div>
</div>
