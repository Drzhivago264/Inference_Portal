"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[513],{24610:(e,t,r)=>{var n=r(24994);t.A=void 0;var o=n(r(42032)),a=r(74848);t.A=(0,o.default)((0,a.jsx)("path",{d:"M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"}),"GetApp")},29513:(e,t,r)=>{r.r(t),r.d(t,{default:()=>E});var n=r(96540),o=r(46266),a=r(69067),l=r(8239),s=r(11848),i=r(60538),c=r(97834),u=r(42471),m=r(35453),f=r(92497),p=r(83248),y=r(6276),b=r(44058);function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,l,s=[],i=!0,c=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=a.call(r)).done)&&(s.push(n.value),s.length!==t);i=!0);}catch(e){c=!0,o=e}finally{try{if(!i&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(c)throw o}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return g(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?g(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){var n,o,a,l;n=e,o=t,a=r[t],l=function(e,t){if("object"!=h(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=h(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==h(l)?l:l+"")in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var S=(0,s.Ay)(i.A)((function(e){var t=e.theme;return A({minWidth:660,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),_=(0,s.Ay)(u.A)((function(e){return A({width:"100%"},e.theme.typography.body2)}));const E=function(){var e=(0,n.useRef)(null),t=(0,n.useRef)(null),r=d((0,n.useState)(!1),2),s=r[0],i=r[1],u=d((0,n.useState)([]),2),h=u[0],g=u[1],v=d((0,n.useState)([]),2),A=v[0],E=v[1],w=d((0,n.useState)([]),2),j=w[0],O=w[1],x=d((0,n.useState)("Mistral Chat 13B"),2),P=x[0],k=x[1],C=d((0,n.useState)(.72),2),I=C[0],M=C[1],L=d((0,n.useState)(-1),2),U=L[0],R=L[1],T=d((0,n.useState)("chat"),2),z=T[0],B=T[1],D=d((0,n.useState)(512),2),F=D[0],W=D[1],q=d((0,n.useState)(!0),2),H=q[0],G=q[1],J=d((0,n.useState)(.73),2),N=J[0],V=J[1],$=d((0,n.useState)(!1),2),K=$[0],Q=$[1],X=d((0,n.useState)(!1),2),Y=X[0],Z=X[1],ee=d((0,n.useState)(2),2),te=ee[0],re=ee[1],ne=d((0,n.useState)(0),2),oe=ne[0],ae=ne[1],le=d((0,n.useState)(0),2),se=le[0],ie=le[1],ce=d((0,n.useState)(0),2),ue=ce[0],me=ce[1],fe=d((0,n.useState)(""),2),pe=fe[0],ye=fe[1],be=d((0,n.useState)(!1),2),he=be[0],de=be[1],ge=d((0,n.useState)(".json"),2),ve=ge[0],Ae=ge[1];(0,n.useEffect)((function(){o.A.all([o.A.get("/frontend-api/model")]).then(o.A.spread((function(e){g(e.data.models),O(e.data.models_agent)}))).catch((function(e){console.log(e)}))}),[]),(0,n.useEffect)((function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[A]);var Se="https:"==window.location.protocol?"wss":"ws",_e=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,n.useEffect)((function(){e.current=new WebSocket(Se+"://"+window.location.host+"/ws/chat/"+_e[_e.length-1]+"/"),(0,y.u)(e,E,i,document)}),[]);var Ee=function(){if(""==pe)de(!0);else{var t={mode:z,message:pe,choosen_models:P,role:"Human",top_k:U,top_p:I,best_of:te,max_tokens:F,frequency_penalty:se,presence_penalty:oe,temperature:N,beam:K,early_stopping:Y,length_penalty:ue,include_memory:H};e.current.send(JSON.stringify(t)),ye("")}};return n.createElement(c.A,{maxWidth:!1,disableGutters:!0},n.createElement("title",null,"Chat"),n.createElement(m.A,null),n.createElement(c.A,{maxWidth:"lg",sx:{width:1200}},n.createElement(a.A,{m:2},n.createElement(l.Ay,{container:!0,spacing:2},n.createElement(l.Ay,{item:!0,xs:8},n.createElement(p.s,{inputsize:660,chat_message:A,usermessage:pe,usermessageError:he,ChatPaper:S,ChatInput:_,setUserMessage:ye,submitChat:Ee,messagesEndRef:t,shownthinking:s,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||Ee()}})),n.createElement(l.Ay,{item:!0,xs:4},n.createElement(a.A,{mb:3},n.createElement(b.b,{chat_message:A,choosen_export_format_chatlog:ve,setChoosenExportFormatChatLog:Ae,number_of_remove_message:1})),n.createElement(f.I2,{model_objects:h,agent_objects:j,choosen_model:P,top_k:U,top_p:I,max_tokens:F,temperature:N,mode:z,bestof:te,lengthpenalty:ue,presencepenalty:oe,frequencypenalty:se,setBeam:Q,setMaxToken:W,setBestof:re,setChoosenModel:k,setTemperature:V,setMode:B,setLengthPenalty:me,setPresencePenalty:ae,setFrequencyPenalty:ie,setTopk:R,setTopp:M,setUseMemory:G,earlystopping:Y,setEarlyStopping:Z}))))))}},44058:(e,t,r)=>{r.d(t,{b:()=>y});var n=r(96540),o=r(69067),a=r(48139),l=r(30995),s=r(29571),i=r(73896),c=r(4147),u=r(50779),m=r(14073),f=r(24610);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var y=function(e){var t=e.chat_message,r=e.choosen_export_format_chatlog,y=e.setChoosenExportFormatChatLog,b=e.number_of_remove_message;return n.createElement(o.A,{mt:2},n.createElement(m.A,{pb:2},"Chat Log Export:"),n.createElement("form",{onSubmit:function(e){e.preventDefault();var n,o=function(e){if(Array.isArray(e))return p(e)}(n=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),a=document.createElement("a");if(".json"==r){var l=JSON.stringify(o.splice(b),null,4),s=new Blob([l],{type:"application/json"}),i=URL.createObjectURL(s);a.setAttribute("href",i),a.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==r){var c=o.splice(b);for(var u in l="",c)l+=c[u].role+"-"+c[u].time+":\n"+c[u].message+"\n";s=new Blob([l],{type:"text/plain"}),i=URL.createObjectURL(s),a.setAttribute("href",i),a.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}a.click()}},n.createElement(u.A,null,n.createElement(l.A,{direction:"row",spacing:1},n.createElement(s.A,{id:"export-label-chatlog"},"Formats"),n.createElement(c.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return y(e.target.value)},value:r,label:"Export",size:"small"},[".json",".txt"].map((function(e){return n.createElement(i.A,{key:e,value:e},e)}))),n.createElement(a.A,{size:"small",variant:"contained",type:"submit",endIcon:n.createElement(f.A,null)},"Export")))))}}}]);