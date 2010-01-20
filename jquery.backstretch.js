/*
 * jQuery Backstretch 1.0
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2009 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/

(function($) {

  $.backstretch = function(src, options, callback) {
    var settings = {
          hideUntilReady: true, // Hide the image until it's finished loading
          speed: 0 // fadeIn speed for background after image loads (e.g. "fast" or 500)
        },
        imgRatio;
    
    // Extend the settings with those the user has provided
    if(options && typeof options == "object") $.extend(settings, options);
    
    // Initialize
    $(document).ready(_init);
  
    // For chaining
    return this;
    
    function _init() {
      // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
      if(src) {
        var commonCSS = {left: 0, top: 0},
            wrap = $("<div />").attr("id", "backstretch-wrap")
                               .css( $.extend(commonCSS, {position: "absolute", zIndex: -1}) ),
            container = $("<div />").attr("id", "backstretch")
                                    .css( $.extend(commonCSS, {position: "fixed", overflow: "hidden", zIndex: -1}) )
                                    .appendTo(wrap),
            img = $("<img />").attr("src", src)
                              .bind("load", function() {
                                    var self = $(this);
                                    imgRatio = self.width() / self.height();
                                    _adjustBG(function() {
                                      if( settings.hideUntilReady )
                                        self.fadeIn(settings.speed, function(){
                                          // Callback, if necessary
                                          if(typeof callback == "function") callback();
                                        });
                                    });
                                  });
        
        if(settings.hideUntilReady) img.hide();          
        img.appendTo(container);
          
        $("body").prepend(wrap);

        // Adjust the background size when the window is resized
        $(window).resize(_adjustBG);
      }
      
    }
    
    function _adjustBG(callback) {
      var bgWidth = $(window).width(),
          bgHeight = bgWidth / imgRatio;

      if(bgHeight < $(window).height()) {
        bgHeight = $(window).height();
        bgWidth = bgHeight * imgRatio;
      }

      $("#backstretch img").width( bgWidth ).height( bgHeight );
      
      if (typeof callback == "function") callback();
    }
  };
  
})(jQuery);