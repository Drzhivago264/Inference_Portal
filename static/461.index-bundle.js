"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[461],{45461:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var r=n(96540),a=n(46266),o=n(69067),s=n(8239),i=n(11848),u=n(14073),l=n(60538),c=n(30995),m=n(97834),p=n(25239),f=n(49799),d=n(82241),h=n(42471),y=n(71543),g=n(37211),b=n(44090),S=n(48158),v=n(35453),E=n(83248),_=n(92497),A=n(6276),w=n(38960);function O(e){return O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(e)}function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,s,i=[],u=!0,l=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=o.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,a=e}finally{try{if(!u&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(l)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return P(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?P(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){var r,a,o,s;r=e,a=t,o=n[t],s=function(e,t){if("object"!=O(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=O(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==O(s)?s:s+"")in r?Object.defineProperty(r,a,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[a]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var x=(0,i.Ay)(l.A)((function(e){var t=e.theme;return C({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),I=(0,i.Ay)(h.A)((function(e){return C({width:"100%"},e.theme.typography.body2)}));const M=function(){(0,r.useRef)();var e=(0,r.useRef)(null),t=(0,r.useRef)(null),n=(0,r.useRef)(null),i=j((0,r.useState)(!1),2),h=i[0],O=i[1],P=j((0,r.useState)(!1),2),k=P[0],C=P[1],M=j((0,r.useState)("Assignment Agent"),2),R=M[0],T=M[1],W=j((0,r.useState)([]),2),B=W[0],D=W[1],q=j((0,r.useState)([]),2),J=q[0],U=q[1],N=j((0,r.useState)([]),2),z=N[0],H=N[1],F=j((0,r.useState)([]),2),G=F[0],K=F[1],L=j((0,r.useState)("gpt-4"),2),V=L[0],$=L[1],Q=j((0,r.useState)("Mistral Chat 13B"),2),X=Q[0],Y=Q[1],Z=j((0,r.useState)(.72),2),ee=Z[0],te=Z[1],ne=j((0,r.useState)(-1),2),re=ne[0],ae=ne[1],oe=j((0,r.useState)("chat"),2),se=oe[0],ie=oe[1],ue=j((0,r.useState)(512),2),le=ue[0],ce=ue[1],me=j((0,r.useState)(!0),2),pe=me[0],fe=me[1],de=j((0,r.useState)(.73),2),he=de[0],ye=de[1],ge=j((0,r.useState)(!1),2),be=ge[0],Se=ge[1],ve=j((0,r.useState)(!1),2),Ee=ve[0],_e=ve[1],Ae=j((0,r.useState)(2),2),we=Ae[0],Oe=Ae[1],je=j((0,r.useState)(0),2),Pe=je[0],ke=je[1],Ce=j((0,r.useState)(0),2),xe=Ce[0],Ie=Ce[1],Me=j((0,r.useState)(0),2),Re=Me[0],Te=Me[1],We=j((0,r.useState)(""),2),Be=We[0],De=We[1],qe=j((0,r.useState)(!1),2),Je=qe[0],Ue=qe[1],Ne=j((0,r.useState)(""),2),ze=Ne[0],He=Ne[1],Fe=j((0,r.useState)(!1),2),Ge=Fe[0],Ke=Fe[1],Le=j((0,r.useState)(1),2),Ve=Le[0],$e=(Le[1],j((0,r.useState)([]),2)),Qe=$e[0],Xe=$e[1],Ye=j((0,r.useState)([]),2),Ze=Ye[0],et=Ye[1],tt=j((0,r.useState)(""),2),nt=tt[0],rt=tt[1],at=j((0,r.useState)(""),2),ot=at[0],st=at[1],it=j((0,r.useState)(!0),2),ut=it[0],lt=it[1];(0,r.useEffect)((function(){a.A.all([a.A.get("/frontend-api/model"),a.A.get("/frontend-api/instruction-tree")]).then(a.A.spread((function(e,t){for(var n in D(e.data.models),K(e.data.models_agent),Xe(t.data.root_nodes),st(t.data.default_children[0].instruct),et(t.data.default_children),t.data.root_nodes)t.data.root_nodes[n].name==R&&rt(t.data.root_nodes[n].instruct)}))).catch((function(e){console.log(e)}))}),[]);var ct=function(){var e;null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})};(0,r.useEffect)((function(){ct()}),[J]),(0,r.useEffect)((function(){ct()}),[z]);var mt="https:"==window.location.protocol?"wss":"ws",pt=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,r.useEffect)((function(){e.current=new WebSocket(mt+"://"+window.location.host+"/ws/engineer/"+pt[pt.length-1]+"/"),t.current=new WebSocket(mt+"://"+window.location.host+"/ws/chat/"+pt[pt.length-1]+"/"),(0,A.u)(t,U,C,document),(0,A.j)(e,H,O,document,rt,st,et,null,null,null)}),[]);var ft=function(e){"Enter"!=e.key||e.shiftKey||(ut?(yt(),ht()):ut||"chat-input"!=e.target.id?ut||"agent-input"!=e.target.id||ht():yt())},dt=function(e){ut&&(He(e),De(e))},ht=function(){if(""==ze)Ke(!0);else{var t={currentParagraph:Ve,message:ze,choosen_models:V,choosen_template:R,role:"Human",top_p:ee,max_tokens:le,frequency_penalty:xe,presence_penalty:Pe,temperature:he,agent_instruction:nt,child_instruction:ot};e.current.send(JSON.stringify(t)),He("")}},yt=function(){if(""==Be)Ue(!0);else{var e={mode:se,message:Be,choosen_models:X,role:"Human",top_k:re,top_p:ee,best_of:we,max_tokens:le,frequency_penalty:xe,presence_penalty:Pe,temperature:he,beam:be,early_stopping:Ee,length_penalty:Re,include_memory:pe};t.current.send(JSON.stringify(e)),De("")}};return r.createElement(m.A,{maxWidth:!1,sx:{minWidth:1500},disableGutters:!0},r.createElement("title",null,"Agent"),r.createElement(v.A,null),r.createElement(m.A,{maxWidth:!1,sx:{minWidth:1500}},r.createElement(o.A,{m:1},r.createElement(s.Ay,{container:!0,spacing:2},r.createElement(s.Ay,{item:!0,xs:2},r.createElement(f.A,{subheader:r.createElement(S.A,{component:"div",id:"nested-list-subheader"},"Template Structure")},Ze.map((function(t){return r.createElement(b.Ay,{disablePadding:!0},r.createElement(g.A,null,r.createElement(d.A,{onClick:function(){return n=t.name,void e.current.send(JSON.stringify({swap_child_instruct:n}));var n},primary:t.name})))}))),r.createElement(y.A,null),r.createElement(c.A,{mt:1,spacing:1},r.createElement(u.A,{variant:"h6",gutterBottom:!0},"Parent Instruction"),r.createElement(l.A,null,r.createElement(I,{id:"parent-instruct",multiline:!0,maxRows:8,value:nt,onChange:function(e){return rt(e.target.value)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(p.A,{position:"start"},"   ")}})),r.createElement(y.A,null),r.createElement(u.A,{variant:"h6",gutterBottom:!0},"Child Instruction"),r.createElement(l.A,null,r.createElement(I,{id:"child-instruct",multiline:!0,maxRows:8,value:ot,onChange:function(e){return st(e.target.value)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(p.A,{position:"start"},"   ")}})))),r.createElement(s.Ay,{item:!0,xs:4},r.createElement(E.a,{id:"chat-log",inputsize:660,chat_message:J,usermessage:Be,usermessageError:Je,ChatPaper:x,ChatInput:I,setUserMessage:De,submitChat:yt,messagesEndRef:n,shownthinking:k,handleEnter:ft,check_duplicate_message:dt})),r.createElement(s.Ay,{item:!0,xs:4},r.createElement(E.a,{id:"chat-log-agent",inputsize:660,chat_message:z,usermessage:ze,usermessageError:Ge,ChatPaper:x,ChatInput:I,setUserMessage:He,submitChat:ht,messagesEndRef:n,shownthinking:h,handleEnter:ft,check_duplicate_message:dt})),r.createElement(s.Ay,{item:!0,xs:2},r.createElement(_.WJ,{template_list:Qe,choosen_template:R,setChoosenTemplate:T,model_objects:B,agent_objects:G,choosen_chat_model:X,choosen_agent_model:V,top_k:re,top_p:ee,max_tokens:le,temperature:he,mode:se,bestof:we,lengthpenalty:Re,presencepenalty:Pe,frequencypenalty:xe,setBeam:Se,setMaxToken:ce,setBestof:Oe,setTemperature:ye,setMode:ie,setLengthPenalty:Te,setPresencePenalty:ke,setFrequencyPenalty:Ie,setTopk:ae,setTopp:te,setUseMemory:fe,earlystopping:Ee,setEarlyStopping:_e,setChoosenAgentModel:$,setChoosenChatModel:Y,setDuplicateMessage:lt}))))),r.createElement(w.A,null))}}}]);