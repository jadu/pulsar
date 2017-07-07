---
layout: page
title: DropZone
category: Components
---

The DropZone is a component that can create a pre-formatted area for uses to drag files, it can also be used to convert a pre-existing HTML element into a droppable area. 

## Example usage

"vanilla" DropZone using default configuration

{% raw %}
```twig
{% import '@pulsar/pulsar/v2/helpers/html.html.twig' as html %}

{{
    html.dropzone({
        'id': 'drop-zone'
    })
}}
```
```javascript
import DropZoneComponentFactory from '../path/to/DropZoneComponentFactory';

const dropZoneComponent = DropZoneComponentFactory.create(
    document.documentElement, 
    '.dropzone-selector'
);

dropZoneComponent.init();
```
{% endraw %}


## Options

Reference table for Twig component options, more detail on initialising in alternative environments below.

Option                              | Type      | Description
----------------------------------- | --------- | ----------------------------------------------------
helperLabel                         | string    | The label for the default helper text popup
helperTitle                         | string    | The heading for the default helper text popup
helperContent                       | string    | The content for the default helper text popup
data-dropzone-max-files             | string    | The maximum ammount of files a DropZone will accept
data-dropzone-max-size              | string    | The combined file size limit of a group of files
data-dropzone-idle-html             | string    | The idle html for the DropZone info node
data-dropzone-window-enter-html     | string    | The window enter event html for the DropZone info node
data-dropzone-drop-zone-enter-html  | string    | The DropZone enter event html for the DropZone info node
data-dropzone-passive               | boolean   | Enable passive mode
data-dropzone-supported             | boolean   | Set whether the file API is supported 
data-dropzone-input-node-id         | string    | ID of corresponding input node
data-dropzone-show-input-node       | boolean   | Show associated input node
data-dropzone-file-node-desc        | boolean   | Show file description in file html
data-dropzone-file-node-name        | boolean   | Show file name in file html
data-dropzone-file-node-size        | boolean   | Show file size in file html
data-dropzone-file-node-type        | boolean   | Show file type in file html

Any option from the reference above that is prefixed with `data-dropzone-` can be initialised using the twig helper (or HTML when in passive mode) or through the DropZone's `init(...)` method as a camel case version of the attribute.

---

#### Max Files

```
@param {String|Number}
@deafult [5]
```

The max files option sets the maximum amount of files allowed onto the DropZone, this is a running total and will persist across multiple drops. If the limit is exceeded a DropZone error will be thrown.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-max-files': '5' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-max-files="5"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ maxfiles: 5 )`

---

#### Max Size

```
@param {String|Number}
@deafult [3e+8]
```

The max size option sets the maximum amount of bytes allowed on the DropZone, this is a running total and will persist across multiple drops. If the limit is exceeded a DropZone error will be thrown.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-max-size': '50000' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-max-size="50000"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ maxSize: 50000 )`

---

#### Idle HTML

```
@param {String}
@deafult ['your files here or <a class="dropzone__browse" id="#">Browse Files</a>']
```

The idle HTML option specifies the HTML content for the DropZone helper node when it is in it's idle state.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-idle-html': '<p>foo</p>' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-idle-html="<p>foo</p>"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ idleHtml: '<p>foo</p>' )`

---

#### Window enter HTML

```
@param {String}
@deafult ['Drag your files here']
```

The window enter HTML option specifies the HTML content for the DropZone helper node when files have entered the window.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-window-enter-html': '<p>foo</p>' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-window-enter-html="<p>foo</p>"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ windowEnterHtml: '<p>foo</p>' )`

---

#### DropZone enter HTML

```
@param {String}
@deafult ['Drop your files here']
```

The DropZone enter HTML option specifies the HTML content for the DropZone helper node when files have entered the DropZone.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-drop-zone-enter-html': '<p>foo</p>' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-drop-zone-enter-html="<p>foo</p>"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ dropZoneEnterHtml: '<p>foo</p>' )`

---

#### Passive

```
@param {Boolean}
@deafult [false]
```

The passive option specifies if the DropZone will be in passive mode. When in passive mode, the DropZoneComponent will not alter any HTML apart from adding file nodes once a file is added. It should be used for when you need to turn an existing element into a DropZone and do not want to use the default DropZone HTML. When in passive mode you will need to leverage the DropZoneComponent API in order to change state.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-passive': true })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-passive="true"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ passive: true )`

---

#### Supported

```
@param {Boolean}
@deafult [true]
```

The supported option specifies whether the plugin attaches events to the environment. This will typically be used in environments that do not support the File API, IE9 for instance. Therefore it makes most sense to set this options in the JavaScript init code as we'll be able to determine the environment at that point.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-supported': false })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-supported="false"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ supported: document.documentElement.search('lt-ie10') < 0 })`

---

#### Input node ID

```
@param {String|null}
@deafult [null]
```

The input node ID option specifies whether there is a corresponding input node, the value should be the ID attribute on said node. This is useful if you need to hook the DropZone up to an already existing input node, it also allows us to use the native "Browse" functionality.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-input-node-id': 'foo' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-input-node-id="foo"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ inputNodeId: 'foo' })`

---

#### Show input node

```
@param {Boolean}
@deafult [false]
```

The show input node option specifies if the corresponding input node should be hidden by the DropZoneComponent. It's recommended that this is handled in CSS to prevent any flashing of the input element.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-show-input-node': 'true' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-show-input-node="true"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ showInputNode: true })`

---

#### File node description

```
@param {Boolean}
@deafult [true]
```

The file node description option specifies if the file HTML that is generated includes the file description.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-file-node-name': 'false' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-file-node-name="false"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ fileNodeDesc: false })`

---

#### File node name

```
@param {Boolean}
@deafult [true]
```

The file node name option specifies if the file HTML that is generated includes the file name.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-file-node-name': 'false' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-file-node-name="false"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ fileNodeName: false })`

---

#### File node size

```
@param {Boolean}
@deafult [true]
```

The file node size option specifies if the file HTML that is generated includes the file size.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-file-node-size': 'false' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-file-node-size="false"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ fileNodeSize: false })`

---

#### File node type

```
@param {Boolean}
@deafult [true]
```

The file node type option specifies if the file HTML that is generated includes the file type.

Environment | Code
----------- | ----------------------------------------
Twig        | `html.dropzone({ 'data-dropzone-file-node-type': 'false' })`
----------- | -----------------------------------------
HTML        | `<div data-dropzone-file-node-type="false"></div>`
----------- | -----------------------------------------
JavaScript  | `dropZoneComponent.init({ fileNodeType: false })`

---









