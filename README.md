# Backstretch

Zepto-Backstretch is a simple Zepto (jQuery compatible) plugin that allows you to add a dynamically-resized, slideshow-capable background image to any page or element. The image will stretch to fit the page/element, and will automatically resize as the window/element size changes.

This is a fork of the origin jquery.backstretch plugin which works just like its parent, but adds two things:

* The option to pass various image urls -- with various sizes -- and Backstretch will choose the best suitable for your screen size, and also load the corresponding bigger images if and when the screen size changes
* Zepto compatibility

## Demo

There are a couple of examples included with this package, or feel free to check it out live [in this Demo](http://srobbin.com/jquery-plugins/backstretch/).

## Setup

Include the Zepto library (version 1.0) and Backstretch plugin files in your webpage (preferably at the bottom of the page, before the closing BODY tag):

```html
<script src="//http://cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"></script>
<script src="jquery.backstretch.min.js"></script>
<script>
  // To attach Backstrech as the body's background
  $.backstretch("path/to/image.jpg");

  // You may also attach Backstretch to a block-level element
  $(".foo").backstretch("path/to/image.jpg");

  // to start a slideshow, just pass in an array of images
  $(".foo").backstretch([
    "path/to/image.jpg",
    "path/to/image2.jpg",
    "path/to/image3.jpg"    
  ], {duration: 4000});

  // to use different sizes (optimally choosed) for each image, pass an array of objects
  $.backstretch([ 
     [ 
        { width: "400", url: "path/to/image1-400.jpg" }, 
        { width: "600", url: "path/to/image1-600.jpg" }, 
        { width: "1200", url: "path/to/image1-1200.jpg" }, 
     ], 
     [ 
        { width: "400", url: "path/to/image2-400.jpg" }, 
        { width: "600", url: "path/to/image2-600.jpg" }, 
        { width: "1200", url: "path/to/image2-1200.jpg" }, 
     ], 
     [ 
        { width: "400", url: "path/to/image3-400.jpg" }, 
        { width: "600", url: "path/to/image3-600.jpg" }, 
        { width: "1200", url: "path/to/image3-1200.jpg" }, 
     ], 
  ], {duration: 4000, fade: 750}); 

  // to use a custom-sized image with height and/or width specified in the url itself (like the services offered by some image CDNs like [Cloudinary](http://cloudinary.com/) and [Thumbrio](http://www.thumbr.io/)) pass the image url with the field to be completed with the actual container size
    $('.container').backstretch([
      'http://api.thumbr.io/3405e2d162a99a1c7a9fc558c8aa8efc/test/api.thumbr.io/static/ladies-800.png/{{width}}x{{height}}c-ebarcelona-eframe1/thumb.jpg',
      'http://a2.res.cloudinary.com/demo/image/upload/c_fill,h_{{ height }},w_{{ width }}/a_hflip/sheep.jpg'
    ], {duration: 2000});
</script>
```

## Options

| Name | Description | Type | Default |
|------|-------------|------|---------|
| `centeredX` | The ratio of the width/height of the image doesn't always jive with the width/height of the window. This parameter controls whether or not we center the image on the X axis to account for the discrepancy. | Boolean | true |
| `centeredY` | This parameter controls whether or not we center the image on the Y axis to account for the aforementioned discrepancy. | Boolean | true |
| `fade` | This is the speed at which the image will fade in. Integers in milliseconds | Integer | 0 |
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
