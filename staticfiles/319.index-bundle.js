"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[319],{83248:(e,t,a)=>{a.d(t,{a:()=>f,s:()=>g});var n=a(96540),l=a(69067),r=a(48139),o=a(60538),c=a(30995),m=a(25239),s=a(8239),i=a(87458),u=a(40443),p=a(11641),d=a(70177),g=function(e){var t=e.inputsize,a=e.ChatPaper,g=e.ChatInput,f=e.chat_message,E=e.shownthinking,h=e.usermessage,A=e.setUserMessage,y=e.usermessageError,b=e.submitChat,v=e.messagesEndRef,k=e.handleEnter,C=function(e){navigator.clipboard.writeText(e)};return n.createElement(l.A,null,n.createElement(a,{id:"chat-log",variant:"outlined"},n.createElement(c.A,{spacing:1},f.map((function(e){return"Human"==e.role?n.createElement(o.A,{key:e.time},n.createElement(l.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-line",textAlign:"right"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{align:"left"},n.createElement(p.A,{onClick:function(){return C("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"}))),n.createElement(l.A,{pt:.8,align:"right",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null," ",e.role," (",e.time,")  ",n.createElement("br",null),n.createElement("br",null)," ",e.message," "))))):e.holder?n.createElement(o.A,{key:e.holderid},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null," ",e.role," - ",e.time,": ",n.createElement("br",null),n.createElement("br",null)," ",e.message)),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return C("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?n.createElement(o.A,{key:e.message+e.time},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null," ",e.message," (",e.role," - ",e.time,") ")),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return C("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):void 0}))),n.createElement("div",{ref:v}," ")),E&&n.createElement(i.A,null),n.createElement(l.A,{mt:2},n.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:t}}},n.createElement(g,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:h,error:y,onChange:function(e){return A(e.target.value)},onKeyUp:function(e){return k(e)},minRows:4,variant:"standard",InputProps:{endAdornment:n.createElement(m.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},n.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:b,endIcon:n.createElement(u.A,null)},"Send")),startAdornment:n.createElement(m.A,{position:"start"},"   ")}}))))},f=function(e){var t=e.id,a=e.inputsize,g=e.ChatPaper,f=e.ChatInput,E=e.chat_message,h=e.shownthinking,A=e.usermessage,y=e.setUserMessage,b=e.usermessageError,v=e.submitChat,k=e.messagesEndRef,C=e.handleEnter,_=e.check_duplicate_message,x=function(e){navigator.clipboard.writeText(e)};return n.createElement(l.A,null,n.createElement(g,{id:t,variant:"outlined"},n.createElement(c.A,{spacing:1},E.map((function(e){return"Human"==e.role?n.createElement(o.A,{key:e.time+e.message},n.createElement(l.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-line",textAlign:"right"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{align:"left"},n.createElement(p.A,{onClick:function(){return x("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"}))),n.createElement(l.A,{pt:.8,align:"right",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null," ",e.role," (",e.time,")  ",n.createElement("br",null),n.createElement("br",null)," ",e.message," "))))):e.holder?n.createElement(o.A,{key:e.holderid},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null," ",e.role," - ",e.time,": ",n.createElement("br",null),n.createElement("br",null)," ",e.message)),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return x("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?n.createElement(o.A,{key:e.message},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null," ",e.message," (",e.role," - ",e.time,") ")),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return x("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):void 0}))),n.createElement("div",{ref:k}," ")),h&&n.createElement(i.A,null),n.createElement(l.A,{mt:2},n.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:a}}},n.createElement(f,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:A,error:b,onChange:function(e){y(e.target.value),_(e.target.value)},onKeyUp:function(e){return C(e)},minRows:4,variant:"standard",InputProps:{endAdornment:n.createElement(m.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},n.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:v,endIcon:n.createElement(u.A,null)},"Send")),startAdornment:n.createElement(m.A,{position:"start"},"   ")}}))))}},92497:(e,t,a)=>{a.d(t,{I2:()=>A,Oj:()=>h,WJ:()=>y});var n=a(96540),l=a(50779),r=a(69307),o=a(29571),c=a(53215),m=a(73896),s=a(4147),i=a(29428),u=a(14073),p=a(30995),d=a(68864),g=a(98475),f=a(1405),E=a(71543),h=function(e){var t=e.choosen_model,a=e.setChoosenModel,c=e.frequencypenalty,i=e.setFrequencyPenalty,d=e.presencepenalty,f=e.setPresencePenalty,h=e.agent_objects,A=e.top_p,y=e.setTopp,b=e.temperature,v=e.setTemperature,k=e.max_tokens,C=e.setMaxToken;return n.createElement(p.A,{direction:"column",spacing:1},n.createElement(l.A,null,n.createElement(o.A,{id:"model-label"},"Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return a(e.target.value)},value:t,label:"Models",size:"small"},h.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(E.A,null),n.createElement(r.A,null,"Parameters"),n.createElement(u.A,{gutterBottom:!0},"Top_p: ",A),n.createElement(g.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return y(e.target.value)},value:A}),n.createElement(u.A,{gutterBottom:!0},"Max_tokens: ",k),n.createElement(g.Ay,{defaultValue:512,step:1,min:1,max:4090,onChange:function(e){return C(e.target.value)},value:k,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Temperature: ",b),n.createElement(g.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return v(e.target.value)},value:b,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Presence penalty: ",d),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return f(e.target.value)},value:d,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Frequency penalty: ",c),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return i(e.target.value)},value:c,valueLabelDisplay:"off"}),"   ")},A=function(e){var t=e.setSocketDestination,a=e.socket_destination,h=e.setUseMemory,A=e.choosen_model,y=e.setChoosenModel,b=e.mode,v=e.setMode,k=e.top_k,C=e.setTopk,_=e.top_p,x=e.setTopp,S=e.temperature,w=e.setTemperature,B=e.bestof,M=e.setBestof,z=e.lengthpenalty,L=e.setLengthPenalty,D=e.frequencypenalty,T=e.setFrequencyPenalty,P=e.presencepenalty,V=e.setPresencePenalty,I=e.beam,j=e.setBeam,R=e.max_tokens,O=e.setMaxToken,N=e.model_objects,q=e.agent_objects,U=e.earlystopping,W=e.setEarlyStopping;return n.createElement(l.A,{defaultValue:""},n.createElement(p.A,{direction:"column",spacing:1},n.createElement(o.A,{id:"model-label"},"Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return y(e.target.value)},value:A,label:"Models",size:"small"},N.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})),q.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)}))),n.createElement(E.A,null),n.createElement(l.A,{defaultValue:""},n.createElement(o.A,{id:"model-label"},"Backends"),n.createElement(s.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return t(e.target.value)},value:a,label:"Backends",size:"small"},n.createElement(m.A,{key:"/ws/chat/",value:"/ws/chat/"},"Celery Backend"),n.createElement(m.A,{key:"/ws/chat-async/",value:"/ws/chat-async/"},"Async Backend"))),n.createElement(E.A,null),n.createElement(r.A,{id:"demo-radio-buttons-group-label"},"Parameters"),n.createElement(d.A,{control:n.createElement(f.A,{defaultChecked:!0,onChange:function(e){return h(e.target.checked)}}),label:"Use Memory"}),n.createElement(i.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return v(e.target.value)},value:b},n.createElement(d.A,{key:"chat",value:"chat",control:n.createElement(c.A,{size:"small"}),label:"Chat Bot Mode"}),n.createElement(d.A,{key:"generate",value:"generate",control:n.createElement(c.A,{size:"small"}),label:"Sentence Completion"}),n.createElement(E.A,null)),n.createElement(u.A,{gutterBottom:!0},"Top_p: ",_),n.createElement(g.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return x(e.target.value)},value:_}),n.createElement(u.A,{gutterBottom:!0},"Top_k: ",k),n.createElement(g.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return C(e.target.value)},value:k}),n.createElement(u.A,{gutterBottom:!0},"Max_tokens: ",R),n.createElement(g.Ay,{defaultValue:512,step:1,min:1,max:4090,onChange:function(e){return O(e.target.value)},value:R,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Temperature: ",S),n.createElement(g.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return w(e.target.value)},value:S,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Presence penalty: ",P),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return V(e.target.value)},value:P,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Frequency penalty: ",D),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return T(e.target.value)},value:D,valueLabelDisplay:"off"}),n.createElement(E.A,null),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return j(e.target.checked)},value:I}),label:"Beam Search: "}),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return W(e.target.checked)},value:U}),label:"Early Stopping: "}),n.createElement(u.A,{gutterBottom:!0},"Best_of: ",B),n.createElement(g.Ay,{onChange:function(e){return M(e.target.value)},value:B,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Length penalty: ",z),n.createElement(g.Ay,{onChange:function(e){return L(e.target.value)},value:z,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"})))},y=function(e){var t=e.template_list,a=e.setUseMemory,h=e.setDuplicateMessage,A=e.choosen_chat_model,y=e.choosen_template,b=e.setChoosenTemplate,v=e.setChoosenChatModel,k=e.choosen_agent_model,C=e.setChoosenAgentModel,_=e.mode,x=e.setMode,S=e.top_k,w=e.setTopk,B=e.top_p,M=e.setTopp,z=e.temperature,L=e.setTemperature,D=e.bestof,T=e.setBestof,P=e.lengthpenalty,V=e.setLengthPenalty,I=e.frequencypenalty,j=e.setFrequencyPenalty,R=e.presencepenalty,O=e.setPresencePenalty,N=e.beam,q=e.setBeam,U=e.max_tokens,W=e.setMaxToken,F=e.model_objects,H=e.agent_objects,J=e.earlystopping,K=e.setEarlyStopping,X=e.socket_destination,$=e.setSocketDestination;return n.createElement(p.A,{direction:"column",spacing:1},n.createElement(l.A,{defaultValue:""},n.createElement(o.A,{id:"model-label"},"Backends"),n.createElement(s.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return $(e.target.value)},value:X,label:"Backends",size:"small"},n.createElement(m.A,{key:"none_async",value:"none_async"},"Celery Backend"),n.createElement(m.A,{key:"async",value:"async"},"Async Backend"))),n.createElement(l.A,null,n.createElement(o.A,{id:"model-label"},"Chat Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return v(e.target.value)},value:A,label:"Models",size:"small"},H.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})),F.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(l.A,null,n.createElement(o.A,{id:"model-label"},"Agent Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return C(e.target.value)},value:k,label:"Models",size:"small"},H.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(l.A,null,n.createElement(o.A,{id:"agent-label"},"Agents"),n.createElement(s.A,{labelId:"agent-label",id:"agent-select",onChange:function(e){b(e.target.value),swap_template(e.target.value)},value:y,label:"Agents",size:"small"},t.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(E.A,null),n.createElement(r.A,{id:"demo-radio-buttons-group-label"},"Parameters"),n.createElement(d.A,{control:n.createElement(f.A,{defaultChecked:!0,onChange:function(e){return h(e.target.checked)}}),label:"Duplicate Message"}),n.createElement(d.A,{control:n.createElement(f.A,{defaultChecked:!0,onChange:function(e){return a(e.target.checked)}}),label:"Use Memory"}),n.createElement(i.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return x(e.target.value)},value:_},n.createElement(d.A,{key:"chat",value:"chat",control:n.createElement(c.A,{size:"small"}),label:"Chat Bot Mode"}),n.createElement(d.A,{key:"generate",value:"generate",control:n.createElement(c.A,{size:"small"}),label:"Sentence Completion"}),n.createElement(E.A,null)),n.createElement(u.A,{gutterBottom:!0},"Top_p: ",B),n.createElement(g.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return M(e.target.value)},value:B}),n.createElement(u.A,{gutterBottom:!0},"Top_k: ",S),n.createElement(g.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return w(e.target.value)},value:S}),n.createElement(u.A,{gutterBottom:!0},"Max_tokens: ",U),n.createElement(g.Ay,{defaultValue:512,step:1,min:1,max:4090,onChange:function(e){return W(e.target.value)},value:U,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Temperature: ",z),n.createElement(g.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return L(e.target.value)},value:z,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Presence penalty: ",R),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return O(e.target.value)},value:R,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Frequency penalty: ",I),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return j(e.target.value)},value:I,valueLabelDisplay:"off"}),n.createElement(E.A,null),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return q(e.target.checked)},value:N}),label:"Beam Search: "}),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return K(e.target.checked)},value:J}),label:"Early Stopping: "}),n.createElement(u.A,{gutterBottom:!0},"Best_of: ",D),n.createElement(g.Ay,{onChange:function(e){return T(e.target.value)},value:D,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),n.createElement(u.A,{gutterBottom:!0},"Length penalty: ",P),n.createElement(g.Ay,{onChange:function(e){return V(e.target.value)},value:P,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"}))}},6276:(e,t,a)=>{function n(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?l(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e,t,a,l){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var r=JSON.parse(e.data);if(r){"Human"==r.role||"Server"==r.role||r.holder?(r.holder&&(a(!0),r.message=""),t((function(e){return[].concat(n(e),[{holder:r.holder,holderid:r.holderid,role:r.role,time:r.time,credit:r.credit,message:r.message}])}))):(a(!1),t((function(e){return[].concat(n(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=r.message}])})));var o=l.getElementById("chat-log");o.scrollTop=o.scrollHeight}}}function o(e,t,a,l,r,o,c,m,s,i){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var u=JSON.parse(e.data);if(u){if(u.hasOwnProperty("swap_template")){r(u.swap_instruction),o(u.default_child_instruct);var p=[];for(var d in u.child_template_name_list)p.push({name:u.child_template_name_list[d]});c(p),m&&m(JSON.parse(u.swap_template)),i&&i.current.render(JSON.parse(u.swap_template)),u.message=""}else u.hasOwnProperty("child_instruct")?(o(u.child_instruct),u.message=""):u.hasOwnProperty("paragraph")&&s&&(s(u.paragraph),u.message="");if("Human"==u.role||"Server"==u.role||u.holder)u.holder&&(a(!0),u.message=""),t((function(e){return[].concat(n(e),[{holder:u.holder,holderid:u.holderid,role:u.role,time:u.time,credit:u.credit,message:u.message}])}));else if(u.hasOwnProperty("agent_action")){if("STOP"==u.agent_action||"NEXT"==u.agent_action){var g={type:"paragraph",data:{text:u.full_result.replace(/\n/g,"<br>")}};i.current.blocks.insert(g.type,g.data,null,u.result_id)}}else a(!1),t((function(e){return[].concat(n(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=u.message}])}));if(!(f=l.getElementById("chat-log")))var f=l.getElementById("chat-log-agent");f.scrollTop=f.scrollHeight}}}a.d(t,{j:()=>o,u:()=>r})}}]);