# bootstrap-requirejs

Convert [bootstrap](https://github.com/twitter/bootstrap) js files to AMD [requirejs](https://github.com/jrburke/requirejs/) modules.

## How to use
In the html page head:
```html
<script data-main="/js/main" src="/vendor/require.js"></script>
```

In requirejs config:
```javascript
paths: {
  vendor: '/vendor',
  bootstrap: '/vendor/bootstrap',
  jquery: ['//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min', 'vendor/jquery']
}
```

In the main.js file:
```javascript
requirejs(['jquery', 'bootstrap/popover', 'vendor/domReady!'], function($) {
  $('#popover-element').popover();
});
```

The folder structure:
```
js/
  main.js
vendor/
  bootstrap/
    affix.js
    alert.js
    button.js
    carousel.js
    collapse.js
    dropdown.js
    modal.js
    popover.js
    scrollspy.js
    tab.js
    tooltip.js
    transition.js
    typeahead.js
  domReady.js
  require.js
  jquery.js
page.htm
```

### Current bootstrap version: 2.2.2