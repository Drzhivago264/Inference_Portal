"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[204],{20204:(e,t,n)=>{n.r(t),n.d(t,{default:()=>I});var r=n(96540),a=n(46266),o=n(69067),s=n(8239),i=n(11848),l=n(14073),u=n(60538),c=n(30995),m=n(97834),p=n(25239),f=n(49799),d=n(82241),h=n(1043),y=n(71543),g=n(37211),b=n(44090),S=n(48158),w=n(37312),_=n(83248),v=n(92497),E=n(6276),A=n(38960);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,s,i=[],l=!0,u=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);l=!0);}catch(e){u=!0,a=e}finally{try{if(!l&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(u)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){var r,a,o,s;r=e,a=t,o=n[t],s=function(e,t){if("object"!=k(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==k(s)?s:s+"")in r?Object.defineProperty(r,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var C=(0,i.Ay)(u.A)((function(e){var t=e.theme;return x({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),W=(0,i.Ay)(h.A)((function(e){return x({width:"100%"},e.theme.typography.body2)}));const I=function(){(0,r.useRef)();var e=(0,r.useRef)(null),t=(0,r.useRef)(null),n=(0,r.useRef)(null),i=P((0,r.useState)(!1),2),h=i[0],k=i[1],O=P((0,r.useState)(!1),2),j=O[0],x=O[1],I=P((0,r.useState)("Assignment Agent"),2),M=I[0],R=I[1],T=P((0,r.useState)([]),2),D=T[0],B=T[1],J=P((0,r.useState)([]),2),q=J[0],N=J[1],U=P((0,r.useState)([]),2),z=U[0],F=U[1],H=P((0,r.useState)([]),2),G=H[0],K=H[1],L=P((0,r.useState)("gpt-4"),2),V=L[0],Z=L[1],$=P((0,r.useState)("Mistral Chat 13B"),2),Q=$[0],X=$[1],Y=P((0,r.useState)(.72),2),ee=Y[0],te=Y[1],ne=P((0,r.useState)(-1),2),re=ne[0],ae=ne[1],oe=P((0,r.useState)("chat"),2),se=oe[0],ie=oe[1],le=P((0,r.useState)(null),2),ue=le[0],ce=le[1],me=P((0,r.useState)(!0),2),pe=me[0],fe=me[1],de=P((0,r.useState)(.73),2),he=de[0],ye=de[1],ge=P((0,r.useState)(!1),2),be=ge[0],Se=ge[1],we=P((0,r.useState)(!1),2),_e=we[0],ve=we[1],Ee=P((0,r.useState)(2),2),Ae=Ee[0],ke=Ee[1],Pe=P((0,r.useState)(0),2),Oe=Pe[0],je=Pe[1],xe=P((0,r.useState)(0),2),Ce=xe[0],We=xe[1],Ie=P((0,r.useState)(0),2),Me=Ie[0],Re=Ie[1],Te=P((0,r.useState)(""),2),De=Te[0],Be=Te[1],Je=P((0,r.useState)(!1),2),qe=Je[0],Ne=Je[1],Ue=P((0,r.useState)(""),2),ze=Ue[0],Fe=Ue[1],He=P((0,r.useState)(!1),2),Ge=He[0],Ke=He[1],Le=P((0,r.useState)(4),2),Ve=Le[0],Ze=Le[1],$e=P((0,r.useState)(1),2),Qe=$e[0],Xe=($e[1],P((0,r.useState)([]),2)),Ye=Xe[0],et=Xe[1],tt=P((0,r.useState)([]),2),nt=tt[0],rt=tt[1],at=P((0,r.useState)(""),2),ot=at[0],st=at[1],it=P((0,r.useState)(""),2),lt=it[0],ut=it[1],ct=P((0,r.useState)(!0),2),mt=ct[0],pt=ct[1],ft=P((0,r.useState)(!1),2),dt=ft[0],ht=ft[1],yt=P((0,r.useState)("async"),2),gt=yt[0],bt=yt[1],St=Intl.DateTimeFormat().resolvedOptions().timeZone;(0,r.useEffect)((function(){a.A.all([a.A.get("/frontend-api/model"),a.A.get("/frontend-api/instruction-tree")]).then(a.A.spread((function(e,t){for(var n in B(e.data.models),K(e.data.models_agent),et(t.data.root_nodes),ut(t.data.default_children[0].instruct),rt(t.data.default_children),t.data.root_nodes)t.data.root_nodes[n].name==M&&st(t.data.root_nodes[n].instruct)}))).catch((function(e){console.log(e)}))}),[]);var wt=function(){var e;null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})};(0,r.useEffect)((function(){wt()}),[q]),(0,r.useEffect)((function(){wt()}),[z]);var _t="https:"==window.location.protocol?"wss":"ws",vt=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,r.useEffect)((function(){Promise.all([e.current=new WebSocket(_t+"://"+window.location.host+"/ws/engineer/"+vt[vt.length-1]+"/"+St+"/"),t.current=new WebSocket(_t+"://"+window.location.host+"/ws/chat/"+vt[vt.length-1]+"/"+St+"/")]),Promise.all([(0,E.u)(t,N,x,document),(0,E.j)(e,F,k,document,st,ut,rt)])}),[]),(0,r.useEffect)((function(){Promise.all([e.current.close(),t.current.close()]),"async"==gt?Promise.all([e.current=new WebSocket(_t+"://"+window.location.host+"/ws/engineer-async/"+vt[vt.length-1]+"/"+St+"/"),t.current=new WebSocket(_t+"://"+window.location.host+"/ws/chat-async/"+vt[vt.length-1]+"/"+St+"/")]):Promise.all([e.current=new WebSocket(_t+"://"+window.location.host+"/ws/engineer/"+vt[vt.length-1]+"/"+St+"/"),t.current=new WebSocket(_t+"://"+window.location.host+"/ws/chat/"+vt[vt.length-1]+"/"+St+"/")]),Promise.all([(0,E.u)(t,N,x,document),(0,E.j)(e,F,k,document,st,ut,rt)])}),[gt]);var Et=function(e){"Enter"!=e.key||e.shiftKey||(mt?(Pt(),kt()):mt||"chat-input"!=e.target.id?mt||"agent-input"!=e.target.id||kt():Pt())},At=function(e){mt&&(Fe(e),Be(e))},kt=function(){if(""==ze)Ke(!0);else{var t={max_turn:Ve,instruct_change:dt,currentParagraph:Qe,message:ze,choosen_models:V,choosen_template:M,role:"Human",top_p:ee,max_tokens:ue,frequency_penalty:Ce,presence_penalty:Oe,temperature:he,agent_instruction:ot,child_instruction:lt};e.current.send(JSON.stringify(t)),Fe(""),ht(!1)}},Pt=function(){if(""==De)Ne(!0);else{var e={mode:se,message:De,choosen_models:Q,role:"Human",top_k:re,top_p:ee,best_of:Ae,max_tokens:ue,frequency_penalty:Ce,presence_penalty:Oe,temperature:he,beam:be,early_stopping:_e,length_penalty:Me,include_memory:pe};t.current.send(JSON.stringify(e)),Be("")}};return r.createElement(m.A,{maxWidth:!1,sx:{minWidth:1500},disableGutters:!0},r.createElement("title",null,"Agent"),r.createElement(w.A,{max_width:!1}),r.createElement(m.A,{maxWidth:!1,sx:{minWidth:1500}},r.createElement(o.A,{m:1},r.createElement(s.Ay,{container:!0,spacing:2},r.createElement(s.Ay,{item:!0,xs:2},r.createElement(f.A,{subheader:r.createElement(S.A,{component:"div",id:"nested-list-subheader"},"Template Structure")},nt.map((function(t){return r.createElement(b.Ay,{key:t.name,disablePadding:!0},r.createElement(g.A,null,r.createElement(d.A,{onClick:function(){return n=t.name,void e.current.send(JSON.stringify({swap_child_instruct:n,template_type:"system"}));var n},primary:t.name})))}))),r.createElement(y.A,null),r.createElement(c.A,{mt:1,spacing:1},r.createElement(l.A,{variant:"h6",gutterBottom:!0},"Parent Instruction"),r.createElement(u.A,null,r.createElement(W,{id:"parent-instruct",multiline:!0,maxRows:8,value:ot,onChange:function(e){st(e.target.value),ht(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(p.A,{position:"start"},"   ")}})),r.createElement(y.A,null),r.createElement(l.A,{variant:"h6",gutterBottom:!0},"Child Instruction"),r.createElement(u.A,null,r.createElement(W,{id:"child-instruct",multiline:!0,maxRows:8,value:lt,onChange:function(e){ut(e.target.value),ht(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(p.A,{position:"start"},"   ")}})))),r.createElement(s.Ay,{item:!0,xs:4},r.createElement(_.a,{id:"chat-log",inputsize:660,chat_message:q,usermessage:De,usermessageError:qe,ChatPaper:C,ChatInput:W,setUserMessage:Be,submitChat:Pt,messagesEndRef:n,shownthinking:j,handleEnter:Et,check_duplicate_message:At})),r.createElement(s.Ay,{item:!0,xs:4},r.createElement(_.a,{id:"chat-log-agent",inputsize:660,chat_message:z,usermessage:ze,usermessageError:Ge,ChatPaper:C,ChatInput:W,setUserMessage:Fe,submitChat:kt,messagesEndRef:n,shownthinking:h,handleEnter:Et,check_duplicate_message:At})),r.createElement(s.Ay,{item:!0,xs:2},r.createElement(v.WJ,{socket_destination:gt,setSocketDestination:bt,template_list:Ye,choosen_template:M,setChoosenTemplate:R,model_objects:D,agent_objects:G,choosen_chat_model:Q,choosen_agent_model:V,top_k:re,top_p:ee,max_tokens:ue,temperature:he,mode:se,bestof:Ae,lengthpenalty:Me,presencepenalty:Oe,frequencypenalty:Ce,max_turn:Ve,setMaxTurn:Ze,setBeam:Se,setMaxToken:ce,setBestof:ke,setTemperature:ye,setMode:ie,setLengthPenalty:Re,setPresencePenalty:je,setFrequencyPenalty:We,setTopk:ae,setTopp:te,setUseMemory:fe,earlystopping:_e,setEarlyStopping:ve,setChoosenAgentModel:Z,setChoosenChatModel:X,setDuplicateMessage:pt,swap_template:function(t){e.current.send(JSON.stringify({swap_template:t,template_type:"system"}))}}))))),r.createElement(A.A,null))}}}]);