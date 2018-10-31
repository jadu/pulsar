---
layout: page
title: Utility classes
---

There are a collection of variables and classes to allow you to control the visibility of certain elements at a varienty of screen widths.

These can be extended with sass placeholders, e.g. `@extend %u-display-none`.

| Class | Style |
| .hide | hides an element |
| .show | shows an element (used as a reset to .hide) |
| .margin-left | margin-left: $gutter-width; |
| .margin-right | margin-right: $gutter-width; |
| .no-select | user-select: none; (and all browser prefix variations) |
| .u-clear-left | clear: left !important; |
| .u-clear-right | clear: right !important; |
| .u-clear-both | clear: both !important; |
| .u-clear-none | clear: none !important; |
| .u-clear-initial | clear: initial !important; |
| .u-clear-inherit | clear: inherit !important; |
| .u-cursor-not-allowed | cursor: not-allowed !important; |
| .u-display-none | display: none !important; |
| .u-display-block | display: block !important; |
| .u-display-inline | display: inline !important; |
| .u-display-inline-block | display: inline-block !important; |
| .u-float-none | float: none !important; |
| .u-float-left | float: left !important; |
| .u-float-right | float: right !important; |
| .u-margin-bottom-none | margin-bottom: 0 !important; |
| .u-margin-top-none | margin-top: 0 !important; |
| .u-no-border | border: 0 !important; |
| .u-no-hover | background-color: inherit !important; |
| .u-no-wrap | white-space: nowrap !important; |
| .u-text-align-left | text-align: left !important; |
| .u-text-align-center | text-align: center !important; |
| .u-text-align-right | text-align: right !important; |
| .u-text-align-justify | text-align: justify !important; |
| .u-vertical-align-top | vertical-align: top !important; |
| .u-vertical-align-middle | vertical-align: middle !important; |
| .u-vertical-align-bottom | vertical-align: bottom !important; |
| .u-vertical-align-baseline | vertical-align: baseline !important; |
| .u-width-auto | width: auto !important; |
| .u-word-break | word-break: break-all !important; |
| .visually-hidden | display: none; |

## Responsive utilities

### Breakpoints

These are defined in `_config.variables.scss` and can be used in your own media queries.

| Device | Minimum width | Sass variable |
| ---------- | ------------- | ----------------- |
| Mobile | 480px | $screen-phone |
| Phablet | 600px | $screen-phablet |
| Tablet | 767px | $screen-tablet |
| Desktop | 991px | $screen-desktop |
| Widescreen | 1200px | $screen-large-desktop |

### Mixins

Use with the breakpoint variables for easier media queries. Be aware that IE8 will only get desktop styles.

#### Respond min

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

#### Respond max

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

#### Respond min-max

###### Usage

```scss
respond-min-max($min-width, $max-width, $reverse: null) {
    ...
}
```

###### Example

```scss
@include respond-min-max($screen-tablet, $screen-desktop) {
    ...
}
```

### Screen / Device Visibility

Use the following utility classes to control the visibility of elements at certain screen sizes.

| Class                 | Mobile  | Tablet  | Desktop |
| --------------------- | ------- | ------- | ------- |
| .u-visible-on-phone   | Visible | ✕       | ✕       |
| .u-visible-on-tablet  | ✕       | Visible | ✕       |
| .u-visible-on-desktop | ✕       | ✕       | Visible |
| .u-hidden-on-phone    | ✕       | Visible | Visible |
| .u-hidden-on-tablet   | Visible | ✕       | Visible |
| .u-hidden-on-desktop  | Visible | Visible | ✕       |

### Print Visibility

Controls the visibility of elements using `@media print`.

| Class                         | Screen display | Print display |
| ----------------------------- | -------------- | ------ |
| .u-visible-print              | none           | block (table/tr/td use respective table/table-row/table-cell) |
| .u-visible-print-inline       | none           | inline |
| .u-visible-print-inline-block | none           | inline-block |
| .u-hidden-print               | not changed    | none |
