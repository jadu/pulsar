---
layout: page
title: Responsive utilities
---

There are a collection of variables and classes to allow you to control the visibility of certain elements at a varienty of screen widths.

## Breakpoints

These are defined in `_config.variables.scss` and can be used in your own media queries.

| Device | Minimum width | Sass variable |
| ---------- | ------------- | ----------------- |
| Mobile | 480px | `$screen-phone` |
| Phablet | 600px | `$screen-phablet` |
| Tablet | 767px | `$screen-tablet` |
| Desktop | 991px | `$screen-desktop` |
| Widescreen | 1200px | `$screen-large-desktop` |

## Mixins

Use with the breakpoint variables for easier media queries. Be aware that IE8 will only get desktop styles.

### Respond min

###### Usage

```scss
respond-min($width)
```

###### Example

```scss
@include respond-min($screen-desktop) {
    ...
}
```

### Respond max

###### Usage

```scss
respond-max($width)
```

###### Example

```scss
@include respond-max($screen-tablet) {
    ...
}
```

### Respond min-max

###### Usage

```scss
respond-min-max($min-width, $max-width, $reverse: null) {
```

###### Example

```scss
@include respond-min-max($screen-tablet, $screen-desktop) {
    ...
}
```

## Visibility

Use the following utility classes to control the visibility of elements at certain screen sizes.

| Class                 | Mobile  | Tablet  | Desktop |
| --------------------- | ------- | ------- | ------- |
| .u-visible-on-phone   | Visible | ✕       | ✕       |
| .u-visible-on-tablet  | ✕       | Visible | ✕       |
| .u-visible-on-desktop | ✕       | ✕       | Visible |
| .u-hidden-on-phone    | ✕       | Visible | Visible |
| .u-hidden-on-tablet   | Visible | ✕       | Visible |
| .u-hidden-on-desktop  | Visible | Visible | ✕       |
