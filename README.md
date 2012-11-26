# Backstretch

Backstretch is a simple jQuery plugin that allows you to add a dynamically-resized, slideshow-capable background image to any page or element. The image will stretch to fit the page/element, and will automatically resize as the window/element size changes.
## Demo

There are a couple of examples included with this package, or feel free to check it out live [on the project page itself](http://srobbin.com/jquery-plugins/backstretch/).

## Setup

Include the jQuery library and Backstretch plugin files in your webpage (preferably at the bottom of the page, before the closing BODY tag):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
<script src="jquery.backstretch.min.js"></script>
<script>
  // To attach Backstrech as the body's backgroun
  $.backstretch("path/to/image.jpg");

  // You may also attach Backstretch to a block-level element
  $(".foo").backstretch("path/to/image.jpg");

  // Or, to start a slideshow, just pass in an array of images
  $(".foo").backstretch([
    "path/to/image.jpg",
    "path/to/image2.jpg",
    "path/to/image3.jpg"    
  ], {duration: 4000});
</script>
```

## Options

### centeredX

The ratio of the width/height of the image doesn't always jive with the width/height of the window. This parameter controls whether or not we center the image on the X axis to account for the discrepancy. (type=Boolean, default=true)

### centeredY

This parameter controls whether or not we center the image on the Y axis to account for the aforementioned discrepancy. (type=Boolean, default=true)

### default_height

set a default height to be used to resize image before image loads and we check for real image size. (type=Number, default=undefined)

### default_width

set a default width to be used to resize image before image loads and we check for real image size. (type=number, default=undefined)

### fade

This is the speed at which the image will fade in. Integers in milliseconds are accepted, as well as standard jQuery speed strings (slow, normal, fast). (type=Integer or String, default=0)

### duration

The amount of time in between slides, when using Backstretch as a slideshow, expressed as the number of milliseconds. (type=Integer, default=5000)

### pause

the default state of the slide show is to start playing but this will turn it off (type=Bool, default=false)

### lazyload

default loads all images at start. Or you can load an image by command or as next slide is requested (type=Bool, default=false)

### start

the slide index you want to show first (type=Integer, default=0)

## Slideshow API

Once you've instantiated Backstretch, you can access its instance via that element's data attribute. There are many actions that you can perform on an instance, though most of them are only applicable if you've created a slideshow:

```javascript
// Start a slideshow
$('.foo').backstretch([
  'path/to/image.jpg',
  'path/to/image2.jpg',
  'path/to/image3.jpg'
]);

// Pause the slideshow
$('.foo').data('backstretch').pause();

// Advance to the next slide
$('.foo').data('backstretch').next();
```

### show(index)

Jump to the slide at a given index.

### prev()

Display the previous image in a slideshow.

### next()

Advance to the next image in a slideshow.

### pause()

Pause the slideshow.

### resume()

Resume a paused slideshow.

### cacheNext()

Force the next image to be loaded. Useful for when lazyload option is true.

### cachePrev()

Force the previous image to be loaded. Useful for when lazyload option is true.

### destroy(preserveBackground)

Destroy the Backstretch instance. Optionally, you can pass in a Boolean parameter, preserveBackground, to determine whether or not you'd like to keep the current image stretched as the background image.

### resize()

This method is called automatically when the container (window or block-level element) is resized, however you can always call this manually if needed.

## Events

### backstretch.show

Backstretch will fire a "backstretch.show" event everytime a new image loads. If you listen for that event, you can, for example, coordinate other changes to coincide with your slideshow.

## Images

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

## Changelog

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
