"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[514],{65812:(e,r,o)=>{var t=o(24994);r.A=void 0;var l=t(o(42032)),a=o(74848);r.A=(0,l.default)((0,a.jsx)("path",{d:"M14 10H9c-.6 0-1 .4-1 1v4h2v-3h4v2.5l3.5-3.5L14 7.5zm-2-9C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1m7.73 11.58-7.19 7.22c-.35.27-.79.27-1.15 0L4.2 12.58c-.27-.36-.27-.8 0-1.16l7.19-7.22c.35-.27.79-.27 1.15 0l7.19 7.22c.36.27.36.8 0 1.16"}),"AssistantDirection")},28800:(e,r,o)=>{var t=o(24994);r.A=void 0;var l=t(o(42032)),a=o(74848);r.A=(0,l.default)((0,a.jsx)("path",{d:"M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"}),"Login")},36632:(e,r,o)=>{o.d(r,{A:()=>z});var t=o(98587),l=o(58168),a=o(96540),n=o(34164),s=o(64111),i=o(771),c=o(76081),d=o(11848),p=o(6025),u=o(28466),m=o(60538),h=o(27553),A=o(17245);function v(e){return(0,A.Ay)("MuiAlert",e)}const g=(0,h.A)("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]);var b=o(11641),f=o(20561),x=o(74848);const y=(0,f.A)((0,x.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),C=(0,f.A)((0,x.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),k=(0,f.A)((0,x.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),S=(0,f.A)((0,x.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined");var P=o(49350);const w=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],M=(0,c.h)("MuiAlert"),j=(0,d.Ay)(m.A,{name:"MuiAlert",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:o}=e;return[r.root,r[o.variant],r[`${o.variant}${(0,u.A)(o.color||o.severity)}`]]}})((({theme:e})=>{const r="light"===e.palette.mode?i.e$:i.a,o="light"===e.palette.mode?i.a:i.e$;return(0,l.A)({},e.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([t])=>({props:{colorSeverity:t,variant:"standard"},style:{color:e.vars?e.vars.palette.Alert[`${t}Color`]:r(e.palette[t].light,.6),backgroundColor:e.vars?e.vars.palette.Alert[`${t}StandardBg`]:o(e.palette[t].light,.9),[`& .${g.icon}`]:e.vars?{color:e.vars.palette.Alert[`${t}IconColor`]}:{color:e.palette[t].main}}}))),...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([o])=>({props:{colorSeverity:o,variant:"outlined"},style:{color:e.vars?e.vars.palette.Alert[`${o}Color`]:r(e.palette[o].light,.6),border:`1px solid ${(e.vars||e).palette[o].light}`,[`& .${g.icon}`]:e.vars?{color:e.vars.palette.Alert[`${o}IconColor`]}:{color:e.palette[o].main}}}))),...Object.entries(e.palette).filter((([,e])=>e.main&&e.dark)).map((([r])=>({props:{colorSeverity:r,variant:"filled"},style:(0,l.A)({fontWeight:e.typography.fontWeightMedium},e.vars?{color:e.vars.palette.Alert[`${r}FilledColor`],backgroundColor:e.vars.palette.Alert[`${r}FilledBg`]}:{backgroundColor:"dark"===e.palette.mode?e.palette[r].dark:e.palette[r].main,color:e.palette.getContrastText(e.palette[r].main)})})))]})})),L=(0,d.Ay)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,r)=>r.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),R=(0,d.Ay)("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,r)=>r.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),$=(0,d.Ay)("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,r)=>r.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),F={success:(0,x.jsx)(y,{fontSize:"inherit"}),warning:(0,x.jsx)(C,{fontSize:"inherit"}),error:(0,x.jsx)(k,{fontSize:"inherit"}),info:(0,x.jsx)(S,{fontSize:"inherit"})},z=a.forwardRef((function(e,r){const o=M({props:e,name:"MuiAlert"}),{action:a,children:i,className:c,closeText:d="Close",color:m,components:h={},componentsProps:A={},icon:g,iconMapping:f=F,onClose:y,role:C="alert",severity:k="success",slotProps:S={},slots:z={},variant:I="standard"}=o,N=(0,t.A)(o,w),B=(0,l.A)({},o,{color:m,severity:k,variant:I,colorSeverity:m||k}),q=(e=>{const{variant:r,color:o,severity:t,classes:l}=e,a={root:["root",`color${(0,u.A)(o||t)}`,`${r}${(0,u.A)(o||t)}`,`${r}`],icon:["icon"],message:["message"],action:["action"]};return(0,s.A)(a,v,l)})(B),O={slots:(0,l.A)({closeButton:h.CloseButton,closeIcon:h.CloseIcon},z),slotProps:(0,l.A)({},A,S)},[E,T]=(0,p.A)("closeButton",{elementType:b.A,externalForwardedProps:O,ownerState:B}),[H,W]=(0,p.A)("closeIcon",{elementType:P.A,externalForwardedProps:O,ownerState:B});return(0,x.jsxs)(j,(0,l.A)({role:C,elevation:0,ownerState:B,className:(0,n.A)(q.root,c),ref:r},N,{children:[!1!==g?(0,x.jsx)(L,{ownerState:B,className:q.icon,children:g||f[k]||F[k]}):null,(0,x.jsx)(R,{ownerState:B,className:q.message,children:i}),null!=a?(0,x.jsx)($,{ownerState:B,className:q.action,children:a}):null,null==a&&y?(0,x.jsx)($,{ownerState:B,className:q.action,children:(0,x.jsx)(E,(0,l.A)({size:"small","aria-label":d,title:d,color:"inherit",onClick:y},T,{children:(0,x.jsx)(H,(0,l.A)({fontSize:"small"},W))}))}):null]}))}))},68864:(e,r,o)=>{o.d(r,{A:()=>k});var t=o(98587),l=o(58168),a=o(96540),n=o(34164),s=o(64111),i=o(79716),c=o(30995),d=o(14073),p=o(28466),u=o(11848),m=o(3541),h=o(27553),A=o(17245);function v(e){return(0,A.Ay)("MuiFormControlLabel",e)}const g=(0,h.A)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]);var b=o(38086),f=o(74848);const x=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],y=(0,u.Ay)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:o}=e;return[{[`& .${g.label}`]:r.label},r.root,r[`labelPlacement${(0,p.A)(o.labelPlacement)}`]]}})((({theme:e,ownerState:r})=>(0,l.A)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${g.disabled}`]:{cursor:"default"}},"start"===r.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===r.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===r.labelPlacement&&{flexDirection:"column",marginLeft:16},{[`& .${g.label}`]:{[`&.${g.disabled}`]:{color:(e.vars||e).palette.text.disabled}}}))),C=(0,u.Ay)("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,r)=>r.asterisk})((({theme:e})=>({[`&.${g.error}`]:{color:(e.vars||e).palette.error.main}}))),k=a.forwardRef((function(e,r){var o,u;const h=(0,m.A)({props:e,name:"MuiFormControlLabel"}),{className:A,componentsProps:g={},control:k,disabled:S,disableTypography:P,label:w,labelPlacement:M="end",required:j,slotProps:L={}}=h,R=(0,t.A)(h,x),$=(0,i.A)(),F=null!=(o=null!=S?S:k.props.disabled)?o:null==$?void 0:$.disabled,z=null!=j?j:k.props.required,I={disabled:F,required:z};["checked","name","onChange","value","inputRef"].forEach((e=>{void 0===k.props[e]&&void 0!==h[e]&&(I[e]=h[e])}));const N=(0,b.A)({props:h,muiFormControl:$,states:["error"]}),B=(0,l.A)({},h,{disabled:F,labelPlacement:M,required:z,error:N.error}),q=(e=>{const{classes:r,disabled:o,labelPlacement:t,error:l,required:a}=e,n={root:["root",o&&"disabled",`labelPlacement${(0,p.A)(t)}`,l&&"error",a&&"required"],label:["label",o&&"disabled"],asterisk:["asterisk",l&&"error"]};return(0,s.A)(n,v,r)})(B),O=null!=(u=L.typography)?u:g.typography;let E=w;return null==E||E.type===d.A||P||(E=(0,f.jsx)(d.A,(0,l.A)({component:"span"},O,{className:(0,n.A)(q.label,null==O?void 0:O.className),children:E}))),(0,f.jsxs)(y,(0,l.A)({className:(0,n.A)(q.root,A),ownerState:B,ref:r},R,{children:[a.cloneElement(k,I),z?(0,f.jsxs)(c.A,{display:"block",children:[E,(0,f.jsxs)(C,{ownerState:B,"aria-hidden":!0,className:q.asterisk,children:[" ","*"]})]}):E]}))}))},55860:(e,r,o)=>{o.d(r,{A:()=>y});var t=o(98587),l=o(58168),a=o(96540),n=o(34164),s=o(64111),i=o(28466),c=o(11848),d=o(39770),p=o(41159),u=o(79716),m=o(18850),h=o(27553),A=o(17245);function v(e){return(0,A.Ay)("PrivateSwitchBase",e)}(0,h.A)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var g=o(74848);const b=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],f=(0,c.Ay)(m.A)((({ownerState:e})=>(0,l.A)({padding:9,borderRadius:"50%"},"start"===e.edge&&{marginLeft:"small"===e.size?-3:-12},"end"===e.edge&&{marginRight:"small"===e.size?-3:-12}))),x=(0,c.Ay)("input",{shouldForwardProp:d.A})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),y=a.forwardRef((function(e,r){const{autoFocus:o,checked:a,checkedIcon:c,className:d,defaultChecked:m,disabled:h,disableFocusRipple:A=!1,edge:y=!1,icon:C,id:k,inputProps:S,inputRef:P,name:w,onBlur:M,onChange:j,onFocus:L,readOnly:R,required:$=!1,tabIndex:F,type:z,value:I}=e,N=(0,t.A)(e,b),[B,q]=(0,p.A)({controlled:a,default:Boolean(m),name:"SwitchBase",state:"checked"}),O=(0,u.A)();let E=h;O&&void 0===E&&(E=O.disabled);const T="checkbox"===z||"radio"===z,H=(0,l.A)({},e,{checked:B,disabled:E,disableFocusRipple:A,edge:y}),W=(e=>{const{classes:r,checked:o,disabled:t,edge:l}=e,a={root:["root",o&&"checked",t&&"disabled",l&&`edge${(0,i.A)(l)}`],input:["input"]};return(0,s.A)(a,v,r)})(H);return(0,g.jsxs)(f,(0,l.A)({component:"span",className:(0,n.A)(W.root,d),centerRipple:!0,focusRipple:!A,disabled:E,tabIndex:null,role:void 0,onFocus:e=>{L&&L(e),O&&O.onFocus&&O.onFocus(e)},onBlur:e=>{M&&M(e),O&&O.onBlur&&O.onBlur(e)},ownerState:H,ref:r},N,{children:[(0,g.jsx)(x,(0,l.A)({autoFocus:o,checked:a,defaultChecked:m,className:W.input,disabled:E,id:T?k:void 0,name:w,onChange:e=>{if(e.nativeEvent.defaultPrevented)return;const r=e.target.checked;q(r),j&&j(e,r)},readOnly:R,ref:P,required:$,ownerState:H,tabIndex:F,type:z},"checkbox"===z&&void 0===I?{}:{value:I},S)),B?c:C]}))}))},49350:(e,r,o)=>{o.d(r,{A:()=>a}),o(96540);var t=o(20561),l=o(74848);const a=(0,t.A)((0,l.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")}}]);