"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[362],{65362:(e,t,n)=>{n.r(t),n.d(t,{default:()=>F});var r=n(96540),a=n(46266),o=n(8239),i=n(69067),l=n(97834),c=n(30995),m=n(1043),s=n(53246),d=n(25239),u=n(37312),p=n(47767),f=n(84976),A=n(50779),E=n(36632),h=n(28800),x=n(14073),y=n(32389),v=n(71543),b=n(38960),g=n(14627),k=n(22453),w=n(45089),C=n(14977),_=n(37636),S=n(87393),L=n(34104),R=n(56826),j=n(48139),I=n(13718),W=n(44675),M=n(15327),O=n(33066);function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o,i,l=[],c=!0,m=!1;try{if(o=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=o.call(n)).done)&&(l.push(r.value),l.length!==t);c=!0);}catch(e){m=!0,a=e}finally{try{if(!c&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(m)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const F=function(){var e=(0,r.useContext)(g.Rs),t=e.is_authenticated,n=e.setIsAuthenticated,D=(0,W.A)(),F=(0,M.A)(D.breakpoints.down("md"))?"horizontal":"vertical",B=(0,y.Bd)(),H=B.t,q=(B.i18n,(0,p.Zp)()),T=z((0,r.useState)(!1),2),K=T[0],N=T[1],P=z((0,r.useState)(""),2),X=P[0],Y=P[1],G=z((0,r.useState)(!1),2),U=G[0],V=G[1],Z=z((0,r.useState)(!1),2),$=Z[0],J=Z[1],Q=z((0,r.useState)(null),2),ee=Q[0],te=Q[1],ne=z((0,r.useState)(!1),2),re=ne[0],ae=ne[1],oe=z((0,r.useState)(!1),2),ie=oe[0],le=oe[1],ce=z((0,r.useState)(!1),2),me=ce[0],se=ce[1],de=z((0,r.useState)(!1),2),ue=de[0],pe=de[1],fe=z((0,r.useState)(!1),2),Ae=fe[0],Ee=fe[1],he=function(e,t){"clickaway"!==t&&ae(!1)},xe=function(e){var t=e.error;return r.createElement(i.A,{mt:4},r.createElement(x.A,{variant:"body1"},"Request Failed!"),r.createElement(i.A,{textAlign:"center"},r.createElement(E.A,{variant:"filled",severity:"error"},t)))},ye=function(e){var t=e.error;return r.createElement(i.A,{mt:4},r.createElement(x.A,{variant:"body1"},"Request Failed!"),r.createElement(i.A,{textAlign:"center"},r.createElement(E.A,{variant:"filled",severity:"error"},t)))},ve=function(e){if(V(!1),J(!1),t||""!=X){if(e){var r={headers:{"content-type":"application/json","X-CSRFToken":(0,k.R)("csrftoken")}},o={key:X,check_login:t,destination:e};a.A.post("/frontend-api/hub-redirect",o,r).then((function(e){n(!0),q(e.data.redirect_link,{replace:!0,state:{credential:X}})})).catch((function(e){te(e.response.data.detail),"400"==e.response.status&&te("Your key is incorrect")}))}}else V(!0),ae(!0)};return r.createElement(l.A,{maxWidth:!1,disableGutters:!0},r.createElement("title",null,"Hub"),r.createElement(u.A,{max_width:"xl"}),r.createElement(l.A,{maxWidth:"lg"},r.createElement(O.A,{open:re,autoHideDuration:5e3,onClose:he},r.createElement(E.A,{onClose:he,severity:"error",variant:"filled",sx:{width:"100%"}},"You need an API key!")),r.createElement(i.A,{my:1,display:"flex",alignItems:"center",gap:4,p:2},r.createElement(o.Ay,{container:!0,alignItems:"center",justify:"center",direction:"column",spacing:2},!t&&r.createElement(o.Ay,{item:!0,md:12,lg:12},r.createElement("form",{autoComplete:"off",onSubmit:function(e){if(e.preventDefault(),N(!0),V(!1),J(!1),""==X&&V(!0),X){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,k.R)("csrftoken")}},r={key:X};a.A.post("/frontend-api/login",r,t).then((function(e){n(!0),q("/frontend/hub")})).catch((function(e){J(e.response.data.detail),V(!1),te(!1)}))}N(!1)}},r.createElement(A.A,{defaultValue:"",required:!0},r.createElement(c.A,{ml:1,mt:3,direction:{xs:"column",md:"row"},spacing:{xs:1,md:1}},r.createElement(m.A,{margin:"normal",label:"Key",type:"password",size:"small",onChange:function(e){return Y(e.target.value)},value:X,error:U,autoComplete:"off",InputProps:{startAdornment:r.createElement(d.A,{position:"start"},r.createElement(s.A,null))}}),r.createElement(I.A,{loading:K,variant:"contained",type:"submit",endIcon:r.createElement(h.A,null)},"Login"),r.createElement(v.A,{orientation:F,flexItem:!0}),r.createElement(I.A,{variant:"contained",component:f.N_,to:"/frontend/key-management"},"  Create New Key ")),$&&r.createElement(xe,{error:$}),ee&&r.createElement(ye,{error:ee})))),r.createElement(o.Ay,{item:!0,md:12,lg:12},r.createElement(i.A,{m:1},r.createElement(L.A,{onClick:function(){ve("chat")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(i.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(_.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},H("redirect.Chatbot_Mode")),r.createElement(x.A,{variant:"subtitle1",sx:{display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:5},color:"text.secondary",component:"div"},H("redirect.Chatbot_Mode_Content"))),r.createElement(R.A,null,r.createElement(j.A,{component:"span",size:"small",color:"primary"},H("redirect.Redirect")))),!ie&&r.createElement(S.A,{sx:{width:200,height:200}},r.createElement(w.A,{animation:"wave",height:200,width:200})),r.createElement(S.A,{component:"img",sx:{width:200,display:ie?"block":"none"},image:"https://static.professorparakeet.com/image/robot_line.jpg",onLoad:function(){le(!0)}})))),r.createElement(i.A,{m:1},r.createElement(L.A,{onClick:function(){ve("engineer")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(i.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(_.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},H("redirect.Agent_Mode")),r.createElement(x.A,{variant:"subtitle1",sx:{display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:5},color:"text.secondary",component:"div"},H("redirect.Agent_Mode_Content"))),r.createElement(R.A,null,r.createElement(j.A,{component:"span",size:"small",color:"primary"},H("redirect.Redirect")))),!me&&r.createElement(S.A,{sx:{width:200,height:200}},r.createElement(w.A,{animation:"wave",height:200,width:200})),r.createElement(S.A,{component:"img",sx:{width:200,display:me?"block":"none"},image:"https://static.professorparakeet.com/image/Robot_folow_instruct.jpg",onLoad:function(){se(!0)}})))),r.createElement(i.A,{m:1},r.createElement(L.A,{onClick:function(){ve("toolbox")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(i.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(_.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},H("redirect.LLM_Functions")),r.createElement(x.A,{variant:"subtitle1",sx:{display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:5},color:"text.secondary",component:"div"},H("redirect.LLM_Functions_Content"))),r.createElement(R.A,null,r.createElement(j.A,{component:"span",size:"small",color:"primary"},H("redirect.Redirect")))),!ue&&r.createElement(S.A,{sx:{width:200,height:200}},r.createElement(w.A,{animation:"wave",height:200,width:200})),r.createElement(S.A,{component:"img",sx:{width:200,display:ue?"block":"none"},image:"https://static.professorparakeet.com/image/Robot_label.jpg",onLoad:function(){pe(!0)}})))),r.createElement(i.A,{m:1},r.createElement(L.A,{onClick:function(){ve("hotpot")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(i.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(_.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},H("redirect.Hotpot_Mode")),r.createElement(x.A,{sx:{display:"-webkit-box",overflow:"hidden",WebkitBoxOrient:"vertical",WebkitLineClamp:5},variant:"subtitle1",color:"text.secondary",component:"div"},H("redirect.Hotpot_Mode_Content"))),r.createElement(R.A,null,r.createElement(j.A,{component:"span",size:"small",color:"primary"},H("redirect.Redirect")))),!Ae&&r.createElement(S.A,{sx:{width:200,height:200}},r.createElement(w.A,{animation:"wave",height:200,width:200})),r.createElement(S.A,{component:"img",sx:{width:200,display:Ae?"block":"none"},image:"https://static.professorparakeet.com/image/face_to_face.jpeg",onLoad:function(){Ee(!0)}})))))))),r.createElement(b.A,null))}}}]);