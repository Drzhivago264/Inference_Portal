"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[952],{44058:(e,t,n)=>{n.d(t,{b:()=>d});var r=n(96540),o=n(69067),a=n(48139),l=n(30995),i=n(29571),s=n(73896),c=n(4147),u=n(50779),m=n(14073),f=n(24610);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d=function(e){var t=e.chat_message,n=e.choosen_export_format_chatlog,d=e.setChoosenExportFormatChatLog,y=e.number_of_remove_message;return r.createElement(o.A,{mt:2},r.createElement(m.A,{pb:2},"Chat Log Export:"),r.createElement("form",{onSubmit:function(e){e.preventDefault();var r,o=function(e){if(Array.isArray(e))return p(e)}(r=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),a=document.createElement("a");if(".json"==n){var l=JSON.stringify(o.splice(y),null,4),i=new Blob([l],{type:"application/json"}),s=URL.createObjectURL(i);a.setAttribute("href",s),a.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==n){var c=o.splice(y);for(var u in l="",c)l+=c[u].role+"-"+c[u].time+":\n"+c[u].message+"\n";i=new Blob([l],{type:"text/plain"}),s=URL.createObjectURL(i),a.setAttribute("href",s),a.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}a.click()}},r.createElement(u.A,null,r.createElement(l.A,{direction:"row",spacing:1},r.createElement(i.A,{id:"export-label-chatlog"},"Formats"),r.createElement(c.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return d(e.target.value)},value:n,label:"Export",size:"small"},[".json",".txt"].map((function(e){return r.createElement(s.A,{key:e,value:e},e)}))),r.createElement(a.A,{size:"small",variant:"contained",type:"submit",endIcon:r.createElement(f.A,null)},"Export")))))}},15952:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I});var r=n(96540),o=n(46266),a=n(69067),l=n(8239),i=n(11848),s=n(60538),c=n(97834),u=n(1043),m=n(37312),f=n(92497),p=n(83248),d=n(6276),y=n(44058),h=n(38960),b=n(14073),g=n(21162),v=n(58981),E=n(69279),A=n(36632),S=n(42702),w=n(11641);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,l,i=[],s=!0,c=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);s=!0);}catch(e){c=!0,o=e}finally{try{if(!s&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(c)throw o}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){var r,o,a,l;r=e,o=t,a=n[t],l=function(e,t){if("object"!=_(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o),(o="symbol"==_(l)?l:l+"")in r?Object.defineProperty(r,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[o]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var C=(0,i.Ay)(s.A)((function(e){var t=e.theme;return O({minWidth:550,minHeight:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),P=(0,i.Ay)(u.A)((function(e){return O({width:"100%"},e.theme.typography.body2)}));const I=function(){var e=(0,r.useRef)(null),t=(0,r.useRef)(null),n=x((0,r.useState)(!1),2),i=n[0],u=n[1],_=x((0,r.useState)([]),2),j=_[0],k=_[1],O=x((0,r.useState)([]),2),I=O[0],T=O[1],B=x((0,r.useState)([]),2),L=B[0],M=B[1],D=x((0,r.useState)("Mistral Chat 13B"),2),R=D[0],U=D[1],W=x((0,r.useState)(.72),2),F=W[0],z=W[1],q=x((0,r.useState)(-1),2),G=q[0],H=q[1],J=x((0,r.useState)("chat"),2),N=J[0],Y=J[1],$=x((0,r.useState)(null),2),K=$[0],V=$[1],Z=x((0,r.useState)(!0),2),Q=Z[0],X=Z[1],ee=x((0,r.useState)(.73),2),te=ee[0],ne=ee[1],re=x((0,r.useState)(!1),2),oe=re[0],ae=re[1],le=x((0,r.useState)(!1),2),ie=le[0],se=le[1],ce=x((0,r.useState)(2),2),ue=ce[0],me=ce[1],fe=x((0,r.useState)(0),2),pe=fe[0],de=fe[1],ye=x((0,r.useState)(0),2),he=ye[0],be=ye[1],ge=x((0,r.useState)(0),2),ve=ge[0],Ee=ge[1],Ae=x((0,r.useState)(""),2),Se=Ae[0],we=Ae[1],_e=x((0,r.useState)(!1),2),xe=_e[0],je=_e[1],ke=x((0,r.useState)(".json"),2),Oe=ke[0],Ce=ke[1],Pe=x((0,r.useState)("/ws/chat-async/"),2),Ie=Pe[0],Te=Pe[1],Be=Intl.DateTimeFormat().resolvedOptions().timeZone,Le=x((0,r.useState)(null),2),Me=Le[0],De=Le[1],Re=x((0,r.useState)([]),2),Ue=Re[0],We=Re[1],Fe=x((0,r.useState)(null),2),ze=Fe[0],qe=Fe[1],Ge=function(e,t,n,r){t||(t="id"),n||(n="parent"),r||(r="children");var o=[],a=[],l={};return e.forEach((function(e){l[e[t]]=e,e[r]=[],a.push(e[t].toString())})),e.forEach((function(e){null!=e[n]&&void 0!==l[e[n]]?l[e[n]][r].push(e):o.push(e)})),[o,a]};(0,r.useEffect)((function(){o.A.all([o.A.get("/frontend-api/model"),o.A.get("/frontend-api/memory-tree")]).then(o.A.spread((function(e,t){if(k(e.data.models),M(e.data.models_agent),204!=t.status){var n=Ge(t.data.results);De(n[0]),We(n[1]),t.data.count&&qe(t.data.count)}}))).catch((function(e){console.log(e)}))}),[]),(0,r.useEffect)((function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[I]);var He="https:"==window.location.protocol?"wss":"ws",Je=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,r.useEffect)((function(){e.current=new WebSocket(He+"://"+window.location.host+Ie+Je[Je.length-1]+"/"+Be+"/"),(0,d.u)(e,T,u,document)}),[]),(0,r.useEffect)((function(){e.current.close(),e.current=new WebSocket(He+"://"+window.location.host+Ie+Je[Je.length-1]+"/"+Be+"/"),(0,d.u)(e,T,u,document)}),[Ie]);var Ne=function(){if(""==Se)je(!0);else{var t={mode:N,message:Se,choosen_models:R,role:"Human",top_k:G,top_p:F,best_of:ue,max_tokens:K,frequency_penalty:he,presence_penalty:pe,temperature:te,beam:oe,early_stopping:ie,length_penalty:ve,include_memory:Q};e.current.send(JSON.stringify(t)),we("")}},Ye=function e(t){var n=t.data;return r.createElement(g.G,{defaultExpandedItems:Ue,"aria-label":"file system navigator",sx:{maxHeight:700,flexGrow:1,maxWidth:600,overflowY:"auto"}},n.map((function(t){return r.createElement(v.y,{key:t.id.toString(),itemId:t.id.toString(),label:new Date(t.created_at).toString()},r.createElement(s.A,null,r.createElement(b.A,{sx:{wordBreak:"break-word"},pl:1,pr:1,pt:1,variant:"body2"}," ","Prompt: "+t.prompt," "),r.createElement(b.A,{sx:{wordBreak:"break-word"},pl:1,pr:1,pb:1,variant:"body2"},"Response: "+t.response," ")),t.children&&r.createElement(e,{data:t.children}))})))};return r.createElement(c.A,{maxWidth:!1,sx:{minWidth:1200},disableGutters:!0},r.createElement("title",null,"Chat"),r.createElement(m.A,{max_width:!1}),r.createElement(c.A,{maxWidth:"xl",sx:{minWidth:1200}},r.createElement(a.A,{m:2},r.createElement(l.Ay,{container:!0,spacing:2},r.createElement(l.Ay,{item:!0,xs:4},r.createElement(a.A,{mb:3},r.createElement(y.b,{chat_message:I,choosen_export_format_chatlog:Oe,setChoosenExportFormatChatLog:Ce,number_of_remove_message:1})),r.createElement(b.A,{mt:1,mb:1,variant:"body1"},"Memory Tree",r.createElement(w.A,{"aria-label":"fingerprint",color:"info",size:"small",onClick:function(){o.A.all([o.A.get("/frontend-api/memory-tree")]).then(o.A.spread((function(e){if(204!=e.status){var t=Ge(e.data.results);De(t[0]),We(t[1]),e.data.count&&qe(e.data.count)}}))).catch((function(e){console.log(e)}))}},r.createElement(S.A,{fontSize:"small"}))),r.createElement(A.A,{severity:"info"},"The memory tree includes all ancestors for a given prompt. ",r.createElement("br",null),"You can travel left or right to periodically move to the next prompt.",r.createElement("br",null),"Click on refresh button to fletch the latest prompt.",r.createElement("br",null)),Me&&r.createElement(Ye,{data:Me}),!Me&&r.createElement(b.A,{variant:"body2"},"There is no memory yet."),ze&&Me&&r.createElement(a.A,{display:"flex",justifyContent:"center",alignItems:"center",m:1}," ",r.createElement(E.A,{count:ze,showFirstButton:!0,showLastButton:!0,onChange:function(e,t){o.A.all([o.A.get("/frontend-api/memory-tree?page=".concat(t))]).then(o.A.spread((function(e){if(204!=e.status){var t=Ge(e.data.results);De(t[0]),We(t[1]),e.data.count&&qe(e.data.count)}}))).catch((function(e){console.log(e)}))}}))),r.createElement(l.Ay,{item:!0,xs:5.5},r.createElement(p.s,{inputsize:550,chat_message:I,usermessage:Se,usermessageError:xe,ChatPaper:C,ChatInput:P,setUserMessage:we,submitChat:Ne,messagesEndRef:t,shownthinking:i,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||Ne()}})),r.createElement(l.Ay,{item:!0,xs:2.5},r.createElement(f.I2,{socket_destination:Ie,setSocketDestination:Te,model_objects:j,agent_objects:L,choosen_model:R,top_k:G,top_p:F,max_tokens:K,temperature:te,mode:N,bestof:ue,lengthpenalty:ve,presencepenalty:pe,frequencypenalty:he,setBeam:ae,setMaxToken:V,setBestof:me,setChoosenModel:U,setTemperature:ne,setMode:Y,setLengthPenalty:Ee,setPresencePenalty:de,setFrequencyPenalty:be,setTopk:H,setTopp:z,setUseMemory:X,earlystopping:ie,setEarlyStopping:se}))))),r.createElement(h.A,null))}}}]);