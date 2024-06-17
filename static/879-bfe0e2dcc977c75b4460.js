"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[879],{93879:(e,t,n)=>{n.d(t,{A:()=>Ce});var o=n(58168),r=n(98587),i=n(96540),a=n(54871),s=n(50173),f=n(86249);function p(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function c(e){return e instanceof p(e).Element||e instanceof Element}function l(e){return e instanceof p(e).HTMLElement||e instanceof HTMLElement}function u(e){return"undefined"!=typeof ShadowRoot&&(e instanceof p(e).ShadowRoot||e instanceof ShadowRoot)}var d=Math.max,m=Math.min,h=Math.round;function v(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function y(){return!/^((?!chrome|android).)*safari/i.test(v())}function b(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var o=e.getBoundingClientRect(),r=1,i=1;t&&l(e)&&(r=e.offsetWidth>0&&h(o.width)/e.offsetWidth||1,i=e.offsetHeight>0&&h(o.height)/e.offsetHeight||1);var a=(c(e)?p(e):window).visualViewport,s=!y()&&n,f=(o.left+(s&&a?a.offsetLeft:0))/r,u=(o.top+(s&&a?a.offsetTop:0))/i,d=o.width/r,m=o.height/i;return{width:d,height:m,top:u,right:f+d,bottom:u+m,left:f,x:f,y:u}}function g(e){var t=p(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function w(e){return e?(e.nodeName||"").toLowerCase():null}function x(e){return((c(e)?e.ownerDocument:e.document)||window.document).documentElement}function O(e){return b(x(e)).left+g(e).scrollLeft}function P(e){return p(e).getComputedStyle(e)}function A(e){var t=P(e),n=t.overflow,o=t.overflowX,r=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+r+o)}function j(e,t,n){void 0===n&&(n=!1);var o,r,i=l(t),a=l(t)&&function(e){var t=e.getBoundingClientRect(),n=h(t.width)/e.offsetWidth||1,o=h(t.height)/e.offsetHeight||1;return 1!==n||1!==o}(t),s=x(t),f=b(e,a,n),c={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(i||!i&&!n)&&(("body"!==w(t)||A(s))&&(c=(o=t)!==p(o)&&l(o)?{scrollLeft:(r=o).scrollLeft,scrollTop:r.scrollTop}:g(o)),l(t)?((u=b(t,!0)).x+=t.clientLeft,u.y+=t.clientTop):s&&(u.x=O(s))),{x:f.left+c.scrollLeft-u.x,y:f.top+c.scrollTop-u.y,width:f.width,height:f.height}}function E(e){var t=b(e),n=e.offsetWidth,o=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-o)<=1&&(o=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:o}}function k(e){return"html"===w(e)?e:e.assignedSlot||e.parentNode||(u(e)?e.host:null)||x(e)}function D(e){return["html","body","#document"].indexOf(w(e))>=0?e.ownerDocument.body:l(e)&&A(e)?e:D(k(e))}function R(e,t){var n;void 0===t&&(t=[]);var o=D(e),r=o===(null==(n=e.ownerDocument)?void 0:n.body),i=p(o),a=r?[i].concat(i.visualViewport||[],A(o)?o:[]):o,s=t.concat(a);return r?s:s.concat(R(k(a)))}function M(e){return["table","td","th"].indexOf(w(e))>=0}function W(e){return l(e)&&"fixed"!==P(e).position?e.offsetParent:null}function T(e){for(var t=p(e),n=W(e);n&&M(n)&&"static"===P(n).position;)n=W(n);return n&&("html"===w(n)||"body"===w(n)&&"static"===P(n).position)?t:n||function(e){var t=/firefox/i.test(v());if(/Trident/i.test(v())&&l(e)&&"fixed"===P(e).position)return null;var n=k(e);for(u(n)&&(n=n.host);l(n)&&["html","body"].indexOf(w(n))<0;){var o=P(n);if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return n;n=n.parentNode}return null}(e)||t}var L="top",B="bottom",S="right",H="left",C="auto",V=[L,B,S,H],_="start",q="end",N="viewport",I="popper",U=V.reduce((function(e,t){return e.concat([t+"-"+_,t+"-"+q])}),[]),F=[].concat(V,[C]).reduce((function(e,t){return e.concat([t,t+"-"+_,t+"-"+q])}),[]),z=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function X(e){var t=new Map,n=new Set,o=[];function r(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var o=t.get(e);o&&r(o)}})),o.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||r(e)})),o}var Y={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Z(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,o=void 0===n?[]:n,r=t.defaultOptions,i=void 0===r?Y:r;return function(e,t,n){void 0===n&&(n=i);var r,a,s={placement:"bottom",orderedModifiers:[],options:Object.assign({},Y,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},f=[],p=!1,l={state:s,setOptions:function(n){var r="function"==typeof n?n(s.options):n;u(),s.options=Object.assign({},i,s.options,r),s.scrollParents={reference:c(e)?R(e):e.contextElement?R(e.contextElement):[],popper:R(t)};var a,p,d=function(e){var t=X(e);return z.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((a=[].concat(o,s.options.modifiers),p=a.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return s.orderedModifiers=d.filter((function(e){return e.enabled})),s.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,o=void 0===n?{}:n,r=e.effect;if("function"==typeof r){var i=r({state:s,name:t,instance:l,options:o});f.push(i||function(){})}})),l.update()},forceUpdate:function(){if(!p){var e=s.elements,t=e.reference,n=e.popper;if(Q(t,n)){s.rects={reference:j(t,T(n),"fixed"===s.options.strategy),popper:E(n)},s.reset=!1,s.placement=s.options.placement,s.orderedModifiers.forEach((function(e){return s.modifiersData[e.name]=Object.assign({},e.data)}));for(var o=0;o<s.orderedModifiers.length;o++)if(!0!==s.reset){var r=s.orderedModifiers[o],i=r.fn,a=r.options,f=void 0===a?{}:a,c=r.name;"function"==typeof i&&(s=i({state:s,options:f,name:c,instance:l})||s)}else s.reset=!1,o=-1}}},update:(r=function(){return new Promise((function(e){l.forceUpdate(),e(s)}))},function(){return a||(a=new Promise((function(e){Promise.resolve().then((function(){a=void 0,e(r())}))}))),a}),destroy:function(){u(),p=!0}};if(!Q(e,t))return l;function u(){f.forEach((function(e){return e()})),f=[]}return l.setOptions(n).then((function(e){!p&&n.onFirstUpdate&&n.onFirstUpdate(e)})),l}}var G={passive:!0};function J(e){return e.split("-")[0]}function K(e){return e.split("-")[1]}function $(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ee(e){var t,n=e.reference,o=e.element,r=e.placement,i=r?J(r):null,a=r?K(r):null,s=n.x+n.width/2-o.width/2,f=n.y+n.height/2-o.height/2;switch(i){case L:t={x:s,y:n.y-o.height};break;case B:t={x:s,y:n.y+n.height};break;case S:t={x:n.x+n.width,y:f};break;case H:t={x:n.x-o.width,y:f};break;default:t={x:n.x,y:n.y}}var p=i?$(i):null;if(null!=p){var c="y"===p?"height":"width";switch(a){case _:t[p]=t[p]-(n[c]/2-o[c]/2);break;case q:t[p]=t[p]+(n[c]/2-o[c]/2)}}return t}var te={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ne(e){var t,n=e.popper,o=e.popperRect,r=e.placement,i=e.variation,a=e.offsets,s=e.position,f=e.gpuAcceleration,c=e.adaptive,l=e.roundOffsets,u=e.isFixed,d=a.x,m=void 0===d?0:d,v=a.y,y=void 0===v?0:v,b="function"==typeof l?l({x:m,y}):{x:m,y};m=b.x,y=b.y;var g=a.hasOwnProperty("x"),w=a.hasOwnProperty("y"),O=H,A=L,j=window;if(c){var E=T(n),k="clientHeight",D="clientWidth";E===p(n)&&"static"!==P(E=x(n)).position&&"absolute"===s&&(k="scrollHeight",D="scrollWidth"),(r===L||(r===H||r===S)&&i===q)&&(A=B,y-=(u&&E===j&&j.visualViewport?j.visualViewport.height:E[k])-o.height,y*=f?1:-1),r!==H&&(r!==L&&r!==B||i!==q)||(O=S,m-=(u&&E===j&&j.visualViewport?j.visualViewport.width:E[D])-o.width,m*=f?1:-1)}var R,M=Object.assign({position:s},c&&te),W=!0===l?function(e,t){var n=e.x,o=e.y,r=t.devicePixelRatio||1;return{x:h(n*r)/r||0,y:h(o*r)/r||0}}({x:m,y},p(n)):{x:m,y};return m=W.x,y=W.y,f?Object.assign({},M,((R={})[A]=w?"0":"",R[O]=g?"0":"",R.transform=(j.devicePixelRatio||1)<=1?"translate("+m+"px, "+y+"px)":"translate3d("+m+"px, "+y+"px, 0)",R)):Object.assign({},M,((t={})[A]=w?y+"px":"",t[O]=g?m+"px":"",t.transform="",t))}var oe={left:"right",right:"left",bottom:"top",top:"bottom"};function re(e){return e.replace(/left|right|bottom|top/g,(function(e){return oe[e]}))}var ie={start:"end",end:"start"};function ae(e){return e.replace(/start|end/g,(function(e){return ie[e]}))}function se(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&u(n)){var o=t;do{if(o&&e.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function fe(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function pe(e,t,n){return t===N?fe(function(e,t){var n=p(e),o=x(e),r=n.visualViewport,i=o.clientWidth,a=o.clientHeight,s=0,f=0;if(r){i=r.width,a=r.height;var c=y();(c||!c&&"fixed"===t)&&(s=r.offsetLeft,f=r.offsetTop)}return{width:i,height:a,x:s+O(e),y:f}}(e,n)):c(t)?function(e,t){var n=b(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):fe(function(e){var t,n=x(e),o=g(e),r=null==(t=e.ownerDocument)?void 0:t.body,i=d(n.scrollWidth,n.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),a=d(n.scrollHeight,n.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),s=-o.scrollLeft+O(e),f=-o.scrollTop;return"rtl"===P(r||n).direction&&(s+=d(n.clientWidth,r?r.clientWidth:0)-i),{width:i,height:a,x:s,y:f}}(x(e)))}function ce(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function le(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function ue(e,t){void 0===t&&(t={});var n=t,o=n.placement,r=void 0===o?e.placement:o,i=n.strategy,a=void 0===i?e.strategy:i,s=n.boundary,f=void 0===s?"clippingParents":s,p=n.rootBoundary,u=void 0===p?N:p,h=n.elementContext,v=void 0===h?I:h,y=n.altBoundary,g=void 0!==y&&y,O=n.padding,A=void 0===O?0:O,j=ce("number"!=typeof A?A:le(A,V)),E=v===I?"reference":I,D=e.rects.popper,M=e.elements[g?E:v],W=function(e,t,n,o){var r="clippingParents"===t?function(e){var t=R(k(e)),n=["absolute","fixed"].indexOf(P(e).position)>=0&&l(e)?T(e):e;return c(n)?t.filter((function(e){return c(e)&&se(e,n)&&"body"!==w(e)})):[]}(e):[].concat(t),i=[].concat(r,[n]),a=i[0],s=i.reduce((function(t,n){var r=pe(e,n,o);return t.top=d(r.top,t.top),t.right=m(r.right,t.right),t.bottom=m(r.bottom,t.bottom),t.left=d(r.left,t.left),t}),pe(e,a,o));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}(c(M)?M:M.contextElement||x(e.elements.popper),f,u,a),H=b(e.elements.reference),C=ee({reference:H,element:D,strategy:"absolute",placement:r}),_=fe(Object.assign({},D,C)),q=v===I?_:H,U={top:W.top-q.top+j.top,bottom:q.bottom-W.bottom+j.bottom,left:W.left-q.left+j.left,right:q.right-W.right+j.right},F=e.modifiersData.offset;if(v===I&&F){var z=F[r];Object.keys(U).forEach((function(e){var t=[S,B].indexOf(e)>=0?1:-1,n=[L,B].indexOf(e)>=0?"y":"x";U[e]+=z[n]*t}))}return U}function de(e,t,n){return d(e,m(t,n))}function me(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function he(e){return[L,S,B,H].some((function(t){return e[t]>=0}))}var ve=Z({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,o=e.options,r=o.scroll,i=void 0===r||r,a=o.resize,s=void 0===a||a,f=p(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&c.forEach((function(e){e.addEventListener("scroll",n.update,G)})),s&&f.addEventListener("resize",n.update,G),function(){i&&c.forEach((function(e){e.removeEventListener("scroll",n.update,G)})),s&&f.removeEventListener("resize",n.update,G)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=ee({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,o=n.gpuAcceleration,r=void 0===o||o,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,p={placement:J(t.placement),variation:K(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,ne(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,ne(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},r=t.elements[e];l(r)&&w(r)&&(Object.assign(r.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?r.removeAttribute(e):r.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],r=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});l(o)&&w(o)&&(Object.assign(o.style,i),Object.keys(r).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.offset,i=void 0===r?[0,0]:r,a=F.reduce((function(e,n){return e[n]=function(e,t,n){var o=J(e),r=[H,L].indexOf(o)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*r,[H,S].indexOf(o)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,p=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=p),t.modifiersData[o]=a}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name;if(!t.modifiersData[o]._skip){for(var r=n.mainAxis,i=void 0===r||r,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,p=n.padding,c=n.boundary,l=n.rootBoundary,u=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,y=J(v),b=f||(y!==v&&m?function(e){if(J(e)===C)return[];var t=re(e);return[ae(e),t,ae(t)]}(v):[re(v)]),g=[v].concat(b).reduce((function(e,n){return e.concat(J(n)===C?function(e,t){void 0===t&&(t={});var n=t,o=n.placement,r=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,p=void 0===f?F:f,c=K(o),l=c?s?U:U.filter((function(e){return K(e)===c})):V,u=l.filter((function(e){return p.indexOf(e)>=0}));0===u.length&&(u=l);var d=u.reduce((function(t,n){return t[n]=ue(e,{placement:n,boundary:r,rootBoundary:i,padding:a})[J(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}(t,{placement:n,boundary:c,rootBoundary:l,padding:p,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,P=!0,A=g[0],j=0;j<g.length;j++){var E=g[j],k=J(E),D=K(E)===_,R=[L,B].indexOf(k)>=0,M=R?"width":"height",W=ue(t,{placement:E,boundary:c,rootBoundary:l,altBoundary:u,padding:p}),T=R?D?S:H:D?B:L;w[M]>x[M]&&(T=re(T));var q=re(T),N=[];if(i&&N.push(W[k]<=0),s&&N.push(W[T]<=0,W[q]<=0),N.every((function(e){return e}))){A=E,P=!1;break}O.set(E,N)}if(P)for(var I=function(e){var t=g.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return A=t,"break"},z=m?3:1;z>0&&"break"!==I(z);z--);t.placement!==A&&(t.modifiersData[o]._skip=!0,t.placement=A,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,o=e.name,r=n.mainAxis,i=void 0===r||r,a=n.altAxis,s=void 0!==a&&a,f=n.boundary,p=n.rootBoundary,c=n.altBoundary,l=n.padding,u=n.tether,h=void 0===u||u,v=n.tetherOffset,y=void 0===v?0:v,b=ue(t,{boundary:f,rootBoundary:p,padding:l,altBoundary:c}),g=J(t.placement),w=K(t.placement),x=!w,O=$(g),P="x"===O?"y":"x",A=t.modifiersData.popperOffsets,j=t.rects.reference,k=t.rects.popper,D="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof D?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),M=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,W={x:0,y:0};if(A){if(i){var C,V="y"===O?L:H,q="y"===O?B:S,N="y"===O?"height":"width",I=A[O],U=I+b[V],F=I-b[q],z=h?-k[N]/2:0,X=w===_?j[N]:k[N],Y=w===_?-k[N]:-j[N],Q=t.elements.arrow,Z=h&&Q?E(Q):{width:0,height:0},G=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},ee=G[V],te=G[q],ne=de(0,j[N],Z[N]),oe=x?j[N]/2-z-ne-ee-R.mainAxis:X-ne-ee-R.mainAxis,re=x?-j[N]/2+z+ne+te+R.mainAxis:Y+ne+te+R.mainAxis,ie=t.elements.arrow&&T(t.elements.arrow),ae=ie?"y"===O?ie.clientTop||0:ie.clientLeft||0:0,se=null!=(C=null==M?void 0:M[O])?C:0,fe=I+re-se,pe=de(h?m(U,I+oe-se-ae):U,I,h?d(F,fe):F);A[O]=pe,W[O]=pe-I}if(s){var ce,le="x"===O?L:H,me="x"===O?B:S,he=A[P],ve="y"===P?"height":"width",ye=he+b[le],be=he-b[me],ge=-1!==[L,H].indexOf(g),we=null!=(ce=null==M?void 0:M[P])?ce:0,xe=ge?ye:he-j[ve]-k[ve]-we+R.altAxis,Oe=ge?he+j[ve]+k[ve]-we-R.altAxis:be,Pe=h&&ge?function(e,t,n){var o=de(e,t,n);return o>n?n:o}(xe,he,Oe):de(h?xe:ye,he,h?Oe:be);A[P]=Pe,W[P]=Pe-he}t.modifiersData[o]=W}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,o=e.name,r=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=J(n.placement),f=$(s),p=[H,S].indexOf(s)>=0?"height":"width";if(i&&a){var c=function(e,t){return ce("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:le(e,V))}(r.padding,n),l=E(i),u="y"===f?L:H,d="y"===f?B:S,m=n.rects.reference[p]+n.rects.reference[f]-a[f]-n.rects.popper[p],h=a[f]-n.rects.reference[f],v=T(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=m/2-h/2,g=c[u],w=y-l[p]-c[d],x=y/2-l[p]/2+b,O=de(g,x,w),P=f;n.modifiersData[o]=((t={})[P]=O,t.centerOffset=O-x,t)}},effect:function(e){var t=e.state,n=e.options.element,o=void 0===n?"[data-popper-arrow]":n;null!=o&&("string"!=typeof o||(o=t.elements.popper.querySelector(o)))&&se(t.elements.popper,o)&&(t.elements.arrow=o)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,o=t.rects.reference,r=t.rects.popper,i=t.modifiersData.preventOverflow,a=ue(t,{elementContext:"reference"}),s=ue(t,{altBoundary:!0}),f=me(a,o),p=me(s,r,i),c=he(f),l=he(p);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:p,isReferenceHidden:c,hasPopperEscaped:l},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":l})}}]}),ye=n(64111),be=n(63493),ge=n(3082),we=n(92426);const xe="Popper";function Oe(e){return(0,ge.S)(xe,e)}(0,we.W)(xe,["root"]);var Pe=n(71611),Ae=n(23636),je=n(74848);const Ee=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],ke=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function De(e){return"function"==typeof e?e():e}const Re={},Me=i.forwardRef((function(e,t){var n;const{anchorEl:f,children:p,direction:c,disablePortal:l,modifiers:u,open:d,placement:m,popperOptions:h,popperRef:v,slotProps:y={},slots:b={},TransitionProps:g}=e,w=(0,r.A)(e,Ee),x=i.useRef(null),O=(0,a.A)(x,t),P=i.useRef(null),A=(0,a.A)(P,v),j=i.useRef(A);(0,s.A)((()=>{j.current=A}),[A]),i.useImperativeHandle(v,(()=>P.current),[]);const E=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(m,c),[k,D]=i.useState(E),[R,M]=i.useState(De(f));i.useEffect((()=>{P.current&&P.current.forceUpdate()})),i.useEffect((()=>{f&&M(De(f))}),[f]),(0,s.A)((()=>{if(!R||!d)return;let e=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:e})=>{D(e.placement)}}];null!=u&&(e=e.concat(u)),h&&null!=h.modifiers&&(e=e.concat(h.modifiers));const t=ve(R,x.current,(0,o.A)({placement:E},h,{modifiers:e}));return j.current(t),()=>{t.destroy(),j.current(null)}}),[R,l,u,d,h,E]);const W={placement:k};null!==g&&(W.TransitionProps=g);const T=(0,ye.A)({root:["root"]},(0,Ae.W)(Oe)),L=null!=(n=b.root)?n:"div",B=(0,Pe.Q)({elementType:L,externalSlotProps:y.root,externalForwardedProps:w,additionalProps:{role:"tooltip",ref:O},ownerState:e,className:T.root});return(0,je.jsx)(L,(0,o.A)({},B,{children:"function"==typeof p?p(W):p}))})),We=i.forwardRef((function(e,t){const{anchorEl:n,children:a,container:s,direction:p="ltr",disablePortal:c=!1,keepMounted:l=!1,modifiers:u,open:d,placement:m="bottom",popperOptions:h=Re,popperRef:v,style:y,transition:b=!1,slotProps:g={},slots:w={}}=e,x=(0,r.A)(e,ke),[O,P]=i.useState(!0);if(!l&&!d&&(!b||O))return null;let A;if(s)A=s;else if(n){const e=De(n);A=e&&void 0!==e.nodeType?(0,f.A)(e).body:(0,f.A)(null).body}const j=d||!l||b&&!O?void 0:"none",E=b?{in:d,onEnter:()=>{P(!1)},onExited:()=>{P(!0)}}:void 0;return(0,je.jsx)(be.Z,{disablePortal:c,container:A,children:(0,je.jsx)(Me,(0,o.A)({anchorEl:n,direction:p,disablePortal:c,modifiers:u,ref:t,open:b?!O:d,placement:m,popperOptions:h,popperRef:v,slotProps:g,slots:w},x,{style:(0,o.A)({position:"fixed",top:0,left:0,display:j},y),TransitionProps:E,children:a}))})}));var Te=n(72923),Le=n(11848),Be=n(3541);const Se=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],He=(0,Le.Ay)(We,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),Ce=i.forwardRef((function(e,t){var n;const i=(0,Te.A)(),a=(0,Be.A)({props:e,name:"MuiPopper"}),{anchorEl:s,component:f,components:p,componentsProps:c,container:l,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:b,transition:g,slots:w,slotProps:x}=a,O=(0,r.A)(a,Se),P=null!=(n=null==w?void 0:w.root)?n:null==p?void 0:p.Root,A=(0,o.A)({anchorEl:s,container:l,disablePortal:u,keepMounted:d,modifiers:m,open:h,placement:v,popperOptions:y,popperRef:b,transition:g},O);return(0,je.jsx)(He,(0,o.A)({as:f,direction:null==i?void 0:i.direction,slots:{root:P},slotProps:null!=x?x:c},A,{ref:t}))}))},72923:(e,t,n)=>{t.A=void 0;var o=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=i(t);if(n&&n.has(e))return n.get(e);var o={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=r?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(o,a,s):o[a]=e[a]}return o.default=e,n&&n.set(e,o),o}(n(96540)),r=n(22532);function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(i=function(e){return e?n:t})(e)}t.A=function(e=null){const t=o.useContext(r.ThemeContext);return t&&(n=t,0!==Object.keys(n).length)?t:e;var n}}}]);