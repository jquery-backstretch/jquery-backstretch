/*
 * jQuery Backstretch
 * Version 1.2.2
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/
(function(a){a.backstretch=function(k,i,l){function m(c){try{g={left:0,top:0},d=e.width(),b=d/j,b>=e.height()?(h=(b-e.height())/2,f.centeredY&&a.extend(g,{top:"-"+h+"px"})):(b=e.height(),d=b*j,h=(d-e.width())/2,f.centeredX&&a.extend(g,{left:"-"+h+"px"})),a("#backstretch, #backstretch img:last").width(d).height(b).filter("img").css(g)}catch(o){}typeof c=="function"&&c()}var n={centeredX:!0,centeredY:!0,speed:0},c=a("#backstretch"),f=c.data("settings")||n;c.data("settings");var e="onorientationchange" in window?a(document):a(window),j,d,b,h,g;i&&typeof i=="object"&&a.extend(f,i);a(document).ready(function(){if(k){var b;c.length==0?c=a("<div />").attr("id","backstretch").css({left:0,top:0,position:"fixed",overflow:"hidden",zIndex:-999999,margin:0,padding:0,height:"100%",width:"100%"}):c.find("img").addClass("deleteable");b=a("<img />").css({position:"absolute",display:"none",margin:0,padding:0,border:"none",zIndex:-999999}).bind("load",function(b){var d=a(this),e;d.css({width:"auto",height:"auto"});e=this.width||a(b.target).width();b=this.height||a(b.target).height();j=e/b;m(function(){d.fadeIn(f.speed,function(){c.find(".deleteable").remove();typeof l=="function"&&l()})})}).appendTo(c);a("body #backstretch").length==0&&a("body").append(c);c.data("settings",f);b.attr("src",k);a(window).resize(m)}});return this}})(jQuery);