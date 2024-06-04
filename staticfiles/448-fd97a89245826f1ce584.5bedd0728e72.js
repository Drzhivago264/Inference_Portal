"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[448],{53215:(e,o,t)=>{t.d(o,{A:()=>B});var r=t(98587),a=t(58168),n=t(96540),s=t(34164),i=t(64111),c=t(771),l=t(55860),d=t(3541),u=t(20561),h=t(74848);const p=(0,u.A)((0,h.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),m=(0,u.A)((0,h.jsx)("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked");var v=t(11848),A=t(39770);const w=(0,v.Ay)("span",{shouldForwardProp:A.A})({position:"relative",display:"flex"}),f=(0,v.Ay)(p)({transform:"scale(1)"}),g=(0,v.Ay)(m)((({theme:e,ownerState:o})=>(0,a.A)({left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},o.checked&&{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}))),k=function(e){const{checked:o=!1,classes:t={},fontSize:r}=e,n=(0,a.A)({},e,{checked:o});return(0,h.jsxs)(w,{className:t.root,ownerState:n,children:[(0,h.jsx)(f,{fontSize:r,className:t.background,ownerState:n}),(0,h.jsx)(g,{fontSize:r,className:t.dot,ownerState:n})]})};var b=t(28466),S=t(50862),y=t(14054),$=t(27553),x=t(17245);function C(e){return(0,x.Ay)("MuiRadio",e)}const z=(0,$.A)("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary","sizeSmall"]),R=["checked","checkedIcon","color","icon","name","onChange","size","className"],M=(0,v.Ay)(l.A,{shouldForwardProp:e=>(0,A.A)(e)||"classes"===e,name:"MuiRadio",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,"medium"!==t.size&&o[`size${(0,b.A)(t.size)}`],o[`color${(0,b.A)(t.color)}`]]}})((({theme:e,ownerState:o})=>(0,a.A)({color:(e.vars||e).palette.text.secondary},!o.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${"default"===o.color?e.vars.palette.action.activeChannel:e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.X4)("default"===o.color?e.palette.action.active:e.palette[o.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"default"!==o.color&&{[`&.${z.checked}`]:{color:(e.vars||e).palette[o.color].main}},{[`&.${z.disabled}`]:{color:(e.vars||e).palette.action.disabled}}))),j=(0,h.jsx)(k,{checked:!0}),N=(0,h.jsx)(k,{}),B=n.forwardRef((function(e,o){var t,c;const l=(0,d.A)({props:e,name:"MuiRadio"}),{checked:u,checkedIcon:p=j,color:m="primary",icon:v=N,name:A,onChange:w,size:f="medium",className:g}=l,k=(0,r.A)(l,R),$=(0,a.A)({},l,{color:m,size:f}),x=(e=>{const{classes:o,color:t,size:r}=e,n={root:["root",`color${(0,b.A)(t)}`,"medium"!==r&&`size${(0,b.A)(r)}`]};return(0,a.A)({},o,(0,i.A)(n,C,o))})($),z=n.useContext(y.A);let B=u;const I=(0,S.A)(w,z&&z.onChange);let O=A;var F,G;return z&&(void 0===B&&(F=z.value,B="object"==typeof(G=l.value)&&null!==G?F===G:String(F)===String(G)),void 0===O&&(O=z.name)),(0,h.jsx)(M,(0,a.A)({type:"radio",icon:n.cloneElement(v,{fontSize:null!=(t=N.props.fontSize)?t:f}),checkedIcon:n.cloneElement(p,{fontSize:null!=(c=j.props.fontSize)?c:f}),ownerState:$,classes:x,name:O,checked:B,onChange:I,ref:o,className:(0,s.A)(x.root,g)},k))}))},29428:(e,o,t)=>{t.d(o,{A:()=>x});var r=t(58168),a=t(98587),n=t(96540),s=t(34164),i=t(64111),c=t(11848),l=t(3541),d=t(27553),u=t(17245);function h(e){return(0,u.Ay)("MuiFormGroup",e)}(0,d.A)("MuiFormGroup",["root","row","error"]);var p=t(79716),m=t(38086),v=t(74848);const A=["className","row"],w=(0,c.Ay)("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.row&&o.row]}})((({ownerState:e})=>(0,r.A)({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"}))),f=n.forwardRef((function(e,o){const t=(0,l.A)({props:e,name:"MuiFormGroup"}),{className:n,row:c=!1}=t,d=(0,a.A)(t,A),u=(0,p.A)(),f=(0,m.A)({props:t,muiFormControl:u,states:["error"]}),g=(0,r.A)({},t,{row:c,error:f.error}),k=(e=>{const{classes:o,row:t,error:r}=e,a={root:["root",t&&"row",r&&"error"]};return(0,i.A)(a,h,o)})(g);return(0,v.jsx)(w,(0,r.A)({className:(0,s.A)(k.root,n),ownerState:g,ref:o},d))}));function g(e){return(0,u.Ay)("MuiRadioGroup",e)}(0,d.A)("MuiRadioGroup",["root","row","error"]);var k=t(96852),b=t(41159),S=t(14054),y=t(1668);const $=["actions","children","className","defaultValue","name","onChange","value"],x=n.forwardRef((function(e,o){const{actions:t,children:c,className:l,defaultValue:d,name:u,onChange:h,value:p}=e,m=(0,a.A)(e,$),A=n.useRef(null),w=(e=>{const{classes:o,row:t,error:r}=e,a={root:["root",t&&"row",r&&"error"]};return(0,i.A)(a,g,o)})(e),[x,C]=(0,b.A)({controlled:p,default:d,name:"RadioGroup"});n.useImperativeHandle(t,(()=>({focus:()=>{let e=A.current.querySelector("input:not(:disabled):checked");e||(e=A.current.querySelector("input:not(:disabled)")),e&&e.focus()}})),[]);const z=(0,k.A)(o,A),R=(0,y.A)(u),M=n.useMemo((()=>({name:R,onChange(e){C(e.target.value),h&&h(e,e.target.value)},value:x})),[R,h,C,x]);return(0,v.jsx)(S.A.Provider,{value:M,children:(0,v.jsx)(f,(0,r.A)({role:"radiogroup",ref:z,className:(0,s.A)(w.root,l)},m,{children:c}))})}))},14054:(e,o,t)=>{t.d(o,{A:()=>r});const r=t(96540).createContext(void 0)},1405:(e,o,t)=>{t.d(o,{A:()=>$});var r=t(98587),a=t(58168),n=t(96540),s=t(34164),i=t(64111),c=t(771),l=t(28466),d=t(55860),u=t(76081),h=t(11848),p=t(27553),m=t(17245);function v(e){return(0,m.Ay)("MuiSwitch",e)}const A=(0,p.A)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);var w=t(74848);const f=["className","color","edge","size","sx"],g=(0,u.h)("MuiSwitch"),k=(0,h.Ay)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.edge&&o[`edge${(0,l.A)(t.edge)}`],o[`size${(0,l.A)(t.size)}`]]}})({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${A.thumb}`]:{width:16,height:16},[`& .${A.switchBase}`]:{padding:4,[`&.${A.checked}`]:{transform:"translateX(16px)"}}}}]}),b=(0,h.Ay)(d.A,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.switchBase,{[`& .${A.input}`]:o.input},"default"!==t.color&&o[`color${(0,l.A)(t.color)}`]]}})((({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${"light"===e.palette.mode?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${A.checked}`]:{transform:"translateX(20px)"},[`&.${A.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${A.checked} + .${A.track}`]:{opacity:.5},[`&.${A.disabled} + .${A.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:""+("light"===e.palette.mode?.12:.2)},[`& .${A.input}`]:{left:"-100%",width:"300%"}})),(({theme:e})=>({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.X4)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([o])=>({props:{color:o},style:{[`&.${A.checked}`]:{color:(e.vars||e).palette[o].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,c.X4)(e.palette[o].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${A.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${o}DisabledColor`]:`${"light"===e.palette.mode?(0,c.a)(e.palette[o].main,.62):(0,c.e$)(e.palette[o].main,.55)}`}},[`&.${A.checked} + .${A.track}`]:{backgroundColor:(e.vars||e).palette[o].main}}})))]}))),S=(0,h.Ay)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,o)=>o.track})((({theme:e})=>({height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${"light"===e.palette.mode?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:""+("light"===e.palette.mode?.38:.3)}))),y=(0,h.Ay)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,o)=>o.thumb})((({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),$=n.forwardRef((function(e,o){const t=g({props:e,name:"MuiSwitch"}),{className:n,color:c="primary",edge:d=!1,size:u="medium",sx:h}=t,p=(0,r.A)(t,f),m=(0,a.A)({},t,{color:c,edge:d,size:u}),A=(e=>{const{classes:o,edge:t,size:r,color:n,checked:s,disabled:c}=e,d={root:["root",t&&`edge${(0,l.A)(t)}`,`size${(0,l.A)(r)}`],switchBase:["switchBase",`color${(0,l.A)(n)}`,s&&"checked",c&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},u=(0,i.A)(d,v,o);return(0,a.A)({},o,u)})(m),$=(0,w.jsx)(y,{className:A.thumb,ownerState:m});return(0,w.jsxs)(k,{className:(0,s.A)(A.root,n),sx:h,ownerState:m,children:[(0,w.jsx)(b,(0,a.A)({type:"checkbox",icon:$,checkedIcon:$,ref:o,ownerState:m},p,{classes:(0,a.A)({},A,{root:A.switchBase})})),(0,w.jsx)(S,{className:A.track,ownerState:m})]})}))}}]);