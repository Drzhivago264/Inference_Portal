"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[300],{72048:(e,t,o)=>{var n=o(24994);t.A=void 0;var r=n(o(42032)),i=o(74848);t.A=(0,r.default)((0,i.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore")},40921:(e,t,o)=>{o.d(t,{A:()=>$});var n=o(58168),r=o(98587),i=o(96540),a=(o(44363),o(34164)),s=o(64111),d=o(76081),l=o(11848),c=o(52848),p=o(60538),u=o(55120),m=o(41159),h=o(6025),g=o(27553),A=o(17245);function b(e){return(0,A.Ay)("MuiAccordion",e)}const f=(0,g.A)("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]);var v=o(74848);const y=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],x=(0,d.h)("MuiAccordion"),w=(0,l.Ay)(p.A,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${f.region}`]:t.region},t.root,!o.square&&t.rounded,!o.disableGutters&&t.gutters]}})((({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],t),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${f.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${f.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}}),(({theme:e})=>({variants:[{props:e=>!e.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:e=>!e.disableGutters,style:{[`&.${f.expanded}`]:{margin:"16px 0"}}}]}))),$=i.forwardRef((function(e,t){const o=x({props:e,name:"MuiAccordion"}),{children:d,className:l,defaultExpanded:p=!1,disabled:g=!1,disableGutters:A=!1,expanded:f,onChange:$,square:C=!1,slots:R={},slotProps:S={},TransitionComponent:M,TransitionProps:E}=o,N=(0,r.A)(o,y),[k,I]=(0,m.A)({controlled:f,default:p,name:"Accordion",state:"expanded"}),G=i.useCallback((e=>{I(!k),$&&$(e,!k)}),[k,$,I]),[j,...z]=i.Children.toArray(d),T=i.useMemo((()=>({expanded:k,disabled:g,disableGutters:A,toggle:G})),[k,g,A,G]),V=(0,n.A)({},o,{square:C,disabled:g,disableGutters:A,expanded:k}),O=(e=>{const{classes:t,square:o,expanded:n,disabled:r,disableGutters:i}=e,a={root:["root",!o&&"rounded",n&&"expanded",r&&"disabled",!i&&"gutters"],region:["region"]};return(0,s.A)(a,b,t)})(V),D=(0,n.A)({transition:M},R),W=(0,n.A)({transition:E},S),[B,F]=(0,h.A)("transition",{elementType:c.A,externalForwardedProps:{slots:D,slotProps:W},ownerState:V});return(0,v.jsxs)(w,(0,n.A)({className:(0,a.A)(O.root,l),ref:t,ownerState:V,square:C},N,{children:[(0,v.jsx)(u.A.Provider,{value:T,children:j}),(0,v.jsx)(B,(0,n.A)({in:k,timeout:"auto"},F,{children:(0,v.jsx)("div",{"aria-labelledby":j.props.id,id:j.props["aria-controls"],role:"region",className:O.region,children:z})}))]}))}))},55120:(e,t,o)=>{o.d(t,{A:()=>n});const n=o(96540).createContext({})},16576:(e,t,o)=>{o.d(t,{A:()=>b});var n=o(58168),r=o(98587),i=o(96540),a=o(34164),s=o(64111),d=o(76081),l=o(11848),c=o(27553),p=o(17245);function u(e){return(0,p.Ay)("MuiAccordionDetails",e)}(0,c.A)("MuiAccordionDetails",["root"]);var m=o(74848);const h=["className"],g=(0,d.h)("MuiAccordionDetails"),A=(0,l.Ay)("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>({padding:e.spacing(1,2,2)}))),b=i.forwardRef((function(e,t){const o=g({props:e,name:"MuiAccordionDetails"}),{className:i}=o,d=(0,r.A)(o,h),l=o,c=(e=>{const{classes:t}=e;return(0,s.A)({root:["root"]},u,t)})(l);return(0,m.jsx)(A,(0,n.A)({className:(0,a.A)(c.root,i),ref:t,ownerState:l},d))}))},48719:(e,t,o)=>{o.d(t,{A:()=>w});var n=o(58168),r=o(98587),i=o(96540),a=o(34164),s=o(64111),d=o(76081),l=o(11848),c=o(26606),p=o(55120),u=o(27553),m=o(17245);function h(e){return(0,m.Ay)("MuiAccordionSummary",e)}const g=(0,u.A)("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]);var A=o(74848);const b=["children","className","expandIcon","focusVisibleClassName","onClick"],f=(0,d.h)("MuiAccordionSummary"),v=(0,l.Ay)(c.A,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],t),[`&.${g.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${g.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${g.disabled})`]:{cursor:"pointer"},variants:[{props:e=>!e.disableGutters,style:{[`&.${g.expanded}`]:{minHeight:64}}}]}})),y=(0,l.Ay)("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,t)=>t.content})((({theme:e})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:e=>!e.disableGutters,style:{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${g.expanded}`]:{margin:"20px 0"}}}]}))),x=(0,l.Ay)("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,t)=>t.expandIconWrapper})((({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${g.expanded}`]:{transform:"rotate(180deg)"}}))),w=i.forwardRef((function(e,t){const o=f({props:e,name:"MuiAccordionSummary"}),{children:d,className:l,expandIcon:c,focusVisibleClassName:u,onClick:m}=o,g=(0,r.A)(o,b),{disabled:w=!1,disableGutters:$,expanded:C,toggle:R}=i.useContext(p.A),S=(0,n.A)({},o,{expanded:C,disabled:w,disableGutters:$}),M=(e=>{const{classes:t,expanded:o,disabled:n,disableGutters:r}=e,i={root:["root",o&&"expanded",n&&"disabled",!r&&"gutters"],focusVisible:["focusVisible"],content:["content",o&&"expanded",!r&&"contentGutters"],expandIconWrapper:["expandIconWrapper",o&&"expanded"]};return(0,s.A)(i,h,t)})(S);return(0,A.jsxs)(v,(0,n.A)({focusRipple:!1,disableRipple:!0,disabled:w,component:"div","aria-expanded":C,className:(0,a.A)(M.root,l),focusVisibleClassName:(0,a.A)(M.focusVisible,u),onClick:e=>{R&&R(e),m&&m(e)},ref:t,ownerState:S},g,{children:[(0,A.jsx)(y,{className:M.content,ownerState:S,children:d}),c&&(0,A.jsx)(x,{className:M.expandIconWrapper,ownerState:S,children:c})]}))}))},52848:(e,t,o)=>{o.d(t,{A:()=>R});var n=o(98587),r=o(58168),i=o(96540),a=o(34164),s=o(37353),d=o(83963),l=o(64111),c=o(11848),p=o(3541),u=o(17091),m=o(35186),h=o(44675),g=o(96852),A=o(27553),b=o(17245);function f(e){return(0,b.Ay)("MuiCollapse",e)}(0,A.A)("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);var v=o(74848);const y=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],x=(0,c.Ay)("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.orientation],"entered"===o.state&&t.entered,"exited"===o.state&&!o.in&&"0px"===o.collapsedSize&&t.hidden]}})((({theme:e,ownerState:t})=>(0,r.A)({height:0,overflow:"hidden",transition:e.transitions.create("height")},"horizontal"===t.orientation&&{height:"auto",width:0,transition:e.transitions.create("width")},"entered"===t.state&&(0,r.A)({height:"auto",overflow:"visible"},"horizontal"===t.orientation&&{width:"auto"}),"exited"===t.state&&!t.in&&"0px"===t.collapsedSize&&{visibility:"hidden"}))),w=(0,c.Ay)("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(e,t)=>t.wrapper})((({ownerState:e})=>(0,r.A)({display:"flex",width:"100%"},"horizontal"===e.orientation&&{width:"auto",height:"100%"}))),$=(0,c.Ay)("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(e,t)=>t.wrapperInner})((({ownerState:e})=>(0,r.A)({width:"100%"},"horizontal"===e.orientation&&{width:"auto",height:"100%"}))),C=i.forwardRef((function(e,t){const o=(0,p.A)({props:e,name:"MuiCollapse"}),{addEndListener:c,children:A,className:b,collapsedSize:C="0px",component:R,easing:S,in:M,onEnter:E,onEntered:N,onEntering:k,onExit:I,onExited:G,onExiting:j,orientation:z="vertical",style:T,timeout:V=u.p0.standard,TransitionComponent:O=s.Ay}=o,D=(0,n.A)(o,y),W=(0,r.A)({},o,{orientation:z,collapsedSize:C}),B=(e=>{const{orientation:t,classes:o}=e,n={root:["root",`${t}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${t}`],wrapperInner:["wrapperInner",`${t}`]};return(0,l.A)(n,f,o)})(W),F=(0,h.A)(),H=(0,d.A)(),L=i.useRef(null),P=i.useRef(),q="number"==typeof C?`${C}px`:C,X="horizontal"===z,_=X?"width":"height",J=i.useRef(null),K=(0,g.A)(t,J),Q=e=>t=>{if(e){const o=J.current;void 0===t?e(o):e(o,t)}},U=()=>L.current?L.current[X?"clientWidth":"clientHeight"]:0,Y=Q(((e,t)=>{L.current&&X&&(L.current.style.position="absolute"),e.style[_]=q,E&&E(e,t)})),Z=Q(((e,t)=>{const o=U();L.current&&X&&(L.current.style.position="");const{duration:n,easing:r}=(0,m.c)({style:T,timeout:V,easing:S},{mode:"enter"});if("auto"===V){const t=F.transitions.getAutoHeightDuration(o);e.style.transitionDuration=`${t}ms`,P.current=t}else e.style.transitionDuration="string"==typeof n?n:`${n}ms`;e.style[_]=`${o}px`,e.style.transitionTimingFunction=r,k&&k(e,t)})),ee=Q(((e,t)=>{e.style[_]="auto",N&&N(e,t)})),te=Q((e=>{e.style[_]=`${U()}px`,I&&I(e)})),oe=Q(G),ne=Q((e=>{const t=U(),{duration:o,easing:n}=(0,m.c)({style:T,timeout:V,easing:S},{mode:"exit"});if("auto"===V){const o=F.transitions.getAutoHeightDuration(t);e.style.transitionDuration=`${o}ms`,P.current=o}else e.style.transitionDuration="string"==typeof o?o:`${o}ms`;e.style[_]=q,e.style.transitionTimingFunction=n,j&&j(e)}));return(0,v.jsx)(O,(0,r.A)({in:M,onEnter:Y,onEntered:ee,onEntering:Z,onExit:te,onExited:oe,onExiting:ne,addEndListener:e=>{"auto"===V&&H.start(P.current||0,e),c&&c(J.current,e)},nodeRef:J,timeout:"auto"===V?null:V},D,{children:(e,t)=>(0,v.jsx)(x,(0,r.A)({as:R,className:(0,a.A)(B.root,b,{entered:B.entered,exited:!M&&"0px"===q&&B.hidden}[e]),style:(0,r.A)({[X?"minWidth":"minHeight"]:q},T),ref:K},t,{ownerState:(0,r.A)({},W,{state:e}),children:(0,v.jsx)(w,{ownerState:(0,r.A)({},W,{state:e}),className:B.wrapper,ref:L,children:(0,v.jsx)($,{ownerState:(0,r.A)({},W,{state:e}),className:B.wrapperInner,children:A})})}))}))}));C.muiSupportAuto=!0;const R=C},73896:(e,t,o)=>{o.d(t,{A:()=>S});var n=o(98587),r=o(58168),i=o(96540),a=o(34164),s=o(64111),d=o(771),l=o(11848),c=o(39770),p=o(3541),u=o(32850),m=o(26606),h=o(2778),g=o(96852),A=o(61347),b=o(66721),f=o(68081),v=o(27553),y=o(17245);function x(e){return(0,y.Ay)("MuiMenuItem",e)}const w=(0,v.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var $=o(74848);const C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],R=(0,l.Ay)(m.A,{shouldForwardProp:e=>(0,c.A)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.dense&&t.dense,o.divider&&t.divider,!o.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,r.A)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${w.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${w.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${w.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${w.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${w.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${A.A.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${A.A.inset}`]:{marginLeft:52},[`& .${f.A.root}`]:{marginTop:0,marginBottom:0},[`& .${f.A.inset}`]:{paddingLeft:36},[`& .${b.A.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,r.A)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${b.A.root} svg`]:{fontSize:"1.25rem"}})))),S=i.forwardRef((function(e,t){const o=(0,p.A)({props:e,name:"MuiMenuItem"}),{autoFocus:d=!1,component:l="li",dense:c=!1,divider:m=!1,disableGutters:A=!1,focusVisibleClassName:b,role:f="menuitem",tabIndex:v,className:y}=o,w=(0,n.A)(o,C),S=i.useContext(u.A),M=i.useMemo((()=>({dense:c||S.dense||!1,disableGutters:A})),[S.dense,c,A]),E=i.useRef(null);(0,h.A)((()=>{d&&E.current&&E.current.focus()}),[d]);const N=(0,r.A)({},o,{dense:M.dense,divider:m,disableGutters:A}),k=(e=>{const{disabled:t,dense:o,divider:n,disableGutters:i,selected:a,classes:d}=e,l={root:["root",o&&"dense",t&&"disabled",!i&&"gutters",n&&"divider",a&&"selected"]},c=(0,s.A)(l,x,d);return(0,r.A)({},d,c)})(o),I=(0,g.A)(E,t);let G;return o.disabled||(G=void 0!==v?v:-1),(0,$.jsx)(u.A.Provider,{value:M,children:(0,$.jsx)(R,(0,r.A)({ref:I,role:f,tabIndex:G,component:l,focusVisibleClassName:(0,a.A)(k.focusVisible,b),className:(0,a.A)(k.root,y)},w,{ownerState:N,classes:k}))})}))},31127:(e,t,o)=>{function n(e){return String(parseFloat(e)).length===String(e).length}function r(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function i(e){return parseFloat(e)}function a(e){return(t,o)=>{const n=r(t);if(n===o)return t;let a=i(t);"px"!==n&&("em"===n||"rem"===n)&&(a=i(t)*i(e));let s=a;if("px"!==o)if("em"===o)s=a/i(e);else{if("rem"!==o)return t;s=a/i(e)}return parseFloat(s.toFixed(5))+o}}function s({size:e,grid:t}){const o=e-e%t,n=o+t;return e-o<n-e?o:n}function d({lineHeight:e,pixels:t,htmlFontSize:o}){return t/(e*o)}function l({cssProperty:e,min:t,max:o,unit:n="rem",breakpoints:r=[600,900,1200],transform:i=null}){const a={[e]:`${t}${n}`},s=(o-t)/r[r.length-1];return r.forEach((o=>{let r=t+s*o;null!==i&&(r=i(r)),a[`@media (min-width:${o}px)`]={[e]:`${Math.round(1e4*r)/1e4}${n}`}})),a}o.d(t,{I3:()=>a,VR:()=>s,a9:()=>n,db:()=>i,l_:()=>r,qW:()=>d,yL:()=>l})}}]);