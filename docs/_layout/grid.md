---
layout: page
title: Grid
category: Layout
---

Align components and elements against a responsive 12 column grid. The grid is available to control the contents of the `tab__content` element, rather than the entire layout.

All grid classes are namespaced with the `g-` utility namespace.

![grid example]({{ site.baseurl }}/assets/image_examples/grid.png)

## Column styling

If you want an element to behave like a column, it must have the `.g-col` class. This will give it block level styling and floats. If you just want to control the width and margin of an element you can use the column width classes, or column push classes detailed below.

## Width of elements

An element can span 1 to 12 of the available columns, using the `.g-col--x` class.

Note that this example is misaligned as we've not yet removed the first column margin (explained next).

![grid example]({{ site.baseurl }}/assets/image_examples/grid-1.png)

```html
<div class="g-col--2">foo</div>

<div class="g-col--9">bar</div>
```

## Remove first column margin

Column margins are applied to the left hand edge, make your first element line up flush with the container by using the `.g-col--first` class to remove the left margin.

![grid example]({{ site.baseurl }}/assets/image_examples/grid-2.png)

```html
<div class="g-col--2 g-col--first">foo</div>

<div class="g-col--9">bar</div>
```

## Column push

Indent an element a certain number of column widths using the `.g-col-push--x` class.

![grid example]({{ site.baseurl }}/assets/image_examples/grid-3.png)

```html
<div class="g-col--2 g-col-push--1 g-col--first">foo</div>

<div class="g-col--2">bar</div>
```

## Setting columns in Sass

To make an element fit a specific number of columns, use the `span()` mixin, supplying a number from 1-12.

```sass
.my-element {
    @include span(5);
    ...
}
```

## Responsive behaviour

At phone/xsmall breakpoints, all columns will switch to 100% width by default.

![grid example]({{ site.baseurl }}/assets/image_examples/grid-4.png)

Individual components or elements may override this behaviour by setting the `force` parameter of the `span()` mixin to `true`.


You can (and perhaps should) restrict your override to affect only the mobile breakpoint by using the `respond-max($screen-tablet)` breakpoint, for example:

```sass
.my-element {
    @include respond-max($screen-tablet) {
        @include span(5, true);
        ...
    }
}
```

As the 12 column grid will be much narrower at this screen size, this method also allows you to specify a more suitable number of columns rather than simply forcing it not to stretch to 100%.

If you're coding your own components and would prefer to stick to a 'mobile first' ethos, you can use set your mobile columns outside of a media query, using `force`, and then define your other styles in specific phablet/tablet/desktop/widescreen queries as required.

This method also means you don't need to declare column classes in the markup.

```sass
.my-element {
    @include span(10, true);
    // mobile styles here

    @include respond-min($screen-tablet) {
        @include span(5);
        // tablet -> desktop styles here
    }
}
```
