var Utils=function(){function t(t,n,r){t.submit(function(){const t=n.val();t&&e(t,r)})}function e(t,e){n()?(_hsq.push(["identify",{email:t}]),_hsq.push(["trackEvent",{id:e}])):console.log("Not tracking hubspot event on host:",window.location.hostname)}function n(){return"_hsq"in window&&"gtag"in window}function r(t){let e=!1;return Array.isArray(t)&&t.forEach(function(t){t&&(e=!0)}),e}function o(t){$("#"+t).on("keypress keyup blur",function(t){$(this).val($(this).val().replace(/[^\d].+/,"")),$(this).val().length>=5&&t.preventDefault(),(t.which<48||t.which>57)&&t.preventDefault()})}function i(){var t,e,n,r,o;window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(t,e){e=e||window;for(var n=0;n<this.length;n++)t.call(e,this[n],n,this)}),"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t){"use strict";if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(null!=r)for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},writable:!0,configurable:!0}),Array.from||(Array.from=(t=Object.prototype.toString,e=function(e){return"function"==typeof e||"[object Function]"===t.call(e)},n=function(t){var e=Number(t);return isNaN(e)?0:0!==e&&isFinite(e)?(e>0?1:-1)*Math.floor(Math.abs(e)):e},r=Math.pow(2,53)-1,o=function(t){var e=n(t);return Math.min(Math.max(e,0),r)},function(t){var n=this,r=Object(t);if(null==t)throw new TypeError("Array.from requires an array-like object - not null or undefined");var i,a=arguments.length>1?arguments[1]:void undefined;if(void 0!==a){if(!e(a))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(i=arguments[2])}for(var u,c=o(r.length),l=e(n)?Object(new n(c)):new Array(c),s=0;s<c;)u=r[s],l[s]=a?void 0===i?a(u,s):a.call(i,u,s):u,s+=1;return l.length=c,l})),String.prototype.includes||Object.defineProperty(String.prototype,"includes",{value:function(t,e){return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(t,e){function n(t,e){return t===e||"number"==typeof t&&"number"==typeof e&&isNaN(t)&&isNaN(e)}if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),o=r.length>>>0;if(0===o)return!1;for(var i=0|e,a=Math.max(i>=0?i:o-Math.abs(i),0);a<o;){if(n(r[a],t))return!0;a++}return!1}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(t){if(null==this)throw TypeError('"this" is null or not defined');var e=Object(this),n=e.length>>>0;if("function"!=typeof t)throw TypeError("predicate must be a function");for(var r=arguments[1],o=0;o<n;){var i=e[o];if(t.call(r,i,o,e))return i;o++}return undefined},configurable:!0,writable:!0})}function a(){var t=Array.from(document.getElementsByClassName("validate")),e=!0;return t.forEach(function(t){var n=t.value;if(t.classList.contains("select-single"))t.dataset.value||(e=!1);else switch(t.type){case"text":case"textarea":case"select-one":case"email":case"tel":(!n||n.length<=0)&&(e=!1)}}),e}function u(){document.addEventListener("DOMContentLoaded",function(){i()})}function c(t){return["January","February","March","April","May","June","July","August","September","October","November","December"][t]}return u(),{setupZipcodeValidator:o,isValidArray:r,validateForm:a,hubspotTrackFormSubmission:t,hubspotIdentifyAndTrack:e,isTrackingEnabled:n,getMonthAsString:c}}();
//# sourceMappingURL=/assets/employer/application-ec7625b34652267d90a68476b09c96e4c5d17d6d79138d17e21903b88f3833ee.js.map
