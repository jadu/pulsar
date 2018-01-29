---
layout: page
title: Favicon
category: Components
---

The favicon updater is a service that allows users to add programmatic favicon updates. This can be something as simple as a small coloured circle on top of the existing favicon to indicate a notification, or more complex graphics to indicate application state changes.

### Usage

Creating an instance of the `FaviconEditor`. The init method must be called once the document has loaded, it will build a reference to all favicons scoped to the `root` node.

```javascript
const FaviconEditor = require('/path/to/pulsar/Notifications/FaviconEditor');

// The favicon editor takes 1 argument to it's constructor. This argument
// will be the root node used for querying <link/> elements. This will
// almost certainly need to be the <head/> node. 

/**
 * @param root {HTMLElement} The root node to query for <link/> nodes  
 */
const favicon = new FaviconEditor(document.head);

favicon.init();
```

---

### Preset Notifications

The favicon presets are convenience methods created for common situations. It is expected that this list will grow as the service is iterated and common patterns are identified.

#### Notification Circle

The `addNotificationCircle` method adds a coloured circle to the top right corner of the favicon.

```javascript
const favicon = new FaviconEditor(document.head);

favicon.init();

/**
 * @param colour {string} notification colour, supports preset CSS colours as well as stringified hex values
 * @param size? {number} an optional radius value, this controls the size of the notification in pixels
 * @returns {Promise<data>}
 */
favicon.addCircleNotification('red', 5).then(data => {});
```

---

### Custom Notifications

The `addCustomNotification` method exposes the `Canvas` and the `CanvasRenderingContext2D` to the public API. This allows users of the service to create custom notifications by interacting directly with the favicon prior to rendering.

```javascript
const favicon = new FaviconEditor(document.head);

favicon.init();

// In this example we will draw a 5px x 5px red square in the top left of the favicon

/**
 * @param {function} a function that is invoked during the favicon manipulation method 
 * @returns {Promise<data>}
 */
favicon.addCustomNotification(function (canvas, context) {
    context.fillStyle = 'red';
    context.rect(0, 0, 5, 5);
    context.fill();
}).then(data => {});
```

---

### Restore

The `restore` method will restore the favicon to it's original state when the service was initiated.

```javascript
const favicon = new FaviconEditor(document.head);

favicon.init();

// ...

favicon.restore();
```

---

### Serializer

For further custom implementations of the Favicon service the `setSerializer` method is exposed to the public API. This is the method that generates the data from the edited favicon. The default serializer function simply invokes `canvas.toDataURL('image/png')` and returns it's value. The return value of this method will be assigned to the `href` property of each `<link/>` node.

```javascript
const favicon = new FaviconEditor(document.head);

favicon.init();

/**
 * The default serializer function
 * @param canvas {HTMLCanvasElement}
 * @param context {CanvasRenderingContext2D}
 * @param originalImage {HTMLImageElement} derived from the original favicon <link/> node
 */
function (canvas, context, originalImage) {
    return canvas.toDataURL(`image/${getFileExtension(originalImage.src)}`);
}

// In this example we return the raw image data from our serializer, this return
// value will be our promise resovle value when invoking update methods
favicon.setSerializer(function (canvas, context, originalImage) {
    return context.getImageData(0, 0, canvas.width, canvas.height);
});

favicon.addCircleNotification('red').then(data => {
    console.log(data); // raw image data from custom serializer
});

```



