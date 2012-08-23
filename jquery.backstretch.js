/*
 * jQuery Backstretch
 * Version 1.2.8
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2012 Scott Robbin (srobbin.com)
 * Licensed under the MIT license
 * https://raw.github.com/srobbin/jquery-backstretch/master/LICENSE.txt
 *
*/

;(function($) {

    $.backstretch = function(src, options, callback) {
        var defaultSettings = {
            centeredX: true         // Should we center the image on the X axis?
          , centeredY: true         // Should we center the image on the Y axis?
          , fit: false              // Should we fit the image on the viewport?
          , speed: 0                // fadeIn speed for background after image loads (e.g. "fast" or 500)
        }
      , $container = $("#backstretch")
      , settings = $container.data("settings") || defaultSettings // If this has been called once before, use the old settings as the default
      , existingSettings = $container.data('settings')
      , rootElement, supportsFixedPosition, useWindowInnerHeight
      , imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgCSS;

        // Extend the settings with those the user has provided
        if(options && typeof options == "object") $.extend(settings, options);

        // Just in case the user passed in a function without options
        if(options && typeof options == "function") callback = options;

        $(document).ready(function() {
            /*
             *  Taken from jQuery Mobile 1.1.0
             *  http://jquerymobile.com/
             *
             *  In a nutshell, we need to figure out if fixed positioning is supported.
             *  Unfortunately, this is very difficult to do on iOS, and usually involves
             *  injecting content, scrolling the page, etc.. It's ugly.
             *  jQuery Mobile uses this workaround. It's not ideal, but works.
             *
             *  Modified to detect IE6
             */
            var w = window
              , ua = navigator.userAgent
              , platform = navigator.platform
                // Rendering engine is Webkit, and capture major version
              , wkmatch = ua.match( /AppleWebKit\/([0-9]+)/ )
              , wkversion = !!wkmatch && wkmatch[ 1 ]
              , ffmatch = ua.match( /Fennec\/([0-9]+)/ )
              , ffversion = !!ffmatch && ffmatch[ 1 ]
              , operammobilematch = ua.match( /Opera Mobi\/([0-9]+)/ )
              , omversion = !!operammobilematch && operammobilematch[ 1 ]
              , iematch = ua.match( /MSIE ([0-9]+)/ )
              , ieversion = !!iematch && iematch[ 1 ];

            supportsFixedPosition = !(
              // iOS 4.3 and older : Platform is iPhone/Pad/Touch and Webkit version is less than 534 (ios5)
              (( platform.indexOf( "iPhone" ) > -1 || platform.indexOf( "iPad" ) > -1  || platform.indexOf( "iPod" ) > -1 ) && wkversion && wkversion < 534 )
              ||
              // Opera Mini
              ( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" )
              ||
              ( operammobilematch && omversion < 7458 )
              ||
              //Android lte 2.1: Platform is Android and Webkit version is less than 533 (Android 2.2)
              ( ua.indexOf( "Android" ) > -1 && wkversion && wkversion < 533 )
              ||
              // Firefox Mobile before 6.0 -
              ( ffversion && ffversion < 6 )
              ||
              // WebOS less than 3
              ( "palmGetResource" in window && wkversion && wkversion < 534 )
              ||
              // MeeGo
              ( ua.indexOf( "MeeGo" ) > -1 && ua.indexOf( "NokiaBrowser/8.5.0" ) > -1 )
              ||
              // IE6
              ( ieversion && ieversion <= 6)
            );

            // Set the root element
            rootElement = supportsFixedPosition ? $(window) : $(document);

            // Initialize the plugin
            _init();
        });

        // For chaining
        return this;

        function _init() {
            // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
            if(src) {
                var img;

                // If this is the first time that backstretch is being called
                if($container.length == 0) {
                    $container = $("<div />").attr("id", "backstretch")
                                             .css({left: 0, top: 0, position: supportsFixedPosition ? "fixed" : "absolute", overflow: "hidden", zIndex: -999999, margin: 0, padding: 0, height: "100%", width: "100%"});
                } else {
                    // Prepare to delete any old images
                    $container.find("img").addClass("deleteable");
                }

                img = $("<img />").css({position: "absolute", display: "none", margin: 0, padding: 0, border: "none", zIndex: -999999, maxWidth: "none"})
                                  .bind("load", function(e) {
                                      var self = this,
                                          imgWidth, imgHeight;

                                      $(self).css({width: "auto", height: "auto"});
                                      imgWidth = this.width || $(e.target).width();
                                      imgHeight = this.height || $(e.target).height();
                                      imgRatio = imgWidth / imgHeight;

                                      _adjustBG();
                                      $(self).fadeIn(settings.speed, function(){
                                          // Remove the old images, if necessary.
                                          $container.find('.deleteable').remove();
                                          // Callback
                                          if(typeof callback == "function") callback.apply(self);
                                      });
                                  })
                                  .appendTo($container);

                // Append the container to the body, if it's not already there
                if($("body #backstretch").length == 0) {
                    /*
                     * Scroll the page one pixel to get the right window height on iOS
                     * Pretty harmless for everyone else
                    */
                    if ($(window).scrollTop() === 0 ) window.scrollTo(0, 0);
                    $("body").append($container);
                }

                // Attach the settings
                $container.data("settings", settings);

                img.attr("src", src); // Hack for IE img onload event

                // Adjust the background size when the window is resized or orientation has changed (iOS)
                $(window).unbind("resize.backstretch").bind("resize.backstretch", function() {
                  // Need to do this in order to get the right window height
                  if("onorientationchange" in window) {
                    if (window.pageYOffset === 0) window.scrollTo(0, 1);
                  }
                  _adjustBG();
                  // Callback
                  if(typeof callback == "function") callback.apply(img.get(0));
                });
            }
        }

        function _adjustBG() {
            try {
                var rootWidth  = (supportsFixedPosition && window.innerWidth) ? window.innerWidth : rootElement.width() // if browser supports fixed position try to use the window's innerWidth first
                  , rootHeight  = (supportsFixedPosition && window.innerHeight) ? window.innerHeight : rootElement.height(); // if browser supports fixed position try to use the window's innerHeight first

                // adjust background dimension according to viewport orientation
                if (rootWidth >= rootHeight) {
                    // horizontal or square viewport
                    // first try to fit the background by width
                    bgWidth = rootWidth;
                    bgHeight = bgWidth / imgRatio;
                    // after if the fitting is needed and the height is to large then shrink the image by height
                    // without fitting if the backround height is lesser than viewport height then stretch it by height
                    if ((settings.fit && bgHeight > rootHeight) || (!settings.fit && bgHeight < rootHeight)) {
                        bgHeight = rootHeight;
                        bgWidth = bgHeight * imgRatio;
                    }
                } else {
                    // vertical viewport
                    // first try to fit the background by height
                    bgHeight = rootHeight;
                    bgWidth = bgHeight * imgRatio;
                    // after if the fitting is needed and the width is to large then shrink the image by width
                    // without fitting if the backround width is lesser than viewport width then stretch it by width
                    if ((settings.fit && bgWidth > rootWidth) || (!settings.fit && bgWidth < rootWidth)) {
                        bgWidth = rootWidth;
                        bgHeight = bgWidth / imgRatio;
                    }
                }

                // adjust background position according to settings
                bgCSS = {left: 0, top: 0};
                if(settings.centeredX) {
                    bgCSS.left = ((rootWidth - bgWidth) / 2) + "px";
                }
                if(settings.centeredY) {
                    bgCSS.top = ((rootHeight - bgHeight) / 2) + "px";
                }

                $container.css({width: rootWidth, height: rootHeight})
                          .find("img:not(.deleteable)").css($.extend({width: bgWidth, height: bgHeight}, bgCSS));
            } catch(err) {
                // IE7 seems to trigger _adjustBG before the image is loaded.
                // This try/catch block is a hack to let it fail gracefully.
            }
        }
    };

})(jQuery);