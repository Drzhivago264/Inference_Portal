"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[8523],{72048:(e,t,o)=>{var n=o(24994);t.A=void 0;var r=n(o(42032)),i=o(74848);t.A=(0,r.default)((0,i.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore")},40921:(e,t,o)=>{o.d(t,{A:()=>R});var n=o(58168),r=o(98587),i=o(96540),a=(o(44363),o(34164)),s=o(64111),d=o(76081),l=o(11848),c=o(52848),u=o(60538),p=o(55120),m=o(41159),h=o(6025),A=o(27553),f=o(17245);function x(e){return(0,f.Ay)("MuiAccordion",e)}const g=(0,A.A)("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]);var b=o(74848);const y=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],v=(0,d.h)("MuiAccordion"),w=(0,l.Ay)(u.A,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${g.region}`]:t.region},t.root,!o.square&&t.rounded,!o.disableGutters&&t.gutters]}})((({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],t),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${g.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${g.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}}),(({theme:e})=>({variants:[{props:e=>!e.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:e=>!e.disableGutters,style:{[`&.${g.expanded}`]:{margin:"16px 0"}}}]}))),R=i.forwardRef((function(e,t){const o=v({props:e,name:"MuiAccordion"}),{children:d,className:l,defaultExpanded:u=!1,disabled:A=!1,disableGutters:f=!1,expanded:g,onChange:R,square:C=!1,slots:S={},slotProps:M={},TransitionComponent:E,TransitionProps:N}=o,$=(0,r.A)(o,y),[G,k]=(0,m.A)({controlled:g,default:u,name:"Accordion",state:"expanded"}),I=i.useCallback((e=>{k(!G),R&&R(e,!G)}),[G,R,k]),[j,...z]=i.Children.toArray(d),T=i.useMemo((()=>({expanded:G,disabled:A,disableGutters:f,toggle:I})),[G,A,f,I]),D=(0,n.A)({},o,{square:C,disabled:A,disableGutters:f,expanded:G}),W=(e=>{const{classes:t,square:o,expanded:n,disabled:r,disableGutters:i}=e,a={root:["root",!o&&"rounded",n&&"expanded",r&&"disabled",!i&&"gutters"],region:["region"]};return(0,s.A)(a,x,t)})(D),V=(0,n.A)({transition:E},S),q=(0,n.A)({transition:N},M),[P,B]=(0,h.A)("transition",{elementType:c.A,externalForwardedProps:{slots:V,slotProps:q},ownerState:D});return(0,b.jsxs)(w,(0,n.A)({className:(0,a.A)(W.root,l),ref:t,ownerState:D,square:C},$,{children:[(0,b.jsx)(p.A.Provider,{value:T,children:j}),(0,b.jsx)(P,(0,n.A)({in:G,timeout:"auto"},B,{children:(0,b.jsx)("div",{"aria-labelledby":j.props.id,id:j.props["aria-controls"],role:"region",className:W.region,children:z})}))]}))}))},55120:(e,t,o)=>{o.d(t,{A:()=>n});const n=o(96540).createContext({})},16576:(e,t,o)=>{o.d(t,{A:()=>x});var n=o(58168),r=o(98587),i=o(96540),a=o(34164),s=o(64111),d=o(76081),l=o(11848),c=o(27553),u=o(17245);function p(e){return(0,u.Ay)("MuiAccordionDetails",e)}(0,c.A)("MuiAccordionDetails",["root"]);var m=o(74848);const h=["className"],A=(0,d.h)("MuiAccordionDetails"),f=(0,l.Ay)("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>({padding:e.spacing(1,2,2)}))),x=i.forwardRef((function(e,t){const o=A({props:e,name:"MuiAccordionDetails"}),{className:i}=o,d=(0,r.A)(o,h),l=o,c=(e=>{const{classes:t}=e;return(0,s.A)({root:["root"]},p,t)})(l);return(0,m.jsx)(f,(0,n.A)({className:(0,a.A)(c.root,i),ref:t,ownerState:l},d))}))},48719:(e,t,o)=>{o.d(t,{A:()=>w});var n=o(58168),r=o(98587),i=o(96540),a=o(34164),s=o(64111),d=o(76081),l=o(11848),c=o(18850),u=o(55120),p=o(27553),m=o(17245);function h(e){return(0,m.Ay)("MuiAccordionSummary",e)}const A=(0,p.A)("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]);var f=o(74848);const x=["children","className","expandIcon","focusVisibleClassName","onClick"],g=(0,d.h)("MuiAccordionSummary"),b=(0,l.Ay)(c.A,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],t),[`&.${A.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${A.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${A.disabled})`]:{cursor:"pointer"},variants:[{props:e=>!e.disableGutters,style:{[`&.${A.expanded}`]:{minHeight:64}}}]}})),y=(0,l.Ay)("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,t)=>t.content})((({theme:e})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:e=>!e.disableGutters,style:{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${A.expanded}`]:{margin:"20px 0"}}}]}))),v=(0,l.Ay)("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,t)=>t.expandIconWrapper})((({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${A.expanded}`]:{transform:"rotate(180deg)"}}))),w=i.forwardRef((function(e,t){const o=g({props:e,name:"MuiAccordionSummary"}),{children:d,className:l,expandIcon:c,focusVisibleClassName:p,onClick:m}=o,A=(0,r.A)(o,x),{disabled:w=!1,disableGutters:R,expanded:C,toggle:S}=i.useContext(u.A),M=(0,n.A)({},o,{expanded:C,disabled:w,disableGutters:R}),E=(e=>{const{classes:t,expanded:o,disabled:n,disableGutters:r}=e,i={root:["root",o&&"expanded",n&&"disabled",!r&&"gutters"],focusVisible:["focusVisible"],content:["content",o&&"expanded",!r&&"contentGutters"],expandIconWrapper:["expandIconWrapper",o&&"expanded"]};return(0,s.A)(i,h,t)})(M);return(0,f.jsxs)(b,(0,n.A)({focusRipple:!1,disableRipple:!0,disabled:w,component:"div","aria-expanded":C,className:(0,a.A)(E.root,l),focusVisibleClassName:(0,a.A)(E.focusVisible,p),onClick:e=>{S&&S(e),m&&m(e)},ref:t,ownerState:M},A,{children:[(0,f.jsx)(y,{className:E.content,ownerState:M,children:d}),c&&(0,f.jsx)(v,{className:E.expandIconWrapper,ownerState:M,children:c})]}))}))},52848:(e,t,o)=>{o.d(t,{A:()=>S});var n=o(98587),r=o(58168),i=o(96540),a=o(34164),s=o(80851),d=o(83963),l=o(64111),c=o(11848),u=o(3541),p=o(17091),m=o(35186),h=o(44675),A=o(96852),f=o(27553),x=o(17245);function g(e){return(0,x.Ay)("MuiCollapse",e)}(0,f.A)("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);var b=o(74848);const y=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],v=(0,c.Ay)("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.orientation],"entered"===o.state&&t.entered,"exited"===o.state&&!o.in&&"0px"===o.collapsedSize&&t.hidden]}})((({theme:e,ownerState:t})=>(0,r.A)({height:0,overflow:"hidden",transition:e.transitions.create("height")},"horizontal"===t.orientation&&{height:"auto",width:0,transition:e.transitions.create("width")},"entered"===t.state&&(0,r.A)({height:"auto",overflow:"visible"},"horizontal"===t.orientation&&{width:"auto"}),"exited"===t.state&&!t.in&&"0px"===t.collapsedSize&&{visibility:"hidden"}))),w=(0,c.Ay)("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(e,t)=>t.wrapper})((({ownerState:e})=>(0,r.A)({display:"flex",width:"100%"},"horizontal"===e.orientation&&{width:"auto",height:"100%"}))),R=(0,c.Ay)("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(e,t)=>t.wrapperInner})((({ownerState:e})=>(0,r.A)({width:"100%"},"horizontal"===e.orientation&&{width:"auto",height:"100%"}))),C=i.forwardRef((function(e,t){const o=(0,u.A)({props:e,name:"MuiCollapse"}),{addEndListener:c,children:f,className:x,collapsedSize:C="0px",component:S,easing:M,in:E,onEnter:N,onEntered:$,onEntering:G,onExit:k,onExited:I,onExiting:j,orientation:z="vertical",style:T,timeout:D=p.p0.standard,TransitionComponent:W=s.Ay}=o,V=(0,n.A)(o,y),q=(0,r.A)({},o,{orientation:z,collapsedSize:C}),P=(e=>{const{orientation:t,classes:o}=e,n={root:["root",`${t}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${t}`],wrapperInner:["wrapperInner",`${t}`]};return(0,l.A)(n,g,o)})(q),B=(0,h.A)(),H=(0,d.A)(),L=i.useRef(null),F=i.useRef(),_="number"==typeof C?`${C}px`:C,O="horizontal"===z,J=O?"width":"height",K=i.useRef(null),Q=(0,A.A)(t,K),U=e=>t=>{if(e){const o=K.current;void 0===t?e(o):e(o,t)}},X=()=>L.current?L.current[O?"clientWidth":"clientHeight"]:0,Y=U(((e,t)=>{L.current&&O&&(L.current.style.position="absolute"),e.style[J]=_,N&&N(e,t)})),Z=U(((e,t)=>{const o=X();L.current&&O&&(L.current.style.position="");const{duration:n,easing:r}=(0,m.c)({style:T,timeout:D,easing:M},{mode:"enter"});if("auto"===D){const t=B.transitions.getAutoHeightDuration(o);e.style.transitionDuration=`${t}ms`,F.current=t}else e.style.transitionDuration="string"==typeof n?n:`${n}ms`;e.style[J]=`${o}px`,e.style.transitionTimingFunction=r,G&&G(e,t)})),ee=U(((e,t)=>{e.style[J]="auto",$&&$(e,t)})),te=U((e=>{e.style[J]=`${X()}px`,k&&k(e)})),oe=U(I),ne=U((e=>{const t=X(),{duration:o,easing:n}=(0,m.c)({style:T,timeout:D,easing:M},{mode:"exit"});if("auto"===D){const o=B.transitions.getAutoHeightDuration(t);e.style.transitionDuration=`${o}ms`,F.current=o}else e.style.transitionDuration="string"==typeof o?o:`${o}ms`;e.style[J]=_,e.style.transitionTimingFunction=n,j&&j(e)}));return(0,b.jsx)(W,(0,r.A)({in:E,onEnter:Y,onEntered:ee,onEntering:Z,onExit:te,onExited:oe,onExiting:ne,addEndListener:e=>{"auto"===D&&H.start(F.current||0,e),c&&c(K.current,e)},nodeRef:K,timeout:"auto"===D?null:D},V,{children:(e,t)=>(0,b.jsx)(v,(0,r.A)({as:S,className:(0,a.A)(P.root,x,{entered:P.entered,exited:!E&&"0px"===_&&P.hidden}[e]),style:(0,r.A)({[O?"minWidth":"minHeight"]:_},T),ref:Q},t,{ownerState:(0,r.A)({},q,{state:e}),children:(0,b.jsx)(w,{ownerState:(0,r.A)({},q,{state:e}),className:P.wrapper,ref:L,children:(0,b.jsx)(R,{ownerState:(0,r.A)({},q,{state:e}),className:P.wrapperInner,children:f})})}))}))}));C.muiSupportAuto=!0;const S=C}}]);