"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[704],{65812:(e,t,r)=>{var n=r(24994);t.A=void 0;var o=n(r(42032)),l=r(74848);t.A=(0,o.default)((0,l.jsx)("path",{d:"M14 10H9c-.6 0-1 .4-1 1v4h2v-3h4v2.5l3.5-3.5L14 7.5zm-2-9C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1m7.73 11.58-7.19 7.22c-.35.27-.79.27-1.15 0L4.2 12.58c-.27-.36-.27-.8 0-1.16l7.19-7.22c.35-.27.79-.27 1.15 0l7.19 7.22c.36.27.36.8 0 1.16"}),"AssistantDirection")},28800:(e,t,r)=>{var n=r(24994);t.A=void 0;var o=n(r(42032)),l=r(74848);t.A=(0,o.default)((0,l.jsx)("path",{d:"M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"}),"Login")},36632:(e,t,r)=>{r.d(t,{A:()=>z});var n=r(98587),o=r(58168),l=r(96540),a=r(34164),i=r(64111),c=r(771),s=r(76081),u=r(11848),m=r(6025),p=r(28466),d=r(60538),f=r(27553),v=r(17245);function A(e){return(0,v.Ay)("MuiAlert",e)}const h=(0,f.A)("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var g=r(11641),y=r(20561),b=r(74848);const E=(0,y.A)((0,b.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),S=(0,y.A)((0,b.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),x=(0,y.A)((0,b.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),j=(0,y.A)((0,b.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined");var C=r(49350);const w=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],O=(0,s.h)("MuiAlert"),M=(0,u.Ay)(d.A,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`${r.variant}${(0,p.A)(r.color||r.severity)}`]]}})((({theme:e})=>{const t="light"===e.palette.mode?c.e$:c.a,r="light"===e.palette.mode?c.a:c.e$;return(0,o.A)({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([n])=>({props:{colorSeverity:n,variant:"standard"},style:{color:e.vars?e.vars.palette.Alert[`${n}Color`]:t(e.palette[n].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${n}StandardBg`]:r(e.palette[n].light,.9),[`& .${h.icon}`]:e.vars?{color:e.vars.palette.Alert[`${n}IconColor`]}:{color:e.palette[n].main}}}))),...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([r])=>({props:{colorSeverity:r,variant:"outlined"},style:{color:e.vars?e.vars.palette.Alert[`${r}Color`]:t(e.palette[r].light,.6),border:`1px solid ${(e.vars||e).palette[r].light}`,[`& .${h.icon}`]:e.vars?{color:e.vars.palette.Alert[`${r}IconColor`]}:{color:e.palette[r].main}}}))),...Object.entries(e.palette).filter((([,e])=>e.main&&e.dark)).map((([t])=>({props:{colorSeverity:t,variant:"filled"},style:(0,o.A)({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${t}FilledColor`],backgroundColor:e.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:"dark"===e.palette.mode?e.palette[t].dark:e.palette[t].main,color:e.palette.getContrastText(e.palette[t].main)})})))]})})),I=(0,u.Ay)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),L=(0,u.Ay)("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),k=(0,u.Ay)("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),P={success:(0,b.jsx)(E,{fontSize:"inherit"}),warning:(0,b.jsx)(S,{fontSize:"inherit"}),error:(0,b.jsx)(x,{fontSize:"inherit"}),info:(0,b.jsx)(j,{fontSize:"inherit"})},z=l.forwardRef((function(e,t){const r=O({props:e,name:"MuiAlert"}),{action:l,children:c,className:s,closeText:u="Close",color:d,components:f={},componentsProps:v={},icon:h,iconMapping:y=P,onClose:E,role:S="alert",severity:x="success",slotProps:j={},slots:z={},variant:$="standard"}=r,R=(0,n.A)(r,w),H=(0,o.A)({},r,{color:d,severity:x,variant:$,colorSeverity:d||x}),W=(e=>{const{variant:t,color:r,severity:n,classes:o}=e,l={root:["root",`color${(0,p.A)(r||n)}`,`${t}${(0,p.A)(r||n)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return(0,i.A)(l,A,o)})(H),T={slots:(0,o.A)({closeButton:f.CloseButton,closeIcon:f.CloseIcon},z),slotProps:(0,o.A)({},v,j)},[F,N]=(0,m.A)("closeButton",{elementType:g.A,externalForwardedProps:T,ownerState:H}),[_,B]=(0,m.A)("closeIcon",{elementType:C.A,externalForwardedProps:T,ownerState:H});return(0,b.jsxs)(M,(0,o.A)({role:S,elevation:0,ownerState:H,className:(0,a.A)(W.root,s),ref:t},R,{children:[!1!==h?(0,b.jsx)(I,{ownerState:H,className:W.icon,children:h||y[x]||P[x]}):null,(0,b.jsx)(L,{ownerState:H,className:W.message,children:c}),null!=l?(0,b.jsx)(k,{ownerState:H,className:W.action,children:l}):null,null==l&&E?(0,b.jsx)(k,{ownerState:H,className:W.action,children:(0,b.jsx)(F,(0,o.A)({size:"small","aria-label":u,title:u,color:"inherit",onClick:E},N,{children:(0,b.jsx)(_,(0,o.A)({fontSize:"small"},B))}))}):null]}))}))},49350:(e,t,r)=>{r.d(t,{A:()=>l}),r(96540);var n=r(20561),o=r(74848);const l=(0,n.A)((0,o.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},79704:(e,t,r)=>{r.r(t),r.d(t,{default:()=>T});var n=r(96540),o=r(46266),l=r(8239),a=r(69067),i=r(97834),c=r(30995),s=r(1043),u=r(47767),m=r(53246),p=r(25239),d=r(37312),f=r(48139),v=r(53215),A=r(29428),h=r(50779),g=r(69307),y=r(36632),b=r(68864),E=r(28800),S=r(14073),x=r(93399);const j=r.p+"mode_explaination.md";var C=r(71765),w=r(45423),O=r(71543),M=r(65812),I=r(21005),L=r(38960),k=r(63418),P=r(22453);function z(e){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(e)}function $(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?$(Object(r),!0).forEach((function(t){var n,o,l,a;n=e,o=t,l=r[t],a=function(e,t){if("object"!=z(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=z(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==z(a)?a:a+"")in n?Object.defineProperty(n,o,{value:l,enumerable:!0,configurable:!0,writable:!0}):n[o]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):$(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,l,a,i=[],c=!0,s=!1;try{if(l=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=l.call(r)).done)&&(i.push(n.value),i.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return W(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?W(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const T=function(){var e=(0,n.useContext)(k.Rs),t=e.is_authenticated,r=e.setIsAuthenticated,z=H((0,n.useState)(""),2),$=z[0],W=z[1],T=(0,u.Zp)(),F=H((0,n.useState)("engineer"),2),N=F[0],_=F[1],B=H((0,n.useState)(""),2),D=B[0],V=B[1],Z=H((0,n.useState)(!1),2),q=Z[0],G=Z[1],K=H((0,n.useState)(null),2),U=K[0],X=K[1];(0,n.useEffect)((function(){o.A.all([o.A.get(j)]).then(o.A.spread((function(e){W(e.data)}))).catch((function(e){console.log(e)}))}),[]);var Y=function(e){var t=e.error;return n.createElement(a.A,{mt:4},n.createElement(S.A,{variant:"body1"},"Request Failed!"),n.createElement(a.A,{textAlign:"center",my:2},n.createElement(y.A,{variant:"filled",severity:"error"},t)))};return n.createElement(i.A,{maxWidth:!1,disableGutters:!0},n.createElement("title",null,"Hub"),n.createElement(d.A,null),n.createElement(i.A,{maxWidth:"lg"},n.createElement(a.A,{my:1,display:"flex",alignItems:"center",gap:4,p:2},n.createElement(l.Ay,{container:!0,spacing:2},n.createElement(l.Ay,{item:!0,md:4,lg:3},n.createElement("form",{autoComplete:"off",onSubmit:function(e){if(e.preventDefault(),G(!1),t||""!=D){if(N){var n={headers:{"content-type":"application/json","X-CSRFToken":(0,P.R)("csrftoken")}},l={key:D,check_login:t,destination:N};o.A.post("/frontend-api/hub-redirect",l,n).then((function(e){r(!0),T(e.data.redirect_link,{replace:!0,state:{credential:D}})})).catch((function(e){X(e.response.data.detail),"400"==e.response.status&&X("Your key is incorrect")}))}}else G(!0)}},n.createElement(h.A,{defaultValue:"",required:!0},!t&&n.createElement(c.A,{mt:3,direction:"row",spacing:1},n.createElement(s.A,{margin:"normal",label:"Key",type:"password",size:"small",onChange:function(e){return V(e.target.value)},value:D,error:q,autoComplete:"off",InputProps:{startAdornment:n.createElement(p.A,{position:"start"},n.createElement(m.A,null))}}),n.createElement(f.A,{variant:"contained",type:"submit",endIcon:n.createElement(E.A,null)},"Login")),t&&n.createElement(c.A,{mt:3,direction:"row",spacing:1},n.createElement(f.A,{variant:"contained",type:"submit",endIcon:n.createElement(M.A,null)},"Redirect"),n.createElement(O.A,{orientation:"vertical",flexItem:!0}),n.createElement(f.A,{variant:"outlined",onClick:function(){(0,I.r)(r)},color:"error",endIcon:n.createElement(w.A,null)},"Logout")),n.createElement(g.A,{sx:{m:2}},"Bring me to:"),n.createElement(A.A,{"aria-labelledby":"demo-radio-buttons-group-label",name:"radio-buttons-group",onChange:function(e){return _(e.target.value)},value:N,sx:{ml:2}},n.createElement(b.A,{value:"chat",control:n.createElement(v.A,null),label:"Chatbots"}),n.createElement(b.A,{value:"engineer",control:n.createElement(v.A,null),label:"Agents"}),n.createElement(b.A,{value:"hotpot",control:n.createElement(v.A,null),label:"Hotpot Mode"}),n.createElement(b.A,{value:"toolbox",control:n.createElement(v.A,null),label:"LLM Functions"}),n.createElement(b.A,{value:"log",control:n.createElement(v.A,null),label:"Retrieve Log"})))),U&&n.createElement(Y,{error:U})),n.createElement(l.Ay,{item:!0,md:8,lg:9},n.createElement(x.jg,{overrides:R(R({},(0,x._O)({Highlight:C.f4,themes:C.Zj,theme:C.Zj.okaidia})),{},{h1:{component:"h1"},h2:{component:"h2"},h3:{component:"h3"}})},$))))),n.createElement(L.A,null))}}}]);