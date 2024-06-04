"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[204],{44090:(e,t,n)=>{n.d(t,{Ay:()=>R});var a=n(98587),r=n(58168),o=n(96540),s=n(34164),i=n(25419),l=n(64111),c=n(771),u=n(11848),d=n(3541),m=n(18850),p=n(25602),f=n(2778),g=n(96852),y=n(32850),h=n(27553),b=n(17245);function A(e){return(0,b.Ay)("MuiListItem",e)}const v=(0,h.A)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);var S=n(22927);function w(e){return(0,b.Ay)("MuiListItemSecondaryAction",e)}(0,h.A)("MuiListItemSecondaryAction",["root","disableGutters"]);var _=n(74848);const E=["className"],x=(0,u.Ay)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.disableGutters&&t.disableGutters]}})((({ownerState:e})=>(0,r.A)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},e.disableGutters&&{right:0}))),C=o.forwardRef((function(e,t){const n=(0,d.A)({props:e,name:"MuiListItemSecondaryAction"}),{className:i}=n,c=(0,a.A)(n,E),u=o.useContext(y.A),m=(0,r.A)({},n,{disableGutters:u.disableGutters}),p=(e=>{const{disableGutters:t,classes:n}=e,a={root:["root",t&&"disableGutters"]};return(0,l.A)(a,w,n)})(m);return(0,_.jsx)(x,(0,r.A)({className:(0,s.A)(p.root,i),ownerState:m,ref:t},c))}));C.muiName="ListItemSecondaryAction";const P=C,O=["className"],k=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],I=(0,u.Ay)("div",{name:"MuiListItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dense&&t.dense,"flex-start"===n.alignItems&&t.alignItemsFlexStart,n.divider&&t.divider,!n.disableGutters&&t.gutters,!n.disablePadding&&t.padding,n.button&&t.button,n.hasSecondaryAction&&t.secondaryAction]}})((({theme:e,ownerState:t})=>(0,r.A)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!t.disablePadding&&(0,r.A)({paddingTop:8,paddingBottom:8},t.dense&&{paddingTop:4,paddingBottom:4},!t.disableGutters&&{paddingLeft:16,paddingRight:16},!!t.secondaryAction&&{paddingRight:48}),!!t.secondaryAction&&{[`& > .${S.A.root}`]:{paddingRight:48}},{[`&.${v.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${v.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${v.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${v.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},"flex-start"===t.alignItems&&{alignItems:"flex-start"},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},t.button&&{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${v.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}}},t.hasSecondaryAction&&{paddingRight:48}))),j=(0,u.Ay)("li",{name:"MuiListItem",slot:"Container",overridesResolver:(e,t)=>t.container})({position:"relative"}),R=o.forwardRef((function(e,t){const n=(0,d.A)({props:e,name:"MuiListItem"}),{alignItems:c="center",autoFocus:u=!1,button:h=!1,children:b,className:S,component:w,components:E={},componentsProps:x={},ContainerComponent:C="li",ContainerProps:{className:R}={},dense:M=!1,disabled:N=!1,disableGutters:$=!1,disablePadding:G=!1,divider:L=!1,focusVisibleClassName:W,secondaryAction:T,selected:D=!1,slotProps:F={},slots:V={}}=n,B=(0,a.A)(n.ContainerProps,O),J=(0,a.A)(n,k),q=o.useContext(y.A),U=o.useMemo((()=>({dense:M||q.dense||!1,alignItems:c,disableGutters:$})),[c,q.dense,M,$]),X=o.useRef(null);(0,f.A)((()=>{u&&X.current&&X.current.focus()}),[u]);const z=o.Children.toArray(b),H=z.length&&(0,p.A)(z[z.length-1],["ListItemSecondaryAction"]),K=(0,r.A)({},n,{alignItems:c,autoFocus:u,button:h,dense:U.dense,disabled:N,disableGutters:$,disablePadding:G,divider:L,hasSecondaryAction:H,selected:D}),Q=(e=>{const{alignItems:t,button:n,classes:a,dense:r,disabled:o,disableGutters:s,disablePadding:i,divider:c,hasSecondaryAction:u,selected:d}=e,m={root:["root",r&&"dense",!s&&"gutters",!i&&"padding",c&&"divider",o&&"disabled",n&&"button","flex-start"===t&&"alignItemsFlexStart",u&&"secondaryAction",d&&"selected"],container:["container"]};return(0,l.A)(m,A,a)})(K),Y=(0,g.A)(X,t),Z=V.root||E.Root||I,ee=F.root||x.root||{},te=(0,r.A)({className:(0,s.A)(Q.root,ee.className,S),disabled:N},J);let ne=w||"li";return h&&(te.component=w||"div",te.focusVisibleClassName=(0,s.A)(v.focusVisible,W),ne=m.A),H?(ne=te.component||w?ne:"div","li"===C&&("li"===ne?ne="div":"li"===te.component&&(te.component="div")),(0,_.jsx)(y.A.Provider,{value:U,children:(0,_.jsxs)(j,(0,r.A)({as:C,className:(0,s.A)(Q.container,R),ref:Y,ownerState:K},B,{children:[(0,_.jsx)(Z,(0,r.A)({},ee,!(0,i.g)(Z)&&{as:ne,ownerState:(0,r.A)({},K,ee.ownerState)},te,{children:z})),z.pop()]}))})):(0,_.jsx)(y.A.Provider,{value:U,children:(0,_.jsxs)(Z,(0,r.A)({},ee,{as:ne,ref:Y},!(0,i.g)(Z)&&{ownerState:(0,r.A)({},K,ee.ownerState)},te,{children:[z,T&&(0,_.jsx)(P,{children:T})]}))})}))},20204:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var a=n(96540),r=n(46266),o=n(69067),s=n(8239),i=n(11848),l=n(14073),c=n(60538),u=n(30995),d=n(97834),m=n(25239),p=n(49799),f=n(82241),g=n(1043),y=n(71543),h=n(37211),b=n(44090),A=n(37312),v=n(83248),S=n(92497),w=n(6276),_=n(38960);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,o,s,i=[],l=!0,c=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(a=o.call(n)).done)&&(i.push(a.value),i.length!==t);l=!0);}catch(e){c=!0,r=e}finally{try{if(!l&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(c)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){var a,r,o,s;a=e,r=t,o=n[t],s=function(e,t){if("object"!=E(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=E(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==E(s)?s:s+"")in a?Object.defineProperty(a,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[r]=o})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var k=(0,i.Ay)(c.A)((function(e){var t=e.theme;return O({minWidth:300,height:700,overflow:"auto",padding:t.spacing(2)},t.typography.body2)})),I=(0,i.Ay)(g.A)((function(e){return O({width:"100%"},e.theme.typography.body2)}));const j=function(){(0,a.useRef)();var e=(0,a.useRef)(null),t=(0,a.useRef)(null),n=(0,a.useRef)(null),i=x((0,a.useState)(!1),2),g=i[0],E=i[1],C=x((0,a.useState)(!1),2),P=C[0],O=C[1],j=x((0,a.useState)("Assignment Agent"),2),R=j[0],M=j[1],N=x((0,a.useState)([]),2),$=N[0],G=N[1],L=x((0,a.useState)([]),2),W=L[0],T=L[1],D=x((0,a.useState)([]),2),F=D[0],V=D[1],B=x((0,a.useState)([]),2),J=B[0],q=B[1],U=x((0,a.useState)("gpt-4"),2),X=U[0],z=U[1],H=x((0,a.useState)("Llama 3 Instruct AWQ"),2),K=H[0],Q=H[1],Y=x((0,a.useState)(.72),2),Z=Y[0],ee=Y[1],te=x((0,a.useState)(-1),2),ne=te[0],ae=te[1],re=x((0,a.useState)("chat"),2),oe=re[0],se=re[1],ie=x((0,a.useState)(null),2),le=ie[0],ce=ie[1],ue=x((0,a.useState)(!0),2),de=ue[0],me=ue[1],pe=x((0,a.useState)(.73),2),fe=pe[0],ge=pe[1],ye=x((0,a.useState)(!1),2),he=ye[0],be=ye[1],Ae=x((0,a.useState)(!1),2),ve=Ae[0],Se=Ae[1],we=x((0,a.useState)(2),2),_e=we[0],Ee=we[1],xe=x((0,a.useState)(0),2),Ce=xe[0],Pe=xe[1],Oe=x((0,a.useState)(0),2),ke=Oe[0],Ie=Oe[1],je=x((0,a.useState)(0),2),Re=je[0],Me=je[1],Ne=x((0,a.useState)(""),2),$e=Ne[0],Ge=Ne[1],Le=x((0,a.useState)(!1),2),We=Le[0],Te=Le[1],De=x((0,a.useState)(""),2),Fe=De[0],Ve=De[1],Be=x((0,a.useState)(!1),2),Je=Be[0],qe=Be[1],Ue=x((0,a.useState)(4),2),Xe=Ue[0],ze=Ue[1],He=x((0,a.useState)(1),2),Ke=He[0],Qe=(He[1],x((0,a.useState)([]),2)),Ye=Qe[0],Ze=Qe[1],et=x((0,a.useState)([]),2),tt=et[0],nt=et[1],at=x((0,a.useState)(""),2),rt=at[0],ot=at[1],st=x((0,a.useState)(""),2),it=st[0],lt=st[1],ct=x((0,a.useState)(!0),2),ut=ct[0],dt=ct[1],mt=x((0,a.useState)(!1),2),pt=mt[0],ft=mt[1],gt=x((0,a.useState)("async"),2),yt=gt[0],ht=gt[1],bt=Intl.DateTimeFormat().resolvedOptions().timeZone,At=x(a.useState(0),2),vt=At[0],St=At[1];(0,a.useEffect)((function(){r.A.all([r.A.get("/frontend-api/model"),r.A.get("/frontend-api/instruction-tree")]).then(r.A.spread((function(e,t){for(var n in G(e.data.models),q(e.data.models_agent),Ze(t.data.root_nodes),lt(t.data.default_children[0].instruct),nt(t.data.default_children),t.data.root_nodes)t.data.root_nodes[n].name==R&&ot(t.data.root_nodes[n].instruct)}))).catch((function(e){console.log(e)}))}),[]);var wt=function(){var e;null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})};(0,a.useEffect)((function(){wt()}),[W]),(0,a.useEffect)((function(){wt()}),[F]);var _t="https:"==window.location.protocol?"wss":"ws",Et=window.location.pathname.split("/").filter((function(e){return""!==e}));(0,a.useEffect)((function(){Promise.all([e.current=new WebSocket(_t+"://"+window.location.host+"/ws/engineer/"+Et[Et.length-1]+"/"+bt+"/"),t.current=new WebSocket(_t+"://"+window.location.host+"/ws/chat/"+Et[Et.length-1]+"/"+bt+"/")]),Promise.all([(0,w.u)(t,T,O,document),(0,w.j)(e,V,E,document,ot,lt,nt)])}),[]),(0,a.useEffect)((function(){Promise.all([e.current.close(),t.current.close()]),"async"==yt?Promise.all([e.current=new WebSocket(_t+"://"+window.location.host+"/ws/engineer-async/"+Et[Et.length-1]+"/"+bt+"/"),t.current=new WebSocket(_t+"://"+window.location.host+"/ws/chat-async/"+Et[Et.length-1]+"/"+bt+"/")]):Promise.all([e.current=new WebSocket(_t+"://"+window.location.host+"/ws/engineer/"+Et[Et.length-1]+"/"+bt+"/"),t.current=new WebSocket(_t+"://"+window.location.host+"/ws/chat/"+Et[Et.length-1]+"/"+bt+"/")]),Promise.all([(0,w.u)(t,T,O,document),(0,w.j)(e,V,E,document,ot,lt,nt)])}),[yt]);var xt=function(e){"Enter"!=e.key||e.shiftKey||(ut?(Ot(),Pt()):ut||"chat-input"!=e.target.id?ut||"agent-input"!=e.target.id||Pt():Ot())},Ct=function(e){ut&&(Ve(e),Ge(e))},Pt=function(){if(""==Fe)qe(!0);else{var t={max_turn:Xe,instruct_change:pt,currentParagraph:Ke,message:Fe,choosen_models:X,choosen_template:R,role:"Human",top_p:Z,max_tokens:le,frequency_penalty:ke,presence_penalty:Ce,temperature:fe,agent_instruction:rt,child_instruction:it};e.current.send(JSON.stringify(t)),Ve(""),ft(!1)}},Ot=function(){if(""==$e)Te(!0);else{var e={mode:oe,message:$e,choosen_models:K,role:"Human",top_k:ne,top_p:Z,best_of:_e,max_tokens:le,frequency_penalty:ke,presence_penalty:Ce,temperature:fe,beam:he,early_stopping:ve,length_penalty:Re,include_memory:de};t.current.send(JSON.stringify(e)),Ge("")}};return a.createElement(d.A,{maxWidth:!1,sx:{minWidth:1500},disableGutters:!0},a.createElement("title",null,"Hotpot"),a.createElement(A.A,{max_width:!1}),a.createElement(d.A,{maxWidth:!1,sx:{minWidth:1500}},a.createElement(o.A,{m:1},a.createElement(s.Ay,{container:!0,spacing:2},a.createElement(s.Ay,{item:!0,xs:2},a.createElement(o.A,null,a.createElement(l.A,{variant:"h6",id:"nested-list-subheader"},"Template Structure")),a.createElement(p.A,null,tt.map((function(t,n){return a.createElement(b.Ay,{key:t.name,disablePadding:!0},a.createElement(h.A,{selected:vt===n,onClick:function(a){var r;r=t.name,e.current.send(JSON.stringify({swap_child_instruct:r,template_type:"system"})),function(e,t){St(t)}(0,n)}},a.createElement(f.A,{primary:t.name})))}))),a.createElement(y.A,null),a.createElement(u.A,{mt:1,spacing:1},a.createElement(l.A,{variant:"h6",gutterBottom:!0},"Parent Instruction"),a.createElement(c.A,null,a.createElement(I,{id:"parent-instruct",multiline:!0,maxRows:8,value:rt,onChange:function(e){ot(e.target.value),ft(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:a.createElement(m.A,{position:"start"},"   ")}})),a.createElement(y.A,null),a.createElement(l.A,{variant:"h6",gutterBottom:!0},"Child Instruction"),a.createElement(c.A,null,a.createElement(I,{id:"child-instruct",multiline:!0,maxRows:8,value:it,onChange:function(e){lt(e.target.value),ft(!0)},minRows:6,variant:"standard",InputProps:{startAdornment:a.createElement(m.A,{position:"start"},"   ")}})))),a.createElement(s.Ay,{item:!0,xs:4},a.createElement(v.a,{id:"chat-log",inputsize:660,chat_message:W,usermessage:$e,usermessageError:We,ChatPaper:k,ChatInput:I,setUserMessage:Ge,submitChat:Ot,messagesEndRef:n,shownthinking:P,handleEnter:xt,check_duplicate_message:Ct})),a.createElement(s.Ay,{item:!0,xs:4},a.createElement(v.a,{id:"chat-log-agent",inputsize:660,chat_message:F,usermessage:Fe,usermessageError:Je,ChatPaper:k,ChatInput:I,setUserMessage:Ve,submitChat:Pt,messagesEndRef:n,shownthinking:g,handleEnter:xt,check_duplicate_message:Ct})),a.createElement(s.Ay,{item:!0,xs:2},a.createElement(S.WJ,{socket_destination:yt,setSocketDestination:ht,template_list:Ye,choosen_template:R,setChoosenTemplate:M,model_objects:$,agent_objects:J,choosen_chat_model:K,choosen_agent_model:X,top_k:ne,top_p:Z,max_tokens:le,temperature:fe,mode:oe,bestof:_e,lengthpenalty:Re,presencepenalty:Ce,frequencypenalty:ke,max_turn:Xe,setMaxTurn:ze,setBeam:be,setMaxToken:ce,setBestof:Ee,setTemperature:ge,setMode:se,setLengthPenalty:Me,setPresencePenalty:Pe,setFrequencyPenalty:Ie,setTopk:ae,setTopp:ee,setUseMemory:me,earlystopping:ve,setEarlyStopping:Se,setChoosenAgentModel:z,setChoosenChatModel:Q,setDuplicateMessage:dt,swap_template:function(t){e.current.send(JSON.stringify({swap_template:t,template_type:"system"}))}}))))),a.createElement(_.A,null))}}}]);