"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[934],{24610:(e,t,n)=>{var r=n(24994);t.A=void 0;var a=r(n(42032)),l=n(74848);t.A=(0,a.default)((0,l.jsx)("path",{d:"M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"}),"GetApp")},87696:(e,t,n)=>{n.d(t,{a:()=>y,s:()=>d});var r=n(96540),a=n(69067),l=n(48139),o=n(60538),i=n(30995),s=n(25239),c=n(8239),m=n(87458),u=n(40443),p=n(11641),f=n(70177),d=function(e){var t=e.inputsize,n=e.ChatPaper,d=e.ChatInput,y=e.chat_message,g=e.shownthinking,E=e.usermessage,A=e.setUserMessage,h=e.usermessageError,b=e.submitChat,v=e.messagesEndRef,x=e.handleEnter,w=function(e){navigator.clipboard.writeText(e)};return r.createElement(a.A,null,r.createElement(n,{id:"chat-log",variant:"outlined"},r.createElement(i.A,{spacing:1},y.map((function(e){return"Human"==e.role?r.createElement(o.A,{key:e.time},r.createElement(a.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container"},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{align:"left"},r.createElement(p.A,{onClick:function(){return w("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"}))),r.createElement(a.A,{pt:.8},r.createElement(a.A,{textAlign:"right"},e.role," (",e.time,")"),r.createElement(a.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap",width:"100%"}},e.message))))):e.holder?r.createElement(o.A,{key:e.holderid},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.role," - ",e.time,": ",r.createElement("br",null),r.createElement("br",null),e.message)),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return w("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):"Server"==e.role?r.createElement(o.A,{key:e.message+e.time},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return w("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):void 0})),r.createElement("div",{ref:v}," "))),g&&r.createElement(m.A,null),r.createElement(a.A,{mt:2},r.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:t}}},r.createElement(d,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:E,error:h,onChange:function(e){return A(e.target.value)},onKeyPress:function(e){return x(e)},minRows:4,variant:"standard",InputProps:{endAdornment:r.createElement(s.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},r.createElement(l.A,{sx:{height:32},variant:"contained",size:"small",onClick:b,endIcon:r.createElement(u.A,null)},"Send")),startAdornment:r.createElement(s.A,{position:"start"},"   ")}}))))},y=function(e){var t=e.id,n=e.inputsize,d=e.ChatPaper,y=e.ChatInput,g=e.chat_message,E=e.shownthinking,A=e.usermessage,h=e.setUserMessage,b=e.usermessageError,v=e.submitChat,x=e.messagesEndRef,w=e.handleEnter,_=e.check_duplicate_message,S=function(e){navigator.clipboard.writeText(e)};return r.createElement(a.A,null,r.createElement(d,{id:t,variant:"outlined"},r.createElement(i.A,{spacing:1},g.map((function(e){return"Human"==e.role?r.createElement(o.A,{key:e.time+e.message},r.createElement(a.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-wrap"}},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{align:"left"},r.createElement(p.A,{onClick:function(){return S("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"}))),r.createElement(a.A,{pt:.8},r.createElement(a.A,{textAlign:"right"},e.role," (",e.time,")"),r.createElement(a.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap"}},e.message))))):e.holder?r.createElement(o.A,{key:e.holderid},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.role," - ",e.time,": ",r.createElement("br",null),r.createElement("br",null),e.message)),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return S("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):"Server"==e.role?r.createElement(o.A,{key:e.message},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return S("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):void 0})),r.createElement("div",{ref:x}," "))),E&&r.createElement(m.A,null),r.createElement(a.A,{mt:2},r.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:n}}},r.createElement(y,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:A,error:b,onChange:function(e){h(e.target.value),_(e.target.value)},onKeyPress:function(e){return w(e)},minRows:4,variant:"standard",InputProps:{endAdornment:r.createElement(s.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},r.createElement(l.A,{sx:{height:32},variant:"contained",size:"small",onClick:v,endIcon:r.createElement(u.A,null)},"Send")),startAdornment:r.createElement(s.A,{position:"start"},"   ")}}))))}},85481:(e,t,n)=>{n.d(t,{O:()=>C});var r,a,l=n(96540),o=n(50779),i=n(69307),s=n(29571),c=n(73896),m=n(4147),u=n(14073),p=n(30995),f=n(98475),d=n(71543),y=n(77623),g=n(69067),E=n(11848),A=n(47839),h=n(52162),b=n(11641),v=n(32389);function x(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var w=(0,E.Ay)(y.A)(r||(r=x(["\n  max-width: 50px;\n  \n"]))),_=(0,E.Ay)(y.A)(a||(a=x(["\n  max-width: 60px;\n"]))),S=function(e,t,n,r){e&&(e<n?t(n):e>r&&t(r))},C=function(e){var t=e.choosen_model,n=e.setChoosenModel,r=e.frequencypenalty,a=e.setFrequencyPenalty,y=e.presencepenalty,E=e.setPresencePenalty,x=e.agent_objects,C=e.top_p,k=e.setTopp,j=e.temperature,z=e.setTemperature,P=e.max_tokens,O=e.setMaxToken,I=e.max_turn,R=e.setMaxTurn,B=(0,v.Bd)(),T=B.t;return B.i18n,l.createElement(p.A,{direction:"column",spacing:1},l.createElement(o.A,null,l.createElement(s.A,{id:"model-label"},"Models"),l.createElement(m.A,{labelId:"model-label",id:"model-select",onChange:function(e){return n(e.target.value)},value:t,label:"Models",size:"small"},x.map((function(e){return l.createElement(c.A,{key:e.name,value:e.name},e.name)})))),l.createElement(d.A,null),l.createElement(i.A,null,"Parameters"),I&&l.createElement(g.A,null,l.createElement(p.A,{direction:"row",spacing:1},l.createElement(u.A,{style:{flex:1},gutterBottom:!0},"Max_turns",l.createElement(A.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},T("parameter_explain.max_turn")),arrow:!0,placement:"top"},l.createElement(b.A,{size:"small"},l.createElement(h.A,{fontSize:"small"})))),l.createElement(w,{value:I,size:"small",onChange:function(e){return R(""===e.target.value?0:Number(e.target.value))},onBlur:S(I,R,1,10),inputProps:{step:1,min:0,max:10,type:"number","aria-labelledby":"input-slider"}})),l.createElement(f.Ay,{step:1,min:1,max:10,marks:!0,valueLabelDisplay:"off",onChange:function(e){return R(e.target.value)},value:I})),l.createElement(p.A,{direction:"row",spacing:1},l.createElement(u.A,{style:{flex:1},gutterBottom:!0},"Top_p",l.createElement(A.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},T("parameter_explain.top_p")),arrow:!0,placement:"top"},l.createElement(b.A,{size:"small"},l.createElement(h.A,{fontSize:"small"})))),l.createElement(w,{value:C,size:"small",onChange:function(e){return k(""===e.target.value?0:Number(e.target.value))},onBlur:S(C,k,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),l.createElement(f.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return k(e.target.value)},value:C}),x.map((function(e){if(e.name==t)return l.createElement(g.A,{key:e.name},l.createElement(p.A,{direction:"row",spacing:1},l.createElement(u.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",l.createElement(A.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},T("parameter_explain.max_token")),arrow:!0,placement:"top"},l.createElement(b.A,{size:"small"},l.createElement(h.A,{fontSize:"small"})))),l.createElement(_,{value:P||e.context_length,size:"small",onChange:function(e){return O(""===e.target.value?0:Number(e.target.value))},onBlur:S(P,O,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),l.createElement(f.Ay,{step:1,min:1,max:e.context_length,onChange:function(e){return O(e.target.value)},value:P,valueLabelDisplay:"off"}))})),l.createElement(p.A,{direction:"row",spacing:1},l.createElement(u.A,{style:{flex:1},gutterBottom:!0},"Temperature",l.createElement(A.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},T("parameter_explain.temperature")),arrow:!0,placement:"top"},l.createElement(b.A,{size:"small"},l.createElement(h.A,{fontSize:"small"})))),l.createElement(w,{value:j,size:"small",onChange:function(e){return z(""===e.target.value?0:Number(e.target.value))},onBlur:S(j,z,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),l.createElement(f.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return z(e.target.value)},value:j,valueLabelDisplay:"off"}),l.createElement(p.A,{direction:"row",spacing:1},l.createElement(u.A,{style:{flex:1},gutterBottom:!0},"Presence penalty",l.createElement(A.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},T("parameter_explain.presence_penalty")),arrow:!0,placement:"top"},l.createElement(b.A,{size:"small"},l.createElement(h.A,{fontSize:"small"})))),l.createElement(w,{value:y,size:"small",onChange:function(e){return E(""===e.target.value?0:Number(e.target.value))},onBlur:S(y,E,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),l.createElement(f.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return E(e.target.value)},value:y,valueLabelDisplay:"off"}),l.createElement(p.A,{direction:"row",spacing:1},l.createElement(u.A,{style:{flex:1},gutterBottom:!0},"Frequency penalty",l.createElement(A.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},T("parameter_explain.frequency_penalty")),arrow:!0,placement:"top"},l.createElement(b.A,{size:"small"},l.createElement(h.A,{fontSize:"small"})))),l.createElement(w,{value:r,size:"small",onChange:function(e){return a(""===e.target.value?0:Number(e.target.value))},onBlur:S(r,a,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),l.createElement(f.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return a(e.target.value)},value:r,valueLabelDisplay:"off"}))}},17718:(e,t,n)=>{n.d(t,{b:()=>f});var r=n(96540),a=n(69067),l=n(48139),o=n(30995),i=n(29571),s=n(73896),c=n(4147),m=n(50779),u=n(24610);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f=function(e){var t=e.chat_message,n=e.choosen_export_format_chatlog,f=e.setChoosenExportFormatChatLog,d=e.number_of_remove_message;return r.createElement(a.A,{mt:2},r.createElement(m.A,{fullWidth:!0},r.createElement(o.A,{direction:"row",spacing:1},r.createElement(i.A,{id:"export-label-chatlog"},"Formats"),r.createElement(c.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return f(e.target.value)},value:n,label:"Export",size:"small",fullWidth:!0},[".json",".txt"].map((function(e){return r.createElement(s.A,{key:e,value:e},e)}))),r.createElement(l.A,{fullWidth:!0,size:"small",variant:"contained",onClick:function(e){e.preventDefault();var r,a=function(e){if(Array.isArray(e))return p(e)}(r=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),l=document.createElement("a");if(".json"==n){var o=JSON.stringify(a.splice(d),null,4),i=new Blob([o],{type:"application/json"}),s=URL.createObjectURL(i);l.setAttribute("href",s),l.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==n){var c=a.splice(d);for(var m in o="",c)o+=c[m].role+"-"+c[m].time+":\n"+c[m].message+"\n";i=new Blob([o],{type:"text/plain"}),s=URL.createObjectURL(i),l.setAttribute("href",s),l.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}l.click()},endIcon:r.createElement(u.A,null)},"Export"))))}},53116:(e,t,n)=>{function r(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t,n,a){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var l=JSON.parse(e.data);if(l){"Human"==l.role||"Server"==l.role||l.holder?(l.holder&&(n(!0),l.message=""),t((function(e){return[].concat(r(e),[{holder:l.holder,holderid:l.holderid,role:l.role,time:l.time,credit:l.credit,message:l.message}])}))):(n(!1),t((function(e){return[].concat(r(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=l.message}])})));var o=a.getElementById("chat-log");o.scrollTop=o.scrollHeight}}}n.d(t,{u:()=>l})},64934:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var r=n(96540),a=n(46266),l=n(69067),o=n(50779),i=n(8239),s=n(11848),c=n(53215),m=n(29428),u=n(60538),p=n(68864),f=n(97834),d=n(1043),y=n(71543),g=n(22100),E=n(85481),A=n(87696),h=n(53116),b=n(17718),v=n(16626),x=n(14073),w=n(10718),_=n(47767),S=n(14627);function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function k(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,i=[],s=!0,c=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=l.call(n)).done)&&(i.push(r.value),i.length!==t);s=!0);}catch(e){c=!0,a=e}finally{try{if(!s&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(c)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?z(Object(n),!0).forEach((function(t){var r,a,l,o;r=e,a=t,l=n[t],o=function(e,t){if("object"!=C(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=C(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==C(o)?o:o+"")in r?Object.defineProperty(r,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):r[a]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=(0,s.Ay)(u.A)((function(e){var t=e.theme;return P({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),I=(0,s.Ay)(d.A)((function(e){return P({width:"100%"},e.theme.typography.body2)}));const R=function(){(0,r.useRef)();var e=(0,r.useContext)(S.P),t=e.websocket,n=e.agent_websocket,s=e.chat_websocket,d=k((0,r.useState)(!1),2),C=d[0],j=d[1],z=(0,r.useRef)(null),P=k((0,r.useState)([]),2),R=P[0],B=P[1],T=k((0,r.useState)([]),2),M=T[0],L=T[1],N=k((0,r.useState)("gpt-4"),2),D=N[0],W=N[1],U=k((0,r.useState)(.72),2),q=U[0],F=U[1],H=k((0,r.useState)(null),2),V=H[0],J=H[1],K=k((0,r.useState)(.73),2),$=K[0],G=K[1],Z=k((0,r.useState)(0),2),Q=Z[0],X=Z[1],Y=k((0,r.useState)(0),2),ee=Y[0],te=Y[1],ne=k((0,r.useState)(""),2),re=ne[0],ae=ne[1],le=k((0,r.useState)(!1),2),oe=le[0],ie=le[1],se=k((0,r.useState)("sadness, joy, love, anger, fear, surprise, neutral"),2),ce=se[0],me=se[1],ue=k((0,r.useState)("emotion"),2),pe=ue[0],fe=ue[1],de=k((0,r.useState)(".json"),2),ye=de[0],ge=de[1],Ee=Intl.DateTimeFormat().resolvedOptions().timeZone,Ae=(0,_.Zp)(),he=(0,r.useContext)(S.Rs),be=he.is_authenticated;he.setIsAuthenticated,(0,r.useEffect)((function(){(0,w.IO)(Ae,be),a.A.all([a.A.get("/frontend-api/model")]).then(a.A.spread((function(e){L(e.data.models_agent)}))).catch((function(e){console.log(e)}))}),[]),(0,r.useEffect)((function(){var e;null===(e=z.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[R]);var ve="https:"==window.location.protocol?"wss":"ws",xe=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,r.useEffect)((function(){t.current&&t.current.close(),n.current&&n.current.close(),s.current&&s.current.close(),t.current=new WebSocket(ve+"://"+window.location.host+"/ws/"+xe[xe.length-2]+"/"+xe[xe.length-1]+"/"+Ee+"/"),(0,h.u)(t,B,j,document)}),[]);var we=function(){if(""==re)ie(!0);else{var e={message:re,tool:pe,choosen_models:D,role:"Human",top_p:q,max_tokens:V,frequency_penalty:ee,presence_penalty:Q,temperature:$,emotion_list:"string"==typeof ce?ce:null,topic_list:"string"==typeof ce?ce:null,style_list:"string"==typeof ce?ce:null,number_of_word:"number"==typeof ce?ce:null};t.current.send(JSON.stringify(e)),ae("")}};return r.createElement(f.A,{maxWidth:!1,sx:{minWidth:1200},disableGutters:!0},r.createElement("title",null,"Tools"),r.createElement(g.A,{max_width:"xl"}),r.createElement(f.A,{maxWidth:"xl",sx:{minWidth:1200}},r.createElement(l.A,{m:1},r.createElement(i.Ay,{container:!0,spacing:2},r.createElement(i.Ay,{item:!0,xs:4},r.createElement(u.A,{sx:{ml:2,mr:2},variant:"outlined"},r.createElement(l.A,{m:1},r.createElement(x.A,{sx:{color:"text.secondary"}},"Toolbox")),r.createElement(y.A,null),r.createElement(l.A,{m:2},r.createElement(o.A,null,r.createElement(m.A,{defaultValue:"emotion",name:"radio-buttons-group",onChange:function(e){fe(e.target.value),function(e){me("restyle"==e?"sad, serious":"emotion"==e?"sadness, joy, love, anger, fear, surprise, neutral":"summary"==e?100:"")}(e.target.value)},value:pe},[{label:"Summary",value:"summary"},{label:"Paraphrase",value:"paraphrase"},{label:"Predict Emotion",value:"emotion"},{label:"Predict Sentiment",value:"sentiment"},{label:"Topic Classification",value:"topic"},{label:"Restyle",value:"restyle"}].map((function(e){return e.value,r.createElement(p.A,{key:e.label,value:e.value,control:r.createElement(c.A,null),label:e.label})})))))),r.createElement(u.A,{sx:{m:2},variant:"outlined"},r.createElement(l.A,{m:1},r.createElement(x.A,{sx:{color:"text.secondary"}},"Extra Instruction")),r.createElement(y.A,null),r.createElement(l.A,{m:2},r.createElement(I,{multiline:!0,maxRows:6,value:ce,sx:{p:"2px 4px",display:"flex",minWidth:200},onChange:function(e){return me(e.target.value)},minRows:4}))),r.createElement(u.A,{sx:{m:2},variant:"outlined"},r.createElement(l.A,{m:1},r.createElement(x.A,{sx:{color:"text.secondary"}},"Chat Log Export")),r.createElement(y.A,null),r.createElement(l.A,{mb:2,mt:2,ml:1,mr:2},r.createElement(b.b,{chat_message:R,choosen_export_format_chatlog:ye,setChoosenExportFormatChatLog:ge,number_of_remove_message:2,setChatMessage:B})))),r.createElement(y.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),r.createElement(i.Ay,{item:!0,xs:6},r.createElement(l.A,{mr:2},r.createElement(A.s,{inputsize:660,chat_message:R,usermessage:re,usermessageError:oe,ChatPaper:O,ChatInput:I,setUserMessage:ae,submitChat:we,messagesEndRef:z,shownthinking:C,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||(e.preventDefault(),we())}}))),r.createElement(y.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),r.createElement(i.Ay,{item:!0,xs:2},r.createElement(E.O,{top_p:q,agent_objects:M,choosen_model:D,setChoosenModel:W,setTopp:F,temperature:$,setTemperature:G,max_tokens:V,setMaxToken:J,presencepenalty:Q,setPresencePenalty:X,frequencypenalty:ee,setFrequencyPenalty:te}))))),r.createElement(v.A,null))}}}]);