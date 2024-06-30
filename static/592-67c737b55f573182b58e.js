"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[592],{72592:(e,t,n)=>{n.r(t),n.d(t,{default:()=>z});var a=n(96540),r=n(46266),i=n(8239),o=n(69067),l=n(97834),c=n(30995),s=n(1043),m=n(53246),d=n(25239),u=n(22100),p=n(47767),f=n(84976),g=n(50779),A=n(36632),y=n(28800),E=n(14073),h=n(32389),v=n(71543),b=n(16626),k=n(14627),_=n(22453),x=n(13718),w=n(44675),S=n(15327),C=n(33066),I=n(45089),j=n(14977),L=n(37636),R=n(87393),F=n(34104),M=n(56826),O=n(48139),D=function(e){var t=e.image_link,n=e.t,r=e.redirect,i=e.destination,l=e.image_loaded,c=e.setImageLoad,s=e.name;return a.createElement(o.A,{m:1},a.createElement(F.A,{onClick:function(){r(i)}},a.createElement(j.A,{sx:{display:"flex"}},a.createElement(o.A,{sx:{display:"flex",flexDirection:"column"}},a.createElement(L.A,{sx:{flex:"1 0 auto"}},a.createElement(E.A,{component:"div",variant:"h5"},n("redirect.".concat(s))),a.createElement(E.A,{variant:"subtitle1",sx:{display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:5},color:"text.secondary",component:"div"},n("redirect.".concat(s,"_Content")))),a.createElement(M.A,null,a.createElement(O.A,{component:"span",size:"small",color:"primary"},n("redirect.Redirect")))),!l&&a.createElement(R.A,{sx:{width:200,height:200}},a.createElement(I.A,{animation:"wave",height:200,width:200})),a.createElement(R.A,{component:"img",sx:{width:200,display:l?"block":"none"},image:t,onLoad:function(){c(!0)}}))))};function W(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,i,o,l=[],c=!0,s=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(a=i.call(n)).done)&&(l.push(a.value),l.length!==t);c=!0);}catch(e){s=!0,r=e}finally{try{if(!c&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(s)throw r}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}const z=function(){var e=(0,a.useContext)(k.Rs),t=e.is_authenticated,n=e.setIsAuthenticated,I=(0,w.A)(),j=(0,S.A)(I.breakpoints.down("md"))?"horizontal":"vertical",L=(0,h.Bd)(),R=L.t,F=(L.i18n,(0,p.Zp)()),M=W((0,a.useState)(!1),2),O=M[0],q=M[1],z=W((0,a.useState)(""),2),H=z[0],T=z[1],B=W((0,a.useState)(!1),2),K=B[0],N=B[1],P=W((0,a.useState)(!1),2),X=P[0],Y=P[1],G=W((0,a.useState)(null),2),U=G[0],V=G[1],Z=W((0,a.useState)(!1),2),$=Z[0],J=Z[1],Q=W((0,a.useState)(!1),2),ee=Q[0],te=Q[1],ne=W((0,a.useState)(!1),2),ae=ne[0],re=ne[1],ie=W((0,a.useState)(!1),2),oe=ie[0],le=ie[1],ce=W((0,a.useState)(!1),2),se=ce[0],me=ce[1],de=W((0,a.useState)(!1),2),ue=de[0],pe=de[1],fe=function(e,t){"clickaway"!==t&&J(!1)},ge=function(e){var t=e.error;return a.createElement(o.A,{mt:4},a.createElement(E.A,{variant:"body1"},"Request Failed!"),a.createElement(o.A,{textAlign:"center"},a.createElement(A.A,{variant:"filled",severity:"error"},t)))},Ae=function(e){var t=e.error;return a.createElement(o.A,{mt:4},a.createElement(E.A,{variant:"body1"},"Request Failed!"),a.createElement(o.A,{textAlign:"center"},a.createElement(A.A,{variant:"filled",severity:"error"},t)))},ye=function(e){if(N(!1),Y(!1),t||""!=H){if(e){var a={headers:{"content-type":"application/json","X-CSRFToken":(0,_.R)("csrftoken")}},i={key:H,check_login:t,destination:e};r.A.post("/frontend-api/hub-redirect",i,a).then((function(e){n(!0),F(e.data.redirect_link,{replace:!0,state:{credential:H}})})).catch((function(e){V(e.response.data.detail),"400"==e.response.status&&V("Your key is incorrect")}))}}else N(!0),J(!0)};return a.createElement(l.A,{maxWidth:!1,disableGutters:!0},a.createElement("title",null,"Hub"),a.createElement(u.A,{max_width:"xl"}),a.createElement(l.A,{maxWidth:"lg"},a.createElement(C.A,{open:$,autoHideDuration:5e3,onClose:fe},a.createElement(A.A,{onClose:fe,severity:"error",variant:"filled",sx:{width:"100%"}},"You need an API key!")),a.createElement(o.A,{my:1,display:"flex",alignItems:"center",gap:4,p:2},a.createElement(i.Ay,{container:!0,alignItems:"center",justify:"center",direction:"column",spacing:2},!t&&a.createElement(i.Ay,{item:!0,md:12,lg:12},a.createElement("form",{autoComplete:"off",onSubmit:function(e){if(e.preventDefault(),q(!0),N(!1),Y(!1),""==H&&N(!0),H){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,_.R)("csrftoken")}},a={key:H};r.A.post("/frontend-api/login",a,t).then((function(e){n(!0),F("/frontend/hub")})).catch((function(e){Y(e.response.data.detail),N(!1),V(!1)}))}q(!1)}},a.createElement(g.A,{defaultValue:"",required:!0},a.createElement(c.A,{ml:1,mt:3,direction:{xs:"column",md:"row"},spacing:{xs:1,md:1}},a.createElement(s.A,{margin:"normal",label:"Key",type:"password",size:"small",onChange:function(e){return T(e.target.value)},value:H,error:K,autoComplete:"off",InputProps:{startAdornment:a.createElement(d.A,{position:"start"},a.createElement(m.A,null))}}),a.createElement(x.A,{loading:O,variant:"contained",type:"submit",endIcon:a.createElement(y.A,null)},"Login"),a.createElement(v.A,{orientation:j,flexItem:!0}),a.createElement(x.A,{variant:"contained",component:f.N_,to:"/frontend/key-management"},"  Create New Key ")),X&&a.createElement(ge,{error:X}),U&&a.createElement(Ae,{error:U})))),a.createElement(i.Ay,{item:!0,md:12,lg:12},a.createElement(D,{image_link:"https://static.professorparakeet.com/image/robot_line.jpg",redirect:ye,destination:"chat",image_loaded:ee,setImageLoad:te,t:R,name:"Chatbot_Mode"}),a.createElement(D,{image_link:"https://static.professorparakeet.com/image/Robot_folow_instruct.jpg",redirect:ye,destination:"engineer",image_loaded:ae,setImageLoad:re,t:R,name:"Agent_Mode"}),a.createElement(D,{image_link:"https://static.professorparakeet.com/image/Robot_label.jpg",redirect:ye,destination:"toolbox",image_loaded:oe,setImageLoad:le,t:R,name:"LLM_Functions"}),a.createElement(D,{image_link:"https://static.professorparakeet.com/image/face_to_face.jpeg",redirect:ye,destination:"hotpot",image_loaded:se,setImageLoad:me,t:R,name:"Hotpot_Mode"}),a.createElement(D,{image_link:"/static/image/data_synthesis.jpg",redirect:ye,destination:"data-synthesis",image_loaded:ue,setImageLoad:pe,t:R,name:"Data_Synthesis"}))))),a.createElement(b.A,null))}}}]);