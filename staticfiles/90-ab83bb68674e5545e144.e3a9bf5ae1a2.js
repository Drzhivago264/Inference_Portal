"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[90],{82022:(e,t,o)=>{o.d(t,{A:()=>C});var r=o(98587),n=o(58168),a=o(96540),i=o(34164),l=o(64111),s=o(771),c=o(20561),p=o(74848);const f=(0,c.A)((0,p.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");var d=o(96852),u=o(28466),m=o(18850),v=o(3541),h=o(11848),b=o(27553),g=o(17245);function y(e){return(0,g.Ay)("MuiChip",e)}const x=(0,b.A)("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),w=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant","tabIndex","skipFocusWhenDisabled"],O=(0,h.Ay)("div",{name:"MuiChip",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e,{color:r,iconColor:n,clickable:a,onDelete:i,size:l,variant:s}=o;return[{[`& .${x.avatar}`]:t.avatar},{[`& .${x.avatar}`]:t[`avatar${(0,u.A)(l)}`]},{[`& .${x.avatar}`]:t[`avatarColor${(0,u.A)(r)}`]},{[`& .${x.icon}`]:t.icon},{[`& .${x.icon}`]:t[`icon${(0,u.A)(l)}`]},{[`& .${x.icon}`]:t[`iconColor${(0,u.A)(n)}`]},{[`& .${x.deleteIcon}`]:t.deleteIcon},{[`& .${x.deleteIcon}`]:t[`deleteIcon${(0,u.A)(l)}`]},{[`& .${x.deleteIcon}`]:t[`deleteIconColor${(0,u.A)(r)}`]},{[`& .${x.deleteIcon}`]:t[`deleteIcon${(0,u.A)(s)}Color${(0,u.A)(r)}`]},t.root,t[`size${(0,u.A)(l)}`],t[`color${(0,u.A)(r)}`],a&&t.clickable,a&&"default"!==r&&t[`clickableColor${(0,u.A)(r)})`],i&&t.deletable,i&&"default"!==r&&t[`deletableColor${(0,u.A)(r)}`],t[s],t[`${s}${(0,u.A)(r)}`]]}})((({theme:e,ownerState:t})=>{const o="light"===e.palette.mode?e.palette.grey[700]:e.palette.grey[300];return(0,n.A)({maxWidth:"100%",fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(e.vars||e).palette.text.primary,backgroundColor:(e.vars||e).palette.action.selected,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${x.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${x.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:e.vars?e.vars.palette.Chip.defaultAvatarColor:o,fontSize:e.typography.pxToRem(12)},[`& .${x.avatarColorPrimary}`]:{color:(e.vars||e).palette.primary.contrastText,backgroundColor:(e.vars||e).palette.primary.dark},[`& .${x.avatarColorSecondary}`]:{color:(e.vars||e).palette.secondary.contrastText,backgroundColor:(e.vars||e).palette.secondary.dark},[`& .${x.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)},[`& .${x.icon}`]:(0,n.A)({marginLeft:5,marginRight:-6},"small"===t.size&&{fontSize:18,marginLeft:4,marginRight:-4},t.iconColor===t.color&&(0,n.A)({color:e.vars?e.vars.palette.Chip.defaultIconColor:o},"default"!==t.color&&{color:"inherit"})),[`& .${x.deleteIcon}`]:(0,n.A)({WebkitTapHighlightColor:"transparent",color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.26)`:(0,s.X4)(e.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.4)`:(0,s.X4)(e.palette.text.primary,.4)}},"small"===t.size&&{fontSize:16,marginRight:4,marginLeft:-4},"default"!==t.color&&{color:e.vars?`rgba(${e.vars.palette[t.color].contrastTextChannel} / 0.7)`:(0,s.X4)(e.palette[t.color].contrastText,.7),"&:hover, &:active":{color:(e.vars||e).palette[t.color].contrastText}})},"small"===t.size&&{height:24},"default"!==t.color&&{backgroundColor:(e.vars||e).palette[t.color].main,color:(e.vars||e).palette[t.color].contrastText},t.onDelete&&{[`&.${x.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,s.X4)(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},t.onDelete&&"default"!==t.color&&{[`&.${x.focusVisible}`]:{backgroundColor:(e.vars||e).palette[t.color].dark}})}),(({theme:e,ownerState:t})=>(0,n.A)({},t.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,s.X4)(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)},[`&.${x.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,s.X4)(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)},"&:active":{boxShadow:(e.vars||e).shadows[1]}},t.clickable&&"default"!==t.color&&{[`&:hover, &.${x.focusVisible}`]:{backgroundColor:(e.vars||e).palette[t.color].dark}})),(({theme:e,ownerState:t})=>(0,n.A)({},"outlined"===t.variant&&{backgroundColor:"transparent",border:e.vars?`1px solid ${e.vars.palette.Chip.defaultBorder}`:`1px solid ${"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[700]}`,[`&.${x.clickable}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${x.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`& .${x.avatar}`]:{marginLeft:4},[`& .${x.avatarSmall}`]:{marginLeft:2},[`& .${x.icon}`]:{marginLeft:4},[`& .${x.iconSmall}`]:{marginLeft:2},[`& .${x.deleteIcon}`]:{marginRight:5},[`& .${x.deleteIconSmall}`]:{marginRight:3}},"outlined"===t.variant&&"default"!==t.color&&{color:(e.vars||e).palette[t.color].main,border:`1px solid ${e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`:(0,s.X4)(e.palette[t.color].main,.7)}`,[`&.${x.clickable}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.X4)(e.palette[t.color].main,e.palette.action.hoverOpacity)},[`&.${x.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / ${e.vars.palette.action.focusOpacity})`:(0,s.X4)(e.palette[t.color].main,e.palette.action.focusOpacity)},[`& .${x.deleteIcon}`]:{color:e.vars?`rgba(${e.vars.palette[t.color].mainChannel} / 0.7)`:(0,s.X4)(e.palette[t.color].main,.7),"&:hover, &:active":{color:(e.vars||e).palette[t.color].main}}}))),A=(0,h.Ay)("span",{name:"MuiChip",slot:"Label",overridesResolver:(e,t)=>{const{ownerState:o}=e,{size:r}=o;return[t.label,t[`label${(0,u.A)(r)}`]]}})((({ownerState:e})=>(0,n.A)({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},"outlined"===e.variant&&{paddingLeft:11,paddingRight:11},"small"===e.size&&{paddingLeft:8,paddingRight:8},"small"===e.size&&"outlined"===e.variant&&{paddingLeft:7,paddingRight:7})));function $(e){return"Backspace"===e.key||"Delete"===e.key}const C=a.forwardRef((function(e,t){const o=(0,v.A)({props:e,name:"MuiChip"}),{avatar:s,className:c,clickable:h,color:b="default",component:g,deleteIcon:x,disabled:C=!1,icon:k,label:P,onClick:S,onDelete:E,onKeyDown:j,onKeyUp:R,size:D="medium",variant:I="filled",tabIndex:M,skipFocusWhenDisabled:L=!1}=o,T=(0,r.A)(o,w),W=a.useRef(null),z=(0,d.A)(W,t),V=e=>{e.stopPropagation(),E&&E(e)},B=!(!1===h||!S)||h,H=B||E?m.A:g||"div",N=(0,n.A)({},o,{component:H,disabled:C,size:D,color:b,iconColor:a.isValidElement(k)&&k.props.color||b,onDelete:!!E,clickable:B,variant:I}),X=(e=>{const{classes:t,disabled:o,size:r,color:n,iconColor:a,onDelete:i,clickable:s,variant:c}=e,p={root:["root",c,o&&"disabled",`size${(0,u.A)(r)}`,`color${(0,u.A)(n)}`,s&&"clickable",s&&`clickableColor${(0,u.A)(n)}`,i&&"deletable",i&&`deletableColor${(0,u.A)(n)}`,`${c}${(0,u.A)(n)}`],label:["label",`label${(0,u.A)(r)}`],avatar:["avatar",`avatar${(0,u.A)(r)}`,`avatarColor${(0,u.A)(n)}`],icon:["icon",`icon${(0,u.A)(r)}`,`iconColor${(0,u.A)(a)}`],deleteIcon:["deleteIcon",`deleteIcon${(0,u.A)(r)}`,`deleteIconColor${(0,u.A)(n)}`,`deleteIcon${(0,u.A)(c)}Color${(0,u.A)(n)}`]};return(0,l.A)(p,y,t)})(N),F=H===m.A?(0,n.A)({component:g||"div",focusVisibleClassName:X.focusVisible},E&&{disableRipple:!0}):{};let _=null;E&&(_=x&&a.isValidElement(x)?a.cloneElement(x,{className:(0,i.A)(x.props.className,X.deleteIcon),onClick:V}):(0,p.jsx)(f,{className:(0,i.A)(X.deleteIcon),onClick:V}));let q=null;s&&a.isValidElement(s)&&(q=a.cloneElement(s,{className:(0,i.A)(X.avatar,s.props.className)}));let U=null;return k&&a.isValidElement(k)&&(U=a.cloneElement(k,{className:(0,i.A)(X.icon,k.props.className)})),(0,p.jsxs)(O,(0,n.A)({as:H,className:(0,i.A)(X.root,c),disabled:!(!B||!C)||void 0,onClick:S,onKeyDown:e=>{e.currentTarget===e.target&&$(e)&&e.preventDefault(),j&&j(e)},onKeyUp:e=>{e.currentTarget===e.target&&(E&&$(e)?E(e):"Escape"===e.key&&W.current&&W.current.blur()),R&&R(e)},ref:z,tabIndex:L&&C?-1:M,ownerState:N},F,T,{children:[q||U,(0,p.jsx)(A,{className:(0,i.A)(X.label),ownerState:N,children:P}),_]}))}))},93879:(e,t,o)=>{o.d(t,{A:()=>We});var r=o(58168),n=o(98587),a=o(96540),i=o(54871),l=o(50173),s=o(86249);function c(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function p(e){return e instanceof c(e).Element||e instanceof Element}function f(e){return e instanceof c(e).HTMLElement||e instanceof HTMLElement}function d(e){return"undefined"!=typeof ShadowRoot&&(e instanceof c(e).ShadowRoot||e instanceof ShadowRoot)}var u=Math.max,m=Math.min,v=Math.round;function h(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function b(){return!/^((?!chrome|android).)*safari/i.test(h())}function g(e,t,o){void 0===t&&(t=!1),void 0===o&&(o=!1);var r=e.getBoundingClientRect(),n=1,a=1;t&&f(e)&&(n=e.offsetWidth>0&&v(r.width)/e.offsetWidth||1,a=e.offsetHeight>0&&v(r.height)/e.offsetHeight||1);var i=(p(e)?c(e):window).visualViewport,l=!b()&&o,s=(r.left+(l&&i?i.offsetLeft:0))/n,d=(r.top+(l&&i?i.offsetTop:0))/a,u=r.width/n,m=r.height/a;return{width:u,height:m,top:d,right:s+u,bottom:d+m,left:s,x:s,y:d}}function y(e){var t=c(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function x(e){return e?(e.nodeName||"").toLowerCase():null}function w(e){return((p(e)?e.ownerDocument:e.document)||window.document).documentElement}function O(e){return g(w(e)).left+y(e).scrollLeft}function A(e){return c(e).getComputedStyle(e)}function $(e){var t=A(e),o=t.overflow,r=t.overflowX,n=t.overflowY;return/auto|scroll|overlay|hidden/.test(o+n+r)}function C(e,t,o){void 0===o&&(o=!1);var r,n,a=f(t),i=f(t)&&function(e){var t=e.getBoundingClientRect(),o=v(t.width)/e.offsetWidth||1,r=v(t.height)/e.offsetHeight||1;return 1!==o||1!==r}(t),l=w(t),s=g(e,i,o),p={scrollLeft:0,scrollTop:0},d={x:0,y:0};return(a||!a&&!o)&&(("body"!==x(t)||$(l))&&(p=(r=t)!==c(r)&&f(r)?{scrollLeft:(n=r).scrollLeft,scrollTop:n.scrollTop}:y(r)),f(t)?((d=g(t,!0)).x+=t.clientLeft,d.y+=t.clientTop):l&&(d.x=O(l))),{x:s.left+p.scrollLeft-d.x,y:s.top+p.scrollTop-d.y,width:s.width,height:s.height}}function k(e){var t=g(e),o=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-o)<=1&&(o=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:o,height:r}}function P(e){return"html"===x(e)?e:e.assignedSlot||e.parentNode||(d(e)?e.host:null)||w(e)}function S(e){return["html","body","#document"].indexOf(x(e))>=0?e.ownerDocument.body:f(e)&&$(e)?e:S(P(e))}function E(e,t){var o;void 0===t&&(t=[]);var r=S(e),n=r===(null==(o=e.ownerDocument)?void 0:o.body),a=c(r),i=n?[a].concat(a.visualViewport||[],$(r)?r:[]):r,l=t.concat(i);return n?l:l.concat(E(P(i)))}function j(e){return["table","td","th"].indexOf(x(e))>=0}function R(e){return f(e)&&"fixed"!==A(e).position?e.offsetParent:null}function D(e){for(var t=c(e),o=R(e);o&&j(o)&&"static"===A(o).position;)o=R(o);return o&&("html"===x(o)||"body"===x(o)&&"static"===A(o).position)?t:o||function(e){var t=/firefox/i.test(h());if(/Trident/i.test(h())&&f(e)&&"fixed"===A(e).position)return null;var o=P(e);for(d(o)&&(o=o.host);f(o)&&["html","body"].indexOf(x(o))<0;){var r=A(o);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return o;o=o.parentNode}return null}(e)||t}var I="top",M="bottom",L="right",T="left",W="auto",z=[I,M,L,T],V="start",B="end",H="viewport",N="popper",X=z.reduce((function(e,t){return e.concat([t+"-"+V,t+"-"+B])}),[]),F=[].concat(z,[W]).reduce((function(e,t){return e.concat([t,t+"-"+V,t+"-"+B])}),[]),_=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function q(e){var t=new Map,o=new Set,r=[];function n(e){o.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!o.has(e)){var r=t.get(e);r&&n(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){o.has(e.name)||n(e)})),r}var U={placement:"bottom",modifiers:[],strategy:"absolute"};function K(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Y(e){void 0===e&&(e={});var t=e,o=t.defaultModifiers,r=void 0===o?[]:o,n=t.defaultOptions,a=void 0===n?U:n;return function(e,t,o){void 0===o&&(o=a);var n,i,l={placement:"bottom",orderedModifiers:[],options:Object.assign({},U,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},s=[],c=!1,f={state:l,setOptions:function(o){var n="function"==typeof o?o(l.options):o;d(),l.options=Object.assign({},a,l.options,n),l.scrollParents={reference:p(e)?E(e):e.contextElement?E(e.contextElement):[],popper:E(t)};var i,c,u=function(e){var t=q(e);return _.reduce((function(e,o){return e.concat(t.filter((function(e){return e.phase===o})))}),[])}((i=[].concat(r,l.options.modifiers),c=i.reduce((function(e,t){var o=e[t.name];return e[t.name]=o?Object.assign({},o,t,{options:Object.assign({},o.options,t.options),data:Object.assign({},o.data,t.data)}):t,e}),{}),Object.keys(c).map((function(e){return c[e]}))));return l.orderedModifiers=u.filter((function(e){return e.enabled})),l.orderedModifiers.forEach((function(e){var t=e.name,o=e.options,r=void 0===o?{}:o,n=e.effect;if("function"==typeof n){var a=n({state:l,name:t,instance:f,options:r});s.push(a||function(){})}})),f.update()},forceUpdate:function(){if(!c){var e=l.elements,t=e.reference,o=e.popper;if(K(t,o)){l.rects={reference:C(t,D(o),"fixed"===l.options.strategy),popper:k(o)},l.reset=!1,l.placement=l.options.placement,l.orderedModifiers.forEach((function(e){return l.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<l.orderedModifiers.length;r++)if(!0!==l.reset){var n=l.orderedModifiers[r],a=n.fn,i=n.options,s=void 0===i?{}:i,p=n.name;"function"==typeof a&&(l=a({state:l,options:s,name:p,instance:f})||l)}else l.reset=!1,r=-1}}},update:(n=function(){return new Promise((function(e){f.forceUpdate(),e(l)}))},function(){return i||(i=new Promise((function(e){Promise.resolve().then((function(){i=void 0,e(n())}))}))),i}),destroy:function(){d(),c=!0}};if(!K(e,t))return f;function d(){s.forEach((function(e){return e()})),s=[]}return f.setOptions(o).then((function(e){!c&&o.onFirstUpdate&&o.onFirstUpdate(e)})),f}}var Q={passive:!0};function Z(e){return e.split("-")[0]}function G(e){return e.split("-")[1]}function J(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function ee(e){var t,o=e.reference,r=e.element,n=e.placement,a=n?Z(n):null,i=n?G(n):null,l=o.x+o.width/2-r.width/2,s=o.y+o.height/2-r.height/2;switch(a){case I:t={x:l,y:o.y-r.height};break;case M:t={x:l,y:o.y+o.height};break;case L:t={x:o.x+o.width,y:s};break;case T:t={x:o.x-r.width,y:s};break;default:t={x:o.x,y:o.y}}var c=a?J(a):null;if(null!=c){var p="y"===c?"height":"width";switch(i){case V:t[c]=t[c]-(o[p]/2-r[p]/2);break;case B:t[c]=t[c]+(o[p]/2-r[p]/2)}}return t}var te={top:"auto",right:"auto",bottom:"auto",left:"auto"};function oe(e){var t,o=e.popper,r=e.popperRect,n=e.placement,a=e.variation,i=e.offsets,l=e.position,s=e.gpuAcceleration,p=e.adaptive,f=e.roundOffsets,d=e.isFixed,u=i.x,m=void 0===u?0:u,h=i.y,b=void 0===h?0:h,g="function"==typeof f?f({x:m,y:b}):{x:m,y:b};m=g.x,b=g.y;var y=i.hasOwnProperty("x"),x=i.hasOwnProperty("y"),O=T,$=I,C=window;if(p){var k=D(o),P="clientHeight",S="clientWidth";k===c(o)&&"static"!==A(k=w(o)).position&&"absolute"===l&&(P="scrollHeight",S="scrollWidth"),(n===I||(n===T||n===L)&&a===B)&&($=M,b-=(d&&k===C&&C.visualViewport?C.visualViewport.height:k[P])-r.height,b*=s?1:-1),n!==T&&(n!==I&&n!==M||a!==B)||(O=L,m-=(d&&k===C&&C.visualViewport?C.visualViewport.width:k[S])-r.width,m*=s?1:-1)}var E,j=Object.assign({position:l},p&&te),R=!0===f?function(e,t){var o=e.x,r=e.y,n=t.devicePixelRatio||1;return{x:v(o*n)/n||0,y:v(r*n)/n||0}}({x:m,y:b},c(o)):{x:m,y:b};return m=R.x,b=R.y,s?Object.assign({},j,((E={})[$]=x?"0":"",E[O]=y?"0":"",E.transform=(C.devicePixelRatio||1)<=1?"translate("+m+"px, "+b+"px)":"translate3d("+m+"px, "+b+"px, 0)",E)):Object.assign({},j,((t={})[$]=x?b+"px":"",t[O]=y?m+"px":"",t.transform="",t))}var re={left:"right",right:"left",bottom:"top",top:"bottom"};function ne(e){return e.replace(/left|right|bottom|top/g,(function(e){return re[e]}))}var ae={start:"end",end:"start"};function ie(e){return e.replace(/start|end/g,(function(e){return ae[e]}))}function le(e,t){var o=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(o&&d(o)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function se(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function ce(e,t,o){return t===H?se(function(e,t){var o=c(e),r=w(e),n=o.visualViewport,a=r.clientWidth,i=r.clientHeight,l=0,s=0;if(n){a=n.width,i=n.height;var p=b();(p||!p&&"fixed"===t)&&(l=n.offsetLeft,s=n.offsetTop)}return{width:a,height:i,x:l+O(e),y:s}}(e,o)):p(t)?function(e,t){var o=g(e,!1,"fixed"===t);return o.top=o.top+e.clientTop,o.left=o.left+e.clientLeft,o.bottom=o.top+e.clientHeight,o.right=o.left+e.clientWidth,o.width=e.clientWidth,o.height=e.clientHeight,o.x=o.left,o.y=o.top,o}(t,o):se(function(e){var t,o=w(e),r=y(e),n=null==(t=e.ownerDocument)?void 0:t.body,a=u(o.scrollWidth,o.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),i=u(o.scrollHeight,o.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),l=-r.scrollLeft+O(e),s=-r.scrollTop;return"rtl"===A(n||o).direction&&(l+=u(o.clientWidth,n?n.clientWidth:0)-a),{width:a,height:i,x:l,y:s}}(w(e)))}function pe(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function fe(e,t){return t.reduce((function(t,o){return t[o]=e,t}),{})}function de(e,t){void 0===t&&(t={});var o=t,r=o.placement,n=void 0===r?e.placement:r,a=o.strategy,i=void 0===a?e.strategy:a,l=o.boundary,s=void 0===l?"clippingParents":l,c=o.rootBoundary,d=void 0===c?H:c,v=o.elementContext,h=void 0===v?N:v,b=o.altBoundary,y=void 0!==b&&b,O=o.padding,$=void 0===O?0:O,C=pe("number"!=typeof $?$:fe($,z)),k=h===N?"reference":N,S=e.rects.popper,j=e.elements[y?k:h],R=function(e,t,o,r){var n="clippingParents"===t?function(e){var t=E(P(e)),o=["absolute","fixed"].indexOf(A(e).position)>=0&&f(e)?D(e):e;return p(o)?t.filter((function(e){return p(e)&&le(e,o)&&"body"!==x(e)})):[]}(e):[].concat(t),a=[].concat(n,[o]),i=a[0],l=a.reduce((function(t,o){var n=ce(e,o,r);return t.top=u(n.top,t.top),t.right=m(n.right,t.right),t.bottom=m(n.bottom,t.bottom),t.left=u(n.left,t.left),t}),ce(e,i,r));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}(p(j)?j:j.contextElement||w(e.elements.popper),s,d,i),T=g(e.elements.reference),W=ee({reference:T,element:S,strategy:"absolute",placement:n}),V=se(Object.assign({},S,W)),B=h===N?V:T,X={top:R.top-B.top+C.top,bottom:B.bottom-R.bottom+C.bottom,left:R.left-B.left+C.left,right:B.right-R.right+C.right},F=e.modifiersData.offset;if(h===N&&F){var _=F[n];Object.keys(X).forEach((function(e){var t=[L,M].indexOf(e)>=0?1:-1,o=[I,M].indexOf(e)>=0?"y":"x";X[e]+=_[o]*t}))}return X}function ue(e,t,o){return u(e,m(t,o))}function me(e,t,o){return void 0===o&&(o={x:0,y:0}),{top:e.top-t.height-o.y,right:e.right-t.width+o.x,bottom:e.bottom-t.height+o.y,left:e.left-t.width-o.x}}function ve(e){return[I,L,M,T].some((function(t){return e[t]>=0}))}var he=Y({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,o=e.instance,r=e.options,n=r.scroll,a=void 0===n||n,i=r.resize,l=void 0===i||i,s=c(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",o.update,Q)})),l&&s.addEventListener("resize",o.update,Q),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",o.update,Q)})),l&&s.removeEventListener("resize",o.update,Q)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,o=e.name;t.modifiersData[o]=ee({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,o=e.options,r=o.gpuAcceleration,n=void 0===r||r,a=o.adaptive,i=void 0===a||a,l=o.roundOffsets,s=void 0===l||l,c={placement:Z(t.placement),variation:G(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:n,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,oe(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:s})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,oe(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var o=t.styles[e]||{},r=t.attributes[e]||{},n=t.elements[e];f(n)&&x(n)&&(Object.assign(n.style,o),Object.keys(r).forEach((function(e){var t=r[e];!1===t?n.removeAttribute(e):n.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,o={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,o.popper),t.styles=o,t.elements.arrow&&Object.assign(t.elements.arrow.style,o.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],n=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:o[e]).reduce((function(e,t){return e[t]="",e}),{});f(r)&&x(r)&&(Object.assign(r.style,a),Object.keys(n).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,o=e.options,r=e.name,n=o.offset,a=void 0===n?[0,0]:n,i=F.reduce((function(e,o){return e[o]=function(e,t,o){var r=Z(e),n=[T,I].indexOf(r)>=0?-1:1,a="function"==typeof o?o(Object.assign({},t,{placement:e})):o,i=a[0],l=a[1];return i=i||0,l=(l||0)*n,[T,L].indexOf(r)>=0?{x:l,y:i}:{x:i,y:l}}(o,t.rects,a),e}),{}),l=i[t.placement],s=l.x,c=l.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=s,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=i}},{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var n=o.mainAxis,a=void 0===n||n,i=o.altAxis,l=void 0===i||i,s=o.fallbackPlacements,c=o.padding,p=o.boundary,f=o.rootBoundary,d=o.altBoundary,u=o.flipVariations,m=void 0===u||u,v=o.allowedAutoPlacements,h=t.options.placement,b=Z(h),g=s||(b!==h&&m?function(e){if(Z(e)===W)return[];var t=ne(e);return[ie(e),t,ie(t)]}(h):[ne(h)]),y=[h].concat(g).reduce((function(e,o){return e.concat(Z(o)===W?function(e,t){void 0===t&&(t={});var o=t,r=o.placement,n=o.boundary,a=o.rootBoundary,i=o.padding,l=o.flipVariations,s=o.allowedAutoPlacements,c=void 0===s?F:s,p=G(r),f=p?l?X:X.filter((function(e){return G(e)===p})):z,d=f.filter((function(e){return c.indexOf(e)>=0}));0===d.length&&(d=f);var u=d.reduce((function(t,o){return t[o]=de(e,{placement:o,boundary:n,rootBoundary:a,padding:i})[Z(o)],t}),{});return Object.keys(u).sort((function(e,t){return u[e]-u[t]}))}(t,{placement:o,boundary:p,rootBoundary:f,padding:c,flipVariations:m,allowedAutoPlacements:v}):o)}),[]),x=t.rects.reference,w=t.rects.popper,O=new Map,A=!0,$=y[0],C=0;C<y.length;C++){var k=y[C],P=Z(k),S=G(k)===V,E=[I,M].indexOf(P)>=0,j=E?"width":"height",R=de(t,{placement:k,boundary:p,rootBoundary:f,altBoundary:d,padding:c}),D=E?S?L:T:S?M:I;x[j]>w[j]&&(D=ne(D));var B=ne(D),H=[];if(a&&H.push(R[P]<=0),l&&H.push(R[D]<=0,R[B]<=0),H.every((function(e){return e}))){$=k,A=!1;break}O.set(k,H)}if(A)for(var N=function(e){var t=y.find((function(t){var o=O.get(t);if(o)return o.slice(0,e).every((function(e){return e}))}));if(t)return $=t,"break"},_=m?3:1;_>0&&"break"!==N(_);_--);t.placement!==$&&(t.modifiersData[r]._skip=!0,t.placement=$,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,r=e.name,n=o.mainAxis,a=void 0===n||n,i=o.altAxis,l=void 0!==i&&i,s=o.boundary,c=o.rootBoundary,p=o.altBoundary,f=o.padding,d=o.tether,v=void 0===d||d,h=o.tetherOffset,b=void 0===h?0:h,g=de(t,{boundary:s,rootBoundary:c,padding:f,altBoundary:p}),y=Z(t.placement),x=G(t.placement),w=!x,O=J(y),A="x"===O?"y":"x",$=t.modifiersData.popperOffsets,C=t.rects.reference,P=t.rects.popper,S="function"==typeof b?b(Object.assign({},t.rects,{placement:t.placement})):b,E="number"==typeof S?{mainAxis:S,altAxis:S}:Object.assign({mainAxis:0,altAxis:0},S),j=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,R={x:0,y:0};if($){if(a){var W,z="y"===O?I:T,B="y"===O?M:L,H="y"===O?"height":"width",N=$[O],X=N+g[z],F=N-g[B],_=v?-P[H]/2:0,q=x===V?C[H]:P[H],U=x===V?-P[H]:-C[H],K=t.elements.arrow,Y=v&&K?k(K):{width:0,height:0},Q=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},ee=Q[z],te=Q[B],oe=ue(0,C[H],Y[H]),re=w?C[H]/2-_-oe-ee-E.mainAxis:q-oe-ee-E.mainAxis,ne=w?-C[H]/2+_+oe+te+E.mainAxis:U+oe+te+E.mainAxis,ae=t.elements.arrow&&D(t.elements.arrow),ie=ae?"y"===O?ae.clientTop||0:ae.clientLeft||0:0,le=null!=(W=null==j?void 0:j[O])?W:0,se=N+ne-le,ce=ue(v?m(X,N+re-le-ie):X,N,v?u(F,se):F);$[O]=ce,R[O]=ce-N}if(l){var pe,fe="x"===O?I:T,me="x"===O?M:L,ve=$[A],he="y"===A?"height":"width",be=ve+g[fe],ge=ve-g[me],ye=-1!==[I,T].indexOf(y),xe=null!=(pe=null==j?void 0:j[A])?pe:0,we=ye?be:ve-C[he]-P[he]-xe+E.altAxis,Oe=ye?ve+C[he]+P[he]-xe-E.altAxis:ge,Ae=v&&ye?function(e,t,o){var r=ue(e,t,o);return r>o?o:r}(we,ve,Oe):ue(v?we:be,ve,v?Oe:ge);$[A]=Ae,R[A]=Ae-ve}t.modifiersData[r]=R}},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,o=e.state,r=e.name,n=e.options,a=o.elements.arrow,i=o.modifiersData.popperOffsets,l=Z(o.placement),s=J(l),c=[T,L].indexOf(l)>=0?"height":"width";if(a&&i){var p=function(e,t){return pe("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:fe(e,z))}(n.padding,o),f=k(a),d="y"===s?I:T,u="y"===s?M:L,m=o.rects.reference[c]+o.rects.reference[s]-i[s]-o.rects.popper[c],v=i[s]-o.rects.reference[s],h=D(a),b=h?"y"===s?h.clientHeight||0:h.clientWidth||0:0,g=m/2-v/2,y=p[d],x=b-f[c]-p[u],w=b/2-f[c]/2+g,O=ue(y,w,x),A=s;o.modifiersData[r]=((t={})[A]=O,t.centerOffset=O-w,t)}},effect:function(e){var t=e.state,o=e.options.element,r=void 0===o?"[data-popper-arrow]":o;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&le(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,o=e.name,r=t.rects.reference,n=t.rects.popper,a=t.modifiersData.preventOverflow,i=de(t,{elementContext:"reference"}),l=de(t,{altBoundary:!0}),s=me(i,r),c=me(l,n,a),p=ve(s),f=ve(c);t.modifiersData[o]={referenceClippingOffsets:s,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:f},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":f})}}]}),be=o(64111),ge=o(63493),ye=o(3082),xe=o(92426);const we="Popper";function Oe(e){return(0,ye.S)(we,e)}(0,xe.W)(we,["root"]);var Ae=o(71611),$e=o(23636),Ce=o(74848);const ke=["anchorEl","children","direction","disablePortal","modifiers","open","placement","popperOptions","popperRef","slotProps","slots","TransitionProps","ownerState"],Pe=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition","slotProps","slots"];function Se(e){return"function"==typeof e?e():e}const Ee={},je=a.forwardRef((function(e,t){var o;const{anchorEl:s,children:c,direction:p,disablePortal:f,modifiers:d,open:u,placement:m,popperOptions:v,popperRef:h,slotProps:b={},slots:g={},TransitionProps:y}=e,x=(0,n.A)(e,ke),w=a.useRef(null),O=(0,i.A)(w,t),A=a.useRef(null),$=(0,i.A)(A,h),C=a.useRef($);(0,l.A)((()=>{C.current=$}),[$]),a.useImperativeHandle(h,(()=>A.current),[]);const k=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(m,p),[P,S]=a.useState(k),[E,j]=a.useState(Se(s));a.useEffect((()=>{A.current&&A.current.forceUpdate()})),a.useEffect((()=>{s&&j(Se(s))}),[s]),(0,l.A)((()=>{if(!E||!u)return;let e=[{name:"preventOverflow",options:{altBoundary:f}},{name:"flip",options:{altBoundary:f}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:e})=>{S(e.placement)}}];null!=d&&(e=e.concat(d)),v&&null!=v.modifiers&&(e=e.concat(v.modifiers));const t=he(E,w.current,(0,r.A)({placement:k},v,{modifiers:e}));return C.current(t),()=>{t.destroy(),C.current(null)}}),[E,f,d,u,v,k]);const R={placement:P};null!==y&&(R.TransitionProps=y);const D=(0,be.A)({root:["root"]},(0,$e.W)(Oe)),I=null!=(o=g.root)?o:"div",M=(0,Ae.Q)({elementType:I,externalSlotProps:b.root,externalForwardedProps:x,additionalProps:{role:"tooltip",ref:O},ownerState:e,className:D.root});return(0,Ce.jsx)(I,(0,r.A)({},M,{children:"function"==typeof c?c(R):c}))})),Re=a.forwardRef((function(e,t){const{anchorEl:o,children:i,container:l,direction:c="ltr",disablePortal:p=!1,keepMounted:f=!1,modifiers:d,open:u,placement:m="bottom",popperOptions:v=Ee,popperRef:h,style:b,transition:g=!1,slotProps:y={},slots:x={}}=e,w=(0,n.A)(e,Pe),[O,A]=a.useState(!0);if(!f&&!u&&(!g||O))return null;let $;if(l)$=l;else if(o){const e=Se(o);$=e&&void 0!==e.nodeType?(0,s.A)(e).body:(0,s.A)(null).body}const C=u||!f||g&&!O?void 0:"none",k=g?{in:u,onEnter:()=>{A(!1)},onExited:()=>{A(!0)}}:void 0;return(0,Ce.jsx)(ge.Z,{disablePortal:p,container:$,children:(0,Ce.jsx)(je,(0,r.A)({anchorEl:o,direction:c,disablePortal:p,modifiers:d,ref:t,open:g?!O:u,placement:m,popperOptions:v,popperRef:h,slotProps:y,slots:x},w,{style:(0,r.A)({position:"fixed",top:0,left:0,display:C},b),TransitionProps:k,children:i}))})}));var De=o(72923),Ie=o(11848),Me=o(3541);const Le=["anchorEl","component","components","componentsProps","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","transition","slots","slotProps"],Te=(0,Ie.Ay)(Re,{name:"MuiPopper",slot:"Root",overridesResolver:(e,t)=>t.root})({}),We=a.forwardRef((function(e,t){var o;const a=(0,De.A)(),i=(0,Me.A)({props:e,name:"MuiPopper"}),{anchorEl:l,component:s,components:c,componentsProps:p,container:f,disablePortal:d,keepMounted:u,modifiers:m,open:v,placement:h,popperOptions:b,popperRef:g,transition:y,slots:x,slotProps:w}=i,O=(0,n.A)(i,Le),A=null!=(o=null==x?void 0:x.root)?o:null==c?void 0:c.Root,$=(0,r.A)({anchorEl:l,container:f,disablePortal:d,keepMounted:u,modifiers:m,open:v,placement:h,popperOptions:b,popperRef:g,transition:y},O);return(0,Ce.jsx)(Te,(0,r.A)({as:s,direction:null==a?void 0:a.direction,slots:{root:A},slotProps:null!=w?w:p},$,{ref:t}))}))},24279:(e,t,o)=>{o.d(t,{X0:()=>l,X4:()=>s,a:()=>p,e$:()=>c,rP:()=>i});var r=o(35697),n=o(76937);function a(e,t=0,o=1){return(0,n.A)(e,t,o)}function i(e){if(e.type)return e;if("#"===e.charAt(0))return i(function(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let o=e.match(t);return o&&1===o[0].length&&(o=o.map((e=>e+e))),o?`rgb${4===o.length?"a":""}(${o.map(((e,t)=>t<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3)).join(", ")})`:""}(e));const t=e.indexOf("("),o=e.substring(0,t);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(o))throw new Error((0,r.A)(9,e));let n,a=e.substring(t+1,e.length-1);if("color"===o){if(a=a.split(" "),n=a.shift(),4===a.length&&"/"===a[3].charAt(0)&&(a[3]=a[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(n))throw new Error((0,r.A)(10,n))}else a=a.split(",");return a=a.map((e=>parseFloat(e))),{type:o,values:a,colorSpace:n}}function l(e){const{type:t,colorSpace:o}=e;let{values:r}=e;return-1!==t.indexOf("rgb")?r=r.map(((e,t)=>t<3?parseInt(e,10):e)):-1!==t.indexOf("hsl")&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),r=-1!==t.indexOf("color")?`${o} ${r.join(" ")}`:`${r.join(", ")}`,`${t}(${r})`}function s(e,t){return e=i(e),t=a(t),"rgb"!==e.type&&"hsl"!==e.type||(e.type+="a"),"color"===e.type?e.values[3]=`/${t}`:e.values[3]=t,l(e)}function c(e,t){if(e=i(e),t=a(t),-1!==e.type.indexOf("hsl"))e.values[2]*=1-t;else if(-1!==e.type.indexOf("rgb")||-1!==e.type.indexOf("color"))for(let o=0;o<3;o+=1)e.values[o]*=1-t;return l(e)}function p(e,t){if(e=i(e),t=a(t),-1!==e.type.indexOf("hsl"))e.values[2]+=(100-e.values[2])*t;else if(-1!==e.type.indexOf("rgb"))for(let o=0;o<3;o+=1)e.values[o]+=(255-e.values[o])*t;else if(-1!==e.type.indexOf("color"))for(let o=0;o<3;o+=1)e.values[o]+=(1-e.values[o])*t;return l(e)}},72923:(e,t,o)=>{t.A=void 0;var r=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var o=a(t);if(o&&o.has(e))return o.get(e);var r={__proto__:null},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var l=n?Object.getOwnPropertyDescriptor(e,i):null;l&&(l.get||l.set)?Object.defineProperty(r,i,l):r[i]=e[i]}return r.default=e,o&&o.set(e,r),r}(o(96540)),n=o(22532);function a(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,o=new WeakMap;return(a=function(e){return e?o:t})(e)}t.A=function(e=null){const t=r.useContext(n.ThemeContext);return t&&(o=t,0!==Object.keys(o).length)?t:e;var o}}}]);