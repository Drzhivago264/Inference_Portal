"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[50],{28800:(t,e,n)=>{var o=n(24994);e.A=void 0;var r=o(n(42032)),a=n(74848);e.A=(0,r.default)((0,a.jsx)("path",{d:"M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"}),"Login")},5673:(t,e,n)=>{var o=n(24994);e.A=void 0;var r=o(n(42032)),a=n(74848);e.A=(0,r.default)((0,a.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"}),"Visibility")},76768:(t,e,n)=>{var o=n(24994);e.A=void 0;var r=o(n(42032)),a=n(74848);e.A=(0,r.default)((0,a.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z"}),"VisibilityOff")},13718:(t,e,n)=>{n.d(e,{A:()=>I});var o=n(98587),r=n(58168),a=n(96540),i=n(28466),l=n(1668),c=n(64111),d=n(11848),s=n(3541),u=n(48139),g=n(41848),f=n(73357),m=n(46311),p=n(17245);function y(t){return(0,p.Ay)("MuiLoadingButton",t)}const v=(0,n(27553).A)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]);var A=n(74848);const b=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],h=(0,d.Ay)(u.A,{shouldForwardProp:t=>(t=>"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t&&"classes"!==t)(t)||"classes"===t,name:"MuiLoadingButton",slot:"Root",overridesResolver:(t,e)=>[e.root,e.startIconLoadingStart&&{[`& .${v.startIconLoadingStart}`]:e.startIconLoadingStart},e.endIconLoadingEnd&&{[`& .${v.endIconLoadingEnd}`]:e.endIconLoadingEnd}]})((({ownerState:t,theme:e})=>(0,r.A)({[`& .${v.startIconLoadingStart}, & .${v.endIconLoadingEnd}`]:{transition:e.transitions.create(["opacity"],{duration:e.transitions.duration.short}),opacity:0}},"center"===t.loadingPosition&&{transition:e.transitions.create(["background-color","box-shadow","border-color"],{duration:e.transitions.duration.short}),[`&.${v.loading}`]:{color:"transparent"}},"start"===t.loadingPosition&&t.fullWidth&&{[`& .${v.startIconLoadingStart}, & .${v.endIconLoadingEnd}`]:{transition:e.transitions.create(["opacity"],{duration:e.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===t.loadingPosition&&t.fullWidth&&{[`& .${v.startIconLoadingStart}, & .${v.endIconLoadingEnd}`]:{transition:e.transitions.create(["opacity"],{duration:e.transitions.duration.short}),opacity:0,marginLeft:-8}}))),E=(0,d.Ay)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.loadingIndicator,e[`loadingIndicator${(0,i.A)(n.loadingPosition)}`]]}})((({theme:t,ownerState:e})=>(0,r.A)({position:"absolute",visibility:"visible",display:"flex"},"start"===e.loadingPosition&&("outlined"===e.variant||"contained"===e.variant)&&{left:"small"===e.size?10:14},"start"===e.loadingPosition&&"text"===e.variant&&{left:6},"center"===e.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(t.vars||t).palette.action.disabled},"end"===e.loadingPosition&&("outlined"===e.variant||"contained"===e.variant)&&{right:"small"===e.size?10:14},"end"===e.loadingPosition&&"text"===e.variant&&{right:6},"start"===e.loadingPosition&&e.fullWidth&&{position:"relative",left:-10},"end"===e.loadingPosition&&e.fullWidth&&{position:"relative",right:-10}))),I=a.forwardRef((function(t,e){const n=a.useContext(g.A),d=(0,m.A)(n,t),u=(0,s.A)({props:d,name:"MuiLoadingButton"}),{children:p,disabled:v=!1,id:I,loading:S=!1,loadingIndicator:P,loadingPosition:L="center",variant:w="text"}=u,j=(0,o.A)(u,b),x=(0,l.A)(I),O=null!=P?P:(0,A.jsx)(f.A,{"aria-labelledby":x,color:"inherit",size:16}),C=(0,r.A)({},u,{disabled:v,loading:S,loadingIndicator:O,loadingPosition:L,variant:w}),$=(t=>{const{loading:e,loadingPosition:n,classes:o}=t,a={root:["root",e&&"loading"],startIcon:[e&&`startIconLoading${(0,i.A)(n)}`],endIcon:[e&&`endIconLoading${(0,i.A)(n)}`],loadingIndicator:["loadingIndicator",e&&`loadingIndicator${(0,i.A)(n)}`]},l=(0,c.A)(a,y,o);return(0,r.A)({},o,l)})(C),M=S?(0,A.jsx)(E,{className:$.loadingIndicator,ownerState:C,children:O}):null;return(0,A.jsxs)(h,(0,r.A)({disabled:v||S,id:x,ref:e},j,{variant:w,classes:$,ownerState:C,children:["end"===C.loadingPosition?p:M,"end"===C.loadingPosition?M:p]}))}))},48050:(t,e,n)=>{n.r(e),n.d(e,{default:()=>k});var o=n(96540),r=n(46266),a=n(69067),i=n(97834),l=n(30995),c=n(1043),d=n(36632),s=n(53246),u=n(25239),g=n(8676),f=n(50779),m=n(60538),p=n(14073),y=n(35453),v=n(13718),A=n(38960),b=n(5673),h=n(76768),E=n(11641),I=n(28800),S=n(47767),P=n(84976),L=n(63418),w=n(71543),j=n(22453);function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function O(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,a,i,l=[],c=!0,d=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(o=a.call(n)).done)&&(l.push(o.value),l.length!==e);c=!0);}catch(t){d=!0,r=t}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(d)throw r}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return C(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function $(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var M=(0,g.A)(m.A)((function(t){var e=t.theme;return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?$(Object(n),!0).forEach((function(e){var o,r,a,i;o=t,r=e,a=n[e],i=function(t,e){if("object"!=x(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!=x(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r),(r="symbol"==x(i)?i:i+"")in o?Object.defineProperty(o,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[r]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({padding:e.spacing(4)},e.typography.body2)}));const k=function(){var t=O(o.useState(!1),2),e=t[0],n=t[1],g=(0,o.useContext)(L.Rs),m=(g.is_authenticated,g.setIsAuthenticated),x=(0,S.Zp)(),C=O((0,o.useState)(!1),2),$=C[0],k=C[1],z=O((0,o.useState)(""),2),R=z[0],W=z[1],D=O((0,o.useState)(!1),2),B=D[0],V=D[1],_=O((0,o.useState)(!1),2),F=_[0],N=_[1],T=function(t){var e=t.error;return o.createElement(a.A,{mt:4},o.createElement(p.A,{variant:"body1"},"Request Failed!"),o.createElement(a.A,{textAlign:"center"},o.createElement(d.A,{variant:"filled",severity:"error"},e)))};return o.createElement(i.A,{maxWidth:!1,disableGutters:!0},o.createElement("title",null,"Login"),o.createElement(y.A,null),o.createElement(i.A,{maxWidth:"sm"},o.createElement(a.A,{my:1,alignItems:"center",gap:4,p:2},o.createElement(M,{variant:"outlined"},o.createElement(a.A,{textAlign:"center",my:1},o.createElement(p.A,{variant:"h4"},o.createElement(a.A,{sx:{mb:1,fontWeight:"bold"}},"Login")),o.createElement(a.A,{sx:{p:2}},o.createElement("form",{autoComplete:"off",onSubmit:function(t){if(t.preventDefault(),k(!0),""==R&&V(!0),R){console.log(R);var e={headers:{"content-type":"application/json","X-CSRFToken":(0,j.R)("csrftoken")}},n={key:R};r.A.post("/frontend-api/login",n,e).then((function(t){m(!0),x("/frontend/hub")})).catch((function(t){N(t.response.data.detail)}))}k(!1)}},o.createElement(f.A,{defaultValue:"",margin:"normal",required:!0},o.createElement(l.A,{direction:{xs:"column"},spacing:1},o.createElement(c.A,{margin:"normal",fullWidth:!0,label:"Key",type:e?"text":"password",size:"small",onChange:function(t){return W(t.target.value)},value:R,error:B,autoComplete:"off",InputProps:{startAdornment:o.createElement(u.A,{position:"start"},o.createElement(s.A,null)),endAdornment:o.createElement(u.A,{position:"end"},o.createElement(E.A,{"aria-label":"toggle password visibility",onClick:function(){return n((function(t){return!t}))},onMouseDown:function(t){t.preventDefault()},edge:"end"},e?o.createElement(h.A,null):o.createElement(b.A,null)))}}),o.createElement(v.A,{loading:$,variant:"contained",type:"submit",endIcon:o.createElement(I.A,null)},"Login"))))),o.createElement(w.A,null),o.createElement(a.A,{sx:{pt:4}},o.createElement(v.A,{size:"medium",variant:"contained",component:P.N_,to:"/frontend/key-management"},"  Create New Key "))),F&&o.createElement(T,{error:F})))),o.createElement(A.A,null))}}}]);