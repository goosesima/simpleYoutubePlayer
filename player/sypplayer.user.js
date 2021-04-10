// ==UserScript==
// @name SYPPlayer
// @description Helpful script for SYP Player
// @author SimaKyr
// @license MIT
// @version 0
// @include https://www.youtube.com/*
// ==/UserScript==
var a=document.createElement("script");
a.src="https://simakyr.github.io/addJS/addJS.js";
document.body.appendChild(a);
document.addEventListener("DOMContentLoaded", function () {
  add.JS('${FULLADDRESS}/sypscript');
});
