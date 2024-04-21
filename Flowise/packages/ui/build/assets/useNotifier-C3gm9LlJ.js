import{N as S,O as I,s as _,af as E,Q as f,_ as c,e as x,a as y,R as j,U as D,j as d,V as M,W as N,bX as w,bY as k,ca as U,cb as O,cc as W,D as A,b as F,c as T,d as P,u as X,p as H,cd as L,aH as V,ce as q}from"./index-BgTNlE3K.js";import{D as K,B as Q,a as Y}from"./useApi-H2a3O-a6.js";function G(o){return String(o).match(/[\d.\-+]*\s*(.*)/)[1]||""}function J(o){return parseFloat(o)}function Z(o){return I("MuiIconButton",o)}const oo=S("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),to=["edge","children","className","color","disabled","disableFocusRipple","size"],eo=o=>{const{classes:t,disabled:e,color:a,edge:s,size:r}=o,i={root:["root",e&&"disabled",a!=="default"&&`color${f(a)}`,s&&`edge${f(s)}`,`size${f(r)}`]};return N(i,Z,t)},ao=_(E,{name:"MuiIconButton",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:e}=o;return[t.root,e.color!=="default"&&t[`color${f(e.color)}`],e.edge&&t[`edge${f(e.edge)}`],t[`size${f(e.size)}`]]}})(({theme:o,ownerState:t})=>c({textAlign:"center",flex:"0 0 auto",fontSize:o.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(o.vars||o).palette.action.active,transition:o.transitions.create("background-color",{duration:o.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette.action.activeChannel} / ${o.vars.palette.action.hoverOpacity})`:x(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.edge==="start"&&{marginLeft:t.size==="small"?-3:-12},t.edge==="end"&&{marginRight:t.size==="small"?-3:-12}),({theme:o,ownerState:t})=>{var e;const a=(e=(o.vars||o).palette)==null?void 0:e[t.color];return c({},t.color==="inherit"&&{color:"inherit"},t.color!=="inherit"&&t.color!=="default"&&c({color:a==null?void 0:a.main},!t.disableRipple&&{"&:hover":c({},a&&{backgroundColor:o.vars?`rgba(${a.mainChannel} / ${o.vars.palette.action.hoverOpacity})`:x(a.main,o.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),t.size==="small"&&{padding:5,fontSize:o.typography.pxToRem(18)},t.size==="large"&&{padding:12,fontSize:o.typography.pxToRem(28)},{[`&.${oo.disabled}`]:{backgroundColor:"transparent",color:(o.vars||o).palette.action.disabled}})}),no=y.forwardRef(function(t,e){const a=j({props:t,name:"MuiIconButton"}),{edge:s=!1,children:r,className:i,color:n="default",disabled:u=!1,disableFocusRipple:p=!1,size:g="medium"}=a,h=D(a,to),l=c({},a,{edge:s,color:n,disabled:u,disableFocusRipple:p,size:g}),m=eo(l);return d.jsx(ao,c({className:M(m.root,i),centerRipple:!0,focusRipple:!p,disabled:u,ref:e,ownerState:l},h,{children:r}))}),mo=no;function so(o){return I("MuiSkeleton",o)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const io=["animation","className","component","height","style","variant","width"];let v=o=>o,R,$,B,z;const ro=o=>{const{classes:t,variant:e,animation:a,hasChildren:s,width:r,height:i}=o;return N({root:["root",e,a,s&&"withChildren",s&&!r&&"fitContent",s&&!i&&"heightAuto"]},so,t)},lo=w(R||(R=v`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),co=w($||($=v`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),uo=_("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:e}=o;return[t.root,t[e.variant],e.animation!==!1&&t[e.animation],e.hasChildren&&t.withChildren,e.hasChildren&&!e.width&&t.fitContent,e.hasChildren&&!e.height&&t.heightAuto]}})(({theme:o,ownerState:t})=>{const e=G(o.shape.borderRadius)||"px",a=J(o.shape.borderRadius);return c({display:"block",backgroundColor:o.vars?o.vars.palette.Skeleton.bg:x(o.palette.text.primary,o.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(o.vars||o).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:o})=>o.animation==="pulse"&&k(B||(B=v`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),lo),({ownerState:o,theme:t})=>o.animation==="wave"&&k(z||(z=v`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),co,(t.vars||t).palette.action.hover)),po=y.forwardRef(function(t,e){const a=j({props:t,name:"MuiSkeleton"}),{animation:s="pulse",className:r,component:i="span",height:n,style:u,variant:p="text",width:g}=a,h=D(a,io),l=c({},a,{animation:s,component:i,variant:p,hasChildren:!!h.children}),m=ro(l);return d.jsx(uo,c({as:i,ref:e,className:M(m.root,r),ownerState:l},h,{style:c({width:g,height:n},u)}))}),bo=po;let C;const ho=()=>{const[o,t]=y.useContext(U),e=()=>{t({type:W})};return{confirm:i=>(t({type:O,payload:i}),new Promise(n=>{C=n})),onConfirm:()=>{e(),C(!0)},onCancel:()=>{e(),C(!1)},confirmState:o}},vo=()=>{const{onConfirm:o,onCancel:t,confirmState:e}=ho(),a=document.getElementById("portal"),s=e.show?d.jsxs(A,{fullWidth:!0,maxWidth:"xs",open:e.show,onClose:t,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[d.jsx(F,{sx:{fontSize:"1rem"},id:"alert-dialog-title",children:e.title}),d.jsx(T,{children:d.jsx("span",{children:e.description})}),d.jsxs(K,{children:[d.jsx(Q,{onClick:t,children:e.cancelButtonName}),d.jsx(Y,{variant:"contained",onClick:o,children:e.confirmButtonName})]})]}):null;return P.createPortal(s,a)};let b=[];const Co=()=>{const o=X(),t=H(n=>n.notifier),{notifications:e}=t,{enqueueSnackbar:a,closeSnackbar:s}=L(),r=n=>{b=[...b,n]},i=n=>{b=[...b.filter(u=>n!==u)]};V.useEffect(()=>{e.forEach(({key:n,message:u,options:p={},dismissed:g=!1})=>{if(g){s(n);return}b.includes(n)||(a(u,{key:n,...p,onClose:(h,l,m)=>{p.onClose&&p.onClose(h,l,m)},onExited:(h,l)=>{o(q(l)),i(l)}}),r(n))})},[e,s,a,o])};export{vo as C,mo as I,bo as S,ho as a,Co as u};
