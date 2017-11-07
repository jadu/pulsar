---
layout: page
title: Card
category: Components
---

Cards are a flexible container for standout content with a range of configurable options for headers and footers, images and calls to action.

Cards can be sized and arranged using the common grid classes and respond well at small screen widths.

## Example usage

{% code_example html_helpers/card %}

<div class="pulsar-example">
    <div class="card">
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta" class="btn btn--primary">Call to Action</a>
        </div>
    </div>
</div>

## Body

At its most basic, a card can just contain a body.

{% code_example html_helpers/card-body %}

<div class="pulsar-example">
    <div class="card">
        <div class="card__body">
            <p>This is the card body, it should be helpful and descriptive.</p>
        </div>
    </div>
</div>

## Titles, text, and links

A card can contain a `.card__title` using a `<h*>` element within the body.

Links using the `.card-link` class will be spaced apart slightly.

{% code_example html_helpers/card-title-links %}

<div class="pulsar-example">
    <div class="card">
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta-one" class="card-link">Card link</a>
            <a href="#cta-two" class="card-link">Another link</a>
        </div>
    </div>
</div>

## Images

Images can be added to the top of a card, they will be automatically made to respond to the card width.

Use `.card--full-bleed` on the `.card` to make the image cover the default border of the card.

<div class="pulsar-example">
    <div class="card g-col g-col--6 g-col--first">
        <img src="http://via.placeholder.com/600x250/ebebeb/000000?text=image" class="card-img" />
        <div class="card__body">
            <h3 class="card__title">Normal</h3>
            <p>The image will be contained within the cards default border.</p>
            <a href="#cta-one" class="card-link">Card link</a>
            <a href="#cta-two" class="card-link">Another link</a>
        </div>
    </div>

    <div class="card card--full-bleed g-col g-col--6">
        <img src="http://via.placeholder.com/600x250/ebebeb/000000?text=image" class="card-img" />
        <div class="card__body">
            <h3 class="card__title">Full bleed</h3>
            <p>This card uses <code>.card--full-bleed</code>, the difference is subtle.</p>
            <a href="#cta-one" class="card-link">Card link</a>
            <a href="#cta-two" class="card-link">Another link</a>
        </div>
    </div>
</div>

## Headers and footers

Add an optional header and/or footer within a card. You can choose whether or not to also include a card title.

{% code_example html_helpers/card-header-footer %}

<div class="pulsar-example">
    <div class="card">
        <div class="card__header">
            <p class="card__heading">Card Heading</p>
        </div>
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta-one" class="card-link">Card link</a>
            <a href="#cta-two" class="card-link">Another link</a>
        </div>
        <div class="card__footer muted">
            <p>Card footer</p>
        </div>
    </div>
</div>

<h2>Grid sizing</h2>

Cards will be 100% width by default and can be modified using [grid classes](/layout/grid/). Use `.row` divs to organise cards into rows until we get fancier with flexbox.

```html
<div class="card g-col g-col--6 g-col--first">...</div>
<div class="card g-col g-col--6">...</div>
```

<div class="pulsar-example">
    <div class="card g-col g-col--6 g-col--first">
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta" class="btn btn--primary">Call to Action</a>
        </div>
    </div>
    <div class="card g-col g-col--6">
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta" class="btn btn--primary">Call to Action</a>
        </div>
    </div>
</div>

```html
<div class="card g-col g-col--4 g-col--first">...</div>
<div class="card g-col g-col--4">...</div>
<div class="card g-col g-col--4">...</div>
```

<div class="pulsar-example">
    <div class="card g-col g-col--4 g-col--first">
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta" class="btn btn--primary">Call to Action</a>
        </div>
    </div>
    <div class="card g-col g-col--4">
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta" class="btn btn--primary">Call to Action</a>
        </div>
    </div>
    <div class="card g-col g-col--4">
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta" class="btn btn--primary">Call to Action</a>
        </div>
    </div>
</div>

## Centered

Use the `.u-text-align-center` utility class to make an entire card centered.

```html
<div class="card u-text-align-center">...</div>
```

<div class="pulsar-example">
    <div class="card u-text-align-center">
        <div class="card__header">
            <p class="card__heading">Card Heading</p>
        </div>
        <div class="card__body">
            <h3 class="card__title">Card Title</h3>
            <p>This is the card body, it should be helpful and descriptive.</p>
            <a href="#cta-one" class="card-link">Card link</a>
            <a href="#cta-two" class="card-link">Another link</a>
        </div>
        <div class="card__footer muted">
            <p>Card footer</p>
        </div>
    </div>
</div>
