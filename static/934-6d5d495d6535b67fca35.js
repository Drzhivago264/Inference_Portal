"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[934],{24610:(e,t,r)=>{var n=r(24994);t.A=void 0;var o=n(r(42032)),a=r(74848);t.A=(0,o.default)((0,a.jsx)("path",{d:"M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"}),"GetApp")},44058:(e,t,r)=>{r.d(t,{b:()=>y});var n=r(96540),o=r(69067),a=r(48139),l=r(30995),i=r(29571),u=r(73896),s=r(4147),c=r(50779),m=r(14073),f=r(24610);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var y=function(e){var t=e.chat_message,r=e.choosen_export_format_chatlog,y=e.setChoosenExportFormatChatLog,b=e.number_of_remove_message;return n.createElement(o.A,{mt:2},n.createElement(m.A,{pb:2},"Chat Log Export:"),n.createElement("form",{onSubmit:function(e){e.preventDefault();var n,o=function(e){if(Array.isArray(e))return p(e)}(n=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),a=document.createElement("a");if(".json"==r){var l=JSON.stringify(o.splice(b),null,4),i=new Blob([l],{type:"application/json"}),u=URL.createObjectURL(i);a.setAttribute("href",u),a.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==r){var s=o.splice(b);for(var c in l="",s)l+=s[c].role+"-"+s[c].time+":\n"+s[c].message+"\n";i=new Blob([l],{type:"text/plain"}),u=URL.createObjectURL(i),a.setAttribute("href",u),a.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}a.click()}},n.createElement(c.A,null,n.createElement(l.A,{direction:"row",spacing:1},n.createElement(i.A,{id:"export-label-chatlog"},"Formats"),n.createElement(s.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return y(e.target.value)},value:r,label:"Export",size:"small"},[".json",".txt"].map((function(e){return n.createElement(u.A,{key:e,value:e},e)}))),n.createElement(a.A,{size:"small",variant:"contained",type:"submit",endIcon:n.createElement(f.A,null)},"Export")))))}},64934:(e,t,r)=>{r.r(t),r.d(t,{default:()=>k});var n=r(96540),o=r(46266),a=r(69067),l=r(50779),i=r(69307),u=r(8239),s=r(11848),c=r(53215),m=r(29428),f=r(60538),p=r(68864),y=r(97834),b=r(1043),d=r(71543),h=r(37312),g=r(92497),v=r(83248),A=r(6276),E=r(44058),w=r(38960);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,l,i=[],u=!0,s=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(i.push(n.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(s)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?j(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){var n,o,a,l;n=e,o=t,a=r[t],l=function(e,t){if("object"!=_(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=_(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==_(l)?l:l+"")in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var P=(0,s.Ay)(f.A)((function(e){var t=e.theme;return O({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),C=(0,s.Ay)(b.A)((function(e){return O({width:"100%"},e.theme.typography.body2)}));const k=function(){(0,n.useRef)();var e=(0,n.useRef)(null),t=S((0,n.useState)(!1),2),r=t[0],s=t[1],f=(0,n.useRef)(null),b=S((0,n.useState)([]),2),_=b[0],j=b[1],x=S((0,n.useState)([]),2),O=x[0],k=x[1],I=S((0,n.useState)("gpt-4"),2),R=I[0],T=I[1],L=S((0,n.useState)(.72),2),M=L[0],U=L[1],W=S((0,n.useState)(null),2),D=W[0],z=W[1],F=S((0,n.useState)(.73),2),q=F[0],H=F[1],V=S((0,n.useState)(0),2),B=V[0],G=V[1],J=S((0,n.useState)(0),2),N=J[0],$=J[1],K=S((0,n.useState)(""),2),Z=K[0],Q=K[1],X=S((0,n.useState)(!1),2),Y=X[0],ee=X[1],te=S((0,n.useState)("sadness, joy, love, anger, fear, surprise, neutral"),2),re=te[0],ne=te[1],oe=S((0,n.useState)("emotion"),2),ae=oe[0],le=oe[1],ie=S((0,n.useState)(".json"),2),ue=ie[0],se=ie[1],ce=Intl.DateTimeFormat().resolvedOptions().timeZone;(0,n.useEffect)((function(){o.A.all([o.A.get("/frontend-api/model")]).then(o.A.spread((function(e){k(e.data.models_agent)}))).catch((function(e){console.log(e)}))}),[]),(0,n.useEffect)((function(){var e;null===(e=f.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[_]);var me="https:"==window.location.protocol?"wss":"ws",fe=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,n.useEffect)((function(){e.current=new WebSocket(me+"://"+window.location.host+"/ws/"+fe[fe.length-2]+"/"+fe[fe.length-1]+"/"+ce+"/"),(0,A.u)(e,j,s,document)}),[]);var pe=function(){if(""==Z)ee(!0);else{var t={message:Z,tool:ae,choosen_models:R,role:"Human",top_p:M,max_tokens:D,frequency_penalty:N,presence_penalty:B,temperature:q,emotion_list:"string"==typeof re?re:null,topic_list:"string"==typeof re?re:null,style_list:"string"==typeof re?re:null,number_of_word:"number"==typeof re?re:null};e.current.send(JSON.stringify(t)),Q("")}};return n.createElement(y.A,{maxWidth:!1,sx:{minWidth:1200},disableGutters:!0},n.createElement("title",null,"Agent"),n.createElement(h.A,null),n.createElement(y.A,{maxWidth:"xl",sx:{minWidth:1200}},n.createElement(a.A,{m:1},n.createElement(u.Ay,{container:!0,spacing:2},n.createElement(u.Ay,{item:!0,md:3},n.createElement(l.A,null,n.createElement(i.A,{id:"demo-controlled-radio-buttons-group"},"Toolbox"),n.createElement(m.A,{defaultValue:"emotion",name:"radio-buttons-group",onChange:function(e){le(e.target.value),function(e){ne("restyle"==e?"sad, serious":"emotion"==e?"sadness, joy, love, anger, fear, surprise, neutral":"summary"==e?100:"")}(e.target.value)},value:ae},[{label:"Summary",value:"summary"},{label:"Paraphrase",value:"paraphrase"},{label:"Predict Emotion",value:"emotion"},{label:"Predict Sentiment",value:"sentiment"},{label:"Topic Classification",value:"topic"},{label:"Restyle",value:"restyle"}].map((function(e){return e.value,n.createElement(p.A,{key:e.label,value:e.value,control:n.createElement(c.A,null),label:e.label})})))),n.createElement(d.A,null),n.createElement(a.A,{mt:2,mb:2},n.createElement(i.A,{id:"Extral Instructions"},"Extra Instructions"),n.createElement(C,{multiline:!0,maxRows:6,value:re,sx:{p:"2px 4px",display:"flex",minWidth:200},onChange:function(e){return ne(e.target.value)},minRows:4})),n.createElement(d.A,null),n.createElement(E.b,{chat_message:_,choosen_export_format_chatlog:ue,setChoosenExportFormatChatLog:se,number_of_remove_message:1})),n.createElement(u.Ay,{item:!0,md:6},n.createElement(v.s,{inputsize:660,chat_message:_,usermessage:Z,usermessageError:Y,ChatPaper:P,ChatInput:C,setUserMessage:Q,submitChat:pe,messagesEndRef:f,shownthinking:r,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||pe()}})),n.createElement(u.Ay,{item:!0,md:2},n.createElement(g.Oj,{top_p:M,agent_objects:O,choosen_model:R,setChoosenModel:T,setTopp:U,temperature:q,setTemperature:H,max_tokens:D,setMaxToken:z,presencepenalty:B,setPresencePenalty:G,frequencypenalty:N,setFrequencyPenalty:$}))))),n.createElement(w.A,null))}}}]);