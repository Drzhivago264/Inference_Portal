"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[720],{72048:(e,t,r)=>{var a=r(24994);t.A=void 0;var o=a(r(42032)),s=r(74848);t.A=(0,o.default)((0,s.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore")},40921:(e,t,r)=>{r.d(t,{A:()=>C});var a=r(58168),o=r(98587),s=r(96540),i=(r(44363),r(34164)),n=r(64111),d=r(76081),l=r(11848),c=r(52848),u=r(60538),p=r(55120),m=r(41159),b=r(6025),f=r(27553),v=r(17245);function h(e){return(0,v.Ay)("MuiAccordion",e)}const g=(0,f.A)("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]);var A=r(74848);const y=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],x=(0,d.h)("MuiAccordion"),k=(0,l.Ay)(u.A,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[{[`& .${g.region}`]:t.region},t.root,!r.square&&t.rounded,!r.disableGutters&&t.gutters]}})((({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],t),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${g.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${g.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}}),(({theme:e})=>({variants:[{props:e=>!e.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:e=>!e.disableGutters,style:{[`&.${g.expanded}`]:{margin:"16px 0"}}}]}))),C=s.forwardRef((function(e,t){const r=x({props:e,name:"MuiAccordion"}),{children:d,className:l,defaultExpanded:u=!1,disabled:f=!1,disableGutters:v=!1,expanded:g,onChange:C,square:S=!1,slots:$={},slotProps:M={},TransitionComponent:R,TransitionProps:w}=r,N=(0,o.A)(r,y),[G,I]=(0,m.A)({controlled:g,default:u,name:"Accordion",state:"expanded"}),P=s.useCallback((e=>{I(!G),C&&C(e,!G)}),[G,C,I]),[V,...j]=s.Children.toArray(d),D=s.useMemo((()=>({expanded:G,disabled:f,disableGutters:v,toggle:P})),[G,f,v,P]),O=(0,a.A)({},r,{square:S,disabled:f,disableGutters:v,expanded:G}),B=(e=>{const{classes:t,square:r,expanded:a,disabled:o,disableGutters:s}=e,i={root:["root",!r&&"rounded",a&&"expanded",o&&"disabled",!s&&"gutters"],region:["region"]};return(0,n.A)(i,h,t)})(O),T=(0,a.A)({transition:R},$),F=(0,a.A)({transition:w},M),[W,q]=(0,b.A)("transition",{elementType:c.A,externalForwardedProps:{slots:T,slotProps:F},ownerState:O});return(0,A.jsxs)(k,(0,a.A)({className:(0,i.A)(B.root,l),ref:t,ownerState:O,square:S},N,{children:[(0,A.jsx)(p.A.Provider,{value:D,children:V}),(0,A.jsx)(W,(0,a.A)({in:G,timeout:"auto"},q,{children:(0,A.jsx)("div",{"aria-labelledby":V.props.id,id:V.props["aria-controls"],role:"region",className:B.region,children:j})}))]}))}))},55120:(e,t,r)=>{r.d(t,{A:()=>a});const a=r(96540).createContext({})},16576:(e,t,r)=>{r.d(t,{A:()=>h});var a=r(58168),o=r(98587),s=r(96540),i=r(34164),n=r(64111),d=r(76081),l=r(11848),c=r(27553),u=r(17245);function p(e){return(0,u.Ay)("MuiAccordionDetails",e)}(0,c.A)("MuiAccordionDetails",["root"]);var m=r(74848);const b=["className"],f=(0,d.h)("MuiAccordionDetails"),v=(0,l.Ay)("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>({padding:e.spacing(1,2,2)}))),h=s.forwardRef((function(e,t){const r=f({props:e,name:"MuiAccordionDetails"}),{className:s}=r,d=(0,o.A)(r,b),l=r,c=(e=>{const{classes:t}=e;return(0,n.A)({root:["root"]},p,t)})(l);return(0,m.jsx)(v,(0,a.A)({className:(0,i.A)(c.root,s),ref:t,ownerState:l},d))}))},48719:(e,t,r)=>{r.d(t,{A:()=>k});var a=r(58168),o=r(98587),s=r(96540),i=r(34164),n=r(64111),d=r(76081),l=r(11848),c=r(26606),u=r(55120),p=r(27553),m=r(17245);function b(e){return(0,m.Ay)("MuiAccordionSummary",e)}const f=(0,p.A)("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]);var v=r(74848);const h=["children","className","expandIcon","focusVisibleClassName","onClick"],g=(0,d.h)("MuiAccordionSummary"),A=(0,l.Ay)(c.A,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,t)=>t.root})((({theme:e})=>{const t={duration:e.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],t),[`&.${f.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${f.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${f.disabled})`]:{cursor:"pointer"},variants:[{props:e=>!e.disableGutters,style:{[`&.${f.expanded}`]:{minHeight:64}}}]}})),y=(0,l.Ay)("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,t)=>t.content})((({theme:e})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:e=>!e.disableGutters,style:{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${f.expanded}`]:{margin:"20px 0"}}}]}))),x=(0,l.Ay)("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,t)=>t.expandIconWrapper})((({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${f.expanded}`]:{transform:"rotate(180deg)"}}))),k=s.forwardRef((function(e,t){const r=g({props:e,name:"MuiAccordionSummary"}),{children:d,className:l,expandIcon:c,focusVisibleClassName:p,onClick:m}=r,f=(0,o.A)(r,h),{disabled:k=!1,disableGutters:C,expanded:S,toggle:$}=s.useContext(u.A),M=(0,a.A)({},r,{expanded:S,disabled:k,disableGutters:C}),R=(e=>{const{classes:t,expanded:r,disabled:a,disableGutters:o}=e,s={root:["root",r&&"expanded",a&&"disabled",!o&&"gutters"],focusVisible:["focusVisible"],content:["content",r&&"expanded",!o&&"contentGutters"],expandIconWrapper:["expandIconWrapper",r&&"expanded"]};return(0,n.A)(s,b,t)})(M);return(0,v.jsxs)(A,(0,a.A)({focusRipple:!1,disableRipple:!0,disabled:k,component:"div","aria-expanded":S,className:(0,i.A)(R.root,l),focusVisibleClassName:(0,i.A)(R.focusVisible,p),onClick:e=>{$&&$(e),m&&m(e)},ref:t,ownerState:M},f,{children:[(0,v.jsx)(y,{className:R.content,ownerState:M,children:d}),c&&(0,v.jsx)(x,{className:R.expandIconWrapper,ownerState:M,children:c})]}))}))},73357:(e,t,r)=>{r.d(t,{A:()=>R});var a=r(98587),o=r(58168),s=r(96540),i=r(34164),n=r(64111),d=r(17437),l=r(28466),c=r(3541),u=r(11848),p=r(27553),m=r(17245);function b(e){return(0,m.Ay)("MuiCircularProgress",e)}(0,p.A)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var f=r(74848);const v=["className","color","disableShrink","size","style","thickness","value","variant"];let h,g,A,y,x=e=>e;const k=(0,d.i7)(h||(h=x`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),C=(0,d.i7)(g||(g=x`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),S=(0,u.Ay)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`color${(0,l.A)(r.color)}`]]}})((({ownerState:e,theme:t})=>(0,o.A)({display:"inline-block"},"determinate"===e.variant&&{transition:t.transitions.create("transform")},"inherit"!==e.color&&{color:(t.vars||t).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,d.AH)(A||(A=x`
      animation: ${0} 1.4s linear infinite;
    `),k))),$=(0,u.Ay)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),M=(0,u.Ay)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.circle,t[`circle${(0,l.A)(r.variant)}`],r.disableShrink&&t.circleDisableShrink]}})((({ownerState:e,theme:t})=>(0,o.A)({stroke:"currentColor"},"determinate"===e.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,d.AH)(y||(y=x`
      animation: ${0} 1.4s ease-in-out infinite;
    `),C))),R=s.forwardRef((function(e,t){const r=(0,c.A)({props:e,name:"MuiCircularProgress"}),{className:s,color:d="primary",disableShrink:u=!1,size:p=40,style:m,thickness:h=3.6,value:g=0,variant:A="indeterminate"}=r,y=(0,a.A)(r,v),x=(0,o.A)({},r,{color:d,disableShrink:u,size:p,thickness:h,value:g,variant:A}),k=(e=>{const{classes:t,variant:r,color:a,disableShrink:o}=e,s={root:["root",r,`color${(0,l.A)(a)}`],svg:["svg"],circle:["circle",`circle${(0,l.A)(r)}`,o&&"circleDisableShrink"]};return(0,n.A)(s,b,t)})(x),C={},R={},w={};if("determinate"===A){const e=2*Math.PI*((44-h)/2);C.strokeDasharray=e.toFixed(3),w["aria-valuenow"]=Math.round(g),C.strokeDashoffset=`${((100-g)/100*e).toFixed(3)}px`,R.transform="rotate(-90deg)"}return(0,f.jsx)(S,(0,o.A)({className:(0,i.A)(k.root,s),style:(0,o.A)({width:p,height:p},R,m),ownerState:x,ref:t,role:"progressbar"},w,y,{children:(0,f.jsx)($,{className:k.svg,ownerState:x,viewBox:"22 22 44 44",children:(0,f.jsx)(M,{className:k.circle,style:C,ownerState:x,cx:44,cy:44,r:(44-h)/2,fill:"none",strokeWidth:h})})}))}))},73896:(e,t,r)=>{r.d(t,{A:()=>M});var a=r(98587),o=r(58168),s=r(96540),i=r(34164),n=r(64111),d=r(771),l=r(11848),c=r(39770),u=r(3541),p=r(32850),m=r(26606),b=r(2778),f=r(96852),v=r(61347),h=r(66721),g=r(68081),A=r(27553),y=r(17245);function x(e){return(0,y.Ay)("MuiMenuItem",e)}const k=(0,A.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var C=r(74848);const S=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],$=(0,l.Ay)(m.A,{shouldForwardProp:e=>(0,c.A)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,o.A)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${k.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${k.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${k.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,d.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${k.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${k.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${v.A.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${v.A.inset}`]:{marginLeft:52},[`& .${g.A.root}`]:{marginTop:0,marginBottom:0},[`& .${g.A.inset}`]:{paddingLeft:36},[`& .${h.A.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,o.A)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${h.A.root} svg`]:{fontSize:"1.25rem"}})))),M=s.forwardRef((function(e,t){const r=(0,u.A)({props:e,name:"MuiMenuItem"}),{autoFocus:d=!1,component:l="li",dense:c=!1,divider:m=!1,disableGutters:v=!1,focusVisibleClassName:h,role:g="menuitem",tabIndex:A,className:y}=r,k=(0,a.A)(r,S),M=s.useContext(p.A),R=s.useMemo((()=>({dense:c||M.dense||!1,disableGutters:v})),[M.dense,c,v]),w=s.useRef(null);(0,b.A)((()=>{d&&w.current&&w.current.focus()}),[d]);const N=(0,o.A)({},r,{dense:R.dense,divider:m,disableGutters:v}),G=(e=>{const{disabled:t,dense:r,divider:a,disableGutters:s,selected:i,classes:d}=e,l={root:["root",r&&"dense",t&&"disabled",!s&&"gutters",a&&"divider",i&&"selected"]},c=(0,n.A)(l,x,d);return(0,o.A)({},d,c)})(r),I=(0,f.A)(w,t);let P;return r.disabled||(P=void 0!==A?A:-1),(0,C.jsx)(p.A.Provider,{value:R,children:(0,C.jsx)($,(0,o.A)({ref:I,role:g,tabIndex:P,component:l,focusVisibleClassName:(0,i.A)(G.focusVisible,h),className:(0,i.A)(G.root,y)},k,{ownerState:N,classes:G}))})}))},31127:(e,t,r)=>{function a(e){return String(parseFloat(e)).length===String(e).length}function o(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function s(e){return parseFloat(e)}function i(e){return(t,r)=>{const a=o(t);if(a===r)return t;let i=s(t);"px"!==a&&("em"===a||"rem"===a)&&(i=s(t)*s(e));let n=i;if("px"!==r)if("em"===r)n=i/s(e);else{if("rem"!==r)return t;n=i/s(e)}return parseFloat(n.toFixed(5))+r}}function n({size:e,grid:t}){const r=e-e%t,a=r+t;return e-r<a-e?r:a}function d({lineHeight:e,pixels:t,htmlFontSize:r}){return t/(e*r)}function l({cssProperty:e,min:t,max:r,unit:a="rem",breakpoints:o=[600,900,1200],transform:s=null}){const i={[e]:`${t}${a}`},n=(r-t)/o[o.length-1];return o.forEach((r=>{let o=t+n*r;null!==s&&(o=s(o)),i[`@media (min-width:${r}px)`]={[e]:`${Math.round(1e4*o)/1e4}${a}`}})),i}r.d(t,{I3:()=>i,VR:()=>n,a9:()=>a,db:()=>s,l_:()=>o,qW:()=>d,yL:()=>l})}}]);