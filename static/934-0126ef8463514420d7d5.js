"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[934],{24610:(e,t,r)=>{var n=r(24994);t.A=void 0;var a=n(r(42032)),o=r(74848);t.A=(0,a.default)((0,o.jsx)("path",{d:"M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"}),"GetApp")},44058:(e,t,r)=>{r.d(t,{b:()=>p});var n=r(96540),a=r(69067),o=r(48139),l=r(30995),i=r(29571),s=r(73896),u=r(4147),c=r(50779),m=r(24610);function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var p=function(e){var t=e.chat_message,r=e.choosen_export_format_chatlog,p=e.setChoosenExportFormatChatLog,y=e.number_of_remove_message;return n.createElement(a.A,{mt:2},n.createElement("form",{onSubmit:function(e){e.preventDefault();var n,a=function(e){if(Array.isArray(e))return f(e)}(n=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(e,t):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=document.createElement("a");if(".json"==r){var l=JSON.stringify(a.splice(y),null,4),i=new Blob([l],{type:"application/json"}),s=URL.createObjectURL(i);o.setAttribute("href",s),o.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==r){var u=a.splice(y);for(var c in l="",u)l+=u[c].role+"-"+u[c].time+":\n"+u[c].message+"\n";i=new Blob([l],{type:"text/plain"}),s=URL.createObjectURL(i),o.setAttribute("href",s),o.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}o.click()}},n.createElement(c.A,null,n.createElement(l.A,{direction:"row",spacing:1},n.createElement(i.A,{id:"export-label-chatlog"},"Formats"),n.createElement(u.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return p(e.target.value)},value:r,label:"Export",size:"small"},[".json",".txt"].map((function(e){return n.createElement(s.A,{key:e,value:e},e)}))),n.createElement(o.A,{size:"small",variant:"contained",type:"submit",endIcon:n.createElement(m.A,null)},"Export")))))}},64934:(e,t,r)=>{r.r(t),r.d(t,{default:()=>T});var n=r(96540),a=r(46266),o=r(69067),l=r(50779),i=r(8239),s=r(11848),u=r(53215),c=r(29428),m=r(60538),f=r(68864),p=r(97834),y=r(1043),b=r(71543),d=r(37312),h=r(92497),v=r(83248),g=r(6276),A=r(44058),E=r(38960),x=r(14073),_=r(21005),w=r(47767),S=r(14627);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function O(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o,l,i=[],s=!0,u=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=o.call(r)).done)&&(i.push(n.value),i.length!==t);s=!0);}catch(e){u=!0,a=e}finally{try{if(!s&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(u)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?P(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(Object(r),!0).forEach((function(t){var n,a,o,l;n=e,a=t,o=r[t],l=function(e,t){if("object"!=j(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=j(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==j(l)?l:l+"")in n?Object.defineProperty(n,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var I=(0,s.Ay)(m.A)((function(e){var t=e.theme;return k({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),R=(0,s.Ay)(y.A)((function(e){return k({width:"100%"},e.theme.typography.body2)}));const T=function(){(0,n.useRef)();var e=(0,n.useRef)(null),t=O((0,n.useState)(!1),2),r=t[0],s=t[1],y=(0,n.useRef)(null),j=O((0,n.useState)([]),2),P=j[0],C=j[1],k=O((0,n.useState)([]),2),T=k[0],M=k[1],L=O((0,n.useState)("gpt-4"),2),U=L[0],W=L[1],D=O((0,n.useState)(.72),2),z=D[0],F=D[1],q=O((0,n.useState)(null),2),H=q[0],V=q[1],B=O((0,n.useState)(.73),2),G=B[0],J=B[1],N=O((0,n.useState)(0),2),Z=N[0],$=N[1],K=O((0,n.useState)(0),2),Q=K[0],X=K[1],Y=O((0,n.useState)(""),2),ee=Y[0],te=Y[1],re=O((0,n.useState)(!1),2),ne=re[0],ae=re[1],oe=O((0,n.useState)("sadness, joy, love, anger, fear, surprise, neutral"),2),le=oe[0],ie=oe[1],se=O((0,n.useState)("emotion"),2),ue=se[0],ce=se[1],me=O((0,n.useState)(".json"),2),fe=me[0],pe=me[1],ye=Intl.DateTimeFormat().resolvedOptions().timeZone,be=(0,w.Zp)(),de=(0,n.useContext)(S.Rs),he=de.is_authenticated;de.setIsAuthenticated,(0,n.useEffect)((function(){(0,_.IO)(be,he),a.A.all([a.A.get("/frontend-api/model")]).then(a.A.spread((function(e){M(e.data.models_agent)}))).catch((function(e){console.log(e)}))}),[]),(0,n.useEffect)((function(){var e;null===(e=y.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[P]);var ve="https:"==window.location.protocol?"wss":"ws",ge=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,n.useEffect)((function(){e.current=new WebSocket(ve+"://"+window.location.host+"/ws/"+ge[ge.length-2]+"/"+ge[ge.length-1]+"/"+ye+"/"),(0,g.u)(e,C,s,document)}),[]);var Ae=function(){if(""==ee)ae(!0);else{var t={message:ee,tool:ue,choosen_models:U,role:"Human",top_p:z,max_tokens:H,frequency_penalty:Q,presence_penalty:Z,temperature:G,emotion_list:"string"==typeof le?le:null,topic_list:"string"==typeof le?le:null,style_list:"string"==typeof le?le:null,number_of_word:"number"==typeof le?le:null};e.current.send(JSON.stringify(t)),te("")}};return n.createElement(p.A,{maxWidth:!1,sx:{minWidth:1200},disableGutters:!0},n.createElement("title",null,"Tools"),n.createElement(d.A,{max_width:"xl"}),n.createElement(p.A,{maxWidth:"xl",sx:{minWidth:1200}},n.createElement(o.A,{m:1},n.createElement(i.Ay,{container:!0,spacing:2},n.createElement(i.Ay,{item:!0,xs:4},n.createElement(m.A,{sx:{ml:2,mr:2},variant:"outlined"},n.createElement(o.A,{m:1},n.createElement(x.A,{sx:{color:"text.secondary"}},"Toolbox")),n.createElement(b.A,null),n.createElement(o.A,{m:2},n.createElement(l.A,null,n.createElement(c.A,{defaultValue:"emotion",name:"radio-buttons-group",onChange:function(e){ce(e.target.value),function(e){ie("restyle"==e?"sad, serious":"emotion"==e?"sadness, joy, love, anger, fear, surprise, neutral":"summary"==e?100:"")}(e.target.value)},value:ue},[{label:"Summary",value:"summary"},{label:"Paraphrase",value:"paraphrase"},{label:"Predict Emotion",value:"emotion"},{label:"Predict Sentiment",value:"sentiment"},{label:"Topic Classification",value:"topic"},{label:"Restyle",value:"restyle"}].map((function(e){return e.value,n.createElement(f.A,{key:e.label,value:e.value,control:n.createElement(u.A,null),label:e.label})})))))),n.createElement(m.A,{sx:{m:2},variant:"outlined"},n.createElement(o.A,{m:1},n.createElement(x.A,{sx:{color:"text.secondary"}},"Extra Instruction")),n.createElement(b.A,null),n.createElement(o.A,{m:2},n.createElement(R,{multiline:!0,maxRows:6,value:le,sx:{p:"2px 4px",display:"flex",minWidth:200},onChange:function(e){return ie(e.target.value)},minRows:4}))),n.createElement(m.A,{sx:{m:2},variant:"outlined"},n.createElement(o.A,{m:1},n.createElement(x.A,{sx:{color:"text.secondary"}},"Chat Log Export")),n.createElement(b.A,null),n.createElement(o.A,{m:2},n.createElement(A.b,{chat_message:P,choosen_export_format_chatlog:fe,setChoosenExportFormatChatLog:pe,number_of_remove_message:2,setChatMessage:C})))),n.createElement(b.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),n.createElement(i.Ay,{item:!0,xs:6},n.createElement(o.A,{mr:2},n.createElement(v.s,{inputsize:660,chat_message:P,usermessage:ee,usermessageError:ne,ChatPaper:I,ChatInput:R,setUserMessage:te,submitChat:Ae,messagesEndRef:y,shownthinking:r,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||Ae()}}))),n.createElement(b.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),n.createElement(i.Ay,{item:!0,xs:2},n.createElement(h.Oj,{top_p:z,agent_objects:T,choosen_model:U,setChoosenModel:W,setTopp:F,temperature:G,setTemperature:J,max_tokens:H,setMaxToken:V,presencepenalty:Z,setPresencePenalty:$,frequencypenalty:Q,setFrequencyPenalty:X}))))),n.createElement(E.A,null))}}}]);