"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[319],{83248:(e,t,a)=>{a.d(t,{a:()=>f,s:()=>d});var n=a(96540),l=a(69067),r=a(48139),o=a(60538),u=a(30995),i=a(25239),c=a(8239),m=a(87458),s=a(40443),p=a(11641),g=a(70177),d=function(e){var t=e.inputsize,a=e.ChatPaper,d=e.ChatInput,f=e.chat_message,E=e.shownthinking,b=e.usermessage,y=e.setUserMessage,h=e.usermessageError,A=e.submitChat,v=e.messagesEndRef,x=e.handleEnter,C=function(e){navigator.clipboard.writeText(e)};return n.createElement(l.A,null,n.createElement(a,{id:"chat-log",variant:"outlined"},n.createElement(u.A,{spacing:1},f.map((function(e){return"Human"==e.role?n.createElement(o.A,{key:e.time},n.createElement(l.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container"},n.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{align:"left"},n.createElement(p.A,{onClick:function(){return C("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(g.A,{fontSize:"small"}))),n.createElement(l.A,{pt:.8},n.createElement(l.A,{textAlign:"right"},e.role," (",e.time,")"),n.createElement(l.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap",width:"100%"}},e.message))))):e.holder?n.createElement(o.A,{key:e.holderid},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},n.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},n.createElement("span",null,e.role," - ",e.time,": ",n.createElement("br",null),n.createElement("br",null),e.message)),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return C("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(g.A,{fontSize:"small"})))))):"Server"==e.role?n.createElement(o.A,{key:e.message+e.time},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},n.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return C("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},n.createElement(g.A,{fontSize:"small"})))))):void 0})),n.createElement("div",{ref:v}," "))),E&&n.createElement(m.A,null),n.createElement(l.A,{mt:2},n.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:t}}},n.createElement(d,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:b,error:h,onChange:function(e){return y(e.target.value)},onKeyUp:function(e){return x(e)},minRows:4,variant:"standard",InputProps:{endAdornment:n.createElement(i.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},n.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:A,endIcon:n.createElement(s.A,null)},"Send")),startAdornment:n.createElement(i.A,{position:"start"},"   ")}}))))},f=function(e){var t=e.id,a=e.inputsize,d=e.ChatPaper,f=e.ChatInput,E=e.chat_message,b=e.shownthinking,y=e.usermessage,h=e.setUserMessage,A=e.usermessageError,v=e.submitChat,x=e.messagesEndRef,C=e.handleEnter,_=e.check_duplicate_message,k=function(e){navigator.clipboard.writeText(e)};return n.createElement(l.A,null,n.createElement(d,{id:t,variant:"outlined"},n.createElement(u.A,{spacing:1},E.map((function(e){return"Human"==e.role?n.createElement(o.A,{key:e.time+e.message},n.createElement(l.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-wrap"}},n.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{align:"left"},n.createElement(p.A,{onClick:function(){return k("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(g.A,{fontSize:"small"}))),n.createElement(l.A,{pt:.8},n.createElement(l.A,{textAlign:"right"},e.role," (",e.time,")"),n.createElement(l.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap"}},e.message))))):e.holder?n.createElement(o.A,{key:e.holderid},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},n.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},n.createElement("span",null,e.role," - ",e.time,": ",n.createElement("br",null),n.createElement("br",null),e.message)),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return k("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},n.createElement(g.A,{fontSize:"small"})))))):"Server"==e.role?n.createElement(o.A,{key:e.message},n.createElement(l.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},n.createElement(c.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},n.createElement(l.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},n.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),n.createElement(l.A,{align:"right"},n.createElement(p.A,{onClick:function(){return k("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},n.createElement(g.A,{fontSize:"small"})))))):void 0})),n.createElement("div",{ref:x}," "))),b&&n.createElement(m.A,null),n.createElement(l.A,{mt:2},n.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:a}}},n.createElement(f,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:y,error:A,onChange:function(e){h(e.target.value),_(e.target.value)},onKeyUp:function(e){return C(e)},minRows:4,variant:"standard",InputProps:{endAdornment:n.createElement(i.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},n.createElement(r.A,{sx:{height:32},variant:"contained",size:"small",onClick:v,endIcon:n.createElement(s.A,null)},"Send")),startAdornment:n.createElement(i.A,{position:"start"},"   ")}}))))}},92497:(e,t,a)=>{a.d(t,{I2:()=>B,Oj:()=>w,WJ:()=>z});var n,l,r=a(96540),o=a(50779),u=a(69307),i=a(29571),c=a(53215),m=a(73896),s=a(4147),p=a(29428),g=a(14073),d=a(30995),f=a(68864),E=a(98475),b=a(1405),y=a(71543),h=a(77623),A=a(69067),v=a(11848);function x(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var C=(0,v.Ay)(h.A)(n||(n=x(["\n  max-width: 50px;\n"]))),_=(0,v.Ay)(h.A)(l||(l=x(["\n  max-width: 60px;\n"]))),k=function(e,t,a,n){e&&(e<a?t(a):e>n&&t(n))},w=function(e){var t=e.choosen_model,a=e.setChoosenModel,n=e.frequencypenalty,l=e.setFrequencyPenalty,c=e.presencepenalty,p=e.setPresencePenalty,f=e.agent_objects,b=e.top_p,h=e.setTopp,v=e.temperature,x=e.setTemperature,w=e.max_tokens,B=e.setMaxToken,z=e.max_turn,P=e.setMaxTurn;return r.createElement(d.A,{direction:"column",spacing:1},r.createElement(o.A,null,r.createElement(i.A,{id:"model-label"},"Models"),r.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return a(e.target.value)},value:t,label:"Models",size:"small"},f.map((function(e){return r.createElement(m.A,{key:e.name,value:e.name},e.name)})))),r.createElement(y.A,null),r.createElement(u.A,null,"Parameters"),z&&r.createElement(A.A,null,r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Max_turns:"),r.createElement(C,{value:z,size:"small",onChange:function(e){return P(""===e.target.value?0:Number(e.target.value))},onBlur:k(z,P,1,10),inputProps:{step:1,min:0,max:10,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{step:1,min:1,max:10,marks:!0,valueLabelDisplay:"off",onChange:function(e){return P(e.target.value)},value:z})),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Top_p: "),r.createElement(C,{value:b,size:"small",onChange:function(e){return h(""===e.target.value?0:Number(e.target.value))},onBlur:k(b,h,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return h(e.target.value)},value:b}),f.map((function(e){if(e.name==t)return r.createElement(A.A,null,r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Max_tokens: "),r.createElement(_,{value:w,size:"small",onChange:function(e){return B(""===e.target.value?0:Number(e.target.value))},onBlur:k(w,B,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return B(e.target.value)},value:w,valueLabelDisplay:"off"}))})),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Temperature: "),r.createElement(C,{value:v,size:"small",onChange:function(e){return x(""===e.target.value?0:Number(e.target.value))},onBlur:k(v,x,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return x(e.target.value)},value:v,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Presence penalty: "),r.createElement(C,{value:c,size:"small",onChange:function(e){return p(""===e.target.value?0:Number(e.target.value))},onBlur:k(c,p,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return p(e.target.value)},value:c,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Frequency penalty: "),r.createElement(C,{value:n,size:"small",onChange:function(e){return l(""===e.target.value?0:Number(e.target.value))},onBlur:k(n,l,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return l(e.target.value)},value:n,valueLabelDisplay:"off"}))},B=function(e){var t=e.setSocketDestination,a=e.socket_destination,n=e.setUseMemory,l=e.choosen_model,h=e.setChoosenModel,v=e.mode,x=e.setMode,_=e.top_k,w=e.setTopk,B=e.top_p,z=e.setTopp,P=e.temperature,S=e.setTemperature,M=e.bestof,N=e.setBestof,L=e.lengthpenalty,T=e.setLengthPenalty,D=e.frequencypenalty,V=e.setFrequencyPenalty,j=e.presencepenalty,I=e.setPresencePenalty,O=e.beam,R=e.setBeam,q=e.max_tokens,U=e.setMaxToken,W=e.model_objects,F=e.agent_objects,H=e.earlystopping,J=e.setEarlyStopping;return r.createElement(o.A,{fullWidth:!0,defaultValue:""},r.createElement(d.A,{direction:"column",spacing:1},r.createElement(i.A,{id:"model-label"},"Models"),r.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return h(e.target.value)},value:l,label:"Models",size:"small"},W.map((function(e){return r.createElement(m.A,{key:e.name,value:e.name},e.name)})),F.map((function(e){return r.createElement(m.A,{key:e.name,value:e.name},e.name)}))),r.createElement(y.A,null),r.createElement(o.A,{defaultValue:""},r.createElement(i.A,{id:"model-label"},"Backends"),r.createElement(s.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return t(e.target.value)},value:a,label:"Backends",size:"small"},r.createElement(m.A,{key:"/ws/chat/",value:"/ws/chat/"},"Celery Backend"),r.createElement(m.A,{key:"/ws/chat-async/",value:"/ws/chat-async/"},"Async Backend"))),r.createElement(y.A,null),r.createElement(u.A,{id:"demo-radio-buttons-group-label"},"Parameters"),r.createElement(f.A,{control:r.createElement(b.A,{defaultChecked:!0,onChange:function(e){return n(e.target.checked)}}),label:"Use Memory"}),r.createElement(p.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return x(e.target.value)},value:v},r.createElement(f.A,{key:"chat",value:"chat",control:r.createElement(c.A,{size:"small"}),label:"Chat Bot Mode"}),r.createElement(f.A,{key:"generate",value:"generate",control:r.createElement(c.A,{size:"small"}),label:"Text Completion"}),r.createElement(y.A,null)),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Top_p: "),r.createElement(C,{value:B,size:"small",onChange:function(e){return z(""===e.target.value?0:Number(e.target.value))},onBlur:k(B,z,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return z(e.target.value)},value:B}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Top_k: "),r.createElement(C,{value:_,size:"small",onChange:function(e){return w(""===e.target.value?0:Number(e.target.value))},onBlur:k(_,w,-1,100),inputProps:{step:1,min:-1,max:100,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return w(e.target.value)},value:_}),F.map((function(e){if(e.name==l)return r.createElement(A.A,null,r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Max_tokens: "),r.createElement(C,{value:q,size:"small",onChange:function(e){return U(""===e.target.value?0:Number(e.target.value))},onBlur:k(q,U,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return U(e.target.value)},value:q,valueLabelDisplay:"off"}))})),W.map((function(e){if(e.name==l)return r.createElement(A.A,null,r.createElement(g.A,{gutterBottom:!0},"Max_tokens: ",q),r.createElement(E.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return U(e.target.value)},value:q,valueLabelDisplay:"off"}))})),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Temperature: "),r.createElement(C,{value:P,size:"small",onChange:function(e){return S(""===e.target.value?0:Number(e.target.value))},onBlur:k(P,S,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return S(e.target.value)},value:P,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Presence penalty: "),r.createElement(C,{value:j,size:"small",onChange:function(e){return I(""===e.target.value?0:Number(e.target.value))},onBlur:k(j,I,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return I(e.target.value)},value:j,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Frequency penalty: "),r.createElement(C,{value:D,size:"small",onChange:function(e){return V(""===e.target.value?0:Number(e.target.value))},onBlur:k(D,V,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return V(e.target.value)},value:D,valueLabelDisplay:"off"}),r.createElement(y.A,null),r.createElement(d.A,{direction:"row"},r.createElement(f.A,{control:r.createElement(b.A,{onChange:function(e){return R(e.target.checked)},value:O}),label:"Beam Search"}),r.createElement(f.A,{control:r.createElement(b.A,{onChange:function(e){return J(e.target.checked)},value:H}),label:"Early Stopping"})),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Best_of:"),r.createElement(C,{value:M,size:"small",onChange:function(e){return N(""===e.target.value?0:Number(e.target.value))},onBlur:k(M,N,1,5),inputProps:{step:1,min:1,max:5,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{onChange:function(e){return N(e.target.value)},value:M,marks:!0,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Length penalty:"),r.createElement(C,{value:L,size:"small",onChange:function(e){return T(""===e.target.value?0:Number(e.target.value))},onBlur:k(L,T,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{onChange:function(e){return T(e.target.value)},value:L,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"})))},z=function(e){var t=e.template_list,a=e.setUseMemory,n=e.setDuplicateMessage,l=e.choosen_chat_model,h=e.choosen_template,v=e.setChoosenTemplate,x=e.setChoosenChatModel,w=e.choosen_agent_model,B=e.setChoosenAgentModel,z=e.mode,P=e.setMode,S=e.top_k,M=e.setTopk,N=e.top_p,L=e.setTopp,T=e.temperature,D=e.setTemperature,V=e.bestof,j=e.setBestof,I=e.lengthpenalty,O=e.setLengthPenalty,R=e.frequencypenalty,q=e.setFrequencyPenalty,U=e.presencepenalty,W=e.setPresencePenalty,F=e.beam,H=e.setBeam,J=e.max_tokens,K=e.setMaxToken,X=e.model_objects,Y=e.agent_objects,$=e.earlystopping,G=e.setEarlyStopping,Q=e.socket_destination,Z=e.setSocketDestination,ee=e.swap_template,te=e.max_turn,ae=e.setMaxTurn;return r.createElement(d.A,{direction:"column",spacing:1},r.createElement(o.A,{defaultValue:""},r.createElement(i.A,{id:"model-label"},"Backends"),r.createElement(s.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return Z(e.target.value)},value:Q,label:"Backends",size:"small"},r.createElement(m.A,{key:"none_async",value:"none_async"},"Celery Backend"),r.createElement(m.A,{key:"async",value:"async"},"Async Backend"))),r.createElement(o.A,null,r.createElement(i.A,{id:"model-label"},"Chat Models"),r.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return x(e.target.value)},value:l,label:"Models",size:"small"},Y.map((function(e){return r.createElement(m.A,{key:e.name,value:e.name},e.name)})),X.map((function(e){return r.createElement(m.A,{key:e.name,value:e.name},e.name)})))),r.createElement(o.A,null,r.createElement(i.A,{id:"model-label"},"Agent Models"),r.createElement(s.A,{labelId:"model-label",id:"model-select",onChange:function(e){return B(e.target.value)},value:w,label:"Models",size:"small"},Y.map((function(e){return r.createElement(m.A,{key:e.name,value:e.name},e.name)})))),r.createElement(o.A,null,r.createElement(i.A,{id:"agent-label"},"Agents"),r.createElement(s.A,{labelId:"agent-label",id:"agent-select",onChange:function(e){v(e.target.value),ee(e.target.value)},value:h,label:"Agents",size:"small"},t.map((function(e){return r.createElement(m.A,{key:e.name,value:e.name},e.name)})))),r.createElement(y.A,null),r.createElement(u.A,{id:"demo-radio-buttons-group-label"},"Parameters"),r.createElement(f.A,{control:r.createElement(b.A,{defaultChecked:!0,onChange:function(e){return n(e.target.checked)}}),label:"Duplicate Message"}),r.createElement(f.A,{control:r.createElement(b.A,{defaultChecked:!0,onChange:function(e){return a(e.target.checked)}}),label:"Use Memory"}),r.createElement(p.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return P(e.target.value)},value:z},r.createElement(f.A,{key:"chat",value:"chat",control:r.createElement(c.A,{size:"small"}),label:"Chat Bot Mode"}),r.createElement(f.A,{key:"generate",value:"generate",control:r.createElement(c.A,{size:"small"}),label:"Text Completion"}),r.createElement(y.A,null)),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Max_turns: "),r.createElement(C,{value:te,size:"small",onChange:function(e){return ae(""===e.target.value?0:Number(e.target.value))},onBlur:k(te,ae,1,10),inputProps:{step:1,min:1,max:10,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{step:1,min:1,max:10,marks:!0,valueLabelDisplay:"off",onChange:function(e){return ae(e.target.value)},value:te}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Top_p: "),r.createElement(C,{value:N,size:"small",onChange:function(e){return L(""===e.target.value?0:Number(e.target.value))},onBlur:k(N,L,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return L(e.target.value)},value:N}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Top_k: "),r.createElement(C,{value:S,size:"small",onChange:function(e){return M(""===e.target.value?0:Number(e.target.value))},onBlur:k(S,M,-1,100),inputProps:{step:1,min:-1,max:100,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return M(e.target.value)},value:S}),Y.map((function(e){if(e.name==l)return r.createElement(A.A,null,r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Max_tokens: "),r.createElement(_,{value:J,size:"small",onChange:function(e){return K(""===e.target.value?0:Number(e.target.value))},onBlur:k(J,K,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return K(e.target.value)},value:J,valueLabelDisplay:"off"}))})),X.map((function(e){if(e.name==l)return r.createElement(A.A,null,r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Max_tokens: "),r.createElement(_,{value:J,size:"small",onChange:function(e){return K(""===e.target.value?0:Number(e.target.value))},onBlur:k(J,K,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return K(e.target.value)},value:J,valueLabelDisplay:"off"}))})),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Temperature: "),r.createElement(C,{value:T,size:"small",onChange:function(e){return D(""===e.target.value?0:Number(e.target.value))},onBlur:k(T,D,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return D(e.target.value)},value:T,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Presence penalty: "),r.createElement(C,{value:U,size:"small",onChange:function(e){return W(""===e.target.value?0:Number(e.target.value))},onBlur:k(U,W,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return W(e.target.value)},value:U,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Frequency penalty: "),r.createElement(C,{value:R,size:"small",onChange:function(e){return q(""===e.target.value?0:Number(e.target.value))},onBlur:k(R,q,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return q(e.target.value)},value:R,valueLabelDisplay:"off"}),r.createElement(y.A,null),r.createElement(d.A,{direction:"row"},r.createElement(f.A,{control:r.createElement(b.A,{onChange:function(e){return H(e.target.checked)},value:F}),label:"Beam Search"}),r.createElement(f.A,{control:r.createElement(b.A,{onChange:function(e){return G(e.target.checked)},value:$}),label:"Early Stopping"})),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Best_of:"),r.createElement(C,{value:V,size:"small",onChange:function(e){return j(""===e.target.value?0:Number(e.target.value))},onBlur:k(V,j,1,5),inputProps:{step:1,min:1,max:5,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{onChange:function(e){return j(e.target.value)},value:V,marks:!0,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),r.createElement(d.A,{direction:"row",spacing:1},r.createElement(g.A,{gutterBottom:!0},"Length penalty:"),r.createElement(C,{value:I,size:"small",onChange:function(e){return O(""===e.target.value?0:Number(e.target.value))},onBlur:k(I,O,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),r.createElement(E.Ay,{onChange:function(e){return O(e.target.value)},value:I,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"}))}},6276:(e,t,a)=>{function n(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return l(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?l(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function r(e,t,a,l){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var r=JSON.parse(e.data);if(r){"Human"==r.role||"Server"==r.role||r.holder?(r.holder&&(a(!0),r.message=""),t((function(e){return[].concat(n(e),[{holder:r.holder,holderid:r.holderid,role:r.role,time:r.time,credit:r.credit,message:r.message}])}))):(a(!1),t((function(e){return[].concat(n(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=r.message}])})));var o=l.getElementById("chat-log");o.scrollTop=o.scrollHeight}}}function o(e,t,a,l,r,o,u,i,c,m,s,p,g,d){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var f=JSON.parse(e.data);if(f){if(f.hasOwnProperty("swap_template")){if(i){var E=[];for(var b in f.child_template_name_list)E.push({displayed_name:f.child_template_name_list[b]});c(f.swap_instruction),m(f.default_child_instruct),s(E);var y={time:1709749130861,blocks:[{id:"1hYKvu7PTO",type:"header",data:{text:"Response",level:2}},{id:"SrV68agaen",type:"paragraph",data:{text:""}}],version:"2.29.1"};p&&p(y),d&&d.current.render(y)}else{var h=[];for(var b in f.child_template_name_list)h.push({name:f.child_template_name_list[b]});r(f.swap_instruction),o(f.default_child_instruct),u(h),p&&p(JSON.parse(f.swap_template)),d&&d.current.render(JSON.parse(f.swap_template))}f.message=""}else f.hasOwnProperty("child_instruct")?(i?m(f.child_instruct):o(f.child_instruct),f.message=""):f.hasOwnProperty("paragraph")&&g&&(g(f.paragraph),f.message="");if("Human"==f.role||"Server"==f.role||f.holder)f.holder&&(a(!0),f.message=""),t((function(e){return[].concat(n(e),[{holder:f.holder,holderid:f.holderid,role:f.role,time:f.time,credit:f.credit,message:f.message}])}));else if(f.hasOwnProperty("agent_action")){if("STOP"==f.agent_action||"NEXT"==f.agent_action){var A={type:"paragraph",data:{text:f.full_result.replace(/\n/g,"<br>")}};d.current.blocks.insert(A.type,A.data,null,f.result_id)}}else a(!1),t((function(e){return[].concat(n(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=f.message}])}));if(!(v=l.getElementById("chat-log")))var v=l.getElementById("chat-log-agent");v.scrollTop=v.scrollHeight}}}a.d(t,{j:()=>o,u:()=>r})}}]);