"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[77],{70177:(e,t,a)=>{var r=a(24994);t.A=void 0;var o=r(a(42032)),n=a(74848);t.A=(0,o.default)((0,n.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"}),"ContentCopy")},40443:(e,t,a)=>{var r=a(24994);t.A=void 0;var o=r(a(42032)),n=a(74848);t.A=(0,o.default)((0,n.jsx)("path",{d:"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"}),"Send")},98475:(e,t,a)=>{a.d(t,{Ay:()=>te});var r=a(98587),o=a(58168),n=a(96540),l=a(34164),i=a(71611),s=a(25419),c=a(64111),u=a(86249),d=a(93833),p=a(76937),m=a(67749),v=a(54871),h=a(50173),b=a(66111);const f={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"};var g=a(55360),y=a(34718);function x(e,t){return e-t}function k(e,t){var a;const{index:r}=null!=(a=e.reduce(((e,a,r)=>{const o=Math.abs(t-a);return null===e||o<e.distance||o===e.distance?{distance:o,index:r}:e}),null))?a:{};return r}function A(e,t){if(void 0!==t.current&&e.changedTouches){const a=e;for(let e=0;e<a.changedTouches.length;e+=1){const r=a.changedTouches[e];if(r.identifier===t.current)return{x:r.clientX,y:r.clientY}}return!1}return{x:e.clientX,y:e.clientY}}function w(e,t,a){return 100*(e-t)/(a-t)}function S({values:e,newValue:t,index:a}){const r=e.slice();return r[a]=t,r.sort(x)}function C({sliderRef:e,activeIndex:t,setActive:a}){var r,o;const n=(0,u.A)(e.current);var l;null!=(r=e.current)&&r.contains(n.activeElement)&&Number(null==n||null==(o=n.activeElement)?void 0:o.getAttribute("data-index"))===t||null==(l=e.current)||l.querySelector(`[type="range"][data-index="${t}"]`).focus(),a&&a(t)}function L(e,t){return"number"==typeof e&&"number"==typeof t?e===t:"object"==typeof e&&"object"==typeof t&&(0,g.B)(e,t)}const $={horizontal:{offset:e=>({left:`${e}%`}),leap:e=>({width:`${e}%`})},"horizontal-reverse":{offset:e=>({right:`${e}%`}),leap:e=>({width:`${e}%`})},vertical:{offset:e=>({bottom:`${e}%`}),leap:e=>({height:`${e}%`})}},z=e=>e;let R;function M(){return void 0===R&&(R="undefined"==typeof CSS||"function"!=typeof CSS.supports||CSS.supports("touch-action","none")),R}function T(e){const{"aria-labelledby":t,defaultValue:a,disabled:r=!1,disableSwap:l=!1,isRtl:i=!1,marks:s=!1,max:c=100,min:g=0,name:R,onChange:T,onChangeCommitted:P,orientation:N="horizontal",rootRef:I,scale:j=z,step:O=1,shiftStep:E=10,tabIndex:V,value:F}=e,D=n.useRef(),[B,X]=n.useState(-1),[Y,Q]=n.useState(-1),[H,K]=n.useState(!1),W=n.useRef(0),[U,_]=(0,d.A)({controlled:F,default:null!=a?a:g,name:"Slider"}),q=T&&((e,t,a)=>{const r=e.nativeEvent||e,o=new r.constructor(r.type,r);Object.defineProperty(o,"target",{writable:!0,value:{value:t,name:R}}),T(o,t,a)}),G=Array.isArray(U);let J=G?U.slice().sort(x):[U];J=J.map((e=>null==e?g:(0,p.A)(e,g,c)));const Z=!0===s&&null!==O?[...Array(Math.floor((c-g)/O)+1)].map(((e,t)=>({value:g+O*t}))):s||[],ee=Z.map((e=>e.value)),{isFocusVisibleRef:te,onBlur:ae,onFocus:re,ref:oe}=(0,m.A)(),[ne,le]=n.useState(-1),ie=n.useRef(),se=(0,v.A)(oe,ie),ce=(0,v.A)(I,se),ue=e=>t=>{var a;const r=Number(t.currentTarget.getAttribute("data-index"));re(t),!0===te.current&&le(r),Q(r),null==e||null==(a=e.onFocus)||a.call(e,t)},de=e=>t=>{var a;ae(t),!1===te.current&&le(-1),Q(-1),null==e||null==(a=e.onBlur)||a.call(e,t)},pe=(e,t)=>{const a=Number(e.currentTarget.getAttribute("data-index")),r=J[a],o=ee.indexOf(r);let n=t;if(Z&&null==O){const e=ee[ee.length-1];n=n>e?e:n<ee[0]?ee[0]:n<r?ee[o-1]:ee[o+1]}if(n=(0,p.A)(n,g,c),G){l&&(n=(0,p.A)(n,J[a-1]||-1/0,J[a+1]||1/0));const e=n;n=S({values:J,newValue:n,index:a});let t=a;l||(t=n.indexOf(e)),C({sliderRef:ie,activeIndex:t})}_(n),le(a),q&&!L(n,U)&&q(e,n,a),P&&P(e,n)},me=e=>t=>{var a;if(null!==O){const e=Number(t.currentTarget.getAttribute("data-index")),a=J[e];let r=null;("ArrowLeft"===t.key||"ArrowDown"===t.key)&&t.shiftKey||"PageDown"===t.key?r=Math.max(a-E,g):(("ArrowRight"===t.key||"ArrowUp"===t.key)&&t.shiftKey||"PageUp"===t.key)&&(r=Math.min(a+E,c)),null!==r&&(pe(t,r),t.preventDefault())}null==e||null==(a=e.onKeyDown)||a.call(e,t)};(0,h.A)((()=>{var e;r&&ie.current.contains(document.activeElement)&&(null==(e=document.activeElement)||e.blur())}),[r]),r&&-1!==B&&X(-1),r&&-1!==ne&&le(-1);const ve=n.useRef();let he=N;i&&"horizontal"===N&&(he+="-reverse");const be=({finger:e,move:t=!1})=>{const{current:a}=ie,{width:r,height:o,bottom:n,left:i}=a.getBoundingClientRect();let s,u;if(s=0===he.indexOf("vertical")?(n-e.y)/o:(e.x-i)/r,-1!==he.indexOf("-reverse")&&(s=1-s),u=function(e,t,a){return(a-t)*e+t}(s,g,c),O)u=function(e,t,a){const r=Math.round((e-a)/t)*t+a;return Number(r.toFixed(function(e){if(Math.abs(e)<1){const t=e.toExponential().split("e-"),a=t[0].split(".")[1];return(a?a.length:0)+parseInt(t[1],10)}const t=e.toString().split(".")[1];return t?t.length:0}(t)))}(u,O,g);else{const e=k(ee,u);u=ee[e]}u=(0,p.A)(u,g,c);let d=0;if(G){d=t?ve.current:k(J,u),l&&(u=(0,p.A)(u,J[d-1]||-1/0,J[d+1]||1/0));const e=u;u=S({values:J,newValue:u,index:d}),l&&t||(d=u.indexOf(e),ve.current=d)}return{newValue:u,activeIndex:d}},fe=(0,b.A)((e=>{const t=A(e,D);if(!t)return;if(W.current+=1,"mousemove"===e.type&&0===e.buttons)return void ge(e);const{newValue:a,activeIndex:r}=be({finger:t,move:!0});C({sliderRef:ie,activeIndex:r,setActive:X}),_(a),!H&&W.current>2&&K(!0),q&&!L(a,U)&&q(e,a,r)})),ge=(0,b.A)((e=>{const t=A(e,D);if(K(!1),!t)return;const{newValue:a}=be({finger:t,move:!0});X(-1),"touchend"===e.type&&Q(-1),P&&P(e,a),D.current=void 0,xe()})),ye=(0,b.A)((e=>{if(r)return;M()||e.preventDefault();const t=e.changedTouches[0];null!=t&&(D.current=t.identifier);const a=A(e,D);if(!1!==a){const{newValue:t,activeIndex:r}=be({finger:a});C({sliderRef:ie,activeIndex:r,setActive:X}),_(t),q&&!L(t,U)&&q(e,t,r)}W.current=0;const o=(0,u.A)(ie.current);o.addEventListener("touchmove",fe,{passive:!0}),o.addEventListener("touchend",ge,{passive:!0})})),xe=n.useCallback((()=>{const e=(0,u.A)(ie.current);e.removeEventListener("mousemove",fe),e.removeEventListener("mouseup",ge),e.removeEventListener("touchmove",fe),e.removeEventListener("touchend",ge)}),[ge,fe]);n.useEffect((()=>{const{current:e}=ie;return e.addEventListener("touchstart",ye,{passive:M()}),()=>{e.removeEventListener("touchstart",ye),xe()}}),[xe,ye]),n.useEffect((()=>{r&&xe()}),[r,xe]);const ke=w(G?J[0]:g,g,c),Ae=w(J[J.length-1],g,c)-ke,we=e=>t=>{var a;null==(a=e.onMouseLeave)||a.call(e,t),Q(-1)};return{active:B,axis:he,axisProps:$,dragging:H,focusedThumbIndex:ne,getHiddenInputProps:(a={})=>{var n;const l=(0,y.h)(a),s={onChange:(u=l||{},e=>{var t;null==(t=u.onChange)||t.call(u,e),pe(e,e.target.valueAsNumber)}),onFocus:ue(l||{}),onBlur:de(l||{}),onKeyDown:me(l||{})};var u;const d=(0,o.A)({},l,s);return(0,o.A)({tabIndex:V,"aria-labelledby":t,"aria-orientation":N,"aria-valuemax":j(c),"aria-valuemin":j(g),name:R,type:"range",min:e.min,max:e.max,step:null===e.step&&e.marks?"any":null!=(n=e.step)?n:void 0,disabled:r},a,d,{style:(0,o.A)({},f,{direction:i?"rtl":"ltr",width:"100%",height:"100%"})})},getRootProps:(e={})=>{const t=(0,y.h)(e),a={onMouseDown:(n=t||{},e=>{var t;if(null==(t=n.onMouseDown)||t.call(n,e),r)return;if(e.defaultPrevented)return;if(0!==e.button)return;e.preventDefault();const a=A(e,D);if(!1!==a){const{newValue:t,activeIndex:r}=be({finger:a});C({sliderRef:ie,activeIndex:r,setActive:X}),_(t),q&&!L(t,U)&&q(e,t,r)}W.current=0;const o=(0,u.A)(ie.current);o.addEventListener("mousemove",fe,{passive:!0}),o.addEventListener("mouseup",ge)})};var n;const l=(0,o.A)({},t,a);return(0,o.A)({},e,{ref:ce},l)},getThumbProps:(e={})=>{const t=(0,y.h)(e),a={onMouseOver:(r=t||{},e=>{var t;null==(t=r.onMouseOver)||t.call(r,e);const a=Number(e.currentTarget.getAttribute("data-index"));Q(a)}),onMouseLeave:we(t||{})};var r;return(0,o.A)({},e,t,a)},marks:Z,open:Y,range:G,rootRef:ce,trackLeap:Ae,trackOffset:ke,values:J,getThumbStyle:e=>({pointerEvents:-1!==B&&B!==e?"none":void 0})}}var P=a(771),N=a(73788),I=a(76081),j=a(11848),O=a(64438);var E=a(28466),V=a(27553),F=a(17245);function D(e){return(0,F.Ay)("MuiSlider",e)}const B=(0,V.A)("MuiSlider",["root","active","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","disabled","dragging","focusVisible","mark","markActive","marked","markLabel","markLabelActive","rail","sizeSmall","thumb","thumbColorPrimary","thumbColorSecondary","thumbColorError","thumbColorSuccess","thumbColorInfo","thumbColorWarning","track","trackInverted","trackFalse","thumbSizeSmall","valueLabel","valueLabelOpen","valueLabelCircle","valueLabelLabel","vertical"]);var X=a(74848);const Y=["aria-label","aria-valuetext","aria-labelledby","component","components","componentsProps","color","classes","className","disableSwap","disabled","getAriaLabel","getAriaValueText","marks","max","min","name","onChange","onChangeCommitted","orientation","shiftStep","size","step","scale","slotProps","slots","tabIndex","track","value","valueLabelDisplay","valueLabelFormat"],Q=(0,I.h)("MuiSlider");function H(e){return e}const K=(0,j.Ay)("span",{name:"MuiSlider",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[`color${(0,E.A)(a.color)}`],"medium"!==a.size&&t[`size${(0,E.A)(a.size)}`],a.marked&&t.marked,"vertical"===a.orientation&&t.vertical,"inverted"===a.track&&t.trackInverted,!1===a.track&&t.trackFalse]}})((({theme:e})=>{var t;return{borderRadius:12,boxSizing:"content-box",display:"inline-block",position:"relative",cursor:"pointer",touchAction:"none",WebkitTapHighlightColor:"transparent","@media print":{colorAdjust:"exact"},[`&.${B.disabled}`]:{pointerEvents:"none",cursor:"default",color:(e.vars||e).palette.grey[400]},[`&.${B.dragging}`]:{[`& .${B.thumb}, & .${B.track}`]:{transition:"none"}},variants:[...Object.keys((null!=(t=e.vars)?t:e).palette).filter((t=>{var a;return(null!=(a=e.vars)?a:e).palette[t].main})).map((t=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))),{props:{orientation:"horizontal"},style:{height:4,width:"100%",padding:"13px 0","@media (pointer: coarse)":{padding:"20px 0"}}},{props:{orientation:"horizontal",size:"small"},style:{height:2}},{props:{orientation:"horizontal",marked:!0},style:{marginBottom:20}},{props:{orientation:"vertical"},style:{height:"100%",width:4,padding:"0 13px","@media (pointer: coarse)":{padding:"0 20px"}}},{props:{orientation:"vertical",size:"small"},style:{width:2}},{props:{orientation:"vertical",marked:!0},style:{marginRight:44}}]}})),W=(0,j.Ay)("span",{name:"MuiSlider",slot:"Rail",overridesResolver:(e,t)=>t.rail})({display:"block",position:"absolute",borderRadius:"inherit",backgroundColor:"currentColor",opacity:.38,variants:[{props:{orientation:"horizontal"},style:{width:"100%",height:"inherit",top:"50%",transform:"translateY(-50%)"}},{props:{orientation:"vertical"},style:{height:"100%",width:"inherit",left:"50%",transform:"translateX(-50%)"}},{props:{track:"inverted"},style:{opacity:1}}]}),U=(0,j.Ay)("span",{name:"MuiSlider",slot:"Track",overridesResolver:(e,t)=>t.track})((({theme:e})=>{var t;return{display:"block",position:"absolute",borderRadius:"inherit",border:"1px solid currentColor",backgroundColor:"currentColor",transition:e.transitions.create(["left","width","bottom","height"],{duration:e.transitions.duration.shortest}),variants:[{props:{size:"small"},style:{border:"none"}},{props:{orientation:"horizontal"},style:{height:"inherit",top:"50%",transform:"translateY(-50%)"}},{props:{orientation:"vertical"},style:{width:"inherit",left:"50%",transform:"translateX(-50%)"}},{props:{track:!1},style:{display:"none"}},...Object.keys((null!=(t=e.vars)?t:e).palette).filter((t=>{var a;return(null!=(a=e.vars)?a:e).palette[t].main})).map((t=>({props:{color:t,track:"inverted"},style:(0,o.A)({},e.vars?{backgroundColor:e.vars.palette.Slider[`${t}Track`],borderColor:e.vars.palette.Slider[`${t}Track`]}:(0,o.A)({backgroundColor:(0,P.a)(e.palette[t].main,.62),borderColor:(0,P.a)(e.palette[t].main,.62)},e.applyStyles("dark",{backgroundColor:(0,P.e$)(e.palette[t].main,.5)}),e.applyStyles("dark",{borderColor:(0,P.e$)(e.palette[t].main,.5)})))})))]}})),_=(0,j.Ay)("span",{name:"MuiSlider",slot:"Thumb",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.thumb,t[`thumbColor${(0,E.A)(a.color)}`],"medium"!==a.size&&t[`thumbSize${(0,E.A)(a.size)}`]]}})((({theme:e})=>{var t;return{position:"absolute",width:20,height:20,boxSizing:"border-box",borderRadius:"50%",outline:0,backgroundColor:"currentColor",display:"flex",alignItems:"center",justifyContent:"center",transition:e.transitions.create(["box-shadow","left","bottom"],{duration:e.transitions.duration.shortest}),"&::before":{position:"absolute",content:'""',borderRadius:"inherit",width:"100%",height:"100%",boxShadow:(e.vars||e).shadows[2]},"&::after":{position:"absolute",content:'""',borderRadius:"50%",width:42,height:42,top:"50%",left:"50%",transform:"translate(-50%, -50%)"},[`&.${B.disabled}`]:{"&:hover":{boxShadow:"none"}},variants:[...Object.keys((null!=(t=e.vars)?t:e).palette).filter((t=>{var a;return(null!=(a=e.vars)?a:e).palette[t].main})).map((t=>({props:{color:t},style:{[`&:hover, &.${B.focusVisible}`]:(0,o.A)({},e.vars?{boxShadow:`0px 0px 0px 8px rgba(${e.vars.palette[t].mainChannel} / 0.16)`}:{boxShadow:`0px 0px 0px 8px ${(0,P.X4)(e.palette[t].main,.16)}`},{"@media (hover: none)":{boxShadow:"none"}}),[`&.${B.active}`]:(0,o.A)({},e.vars?{boxShadow:`0px 0px 0px 14px rgba(${e.vars.palette[t].mainChannel} / 0.16)}`}:{boxShadow:`0px 0px 0px 14px ${(0,P.X4)(e.palette[t].main,.16)}`})}}))),{props:{size:"small"},style:{width:12,height:12,"&::before":{boxShadow:"none"}}},{props:{orientation:"horizontal"},style:{top:"50%",transform:"translate(-50%, -50%)"}},{props:{orientation:"vertical"},style:{left:"50%",transform:"translate(-50%, 50%)"}}]}})),q=(0,j.Ay)((function(e){const{children:t,className:a,value:r}=e,o=(e=>{const{open:t}=e;return{offset:(0,l.A)(t&&B.valueLabelOpen),circle:B.valueLabelCircle,label:B.valueLabelLabel}})(e);return t?n.cloneElement(t,{className:(0,l.A)(t.props.className)},(0,X.jsxs)(n.Fragment,{children:[t.props.children,(0,X.jsx)("span",{className:(0,l.A)(o.offset,a),"aria-hidden":!0,children:(0,X.jsx)("span",{className:o.circle,children:(0,X.jsx)("span",{className:o.label,children:r})})})]})):null}),{name:"MuiSlider",slot:"ValueLabel",overridesResolver:(e,t)=>t.valueLabel})((({theme:e})=>(0,o.A)({zIndex:1,whiteSpace:"nowrap"},e.typography.body2,{fontWeight:500,transition:e.transitions.create(["transform"],{duration:e.transitions.duration.shortest}),position:"absolute",backgroundColor:(e.vars||e).palette.grey[600],borderRadius:2,color:(e.vars||e).palette.common.white,display:"flex",alignItems:"center",justifyContent:"center",padding:"0.25rem 0.75rem",variants:[{props:{orientation:"horizontal"},style:{transform:"translateY(-100%) scale(0)",top:"-10px",transformOrigin:"bottom center","&::before":{position:"absolute",content:'""',width:8,height:8,transform:"translate(-50%, 50%) rotate(45deg)",backgroundColor:"inherit",bottom:0,left:"50%"},[`&.${B.valueLabelOpen}`]:{transform:"translateY(-100%) scale(1)"}}},{props:{orientation:"vertical"},style:{transform:"translateY(-50%) scale(0)",right:"30px",top:"50%",transformOrigin:"right center","&::before":{position:"absolute",content:'""',width:8,height:8,transform:"translate(-50%, -50%) rotate(45deg)",backgroundColor:"inherit",right:-8,top:"50%"},[`&.${B.valueLabelOpen}`]:{transform:"translateY(-50%) scale(1)"}}},{props:{size:"small"},style:{fontSize:e.typography.pxToRem(12),padding:"0.25rem 0.5rem"}},{props:{orientation:"vertical",size:"small"},style:{right:"20px"}}]}))),G=(0,j.Ay)("span",{name:"MuiSlider",slot:"Mark",shouldForwardProp:e=>(0,O.A)(e)&&"markActive"!==e,overridesResolver:(e,t)=>{const{markActive:a}=e;return[t.mark,a&&t.markActive]}})((({theme:e})=>({position:"absolute",width:2,height:2,borderRadius:1,backgroundColor:"currentColor",variants:[{props:{orientation:"horizontal"},style:{top:"50%",transform:"translate(-1px, -50%)"}},{props:{orientation:"vertical"},style:{left:"50%",transform:"translate(-50%, 1px)"}},{props:{markActive:!0},style:{backgroundColor:(e.vars||e).palette.background.paper,opacity:.8}}]}))),J=(0,j.Ay)("span",{name:"MuiSlider",slot:"MarkLabel",shouldForwardProp:e=>(0,O.A)(e)&&"markLabelActive"!==e,overridesResolver:(e,t)=>t.markLabel})((({theme:e})=>(0,o.A)({},e.typography.body2,{color:(e.vars||e).palette.text.secondary,position:"absolute",whiteSpace:"nowrap",variants:[{props:{orientation:"horizontal"},style:{top:30,transform:"translateX(-50%)","@media (pointer: coarse)":{top:40}}},{props:{orientation:"vertical"},style:{left:36,transform:"translateY(50%)","@media (pointer: coarse)":{left:44}}},{props:{markLabelActive:!0},style:{color:(e.vars||e).palette.text.primary}}]}))),Z=({children:e})=>e,ee=n.forwardRef((function(e,t){var a,u,d,p,m,v,h,b,f,g,y,x,k,A,S,C,L,$,z,R,M,P,I,j;const O=Q({props:e,name:"MuiSlider"}),V=(0,N.I)(),{"aria-label":F,"aria-valuetext":B,"aria-labelledby":ee,component:te="span",components:ae={},componentsProps:re={},color:oe="primary",classes:ne,className:le,disableSwap:ie=!1,disabled:se=!1,getAriaLabel:ce,getAriaValueText:ue,marks:de=!1,max:pe=100,min:me=0,orientation:ve="horizontal",shiftStep:he=10,size:be="medium",step:fe=1,scale:ge=H,slotProps:ye,slots:xe,track:ke="normal",valueLabelDisplay:Ae="off",valueLabelFormat:we=H}=O,Se=(0,r.A)(O,Y),Ce=(0,o.A)({},O,{isRtl:V,max:pe,min:me,classes:ne,disabled:se,disableSwap:ie,orientation:ve,marks:de,color:oe,size:be,step:fe,shiftStep:he,scale:ge,track:ke,valueLabelDisplay:Ae,valueLabelFormat:we}),{axisProps:Le,getRootProps:$e,getHiddenInputProps:ze,getThumbProps:Re,open:Me,active:Te,axis:Pe,focusedThumbIndex:Ne,range:Ie,dragging:je,marks:Oe,values:Ee,trackOffset:Ve,trackLeap:Fe,getThumbStyle:De}=T((0,o.A)({},Ce,{rootRef:t}));Ce.marked=Oe.length>0&&Oe.some((e=>e.label)),Ce.dragging=je,Ce.focusedThumbIndex=Ne;const Be=(e=>{const{disabled:t,dragging:a,marked:r,orientation:o,track:n,classes:l,color:i,size:s}=e,u={root:["root",t&&"disabled",a&&"dragging",r&&"marked","vertical"===o&&"vertical","inverted"===n&&"trackInverted",!1===n&&"trackFalse",i&&`color${(0,E.A)(i)}`,s&&`size${(0,E.A)(s)}`],rail:["rail"],track:["track"],mark:["mark"],markActive:["markActive"],markLabel:["markLabel"],markLabelActive:["markLabelActive"],valueLabel:["valueLabel"],thumb:["thumb",t&&"disabled",s&&`thumbSize${(0,E.A)(s)}`,i&&`thumbColor${(0,E.A)(i)}`],active:["active"],disabled:["disabled"],focusVisible:["focusVisible"]};return(0,c.A)(u,D,l)})(Ce),Xe=null!=(a=null!=(u=null==xe?void 0:xe.root)?u:ae.Root)?a:K,Ye=null!=(d=null!=(p=null==xe?void 0:xe.rail)?p:ae.Rail)?d:W,Qe=null!=(m=null!=(v=null==xe?void 0:xe.track)?v:ae.Track)?m:U,He=null!=(h=null!=(b=null==xe?void 0:xe.thumb)?b:ae.Thumb)?h:_,Ke=null!=(f=null!=(g=null==xe?void 0:xe.valueLabel)?g:ae.ValueLabel)?f:q,We=null!=(y=null!=(x=null==xe?void 0:xe.mark)?x:ae.Mark)?y:G,Ue=null!=(k=null!=(A=null==xe?void 0:xe.markLabel)?A:ae.MarkLabel)?k:J,_e=null!=(S=null!=(C=null==xe?void 0:xe.input)?C:ae.Input)?S:"input",qe=null!=(L=null==ye?void 0:ye.root)?L:re.root,Ge=null!=($=null==ye?void 0:ye.rail)?$:re.rail,Je=null!=(z=null==ye?void 0:ye.track)?z:re.track,Ze=null!=(R=null==ye?void 0:ye.thumb)?R:re.thumb,et=null!=(M=null==ye?void 0:ye.valueLabel)?M:re.valueLabel,tt=null!=(P=null==ye?void 0:ye.mark)?P:re.mark,at=null!=(I=null==ye?void 0:ye.markLabel)?I:re.markLabel,rt=null!=(j=null==ye?void 0:ye.input)?j:re.input,ot=(0,i.Q)({elementType:Xe,getSlotProps:$e,externalSlotProps:qe,externalForwardedProps:Se,additionalProps:(0,o.A)({},(pt=Xe,(!pt||!(0,s.g)(pt))&&{as:te})),ownerState:(0,o.A)({},Ce,null==qe?void 0:qe.ownerState),className:[Be.root,le]}),nt=(0,i.Q)({elementType:Ye,externalSlotProps:Ge,ownerState:Ce,className:Be.rail}),lt=(0,i.Q)({elementType:Qe,externalSlotProps:Je,additionalProps:{style:(0,o.A)({},Le[Pe].offset(Ve),Le[Pe].leap(Fe))},ownerState:(0,o.A)({},Ce,null==Je?void 0:Je.ownerState),className:Be.track}),it=(0,i.Q)({elementType:He,getSlotProps:Re,externalSlotProps:Ze,ownerState:(0,o.A)({},Ce,null==Ze?void 0:Ze.ownerState),className:Be.thumb}),st=(0,i.Q)({elementType:Ke,externalSlotProps:et,ownerState:(0,o.A)({},Ce,null==et?void 0:et.ownerState),className:Be.valueLabel}),ct=(0,i.Q)({elementType:We,externalSlotProps:tt,ownerState:Ce,className:Be.mark}),ut=(0,i.Q)({elementType:Ue,externalSlotProps:at,ownerState:Ce,className:Be.markLabel}),dt=(0,i.Q)({elementType:_e,getSlotProps:ze,externalSlotProps:rt,ownerState:Ce});var pt;return(0,X.jsxs)(Xe,(0,o.A)({},ot,{children:[(0,X.jsx)(Ye,(0,o.A)({},nt)),(0,X.jsx)(Qe,(0,o.A)({},lt)),Oe.filter((e=>e.value>=me&&e.value<=pe)).map(((e,t)=>{const a=w(e.value,me,pe),r=Le[Pe].offset(a);let i;return i=!1===ke?-1!==Ee.indexOf(e.value):"normal"===ke&&(Ie?e.value>=Ee[0]&&e.value<=Ee[Ee.length-1]:e.value<=Ee[0])||"inverted"===ke&&(Ie?e.value<=Ee[0]||e.value>=Ee[Ee.length-1]:e.value>=Ee[0]),(0,X.jsxs)(n.Fragment,{children:[(0,X.jsx)(We,(0,o.A)({"data-index":t},ct,!(0,s.g)(We)&&{markActive:i},{style:(0,o.A)({},r,ct.style),className:(0,l.A)(ct.className,i&&Be.markActive)})),null!=e.label?(0,X.jsx)(Ue,(0,o.A)({"aria-hidden":!0,"data-index":t},ut,!(0,s.g)(Ue)&&{markLabelActive:i},{style:(0,o.A)({},r,ut.style),className:(0,l.A)(Be.markLabel,ut.className,i&&Be.markLabelActive),children:e.label})):null]},t)})),Ee.map(((e,t)=>{const a=w(e,me,pe),r=Le[Pe].offset(a),n="off"===Ae?Z:Ke;return(0,X.jsx)(n,(0,o.A)({},!(0,s.g)(n)&&{valueLabelFormat:we,valueLabelDisplay:Ae,value:"function"==typeof we?we(ge(e),t):we,index:t,open:Me===t||Te===t||"on"===Ae,disabled:se},st,{children:(0,X.jsx)(He,(0,o.A)({"data-index":t},it,{className:(0,l.A)(Be.thumb,it.className,Te===t&&Be.active,Ne===t&&Be.focusVisible),style:(0,o.A)({},r,De(t),it.style),children:(0,X.jsx)(_e,(0,o.A)({"data-index":t,"aria-label":ce?ce(t):F,"aria-valuenow":ge(e),"aria-labelledby":ee,"aria-valuetext":ue?ue(ge(e),t):B,value:Ee[t]},dt))}))}),t)}))]}))})),te=ee},1405:(e,t,a)=>{a.d(t,{A:()=>S});var r=a(98587),o=a(58168),n=a(96540),l=a(34164),i=a(64111),s=a(771),c=a(28466),u=a(55860),d=a(76081),p=a(11848),m=a(27553),v=a(17245);function h(e){return(0,v.Ay)("MuiSwitch",e)}const b=(0,m.A)("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]);var f=a(74848);const g=["className","color","edge","size","sx"],y=(0,d.h)("MuiSwitch"),x=(0,p.Ay)("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.edge&&t[`edge${(0,c.A)(a.edge)}`],t[`size${(0,c.A)(a.size)}`]]}})({display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${b.thumb}`]:{width:16,height:16},[`& .${b.switchBase}`]:{padding:4,[`&.${b.checked}`]:{transform:"translateX(16px)"}}}}]}),k=(0,p.Ay)(u.A,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.switchBase,{[`& .${b.input}`]:t.input},"default"!==a.color&&t[`color${(0,c.A)(a.color)}`]]}})((({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${"light"===e.palette.mode?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${b.checked}`]:{transform:"translateX(20px)"},[`&.${b.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${"light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${b.checked} + .${b.track}`]:{opacity:.5},[`&.${b.disabled} + .${b.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:""+("light"===e.palette.mode?.12:.2)},[`& .${b.input}`]:{left:"-100%",width:"300%"}})),(({theme:e})=>({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.X4)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(e.palette).filter((([,e])=>e.main&&e.light)).map((([t])=>({props:{color:t},style:{[`&.${b.checked}`]:{color:(e.vars||e).palette[t].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:(0,s.X4)(e.palette[t].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${b.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${t}DisabledColor`]:`${"light"===e.palette.mode?(0,s.a)(e.palette[t].main,.62):(0,s.e$)(e.palette[t].main,.55)}`}},[`&.${b.checked} + .${b.track}`]:{backgroundColor:(e.vars||e).palette[t].main}}})))]}))),A=(0,p.Ay)("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,t)=>t.track})((({theme:e})=>({height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${"light"===e.palette.mode?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:""+("light"===e.palette.mode?.38:.3)}))),w=(0,p.Ay)("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,t)=>t.thumb})((({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),S=n.forwardRef((function(e,t){const a=y({props:e,name:"MuiSwitch"}),{className:n,color:s="primary",edge:u=!1,size:d="medium",sx:p}=a,m=(0,r.A)(a,g),v=(0,o.A)({},a,{color:s,edge:u,size:d}),b=(e=>{const{classes:t,edge:a,size:r,color:n,checked:l,disabled:s}=e,u={root:["root",a&&`edge${(0,c.A)(a)}`,`size${(0,c.A)(r)}`],switchBase:["switchBase",`color${(0,c.A)(n)}`,l&&"checked",s&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},d=(0,i.A)(u,h,t);return(0,o.A)({},t,d)})(v),S=(0,f.jsx)(w,{className:b.thumb,ownerState:v});return(0,f.jsxs)(x,{className:(0,l.A)(b.root,n),sx:p,ownerState:v,children:[(0,f.jsx)(k,(0,o.A)({type:"checkbox",icon:S,checkedIcon:S,ref:t,ownerState:v},m,{classes:(0,o.A)({},b,{root:b.switchBase})})),(0,f.jsx)(A,{className:b.track,ownerState:v})]})}))}}]);