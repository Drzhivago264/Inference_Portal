"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[335],{68864:(e,o,t)=>{t.d(o,{A:()=>P});var r=t(98587),n=t(58168),a=t(96540),l=t(34164),i=t(64111),s=t(79716),p=t(30995),c=t(14073),d=t(28466),u=t(11848),m=t(3541),h=t(27553),b=t(17245);function g(e){return(0,b.Ay)("MuiFormControlLabel",e)}const A=(0,h.A)("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]);var f=t(38086),v=t(74848);const y=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],w=(0,u.Ay)("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[{[`& .${A.label}`]:o.label},o.root,o[`labelPlacement${(0,d.A)(t.labelPlacement)}`]]}})((({theme:e,ownerState:o})=>(0,n.A)({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${A.disabled}`]:{cursor:"default"}},"start"===o.labelPlacement&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},"top"===o.labelPlacement&&{flexDirection:"column-reverse",marginLeft:16},"bottom"===o.labelPlacement&&{flexDirection:"column",marginLeft:16},{[`& .${A.label}`]:{[`&.${A.disabled}`]:{color:(e.vars||e).palette.text.disabled}}}))),x=(0,u.Ay)("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})((({theme:e})=>({[`&.${A.error}`]:{color:(e.vars||e).palette.error.main}}))),P=a.forwardRef((function(e,o){var t,u;const h=(0,m.A)({props:e,name:"MuiFormControlLabel"}),{className:b,componentsProps:A={},control:P,disabled:R,disableTypography:k,label:T,labelPlacement:C="end",required:S,slotProps:F={}}=h,L=(0,r.A)(h,y),M=(0,s.A)(),N=null!=(t=null!=R?R:P.props.disabled)?t:null==M?void 0:M.disabled,B=null!=S?S:P.props.required,E={disabled:N,required:B};["checked","name","onChange","value","inputRef"].forEach((e=>{void 0===P.props[e]&&void 0!==h[e]&&(E[e]=h[e])}));const I=(0,f.A)({props:h,muiFormControl:M,states:["error"]}),O=(0,n.A)({},h,{disabled:N,labelPlacement:C,required:B,error:I.error}),$=(e=>{const{classes:o,disabled:t,labelPlacement:r,error:n,required:a}=e,l={root:["root",t&&"disabled",`labelPlacement${(0,d.A)(r)}`,n&&"error",a&&"required"],label:["label",t&&"disabled"],asterisk:["asterisk",n&&"error"]};return(0,i.A)(l,g,o)})(O),D=null!=(u=F.typography)?u:A.typography;let j=T;return null==j||j.type===c.A||k||(j=(0,v.jsx)(c.A,(0,n.A)({component:"span"},D,{className:(0,l.A)($.label,null==D?void 0:D.className),children:j}))),(0,v.jsxs)(w,(0,n.A)({className:(0,l.A)($.root,b),ownerState:O,ref:o},L,{children:[a.cloneElement(P,E),B?(0,v.jsxs)(p.A,{display:"block",children:[j,(0,v.jsxs)(x,{ownerState:O,"aria-hidden":!0,className:$.asterisk,children:[" ","*"]})]}):j]}))}))},47839:(e,o,t)=>{t.d(o,{A:()=>O});var r=t(98587),n=t(58168),a=t(96540),l=t(34164),i=t(83963),s=t(54856),p=t(64111),c=t(771),d=t(73788),u=t(11848),m=t(44675),h=t(3541),b=t(28466),g=t(87467),A=t(93879),f=t(83034),v=t(96852),y=t(1668),w=t(68851),x=t(41159),P=t(27553),R=t(17245);function k(e){return(0,R.Ay)("MuiTooltip",e)}const T=(0,P.A)("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]);var C=t(74848);const S=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"],F=(0,u.Ay)(A.A,{name:"MuiTooltip",slot:"Popper",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.popper,!t.disableInteractive&&o.popperInteractive,t.arrow&&o.popperArrow,!t.open&&o.popperClose]}})((({theme:e,ownerState:o,open:t})=>(0,n.A)({zIndex:(e.vars||e).zIndex.tooltip,pointerEvents:"none"},!o.disableInteractive&&{pointerEvents:"auto"},!t&&{pointerEvents:"none"},o.arrow&&{[`&[data-popper-placement*="bottom"] .${T.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${T.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${T.arrow}`]:(0,n.A)({},o.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${T.arrow}`]:(0,n.A)({},o.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})}))),L=(0,u.Ay)("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.tooltip,t.touch&&o.touch,t.arrow&&o.tooltipArrow,o[`tooltipPlacement${(0,b.A)(t.placement.split("-")[0])}`]]}})((({theme:e,ownerState:o})=>{return(0,n.A)({backgroundColor:e.vars?e.vars.palette.Tooltip.bg:(0,c.X4)(e.palette.grey[700],.92),borderRadius:(e.vars||e).shape.borderRadius,color:(e.vars||e).palette.common.white,fontFamily:e.typography.fontFamily,padding:"4px 8px",fontSize:e.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:e.typography.fontWeightMedium},o.arrow&&{position:"relative",margin:0},o.touch&&{padding:"8px 16px",fontSize:e.typography.pxToRem(14),lineHeight:(t=16/14,Math.round(1e5*t)/1e5+"em"),fontWeight:e.typography.fontWeightRegular},{[`.${T.popper}[data-popper-placement*="left"] &`]:(0,n.A)({transformOrigin:"right center"},o.isRtl?(0,n.A)({marginLeft:"14px"},o.touch&&{marginLeft:"24px"}):(0,n.A)({marginRight:"14px"},o.touch&&{marginRight:"24px"})),[`.${T.popper}[data-popper-placement*="right"] &`]:(0,n.A)({transformOrigin:"left center"},o.isRtl?(0,n.A)({marginRight:"14px"},o.touch&&{marginRight:"24px"}):(0,n.A)({marginLeft:"14px"},o.touch&&{marginLeft:"24px"})),[`.${T.popper}[data-popper-placement*="top"] &`]:(0,n.A)({transformOrigin:"center bottom",marginBottom:"14px"},o.touch&&{marginBottom:"24px"}),[`.${T.popper}[data-popper-placement*="bottom"] &`]:(0,n.A)({transformOrigin:"center top",marginTop:"14px"},o.touch&&{marginTop:"24px"})});var t})),M=(0,u.Ay)("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(e,o)=>o.arrow})((({theme:e})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:e.vars?e.vars.palette.Tooltip.bg:(0,c.X4)(e.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}})));let N=!1;const B=new i.E;let E={x:0,y:0};function I(e,o){return(t,...r)=>{o&&o(t,...r),e(t,...r)}}const O=a.forwardRef((function(e,o){var t,c,u,P,R,T,O,$,D,j,q,W,z,X,H,U,V,_,Y;const G=(0,h.A)({props:e,name:"MuiTooltip"}),{arrow:J=!1,children:K,components:Q={},componentsProps:Z={},describeChild:ee=!1,disableFocusListener:oe=!1,disableHoverListener:te=!1,disableInteractive:re=!1,disableTouchListener:ne=!1,enterDelay:ae=100,enterNextDelay:le=0,enterTouchDelay:ie=700,followCursor:se=!1,id:pe,leaveDelay:ce=0,leaveTouchDelay:de=1500,onClose:ue,onOpen:me,open:he,placement:be="bottom",PopperComponent:ge,PopperProps:Ae={},slotProps:fe={},slots:ve={},title:ye,TransitionComponent:we=g.A,TransitionProps:xe}=G,Pe=(0,r.A)(G,S),Re=a.isValidElement(K)?K:(0,C.jsx)("span",{children:K}),ke=(0,m.A)(),Te=(0,d.I)(),[Ce,Se]=a.useState(),[Fe,Le]=a.useState(null),Me=a.useRef(!1),Ne=re||se,Be=(0,i.A)(),Ee=(0,i.A)(),Ie=(0,i.A)(),Oe=(0,i.A)(),[$e,De]=(0,x.A)({controlled:he,default:!1,name:"Tooltip",state:"open"});let je=$e;const qe=(0,y.A)(pe),We=a.useRef(),ze=(0,f.A)((()=>{void 0!==We.current&&(document.body.style.WebkitUserSelect=We.current,We.current=void 0),Oe.clear()}));a.useEffect((()=>ze),[ze]);const Xe=e=>{B.clear(),N=!0,De(!0),me&&!je&&me(e)},He=(0,f.A)((e=>{B.start(800+ce,(()=>{N=!1})),De(!1),ue&&je&&ue(e),Be.start(ke.transitions.duration.shortest,(()=>{Me.current=!1}))})),Ue=e=>{Me.current&&"touchstart"!==e.type||(Ce&&Ce.removeAttribute("title"),Ee.clear(),Ie.clear(),ae||N&&le?Ee.start(N?le:ae,(()=>{Xe(e)})):Xe(e))},Ve=e=>{Ee.clear(),Ie.start(ce,(()=>{He(e)}))},{isFocusVisibleRef:_e,onBlur:Ye,onFocus:Ge,ref:Je}=(0,w.A)(),[,Ke]=a.useState(!1),Qe=e=>{Ye(e),!1===_e.current&&(Ke(!1),Ve(e))},Ze=e=>{Ce||Se(e.currentTarget),Ge(e),!0===_e.current&&(Ke(!0),Ue(e))},eo=e=>{Me.current=!0;const o=Re.props;o.onTouchStart&&o.onTouchStart(e)};a.useEffect((()=>{if(je)return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)};function e(e){"Escape"!==e.key&&"Esc"!==e.key||He(e)}}),[He,je]);const oo=(0,v.A)(Re.ref,Je,Se,o);ye||0===ye||(je=!1);const to=a.useRef(),ro={},no="string"==typeof ye;ee?(ro.title=je||!no||te?null:ye,ro["aria-describedby"]=je?qe:null):(ro["aria-label"]=no?ye:null,ro["aria-labelledby"]=je&&!no?qe:null);const ao=(0,n.A)({},ro,Pe,Re.props,{className:(0,l.A)(Pe.className,Re.props.className),onTouchStart:eo,ref:oo},se?{onMouseMove:e=>{const o=Re.props;o.onMouseMove&&o.onMouseMove(e),E={x:e.clientX,y:e.clientY},to.current&&to.current.update()}}:{}),lo={};ne||(ao.onTouchStart=e=>{eo(e),Ie.clear(),Be.clear(),ze(),We.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Oe.start(ie,(()=>{document.body.style.WebkitUserSelect=We.current,Ue(e)}))},ao.onTouchEnd=e=>{Re.props.onTouchEnd&&Re.props.onTouchEnd(e),ze(),Ie.start(de,(()=>{He(e)}))}),te||(ao.onMouseOver=I(Ue,ao.onMouseOver),ao.onMouseLeave=I(Ve,ao.onMouseLeave),Ne||(lo.onMouseOver=Ue,lo.onMouseLeave=Ve)),oe||(ao.onFocus=I(Ze,ao.onFocus),ao.onBlur=I(Qe,ao.onBlur),Ne||(lo.onFocus=Ze,lo.onBlur=Qe));const io=a.useMemo((()=>{var e;let o=[{name:"arrow",enabled:Boolean(Fe),options:{element:Fe,padding:4}}];return null!=(e=Ae.popperOptions)&&e.modifiers&&(o=o.concat(Ae.popperOptions.modifiers)),(0,n.A)({},Ae.popperOptions,{modifiers:o})}),[Fe,Ae]),so=(0,n.A)({},G,{isRtl:Te,arrow:J,disableInteractive:Ne,placement:be,PopperComponentProp:ge,touch:Me.current}),po=(e=>{const{classes:o,disableInteractive:t,arrow:r,touch:n,placement:a}=e,l={popper:["popper",!t&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",n&&"touch",`tooltipPlacement${(0,b.A)(a.split("-")[0])}`],arrow:["arrow"]};return(0,p.A)(l,k,o)})(so),co=null!=(t=null!=(c=ve.popper)?c:Q.Popper)?t:F,uo=null!=(u=null!=(P=null!=(R=ve.transition)?R:Q.Transition)?P:we)?u:g.A,mo=null!=(T=null!=(O=ve.tooltip)?O:Q.Tooltip)?T:L,ho=null!=($=null!=(D=ve.arrow)?D:Q.Arrow)?$:M,bo=(0,s.X)(co,(0,n.A)({},Ae,null!=(j=fe.popper)?j:Z.popper,{className:(0,l.A)(po.popper,null==Ae?void 0:Ae.className,null==(q=null!=(W=fe.popper)?W:Z.popper)?void 0:q.className)}),so),go=(0,s.X)(uo,(0,n.A)({},xe,null!=(z=fe.transition)?z:Z.transition),so),Ao=(0,s.X)(mo,(0,n.A)({},null!=(X=fe.tooltip)?X:Z.tooltip,{className:(0,l.A)(po.tooltip,null==(H=null!=(U=fe.tooltip)?U:Z.tooltip)?void 0:H.className)}),so),fo=(0,s.X)(ho,(0,n.A)({},null!=(V=fe.arrow)?V:Z.arrow,{className:(0,l.A)(po.arrow,null==(_=null!=(Y=fe.arrow)?Y:Z.arrow)?void 0:_.className)}),so);return(0,C.jsxs)(a.Fragment,{children:[a.cloneElement(Re,ao),(0,C.jsx)(co,(0,n.A)({as:null!=ge?ge:A.A,placement:be,anchorEl:se?{getBoundingClientRect:()=>({top:E.y,left:E.x,right:E.x,bottom:E.y,width:0,height:0})}:Ce,popperRef:to,open:!!Ce&&je,id:qe,transition:!0},lo,bo,{popperOptions:io,children:({TransitionProps:e})=>(0,C.jsx)(uo,(0,n.A)({timeout:ke.transitions.duration.shorter},e,go,{children:(0,C.jsxs)(mo,(0,n.A)({},Ao,{children:[ye,J?(0,C.jsx)(ho,(0,n.A)({},fo,{ref:Le})):null]}))}))}))]})}))},55860:(e,o,t)=>{t.d(o,{A:()=>w});var r=t(98587),n=t(58168),a=t(96540),l=t(34164),i=t(64111),s=t(28466),p=t(11848),c=t(39770),d=t(41159),u=t(79716),m=t(18850),h=t(27553),b=t(17245);function g(e){return(0,b.Ay)("PrivateSwitchBase",e)}(0,h.A)("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);var A=t(74848);const f=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],v=(0,p.Ay)(m.A)((({ownerState:e})=>(0,n.A)({padding:9,borderRadius:"50%"},"start"===e.edge&&{marginLeft:"small"===e.size?-3:-12},"end"===e.edge&&{marginRight:"small"===e.size?-3:-12}))),y=(0,p.Ay)("input",{shouldForwardProp:c.A})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),w=a.forwardRef((function(e,o){const{autoFocus:t,checked:a,checkedIcon:p,className:c,defaultChecked:m,disabled:h,disableFocusRipple:b=!1,edge:w=!1,icon:x,id:P,inputProps:R,inputRef:k,name:T,onBlur:C,onChange:S,onFocus:F,readOnly:L,required:M=!1,tabIndex:N,type:B,value:E}=e,I=(0,r.A)(e,f),[O,$]=(0,d.A)({controlled:a,default:Boolean(m),name:"SwitchBase",state:"checked"}),D=(0,u.A)();let j=h;D&&void 0===j&&(j=D.disabled);const q="checkbox"===B||"radio"===B,W=(0,n.A)({},e,{checked:O,disabled:j,disableFocusRipple:b,edge:w}),z=(e=>{const{classes:o,checked:t,disabled:r,edge:n}=e,a={root:["root",t&&"checked",r&&"disabled",n&&`edge${(0,s.A)(n)}`],input:["input"]};return(0,i.A)(a,g,o)})(W);return(0,A.jsxs)(v,(0,n.A)({component:"span",className:(0,l.A)(z.root,c),centerRipple:!0,focusRipple:!b,disabled:j,tabIndex:null,role:void 0,onFocus:e=>{F&&F(e),D&&D.onFocus&&D.onFocus(e)},onBlur:e=>{C&&C(e),D&&D.onBlur&&D.onBlur(e)},ownerState:W,ref:o},I,{children:[(0,A.jsx)(y,(0,n.A)({autoFocus:t,checked:a,defaultChecked:m,className:z.input,disabled:j,id:q?P:void 0,name:T,onChange:e=>{if(e.nativeEvent.defaultPrevented)return;const o=e.target.checked;$(o),S&&S(e,o)},readOnly:L,ref:k,required:M,ownerState:W,tabIndex:N,type:B},"checkbox"===B&&void 0===E?{}:{value:E},R)),O?p:x]}))}))}}]);