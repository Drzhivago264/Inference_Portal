"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[952],{44058:(e,t,r)=>{r.d(t,{b:()=>d});var n=r(96540),o=r(69067),a=r(48139),l=r(30995),i=r(29571),s=r(73896),c=r(4147),u=r(50779),m=r(14073),f=r(24610);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var d=function(e){var t=e.chat_message,r=e.choosen_export_format_chatlog,d=e.setChoosenExportFormatChatLog,y=e.number_of_remove_message;return n.createElement(o.A,{mt:2},n.createElement(m.A,{pb:2},"Chat Log Export:"),n.createElement("form",{onSubmit:function(e){e.preventDefault();var n,o=function(e){if(Array.isArray(e))return p(e)}(n=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),a=document.createElement("a");if(".json"==r){var l=JSON.stringify(o.splice(y),null,4),i=new Blob([l],{type:"application/json"}),s=URL.createObjectURL(i);a.setAttribute("href",s),a.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==r){var c=o.splice(y);for(var u in l="",c)l+=c[u].role+"-"+c[u].time+":\n"+c[u].message+"\n";i=new Blob([l],{type:"text/plain"}),s=URL.createObjectURL(i),a.setAttribute("href",s),a.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}a.click()}},n.createElement(u.A,null,n.createElement(l.A,{direction:"row",spacing:1},n.createElement(i.A,{id:"export-label-chatlog"},"Formats"),n.createElement(c.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return d(e.target.value)},value:r,label:"Export",size:"small"},[".json",".txt"].map((function(e){return n.createElement(s.A,{key:e,value:e},e)}))),n.createElement(a.A,{size:"small",variant:"contained",type:"submit",endIcon:n.createElement(f.A,null)},"Export")))))}},15952:(e,t,r)=>{r.r(t),r.d(t,{default:()=>I});var n=r(96540),o=r(46266),a=r(69067),l=r(8239),i=r(11848),s=r(60538),c=r(97834),u=r(1043),m=r(37312),f=r(92497),p=r(83248),d=r(6276),y=r(44058),h=r(38960),b=r(14073),g=r(21162),v=r(58981),E=r(69279),A=r(36632),S=r(42702),w=r(11641);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,l,i=[],s=!0,c=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;s=!1}else for(;!(s=(n=a.call(r)).done)&&(i.push(n.value),i.length!==t);s=!0);}catch(e){c=!0,o=e}finally{try{if(!s&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?j(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){var n,o,a,l;n=e,o=t,a=r[t],l=function(e,t){if("object"!=_(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=_(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==_(l)?l:l+"")in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var C=(0,i.Ay)(s.A)((function(e){var t=e.theme;return O({minWidth:660,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),P=(0,i.Ay)(u.A)((function(e){return O({width:"100%"},e.theme.typography.body2)}));const I=function(){var e=(0,n.useRef)(null),t=(0,n.useRef)(null),r=x((0,n.useState)(!1),2),i=r[0],u=r[1],_=x((0,n.useState)([]),2),j=_[0],k=_[1],O=x((0,n.useState)([]),2),I=O[0],T=O[1],B=x((0,n.useState)([]),2),L=B[0],M=B[1],D=x((0,n.useState)("Mistral Chat 13B"),2),R=D[0],U=D[1],W=x((0,n.useState)(.72),2),F=W[0],z=W[1],q=x((0,n.useState)(-1),2),G=q[0],H=q[1],J=x((0,n.useState)("chat"),2),N=J[0],Y=J[1],$=x((0,n.useState)(512),2),K=$[0],V=$[1],Z=x((0,n.useState)(!0),2),Q=Z[0],X=Z[1],ee=x((0,n.useState)(.73),2),te=ee[0],re=ee[1],ne=x((0,n.useState)(!1),2),oe=ne[0],ae=ne[1],le=x((0,n.useState)(!1),2),ie=le[0],se=le[1],ce=x((0,n.useState)(2),2),ue=ce[0],me=ce[1],fe=x((0,n.useState)(0),2),pe=fe[0],de=fe[1],ye=x((0,n.useState)(0),2),he=ye[0],be=ye[1],ge=x((0,n.useState)(0),2),ve=ge[0],Ee=ge[1],Ae=x((0,n.useState)(""),2),Se=Ae[0],we=Ae[1],_e=x((0,n.useState)(!1),2),xe=_e[0],je=_e[1],ke=x((0,n.useState)(".json"),2),Oe=ke[0],Ce=ke[1],Pe=x((0,n.useState)("/ws/chat/"),2),Ie=Pe[0],Te=Pe[1],Be=Intl.DateTimeFormat().resolvedOptions().timeZone,Le=x((0,n.useState)(null),2),Me=Le[0],De=Le[1],Re=x((0,n.useState)([]),2),Ue=Re[0],We=Re[1],Fe=x((0,n.useState)(null),2),ze=Fe[0],qe=Fe[1],Ge=function(e,t,r,n){t||(t="id"),r||(r="parent"),n||(n="children");var o=[],a=[],l={};return e.forEach((function(e){l[e[t]]=e,e[n]=[],a.push(e[t].toString())})),e.forEach((function(e){null!=e[r]&&void 0!==l[e[r]]?l[e[r]][n].push(e):o.push(e)})),[o,a]};(0,n.useEffect)((function(){o.A.all([o.A.get("/frontend-api/model"),o.A.get("/frontend-api/memory-tree")]).then(o.A.spread((function(e,t){if(k(e.data.models),M(e.data.models_agent),204!=t.status){var r=Ge(t.data.results);De(r[0]),We(r[1]),t.data.count&&qe(t.data.count)}}))).catch((function(e){console.log(e)}))}),[]),(0,n.useEffect)((function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[I]);var He="https:"==window.location.protocol?"wss":"ws",Je=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,n.useEffect)((function(){e.current=new WebSocket(He+"://"+window.location.host+Ie+Je[Je.length-1]+"/"+Be+"/"),(0,d.u)(e,T,u,document)}),[]),(0,n.useEffect)((function(){e.current.close(),e.current=new WebSocket(He+"://"+window.location.host+Ie+Je[Je.length-1]+"/"+Be+"/"),(0,d.u)(e,T,u,document)}),[Ie]);var Ne=function(){if(""==Se)je(!0);else{var t={mode:N,message:Se,choosen_models:R,role:"Human",top_k:G,top_p:F,best_of:ue,max_tokens:K,frequency_penalty:he,presence_penalty:pe,temperature:te,beam:oe,early_stopping:ie,length_penalty:ve,include_memory:Q};e.current.send(JSON.stringify(t)),we("")}},Ye=function e(t){var r=t.data;return n.createElement(g.G,{defaultExpandedItems:Ue,"aria-label":"file system navigator",sx:{maxHeight:700,flexGrow:1,maxWidth:600,overflowY:"auto"}},r.map((function(t){return n.createElement(v.y,{key:t.id.toString(),itemId:t.id.toString(),label:new Date(t.created_at).toString()},n.createElement(s.A,null,n.createElement(b.A,{sx:{wordBreak:"break-word"},pl:1,pr:1,pt:1,variant:"body2"}," ","Prompt: "+t.prompt," "),n.createElement(b.A,{sx:{wordBreak:"break-word"},pl:1,pr:1,pb:1,variant:"body2"},"Response: "+t.response," ")),t.children&&n.createElement(e,{data:t.children}))})))};return n.createElement(c.A,{maxWidth:!1,sx:{minWidth:1200},disableGutters:!0},n.createElement("title",null,"Chat"),n.createElement(m.A,null),n.createElement(c.A,{maxWidth:"xl",sx:{minWidth:1200}},n.createElement(a.A,{m:2},n.createElement(l.Ay,{container:!0,spacing:2},n.createElement(l.Ay,{item:!0,xs:4},n.createElement(b.A,{mt:1,mb:1,variant:"body1"},"Memory Tree",n.createElement(w.A,{"aria-label":"fingerprint",color:"info",size:"small",onClick:function(){o.A.all([o.A.get("/frontend-api/memory-tree")]).then(o.A.spread((function(e){if(204!=e.status){var t=Ge(e.data.results);De(t[0]),We(t[1]),e.data.count&&qe(e.data.count)}}))).catch((function(e){console.log(e)}))}},n.createElement(S.A,{fontSize:"small"}))),n.createElement(A.A,{severity:"info"},"The memory tree includes all ancestors for a given prompt. ",n.createElement("br",null),"You can travel left or right to periodically move to the next prompt.",n.createElement("br",null),"Click on refresh button to fletch the latest prompt.",n.createElement("br",null)),Me&&n.createElement(Ye,{data:Me}),!Me&&n.createElement(b.A,{variant:"body2"},"There is no memory yet."),ze&&Me&&n.createElement(a.A,{display:"flex",justifyContent:"center",alignItems:"center",m:1}," ",n.createElement(E.A,{count:ze,showFirstButton:!0,showLastButton:!0,onChange:function(e,t){o.A.all([o.A.get("/frontend-api/memory-tree?page=".concat(t))]).then(o.A.spread((function(e){if(204!=e.status){var t=Ge(e.data.results);De(t[0]),We(t[1]),e.data.count&&qe(e.data.count)}}))).catch((function(e){console.log(e)}))}}))),n.createElement(l.Ay,{item:!0,xs:6},n.createElement(p.s,{inputsize:660,chat_message:I,usermessage:Se,usermessageError:xe,ChatPaper:C,ChatInput:P,setUserMessage:we,submitChat:Ne,messagesEndRef:t,shownthinking:i,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||Ne()}})),n.createElement(l.Ay,{item:!0,xs:2},n.createElement(a.A,{mb:3},n.createElement(y.b,{chat_message:I,choosen_export_format_chatlog:Oe,setChoosenExportFormatChatLog:Ce,number_of_remove_message:1})),n.createElement(f.I2,{socket_destination:Ie,setSocketDestination:Te,model_objects:j,agent_objects:L,choosen_model:R,top_k:G,top_p:F,max_tokens:K,temperature:te,mode:N,bestof:ue,lengthpenalty:ve,presencepenalty:pe,frequencypenalty:he,setBeam:ae,setMaxToken:V,setBestof:me,setChoosenModel:U,setTemperature:re,setMode:Y,setLengthPenalty:Ee,setPresencePenalty:de,setFrequencyPenalty:be,setTopk:H,setTopp:z,setUseMemory:X,earlystopping:ie,setEarlyStopping:se}))))),n.createElement(h.A,null))}}}]);