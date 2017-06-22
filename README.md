Note: This repo is currently looking for maintainers: https://github.com/jquery-backstretch/jquery-backstretch/issues/464

# Backstretch

Backstretch is a simple jQuery plugin that allows you to add a dynamically-resized, slideshow-capable background image to any page or element. The image will stretch to fit the page/element, and will automatically resize as the window/element size changes.

** We're back in business! Merged `danielgindi/jquery-backstretch`, and all eyes please get back here! **

## Demo

There are a couple of examples included with this package, or feel free to check it out live [on the project page itself](http://srobbin.com/jquery-plugins/backstretch/).

## Installation

1. Download/save the JS file from GitHub.
2. Install via Bower with the following command.

```
bower install jquery-backstretch
```

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
| `scale` * | Controls the scaling mode. Can be 'cover'/'fit'/'fit-smaller'/'fill' | String | 'cover' |
| `transition` * | Type of transition to use. If multiple are specified, then it will be chosed randomly | String or Array<String> | 'fade' |
| `transitionDuration` * | This is the duration at which the image will transition in. Integers in milliseconds are accepted, as well as standard jQuery speed strings (slow, normal, fast). | Integer or String | 0 |
| `transitionEasing` * | The easing function that will be used for animations. | Any supported jQuery easing value | *jQuery default* |
| `animateFirst` | If `true`, the first image will transition in like all the others. | Boolean | true |
| `fade` * | Sets `transition` to `'fade'` and `transitionDuration` to whatever value was specified. | Integer or String | |
| `fadeFirst` | Synonym for `animateFirst` | Boolean | true |
| `duration` * | The amount of time in between slides, when using Backstretch as a slideshow, expressed as the number of milliseconds. | Integer | 5000 |
| `paused` | For slideshows: Disables the change between slides | Boolean | false |
| `start` | The index of the image in the array you want to start your slideshow with. | Integer | 0 |
| `preload` | How many images to preload at once? I.e. Lazy-loading can be enabled by specifying 0. | Integer | 2 |
| `preloadSize` | How many images to preload in parallel? If we are preloading 5 images for the next slides, we might want to still limit it to only preload 2 or 3 at once, according to the expected available bandwidth. | Integer | 1 |
| `bypassCss` | Avoid adding any CSS to the IMG element. I.e if you want a dynamic IMG tag that is laid out with the content. | Boolean | false |
| `alwaysTestWindowResolution` | Always test against window's width instead of the element's width. | Boolean | false |
| `resolutionRefreshRate` | Threshold for how long to wait before the image resolution will be switched? | Integer | 2500 |
| `resolutionChangeRatioThreshold` | Threshold for how much should the different in the resolution be before switch image | Number | 0.1 (10%) |
| `centeredX` | Deprecated. Still works but please do not use it. | Boolean | true |
| `centeredY` | Deprecated. Still works but please do not use it. | Boolean | true |

* Options marked with an `*` can be specified for individual images

## Image definition

Each image in the set can be a String specifying the URL for the image, *or* an object with the following options, *or* an array of images for different resolutions to choose between.
A url can be a url to a video also.
Currently the plugin will automatically recognize a *youtube* url. If you pass urls to raw videos, you have to specify `isVideo: true`.

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `url` | The url of the image or video | String | |
| `alt` | The alternative text for this image (If you want to play along with screen readers) | String | '' |
| `alignX` | This parameter controls the horizontal alignment of the image. Can be 'center'/'left'/'right' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `alignY` | This parameter controls the vertical alignment of the image. Can be 'center'/'top'/'bottom' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `scale` | Controls the scaling mode. Can be 'cover'/'fit'/'fit-smaller'/'fill' | String | 'cover' |
| `transition` | Type of transition to use. If multiple are specified, then it will be chosed randomly | String or Array<String> | 'fade' |
| `transitionDuration` | This is the duration at which the image will transition in. Integers in milliseconds are accepted, as well as standard jQuery speed strings (slow, normal, fast). | Integer or String | 0 |
| `transitionEasing` | The easing function that will be used for animations. | Any supported jQuery easing value | *jQuery default* |
| `fade` | Sets `transition` to `'fade'` and `transitionDuration` to whatever value was specified. | Integer or String | |
| `duration` | The amount of time in between slides, when using Backstretch as a slideshow, expressed as the number of milliseconds. | Integer | 5000 |
| `isVideo` | Tell the plugin the this is a video (if cannot be recognized automatically) | Boolean | false |
| `loop` | Should the video be looped? If yes, then the duration will be used to determine when to stop. | Boolean | false |
| `mute` | Should the video be muted? | Boolean | true |
| `poster` | This is for specifying the `poster` attribute in standard <video> tags | String | |

## Per-resolution-image definition

If you have specified an array of resolutions for a single image, then these are the available options:

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `url` | The url of the image | String | |
| `url` for `<video>` | Instead of a single `url`, an array of sources can be specified. Each source has a `src` and `type` attributes. | Array of `{ src, type }` | |
| `alt` | The alternative text for this image (If you want to play along with screen readers) | String | '' |
| `width` | The width of the image | Integer | |
| `pixelRatio` | A strict rule to only choose for the specified device pixel ratio. If set to 'auto', then the element's width will first be multiplied by the device's pixel ratio before evaluating. | Number or "auto" | undefined |
| `deviceOrientation` | Restrict image selection to specific device orientation | `'landscape'` or `'portrait'` | undefined |
| `windowOrientation` | Restrict image selection to specific window orientation (based on current window's inner width/height) | `'landscape'` / `'portrait'` / `'square'` | undefined |
| `orientation` | Restrict image selection to the element's orientation based on the element's current inner width/height) | `'landscape'` / `'portrait'` / `'square'` | undefined |
| `alignX` | This parameter controls the horizontal alignment of the image. Can be 'center'/'left'/'right' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `alignY` | This parameter controls the vertical alignment of the image. Can be 'center'/'top'/'bottom' or any number between 0.0 and 1.0. | Integer or String | 0.5 |
| `scale` | Controls the scaling mode. Can be 'cover'/'fit'/'fit-smaller'/'fill' | String | 'cover' |
| `fade` | This is the speed at which the image will fade in. Integers in milliseconds are accepted, as well as standard jQuery speed strings (slow, normal, fast). | Integer or String | 0 |
| `duration` | The amount of time in between slides, when using Backstretch as a slideshow, expressed as the number of milliseconds. | Integer | 5000 |

## Transitions

* `'fade'`
* `'fade_in_out'` / `'fadeInOut'`
* `'push_left'` / `'pushLeft'`
* `'push_right'` / `'pushRight'`
* `'push_up'` / `'pushUp'`
* `'push_down'` / `'pushDown'`
* `'cover_left'` / `'coverLeft'`
* `'cover_right'` / `'coverRight'`
* `'cover_up'` / `'coverUp'`
* `'cover_down'` / `'coverDown'`

## Notes about video support:

* If the video is not in `loop` mode, then it will play until the end. You have to specify a duration for the specific video in order to limit its playing duration.
* Mobile browsers do not allow playback of videos without the users tapping a play button... So you may want to detect those and supply different media arrays for those browsers.

## Slideshow API

Once you've instantiated a Backstretch slideshow, there are many actions that you can perform it:

```javascript
// Start a slideshow
$('.foo').backstretch([
  'path/to/image.jpg',
  'path/to/image2.jpg',
  'path/to/image3.jpg'
]);

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
| `.backstretch("current")` | This function returns the index of the current slide |

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

### Version 2.1.16

* New: Added `scale` feature.

### Version 2.1.15

* Improvement: Not modifying `background` property, but `background-image`, to allow CSS to play with colors. (@philsbury)

### Version 2.1.14

* New: Added `'deviceOrientation'`, `'windowOrientation'` and `'orientation'` options

### Version 2.1.13

* Bugfix: Native video source tags were misspelled
* Bugfix: Youtube matching regex was not constrained to `youtube.com`/`youtu.be` domain

### Version 2.1.12

* New: Added `'fade_in_out'` transition

### Version 2.1.11

* Bugfix: Resolution detection routine failed to properly match current url - and cause an additional replace of the image. This affected video urls in a way that caused them to being played from the start.

### Version 2.1.10

* Bugfix: `pixelRatio == 'auto'` was ignored due to a missing rule.

### Version 2.1.9

* Allow overriding transition options for a single `show(...)` call
* Bugfix: Next transition can go wrong because of css leftover of previous transition

### Version 2.1.8

* Improved method calling through `.backstretch('method', ...)` to pass all arguments, and return value.
* Added `current()` function to return current slide index.

### Version 2.1.7

* Minor documentation improvements. Version release for updated docs in NPM etc.

### Version 2.1.6

* Minor fix: `background` css on the target element was sometimes cleared prematurely. (Issue #18)

### Version 2.1.5

* Minor fix: `resolutionChangeRatioTreshold` was a typo. Changed to `resolutionChangeRatioThreshold`, but keeping backwards compatibility.

### Version 2.1.4

* New: Added more transitions beside fade
* Bugfix: Youtube Iframe API's `destroy` was not being called
* Minor documentation updates

### Version 2.1.3

* New: Youtube and `<video>` support!

### Version 2.1.2

* Bugfix: Executing backstretch methods on already backstretched elements failed

### Version 2.1.1

* Published to bower under "jquery-backstretch-2"

### Version 2.1.0

* New `alwaysTestWindowResolution` option
* New `resolutionRefreshRate` option
* New `resolutionChangeRatioTreshold` option
* Minor bugfix: If there was no `fade` duration, the new image was still being removed asynchronously. Possibly causing a glitch if custom CSS is used.

### Version 2.0.9

* New `alt` image property
* New `bypassCss` option

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
