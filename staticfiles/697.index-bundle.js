"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[697],{19697:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var r=n(96540),o=n(46266),a=n(8239),l=n(69067),c=n(35453),i=n(97834),m=n(14073),u=n(84976),f=n(71543),p=n(49799),s=n(37211);const y=n.p+"authentication.md",b=n.p+"behavior.md",d=n.p+"create_key.md",A=n.p+"error_ratelimit.md",h=n.p+"inference.md";var E=n(93399),v=n(71765),g=n(47767),O=n(28848),j=n.n(O),w=n(38960);function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){var r,o,a,l;r=e,o=t,a=n[t],l=function(e,t){if("object"!=S(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==S(l)?l:l+"")in r?Object.defineProperty(r,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[o]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const k=function(){(0,r.useEffect)((function(){j().highlightAll()}));var e,t,n=(0,g.g)().doc,O=(e=(0,r.useState)(""),t=2,function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,l,c=[],i=!0,m=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=a.call(n)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){m=!0,o=e}finally{try{if(!i&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(m)throw o}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return P(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?P(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),S=O[0],x=O[1],k={key:d,errorlimit:A,authentication:y,behavior:b,inference:h};return(0,r.useEffect)((function(){console.log(n),o.A.all([o.A.get(k[n])]).then(o.A.spread((function(e){x(e.data)}))).catch((function(e){console.log(e)}))}),[n]),r.createElement(i.A,{maxWidth:!1,disableGutters:!0},r.createElement("title",null,"Manual"),r.createElement(c.A,null),r.createElement(i.A,{maxWidth:"xl"},r.createElement(l.A,{display:"flex",alignItems:"center"},r.createElement(a.Ay,{container:!0,spacing:1},r.createElement(a.Ay,{item:!0,md:3,lg:2},r.createElement(l.A,{mt:3,mb:5,sx:{display:{xs:"none",sm:"none ",md:"block"}}},r.createElement(m.A,{variant:"body1",component:"body1"},r.createElement(p.A,{dense:!0},r.createElement(s.A,{component:u.N_,to:"/frontend/manual/key"}," ",r.createElement(m.A,{variant:"body2",component:"body2"}," Setting Up Your API Key ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/authentication"},r.createElement(m.A,{variant:"body2",component:"body2"}," Authentication ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/inference"},r.createElement(m.A,{variant:"body2",component:"body2"}," Inference ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/errorlimit"},r.createElement(m.A,{variant:"body2",component:"body2"}," Common Errors and Ratelimits ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/behavior"},r.createElement(m.A,{variant:"body2",component:"body2"},"The behaviors of this website ")," "))))),r.createElement(f.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),r.createElement(a.Ay,{item:!0,xs:12,md:8,lg:8},r.createElement(l.A,{mt:3,sx:{display:{sm:"block ",md:"none"}}},r.createElement(m.A,{variant:"body1",component:"body1"},r.createElement(p.A,{dense:!0},r.createElement(s.A,{component:u.N_,to:"/frontend/manual/key"}," ",r.createElement(m.A,null," Setting Up Your API Key ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/authentication"},r.createElement(m.A,null," Authentication ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/inference"},r.createElement(m.A,null," Inference ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/errorlimit"},r.createElement(m.A,null," Common Errors and Ratelimits ")," "),r.createElement(s.A,{component:u.N_,to:"/frontend/manual/behavior"},r.createElement(m.A,null,"The behaviors of this website ")," ")))),r.createElement(l.A,{m:3},r.createElement(E.jg,{overrides:_(_({},(0,E._O)({Highlight:v.f4,themes:v.Zj,theme:v.Zj.okaidia})),{},{h1:{component:"h1"},h2:{component:"h2"},h3:{component:"h3"}})},S))),r.createElement(f.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}})))),r.createElement(w.A,null))}}}]);