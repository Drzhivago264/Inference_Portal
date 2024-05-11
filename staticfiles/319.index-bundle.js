"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[319],{83248:(e,t,a)=>{a.d(t,{a:()=>f,s:()=>g});var n=a(96540),l=a(69067),r=a(48139),o=a(60538),c=a(30995),m=a(25239),s=a(8239),u=a(87458),i=a(40443),p=a(11641),d=a(70177),g=function(e){var t=e.inputsize,a=e.ChatPaper,g=e.ChatInput,f=e.chat_message,E=e.shownthinking,A=e.usermessage,h=e.setUserMessage,y=e.usermessageError,b=e.submitChat,v=e.messagesEndRef,k=e.handleEnter,C=function(e){navigator.clipboard.writeText(e)};return n.createElement(l.A,null,n.createElement(a,{id:"chat-log",variant:"outlined"},n.createElement(c.A,{spacing:1},f.map((function(e){return"Human"==e.role?n.createElement(o.A,{key:e.time},n.createElement(l.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-line",textAlign:"right"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{align:"left"},n.createElement(p.A,{onClick:function(){return C("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"}))),n.createElement(l.A,{pt:.8,align:"right"},n.createElement("span",null," ",e.role," (",e.time,")  ",n.createElement("br",null),n.createElement("br",null)," ",e.message," "))))):e.holder?n.createElement(o.A,{key:e.holderid},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left"},n.createElement("span",null," ",e.role," - ",e.time,": ",n.createElement("br",null),n.createElement("br",null)," ",e.message)),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return C("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?n.createElement(o.A,{key:e.message+e.time},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left"},n.createElement("span",null," ",e.message," (",e.role," - ",e.time,") ")),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return C("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):void 0}))),n.createElement("div",{ref:v}," ")),E&&n.createElement(u.A,null),n.createElement(l.A,{mt:2},n.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:t}}},n.createElement(g,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:A,error:y,onChange:function(e){return h(e.target.value)},onKeyUp:function(e){return k(e)},minRows:4,variant:"standard",InputProps:{endAdornment:n.createElement(m.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},n.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:b,endIcon:n.createElement(i.A,null)},"Send")),startAdornment:n.createElement(m.A,{position:"start"},"   ")}}))))},f=function(e){var t=e.id,a=e.inputsize,g=e.ChatPaper,f=e.ChatInput,E=e.chat_message,A=e.shownthinking,h=e.usermessage,y=e.setUserMessage,b=e.usermessageError,v=e.submitChat,k=e.messagesEndRef,C=e.handleEnter,_=e.check_duplicate_message,x=function(e){navigator.clipboard.writeText(e)};return n.createElement(l.A,null,n.createElement(g,{id:t,variant:"outlined"},n.createElement(c.A,{spacing:1},E.map((function(e){return"Human"==e.role?n.createElement(o.A,{key:e.time+e.message},n.createElement(l.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-line",textAlign:"right"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{align:"left"},n.createElement(p.A,{onClick:function(){return x("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"}))),n.createElement(l.A,{pt:.8,align:"right"},n.createElement("span",null," ",e.role," (",e.time,")  ",n.createElement("br",null),n.createElement("br",null)," ",e.message," "))))):e.holder?n.createElement(o.A,{key:e.holderid},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left"},n.createElement("span",null," ",e.role," - ",e.time,": ",n.createElement("br",null),n.createElement("br",null)," ",e.message)),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return x("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?n.createElement(o.A,{key:e.message},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},n.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left"},n.createElement("span",null," ",e.message," (",e.role," - ",e.time,") ")),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return x("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},n.createElement(d.A,{fontSize:"small"})))))):void 0}))),n.createElement("div",{ref:k}," ")),A&&n.createElement(u.A,null),n.createElement(l.A,{mt:2},n.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:a}}},n.createElement(f,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:h,error:b,onChange:function(e){y(e.target.value),_(e.target.value)},onKeyUp:function(e){return C(e)},minRows:4,variant:"standard",InputProps:{endAdornment:n.createElement(m.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},n.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:v,endIcon:n.createElement(i.A,null)},"Send")),startAdornment:n.createElement(m.A,{position:"start"},"   ")}}))))}},92497:(e,t,a)=>{a.d(t,{I2:()=>h,Oj:()=>A,WJ:()=>y});var n=a(96540),l=a(50779),r=a(69307),o=a(29571),c=a(53215),m=a(73896),s=a(4147),u=a(29428),i=a(14073),p=a(30995),d=a(68864),g=a(98475),f=a(1405),E=a(71543),A=function(e){var t=e.choosen_model,a=e.setChoosenModel,c=e.frequencypenalty,u=e.setFrequencyPenalty,d=e.presencepenalty,f=e.setPresencePenalty,A=e.agent_objects,h=e.top_p,y=e.setTopp,b=e.temperature,v=e.setTemperature,k=e.max_tokens,C=e.setMaxToken;return n.createElement(p.A,{direction:"column",spacing:1},n.createElement(l.A,null,n.createElement(o.A,{id:"model-label"},"Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return a(e.target.value)},value:t,label:"Models",size:"small"},A.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(E.A,null),n.createElement(r.A,null,"Parameters"),n.createElement(i.A,{gutterBottom:!0},"Top_p: ",h),n.createElement(g.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return y(e.target.value)},value:h}),n.createElement(i.A,{gutterBottom:!0},"Max_tokens: ",k),n.createElement(g.Ay,{defaultValue:512,step:1,min:1,max:4090,onChange:function(e){return C(e.target.value)},value:k,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Temperature: ",b),n.createElement(g.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return v(e.target.value)},value:b,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Presence penalty: ",d),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return f(e.target.value)},value:d,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Frequency penalty: ",c),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return u(e.target.value)},value:c,valueLabelDisplay:"off"}),"   ")},h=function(e){var t=e.setSocketDestination,a=e.socket_destination,A=e.setUseMemory,h=e.choosen_model,y=e.setChoosenModel,b=e.mode,v=e.setMode,k=e.top_k,C=e.setTopk,_=e.top_p,x=e.setTopp,S=e.temperature,B=e.setTemperature,w=e.bestof,M=e.setBestof,z=e.lengthpenalty,L=e.setLengthPenalty,D=e.frequencypenalty,P=e.setFrequencyPenalty,T=e.presencepenalty,V=e.setPresencePenalty,I=e.beam,j=e.setBeam,R=e.max_tokens,O=e.setMaxToken,N=e.model_objects,q=e.agent_objects,U=e.earlystopping,W=e.setEarlyStopping;return n.createElement(l.A,{defaultValue:""},n.createElement(p.A,{direction:"column",spacing:1},n.createElement(o.A,{id:"model-label"},"Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return y(e.target.value)},value:h,label:"Models",size:"small"},N.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})),q.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)}))),n.createElement(E.A,null),n.createElement(l.A,{defaultValue:""},n.createElement(o.A,{id:"model-label"},"Backends"),n.createElement(s.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return t(e.target.value)},value:a,label:"Backends",size:"small"},n.createElement(m.A,{key:"/ws/chat/",value:"/ws/chat/"},"Celery Backend"),n.createElement(m.A,{key:"/ws/chat-async/",value:"/ws/chat-async/"},"Async Backend"))),n.createElement(E.A,null),n.createElement(r.A,{id:"demo-radio-buttons-group-label"},"Parameters"),n.createElement(d.A,{control:n.createElement(f.A,{defaultChecked:!0,onChange:function(e){return A(e.target.checked)}}),label:"Use Memory"}),n.createElement(u.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return v(e.target.value)},value:b},n.createElement(d.A,{key:"chat",value:"chat",control:n.createElement(c.A,{size:"small"}),label:"Chat Bot Mode"}),n.createElement(d.A,{key:"generate",value:"generate",control:n.createElement(c.A,{size:"small"}),label:"Sentence Completion"}),n.createElement(E.A,null)),n.createElement(i.A,{gutterBottom:!0},"Top_p: ",_),n.createElement(g.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return x(e.target.value)},value:_}),n.createElement(i.A,{gutterBottom:!0},"Top_k: ",k),n.createElement(g.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return C(e.target.value)},value:k}),n.createElement(i.A,{gutterBottom:!0},"Max_tokens: ",R),n.createElement(g.Ay,{defaultValue:512,step:1,min:1,max:4090,onChange:function(e){return O(e.target.value)},value:R,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Temperature: ",S),n.createElement(g.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return B(e.target.value)},value:S,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Presence penalty: ",T),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return V(e.target.value)},value:T,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Frequency penalty: ",D),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return P(e.target.value)},value:D,valueLabelDisplay:"off"}),n.createElement(E.A,null),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return j(e.target.checked)},value:I}),label:"Beam Search: "}),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return W(e.target.checked)},value:U}),label:"Early Stopping: "}),n.createElement(i.A,{gutterBottom:!0},"Best_of: ",w),n.createElement(g.Ay,{onChange:function(e){return M(e.target.value)},value:w,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Length penalty: ",z),n.createElement(g.Ay,{onChange:function(e){return L(e.target.value)},value:z,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"})))},y=function(e){var t=e.template_list,a=e.setUseMemory,A=e.setDuplicateMessage,h=e.choosen_chat_model,y=e.choosen_template,b=e.setChoosenTemplate,v=e.setChoosenChatModel,k=e.choosen_agent_model,C=e.setChoosenAgentModel,_=e.mode,x=e.setMode,S=e.top_k,B=e.setTopk,w=e.top_p,M=e.setTopp,z=e.temperature,L=e.setTemperature,D=e.bestof,P=e.setBestof,T=e.lengthpenalty,V=e.setLengthPenalty,I=e.frequencypenalty,j=e.setFrequencyPenalty,R=e.presencepenalty,O=e.setPresencePenalty,N=e.beam,q=e.setBeam,U=e.max_tokens,W=e.setMaxToken,F=e.model_objects,H=e.agent_objects,J=e.earlystopping,K=e.setEarlyStopping,$=e.socket_destination,G=e.setSocketDestination;return n.createElement(p.A,{direction:"column",spacing:1},n.createElement(l.A,{defaultValue:""},n.createElement(o.A,{id:"model-label"},"Backends"),n.createElement(s.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return G(e.target.value)},value:$,label:"Backends",size:"small"},n.createElement(m.A,{key:"none_async",value:"none_async"},"Celery Backend"),n.createElement(m.A,{key:"async",value:"async"},"Async Backend"))),n.createElement(l.A,null,n.createElement(o.A,{id:"model-label"},"Chat Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return v(e.target.value)},value:h,label:"Models",size:"small"},H.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})),F.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(l.A,null,n.createElement(o.A,{id:"model-label"},"Agent Models"),n.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return C(e.target.value)},value:k,label:"Models",size:"small"},H.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(l.A,null,n.createElement(o.A,{id:"agent-label"},"Agents"),n.createElement(s.A,{labelId:"agent-label",id:"agent-select",onChange:function(e){b(e.target.value),swap_template(e.target.value)},value:y,label:"Agents",size:"small"},t.map((function(e){return n.createElement(m.A,{key:e.name,value:e.name},e.name)})))),n.createElement(E.A,null),n.createElement(r.A,{id:"demo-radio-buttons-group-label"},"Parameters"),n.createElement(d.A,{control:n.createElement(f.A,{defaultChecked:!0,onChange:function(e){return A(e.target.checked)}}),label:"Duplicate Message"}),n.createElement(d.A,{control:n.createElement(f.A,{defaultChecked:!0,onChange:function(e){return a(e.target.checked)}}),label:"Use Memory"}),n.createElement(u.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return x(e.target.value)},value:_},n.createElement(d.A,{key:"chat",value:"chat",control:n.createElement(c.A,{size:"small"}),label:"Chat Bot Mode"}),n.createElement(d.A,{key:"generate",value:"generate",control:n.createElement(c.A,{size:"small"}),label:"Sentence Completion"}),n.createElement(E.A,null)),n.createElement(i.A,{gutterBottom:!0},"Top_p: ",w),n.createElement(g.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return M(e.target.value)},value:w}),n.createElement(i.A,{gutterBottom:!0},"Top_k: ",S),n.createElement(g.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return B(e.target.value)},value:S}),n.createElement(i.A,{gutterBottom:!0},"Max_tokens: ",U),n.createElement(g.Ay,{defaultValue:512,step:1,min:1,max:4090,onChange:function(e){return W(e.target.value)},value:U,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Temperature: ",z),n.createElement(g.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return L(e.target.value)},value:z,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Presence penalty: ",R),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return O(e.target.value)},value:R,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Frequency penalty: ",I),n.createElement(g.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return j(e.target.value)},value:I,valueLabelDisplay:"off"}),n.createElement(E.A,null),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return q(e.target.checked)},value:N}),label:"Beam Search: "}),n.createElement(d.A,{control:n.createElement(f.A,{onChange:function(e){return K(e.target.checked)},value:J}),label:"Early Stopping: "}),n.createElement(i.A,{gutterBottom:!0},"Best_of: ",D),n.createElement(g.Ay,{onChange:function(e){return P(e.target.value)},value:D,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),n.createElement(i.A,{gutterBottom:!0},"Length penalty: ",T),n.createElement(g.Ay,{onChange:function(e){return V(e.target.value)},value:T,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"}))}},6276:(e,t,a)=>{function n(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?l(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e,t,a,l){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var r=JSON.parse(e.data);if(r){"Human"==r.role||"Server"==r.role||r.holder?(r.holder&&(a(!0),r.message=""),t((function(e){return[].concat(n(e),[{holder:r.holder,holderid:r.holderid,role:r.role,time:r.time,credit:r.credit,message:r.message}])}))):(a(!1),t((function(e){return[].concat(n(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=r.message}])})));var o=l.getElementById("chat-log");o.scrollTop=o.scrollHeight}}}function o(e,t,a,l,r,o,c,m,s,u){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var i=JSON.parse(e.data);if(i){if(i.hasOwnProperty("swap_template")){r(i.swap_instruction),o(i.default_child_instruct);var p=[];for(var d in i.child_template_name_list)p.push({name:i.child_template_name_list[d]});c(p),m&&m(JSON.parse(i.swap_template)),u&&u.current.render(JSON.parse(i.swap_template)),i.message=""}else i.hasOwnProperty("child_instruct")?(o(i.child_instruct),i.message=""):i.hasOwnProperty("paragraph")&&s&&(s(i.paragraph),i.message="");if("Human"==i.role||"Server"==i.role||i.holder)i.holder&&(a(!0),i.message=""),t((function(e){return[].concat(n(e),[{holder:i.holder,holderid:i.holderid,role:i.role,time:i.time,credit:i.credit,message:i.message}])}));else if(i.hasOwnProperty("agent_action")){if("STOP"==i.agent_action){var g={type:"paragraph",data:{text:i.full_result.replace(/\n/g,"<br>")}};u.current.blocks.insert(g.type,g.data,null,i.result_id)}}else a(!1),t((function(e){return[].concat(n(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=i.message}])}));if(!(f=l.getElementById("chat-log")))var f=l.getElementById("chat-log-agent");f.scrollTop=f.scrollHeight}}}a.d(t,{j:()=>o,u:()=>r})}}]);