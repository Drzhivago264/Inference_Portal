"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[678],{72678:(e,t,n)=>{n.r(t),n.d(t,{default:()=>K});var a=n(96540),r=n(46266),l=n(69067),i=n(8239),o=n(60538),c=n(97834),u=n(1043),s=n(35453),d=n(38960),m=n(14073),p=n(49799),f=n(71543),y=n(36632),h=n(11641),b=n(6561),A=n(31330),E=n(50779),g=n(67034),v=n(40529),w=n(30995),_=n(98984),S=n(37211),x=n(57873),k=n(82241),j=n(24521),C=n(74097),O=n(22453),P=n(13718),I=n(33066),R=n(43561),T=n(83248),D=n(11848),W=n(6276),q=n(68864),L=n(27558);function H(e){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},H(e)}function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},N.apply(this,arguments)}function V(e){return function(e){if(Array.isArray(e))return J(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||F(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,i,o=[],c=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(a=l.call(n)).done)&&(o.push(a.value),o.length!==t);c=!0);}catch(e){u=!0,r=e}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(u)throw r}}return o}}(e,t)||F(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){if(e){if("string"==typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?J(e,t):void 0}}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function U(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){var a,r,l,i;a=e,r=t,l=n[t],i=function(e,t){if("object"!=H(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=H(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==H(i)?i:i+"")in a?Object.defineProperty(a,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[r]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var X=(0,D.Ay)(o.A)((function(e){var t=e.theme;return U({minWidth:300,height:500,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),G=(0,D.Ay)(u.A)((function(e){return U({width:"100%"},e.theme.typography.body2)}));const K=function(){var e=(0,a.useRef)(null),t=(0,a.useRef)(null),n=z((0,a.useState)("gpt-4"),2),D=n[0],H=(n[1],z((0,a.useState)("Empty Template"),2)),F=H[0],J=H[1],M=Intl.DateTimeFormat().resolvedOptions().timeZone,K=z((0,a.useState)([]),2),Y=K[0],Z=K[1],$=z((0,a.useState)(""),2),B=$[0],Q=$[1],ee=z((0,a.useState)(!1),2),te=ee[0],ne=ee[1],ae=z((0,a.useState)("/ws/engineer-async/"),2),re=ae[0],le=(ae[1],z((0,a.useState)(.72),2)),ie=le[0],oe=(le[1],z((0,a.useState)(null),2)),ce=oe[0],ue=(oe[1],z((0,a.useState)(.73),2)),se=ue[0],de=(ue[1],z((0,a.useState)(0),2)),me=de[0],pe=(de[1],z((0,a.useState)(0),2)),fe=pe[0],ye=(pe[1],z((0,a.useState)(!1),2)),he=ye[0],be=ye[1],Ae=z((0,a.useState)(1),2),Ee=Ae[0],ge=(Ae[1],z((0,a.useState)(!1),2)),ve=ge[0],we=ge[1],_e=z((0,a.useState)(!1),2),Se=_e[0],xe=_e[1],ke=z((0,a.useState)(!1),2),je=ke[0],Ce=ke[1],Oe=z((0,a.useState)(""),2),Pe=Oe[0],Ie=Oe[1],Re=z((0,a.useState)(!1),2),Te=Re[0],De=Re[1],We=z((0,a.useState)(!1),2),qe=We[0],Le=We[1],He=z((0,a.useState)(""),2),Ne=He[0],Ve=He[1],ze=z((0,a.useState)([]),2),Fe=ze[0],Je=ze[1],Me=z((0,a.useState)(0),2),Ue=Me[0],Xe=Me[1],Ge=z((0,a.useState)(!1),2),Ke=Ge[0],Ye=Ge[1],Ze=z((0,a.useState)(!1),2),$e=Ze[0],Be=Ze[1],Qe=z((0,a.useState)(!0),2),et=Qe[0],tt=Qe[1],nt=z((0,a.useState)(!1),2),at=nt[0],rt=nt[1],lt=z((0,a.useState)(null),2),it=lt[0],ot=lt[1],ct=z((0,a.useState)(null),2),ut=ct[0],st=ct[1],dt=z((0,a.useState)([{id:null,dislayed_name:"",instruct:"",unique:(0,R.Ak)(),add:!1}]),2),mt=dt[0],pt=dt[1],ft=function(e,t){var n=V(Fe),a=U({},Fe[Ue]);a[t]=e,n[Ue]=a,Je(n),"displayed_name"==t&&J(e)},yt=function(e){var t=(0,O.R)("csrftoken");r.A.delete("/frontend-api/delete-user-instruction",{data:{id:e},headers:{"content-type":"application/json","X-CSRFToken":t}}).then((function(e){De(!0)})).catch((function(e){Le(!0),Ve(e.response.data.detail)}))},ht=function(e,t,n){var a=V(mt),r=U({},mt[e]);r[t]=n,a[e]=r,pt(a),ft(a,"children")},bt=function(e,t){var n=[];if(null===Fe[t].children)pt([{id:null,displayed_name:"",instruct:"",unique:(0,R.Ak)(),add:!1}]);else{for(var a in Fe[t].children)n.push({id:Fe[t].children[a].id,displayed_name:Fe[t].children[a].displayed_name,instruct:Fe[t].children[a].instruct,add:!1});pt(n)}Xe(t)},At=function(e){if(Fe.length<it){if("add"==e){tt(!1);var t=[].concat(V(Fe),[{id:null,displayed_name:"Empty Template",instruct:"",children:[{id:null,displayed_name:"",instruct:"",unique:(0,R.Ak)(),add:!1}]}]);Je(t),pt([]),Xe(Fe.length)}else if("delete"==e){tt(!0);var n=V(Fe),a=Fe[Ue];null!==a.id&&(yt(a.id),De(!0)),n.splice(Ue,1),Je(n),n.length>1?(bt(0,0),De(!0)):(bt(0,0),Je([{id:null,displayed_name:"Empty Template",instruct:"",children:null}]),pt([{id:null,displayed_name:"",instruct:"",unique:(0,R.Ak)(),add:!1}]))}}else if(Be(!0),"delete"==e){tt(!0);var r=V(Fe),l=Fe[Ue];null!==l.id&&(yt(l.id),De(!0)),r.splice(Ue,1),Je(r),Be(!1),bt(0,0)}},Et=function(e,t){var n=mt.length,a=null;if(rt(!1),n<ut){if(Ye(!1),"add"==e){var r=[].concat(V(mt),[{id:null,displayed_name:"",instruct:"",unique:(0,R.Ak)(),add:!1}]);pt(r)}else if("delete"==e){var l=V(mt);a=mt[t],l.splice(t,1),pt(l),null!==a.id&&(yt(a.id),De(!0))}}else if(Ye(!0),"delete"==e){var i=V(mt);a=mt[t],i.splice(-1),pt(i),Ye(!1),null!==a.id&&(yt(a.id),De(!0))}},gt=function(e){r.A.all([r.A.get("/frontend-api/get-user-instruction")]).then(r.A.spread((function(t){if(204!=t.status){st(t.data.max_child_num),ot(t.data.max_parent_num);var n=[];if(t.data.root_nodes.length>=10&&Be(!0),0==t.data.root_nodes.length)Je([{template_list_index:0,id:null,displayed_name:"Empty template",instruct:"",children:[{id:null,displayed_name:"",instruct:"",unique:(0,R.Ak)(),add:!1}]}]);else{for(var a in t.data.root_nodes){if(a==e){var r=[];for(var l in t.data.root_nodes[a].children)r.push({id:t.data.root_nodes[a].children[l].id,displayed_name:t.data.root_nodes[a].children[l].displayed_name,instruct:t.data.root_nodes[a].children[l].instruct,add:!1});pt(r)}n.push({id:t.data.root_nodes[a].id,displayed_name:t.data.root_nodes[a].displayed_name,instruct:t.data.root_nodes[a].instruct,children:t.data.root_nodes[a].children})}Je(n)}}}))).catch((function(e){st(e.response.data.max_child_num),ot(e.response.data.max_parent_num)}))};(0,a.useEffect)((function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}),[Y]);var vt="https:"==window.location.protocol?"wss":"ws",wt=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,a.useEffect)((function(){e.current=new WebSocket(vt+"://"+window.location.host+re+wt[wt.length-1]+"/"+M+"/"),(0,W.j)(e,Z,be,document)}),[]),(0,a.useEffect)((function(){at&&gt(Ue)}),[at]),(0,a.useEffect)((function(){gt(0)}),[]);var _t=function(){if(""==B)ne(!0);else{var t="";for(var n in mt)mt[n].add&&(t=t+"\n"+mt[n].instruct);var a=Fe[Ue].instruct,r={currentParagraph:Ee,message:B,choosen_models:D,choosen_template:F,role:"Human",top_p:ie,max_tokens:ce,frequency_penalty:fe,presence_penalty:me,temperature:se,agent_instruction:a,child_instruction:t};e.current.send(JSON.stringify(r)),Q("")}};return a.createElement(c.A,{maxWidth:!1,sx:{minWidth:1200},disableGutters:!0},a.createElement("title",null,"Templates"),a.createElement(s.A,null),a.createElement(c.A,{maxWidth:"xl"},a.createElement(l.A,{m:2},a.createElement(i.Ay,{container:!0,spacing:2},a.createElement(i.Ay,{item:!0,xs:2},a.createElement(m.A,{mt:1,mb:1,variant:"body1"},"Instruction Template"),a.createElement(p.A,null,Fe.map((function(e,t){return a.createElement(S.A,{sx:{height:38},key:t,selected:Ue===t,onClick:function(e){return bt(0,t)}},a.createElement(x.A,null,Ue===t&&a.createElement(C.A,null),Ue!==t&&a.createElement(j.A,null)),a.createElement(k.A,{primaryTypographyProps:{fontWeight:"medium",variant:"body2",style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},primary:e.displayed_name}))})),a.createElement(l.A,{display:"flex",justifyContent:"center",alignItems:"center"},$e&&a.createElement(y.A,{severity:"warning"},"Reaching the maximum number of parent (",it,")."),!$e&&et&&a.createElement(h.A,{"aria-label":"add",onClick:function(){At("add")}},a.createElement(A.A,null)),Fe.length>1&&a.createElement(h.A,{"aria-label":"delete",onClick:function(){At("delete")}},a.createElement(g.A,null))))),a.createElement(f.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),a.createElement(i.Ay,{item:!0,xs:6},a.createElement(l.A,{mr:4},a.createElement(m.A,{ml:1,mb:1,mt:1,variant:"body1"},"Template"),a.createElement(E.A,{fullWidth:!0,sx:{m:1},variant:"standard"},Fe.map((function(e,t){if(Ue==t)return a.createElement(l.A,{key:t,display:"flex"},a.createElement(o.A,{elevation:5,style:{width:"100%"}},a.createElement(l.A,{p:2,style:{width:"100%"}},a.createElement(w.A,{direction:"row",justifyContent:"space-between"},a.createElement(u.A,{label:"Template Name",multiline:!0,maxRows:1,InputLabelProps:{shrink:!0},size:"small",defaultValue:e.displayed_name,onChange:function(e){ft(e.target.value,"displayed_name")},inputProps:{maxLength:35}}),a.createElement(q.A,{disabled:!0,control:a.createElement(L.A,{defaultChecked:!0}),label:"Added"})),a.createElement(E.A,{fullWidth:!0,sx:{mt:1},variant:"standard"},a.createElement(u.A,{label:"Parent Instruction",multiline:!0,minRows:6,maxRows:8,InputLabelProps:{shrink:!0},onChange:function(e){ft(e.target.value,"instruct")},defaultValue:e.instruct,inputProps:{maxLength:2500}})))))})),a.createElement(b.JY,{onDragEnd:function(e){var t=Array.from(mt),n=z(t.splice(e.source.index,1),1)[0];t.splice(e.destination.index,0,n),pt(t)}},a.createElement(b.gL,{droppableId:"childrens"},(function(e){return a.createElement(l.A,N({className:"childrens"},e.droppableProps,{ref:e.innerRef}),mt&&mt.map((function(e,t){return a.createElement(b.sx,{key:null!==e.id?e.id:e.unique,draggableId:"".concat(null!==e.id?e.id:e.unique),index:t},(function(n){return a.createElement(l.A,N({mt:1,mb:1,display:"flex",ref:n.innerRef},n.draggableProps,n.dragHandleProps),a.createElement(l.A,{mr:2},a.createElement(f.A,{orientation:"vertical"})),a.createElement(o.A,{elevation:2,style:{width:"100%"}},a.createElement(w.A,{direction:"row",p:2,spacing:2,style:{width:"100%"}},a.createElement(l.A,null,a.createElement(h.A,{"aria-label":"delete"},a.createElement(v.A,null))),a.createElement(l.A,{mt:1,mb:1,style:{width:"100%"}},a.createElement(w.A,{direction:"row",sx:{display:"flex",justifyContent:"space-between"}},a.createElement(u.A,{label:"Children No.".concat(t," Name"),inputProps:{maxLength:35},maxRows:1,defaultValue:e.displayed_name,size:"small",InputLabelProps:{shrink:!0},onChange:function(e){return ht(t,"displayed_name",e.target.value)}}),a.createElement(l.A,null,a.createElement(q.A,{control:a.createElement(L.A,{onChange:function(e){ht(t,"add",e.target.checked)}}),label:"Add"}),a.createElement(h.A,{"aria-label":"delete",onClick:function(){Et("delete",t)}},a.createElement(g.A,null)))),a.createElement(E.A,{fullWidth:!0,sx:{mt:1},variant:"standard"},a.createElement(u.A,{label:"Child No.".concat(t," Instruction"),multiline:!0,minRows:6,inputProps:{maxLength:2500},InputLabelProps:{shrink:!0},fullWidth:!0,maxRows:8,defaultValue:e.instruct,onChange:function(e){return ht(t,"instruct",e.target.value)}}))))))}))})),e.placeholder)}))),a.createElement(l.A,{display:"flex",justifyContent:"center",alignItems:"center"},a.createElement(l.A,{mr:1},a.createElement(P.A,{size:"small",loading:ve,loadingPosition:"end",variant:"contained",onClick:function(){we(!0);var e={headers:{"content-type":"application/json","X-CSRFToken":(0,O.R)("csrftoken")}},t={parent_instruction:Fe[Ue],childrens:mt};r.A.post("/frontend-api/post-user-instruction",t,e).then((function(e){rt(!0),xe(!0),we(!1),tt(!0)})).catch((function(e){we(!1),Ce(!0),Ie(e.response.data.detail)}))},endIcon:a.createElement(_.A,null)},"Save")),Ke&&a.createElement(y.A,{severity:"warning"},"Reaching the maximum number of child (",ut,")."),!Ke&&a.createElement(h.A,{"aria-label":"add",onClick:function(){Et("add",null)}},a.createElement(A.A,null)),a.createElement(I.A,{open:Se,autoHideDuration:3e3,onClose:function(){xe(!1)},message:"Saved !"}),a.createElement(I.A,{open:je,autoHideDuration:6e3,onClose:function(){Ce(!1)},message:Pe}),a.createElement(I.A,{open:Te,autoHideDuration:3e3,onClose:function(){De(!1)},message:"Deleted !"}),a.createElement(I.A,{open:qe,autoHideDuration:6e3,onClose:function(){Le(!1)},message:Ne}))))),a.createElement(f.A,{orientation:"vertical",flexItem:!0,sx:{mr:"-1px"}}),a.createElement(i.Ay,{item:!0,xs:4},a.createElement(m.A,{mt:1,mb:1,variant:"body1"},"Testbed"),a.createElement(T.s,{inputsize:300,chat_message:Y,usermessage:B,usermessageError:te,ChatPaper:X,ChatInput:G,setUserMessage:Q,submitChat:_t,messagesEndRef:t,shownthinking:he,handleEnter:function(e){"Enter"!=e.key||e.shiftKey||_t()}}))))),a.createElement(d.A,null))}}}]);