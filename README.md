# Backstretch

Backstretch is a simple jQuery plugin that allows you to add a dynamically-resized, slideshow-capable background image to any page or element. The image will stretch to fit the page/element, and will automatically resize as the window/element size changes.

## Original Repository

Is here: https://github.com/srobbin/jquery-backstretch  
But we haven't seen any kind of activity by the author for about 2 years already. So I've taken the PRs that were there and merged them carefully, with some improvements and cleanup. This fork is the result.

## Demo

There are a couple of examples included with this package, or feel free to check it out live [on the project page itself](http://srobbin.com/jquery-plugins/backstretch/).

## Setup

Include the jQuery library (version 1.7 or newer) and Backstretch plugin files in your webpage (preferably at the bottom of the page, before the closing BODY tag):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="jquery.backstretch.min.js"></script>
<script>
  // To attach Backstrech as the body's background
  $.backstretch("path/to/image.jpg");

  // You may also attach Backstretch to a block-level element
  $(".foo").backstretch("path/to/image.jpg");

  // If your element defines a background image with CSS, you can omit the argement altogether
  $(".foo").backstretch();

  // Or, to start a slideshow, just pass in an array of images
  $(".foo").backstretch([
    "path/to/image.jpg",
    "path/to/image2.jpg",
    "path/to/image3.jpg"    
  ], {duration: 4000});

  // Or, to load from a url that can accept a resolution and provide the best image for that resolution
  $(".foo").backstretch([
    "path/to/image.jpg?width={width}&height={height}"
  ]);

  // Or, to automatically choose from a set of resolutions.
  // The width is the width of the image, and the algorithm chooses the best fit.
  $(".foo").backstretch([
    [
      { width: 1080, url: "path/to/image1_1080.jpg" },
      { width: 720, url: "path/to/image1_720.jpg" },
      { width: 320, url: "path/to/image1_320.jpg" }
    ],
    [
      { width: 1080, url: "path/to/image2_1080.jpg" },
      { width: 720, url: "path/to/image2_720.jpg" },
      { width: 320, url: "path/to/image2_320.jpg" }
    ]
  ]);

  // If we wanted to specify different images for different pixel-ratios:
  $(".foo").backstretch([
    [
      // Will only be chosed for a @2x device
      { width: 1080, url: "path/to/image1_1080@2x.jpg", pixelRatio: 2 },
      
      // Will only be chosed for a @1x device
      { width: 1080, url: "path/to/image1_1080.jpg", pixelRatio: 1 },
      
      { width: 720, url: "path/to/image1_720@2x.jpg", pixelRatio: 2 },
      { width: 720, url: "path/to/image1_720.jpg", pixelRatio: 1 },
      { width: 320, url: "path/to/image1_320@2x.jpg",  pixelRatio: 2 },
      { width: 320, url: "path/to/image1_320.jpg", pixelRatio: 1 }
    ]
  ]);

  // If we wanted the browser to automatically choose from a set of resolutions,
  // While considering the pixel-ratio of the device
  $(".foo").backstretch([
    [
      // Will be chosen for a 2160 device or a 1080*2 device
      { width: 2160, url: "path/to/image1_2160.jpg", pixelRatio: "auto" }, 
      
      // Will be chosen for a 1080 device or a 540*2 device
      { width: 1080, url: "path/to/image1_1080.jpg", pixelRatio: "auto" },
      
      // Will be chosen for a 1440 device or a 720*2 device
      { width: 1440, url: "path/to/image1_1440.jpg", pixelRatio: "auto" },
      { width: 720, url: "path/to/image1_720.jpg", pixelRatio: "auto" },
      { width: 640, url: "path/to/image1_640.jpg", pixelRatio: "auto" },
      { width: 320, url: "path/to/image1_320.jpg", pixelRatio: "auto" }
    ]
  ]);
</script>
```

## Automatic resolution selection

The automatic resolution selection algorithm has multiple options to choose from.  
The default behaviour is that it matches the logical width of the element against the specified image sizes. Which means that an element with a 320px width on a @2x device is still considered as 320px.  
If you want 320px on a @2x device to be considered as 640px, then you can specify `pixelRatio: "auto"` on the specific image resolution.  
However if you want to limit specific images to only be chosen if the device has a certain pixel ratio - you can specify that pixel ratio i.e `pixelRatio: 2.5`.

## Options

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `alignX` * | This parameter controls the horizontal alignment of the image. Can be 'center'/'left'/'right' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `alignY` * | This parameter controls the vertical alignment of the image. Can be 'center'/'top'/'bottom' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `fade` * | This is the speed at which the image will fade in. Integers in milliseconds are accepted, as well as standard jQuery speed strings (slow, normal, fast). | Integer or String | 0 |
| `fadeFirst` | If `true`, the first image will fade in like all the others. | Boolean | true |
| `duration` * | The amount of time in between slides, when using Backstretch as a slideshow, expressed as the number of milliseconds. | Integer | 5000 |
| `paused` | For slideshows: Disables the change between slides | Boolean | false |
| `start` | The index of the image in the array you want to start your slideshow with. | Integer | 0 |
| `preload` | How many images to preload at once? I.e. Lazy-loading can be enabled by specifying 0. | Integer | 2 |
| `preloadSize` | How many images to preload in parallel? If we are preloading 5 images for the next slides, we might want to still limit it to only preload 2 or 3 at once, according to the expected available bandwidth. | Integer | 1 |
| `bypassCss` | Avoid adding any CSS to the IMG element. I.e if you want a dynamic IMG tag that is laid out with the content. | Boolean | false |
| `centeredX` | Deprecated. Still works but please do not use it. | Boolean | true |
| `centeredY` | Deprecated. Still works but please do not use it. | Boolean | true |

* Options marked with an `*` can be specified for individual images

## Image definition

Each image in the set can be a String specifying the URL for the image, *or* an object with the following options, *or* an array of images for different resolutions to choose between.

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `url` | The url of the image | String | |
| `alt` | The alternative text for this image (If you want to play along with screen readers) | String | '' |
| `alignX` | This parameter controls the horizontal alignment of the image. Can be 'center'/'left'/'right' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `alignY` | This parameter controls the vertical alignment of the image. Can be 'center'/'top'/'bottom' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `fade` | This is the speed at which the image will fade in. Integers in milliseconds are accepted, as well as standard jQuery speed strings (slow, normal, fast). | Integer or String | 0 |
| `duration` | The amount of time in between slides, when using Backstretch as a slideshow, expressed as the number of milliseconds. | Integer | 5000 |

## Per-resolution-image definition

If you have specified an array of resolutions for a single image, then these are the available options:

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `url` | The url of the image | String | |
| `alt` | The alternative text for this image (If you want to play along with screen readers) | String | '' |
| `width` | The width of the image | Integer | |
| `pixelRatio` | A strict rule to only choose for the specified device pixel ratio. If set to 'auto', then the element's width will first be multiplied by the device's pixel ratio before evaluating. | Number or "auto" | undefined |
| `alignX` | This parameter controls the horizontal alignment of the image. Can be 'center'/'left'/'right' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `alignY` | This parameter controls the vertical alignment of the image. Can be 'center'/'top'/'bottom' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `fade` | This is the speed at which the image will fade in. Integers in milliseconds are accepted, as well as standard jQuery speed strings (slow, normal, fast). | Integer or String | 0 |
| `duration` | The amount of time in between slides, when using Backstretch as a slideshow, expressed as the number of milliseconds. | Integer | 5000 |

## Slideshow API

Once you've instantiated a Backstretch slideshow, there are many actions that you can perform it:

```javascript
// Start a slideshow
$('.foo').backstretch([
  'path/to/image.jpg',
  'path/to/image2.jpg',
  'path/to/image3.jpg'
]);

```javascript
// Slideshow with granular control
$('.foo').backstretch([
  { url: 'path/to/image.jpg', duration: 3000 }
  { url: 'path/to/image2.jpg', fade: 250 },
  { url: 'path/to/image3.jpg', alignY: 0.2 }
]);

// Pause the slideshow
$('.foo').backstretch("pause");

// Advance to the next slide
$('.foo').backstretch("next");
```

| Method | Description |
|------|-------------|
| `.backstretch("show", n)` | Jump to the slide at a given index, where n is the number of the image that you'd like to display. Slide number starts at 0. |
| `.backstretch("prev")` | Display the previous image in a slideshow. |
| `.backstretch("next")` | Advance to the next image in a slideshow. |
| `.backstretch("pause")` | Pause the slideshow. |
| `.backstretch("resume")` | Resume a paused slideshow. |
| `.backstretch("destroy", preserveBackground)` | Destroy the Backstretch instance. Optionally, you can pass in a Boolean parameter, preserveBackground, to determine whether or not you'd like to keep the current image stretched as the background image. |
| `.backstretch("resize")` | This method is called automatically when the container (window or block-level element) is resized, however you can always call this manually if needed. |

## Public Variables

Sometimes, you'll want to access Backstretch's images after you've instantiated the plugin. For example, perhaps you'd like to be able add more images to a slideshow. Doing so is easy. You can access the images array as follows:

```javascript
$('.foo').backstretch([
  'path/to/image.jpg',
  'path/to/image2.jpg',
  'path/to/image3.jpg'
]);

// Access the instance
var instance = $('.foo').data('backstretch');

// Then, you can manipulate the images array directly
instance.images.push('path/to/image4.jpg')
```

Additionally, the current index of a slideshow is available through the instance as well:

```javascript
$("body").data("backstretch").index;
```

## Events

### backstretch.before

Backstretch will fire a "backstretch.before" event before a new image loads, triggering a function that is passed the event, Backstretch instance, and index of the image that will be displayed. If you listen for that event, you can, for example, coordinate other changes to coincide with your slideshow.

```javascript
$(window).on("backstretch.before", function (e, instance, index) {
  // If we wanted to stop the slideshow after it reached the end
  if (index === instance.images.length - 1) {
    instance.pause();
  };
});
```

### backstretch.after

Backstretch will also fire a "backstretch.after" event after the new images has completed loading.

```javascript
$(window).on("backstretch.after", function (e, instance, index) {
  // Do something
});
```

## Changelog

### Version 2.0.8

* Changed multi-res feature `width`'s meaning. `width` now means the actual width of the image to match against.
* Added `pixelRatio` option for multires.

### Version 2.0.7

* More granular control over options
* 1. Now you can specify `alignX`/`alignY`/`duration`/`fade` on an image basis
* 2. Minor bugfixes
* 3. Deprecated `centeredX`/`centeredY`

### Version 2.0.6

* Minor bug fixes due to latest PRs

### Version 2.0.5

* New `fadeFirst` feature
* New `alignX` feature
* New `alignY` feature
* New `paused` feature
* New `start` feature
* New `preload` feature
* New `preloadSize` feature
* New feature: url templates
* New feature: automatic resolution selection
* Minor bug fixes

### Version 2.0

* Now accepts an array of images to create a slideshow
* Can attach Backstretch to any block-level element, not just the body
* Deprecated "speed" option in favor of "fade" for fadeIn timing
* Added "duration" option, and Slideshow API

### Version 1.2

* You can now called backstretch twice, and it will replace the existing image.

### Version 1.1

* Added 'centeredX' and 'centeredY' options.
* Removed 'hideUntilReady' option. It looks pretty bad if you don't hide the image until it's fully loaded.
* Fixed IE img onload bug.
* Now supports iPhone/iPad orientation changes.
