/*
 * jQuery Backstretch
 * Version 1.2.6
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/

;(function($) {

    $.backstretch = function(src, options, callback) {
        var defaultSettings = {
            centeredX: true         // Should we center the image on the X axis?
          , centeredY: true         // Should we center the image on the Y axis?
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

            // Should we use the window's innerHeight?
            useWindowInnerHeight = supportsFixedPosition && window.innerHeight;

            /*
             * Scroll the page one pixel to get the right window height on iOS
             * Pretty harmless for everyone else
            */
            window.scrollTo(0, 1);

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
                
                img = $("<img />").css({position: "absolute", display: "none", margin: 0, padding: 0, border: "none", zIndex: -999999})
                                  .bind("load", function(e) {                                          
                                      var $self = $(this),
                                          imgWidth, imgHeight;
                                          
                                      $self.css({width: "auto", height: "auto"});
                                      imgWidth = this.width || $(e.target).width();
                                      imgHeight = this.height || $(e.target).height();
                                      imgRatio = imgWidth / imgHeight;

                                      _adjustBG();
                                      $self.fadeIn(settings.speed, function(){
                                          // Remove the old images, if necessary.
                                          $container.find('.deleteable').remove();
                                          // Callback
                                          if(typeof callback == "function") callback();
                                      });
                                  })
                                  .appendTo($container);
                 
                // Append the container to the body, if it's not already there
                if($("body #backstretch").length == 0) {
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
                  _adjustBG()
                });
            }
        }
            
        function _adjustBG() {
            try {
                bgCSS = {left: 0, top: 0}
              , rootWidth = bgWidth = rootElement.width()
              , rootHeight = useWindowInnerHeight ? window.innerHeight : rootElement.height()
              , bgHeight = bgWidth / imgRatio;

                // Make adjustments based on image ratio
                // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
                if(bgHeight >= rootHeight) {
                    bgOffset = (bgHeight - rootHeight) /2;
                    if(settings.centeredY) bgCSS.top = "-" + bgOffset + "px";
                } else {
                    bgHeight = rootHeight;
                    bgWidth = bgHeight * imgRatio;
                    bgOffset = (bgWidth - rootWidth) / 2;
                    if(settings.centeredX) bgCSS.left = "-" + bgOffset + "px";
                }

                $container.css({width: rootWidth, height: rootHeight})
                          .find("img:not(.deleteable)").css({width: bgWidth, height: bgHeight}).css(bgCSS);
            } catch(err) {
                // IE7 seems to trigger _adjustBG before the image is loaded.
                // This try/catch block is a hack to let it fail gracefully.
            }
        }
    };
  
})(jQuery);