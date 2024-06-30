"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[803],{87696:(e,t,n)=>{n.d(t,{a:()=>y,s:()=>d});var r=n(96540),a=n(69067),o=n(48139),l=n(60538),i=n(30995),s=n(25239),c=n(8239),m=n(87458),u=n(40443),p=n(11641),f=n(70177),d=function(e){var t=e.inputsize,n=e.ChatPaper,d=e.ChatInput,y=e.chat_message,h=e.shownthinking,g=e.usermessage,b=e.setUserMessage,E=e.usermessageError,A=e.submitChat,v=e.messagesEndRef,w=e.handleEnter,x=function(e){navigator.clipboard.writeText(e)};return r.createElement(a.A,null,r.createElement(n,{id:"chat-log",variant:"outlined"},r.createElement(i.A,{spacing:1},y.map((function(e){return"Human"==e.role?r.createElement(l.A,{key:e.time},r.createElement(a.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container"},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{align:"left"},r.createElement(p.A,{onClick:function(){return x("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"}))),r.createElement(a.A,{pt:.8},r.createElement(a.A,{textAlign:"right"},e.role," (",e.time,")"),r.createElement(a.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap",width:"100%"}},e.message))))):e.holder?r.createElement(l.A,{key:e.holderid},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.role," - ",e.time,": ",r.createElement("br",null),r.createElement("br",null),e.message)),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return x("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):"Server"==e.role?r.createElement(l.A,{key:e.message+e.time},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return x("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):void 0})),r.createElement("div",{ref:v}," "))),h&&r.createElement(m.A,null),r.createElement(a.A,{mt:2},r.createElement(l.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:t}}},r.createElement(d,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:g,error:E,onChange:function(e){return b(e.target.value)},onKeyPress:function(e){return w(e)},minRows:4,variant:"standard",InputProps:{endAdornment:r.createElement(s.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},r.createElement(o.A,{sx:{height:32},variant:"contained",size:"small",onClick:A,endIcon:r.createElement(u.A,null)},"Send")),startAdornment:r.createElement(s.A,{position:"start"},"   ")}}))))},y=function(e){var t=e.id,n=e.inputsize,d=e.ChatPaper,y=e.ChatInput,h=e.chat_message,g=e.shownthinking,b=e.usermessage,E=e.setUserMessage,A=e.usermessageError,v=e.submitChat,w=e.messagesEndRef,x=e.handleEnter,S=e.check_duplicate_message,_=function(e){navigator.clipboard.writeText(e)};return r.createElement(a.A,null,r.createElement(d,{id:t,variant:"outlined"},r.createElement(i.A,{spacing:1},h.map((function(e){return"Human"==e.role?r.createElement(l.A,{key:e.time+e.message},r.createElement(a.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-wrap"}},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{align:"left"},r.createElement(p.A,{onClick:function(){return _("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"}))),r.createElement(a.A,{pt:.8},r.createElement(a.A,{textAlign:"right"},e.role," (",e.time,")"),r.createElement(a.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap"}},e.message))))):e.holder?r.createElement(l.A,{key:e.holderid},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.role," - ",e.time,": ",r.createElement("br",null),r.createElement("br",null),e.message)),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return _("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):"Server"==e.role?r.createElement(l.A,{key:e.message},r.createElement(a.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},r.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},r.createElement(a.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},r.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),r.createElement(a.A,{align:"right"},r.createElement(p.A,{onClick:function(){return _("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},r.createElement(f.A,{fontSize:"small"})))))):void 0})),r.createElement("div",{ref:w}," "))),g&&r.createElement(m.A,null),r.createElement(a.A,{mt:2},r.createElement(l.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:n}}},r.createElement(y,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:b,error:A,onChange:function(e){E(e.target.value),S(e.target.value)},onKeyPress:function(e){return x(e)},minRows:4,variant:"standard",InputProps:{endAdornment:r.createElement(s.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},r.createElement(o.A,{sx:{height:32},variant:"contained",size:"small",onClick:v,endIcon:r.createElement(u.A,null)},"Send")),startAdornment:r.createElement(s.A,{position:"start"},"   ")}}))))}},17718:(e,t,n)=>{n.d(t,{b:()=>f});var r=n(96540),a=n(69067),o=n(48139),l=n(30995),i=n(29571),s=n(73896),c=n(4147),m=n(50779),u=n(24610);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f=function(e){var t=e.chat_message,n=e.choosen_export_format_chatlog,f=e.setChoosenExportFormatChatLog,d=e.number_of_remove_message;return r.createElement(a.A,{mt:2},r.createElement(m.A,{fullWidth:!0},r.createElement(l.A,{direction:"row",spacing:1},r.createElement(i.A,{id:"export-label-chatlog"},"Formats"),r.createElement(c.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return f(e.target.value)},value:n,label:"Export",size:"small",fullWidth:!0},[".json",".txt"].map((function(e){return r.createElement(s.A,{key:e,value:e},e)}))),r.createElement(o.A,{fullWidth:!0,size:"small",variant:"contained",onClick:function(e){e.preventDefault();var r,a=function(e){if(Array.isArray(e))return p(e)}(r=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),o=document.createElement("a");if(".json"==n){var l=JSON.stringify(a.splice(d),null,4),i=new Blob([l],{type:"application/json"}),s=URL.createObjectURL(i);o.setAttribute("href",s),o.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==n){var c=a.splice(d);for(var m in l="",c)l+=c[m].role+"-"+c[m].time+":\n"+c[m].message+"\n";i=new Blob([l],{type:"text/plain"}),s=URL.createObjectURL(i),o.setAttribute("href",s),o.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}o.click()},endIcon:r.createElement(u.A,null)},"Export"))))}},53116:(e,t,n)=>{function r(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t,n,a){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var o=JSON.parse(e.data);if(o){"Human"==o.role||"Server"==o.role||o.holder?(o.holder&&(n(!0),o.message=""),t((function(e){return[].concat(r(e),[{holder:o.holder,holderid:o.holderid,role:o.role,time:o.time,credit:o.credit,message:o.message}])}))):(n(!1),t((function(e){return[].concat(r(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=o.message}])})));var l=a.getElementById("chat-log");l.scrollTop=l.scrollHeight}}}n.d(t,{u:()=>o})},17803:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var r=n(96540),a=n(46266),o=n(69067),l=n(30995),i=n(36632),s=n(54937),c=n(8239),m=n(11848),u=n(60538),p=n(97834),f=n(1043),d=n(22100),y=n(29706),h=n(87696),g=n(53116),b=n(17718),E=n(16626),A=n(14073),v=n(71543),w=n(21162),x=n(58981),S=n(69279),_=n(42702),k=n(11641);function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,l,i=[],s=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);s=!0);}catch(e){c=!0,a=e}finally{try{if(!s&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(c)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var O=function(){var e=C((0,r.useState)(null),2),t=e[0],n=e[1],l=C((0,r.useState)([]),2),s=l[0],c=l[1],m=C((0,r.useState)(null),2),p=m[0],f=m[1];(0,r.useEffect)((function(){a.A.all([a.A.get("/frontend-api/memory-tree")]).then(a.A.spread((function(e){if(204!=e.status){var t=d(e.data.results);n(t[0]),c(t[1]),e.data.count&&f(e.data.count)}}))).catch((function(e){console.log(e)}))}),[]);var d=function(e,t,n,r){t||(t="id"),n||(n="parent"),r||(r="children");var a=[],o=[],l={};return e.forEach((function(e){l[e[t]]=e,e[r]=[],o.push(e[t].toString())})),e.forEach((function(e){null!=e[n]&&void 0!==l[e[n]]?l[e[n]][r].push(e):a.push(e)})),[a,o]},y=function e(t){var n=t.data;return r.createElement(w.G,{defaultExpandedItems:s,"aria-label":"file system navigator",sx:{maxHeight:485,flexGrow:1,maxWidth:600,overflowY:"auto"}},n.map((function(t){return r.createElement(x.y,{key:t.id.toString(),itemId:t.id.toString(),label:new Date(t.created_at).toString()},r.createElement(u.A,null,r.createElement(A.A,{sx:{wordBreak:"break-word"},pl:1,pr:1,pt:1,variant:"body2"}," ","Prompt: "+t.prompt," "),r.createElement(A.A,{sx:{wordBreak:"break-word"},pl:1,pr:1,pb:1,variant:"body2"},"Response: "+t.response," ")),t.children&&r.createElement(e,{data:t.children}))})))};return r.createElement(u.A,{variant:"outlined"},r.createElement(o.A,{m:1},r.createElement(A.A,{sx:{color:"text.secondary"}},"Memory Tree",r.createElement(k.A,{"aria-label":"fingerprint",color:"info",size:"small",onClick:function(){a.A.all([a.A.get("/frontend-api/memory-tree")]).then(a.A.spread((function(e){if(204!=e.status){var t=d(e.data.results);n(t[0]),c(t[1]),e.data.count&&f(e.data.count)}}))).catch((function(e){console.log(e)}))}},r.createElement(_.A,{fontSize:"small"})))),r.createElement(v.A,null),r.createElement(i.A,{severity:"info"},"The memory tree includes all ancestors for a given prompt. ",r.createElement("br",null),"You can travel left or right to periodically move to the next prompt.",r.createElement("br",null),"Click on refresh button to fletch the latest prompt.",r.createElement("br",null)),t&&r.createElement(y,{data:t}),!t&&r.createElement(A.A,{variant:"body2"},"There is no memory yet."),p&&t&&r.createElement(o.A,{display:"flex",justifyContent:"center",alignItems:"center",m:1}," ",r.createElement(S.A,{count:p,showFirstButton:!0,showLastButton:!0,onChange:function(e,t){a.A.all([a.A.get("/frontend-api/memory-tree?page=".concat(t))]).then(a.A.spread((function(e){if(204!=e.status){var t=d(e.data.results);n(t[0]),c(t[1]),e.data.count&&f(e.data.count)}}))).catch((function(e){console.log(e)}))}})))},I=n(10718),P=n(47767),z=n(14627);function R(e){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(e)}function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,l,i=[],s=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);s=!0);}catch(e){c=!0,a=e}finally{try{if(!s&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(c)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){var r,a,o,l;r=e,a=t,o=n[t],l=function(e,t){if("object"!=R(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=R(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==R(l)?l:l+"")in r?Object.defineProperty(r,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var L=(0,m.Ay)(u.A)((function(e){var t=e.theme;return W({minWidth:550,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),U=(0,m.Ay)(f.A)((function(e){return W({width:"100%"},e.theme.typography.body2)}));const D=function(){var e=(0,r.useContext)(z.P).websocket,t=(0,r.useRef)(null),n=T((0,r.useState)(!1),2),m=n[0],f=n[1],w=T((0,r.useState)([]),2),x=w[0],S=w[1],_=T((0,r.useState)([]),2),k=_[0],C=_[1],j=T((0,r.useState)([]),2),R=j[0],B=j[1],M=T((0,r.useState)("Llama 3 Instruct AWQ"),2),W=M[0],D=M[1],N=T((0,r.useState)(.72),2),F=N[0],H=N[1],$=T((0,r.useState)(-1),2),q=$[0],G=$[1],J=T((0,r.useState)("chat"),2),K=J[0],Y=J[1],Z=T((0,r.useState)(null),2),Q=Z[0],V=Z[1],X=T((0,r.useState)(!1),2),ee=X[0],te=X[1],ne=T((0,r.useState)(!0),2),re=ne[0],ae=ne[1],oe=T((0,r.useState)(.73),2),le=oe[0],ie=oe[1],se=T((0,r.useState)(!1),2),ce=se[0],me=se[1],ue=T((0,r.useState)(!1),2),pe=ue[0],fe=ue[1],de=T((0,r.useState)(2),2),ye=de[0],he=de[1],ge=T((0,r.useState)(0),2),be=ge[0],Ee=ge[1],Ae=T((0,r.useState)(0),2),ve=Ae[0],we=Ae[1],xe=T((0,r.useState)(0),2),Se=xe[0],_e=xe[1],ke=T((0,r.useState)(""),2),Ce=ke[0],je=ke[1],Oe=T((0,r.useState)(!1),2),Ie=Oe[0],Pe=Oe[1],ze=T((0,r.useState)(".json"),2),Re=ze[0],Te=ze[1],Be=T((0,r.useState)("/ws/chat-async/"),2),Me=Be[0],We=Be[1],Le=Intl.DateTimeFormat().resolvedOptions().timeZone,Ue=(0,P.Zp)(),De=(0,r.useContext)(z.Rs),Ne=De.is_authenticated;De.setIsAuthenticated,(0,r.useEffect)((function(){(0,I.IO)(Ue,Ne),a.A.all([a.A.get("/frontend-api/model")]).then(a.A.spread((function(e,t){S(e.data.models_bot),B(e.data.models_agent)}))).catch((function(e){console.log(e)}))}),[]),(0,r.useEffect)((function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[k]);var Fe="https:"==window.location.protocol?"wss":"ws",He=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,r.useEffect)((function(){e.current&&e.current.close(),e.current=new WebSocket(Fe+"://"+window.location.host+Me+He[He.length-1]+"/"+Le+"/"),(0,g.u)(e,C,f,document)}),[Me]);var $e=function(){if(""==Ce)Pe(!0);else{var t={mode:K,message:Ce,choosen_models:W,role:"Human",top_k:q,top_p:F,best_of:ye,max_tokens:Q,frequency_penalty:ve,presence_penalty:be,temperature:le,beam:ce,early_stopping:pe,length_penalty:Se,include_memory:ee,include_current_memory:re};e.current.send(JSON.stringify(t)),je("")}},qe=(0,r.useMemo)((function(){return r.createElement(O,null)}),[]);return r.createElement(p.A,{maxWidth:!1,sx:{minWidth:1350},disableGutters:!0},r.createElement("title",null,"Chat"),r.createElement(d.A,{max_width:!1}),r.createElement(p.A,{maxWidth:"xl",sx:{minWidth:1350}},r.createElement(o.A,{m:2},r.createElement(c.Ay,{container:!0,spacing:2},r.createElement(c.Ay,{item:!0,xs:4},qe,r.createElement(l.A,{direction:"row"},r.createElement(u.A,{sx:{mt:2},variant:"outlined"},r.createElement(o.A,{m:1},r.createElement(A.A,{sx:{color:"text.secondary"}},"Chat Log Export")),r.createElement(v.A,null),r.createElement(o.A,{mb:2,mt:2,ml:1,mr:2},r.createElement(b.b,{chat_message:k,choosen_export_format_chatlog:Re,setChoosenExportFormatChatLog:Te,number_of_remove_message:2,setChatMessage:C}))),r.createElement(i.A,{severity:"info",sx:{whiteSpace:"pre-line"}},r.createElement(s.A,null,"Note: "),"Celery Backend is deprecated, Async Backend supports newest features."))),r.createElement(c.Ay,{item:!0,xs:5.5},r.createElement(h.s,{inputsize:550,chat_message:k,usermessage:Ce,usermessageError:Ie,ChatPaper:L,ChatInput:U,setUserMessage:je,submitChat:$e,messagesEndRef:t,shownthinking:m,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||(e.preventDefault(),$e())}})),r.createElement(c.Ay,{item:!0,xs:2.5},r.createElement(y.I2,{socket_destination:Me,setSocketDestination:We,model_objects:x,agent_objects:R,choosen_model:W,top_k:q,top_p:F,max_tokens:Q,temperature:le,mode:K,bestof:ye,lengthpenalty:Se,presencepenalty:be,frequencypenalty:ve,setBeam:me,setMaxToken:V,setBestof:he,setChoosenModel:D,setTemperature:ie,setMode:Y,setLengthPenalty:_e,setPresencePenalty:Ee,setFrequencyPenalty:we,setTopk:G,setTopp:H,setUseMemory:te,setUseMemoryCurrent:ae,usememory:ee,usememorycurrent:re,earlystopping:pe,setEarlyStopping:fe}))))),r.createElement(E.A,null))}}}]);