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
(function(a){a.backstretch=function(k,i,l){function m(c){try{f={left:0,top:0};d=e.width();b=d/j;if(b>=e.height()){g=(b-e.height())/2;h.centeredY&&a.extend(f,{top:"-"+g+"px"})}else{b=e.height();d=b*j;g=(d-e.width())/2;h.centeredX&&a.extend(f,{left:"-"+g+"px"})}a("#backstretch img").width(d).height(b).css(f)}catch(n){}typeof c=="function"&&c()}var h={centeredX:true,centeredY:true,speed:0},e="onorientationchange"in window?a(document):a(window),j,d,b,g,f;i&&typeof i=="object"&&a.extend(h,i);a(document).ready(function(){if(k){var c= a("<div />").attr("id","backstretch").css({left:0,top:0,position:"fixed",overflow:"hidden",zIndex:-9999}),n=a("<img />").css({position:"relative",display:"none"}).bind("load",function(o){var p=a(this);j=a(o.target).width()/a(o.target).height();m(function(){p.fadeIn(h.speed,function(){typeof l=="function"&&l()})})}).appendTo(c);a("body").prepend(c);n.attr("src",k);a(window).resize(m)}});return this}})(jQuery);