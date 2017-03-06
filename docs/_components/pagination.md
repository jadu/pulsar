---
layout: page
title: Pagination
category: Components
---

**Be aware that we're planning on integrating datatables across our software which will take care of pagination.**

Pagination allows you to organise a long data-grid into 'pages'.

<p data-height="105" data-theme-id="24005" data-slug-hash="905a684f0d1ba24e2b855fad74d79513" data-default-tab="result" data-user="stanton" class='codepen'>See the Pen <a href='http://codepen.io/stanton/pen/905a684f0d1ba24e2b855fad74d79513/'>905a684f0d1ba24e2b855fad74d79513</a> by Paul Stanton (<a href='http://codepen.io/stanton'>@stanton</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

The previous and next links should always be visible, but disabled if they're not applicable (if the user is on the first/last page).

Markup example (there are no helpers for pagination):

```html
<div class="pagination">
    <ul class="pull-left"><!--
        --><li class="is-disabled"><a href="#"><i class="icon-double-angle-left"></i> Previous</a></li><!--
        --><li><a href="#">1</a></li><!--
        --><li class="selected"><a href="#">2</a></li><!--
        --><li><a href="#">3</a></li><!--
        --><li><a href="#">4</a></li><!--
        --><li><a href="#">5</a></li><!--
        --><li><a href="#">Next <i class="icon-double-angle-right"></i></a></li><!--
    --></ul>
</div>
```
