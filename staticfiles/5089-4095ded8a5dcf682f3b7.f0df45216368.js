"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[5089],{45089:(e,t,n)=>{n.d(t,{A:()=>S});var r=n(98587),i=n(58168),a=n(96540),o=n(34164),s=n(17437),l=n(64111),h=n(31127),u=n(24279),d=n(11848),c=n(3541),p=n(27553),f=n(17245);function g(e){return(0,f.Ay)("MuiSkeleton",e)}(0,p.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var m=n(74848);const b=["animation","className","component","height","style","variant","width"];let v,w,y,x,$=e=>e;const A=(0,s.i7)(v||(v=$`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),k=(0,s.i7)(w||(w=$`
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
`)),C=(0,d.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],!1!==n.animation&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})((({theme:e,ownerState:t})=>{const n=(0,h.l_)(e.shape.borderRadius)||"px",r=(0,h.db)(e.shape.borderRadius);return(0,i.A)({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:(0,u.X4)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===t.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${n}/${Math.round(r/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===t.variant&&{borderRadius:"50%"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})}),(({ownerState:e})=>"pulse"===e.animation&&(0,s.AH)(y||(y=$`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),A)),(({ownerState:e,theme:t})=>"wave"===e.animation&&(0,s.AH)(x||(x=$`
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
    `),k,(t.vars||t).palette.action.hover))),S=a.forwardRef((function(e,t){const n=(0,c.A)({props:e,name:"MuiSkeleton"}),{animation:a="pulse",className:s,component:h="span",height:u,style:d,variant:p="text",width:f}=n,v=(0,r.A)(n,b),w=(0,i.A)({},n,{animation:a,component:h,variant:p,hasChildren:Boolean(v.children)}),y=(e=>{const{classes:t,variant:n,animation:r,hasChildren:i,width:a,height:o}=e,s={root:["root",n,r,i&&"withChildren",i&&!a&&"fitContent",i&&!o&&"heightAuto"]};return(0,l.A)(s,g,t)})(w);return(0,m.jsx)(C,(0,i.A)({as:h,ref:t,className:(0,o.A)(y.root,s),ownerState:w},v,{style:(0,i.A)({width:f,height:u},d)}))}))},31127:(e,t,n)=>{function r(e){return String(parseFloat(e)).length===String(e).length}function i(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function a(e){return parseFloat(e)}function o(e){return(t,n)=>{const r=i(t);if(r===n)return t;let o=a(t);"px"!==r&&("em"===r||"rem"===r)&&(o=a(t)*a(e));let s=o;if("px"!==n)if("em"===n)s=o/a(e);else{if("rem"!==n)return t;s=o/a(e)}return parseFloat(s.toFixed(5))+n}}function s({size:e,grid:t}){const n=e-e%t,r=n+t;return e-n<r-e?n:r}function l({lineHeight:e,pixels:t,htmlFontSize:n}){return t/(e*n)}function h({cssProperty:e,min:t,max:n,unit:r="rem",breakpoints:i=[600,900,1200],transform:a=null}){const o={[e]:`${t}${r}`},s=(n-t)/i[i.length-1];return i.forEach((n=>{let i=t+s*n;null!==a&&(i=a(i)),o[`@media (min-width:${n}px)`]={[e]:`${Math.round(1e4*i)/1e4}${r}`}})),o}n.d(t,{I3:()=>o,VR:()=>s,a9:()=>r,db:()=>a,l_:()=>i,qW:()=>l,yL:()=>h})},24279:(e,t,n)=>{n.d(t,{X0:()=>s,X4:()=>l,a:()=>u,e$:()=>h,rP:()=>o});var r=n(35697),i=n(76937);function a(e,t=0,n=1){return(0,i.A)(e,t,n)}function o(e){if(e.type)return e;if("#"===e.charAt(0))return o(function(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let n=e.match(t);return n&&1===n[0].length&&(n=n.map((e=>e+e))),n?`rgb${4===n.length?"a":""}(${n.map(((e,t)=>t<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3)).join(", ")})`:""}(e));const t=e.indexOf("("),n=e.substring(0,t);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(n))throw new Error((0,r.A)(9,e));let i,a=e.substring(t+1,e.length-1);if("color"===n){if(a=a.split(" "),i=a.shift(),4===a.length&&"/"===a[3].charAt(0)&&(a[3]=a[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(i))throw new Error((0,r.A)(10,i))}else a=a.split(",");return a=a.map((e=>parseFloat(e))),{type:n,values:a,colorSpace:i}}function s(e){const{type:t,colorSpace:n}=e;let{values:r}=e;return-1!==t.indexOf("rgb")?r=r.map(((e,t)=>t<3?parseInt(e,10):e)):-1!==t.indexOf("hsl")&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),r=-1!==t.indexOf("color")?`${n} ${r.join(" ")}`:`${r.join(", ")}`,`${t}(${r})`}function l(e,t){return e=o(e),t=a(t),"rgb"!==e.type&&"hsl"!==e.type||(e.type+="a"),"color"===e.type?e.values[3]=`/${t}`:e.values[3]=t,s(e)}function h(e,t){if(e=o(e),t=a(t),-1!==e.type.indexOf("hsl"))e.values[2]*=1-t;else if(-1!==e.type.indexOf("rgb")||-1!==e.type.indexOf("color"))for(let n=0;n<3;n+=1)e.values[n]*=1-t;return s(e)}function u(e,t){if(e=o(e),t=a(t),-1!==e.type.indexOf("hsl"))e.values[2]+=(100-e.values[2])*t;else if(-1!==e.type.indexOf("rgb"))for(let n=0;n<3;n+=1)e.values[n]+=(255-e.values[n])*t;else if(-1!==e.type.indexOf("color"))for(let n=0;n<3;n+=1)e.values[n]+=(1-e.values[n])*t;return s(e)}}}]);