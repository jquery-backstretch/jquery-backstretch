/*
 * jQuery Backstretch
 * Version 1.1
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
            centered: true,         // Should we center the image or leave it fixed at 0,0?
            speed: 0                // fadeIn speed for background after image loads (e.g. "fast" or 500)
        },
        rootElement = ("onorientationchange" in window) ? $(document) : $(window), // hack to acccount for iOS position:fixed shortcomings
        imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgOffsetCSS;
        
        // Extend the settings with those the user has provided
        if(options && typeof options == "object") $.extend(settings, options);
    
        // Initialize
        $(document).ready(_init);
  
        // For chaining
        return this;
    
        function _init() {
            // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
            if(src) {
                var container = $("<div />").attr("id", "backstretch")
                                            .css({left: 0, top: 0, position: "fixed", overflow: "hidden", zIndex: -9999}),
                    img = $("<img />").attr("src", src)
                                      .css({position: "relative", display: "none"})
                                      .bind("load", function() {                                          
                                          var self = $(this);
                                              imgRatio = self.width() / self.height();
                                              
                                          _adjustBG(function() {
                                              self.fadeIn(settings.speed, function(){
                                                  if(typeof callback == "function") callback();
                                              });
                                          });
                                      })
                                      .appendTo(container);
                  
                $("body").prepend(container);

                // Adjust the background size when the window is resized or orientation has changed (iOS)
                $(window).resize(_adjustBG);
            }
        }
    
        function _adjustBG(fn) {
            bgWidth = rootElement.width();
            bgHeight = bgWidth / imgRatio;
            
            // Make adjustments based on image ratio
            // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
            if(bgHeight >= rootElement.height()) {
                bgOffset = (bgHeight - rootElement.height()) /2;
                bgOffsetCSS = {left: "0px", top: "-" + bgOffset + "px"};
            } else {
                bgHeight = rootElement.height();
                bgWidth = bgHeight * imgRatio;
                bgOffset = (bgWidth - rootElement.width()) / 2;
                bgOffsetCSS = {left: "-" + bgOffset + "px", top: "0px"};
            }    
      
            $("#backstretch img").width( bgWidth ).height( bgHeight );
            if(settings.centered) $("#backstretch img").css(bgOffsetCSS);
      
            // Executed the passed in function, if necessary
            if (typeof fn == "function") fn();
        }
    };
  
})(jQuery);