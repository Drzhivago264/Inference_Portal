/*! For license information please see 149-936030b04d3ea092e5c9.js.LICENSE.txt */
"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[149],{1149:(t,e,n)=>{n.r(e),n.d(e,{default:()=>lt});var r=n(96540),o=n(46266),a=n(8239),i=n(69067),c=n(37312),l=n(97834),u=n(14073),f=n(84976),s=n(71543),m=n(49799),h=n(37211);const p=n.p+"authentication_en.md",d=n.p+"behavior_en.md",y=n.p+"create_key_en.md",v=n.p+"error_ratelimit_en.md",g=n.p+"inference_en.md",b=n.p+"authentication_vi.md",E=n.p+"behavior_vi.md",w=n.p+"create_key_vi.md",A=n.p+"error_ratelimit_vi.md",x=n.p+"inference_vi.md";var _=n(32389),O=n(93399),j=n(71765),k=n(47767),S=n(28848),L=n.n(S),P=n(38960),I=n(72635),T=n(75942),N=n(45089),C=n(36632),G=n(85072),D=n.n(G),F=n(97825),H=n.n(F),M=n(77659),U=n.n(M),W=n(55056),Y=n.n(W),B=n(10540),R=n.n(B),q=n(41113),K=n.n(q),Z=n(81565),$={};function Q(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,i,c=[],l=!0,u=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=a.call(n)).done)&&(c.push(r.value),c.length!==e);l=!0);}catch(t){u=!0,o=t}finally{try{if(!l&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return z(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?z(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}$.styleTagTransform=K(),$.setAttributes=Y(),$.insert=U().bind(null,"head"),$.domAPI=H(),$.insertStyleElement=R(),D()(Z.A,$),Z.A&&Z.A.locals&&Z.A.locals;var J=function(t){var e=t.headings,n=t.activeId;return r.createElement("ul",null,e.map((function(t){return r.createElement("li",{key:t.id,className:t.id===n?"active":""},r.createElement("a",{href:"#".concat(t.id)},t.title),t.items.length>0&&r.createElement("ul",null," ",t.items.map((function(t){return r.createElement("li",{key:t.id,className:t.id===n?"active":""},r.createElement("a",{href:"#".concat(t.id)},t.title))}))))})))};const V=function(t){var e=t.mdfile,n=Q((0,r.useState)(),2),o=n[0],a=n[1],i=function(t){var e=Q((0,r.useState)([]),2),n=e[0],o=e[1];return(0,r.useEffect)((function(){var t=function(t){var e=[];return t.forEach((function(t,n){var r=t.innerText,o=t.id;"H2"===t.nodeName?e.push({id:o,title:r,items:[]}):"H3"===t.nodeName&&e.length>0&&e[e.length-1].items.push({id:o,title:r})})),e}(Array.from(document.querySelectorAll("h2, h3")));o(t)}),[t]),{nestedHeadings:n}}(e),c=i.nestedHeadings;return function(t,e){var n=(0,r.useRef)({});(0,r.useEffect)((function(){var e=new IntersectionObserver((function(e){n.current=e.reduce((function(t,e){return t[e.target.id]=e,t}),n.current);var o=[];Object.keys(n.current).forEach((function(t){var e=n.current[t];e.isIntersecting&&o.push(e)}));var a=function(t){return r.findIndex((function(e){return e.id===t}))};if(1===o.length)t(o[0].target.id);else if(o.length>1){var i=o.sort((function(t,e){return a(t.target.id)>a(e.target.id)}));t(i[0].target.id)}}),{rootMargin:"0px 0px -40% 0px"}),r=Array.from(document.querySelectorAll("h2, h3"));return r.forEach((function(t){return e.observe(t)})),function(){return e.disconnect()}}),[t,e])}(a,e),r.createElement("nav",{"aria-label":"Table of contents"},r.createElement(J,{headings:c,activeId:o}))};var X=n(60538);function tt(t){return tt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},tt(t)}function et(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function nt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?et(Object(n),!0).forEach((function(e){var r,o,a,i;r=t,o=e,a=n[e],i=function(t,e){if("object"!=tt(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=tt(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o),(o="symbol"==tt(i)?i:i+"")in r?Object.defineProperty(r,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[o]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):et(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function rt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,i,c=[],l=!0,u=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=a.call(n)).done)&&(c.push(r.value),c.length!==e);l=!0);}catch(t){u=!0,o=t}finally{try{if(!l&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return ot(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ot(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ot(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function at(){at=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,o=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function u(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var a=e&&e.prototype instanceof v?e:v,i=Object.create(a.prototype),c=new P(r||[]);return o(i,"_invoke",{value:j(t,n,c)}),i}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var m="suspendedStart",h="suspendedYield",p="executing",d="completed",y={};function v(){}function g(){}function b(){}var E={};u(E,i,(function(){return this}));var w=Object.getPrototypeOf,A=w&&w(w(I([])));A&&A!==n&&r.call(A,i)&&(E=A);var x=b.prototype=v.prototype=Object.create(E);function _(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function n(o,a,i,c){var l=s(t[o],t,a);if("throw"!==l.type){var u=l.arg,f=u.value;return f&&"object"==tt(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(f).then((function(t){u.value=t,i(u)}),(function(t){return n("throw",t,i,c)}))}c(l.arg)}var a;o(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return a=a?a.then(o,o):o()}})}function j(e,n,r){var o=m;return function(a,i){if(o===p)throw Error("Generator is already running");if(o===d){if("throw"===a)throw i;return{value:t,done:!0}}for(r.method=a,r.arg=i;;){var c=r.delegate;if(c){var l=k(c,r);if(l){if(l===y)continue;return l}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===m)throw o=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=p;var u=s(e,n,r);if("normal"===u.type){if(o=r.done?d:h,u.arg===y)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(o=d,r.method="throw",r.arg=u.arg)}}}function k(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,k(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),y;var a=s(o,e.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,y;var i=a.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,y):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function I(e){if(e||""===e){var n=e[i];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function n(){for(;++o<e.length;)if(r.call(e,o))return n.value=e[o],n.done=!1,n;return n.value=t,n.done=!0,n};return a.next=a}}throw new TypeError(tt(e)+" is not iterable")}return g.prototype=b,o(x,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:g,configurable:!0}),g.displayName=u(b,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,u(t,l,"GeneratorFunction")),t.prototype=Object.create(x),t},e.awrap=function(t){return{__await:t}},_(O.prototype),u(O.prototype,c,(function(){return this})),e.AsyncIterator=O,e.async=function(t,n,r,o,a){void 0===a&&(a=Promise);var i=new O(f(t,n,r,o),a);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(x),u(x,l,"Generator"),u(x,i,(function(){return this})),u(x,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=I,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(L),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return c.type="throw",c.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var l=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(l&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:I(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),y}},e}function it(t,e,n,r,o,a,i){try{var c=t[a](i),l=c.value}catch(t){return void n(t)}c.done?e(l):Promise.resolve(l).then(r,o)}var ct=function(){var t,e=(t=at().mark((function t(e,n,r){var a;return at().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.A.get(e[n][r]);case 2:return a=t.sent,t.abrupt("return",a.data);case 4:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var a=t.apply(e,n);function i(t){it(a,r,o,i,c,"next",t)}function c(t){it(a,r,o,i,c,"throw",t)}i(void 0)}))});return function(t,n,r){return e.apply(this,arguments)}}();const lt=function(){(0,r.useEffect)((function(){L().highlightAll()}));var t=(0,k.g)().doc,e=rt((0,r.useState)(I.Ay.language),2),n=e[0],o=e[1],S=rt((0,r.useState)(""),2),G=S[0],D=S[1],F=rt((0,r.useState)(0),2),H=F[0],M=F[1],U={key:{en:y,vi:w},authentication:{en:p,vi:b},inference:{en:g,vi:x},errorlimit:{en:v,vi:A},behavior:{en:d,vi:E}},W=(0,_.Bd)(),Y=W.t,B=W.i18n;(0,r.useEffect)((function(){o(B.language)}),[B.language]),(0,r.useEffect)((function(){M(Object.keys(U).indexOf(t))}),[]);var R=(0,T.useQuery)(["ManualDocData",U,t,n],(function(){return ct(U,t,n)}),{staleTime:1/0,retry:!1});return(0,r.useEffect)((function(){"success"===R.status&&R.data&&D(R.data)}),[R.status,R.data]),r.createElement(l.A,{maxWidth:!1,disableGutters:!0},r.createElement("title",null,"Manual"),r.createElement(c.A,{max_width:"xl"}),r.createElement(l.A,{maxWidth:"xl"},r.createElement(i.A,{display:"flex",alignItems:"center"},r.createElement(a.Ay,{container:!0,spacing:1},r.createElement(a.Ay,{item:!0,md:3,lg:2},r.createElement(i.A,{mt:3,mb:5,sx:{display:{xs:"none",sm:"none ",md:"block"}}},r.createElement(m.A,{dense:!0},[{link:"/frontend/manual/key",tranlate:"manual.Setting_Up_Your_API_Key"},{link:"/frontend/manual/authentication",tranlate:"manual.Authentication"},{link:"/frontend/manual/inference",tranlate:"manual.Inference"},{link:"/frontend/manual/errorlimit",tranlate:"manual.Common_Errors_and_Ratelimits"},{link:"/frontend/manual/behavior",tranlate:"manual.The_Behaviors_of_This_Website"}].map((function(t,e){return r.createElement(h.A,{selected:H===e,onClick:function(t){return function(t,e){M(e)}(0,e)},key:t.link,component:f.N_,to:t.link},r.createElement(u.A,{component:"span",variant:"body2"}," ",Y(t.tranlate)," "))}))))),r.createElement(s.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px",display:{xs:"none",sm:"block"}}}),r.createElement(a.Ay,{item:!0,xs:12,md:8,lg:8},r.createElement(i.A,{mt:3,sx:{display:{sm:"block ",md:"none"}}},r.createElement(m.A,{dense:!0},r.createElement(h.A,{component:f.N_,to:"/frontend/manual/key"}," ",r.createElement(u.A,null,Y("manual.Setting_Up_Your_API_Key"),"  ")," "),r.createElement(h.A,{component:f.N_,to:"/frontend/manual/authentication"},r.createElement(u.A,null," ",Y("manual.Authentication")," ")," "),r.createElement(h.A,{component:f.N_,to:"/frontend/manual/inference"},r.createElement(u.A,null," ",Y("manual.Inference")," ")," "),r.createElement(h.A,{component:f.N_,to:"/frontend/manual/errorlimit"},r.createElement(u.A,null," ",Y("manual.Common_Errors_and_Ratelimits"),"  ")," "),r.createElement(h.A,{component:f.N_,to:"/frontend/manual/behavior"},r.createElement(u.A,null," ",Y("manual.The_Behaviors_of_This_Website")," ")," "))),r.createElement(i.A,{m:3},R.isLoading&&r.createElement(N.A,{variant:"rounded",animation:"wave",height:350}),R.error&&r.createElement(C.A,{variant:"outlined",severity:"error"},"Cannot find the manual from server! Contact us ..."),!R.isLoading&&r.createElement(O.jg,{overrides:nt(nt({},(0,O._O)({Highlight:j.f4,themes:j.Zj,theme:j.Zj.okaidia})),{},{h1:{component:"h1"},h2:{component:"h2"},h3:{component:"h3"}})},G))),r.createElement(s.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px",display:{xs:"none",sm:"none",md:"none",lg:"block"}}}),r.createElement(a.Ay,{item:!0,xs:0,sm:2},r.createElement(i.A,{sx:{display:{xs:"none",sm:"none",md:"none",lg:"block"}}},G&&r.createElement(X.A,{variant:"outlined",style:{position:"fixed",marginTop:7,width:270}},r.createElement(u.A,{m:1,variant:"body1"},"Table of Contents"),r.createElement(s.A,null),r.createElement(i.A,{mr:2}," ",r.createElement(V,{mdfile:G}),"  "))))))),r.createElement(P.A,null))}},81565:(t,e,n)=>{n.d(e,{A:()=>c});var r=n(31601),o=n.n(r),a=n(76314),i=n.n(a)()(o());i.push([t.id,"nav {\n    position: 'sticky';\n    position: '-webkit-sticky';\n    /* For Safari */\n    top: 24px;\n    /* How far down the page you want your ToC to live */\n\n    /* Give table of contents a scrollbar */\n    max-height: calc(100vh - 40px);\n    overflow: auto;\n}\n\n\nh2,\nh3 {\n    scroll-margin-top: 70px;\n}\n\n/* Safari-only */\n@supports (-webkit-hyphens:none) {\n\n    h2,\n    h3 {\n        padding-top: 70px;\n        margin-top: -70px;\n    }\n}\n\na {\n    color: grey;\n    text-decoration: none;\n}\n\nli.active>a {\n    color: white;\n}\n\nli>a:hover {\n    color: white;\n}",""]);const c=i}}]);