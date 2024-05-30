"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[790],{2790:(e,t,n)=>{n.r(t),n.d(t,{default:()=>B});var r=n(96540),a=n(46266),o=n(8239),l=n(69067),i=n(97834),c=n(30995),u=n(1043),m=n(47767),s=n(53246),f=n(25239),p=n(37312),y=n(48139),b=n(53215),d=n(29428),g=n(50779),A=n(69307),v=n(36632),E=n(68864),h=n(28800),j=n(14073),O=n(93399);const S=n.p+"mode_explaination_en.md",w=n.p+"mode_explaination_vi.md";var k=n(32389),x=n(71765),P=n(45423),C=n(71543),I=n(65812),_=n(21005),R=n(38960),D=n(63418),L=n(22453),F=n(72635);function H(e){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H(e)}function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){var r,a,o,l;r=e,a=t,o=n[t],l=function(e,t){if("object"!=H(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=H(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==H(l)?l:l+"")in r?Object.defineProperty(r,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,l,i=[],c=!0,u=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(u)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const B=function(){var e=Z((0,r.useState)("en"==F.Ay.language||"vi"==F.Ay.language?F.Ay.language:"en"),2),t=e[0],n=e[1],H=(0,k.Bd)(),M=(H.t,H.i18n);(0,r.useEffect)((function(){n(M.language)}),[M.language]);var q={en:S,vi:w},B=(0,r.useContext)(D.Rs),W=B.is_authenticated,z=B.setIsAuthenticated,G=Z((0,r.useState)(""),2),K=G[0],U=G[1],V=(0,m.Zp)(),X=Z((0,r.useState)("engineer"),2),Y=X[0],$=X[1],J=Z((0,r.useState)(""),2),N=J[0],Q=J[1],ee=Z((0,r.useState)(!1),2),te=ee[0],ne=ee[1],re=Z((0,r.useState)(null),2),ae=re[0],oe=re[1];(0,r.useEffect)((function(){a.A.all([a.A.get(q[t])]).then(a.A.spread((function(e){U(e.data)}))).catch((function(e){console.log(e)}))}),[t]);var le=function(e){var t=e.error;return r.createElement(l.A,{mt:4},r.createElement(j.A,{variant:"body1"},"Request Failed!"),r.createElement(l.A,{textAlign:"center",my:2},r.createElement(v.A,{variant:"filled",severity:"error"},t)))};return r.createElement(i.A,{maxWidth:!1,disableGutters:!0},r.createElement("title",null,"Hub"),r.createElement(p.A,null),r.createElement(i.A,{maxWidth:"lg"},r.createElement(l.A,{my:1,display:"flex",alignItems:"center",gap:4,p:2},r.createElement(o.Ay,{container:!0,spacing:2},r.createElement(o.Ay,{item:!0,md:4,lg:3},r.createElement("form",{autoComplete:"off",onSubmit:function(e){if(e.preventDefault(),ne(!1),W||""!=N){if(Y){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,L.R)("csrftoken")}},n={key:N,check_login:W,destination:Y};a.A.post("/frontend-api/hub-redirect",n,t).then((function(e){z(!0),V(e.data.redirect_link,{replace:!0,state:{credential:N}})})).catch((function(e){oe(e.response.data.detail),"400"==e.response.status&&oe("Your key is incorrect")}))}}else ne(!0)}},r.createElement(g.A,{defaultValue:"",required:!0},!W&&r.createElement(c.A,{mt:3,direction:"row",spacing:1},r.createElement(u.A,{margin:"normal",label:"Key",type:"password",size:"small",onChange:function(e){return Q(e.target.value)},value:N,error:te,autoComplete:"off",InputProps:{startAdornment:r.createElement(f.A,{position:"start"},r.createElement(s.A,null))}}),r.createElement(y.A,{variant:"contained",type:"submit",endIcon:r.createElement(h.A,null)},"Login")),W&&r.createElement(c.A,{mt:3,direction:"row",spacing:1},r.createElement(y.A,{variant:"contained",type:"submit",endIcon:r.createElement(I.A,null)},"Redirect"),r.createElement(C.A,{orientation:"vertical",flexItem:!0}),r.createElement(y.A,{variant:"outlined",onClick:function(){(0,_.r)(z)},color:"error",endIcon:r.createElement(P.A,null)},"Logout")),r.createElement(A.A,{sx:{m:2}},"Bring me to:"),r.createElement(d.A,{"aria-labelledby":"demo-radio-buttons-group-label",name:"radio-buttons-group",onChange:function(e){return $(e.target.value)},value:Y,sx:{ml:2}},r.createElement(E.A,{value:"chat",control:r.createElement(b.A,null),label:"Chatbots"}),r.createElement(E.A,{value:"engineer",control:r.createElement(b.A,null),label:"Agents"}),r.createElement(E.A,{value:"hotpot",control:r.createElement(b.A,null),label:"Hotpot Mode"}),r.createElement(E.A,{value:"toolbox",control:r.createElement(b.A,null),label:"LLM Functions"}),r.createElement(E.A,{value:"log",control:r.createElement(b.A,null),label:"Retrieve Log"})))),ae&&r.createElement(le,{error:ae})),r.createElement(o.Ay,{item:!0,md:8,lg:9},r.createElement(O.jg,{overrides:T(T({},(0,O._O)({Highlight:x.f4,themes:x.Zj,theme:x.Zj.okaidia})),{},{h1:{component:"h1"},h2:{component:"h2"},h3:{component:"h3"}})},K))))),r.createElement(R.A,null))}}}]);