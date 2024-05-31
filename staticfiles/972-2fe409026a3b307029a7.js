"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[972],{28972:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var r=n(96540),i=n(60538),l=n(97834),a=n(69067),o=n(37312),c=n(45089),u=n(30995),s=n(14073),m=n(38960),d=n(71543),p=n(47767),f=n(85072),y=n.n(f),h=n(97825),b=n.n(h),A=n(77659),E=n.n(A),v=n(55056),x=n.n(v),g=n(10540),w=n.n(g),S=n(41113),_=n.n(S),j=n(23743),k={};k.styleTagTransform=_(),k.setAttributes=x(),k.insert=E().bind(null,"head"),k.domAPI=b(),k.insertStyleElement=w(),y()(j.A,k),j.A&&j.A.locals&&j.A.locals;var O=n(32389),I=n(49799),T=n(44090),P=n(9519);function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n(70832);var W=function(e){var t=e.sequence,n=e.wrapper,i=e.cursor,l=e.repeat,a=e.speed,o=e.deletionSpeed,c=(e.onFinish,e.style),u=e.className,s=void 0===u?"":u,m=function(e){var t,n,i=(t=(0,r.useState)(!1),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,l,a,o=[],c=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=l.call(n)).done)&&(o.push(r.value),o.length!==t);c=!0);}catch(e){u=!0,i=e}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw i}}return o}}(t,n)||function(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=i[0],a=i[1];return(0,r.useEffect)((function(){return a(!1)}),[e]),(0,r.useEffect)((function(){l||a(!0)}),[l]),l}(t);return m?r.createElement(P.d,{cursor:i,sequence:t,wrapper:n,repeat:l,speed:a,deletionSpeed:o,className:s,style:c}):null};function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function z(e,t,n){var r;return r=function(e,t){if("object"!=q(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t),(t="symbol"==q(r)?r:r+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,l,a,o=[],c=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=l.call(n)).done)&&(o.push(r.value),o.length!==t);c=!0);}catch(e){u=!0,i=e}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw i}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?N(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const M=function(){var e=(0,r.useRef)(null),t=(0,O.Bd)(),n=t.t,f=(t.i18n,H((0,r.useState)(!1),2)),y=f[0],h=f[1];(0,r.useEffect)((function(){e&&(e.current.play(),h(!0))}),[e]);var b=H((0,r.useState)(null),2),A=b[0],E=(b[1],(0,p.Zp)());return(0,r.useEffect)((function(){A&&E(A,{replace:!0})}),[A]),r.createElement(l.A,{maxWidth:!1,disableGutters:!0},r.createElement("div",{className:"video-container"},r.createElement("video",{ref:e,className:"videoTag",autoPlay:!0,loop:!0,muted:!0,playsInline:!0,disablePictureInPicture:!0,controlsList:"nodownload",onPlay:function(){h(!0)}},r.createElement("source",{src:"/static/video/introduction_background.mp4",type:"video/mp4"}))),r.createElement("title",null,"Introduction"),r.createElement(o.A,{max_width:"xl"}),!y&&r.createElement(l.A,{maxWidth:"lg"},r.createElement(u.A,{mt:{xs:75},spacing:1},r.createElement(c.A,{variant:"rounded",animation:"wave",height:350}),r.createElement(c.A,{variant:"rounded",animation:"wave",height:350}),r.createElement(c.A,{variant:"rounded",animation:"wave",height:300}))),y&&r.createElement(l.A,{maxWidth:"lg"},r.createElement(a.A,{alignItems:"center",justifyContent:"center",sx:{display:"flex",flexWrap:"wrap","& > :not(style)":{width:1,mt:{xs:12,sm:12,md:15,lg:17},height:{xs:"220px",sm:"230px",md:"270px",lg:"180px"},fontSize:{xs:"1.25em",sm:"1.5em",md:"1.75em"}}}},r.createElement(a.A,{display:"flex",alignItems:"center",sx:{backgroundColor:function(e){return"dark"===e.palette.mode?"rgba(0, 0, 0, .25)":"rgba(255, 255, 255, .25)"},borderRadius:"12px"}},r.createElement(W,{style:{whiteSpace:"pre-line",display:"block",padding:"20px",lineHeight:1.7},sequence:[n("introduction.introduction_animation",{returnObjects:!0})[0],1500,n("introduction.introduction_animation",{returnObjects:!0})[1],1500,n("introduction.introduction_animation",{returnObjects:!0})[2],3e3,"",function(){}],wrapper:"span",cursor:!0,repeat:1/0,speed:120,deletionSpeed:90}))),r.createElement(a.A,{sx:{display:"flex",justifyContent:"center",alignItems:"center"}},r.createElement(a.A,{maxWidth:"md",mt:{xs:18,sm:20,md:20,lg:22}},r.createElement(a.A,{mt:5,mb:5,p:1},r.createElement(a.A,{mt:2,mb:2},r.createElement(s.A,{variant:"h4"},n("introduction.about_title"))),r.createElement(d.A,null),r.createElement(a.A,{mt:2,mb:8},r.createElement(s.A,null,n("introduction.about_chunk_1")),r.createElement(a.A,{ml:4},r.createElement(I.A,{sx:{listStyleType:"disc"}},n("introduction.user_list",{returnObjects:!0}).map((function(e){return r.createElement(T.Ay,{key:e,sx:{display:"list-item"}},e)})))),r.createElement(s.A,{style:{whiteSpace:"pre-line"}},n("introduction.about_chunk_2"))),r.createElement(a.A,{mt:2,mb:2},r.createElement(s.A,{variant:"h4"},n("introduction.tool_title"))),r.createElement(d.A,null),r.createElement(a.A,{mt:2,mb:6},r.createElement(s.A,null,n("introduction.tool_chunk_1")),r.createElement(a.A,{ml:4},r.createElement(I.A,{sx:{listStyleType:"disc"}},n("introduction.tool_list",{returnObjects:!0}).map((function(e){return r.createElement(T.Ay,{key:e,sx:{display:"list-item"}},e)})))),r.createElement(s.A,null,n("introduction.tool_chunk_2")),r.createElement(a.A,{ml:4},r.createElement(I.A,{sx:{listStyleType:"disc"}},n("introduction.call_to_act_list",{returnObjects:!0}).map((function(e){return r.createElement(T.Ay,{key:e,sx:{display:"list-item"}},e)}))))),r.createElement(a.A,{mt:2,mb:2},r.createElement(s.A,{variant:"h4"},n("introduction.example_title"))),r.createElement(d.A,null),r.createElement(s.A,{mt:2},n("introduction.example_chunk_1")),r.createElement(a.A,{mt:1,mb:1,sx:{display:"flex",flexWrap:"wrap","& > :not(style)":{width:1,height:{xs:"250px"},overflow:"auto",fontSize:{xs:"1em"}}}},r.createElement(i.A,{variant:"outlined"},r.createElement(s.A,{variant:"body1",style:z({whiteSpace:"pre-line",display:"block",padding:"10px",lineHeight:1.7},"whiteSpace","pre-wrap")},n("introduction.example_1")),r.createElement(d.A,null),r.createElement(W,{style:{whiteSpace:"pre-line",display:"block",padding:"10px",lineHeight:1.7},sequence:[n("introduction.example_1_answer"),3e3,"",function(){}],wrapper:"span",cursor:!0,repeat:1/0,speed:120,deletionSpeed:90}))),r.createElement(s.A,{mt:2},n("introduction.example_chunk_2")),r.createElement(a.A,{sx:{display:"flex",flexWrap:"wrap","& > :not(style)":{width:1,mt:2,height:{xs:"250px"},overflow:"auto",fontSize:{xs:"1em"}}}},r.createElement(i.A,{variant:"outlined"},r.createElement(s.A,{variant:"body1",style:z({whiteSpace:"pre-line",display:"block",padding:"10px",lineHeight:1.7},"whiteSpace","pre-wrap")},n("introduction.example_2")),r.createElement(d.A,null),r.createElement(W,{style:{whiteSpace:"pre-line",display:"block",padding:"10px",lineHeight:1.7},sequence:[n("introduction.example_2_answer"),3e3,"",function(){}],wrapper:"span",cursor:!0,repeat:1/0,speed:120,deletionSpeed:90}))))))),y&&r.createElement(m.A,null))}},23743:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(31601),i=n.n(r),l=n(76314),a=n.n(l)()(i());a.push([e.id,"video {\n    position: relative;\n    width: auto;\n    min-width: 1500px;\n    width: 100%;\n    height: auto;\n    background-size: cover;\n}\n.video-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    min-width: 100%;\n    height: 550px;\n    overflow: hidden;\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: -1;  \n  }",""]);const o=a}}]);