/*
 * jQuery Backstretch
 * Version 1.1.2
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2010 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/

(function($) {

    $.backstretch = function(src, options, callback) {
        var settings = {
            centeredX: 0.5,         // Relative point on X-axis to center the image on (0-1). For backwards compatibility, true = 0.5 (center), false = 0 (left)
            centeredY: 0.5,         // Relative point on Y-axis to center the image on (0-1). For backwards compatibility, true = 0.5 (center), false = 0 (top)
            speed: 0                // fadeIn speed for background after image loads (e.g. "fast" or 500)
        },
        rootElement = ("onorientationchange" in window) ? $(document) : $(window), // hack to acccount for iOS position:fixed shortcomings
        imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgCSS;
        
        _parseOptions();

        // Initialize
        $(document).ready(_init);
  
        // For chaining
        return this;
    
        function _parseOptions() {
            // Extend the settings with those the user has provided
            if(options && typeof options == "object") {
                $.extend(settings, options);
                // Change booleans to values
                if (settings.centeredX === true) {
                    settings.centeredX = 0.5;
                } else if (settings.centeredX === false) {
                    settings.centeredX = 0;
                }
                if (settings.centeredY === true) {
                    settings.centeredY = 0.5;
                } else if (settings.centeredY === false) {
                    settings.centeredY = 0;
                }
                // Overwrite centeredX and ~Y with values from center[] array, if provided.
                if (settings.center != undefined && settings.center.constructor == Array) {
                    if (settings.center[0] != undefined) {
                        settings.centeredX = settings.center[0];
                    }
                    if (settings.center[1] != undefined) {
                        settings.centeredY = settings.center[1];
                    }
                }
            }
        }
    
        function _init() {
            // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
            if(src) {
                var container = $("<div />").attr("class", "backstretch").css({left: 0, top: 0, position: "fixed", overflow: "hidden", zIndex: -9999}),
                    img = $("<img />").css({position: "relative", display: "none"})
                                      .bind("load", function(e) {
                                          var self = $(this);
                                          imgRatio = $(e.target).width() / $(e.target).height();
                                          
                                          _adjustBG(function() {
                                              self.fadeIn(settings.speed, function(){
                                                  if(typeof callback == "function") callback();
                                              });
                                          });
                                      })
                                      .appendTo(container);
                  
                $("body").prepend(container);
                img.attr("src", src); // Hack for IE img onload event

                // Adjust the background size when the window is resized or orientation has changed (iOS)
                $(window).resize(_adjustBG);
            }
        }
        
        function _adjustBG(fn) {
            try {
                bgCSS = {left: 0, top: 0}
                bgWidth = rootElement.width();
                bgHeight = bgWidth / imgRatio;

                // Make adjustments based on image ratio
                // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
                if(bgHeight >= rootElement.height()) {
                    if (settings.centeredY > 0) {
                        bgOffset = (bgHeight - rootElement.height()) * settings.centeredY;
                        $.extend(bgCSS, {top: "-" + bgOffset + "px"});
                    }
                } else {
                    bgHeight = rootElement.height();
                    bgWidth = bgHeight * imgRatio;
                    if (settings.centeredX > 0) {
                        bgOffset = (bgWidth - rootElement.width()) * settings.centeredX ;
                        $.extend(bgCSS, {left: "-" + bgOffset + "px"});
                    }
                }

                $(".backstretch img").width( bgWidth ).height( bgHeight ).css(bgCSS);
            } catch(err) {
                // IE7 seems to trigger _adjustBG before the image is loaded.
                // This try/catch block is a hack to let it fail gracefully.
            }
      
            // Executed the passed in function, if necessary
            if (typeof fn == "function") fn();
        }
    };

  
})(jQuery);