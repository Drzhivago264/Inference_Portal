"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[204],{44090:(e,t,n)=>{n.d(t,{Ay:()=>R});var a=n(98587),r=n(58168),o=n(96540),s=n(34164),i=n(25419),l=n(64111),c=n(771),u=n(11848),d=n(3541),m=n(18850),p=n(25602),f=n(2778),y=n(96852),g=n(32850),h=n(27553),b=n(17245);function A(e){return(0,b.Ay)("MuiListItem",e)}const v=(0,h.A)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);var S=n(22927);function w(e){return(0,b.Ay)("MuiListItemSecondaryAction",e)}(0,h.A)("MuiListItemSecondaryAction",["root","disableGutters"]);var _=n(74848);const E=["className"],x=(0,u.Ay)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.disableGutters&&t.disableGutters]}})((({ownerState:e})=>(0,r.A)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},e.disableGutters&&{right:0}))),C=o.forwardRef((function(e,t){const n=(0,d.A)({props:e,name:"MuiListItemSecondaryAction"}),{className:i}=n,c=(0,a.A)(n,E),u=o.useContext(g.A),m=(0,r.A)({},n,{disableGutters:u.disableGutters}),p=(e=>{const{disableGutters:t,classes:n}=e,a={root:["root",t&&"disableGutters"]};return(0,l.A)(a,w,n)})(m);return(0,_.jsx)(x,(0,r.A)({className:(0,s.A)(p.root,i),ownerState:m,ref:t},c))}));C.muiName="ListItemSecondaryAction";const P=C,O=["className"],I=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],k=(0,u.Ay)("div",{name:"MuiListItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dense&&t.dense,"flex-start"===n.alignItems&&t.alignItemsFlexStart,n.divider&&t.divider,!n.disableGutters&&t.gutters,!n.disablePadding&&t.padding,n.button&&t.button,n.hasSecondaryAction&&t.secondaryAction]}})((({theme:e,ownerState:t})=>(0,r.A)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!t.disablePadding&&(0,r.A)({paddingTop:8,paddingBottom:8},t.dense&&{paddingTop:4,paddingBottom:4},!t.disableGutters&&{paddingLeft:16,paddingRight:16},!!t.secondaryAction&&{paddingRight:48}),!!t.secondaryAction&&{[`& > .${S.A.root}`]:{paddingRight:48}},{[`&.${v.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${v.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${v.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${v.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},"flex-start"===t.alignItems&&{alignItems:"flex-start"},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},t.button&&{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${v.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}}},t.hasSecondaryAction&&{paddingRight:48}))),j=(0,u.Ay)("li",{name:"MuiListItem",slot:"Container",overridesResolver:(e,t)=>t.container})({position:"relative"}),R=o.forwardRef((function(e,t){const n=(0,d.A)({props:e,name:"MuiListItem"}),{alignItems:c="center",autoFocus:u=!1,button:h=!1,children:b,className:S,component:w,components:E={},componentsProps:x={},ContainerComponent:C="li",ContainerProps:{className:R}={},dense:M=!1,disabled:N=!1,disableGutters:$=!1,disablePadding:G=!1,divider:L=!1,focusVisibleClassName:T,secondaryAction:W,selected:D=!1,slotProps:F={},slots:V={}}=n,B=(0,a.A)(n.ContainerProps,O),J=(0,a.A)(n,I),q=o.useContext(g.A),U=o.useMemo((()=>({dense:M||q.dense||!1,alignItems:c,disableGutters:$})),[c,q.dense,M,$]),X=o.useRef(null);(0,f.A)((()=>{u&&X.current&&X.current.focus()}),[u]);const z=o.Children.toArray(b),H=z.length&&(0,p.A)(z[z.length-1],["ListItemSecondaryAction"]),Z=(0,r.A)({},n,{alignItems:c,autoFocus:u,button:h,dense:U.dense,disabled:N,disableGutters:$,disablePadding:G,divider:L,hasSecondaryAction:H,selected:D}),K=(e=>{const{alignItems:t,button:n,classes:a,dense:r,disabled:o,disableGutters:s,disablePadding:i,divider:c,hasSecondaryAction:u,selected:d}=e,m={root:["root",r&&"dense",!s&&"gutters",!i&&"padding",c&&"divider",o&&"disabled",n&&"button","flex-start"===t&&"alignItemsFlexStart",u&&"secondaryAction",d&&"selected"],container:["container"]};return(0,l.A)(m,A,a)})(Z),Y=(0,y.A)(X,t),Q=V.root||E.Root||k,ee=F.root||x.root||{},te=(0,r.A)({className:(0,s.A)(K.root,ee.className,S),disabled:N},J);let ne=w||"li";return h&&(te.component=w||"div",te.focusVisibleClassName=(0,s.A)(v.focusVisible,T),ne=m.A),H?(ne=te.component||w?ne:"div","li"===C&&("li"===ne?ne="div":"li"===te.component&&(te.component="div")),(0,_.jsx)(g.A.Provider,{value:U,children:(0,_.jsxs)(j,(0,r.A)({as:C,className:(0,s.A)(K.container,R),ref:Y,ownerState:Z},B,{children:[(0,_.jsx)(Q,(0,r.A)({},ee,!(0,i.g)(Q)&&{as:ne,ownerState:(0,r.A)({},Z,ee.ownerState)},te,{children:z})),z.pop()]}))})):(0,_.jsx)(g.A.Provider,{value:U,children:(0,_.jsxs)(Q,(0,r.A)({},ee,{as:ne,ref:Y},!(0,i.g)(Q)&&{ownerState:(0,r.A)({},Z,ee.ownerState)},te,{children:[z,W&&(0,_.jsx)(P,{children:W})]}))})}))},20204:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var a=n(96540),r=n(46266),o=n(69067),s=n(8239),i=n(11848),l=n(14073),c=n(60538),u=n(97834),d=n(25239),m=n(49799),p=n(82241),f=n(1043),y=n(71543),g=n(37211),h=n(44090),b=n(37312),A=n(83248),v=n(92497),S=n(6276),w=n(38960),_=n(40921),E=n(48719),x=n(16576),C=n(72048),P=n(47767),O=n(21005),I=n(14627);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function j(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,o,s,i=[],l=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(a=o.call(n)).done)&&(i.push(a.value),i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{if(!l&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(c)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return R(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?R(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){var a,r,o,s;a=e,r=t,o=n[t],s=function(e,t){if("object"!=k(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=k(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==k(s)?s:s+"")in a?Object.defineProperty(a,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[r]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var $=(0,i.Ay)(c.A)((function(e){var t=e.theme;return N({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),G=(0,i.Ay)(f.A)((function(e){return N({width:"100%"},e.theme.typography.body2)}));const L=function(){(0,a.useRef)();var e=(0,a.useRef)(null),t=(0,a.useRef)(null),n=(0,a.useRef)(null),i=j((0,a.useState)(!1),2),f=i[0],k=i[1],R=j((0,a.useState)(!1),2),M=R[0],N=R[1],L=j((0,a.useState)("Assignment Agent"),2),T=L[0],W=L[1],D=j((0,a.useState)([]),2),F=D[0],V=D[1],B=j((0,a.useState)([]),2),J=B[0],q=B[1],U=j((0,a.useState)([]),2),X=U[0],z=U[1],H=j((0,a.useState)([]),2),Z=H[0],K=H[1],Y=j((0,a.useState)("gpt-4"),2),Q=Y[0],ee=Y[1],te=j((0,a.useState)("gpt-4"),2),ne=te[0],ae=te[1],re=j((0,a.useState)(.72),2),oe=re[0],se=re[1],ie=j((0,a.useState)(-1),2),le=ie[0],ce=ie[1],ue=j((0,a.useState)("chat"),2),de=ue[0],me=ue[1],pe=j((0,a.useState)(null),2),fe=pe[0],ye=pe[1],ge=j((0,a.useState)(!0),2),he=ge[0],be=ge[1],Ae=j((0,a.useState)(.73),2),ve=Ae[0],Se=Ae[1],we=j((0,a.useState)(!1),2),_e=we[0],Ee=we[1],xe=j((0,a.useState)(!1),2),Ce=xe[0],Pe=xe[1],Oe=j((0,a.useState)(2),2),Ie=Oe[0],ke=Oe[1],je=j((0,a.useState)(0),2),Re=je[0],Me=je[1],Ne=j((0,a.useState)(0),2),$e=Ne[0],Ge=Ne[1],Le=j((0,a.useState)(0),2),Te=Le[0],We=Le[1],De=j((0,a.useState)(""),2),Fe=De[0],Ve=De[1],Be=j((0,a.useState)(!1),2),Je=Be[0],qe=Be[1],Ue=j((0,a.useState)(""),2),Xe=Ue[0],ze=Ue[1],He=j((0,a.useState)(!1),2),Ze=He[0],Ke=He[1],Ye=j((0,a.useState)(4),2),Qe=Ye[0],et=Ye[1],tt=j((0,a.useState)(1),2),nt=tt[0],at=(tt[1],j((0,a.useState)([]),2)),rt=at[0],ot=at[1],st=j((0,a.useState)([]),2),it=st[0],lt=st[1],ct=j((0,a.useState)(""),2),ut=ct[0],dt=ct[1],mt=j((0,a.useState)(""),2),pt=mt[0],ft=mt[1],yt=j((0,a.useState)(!0),2),gt=yt[0],ht=yt[1],bt=j((0,a.useState)(!1),2),At=bt[0],vt=bt[1],St=j((0,a.useState)("async"),2),wt=St[0],_t=St[1],Et=Intl.DateTimeFormat().resolvedOptions().timeZone,xt=j(a.useState(0),2),Ct=xt[0],Pt=xt[1],Ot=(0,P.Zp)(),It=(0,a.useContext)(I.Rs),kt=It.is_authenticated;It.setIsAuthenticated,(0,a.useEffect)((function(){(0,O.IO)(Ot,kt),r.A.all([r.A.get("/frontend-api/model"),r.A.get("/frontend-api/instruction-tree")]).then(r.A.spread((function(e,t){for(var n in V(e.data.models_bot),K(e.data.models_agent),ot(t.data.root_nodes),ft(t.data.default_children[0].instruct),lt(t.data.default_children),t.data.root_nodes)t.data.root_nodes[n].name==T&&dt(t.data.root_nodes[n].instruct)}))).catch((function(e){console.log(e)}))}),[]);var jt=function(){var e;null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})};(0,a.useEffect)((function(){jt()}),[J]),(0,a.useEffect)((function(){jt()}),[X]);var Rt="https:"==window.location.protocol?"wss":"ws",Mt=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,a.useEffect)((function(){Promise.all([e.current=new WebSocket(Rt+"://"+window.location.host+"/ws/engineer/"+Mt[Mt.length-1]+"/"+Et+"/"),t.current=new WebSocket(Rt+"://"+window.location.host+"/ws/chat/"+Mt[Mt.length-1]+"/"+Et+"/")]),Promise.all([(0,S.u)(t,q,N,document),(0,S.j)(e,z,k,document,dt,ft,lt)])}),[]),(0,a.useEffect)((function(){Promise.all([e.current.close(),t.current.close()]),"async"==wt?Promise.all([e.current=new WebSocket(Rt+"://"+window.location.host+"/ws/engineer-async/"+Mt[Mt.length-1]+"/"+Et+"/"),t.current=new WebSocket(Rt+"://"+window.location.host+"/ws/chat-async/"+Mt[Mt.length-1]+"/"+Et+"/")]):Promise.all([e.current=new WebSocket(Rt+"://"+window.location.host+"/ws/engineer/"+Mt[Mt.length-1]+"/"+Et+"/"),t.current=new WebSocket(Rt+"://"+window.location.host+"/ws/chat/"+Mt[Mt.length-1]+"/"+Et+"/")]),Promise.all([(0,S.u)(t,q,N,document),(0,S.j)(e,z,k,document,dt,ft,lt)])}),[wt]);var Nt=function(e){"Enter"!=e.key||e.shiftKey||(gt?(Lt(),Gt()):gt||"chat-input"!=e.target.id?gt||"agent-input"!=e.target.id||Gt():Lt())},$t=function(e){gt&&(ze(e),Ve(e))},Gt=function(){if(""==Xe)Ke(!0);else{var t={max_turn:Qe,instruct_change:At,currentParagraph:nt,message:Xe,choosen_models:Q,choosen_template:T,role:"Human",top_p:oe,max_tokens:fe,frequency_penalty:$e,presence_penalty:Re,temperature:ve,agent_instruction:ut,child_instruction:pt};e.current.send(JSON.stringify(t)),ze(""),vt(!1)}},Lt=function(){if(""==Fe)qe(!0);else{var e={mode:de,message:Fe,choosen_models:ne,role:"Human",top_k:le,top_p:oe,best_of:Ie,max_tokens:fe,frequency_penalty:$e,presence_penalty:Re,temperature:ve,beam:_e,early_stopping:Ce,length_penalty:Te,include_memory:he};t.current.send(JSON.stringify(e)),Ve("")}};return a.createElement(u.A,{maxWidth:!1,sx:{minWidth:1500},disableGutters:!0},a.createElement("title",null,"Hotpot"),a.createElement(b.A,{max_width:!1}),a.createElement(u.A,{maxWidth:!1,sx:{minWidth:1500}},a.createElement(o.A,{m:1},a.createElement(s.Ay,{container:!0,spacing:2},a.createElement(s.Ay,{item:!0,xs:2},a.createElement(c.A,{variant:"outlined"},a.createElement(o.A,{m:1},a.createElement(l.A,{sx:{color:"text.secondary"}},"Template Structure")),a.createElement(y.A,null),a.createElement(m.A,{dense:!0},it.map((function(t,n){return a.createElement(h.Ay,{key:t.name,disablePadding:!0},a.createElement(g.A,{selected:Ct===n,onClick:function(a){var r;r=t.name,e.current.send(JSON.stringify({swap_child_instruct:r,template_type:"system"})),function(e,t){Pt(t)}(0,n)}},a.createElement(p.A,{primary:t.name})))})))),a.createElement(_.A,null,a.createElement(E.A,{expandIcon:a.createElement(C.A,null),"aria-controls":"child-content",id:"child-header"},a.createElement(l.A,{sx:{color:"text.secondary"}},"Parent Instruction")),a.createElement(x.A,null,a.createElement(c.A,{variant:"outlined"},a.createElement(G,{id:"parent-instruct",multiline:!0,maxRows:8,value:ut,onChange:function(e){dt(e.target.value),vt(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:a.createElement(d.A,{position:"start"},"   ")}})))),a.createElement(_.A,null,a.createElement(E.A,{expandIcon:a.createElement(C.A,null),"aria-controls":"child-content",id:"child-header"},a.createElement(l.A,{sx:{color:"text.secondary"}},"Child Instruction")),a.createElement(x.A,null,a.createElement(c.A,{variant:"outlined"},a.createElement(G,{id:"child-instruct",multiline:!0,maxRows:8,value:pt,onChange:function(e){ft(e.target.value),vt(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:a.createElement(d.A,{position:"start"},"   ")}}))))),a.createElement(s.Ay,{item:!0,xs:4},a.createElement(A.a,{id:"chat-log",inputsize:660,chat_message:J,usermessage:Fe,usermessageError:Je,ChatPaper:$,ChatInput:G,setUserMessage:Ve,submitChat:Lt,messagesEndRef:n,shownthinking:M,handleEnter:Nt,check_duplicate_message:$t})),a.createElement(s.Ay,{item:!0,xs:4},a.createElement(A.a,{id:"chat-log-agent",inputsize:660,chat_message:X,usermessage:Xe,usermessageError:Ze,ChatPaper:$,ChatInput:G,setUserMessage:ze,submitChat:Gt,messagesEndRef:n,shownthinking:f,handleEnter:Nt,check_duplicate_message:$t})),a.createElement(s.Ay,{item:!0,xs:2},a.createElement(v.WJ,{socket_destination:wt,setSocketDestination:_t,template_list:rt,choosen_template:T,setChoosenTemplate:W,model_objects:F,agent_objects:Z,choosen_chat_model:ne,choosen_agent_model:Q,top_k:le,top_p:oe,max_tokens:fe,temperature:ve,mode:de,bestof:Ie,lengthpenalty:Te,presencepenalty:Re,frequencypenalty:$e,max_turn:Qe,setMaxTurn:et,setBeam:Ee,setMaxToken:ye,setBestof:ke,setTemperature:Se,setMode:me,setLengthPenalty:We,setPresencePenalty:Me,setFrequencyPenalty:Ge,setTopk:ce,setTopp:se,setUseMemory:be,earlystopping:Ce,setEarlyStopping:Pe,setChoosenAgentModel:ee,setChoosenChatModel:ae,setDuplicateMessage:ht,swap_template:function(t){e.current.send(JSON.stringify({swap_template:t,template_type:"system"}))}}))))),a.createElement(w.A,null))}}}]);