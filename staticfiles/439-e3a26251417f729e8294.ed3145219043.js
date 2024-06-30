"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[439],{87696:(e,t,n)=>{n.d(t,{a:()=>f,s:()=>g});var a=n(96540),r=n(69067),l=n(48139),o=n(60538),i=n(30995),c=n(25239),s=n(8239),m=n(87458),u=n(40443),p=n(11641),d=n(70177),g=function(e){var t=e.inputsize,n=e.ChatPaper,g=e.ChatInput,f=e.chat_message,y=e.shownthinking,h=e.usermessage,E=e.setUserMessage,A=e.usermessageError,b=e.submitChat,v=e.messagesEndRef,_=e.handleEnter,w=function(e){navigator.clipboard.writeText(e)};return a.createElement(r.A,null,a.createElement(n,{id:"chat-log",variant:"outlined"},a.createElement(i.A,{spacing:1},f.map((function(e){return"Human"==e.role?a.createElement(o.A,{key:e.time},a.createElement(r.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container"},a.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},a.createElement(r.A,{align:"left"},a.createElement(p.A,{onClick:function(){return w("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},a.createElement(d.A,{fontSize:"small"}))),a.createElement(r.A,{pt:.8},a.createElement(r.A,{textAlign:"right"},e.role," (",e.time,")"),a.createElement(r.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap",width:"100%"}},e.message))))):e.holder?a.createElement(o.A,{key:e.holderid},a.createElement(r.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},a.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},a.createElement(r.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},a.createElement("span",null,e.role," - ",e.time,": ",a.createElement("br",null),a.createElement("br",null),e.message)),a.createElement(r.A,{align:"right"},a.createElement(p.A,{onClick:function(){return w("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},a.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?a.createElement(o.A,{key:e.message+e.time},a.createElement(r.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},a.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},a.createElement(r.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},a.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),a.createElement(r.A,{align:"right"},a.createElement(p.A,{onClick:function(){return w("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},a.createElement(d.A,{fontSize:"small"})))))):void 0})),a.createElement("div",{ref:v}," "))),y&&a.createElement(m.A,null),a.createElement(r.A,{mt:2},a.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:t}}},a.createElement(g,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:h,error:A,onChange:function(e){return E(e.target.value)},onKeyPress:function(e){return _(e)},minRows:4,variant:"standard",InputProps:{endAdornment:a.createElement(c.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},a.createElement(l.A,{sx:{height:32},variant:"contained",size:"small",onClick:b,endIcon:a.createElement(u.A,null)},"Send")),startAdornment:a.createElement(c.A,{position:"start"},"   ")}}))))},f=function(e){var t=e.id,n=e.inputsize,g=e.ChatPaper,f=e.ChatInput,y=e.chat_message,h=e.shownthinking,E=e.usermessage,A=e.setUserMessage,b=e.usermessageError,v=e.submitChat,_=e.messagesEndRef,w=e.handleEnter,x=e.check_duplicate_message,S=function(e){navigator.clipboard.writeText(e)};return a.createElement(r.A,null,a.createElement(g,{id:t,variant:"outlined"},a.createElement(i.A,{spacing:1},y.map((function(e){return"Human"==e.role?a.createElement(o.A,{key:e.time+e.message},a.createElement(r.A,{sx:{borderRight:5,borderColor:"primary.main",borderRadius:1},p:1,className:"message_log_container",style:{whiteSpace:"pre-wrap"}},a.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},a.createElement(r.A,{align:"left"},a.createElement(p.A,{onClick:function(){return S("".concat(e.role," (").concat(e.time,")\n\n").concat(e.message))},"aria-label":"copy",size:"small"},a.createElement(d.A,{fontSize:"small"}))),a.createElement(r.A,{pt:.8},a.createElement(r.A,{textAlign:"right"},e.role," (",e.time,")"),a.createElement(r.A,{display:"flex",sx:{wordBreak:"break-word"},justifyContent:"flex-end",style:{whiteSpace:"pre-wrap"}},e.message))))):e.holder?a.createElement(o.A,{key:e.holderid},a.createElement(r.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"},id:e.holderid},a.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},a.createElement(r.A,{pt:.8,align:"left",sx:{wordBreak:"break-word"},style:{whiteSpace:"pre-wrap"}},a.createElement("span",null,e.role," - ",e.time,": ",a.createElement("br",null),a.createElement("br",null),e.message)),a.createElement(r.A,{align:"right"},a.createElement(p.A,{onClick:function(){return S("".concat(e.role," - ").concat(e.time,":\n\n").concat(e.message))},"aria-label":"copy",size:"small"},a.createElement(d.A,{fontSize:"small"})))))):"Server"==e.role?a.createElement(o.A,{key:e.message},a.createElement(r.A,{p:1,sx:{borderLeft:5,borderRadius:1},className:"message_log_container",style:{whiteSpace:"pre-line"}},a.createElement(s.Ay,{item:!0,sx:{display:"flex",justifyContent:"space-between"}},a.createElement(r.A,{pt:.8,align:"left",style:{whiteSpace:"pre-wrap"}},a.createElement("span",null,e.message," (",e.role," - ",e.time,") ")),a.createElement(r.A,{align:"right"},a.createElement(p.A,{onClick:function(){return S("".concat(e.message," (").concat(e.role," - ").concat(e.time,")"))},"aria-label":"copy",size:"small"},a.createElement(d.A,{fontSize:"small"})))))):void 0})),a.createElement("div",{ref:_}," "))),h&&a.createElement(m.A,null),a.createElement(r.A,{mt:2},a.createElement(o.A,{component:"form",sx:{p:"2px 4px",display:"flex",minWidth:{inputsize:n}}},a.createElement(f,{id:"standard-multiline-flexible",multiline:!0,maxRows:6,value:E,error:b,onChange:function(e){A(e.target.value),x(e.target.value)},onKeyPress:function(e){return w(e)},minRows:4,variant:"standard",InputProps:{endAdornment:a.createElement(c.A,{sx:{position:"absolute",bottom:30,right:10},position:"end"},a.createElement(l.A,{sx:{height:32},variant:"contained",size:"small",onClick:v,endIcon:a.createElement(u.A,null)},"Send")),startAdornment:a.createElement(c.A,{position:"start"},"   ")}}))))}},78823:(e,t,n)=>{function a(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function l(e,t,n,r,l,o,i,c,s,m,u,p,d,g){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var f=JSON.parse(e.data);if(f){if(f.hasOwnProperty("swap_template")){if(c){var y=[];for(var h in f.child_template_name_list)y.push({displayed_name:f.child_template_name_list[h]});s(f.swap_instruction),m(f.default_child_instruct),u(y);var E={time:1709749130861,blocks:[{id:"1hYKvu7PTO",type:"header",data:{text:"Response",level:2}},{id:"SrV68agaen",type:"paragraph",data:{text:""}}],version:"2.29.1"};p&&p(E),g&&g.current.render(E)}else{var A=[];for(var h in f.child_template_name_list)A.push({name:f.child_template_name_list[h]});l(f.swap_instruction),o(f.default_child_instruct),i(A),p&&p(JSON.parse(f.swap_template)),g&&g.current.render(JSON.parse(f.swap_template))}f.message=""}else f.hasOwnProperty("child_instruct")?(c?m(f.child_instruct):o(f.child_instruct),f.message=""):f.hasOwnProperty("paragraph")&&d&&(d(f.paragraph),f.message="");if("Human"==f.role||"Server"==f.role||f.holder)f.holder&&(n(!0),f.message=""),t((function(e){return[].concat(a(e),[{holder:f.holder,holderid:f.holderid,role:f.role,time:f.time,credit:f.credit,message:f.message}])}));else if(f.hasOwnProperty("agent_action")){if("STOP"==f.agent_action||"NEXT"==f.agent_action){var b={type:"paragraph",data:{text:f.full_result.replace(/\n/g,"<br>")}};g.current.blocks.insert(b.type,b.data,null,f.result_id)}}else n(!1),t((function(e){return[].concat(a(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=f.message}])}));if(!(v=r.getElementById("chat-log")))var v=r.getElementById("chat-log-agent");v.scrollTop=v.scrollHeight}}}n.d(t,{j:()=>l})},53116:(e,t,n)=>{function a(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function l(e,t,n,r){e.current.onopen=function(){console.log("WebSocket  Connected")},e.current.onclose=function(){console.log("WebSocket  Disconnected")},e.current.onmessage=function(e){var l=JSON.parse(e.data);if(l){"Human"==l.role||"Server"==l.role||l.holder?(l.holder&&(n(!0),l.message=""),t((function(e){return[].concat(a(e),[{holder:l.holder,holderid:l.holderid,role:l.role,time:l.time,credit:l.credit,message:l.message}])}))):(n(!1),t((function(e){return[].concat(a(e.slice(0,-1)),[{holder:e[e.length-1].holder,holderid:e[e.length-1].holderid,role:e[e.length-1].role,time:e[e.length-1].time,credit:e[e.length-1].credit,message:e[e.length-1].message+=l.message}])})));var o=r.getElementById("chat-log");o.scrollTop=o.scrollHeight}}}n.d(t,{u:()=>l})},85439:(e,t,n)=>{n.r(t),n.d(t,{default:()=>oe});var a,r,l=n(96540),o=n(46266),i=n(69067),c=n(8239),s=n(11848),m=n(14073),u=n(60538),p=n(97834),d=n(25239),g=n(49799),f=n(82241),y=n(1043),h=n(71543),E=n(37211),A=n(44090),b=n(22100),v=n(87696),_=n(50779),w=n(69307),x=n(29571),S=n(53215),k=n(73896),C=n(4147),z=n(29428),P=n(30995),O=n(68864),j=n(98475),B=n(1405),I=n(77623),M=n(47839),T=n(52162),N=n(11641),R=n(32389);function D(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var L=(0,s.Ay)(I.A)(a||(a=D(["\n  max-width: 50px;\n  \n"]))),W=(0,s.Ay)(I.A)(r||(r=D(["\n  max-width: 60px;\n"]))),U=function(e,t,n,a){e&&(e<n?t(n):e>a&&t(a))},V=function(e){var t=e.template_list,n=e.setUseMemory,a=e.setUseMemoryCurrent,r=e.usememory,o=e.usememorycurrent,c=e.setDuplicateMessage,s=e.choosen_chat_model,u=e.choosen_template,p=e.setChoosenTemplate,d=e.setChoosenChatModel,g=e.choosen_agent_model,f=e.setChoosenAgentModel,y=e.mode,E=e.setMode,A=e.top_k,b=e.setTopk,v=e.top_p,I=e.setTopp,D=e.temperature,V=e.setTemperature,H=e.bestof,q=e.setBestof,J=e.lengthpenalty,F=e.setLengthPenalty,K=e.frequencypenalty,$=e.setFrequencyPenalty,Z=e.presencepenalty,G=e.setPresencePenalty,X=e.beam,Y=e.setBeam,Q=e.max_tokens,ee=e.setMaxToken,te=e.model_objects,ne=e.agent_objects,ae=e.earlystopping,re=e.setEarlyStopping,le=e.socket_destination,oe=e.setSocketDestination,ie=e.swap_template,ce=e.max_turn,se=e.setMaxTurn,me=(0,R.Bd)(),ue=me.t,pe=(me.i18n,function(e,t){"usememory"==t&&e?(n(e),a(!e)):"usememorycurrent"==t&&e?(n(!e),a(e)):(n(!1),a(!1))});return l.createElement(P.A,{direction:"column",spacing:1},l.createElement(_.A,{defaultValue:""},l.createElement(x.A,{id:"model-label"},"Backends"),l.createElement(C.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return oe(e.target.value)},value:le,label:"Backends",size:"small"},l.createElement(k.A,{key:"none_async",value:"none_async"},"Celery Backend"),l.createElement(k.A,{key:"async",value:"async"},"Async Backend"))),l.createElement(_.A,null,l.createElement(x.A,{id:"model-label"},"Chat Models"),l.createElement(C.A,{labelId:"model-label",id:"model-select",onChange:function(e){return d(e.target.value)},value:s,label:"Models",size:"small"},ne.map((function(e){return l.createElement(k.A,{key:e.name,value:e.name},e.name)})),te.map((function(e){return l.createElement(k.A,{key:e.name,value:e.name},e.name)})))),l.createElement(_.A,null,l.createElement(x.A,{id:"model-label"},"Agent Models"),l.createElement(C.A,{labelId:"model-label",id:"model-select",onChange:function(e){return f(e.target.value)},value:g,label:"Models",size:"small"},ne.map((function(e){return l.createElement(k.A,{key:e.name,value:e.name},e.name)})))),l.createElement(_.A,null,l.createElement(x.A,{id:"agent-label"},"Agents"),l.createElement(C.A,{labelId:"agent-label",id:"agent-select",onChange:function(e){p(e.target.value),ie(e.target.value)},value:u,label:"Agents",size:"small"},t.map((function(e){return l.createElement(k.A,{key:e.name,value:e.name},e.name)})))),l.createElement(h.A,null),l.createElement(w.A,{id:"demo-radio-buttons-group-label"},"Parameters"),l.createElement(O.A,{control:l.createElement(B.A,{defaultChecked:!0,onChange:function(e){return c(e.target.checked)}}),label:"Duplicate Message"}),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(O.A,{control:l.createElement(B.A,{checked:r,onChange:function(e){return pe(e.target.checked,"usememory")}}),label:"Use Memory (All)"}),l.createElement(i.A,null,l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.use_memory")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"}))))),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(O.A,{control:l.createElement(B.A,{checked:o,onChange:function(e){return pe(e.target.checked,"usememorycurrent")}}),label:"Use Memory (Current)"}),l.createElement(i.A,null,l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.use_memory_current")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"}))))),l.createElement(z.A,{defaultValue:"chat",name:"radio-buttons-group",onChange:function(e){return E(e.target.value)},value:y},l.createElement(O.A,{key:"chat",value:"chat",control:l.createElement(S.A,{size:"small"}),label:"Chat Bot Mode"}),l.createElement(O.A,{key:"generate",value:"generate",control:l.createElement(S.A,{size:"small"}),label:"Text Completion"}),l.createElement(h.A,null)),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Max_turns",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.max_turn")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:ce,size:"small",onChange:function(e){return se(""===e.target.value?0:Number(e.target.value))},onBlur:U(ce,se,1,10),inputProps:{step:1,min:1,max:10,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{step:1,min:1,max:10,marks:!0,valueLabelDisplay:"off",onChange:function(e){return se(e.target.value)},value:ce}),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Top_p",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.top_p")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:v,size:"small",onChange:function(e){return I(""===e.target.value?0:Number(e.target.value))},onBlur:U(v,I,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{step:.01,min:0,max:1,valueLabelDisplay:"off",onChange:function(e){return I(e.target.value)},value:v}),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Top_k",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.top_k")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:A,size:"small",onChange:function(e){return b(""===e.target.value?0:Number(e.target.value))},onBlur:U(A,b,-1,100),inputProps:{step:1,min:-1,max:100,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{defaultValue:-1,step:1,min:-1,max:100,valueLabelDisplay:"off",onChange:function(e){return b(e.target.value)},value:A}),ne.map((function(e){if(e.name==s)return l.createElement(i.A,{key:e.name},l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.max_token")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(W,{value:Q||e.context_length,size:"small",onChange:function(e){return ee(""===e.target.value?0:Number(e.target.value))},onBlur:U(Q,ee,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{step:1,min:1,max:e.context_length,onChange:function(e){return ee(e.target.value)},value:Q,valueLabelDisplay:"off"}))})),te.map((function(e){if(e.name==s)return l.createElement(i.A,{key:e.name},l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Max_tokens",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.max_token")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(W,{value:Q,size:"small",onChange:function(e){return ee(""===e.target.value?0:Number(e.target.value))},onBlur:U(Q,ee,1,e.context_length),inputProps:{step:1,min:1,max:e.context_length,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{defaultValue:1024,step:1,min:1,max:e.context_length,onChange:function(e){return ee(e.target.value)},value:Q,valueLabelDisplay:"off"}))})),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Temperature",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.temperature")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:D,size:"small",onChange:function(e){return V(""===e.target.value?0:Number(e.target.value))},onBlur:U(D,V,0,1),inputProps:{step:.01,min:0,max:1,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{defaultValue:.73,step:.01,min:0,max:1,onChange:function(e){return V(e.target.value)},value:D,valueLabelDisplay:"off"}),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Presence penalty",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.presence_penalty")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:Z,size:"small",onChange:function(e){return G(""===e.target.value?0:Number(e.target.value))},onBlur:U(Z,G,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return G(e.target.value)},value:Z,valueLabelDisplay:"off"}),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Frequency penalty",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.frequency_penalty")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:K,size:"small",onChange:function(e){return $(""===e.target.value?0:Number(e.target.value))},onBlur:U(K,$,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{"aria-label":"Small steps",defaultValue:0,step:.01,min:-2,max:2,onChange:function(e){return $(e.target.value)},value:K,valueLabelDisplay:"off"}),l.createElement(h.A,null),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(O.A,{control:l.createElement(B.A,{onChange:function(e){return Y(e.target.checked)},value:X}),label:"Beam Search"}),l.createElement(i.A,null,l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.beam")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"}))))),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(O.A,{control:l.createElement(B.A,{onChange:function(e){return re(e.target.checked)},value:ae}),label:"Early Stopping"}),l.createElement(i.A,null,l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.early_stopping")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"}))))),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Best_of",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.best_of")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:H,size:"small",onChange:function(e){return q(""===e.target.value?0:Number(e.target.value))},onBlur:U(H,q,1,5),inputProps:{step:1,min:1,max:5,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{onChange:function(e){return q(e.target.value)},value:H,marks:!0,defaultValue:2,step:1,min:1,max:5,valueLabelDisplay:"off"}),l.createElement(P.A,{direction:"row",spacing:1},l.createElement(m.A,{style:{flex:1},gutterBottom:!0},"Length penalty",l.createElement(M.A,{title:l.createElement("div",{style:{whiteSpace:"pre-line"}},ue("parameter_explain.length_penalty")),arrow:!0,placement:"top"},l.createElement(N.A,{size:"small"},l.createElement(T.A,{fontSize:"small"})))),l.createElement(L,{value:J,size:"small",onChange:function(e){return F(""===e.target.value?0:Number(e.target.value))},onBlur:U(J,F,-2,2),inputProps:{step:.01,min:-2,max:2,type:"number","aria-labelledby":"input-slider"}})),l.createElement(j.Ay,{onChange:function(e){return F(e.target.value)},value:J,defaultValue:0,step:.01,min:-2,max:2,valueLabelDisplay:"off"}))},H=n(53116),q=n(78823),J=n(16626),F=n(40921),K=n(48719),$=n(16576),Z=n(72048),G=n(47767),X=n(10718),Y=n(14627);function Q(e){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(e)}function ee(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,o,i=[],c=!0,s=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(a=l.call(n)).done)&&(i.push(a.value),i.length!==t);c=!0);}catch(e){s=!0,r=e}finally{try{if(!c&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return te(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?te(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function te(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ae(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(n),!0).forEach((function(t){var a,r,l,o;a=e,r=t,l=n[t],o=function(e,t){if("object"!=Q(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=Q(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==Q(o)?o:o+"")in a?Object.defineProperty(a,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[r]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ne(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var re=(0,s.Ay)(u.A)((function(e){var t=e.theme;return ae({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),le=(0,s.Ay)(y.A)((function(e){return ae({width:"100%"},e.theme.typography.body2)}));const oe=function(){(0,l.useRef)();var e=(0,l.useContext)(Y.P),t=e.websocket,n=e.agent_websocket,a=e.chat_websocket,r=(0,l.useRef)(null),s=ee((0,l.useState)(!1),2),y=s[0],_=s[1],w=ee((0,l.useState)(!1),2),x=w[0],S=w[1],k=ee((0,l.useState)("Assignment Agent"),2),C=k[0],z=k[1],P=ee((0,l.useState)([]),2),O=P[0],j=P[1],B=ee((0,l.useState)([]),2),I=B[0],M=B[1],T=ee((0,l.useState)([]),2),N=T[0],R=T[1],D=ee((0,l.useState)([]),2),L=D[0],W=D[1],U=ee((0,l.useState)("gpt-4"),2),Q=U[0],te=U[1],ne=ee((0,l.useState)("gpt-4"),2),ae=ne[0],oe=ne[1],ie=ee((0,l.useState)(.72),2),ce=ie[0],se=ie[1],me=ee((0,l.useState)(-1),2),ue=me[0],pe=me[1],de=ee((0,l.useState)("chat"),2),ge=de[0],fe=de[1],ye=ee((0,l.useState)(null),2),he=ye[0],Ee=ye[1],Ae=ee((0,l.useState)(!1),2),be=Ae[0],ve=Ae[1],_e=ee((0,l.useState)(!0),2),we=_e[0],xe=_e[1],Se=ee((0,l.useState)(.73),2),ke=Se[0],Ce=Se[1],ze=ee((0,l.useState)(!1),2),Pe=ze[0],Oe=ze[1],je=ee((0,l.useState)(!1),2),Be=je[0],Ie=je[1],Me=ee((0,l.useState)(2),2),Te=Me[0],Ne=Me[1],Re=ee((0,l.useState)(0),2),De=Re[0],Le=Re[1],We=ee((0,l.useState)(0),2),Ue=We[0],Ve=We[1],He=ee((0,l.useState)(0),2),qe=He[0],Je=He[1],Fe=ee((0,l.useState)(""),2),Ke=Fe[0],$e=Fe[1],Ze=ee((0,l.useState)(!1),2),Ge=Ze[0],Xe=Ze[1],Ye=ee((0,l.useState)(""),2),Qe=Ye[0],et=Ye[1],tt=ee((0,l.useState)(!1),2),nt=tt[0],at=tt[1],rt=ee((0,l.useState)(4),2),lt=rt[0],ot=rt[1],it=ee((0,l.useState)(1),2),ct=it[0],st=(it[1],ee((0,l.useState)([]),2)),mt=st[0],ut=st[1],pt=ee((0,l.useState)([]),2),dt=pt[0],gt=pt[1],ft=ee((0,l.useState)(""),2),yt=ft[0],ht=ft[1],Et=ee((0,l.useState)(""),2),At=Et[0],bt=Et[1],vt=ee((0,l.useState)(!0),2),_t=vt[0],wt=vt[1],xt=ee((0,l.useState)(!1),2),St=xt[0],kt=xt[1],Ct=ee((0,l.useState)("async"),2),zt=Ct[0],Pt=Ct[1],Ot=Intl.DateTimeFormat().resolvedOptions().timeZone,jt=ee(l.useState(0),2),Bt=jt[0],It=jt[1],Mt=(0,G.Zp)(),Tt=(0,l.useContext)(Y.Rs),Nt=Tt.is_authenticated;Tt.setIsAuthenticated,(0,l.useEffect)((function(){(0,X.IO)(Mt,Nt),o.A.all([o.A.get("/frontend-api/model"),o.A.get("/frontend-api/instruction-tree")]).then(o.A.spread((function(e,t){for(var n in j(e.data.models_bot),W(e.data.models_agent),ut(t.data.root_nodes),bt(t.data.default_children[0].instruct),gt(t.data.default_children),t.data.root_nodes)t.data.root_nodes[n].name==C&&ht(t.data.root_nodes[n].instruct)}))).catch((function(e){console.log(e)}))}),[]);var Rt=function(){var e;null===(e=r.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})};(0,l.useEffect)((function(){Rt()}),[I]),(0,l.useEffect)((function(){Rt()}),[N]);var Dt="https:"==window.location.protocol?"wss":"ws",Lt=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,l.useEffect)((function(){t.current&&t.current.close(),n.current&&n.current.close(),a.current&&a.current.close(),"async"==zt?Promise.all([n.current=new WebSocket(Dt+"://"+window.location.host+"/ws/engineer-async/"+Lt[Lt.length-1]+"/"+Ot+"/"),a.current=new WebSocket(Dt+"://"+window.location.host+"/ws/chat-async/"+Lt[Lt.length-1]+"/"+Ot+"/")]):Promise.all([n.current=new WebSocket(Dt+"://"+window.location.host+"/ws/engineer/"+Lt[Lt.length-1]+"/"+Ot+"/"),a.current=new WebSocket(Dt+"://"+window.location.host+"/ws/chat/"+Lt[Lt.length-1]+"/"+Ot+"/")]),Promise.all([(0,H.u)(a,M,S,document),(0,q.j)(n,R,_,document,ht,bt,gt)])}),[zt]);var Wt=function(e){"Enter"!=e.key||e.shiftKey||(e.preventDefault(),_t?(Ht(),Vt()):_t||"chat-input"!=e.target.id?_t||"agent-input"!=e.target.id||Vt():Ht())},Ut=function(e){_t&&(et(e),$e(e))},Vt=function(){if(""==Qe)at(!0);else{var e={max_turn:lt,instruct_change:St,currentParagraph:ct,message:Qe,choosen_models:Q,choosen_template:C,role:"Human",top_p:ce,max_tokens:he,frequency_penalty:Ue,presence_penalty:De,temperature:ke,agent_instruction:yt,child_instruction:At};n.current.send(JSON.stringify(e)),et(""),kt(!1)}},Ht=function(){if(""==Ke)Xe(!0);else{var e={mode:ge,message:Ke,choosen_models:ae,role:"Human",top_k:ue,top_p:ce,best_of:Te,max_tokens:he,frequency_penalty:Ue,presence_penalty:De,temperature:ke,beam:Pe,early_stopping:Be,length_penalty:qe,include_memory:be,include_current_memory:we};a.current.send(JSON.stringify(e)),$e("")}};return l.createElement(p.A,{maxWidth:!1,sx:{minWidth:1500},disableGutters:!0},l.createElement("title",null,"Hotpot"),l.createElement(b.A,{max_width:!1}),l.createElement(p.A,{maxWidth:!1,sx:{minWidth:1500}},l.createElement(i.A,{m:1},l.createElement(c.Ay,{container:!0,spacing:2},l.createElement(c.Ay,{item:!0,xs:2},l.createElement(u.A,{variant:"outlined"},l.createElement(i.A,{m:1},l.createElement(m.A,{sx:{color:"text.secondary"}},"Template Structure")),l.createElement(h.A,null),l.createElement(g.A,{dense:!0},dt.map((function(e,t){return l.createElement(A.Ay,{key:e.name,disablePadding:!0},l.createElement(E.A,{selected:Bt===t,onClick:function(a){var r;r=e.name,n.current.send(JSON.stringify({swap_child_instruct:r,template_type:"system"})),function(e,t){It(t)}(0,t)}},l.createElement(f.A,{primary:e.name})))})))),l.createElement(F.A,null,l.createElement(K.A,{expandIcon:l.createElement(Z.A,null),"aria-controls":"child-content",id:"child-header"},l.createElement(m.A,{sx:{color:"text.secondary"}},"Parent Instruction")),l.createElement($.A,null,l.createElement(u.A,{variant:"outlined"},l.createElement(le,{id:"parent-instruct",multiline:!0,maxRows:8,value:yt,onChange:function(e){ht(e.target.value),kt(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:l.createElement(d.A,{position:"start"},"   ")}})))),l.createElement(F.A,null,l.createElement(K.A,{expandIcon:l.createElement(Z.A,null),"aria-controls":"child-content",id:"child-header"},l.createElement(m.A,{sx:{color:"text.secondary"}},"Child Instruction")),l.createElement($.A,null,l.createElement(u.A,{variant:"outlined"},l.createElement(le,{id:"child-instruct",multiline:!0,maxRows:8,value:At,onChange:function(e){bt(e.target.value),kt(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:l.createElement(d.A,{position:"start"},"   ")}}))))),l.createElement(c.Ay,{item:!0,xs:4},l.createElement(v.a,{id:"chat-log",inputsize:660,chat_message:I,usermessage:Ke,usermessageError:Ge,ChatPaper:re,ChatInput:le,setUserMessage:$e,submitChat:Ht,messagesEndRef:r,shownthinking:x,handleEnter:Wt,check_duplicate_message:Ut})),l.createElement(c.Ay,{item:!0,xs:4},l.createElement(v.a,{id:"chat-log-agent",inputsize:660,chat_message:N,usermessage:Qe,usermessageError:nt,ChatPaper:re,ChatInput:le,setUserMessage:et,submitChat:Vt,messagesEndRef:r,shownthinking:y,handleEnter:Wt,check_duplicate_message:Ut})),l.createElement(c.Ay,{item:!0,xs:2},l.createElement(V,{socket_destination:zt,setSocketDestination:Pt,template_list:mt,choosen_template:C,setChoosenTemplate:z,model_objects:O,agent_objects:L,choosen_chat_model:ae,choosen_agent_model:Q,top_k:ue,top_p:ce,max_tokens:he,temperature:ke,mode:ge,bestof:Te,lengthpenalty:qe,presencepenalty:De,frequencypenalty:Ue,max_turn:lt,setMaxTurn:ot,setBeam:Oe,setMaxToken:Ee,setBestof:Ne,setTemperature:Ce,setMode:fe,setLengthPenalty:Je,setPresencePenalty:Le,setFrequencyPenalty:Ve,setTopk:pe,setTopp:se,setUseMemory:ve,setUseMemoryCurrent:xe,usememory:be,usememorycurrent:we,earlystopping:Be,setEarlyStopping:Ie,setChoosenAgentModel:te,setChoosenChatModel:oe,setDuplicateMessage:wt,swap_template:function(e){n.current.send(JSON.stringify({swap_template:e,template_type:"system"}))}}))))),l.createElement(J.A,null))}}}]);