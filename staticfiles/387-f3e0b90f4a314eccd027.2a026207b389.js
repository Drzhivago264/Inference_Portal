"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[387],{44058:(e,t,n)=>{n.d(t,{b:()=>f});var r=n(96540),a=n(69067),l=n(48139),o=n(30995),s=n(29571),i=n(73896),c=n(4147),u=n(50779),m=n(14073),d=n(24610);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var f=function(e){var t=e.chat_message,n=e.choosen_export_format_chatlog,f=e.setChoosenExportFormatChatLog,g=e.number_of_remove_message;return r.createElement(a.A,{mt:2},r.createElement(m.A,{pb:2},"Chat Log Export:"),r.createElement("form",{onSubmit:function(e){e.preventDefault();var r,a=function(e){if(Array.isArray(e))return p(e)}(r=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),l=document.createElement("a");if(".json"==n){var o=JSON.stringify(a.splice(g),null,4),s=new Blob([o],{type:"application/json"}),i=URL.createObjectURL(s);l.setAttribute("href",i),l.setAttribute("download","Chat_log_from_Professor_Parakeet.json")}else if(".txt"==n){var c=a.splice(g);for(var u in o="",c)o+=c[u].role+"-"+c[u].time+":\n"+c[u].message+"\n";s=new Blob([o],{type:"text/plain"}),i=URL.createObjectURL(s),l.setAttribute("href",i),l.setAttribute("download","Chat_log_from_Professor_Parakeet.txt")}l.click()}},r.createElement(u.A,null,r.createElement(o.A,{direction:"row",spacing:1},r.createElement(s.A,{id:"export-label-chatlog"},"Formats"),r.createElement(c.A,{labelId:"export-label-chatlog",id:"export-select-chatlog",onChange:function(e){return f(e.target.value)},value:n,label:"Export",size:"small"},[".json",".txt"].map((function(e){return r.createElement(i.A,{key:e,value:e},e)}))),r.createElement(l.A,{size:"small",variant:"contained",type:"submit",endIcon:r.createElement(d.A,null)},"Export")))))}},97387:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Ae});var r=n(96540),a=n(46266),l=n(69067),o=n(50779),s=n(69307),i=n(8239),c=n(11848),u=n(29571),m=n(32830),d=n(31214),p=n(17108),f=n(73896),g=n(4147),y=n(48139),b=n(14073),h=n(60538),A=n(30995),E=n(97834),v=n(25239),_=n(49799),k=n(82241),S=n(1043),w=n(71543),x=n(37211),j=n(44090),P=n(48158),C=n(37312),O=n(49601),I=n(99149),R=n(34057),z=n(42329),B=n(51971),T=n.n(B),U=n(12783),L=n(31236),W=n.n(L),N=n(24610),M=n(92497),D=n(83248),F=n(6276),J=n(85072),q=n.n(J),V=n(97825),G=n.n(V),H=n(77659),K=n.n(H),$=n(55056),Y=n.n($),Z=n(10540),Q=n.n(Z),X=n(41113),ee=n.n(X),te=n(84506),ne={};ne.styleTagTransform=ee(),ne.setAttributes=Y(),ne.insert=K().bind(null,"head"),ne.domAPI=G(),ne.insertStyleElement=Q(),q()(te.A,ne),te.A&&te.A.locals&&te.A.locals;var re=n(44058),ae=n(38960),le=n(36632),oe=n(54937),se=n(6347),ie=n(1405),ce=n(68864);function ue(e){return ue="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ue(e)}function me(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,s=[],i=!0,c=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=l.call(n)).done)&&(s.push(r.value),s.length!==t);i=!0);}catch(e){c=!0,a=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(c)throw a}}return s}}(e,t)||function(e,t){if(e){if("string"==typeof e)return de(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?de(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function de(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function fe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?pe(Object(n),!0).forEach((function(t){var r,a,l,o;r=e,a=t,l=n[t],o=function(e,t){if("object"!=ue(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=ue(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==ue(o)?o:o+"")in r?Object.defineProperty(r,a,{value:l,enumerable:!0,configurable:!0,writable:!0}):r[a]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ge=n(14511),ye=(n(85527),n(48606)),be=(0,c.Ay)(h.A)((function(e){var t=e.theme;return fe({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),he=(0,c.Ay)(S.A)((function(e){return fe({width:"100%"},e.theme.typography.body2)}));const Ae=function(){var e=(0,r.useRef)(),t=(0,r.useRef)(),c=(0,r.useRef)(null),S=(0,r.useRef)(null),B=me((0,r.useState)(!1),2),L=B[0],J=B[1],q=me((0,r.useState)([]),2),V=q[0],G=q[1],H=me((0,r.useState)([]),2),K=H[0],$=H[1],Y=me((0,r.useState)("gpt-4"),2),Z=Y[0],Q=Y[1],X=me((0,r.useState)("Assignment Agent"),2),ee=X[0],te=X[1],ne=me((0,r.useState)(""),2),ue=ne[0],de=ne[1],pe=me((0,r.useState)(.72),2),fe=pe[0],Ae=pe[1],Ee=me((0,r.useState)(null),2),ve=Ee[0],_e=Ee[1],ke=me((0,r.useState)(.73),2),Se=ke[0],we=ke[1],xe=me((0,r.useState)(0),2),je=xe[0],Pe=xe[1],Ce=me((0,r.useState)(0),2),Oe=Ce[0],Ie=Ce[1],Re=me((0,r.useState)(""),2),ze=Re[0],Be=Re[1],Te=me((0,r.useState)(!1),2),Ue=Te[0],Le=Te[1],We=me((0,r.useState)("/ws/engineer-async/"),2),Ne=We[0],Me=We[1],De=me((0,r.useState)(null),2),Fe=De[0],Je=De[1],qe=me((0,r.useState)(1),2),Ve=qe[0],Ge=qe[1],He=me((0,r.useState)([]),2),Ke=He[0],$e=He[1],Ye=me((0,r.useState)([]),2),Ze=Ye[0],Qe=Ye[1],Xe=me((0,r.useState)(""),2),et=Xe[0],tt=Xe[1],nt=me((0,r.useState)(""),2),rt=nt[0],at=nt[1],lt=me((0,r.useState)(".json"),2),ot=lt[0],st=lt[1],it=me((0,r.useState)(".json"),2),ct=it[0],ut=it[1],mt=Intl.DateTimeFormat().resolvedOptions().timeZone,dt=me((0,r.useState)([]),2),pt=dt[0],ft=dt[1],gt=me((0,r.useState)(!1),2),yt=gt[0],bt=gt[1],ht=me((0,r.useState)([]),2),At=ht[0],Et=ht[1],vt=me((0,r.useState)(""),2),_t=vt[0],kt=vt[1],St=me((0,r.useState)(""),2),wt=St[0],xt=St[1],jt=function(e){bt(e.target.checked);var n={time:1709749130861,blocks:[{id:"1hYKvu7PTO",type:"header",data:{text:"Response",level:2}},{id:"SrV68agaen",type:"paragraph",data:{text:""}}],version:"2.29.1"};Je(n),t.current.render(n)};(0,r.useEffect)((function(){if(!e.current){var n=new O.A({holderId:"editorjs",tools:{header:{class:I.A,inlineToolbar:["link"]},list:{class:ge,inlineToolbar:!0},quote:{class:R.A,inlineToolbar:!0},paragraph:{class:z.A,config:{preserveBlank:!0},inlineToolbar:!0},underline:T(),code:{class:W(),inlineToolbar:!0},inlineCode:{class:U.A,shortcut:"CMD+SHIFT+M"},anyTuneName:{class:ye,config:{default:"right",blocks:{header:"center",list:"right"}}}},data:Fe});n.isReady.then((function(){})),t.current=n}}),[]),(0,r.useEffect)((function(){a.A.all([a.A.get("/frontend-api/model"),a.A.get("/frontend-api/instruction-tree")]).then(a.A.spread((function(e,n){$(e.data.models_agent),$e(n.data.root_nodes),ft(n.data.user_root_nodes),n.data.user_root_nodes.length>0&&(de(n.data.user_root_nodes[0].displayed_name),kt(n.data.user_root_nodes[0].instruct)),at(n.data.default_children[0].instruct),n.data.default_user_children.length>0&&xt(n.data.default_user_children[0].instruct),Qe(n.data.default_children),Et(n.data.default_user_children),t.current.isReady.then((function(){for(var e in n.data.root_nodes)n.data.root_nodes[e].name==ee&&(tt(n.data.root_nodes[e].instruct),Je(JSON.parse(n.data.root_nodes[e].default_editor_template)),t.current.render(JSON.parse(n.data.root_nodes[e].default_editor_template)))})).catch((function(e){console.log("Editor.js initialization failed because of ".concat(e))}))}))).catch((function(e){console.log(e)}))}),[]),(0,r.useEffect)((function(){var e;null===(e=S.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[V]);var Pt="https:"==window.location.protocol?"wss":"ws",Ct=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,r.useEffect)((function(){c.current=new WebSocket(Pt+"://"+window.location.host+Ne+Ct[Ct.length-1]+"/"+mt+"/"),(0,F.j)(c,G,J,document,tt,at,Qe,yt,kt,xt,Et,Je,Ge,t)}),[]),(0,r.useEffect)((function(){c.current.close(),c.current=new WebSocket(Pt+"://"+window.location.host+Ne+Ct[Ct.length-1]+"/"+mt+"/"),(0,F.j)(c,G,J,document,tt,at,Qe,yt,kt,xt,Et,Je,Ge,t)}),[Ne]),(0,r.useEffect)((function(){(0,F.j)(c,G,J,document,tt,at,Qe,yt,kt,xt,Et,Je,Ge,t)}),[yt,wt,_t,At]);var Ot=function(){if(""==ze)Le(!0);else{var e={currentParagraph:Ve,message:ze,choosen_models:Z,choosen_template:yt?ue:ee,role:"Human",top_p:fe,max_tokens:ve,frequency_penalty:Oe,presence_penalty:je,temperature:Se,agent_instruction:yt?_t:et,child_instruction:yt?wt:rt};c.current.send(JSON.stringify(e)),Be("")}},It=function(e,t){c.current.send(JSON.stringify({swap_template:e,template_type:t}))},Rt=function(e,t){c.current.send(JSON.stringify({swap_child_instruct:e,template_type:t}))};(0,r.useEffect)((function(){var e=document.getElementById("editorjs"),n=function(e){if(t.current&&"click"===e.type){var n=t.current.blocks.getCurrentBlockIndex();Ge(n),c.current.send(JSON.stringify({paragraph:n}))}};return e&&e.addEventListener("click",n),function(){null==e||e.removeEventListener("click",n)}}),[focus]);var zt=new m.A,Bt=function(e,r){t.current.save().then((function(t){var a=t;if("application/json"==e)a=JSON.stringify(t,null,4);else if("text/html"==e)a=zt.parse(a);else if("text/plain"==e){var l=zt.parse(a);a=l=(l=(l=(l=(l=(l=(l=(l=(l=(l=l.toString()).replace(/<style([\s\S]*?)<\/style>/gi,"")).replace(/<script([\s\S]*?)<\/script>/gi,"")).replace(/<\/div>/gi,"\n")).replace(/<\/li>/gi,"\n")).replace(/<li>/gi,"  *  ")).replace(/<\/ul>/gi,"\n")).replace(/<\/p>/gi,"\n")).replace(/<br\s*[\/]?>/gi,"\n")).replace(/<[^>]+>/gi,"")}else if("application/pdf"==e){var o=zt.parse(a),s={content:n(33587)(o)};d.vfs=p.b.vfs,d.createPdf(s).download("Written_By_Professor_Parakeet.pdf")}if("application/pdf"!=e){var i=document.createElement("a"),c=new Blob([a],{type:e}),u=URL.createObjectURL(c);i.setAttribute("href",u),i.setAttribute("download",r),i.click()}})).catch((function(e){console.log("Saving failed: ",e)}))};return r.createElement(E.A,{maxWidth:!1,sx:{minWidth:1500},disableGutters:!0},r.createElement("title",null,"Agent"),r.createElement(C.A,null),r.createElement(E.A,{maxWidth:!1,sx:{minWidth:1500},disableGutters:!0},r.createElement(l.A,{mt:2},r.createElement(i.Ay,{container:!0,spacing:2},r.createElement(i.Ay,{item:!0,xs:2},r.createElement(_.A,{subheader:r.createElement(P.A,{component:"div",id:"nested-list-subheader"},"Template Structure")},!yt&&Ze.map((function(e){return r.createElement(j.Ay,{key:e.name,disablePadding:!0},r.createElement(x.A,{onClick:function(){return Rt(e.name,"system")}},r.createElement(k.A,{primary:e.name})))})),yt&&At.map((function(e){return r.createElement(j.Ay,{key:e.displayed_name,disablePadding:!0},r.createElement(x.A,{onClick:function(){return Rt(e.displayed_name,"user_template")}},r.createElement(k.A,{primary:e.displayed_name})))}))),r.createElement(w.A,null),r.createElement(l.A,{m:2},r.createElement("form",{onSubmit:function(e){e.preventDefault(),".json"==ot?Bt("application/json","Written_By_Professor_Parakeet.json"):".html"==ot?Bt("text/html","Written_By_Professor_Parakeet.html"):".txt"==ot?Bt("text/plain","Written_By_Professor_Parakeet.txt"):".pdf"==ot&&Bt("application/pdf","Written_By_Professor_Parakeet.pdf")}},r.createElement(b.A,{pb:2},"Editor Export"),r.createElement(o.A,null,r.createElement(A.A,{direction:"row",spacing:1},r.createElement(u.A,{id:"export-label"},"Formats"),r.createElement(g.A,{labelId:"export-label",id:"export-select",onChange:function(e){return st(e.target.value)},value:ot,label:"Export",size:"small"},[".json",".txt",".html",".pdf"].map((function(e){return r.createElement(f.A,{key:e,value:e},e)}))),r.createElement(y.A,{size:"small",variant:"contained",type:"submit",endIcon:r.createElement(N.A,null)},"Export")))),r.createElement(re.b,{chat_message:V,choosen_export_format_chatlog:ct,setChoosenExportFormatChatLog:ut,number_of_remove_message:2,setChatMessage:G}))),r.createElement(w.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),r.createElement(i.Ay,{item:!0,xs:4},r.createElement(A.A,{spacing:1},r.createElement(b.A,{variant:"h5",gutterBottom:!0},"Parent Instruction"),r.createElement(h.A,null,!yt&&r.createElement(he,{id:"parent-instruct",multiline:!0,maxRows:8,value:et,onChange:function(e){return tt(e.target.value)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(v.A,{position:"start"},"   ")}}),yt&&r.createElement(he,{id:"user-parent-instruct",multiline:!0,maxRows:8,value:_t,onChange:function(e){return kt(e.target.value)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(v.A,{position:"start"},"   ")}})),r.createElement(w.A,null),r.createElement(b.A,{variant:"h5",gutterBottom:!0},"Child Instruction"),r.createElement(h.A,null,!yt&&r.createElement(he,{id:"child-instruct",multiline:!0,maxRows:8,value:rt,onChange:function(e){return at(e.target.value)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(v.A,{position:"start"},"   ")}}),yt&&r.createElement(he,{id:"user-child-instruct",multiline:!0,maxRows:8,value:wt,onChange:function(e){return xt(e.target.value)},minRows:6,variant:"standard",InputProps:{startAdornment:r.createElement(v.A,{position:"start"},"   ")}})),r.createElement(w.A,null),r.createElement(b.A,{variant:"h5",gutterBottom:!0},"Editor"),r.createElement("div",{id:"editorjs"}))),r.createElement(i.Ay,{item:!0,xs:4},r.createElement(l.A,{mr:2},r.createElement(b.A,{variant:"h5",gutterBottom:!0},"Chat Log"),r.createElement(D.s,{inputsize:300,chat_message:V,usermessage:ze,usermessageError:Ue,ChatPaper:be,ChatInput:he,setUserMessage:Be,submitChat:Ot,messagesEndRef:S,shownthinking:L,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||Ot()}}))),r.createElement(w.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),r.createElement(i.Ay,{item:!0,xs:2},r.createElement(A.A,{direction:"column",mr:2,spacing:2},!yt&&r.createElement(o.A,null,r.createElement(u.A,{id:"agent-label"},"Agents"),r.createElement(g.A,{labelId:"agent-label",id:"agent-select",onChange:function(e){te(e.target.value),It(e.target.value,"system")},value:ee,label:"Agents",size:"small"},Ke.map((function(e){return r.createElement(f.A,{key:e.name,value:e.name},e.name)})))),yt&&r.createElement(o.A,{disabled:!0},r.createElement(u.A,{id:"agent-label"},"Agents"),r.createElement(g.A,{labelId:"agent-label",id:"agent-select",onChange:function(e){te(e.target.value),It(e.target.value,"system")},value:ee,label:"Agents",size:"small"},Ke.map((function(e){return r.createElement(f.A,{key:e.name,value:e.name},e.name)})))),r.createElement(w.A,null),0==pt.length&&r.createElement(o.A,{disabled:!0},r.createElement(u.A,{id:"use-agent-label",shrink:!0},"Users' Agents"),r.createElement(A.A,{direction:"column",spacing:1},!yt&&r.createElement(g.A,{notched:!0,labelId:"user-agent-label",id:"user-agent-select",onChange:function(e){de(e.target.value),It(e.target.value,"user_template")},value:ue,label:"Users' Agents",size:"small",disabled:!0},pt.map((function(e){return r.createElement(f.A,{key:e.displayed_name,value:e.displayed_name},e.displayed_name)}))),yt&&r.createElement(g.A,{notched:!0,labelId:"user-agent-label",id:"user-agent-select",onChange:function(e){de(e.target.value),It(e.target.value,"user_template")},value:ue,label:"Users' Agents",size:"small"},pt.map((function(e){return r.createElement(f.A,{key:e.displayed_name,value:e.displayed_name},e.displayed_name)}))),r.createElement(ce.A,{disabled:!0,control:r.createElement(ie.A,{checked:yt,onChange:jt}),label:"Use My Template"})),r.createElement(se.A,null,"No Users' Agent Found")),pt.length>0&&r.createElement(o.A,null,r.createElement(u.A,{id:"use-agent-label"},"Users' Agents"),!yt&&r.createElement(g.A,{labelId:"user-agent-label",id:"user-agent-select",onChange:function(e){de(e.target.value),It(e.target.value,"user_template")},value:ue,label:"Users' Agents",size:"small",disabled:!0},pt.map((function(e){return r.createElement(f.A,{key:e.displayed_name,value:e.displayed_name},e.displayed_name)}))),yt&&r.createElement(g.A,{labelId:"user-agent-label",id:"user-agent-select",onChange:function(e){de(e.target.value),It(e.target.value,"user_template")},value:ue,label:"Users' Agents",size:"small"},pt.map((function(e){return r.createElement(f.A,{key:e.displayed_name,value:e.displayed_name},e.displayed_name)}))),r.createElement(ce.A,{control:r.createElement(ie.A,{checked:yt,onChange:jt}),label:"Use My Template"})),r.createElement(w.A,null),r.createElement(o.A,{defaultValue:""},r.createElement(u.A,{id:"model-label"},"Backends"),r.createElement(g.A,{labelId:"socket-label",id:"socket-select",onChange:function(e){return Me(e.target.value)},value:Ne,label:"Backends",size:"small"},r.createElement(f.A,{key:"/ws/engineer/",value:"/ws/engineer/"},"Celery Backend"),r.createElement(f.A,{key:"/ws/engineer-async/",value:"/ws/engineer-async/"},"Async Backend"))),r.createElement(w.A,null),r.createElement(s.A,{id:"demo-radio-buttons-group-label"},"Parameters"),r.createElement(M.Oj,{top_p:fe,agent_objects:K,choosen_model:Z,setChoosenModel:Q,setTopp:Ae,temperature:Se,setTemperature:we,max_tokens:ve,setMaxToken:_e,presencepenalty:je,setPresencePenalty:Pe,frequencypenalty:Oe,setFrequencyPenalty:Ie}),r.createElement(le.A,{severity:"info",sx:{whiteSpace:"pre-line"}},r.createElement(oe.A,null,"Note: "),"Async Backend is the preferred backend that supports newest features. \n\n                                    Interview Agent only works on Async Backend.")))))),r.createElement(ae.A,null))}},84506:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(31601),a=n.n(r),l=n(76314),o=n.n(l)()(a());o.push([e.id,"#editorjs {\n    background-color: white;\n    color: black;\n    border-radius: 5px;\n    padding: 25px;\n    font-size: 16px;\n    max-height: 600px;\n    overflow: auto;\n}\n\n#editorjs h1 {\n    font-size: 28px;\n    color: black;\n}\n\n#editorjs h2 {\n    font-size: 24px;\n    color: black;\n}\n\n#editorjs h3 {\n    font-size: 20px;\n    color: black;\n}\n\n#editorjs h4 {\n    font-size: 18px;\n    color: black;\n}\n\n#editorjs h5 {\n    font-size: 16px;\n    color: black;\n}\n\n#editorjs h6 {\n    font-size: 14px;\n    color: black;\n}\n\n#editorjs small {\n    font-size: 12px;\n    color: black;\n}",""]);const s=o}}]);