"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[750],{28836:(e,t,a)=>{function l(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,l=new Array(t);a<t;a++)l[a]=e[a];return l}function r(e,t,a,n){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var r=JSON.parse(e.data);if(r){"Human"==r.role||"Server"==r.role||r.holder?(r.holder&&(a(!0),r.message=""),t((function(e){return[].concat(l(e),[{holder:r.holder,holderid:r.holderid,role:r.role,time:r.time,credit:r.credit,message:r.message}])}))):(a(!1),t((function(e){return[].concat(l(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=r.message}])})));var m=n.getElementById("chat-log");m.scrollTop=m.scrollHeight}}}function m(e,t,a,n,r,m,i,c,o,s,u,p,d,E){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var g=JSON.parse(e.data);if(g){if(g.hasOwnProperty("swap_template")){if(c){var A=[];for(var f in g.child_template_name_list)A.push({displayed_name:g.child_template_name_list[f]});o(g.swap_instruction),s(g.default_child_instruct),u(A);var y={time:1709749130861,blocks:[{id:"1hYKvu7PTO",type:"header",data:{text:"Response",level:2}},{id:"SrV68agaen",type:"paragraph",data:{text:""}}],version:"2.29.1"};p&&p(y),E&&E.current.render(y)}else{var h=[];for(var f in g.child_template_name_list)h.push({name:g.child_template_name_list[f]});r(g.swap_instruction),m(g.default_child_instruct),i(h),p&&p(JSON.parse(g.swap_template)),E&&E.current.render(JSON.parse(g.swap_template))}g.message=""}else g.hasOwnProperty("child_instruct")?(c?s(g.child_instruct):m(g.child_instruct),g.message=""):g.hasOwnProperty("paragraph")&&d&&(d(g.paragraph),g.message="");if("Human"==g.role||"Server"==g.role||g.holder)g.holder&&(a(!0),g.message=""),t((function(e){return[].concat(l(e),[{holder:g.holder,holderid:g.holderid,role:g.role,time:g.time,credit:g.credit,message:g.message}])}));else if(g.hasOwnProperty("agent_action")){if("STOP"==g.agent_action||"NEXT"==g.agent_action){var v={type:"paragraph",data:{text:g.full_result.replace(/\n/g,"<br>")}};E.current.blocks.insert(v.type,v.data,null,g.result_id)}}else a(!1),t((function(e){return[].concat(l(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=g.message}])}));if(!(b=n.getElementById("chat-log")))var b=n.getElementById("chat-log-agent");b.scrollTop=b.scrollHeight}}}a.d(t,{j:()=>m,u:()=>r})},28560:(e,t,a)=>{a.d(t,{a:()=>g,s:()=>E});var l=a(96540),n=a(69067),r=a(48139),m=a(60538),i=a(30995),c=a(25239),o=a(8239),s=a(87458),u=a(40443),p=a(11641),d=a(70177),E=function(e){var t=e.inputsize,a=e.ChatPaper,E=e.ChatInput,g=e.chat_message,A=e.shownthinking,f=e.usermessage,y=e.setUserMessage,h=e.usermessageError,v=e.submitChat,b=e.messagesEndRef,x=e.handleEnter,_=function(e){navigator.clipboard.writeText(e)};return l.createElement(n.A,null,l.createElement(a,{id:"chat-log",variant:"outlined"},l.createElement(i.A,{spacing:1},g.map((function(e){return"Human"==e.role?l.createElement(m.A,{key:e.time},l.createElement(n.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container"},l.createElement(o.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},l.createElement(n.A,{align:"left"},l.createElement(p.A,{onClick:function(){return _("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},l.createElement(d.A,{fontSize:"small"}))),l.createElement(n.A,{pt:.8},l.createElement(n.A,{textAlign:"right"},e.role," (",e.time,")"),l.createElement(n.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap",width:"100%"}},e.message))))):e.holder?l.createElement(m.A,{key:e.holderid},l.createElement(n.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},l.createElement(o.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},l.createElement(n.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},l.createElement("span",null,e.role," - ",e.time,": ",l.createElement("br",null),l.createElement("br",null),e.message)),l.createElement(n.A,{align:"right"},l.createElement(p.A,{onClick:function(){return _("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},l.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?l.createElement(m.A,{key:e.message+e.time},l.createElement(n.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},l.createElement(o.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},l.createElement(n.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},l.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),l.createElement(n.A,{align:"right"},l.createElement(p.A,{onClick:function(){return _("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},l.createElement(d.A,{fontSize:"small"})))))):void 0})),l.createElement("div",{ref:b}," "))),A&&l.createElement(s.A,null),l.createElement(n.A,{mt:2},l.createElement(m.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:t}}},l.createElement(E,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:f,error:h,onChange:function(e){return y(e.target.value)},onKeyPress:function(e){return x(e)},minRows:4,variant:"standard",InputProps:{endAdornment:l.createElement(c.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},l.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:v,endIcon:l.createElement(u.A,null)},"Send")),startAdornment:l.createElement(c.A,{position:"start"},"   ")}}))))},g=function(e){var t=e.id,a=e.inputsize,E=e.ChatPaper,g=e.ChatInput,A=e.chat_message,f=e.shownthinking,y=e.usermessage,h=e.setUserMessage,v=e.usermessageError,b=e.submitChat,x=e.messagesEndRef,_=e.handleEnter,w=e.check_duplicate_message,z=function(e){navigator.clipboard.writeText(e)};return l.createElement(n.A,null,l.createElement(E,{id:t,variant:"outlined"},l.createElement(i.A,{spacing:1},A.map((function(e){return"Human"==e.role?l.createElement(m.A,{key:e.time+e.message},l.createElement(n.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-wrap"}},l.createElement(o.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},l.createElement(n.A,{align:"left"},l.createElement(p.A,{onClick:function(){return z("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},l.createElement(d.A,{fontSize:"small"}))),l.createElement(n.A,{pt:.8},l.createElement(n.A,{textAlign:"right"},e.role," (",e.time,")"),l.createElement(n.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap"}},e.message))))):e.holder?l.createElement(m.A,{key:e.holderid},l.createElement(n.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},l.createElement(o.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},l.createElement(n.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},l.createElement("span",null,e.role," - ",e.time,": ",l.createElement("br",null),l.createElement("br",null),e.message)),l.createElement(n.A,{align:"right"},l.createElement(p.A,{onClick:function(){return z("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},l.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?l.createElement(m.A,{key:e.message},l.createElement(n.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},l.createElement(o.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},l.createElement(n.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},l.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),l.createElement(n.A,{align:"right"},l.createElement(p.A,{onClick:function(){return z("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},l.createElement(d.A,{fontSize:"small"})))))):void 0})),l.createElement("div",{ref:x}," "))),f&&l.createElement(s.A,null),l.createElement(n.A,{mt:2},l.createElement(m.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:a}}},l.createElement(g,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:y,error:v,onChange:function(e){h(e.target.value),w(e.target.value)},onKeyPress:function(e){return _(e)},minRows:4,variant:"standard",InputProps:{endAdornment:l.createElement(c.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},l.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:b,endIcon:l.createElement(u.A,null)},"Send")),startAdornment:l.createElement(c.A,{position:"start"},"   ")}}))))}},90314:(e,t,a)=>{a.d(t,{I2:()=>M,Oj:()=>P,WJ:()=>N});var l,n,r=a(96540),m=a(50779),i=a(69307),c=a(29571),o=a(53215),s=a(73896),u=a(4147),p=a(29428),d=a(14073),E=a(30995),g=a(68864),A=a(98475),f=a(1405),y=a(71543),h=a(77623),v=a(69067),b=a(11848),x=a(47839),_=a(52162),w=a(11641),z=a(32389);function S(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var C=(0,b.Ay)(h.A)(l||(l=S(["\n  max-width: 50px;\n  \n"]))),k=(0,b.Ay)(h.A)(n||(n=S(["\n  max-width: 60px;\n"]))),B=function(e,t,a,l){e&&(e<a?t(a):e>l&&t(l))},P=function(e){var t=e.choosen_model,a=e.setChoosenModel,l=e.frequencypenalty,n=e.setFrequencyPenalty,o=e.presencepenalty,p=e.setPresencePenalty,g=e.agent_objects,f=e.top_p,h=e.setTopp,b=e.temperature,S=e.setTemperature,P=e.max_tokens,M=e.setMaxToken,N=e.max_turn,L=e.setMaxTurn,T=(0,z.Bd)(),D=T.t;return T.i18n,r.createElement(E.A,{direction:"column",spacing:1},r.createElement(m.A,null,r.createElement(c.A,{id:"model-label"},"Models"),r.createElement(u.A,{labelId:"model-label",id:"model-select",onChange:function(e){return a(e.target.value)},value:t,label:"Models",size:"small"},g.map((function(e){return r.createElement(s.A,{key:e.name,value:e.name},e.name)})))),r.createElement(y.A,null),r.createElement(i.A,null,"Parameters"),N&&r.createElement(v.A,null,r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Max_turns",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},D("parameter_explain.max_turn")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:N,size:"small",onChange:function(e){return L(""===e.target.value?0:Number(e.target.value))},onBlur:B(N,L,1,10),inputProps:{step:1,min:0,max:10,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:1,min:1,max:10,marks:!0,valueLabelDisplay:"off",onChange:function(e){return L(e.target.value)},value:N})),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Top_p",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},D("parameter_explain.top_p")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:f,size:"small",onChange:function(e){return h(""===e.target.value?0:Number(e.target.value))},onBlur:B(f,h,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return h(e.target.value)},value:f}),g.map((function(e){if(e.name==t)return r.createElement(v.A,{key:e.name},r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},D("parameter_explain.max_token")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(k,{value:P||e.context_length,size:"small",onChange:function(e){return M(""===e.target.value?0:Number(e.target.value))},onBlur:B(P,M,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:1,min:1,max:e.context_length,onChange:function(e){return M(e.target.value)},value:P,valueLabelDisplay:"off"}))})),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Temperature",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},D("parameter_explain.temperature")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:b,size:"small",onChange:function(e){return S(""===e.target.value?0:Number(e.target.value))},onBlur:B(b,S,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return S(e.target.value)},value:b,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Presence penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},D("parameter_explain.presence_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:o,size:"small",onChange:function(e){return p(""===e.target.value?0:Number(e.target.value))},onBlur:B(o,p,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return p(e.target.value)},value:o,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Frequency penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},D("parameter_explain.frequency_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:l,size:"small",onChange:function(e){return n(""===e.target.value?0:Number(e.target.value))},onBlur:B(l,n,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return n(e.target.value)},value:l,valueLabelDisplay:"off"}))},M=function(e){var t=e.setSocketDestination,a=e.socket_destination,l=e.setUseMemory,n=e.choosen_model,h=e.setChoosenModel,b=e.mode,S=e.setMode,P=e.top_k,M=e.setTopk,N=e.top_p,L=e.setTopp,T=e.temperature,D=e.setTemperature,V=e.bestof,j=e.setBestof,I=e.lengthpenalty,O=e.setLengthPenalty,R=e.frequencypenalty,q=e.setFrequencyPenalty,U=e.presencepenalty,W=e.setPresencePenalty,F=e.beam,H=e.setBeam,J=e.max_tokens,K=e.setMaxToken,X=e.model_objects,Y=e.agent_objects,$=e.earlystopping,G=e.setEarlyStopping,Q=(0,z.Bd)(),Z=Q.t;return Q.i18n,r.createElement(E.A,{direction:"column",spacing:1},r.createElement(m.A,{defaultValue:""},r.createElement(c.A,{id:"model-label"},"Models"),r.createElement(u.A,{labelId:"model-label",id:"model-select",onChange:function(e){return h(e.target.value)},value:n,label:"Models",size:"small"},X.map((function(e){return r.createElement(s.A,{key:e.name,value:e.name},e.name)})),Y.map((function(e){return r.createElement(s.A,{key:e.name,value:e.name},e.name)})))),r.createElement(y.A,null),r.createElement(m.A,{defaultValue:""},r.createElement(c.A,{id:"model-label"},"Backends"),r.createElement(u.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return t(e.target.value)},value:a,label:"Backends",size:"small"},r.createElement(s.A,{key:"/ws/chat/",value:"/ws/chat/"},"Celery Backend"),r.createElement(s.A,{key:"/ws/chat-async/",value:"/ws/chat-async/"},"Async Backend"))),r.createElement(y.A,null),r.createElement(i.A,{id:"demo-radio-buttons-group-label"},"Parameters"),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(g.A,{control:r.createElement(f.A,{defaultChecked:!0,onChange:function(e){return l(e.target.checked)}}),label:"Use Memory"}),r.createElement(v.A,null,r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.use_memory")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"}))))),r.createElement(p.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return S(e.target.value)},value:b},r.createElement(g.A,{key:"chat",value:"chat",control:r.createElement(o.A,{size:"small"}),label:"Chat Bot Mode"}),r.createElement(g.A,{key:"generate",value:"generate",control:r.createElement(o.A,{size:"small"}),label:"Text Completion"}),r.createElement(y.A,null)),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Top_p",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.top_p")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:N,size:"small",onChange:function(e){return L(""===e.target.value?0:Number(e.target.value))},onBlur:B(N,L,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return L(e.target.value)},value:N}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Top_k",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.top_k")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:P,size:"small",onChange:function(e){return M(""===e.target.value?0:Number(e.target.value))},onBlur:B(P,M,-1,100),inputProps:{step:1,min:-1,max:100,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return M(e.target.value)},value:P}),Y.map((function(e){if(e.name==n)return r.createElement(v.A,null,r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.max_token")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(k,{value:J||e.context_length,size:"small",onChange:function(e){return K(""===e.target.value?0:Number(e.target.value))},onBlur:B(J,K,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:1,min:1,max:e.context_length,onChange:function(e){return K(e.target.value)},value:J,valueLabelDisplay:"off"}))})),X.map((function(e){if(e.name==n)return r.createElement(v.A,null,r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.max_token")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:J,size:"small",onChange:function(e){return K(""===e.target.value?0:Number(e.target.value))},onBlur:B(J,K,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return K(e.target.value)},value:J,valueLabelDisplay:"off"}))})),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Temperature",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.temperature")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))," "),r.createElement(C,{value:T,size:"small",onChange:function(e){return D(""===e.target.value?0:Number(e.target.value))},onBlur:B(T,D,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return D(e.target.value)},value:T,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Presence penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.presence_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:U,size:"small",onChange:function(e){return W(""===e.target.value?0:Number(e.target.value))},onBlur:B(U,W,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return W(e.target.value)},value:U,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Frequency penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.frequency_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:R,size:"small",onChange:function(e){return q(""===e.target.value?0:Number(e.target.value))},onBlur:B(R,q,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return q(e.target.value)},value:R,valueLabelDisplay:"off"}),r.createElement(y.A,null),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(g.A,{control:r.createElement(f.A,{onChange:function(e){return H(e.target.checked)},value:F}),label:"Beam Search"}),r.createElement(v.A,null,r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.beam")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"}))))),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(g.A,{control:r.createElement(f.A,{onChange:function(e){return G(e.target.checked)},value:$}),label:"Early Stopping"}),r.createElement(v.A,null,r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.early_stopping")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"}))))),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Best_of",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.best_of")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:V,size:"small",onChange:function(e){return j(""===e.target.value?0:Number(e.target.value))},onBlur:B(V,j,1,5),inputProps:{step:1,min:1,max:5,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{onChange:function(e){return j(e.target.value)},value:V,marks:!0,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Length penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},Z("parameter_explain.length_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:I,size:"small",onChange:function(e){return O(""===e.target.value?0:Number(e.target.value))},onBlur:B(I,O,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{onChange:function(e){return O(e.target.value)},value:I,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"}))},N=function(e){var t=e.template_list,a=e.setUseMemory,l=e.setDuplicateMessage,n=e.choosen_chat_model,h=e.choosen_template,b=e.setChoosenTemplate,S=e.setChoosenChatModel,P=e.choosen_agent_model,M=e.setChoosenAgentModel,N=e.mode,L=e.setMode,T=e.top_k,D=e.setTopk,V=e.top_p,j=e.setTopp,I=e.temperature,O=e.setTemperature,R=e.bestof,q=e.setBestof,U=e.lengthpenalty,W=e.setLengthPenalty,F=e.frequencypenalty,H=e.setFrequencyPenalty,J=e.presencepenalty,K=e.setPresencePenalty,X=e.beam,Y=e.setBeam,$=e.max_tokens,G=e.setMaxToken,Q=e.model_objects,Z=e.agent_objects,ee=e.earlystopping,te=e.setEarlyStopping,ae=e.socket_destination,le=e.setSocketDestination,ne=e.swap_template,re=e.max_turn,me=e.setMaxTurn,ie=(0,z.Bd)(),ce=ie.t;return ie.i18n,r.createElement(E.A,{direction:"column",spacing:1},r.createElement(m.A,{defaultValue:""},r.createElement(c.A,{id:"model-label"},"Backends"),r.createElement(u.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return le(e.target.value)},value:ae,label:"Backends",size:"small"},r.createElement(s.A,{key:"none_async",value:"none_async"},"Celery Backend"),r.createElement(s.A,{key:"async",value:"async"},"Async Backend"))),r.createElement(m.A,null,r.createElement(c.A,{id:"model-label"},"Chat Models"),r.createElement(u.A,{labelId:"model-label",id:"model-select",onChange:function(e){return S(e.target.value)},value:n,label:"Models",size:"small"},Z.map((function(e){return r.createElement(s.A,{key:e.name,value:e.name},e.name)})),Q.map((function(e){return r.createElement(s.A,{key:e.name,value:e.name},e.name)})))),r.createElement(m.A,null,r.createElement(c.A,{id:"model-label"},"Agent Models"),r.createElement(u.A,{labelId:"model-label",id:"model-select",onChange:function(e){return M(e.target.value)},value:P,label:"Models",size:"small"},Z.map((function(e){return r.createElement(s.A,{key:e.name,value:e.name},e.name)})))),r.createElement(m.A,null,r.createElement(c.A,{id:"agent-label"},"Agents"),r.createElement(u.A,{labelId:"agent-label",id:"agent-select",onChange:function(e){b(e.target.value),ne(e.target.value)},value:h,label:"Agents",size:"small"},t.map((function(e){return r.createElement(s.A,{key:e.name,value:e.name},e.name)})))),r.createElement(y.A,null),r.createElement(i.A,{id:"demo-radio-buttons-group-label"},"Parameters"),r.createElement(g.A,{control:r.createElement(f.A,{defaultChecked:!0,onChange:function(e){return l(e.target.checked)}}),label:"Duplicate Message"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(g.A,{control:r.createElement(f.A,{defaultChecked:!0,onChange:function(e){return a(e.target.checked)}}),label:"Use Memory"}),r.createElement(v.A,null,r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.use_memory")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"}))))),r.createElement(p.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return L(e.target.value)},value:N},r.createElement(g.A,{key:"chat",value:"chat",control:r.createElement(o.A,{size:"small"}),label:"Chat Bot Mode"}),r.createElement(g.A,{key:"generate",value:"generate",control:r.createElement(o.A,{size:"small"}),label:"Text Completion"}),r.createElement(y.A,null)),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Max_turns",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.max_turn")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:re,size:"small",onChange:function(e){return me(""===e.target.value?0:Number(e.target.value))},onBlur:B(re,me,1,10),inputProps:{step:1,min:1,max:10,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:1,min:1,max:10,marks:!0,valueLabelDisplay:"off",onChange:function(e){return me(e.target.value)},value:re}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Top_p",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.top_p")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:V,size:"small",onChange:function(e){return j(""===e.target.value?0:Number(e.target.value))},onBlur:B(V,j,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return j(e.target.value)},value:V}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Top_k",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.top_k")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:T,size:"small",onChange:function(e){return D(""===e.target.value?0:Number(e.target.value))},onBlur:B(T,D,-1,100),inputProps:{step:1,min:-1,max:100,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return D(e.target.value)},value:T}),Z.map((function(e){if(e.name==n)return r.createElement(v.A,{key:e.name},r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.max_token")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(k,{value:$||e.context_length,size:"small",onChange:function(e){return G(""===e.target.value?0:Number(e.target.value))},onBlur:B($,G,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{step:1,min:1,max:e.context_length,onChange:function(e){return G(e.target.value)},value:$,valueLabelDisplay:"off"}))})),Q.map((function(e){if(e.name==n)return r.createElement(v.A,{key:e.name},r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.max_token")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(k,{value:$,size:"small",onChange:function(e){return G(""===e.target.value?0:Number(e.target.value))},onBlur:B($,G,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return G(e.target.value)},value:$,valueLabelDisplay:"off"}))})),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Temperature",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.temperature")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:I,size:"small",onChange:function(e){return O(""===e.target.value?0:Number(e.target.value))},onBlur:B(I,O,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return O(e.target.value)},value:I,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Presence penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.presence_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:J,size:"small",onChange:function(e){return K(""===e.target.value?0:Number(e.target.value))},onBlur:B(J,K,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return K(e.target.value)},value:J,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Frequency penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.frequency_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:F,size:"small",onChange:function(e){return H(""===e.target.value?0:Number(e.target.value))},onBlur:B(F,H,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return H(e.target.value)},value:F,valueLabelDisplay:"off"}),r.createElement(y.A,null),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(g.A,{control:r.createElement(f.A,{onChange:function(e){return Y(e.target.checked)},value:X}),label:"Beam Search"}),r.createElement(v.A,null,r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.beam")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"}))))),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(g.A,{control:r.createElement(f.A,{onChange:function(e){return te(e.target.checked)},value:ee}),label:"Early Stopping"}),r.createElement(v.A,null,r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.early_stopping")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"}))))),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Best_of",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.best_of")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:R,size:"small",onChange:function(e){return q(""===e.target.value?0:Number(e.target.value))},onBlur:B(R,q,1,5),inputProps:{step:1,min:1,max:5,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{onChange:function(e){return q(e.target.value)},value:R,marks:!0,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),r.createElement(E.A,{direction:"row",spacing:1},r.createElement(d.A,{style:{flex:1},gutterBottom:!0},"Length penalty",r.createElement(x.A,{title:r.createElement("div",{style:{whiteSpace:"pre-line"}},ce("parameter_explain.length_penalty")),arrow:!0,placement:"top"},r.createElement(w.A,{size:"small"},r.createElement(_.A,{fontSize:"small"})))),r.createElement(C,{value:U,size:"small",onChange:function(e){return W(""===e.target.value?0:Number(e.target.value))},onBlur:B(U,W,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(A.Ay,{onChange:function(e){return W(e.target.value)},value:U,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"}))}}}]);