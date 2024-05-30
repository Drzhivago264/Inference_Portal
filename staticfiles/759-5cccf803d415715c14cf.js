"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[759],{44090:(e,t,a)=>{a.d(t,{Ay:()=>L});var o=a(98587),r=a(58168),i=a(96540),s=a(34164),n=a(25419),l=a(64111),c=a(771),d=a(11848),p=a(3541),u=a(18850),m=a(25602),h=a(2778),b=a(96852),g=a(32850),v=a(27553),y=a(17245);function A(e){return(0,y.Ay)("MuiListItem",e)}const f=(0,v.A)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);var S=a(22927);function k(e){return(0,y.Ay)("MuiListItemSecondaryAction",e)}(0,v.A)("MuiListItemSecondaryAction",["root","disableGutters"]);var w=a(74848);const x=["className"],$=(0,d.Ay)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.disableGutters&&t.disableGutters]}})((({ownerState:e})=>(0,r.A)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},e.disableGutters&&{right:0}))),C=i.forwardRef((function(e,t){const a=(0,p.A)({props:e,name:"MuiListItemSecondaryAction"}),{className:n}=a,c=(0,o.A)(a,x),d=i.useContext(g.A),u=(0,r.A)({},a,{disableGutters:d.disableGutters}),m=(e=>{const{disableGutters:t,classes:a}=e,o={root:["root",t&&"disableGutters"]};return(0,l.A)(o,k,a)})(u);return(0,w.jsx)($,(0,r.A)({className:(0,s.A)(m.root,n),ownerState:u,ref:t},c))}));C.muiName="ListItemSecondaryAction";const I=C,R=["className"],M=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],N=(0,d.Ay)("div",{name:"MuiListItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,"flex-start"===a.alignItems&&t.alignItemsFlexStart,a.divider&&t.divider,!a.disableGutters&&t.gutters,!a.disablePadding&&t.padding,a.button&&t.button,a.hasSecondaryAction&&t.secondaryAction]}})((({theme:e,ownerState:t})=>(0,r.A)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!t.disablePadding&&(0,r.A)({paddingTop:8,paddingBottom:8},t.dense&&{paddingTop:4,paddingBottom:4},!t.disableGutters&&{paddingLeft:16,paddingRight:16},!!t.secondaryAction&&{paddingRight:48}),!!t.secondaryAction&&{[`& > .${S.A.root}`]:{paddingRight:48}},{[`&.${f.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${f.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${f.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${f.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},"flex-start"===t.alignItems&&{alignItems:"flex-start"},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},t.button&&{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${f.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,c.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}}},t.hasSecondaryAction&&{paddingRight:48}))),G=(0,d.Ay)("li",{name:"MuiListItem",slot:"Container",overridesResolver:(e,t)=>t.container})({position:"relative"}),L=i.forwardRef((function(e,t){const a=(0,p.A)({props:e,name:"MuiListItem"}),{alignItems:c="center",autoFocus:d=!1,button:v=!1,children:y,className:S,component:k,components:x={},componentsProps:$={},ContainerComponent:C="li",ContainerProps:{className:L}={},dense:z=!1,disabled:O=!1,disableGutters:P=!1,disablePadding:j=!1,divider:B=!1,focusVisibleClassName:F,secondaryAction:X,selected:T=!1,slotProps:V={},slots:D={}}=a,H=(0,o.A)(a.ContainerProps,R),W=(0,o.A)(a,M),_=i.useContext(g.A),E=i.useMemo((()=>({dense:z||_.dense||!1,alignItems:c,disableGutters:P})),[c,_.dense,z,P]),Y=i.useRef(null);(0,h.A)((()=>{d&&Y.current&&Y.current.focus()}),[d]);const q=i.Children.toArray(y),J=q.length&&(0,m.A)(q[q.length-1],["ListItemSecondaryAction"]),K=(0,r.A)({},a,{alignItems:c,autoFocus:d,button:v,dense:E.dense,disabled:O,disableGutters:P,disablePadding:j,divider:B,hasSecondaryAction:J,selected:T}),Q=(e=>{const{alignItems:t,button:a,classes:o,dense:r,disabled:i,disableGutters:s,disablePadding:n,divider:c,hasSecondaryAction:d,selected:p}=e,u={root:["root",r&&"dense",!s&&"gutters",!n&&"padding",c&&"divider",i&&"disabled",a&&"button","flex-start"===t&&"alignItemsFlexStart",d&&"secondaryAction",p&&"selected"],container:["container"]};return(0,l.A)(u,A,o)})(K),U=(0,b.A)(Y,t),Z=D.root||x.Root||N,ee=V.root||$.root||{},te=(0,r.A)({className:(0,s.A)(Q.root,ee.className,S),disabled:O},W);let ae=k||"li";return v&&(te.component=k||"div",te.focusVisibleClassName=(0,s.A)(f.focusVisible,F),ae=u.A),J?(ae=te.component||k?ae:"div","li"===C&&("li"===ae?ae="div":"li"===te.component&&(te.component="div")),(0,w.jsx)(g.A.Provider,{value:E,children:(0,w.jsxs)(G,(0,r.A)({as:C,className:(0,s.A)(Q.container,L),ref:U,ownerState:K},H,{children:[(0,w.jsx)(Z,(0,r.A)({},ee,!(0,n.g)(Z)&&{as:ae,ownerState:(0,r.A)({},K,ee.ownerState)},te,{children:q})),q.pop()]}))})):(0,w.jsx)(g.A.Provider,{value:E,children:(0,w.jsxs)(Z,(0,r.A)({},ee,{as:ae,ref:U},!(0,n.g)(Z)&&{ownerState:(0,r.A)({},K,ee.ownerState)},te,{children:[q,X&&(0,w.jsx)(I,{children:X})]}))})}))},48158:(e,t,a)=>{a.d(t,{A:()=>y});var o=a(98587),r=a(58168),i=a(96540),s=a(34164),n=a(64111),l=a(11848),c=a(3541),d=a(28466),p=a(27553),u=a(17245);function m(e){return(0,u.Ay)("MuiListSubheader",e)}(0,p.A)("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);var h=a(74848);const b=["className","color","component","disableGutters","disableSticky","inset"],g=(0,l.Ay)("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,"default"!==a.color&&t[`color${(0,d.A)(a.color)}`],!a.disableGutters&&t.gutters,a.inset&&t.inset,!a.disableSticky&&t.sticky]}})((({theme:e,ownerState:t})=>(0,r.A)({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(e.vars||e).palette.text.secondary,fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(14)},"primary"===t.color&&{color:(e.vars||e).palette.primary.main},"inherit"===t.color&&{color:"inherit"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.inset&&{paddingLeft:72},!t.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(e.vars||e).palette.background.paper}))),v=i.forwardRef((function(e,t){const a=(0,c.A)({props:e,name:"MuiListSubheader"}),{className:i,color:l="default",component:p="li",disableGutters:u=!1,disableSticky:v=!1,inset:y=!1}=a,A=(0,o.A)(a,b),f=(0,r.A)({},a,{color:l,component:p,disableGutters:u,disableSticky:v,inset:y}),S=(e=>{const{classes:t,color:a,disableGutters:o,inset:r,disableSticky:i}=e,s={root:["root","default"!==a&&`color${(0,d.A)(a)}`,!o&&"gutters",r&&"inset",!i&&"sticky"]};return(0,n.A)(s,m,t)})(f);return(0,h.jsx)(g,(0,r.A)({as:p,className:(0,s.A)(S.root,i),ref:t,ownerState:f},A))}));v.muiSkipListHighlight=!0;const y=v},1405:(e,t,a)=>{a.d(t,{A:()=>x});var o=a(98587),r=a(58168),i=a(96540),s=a(34164),n=a(64111),l=a(771),c=a(28466),d=a(55860),p=a(76081),u=a(11848),m=a(27553),h=a(17245);function b(e){return(0,h.Ay)("MuiSwitch",e)}const g=(0,m.A)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);var v=a(74848);const y=["className","color","edge","size","sx"],A=(0,p.h)("MuiSwitch"),f=(0,u.Ay)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.edge&&t[`edge${(0,c.A)(a.edge)}`],t[`size${(0,c.A)(a.size)}`]]}})({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${g.thumb}`]:{width:16,height:16},[`& .${g.switchBase}`]:{padding:4,[`&.${g.checked}`]:{transform:"translateX(16px)"}}}}]}),S=(0,u.Ay)(d.A,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.switchBase,{[`& .${g.input}`]:t.input},"default"!==a.color&&t[`color${(0,c.A)(a.color)}`]]}})((({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${"light"===e.palette.mode?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${g.checked}`]:{transform:"translateX(20px)"},[`&.${g.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${g.checked} + .${g.track}`]:{opacity:.5},[`&.${g.disabled} + .${g.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:""+("light"===e.palette.mode?.12:.2)},[`& .${g.input}`]:{left:"-100%",width:"300%"}})),(({theme:e})=>({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,l.X4)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([t])=>({props:{color:t},style:{[`&.${g.checked}`]:{color:(e.vars||e).palette[t].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,l.X4)(e.palette[t].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${g.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${t}DisabledColor`]:`${"light"===e.palette.mode?(0,l.a)(e.palette[t].main,.62):(0,l.e$)(e.palette[t].main,.55)}`}},[`&.${g.checked} + .${g.track}`]:{backgroundColor:(e.vars||e).palette[t].main}}})))]}))),k=(0,u.Ay)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,t)=>t.track})((({theme:e})=>({height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${"light"===e.palette.mode?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:""+("light"===e.palette.mode?.38:.3)}))),w=(0,u.Ay)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,t)=>t.thumb})((({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),x=i.forwardRef((function(e,t){const a=A({props:e,name:"MuiSwitch"}),{className:i,color:l="primary",edge:d=!1,size:p="medium",sx:u}=a,m=(0,o.A)(a,y),h=(0,r.A)({},a,{color:l,edge:d,size:p}),g=(e=>{const{classes:t,edge:a,size:o,color:i,checked:s,disabled:l}=e,d={root:["root",a&&`edge${(0,c.A)(a)}`,`size${(0,c.A)(o)}`],switchBase:["switchBase",`color${(0,c.A)(i)}`,s&&"checked",l&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},p=(0,n.A)(d,b,t);return(0,r.A)({},t,p)})(h),x=(0,v.jsx)(w,{className:g.thumb,ownerState:h});return(0,v.jsxs)(f,{className:(0,s.A)(g.root,i),sx:u,ownerState:h,children:[(0,v.jsx)(S,(0,r.A)({type:"checkbox",icon:x,checkedIcon:x,ref:t,ownerState:h},m,{classes:(0,r.A)({},g,{root:g.switchBase})})),(0,v.jsx)(k,{className:g.track,ownerState:h})]})}))}}]);