# HypeStateKit
![HypeDocumentLoader|690x487](https://playground.maxziebell.de/Hype/StateKit/HypeStateKit.jpg) 
<sup>The cover artwork is not hosted in this repository and &copy;opyrighted by Max Ziebell</sup>

This extension is a Hype specific interface to LocalStorage and allows for local persistent user data (browser specific). It also extends on the capability of the regular LocalStorage to store complex and nested data. This is a quick first release and more examples will follow on demand so feel free to reach out.

Example: Using Hype StateKit with hypeDocument.customData
---
Here is a quick function example to make **customData** a persistent value across page reloads

```javascript
/* RETRIEVE the data  */
hypeDocument.customData = hypeDocument.loadState('customData');

/* INIT (optional) set to object for pre 612 build */
if (hypeDocument.customData==null) {
	hypeDocument.customData = {}
} 

/* DEFAULTS (optional) set to inital app/animation data*/
if (Object.keys(hypeDocument.customData).length==0) { 
	hypeDocument.customData = {
		name : 'tom',
		nested : {hello : 'world'}
	}
}

/* DO YOUR STUFF with the data in hypeDocument.customData (interaction) */

/* SAVE it when appropriate */
hypeDocument.saveState('customData', hypeDocument.customData);
```


**Demonstration:**  
https://playground.maxziebell.de/Hype/StateKit/

**Version history:**  
`1.0   Initial release with simple example`  
`1.1	Fixed some minor details`  

Content Delivery Network (CDN)
--
Latest version can be linked into your project using the following in the head section of your project:
```html
<script src="https://cdn.jsdelivr.net/gh/worldoptimizer/HypeStateKit/HypeStateKit.min.js"></script>
```

Optionally you can also link a SRI version or specific releases. 
Read more about that on the JsDelivr (CDN) page for this extension at https://www.jsdelivr.com/package/gh/worldoptimizer/HypeStateKit

Learn how to use the latest extension version and how to combine extensions into one file at
https://github.com/worldoptimizer/HypeCookBook/wiki/Including-external-files-and-Hype-extensions
