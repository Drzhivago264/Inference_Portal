"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[362],{65362:(e,t,n)=>{n.r(t),n.d(t,{default:()=>F});var r=n(96540),a=n(46266),l=n(8239),o=n(69067),c=n(97834),i=n(30995),m=n(1043),s=n(53246),u=n(25239),d=n(37312),f=n(47767),A=n(84976),p=n(50779),E=n(36632),y=n(28800),x=n(14073),g=n(32389),v=n(71543),h=n(38960),b=n(63418),_=n(22453),C=(n(72635),n(14977)),k=n(37636),w=n(87393),R=n(34104),S=n(56826),j=n(48139),M=n(13718);function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l,o,c=[],i=!0,m=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=l.call(n)).done)&&(c.push(r.value),c.length!==t);i=!0);}catch(e){m=!0,a=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(m)throw a}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return z(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?z(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const F=function(){var e=(0,g.Bd)(),t=e.t,n=(e.i18n,(0,r.useContext)(b.Rs)),z=n.is_authenticated,F=n.setIsAuthenticated,D=(0,f.Zp)(),L=I((0,r.useState)(!1),2),O=L[0],q=L[1],H=I((0,r.useState)(""),2),T=H[0],K=H[1],N=I((0,r.useState)(!1),2),W=N[0],X=N[1],B=I((0,r.useState)(!1),2),G=B[0],P=B[1],U=I((0,r.useState)(null),2),V=U[0],Y=U[1],Z=function(e){var t=e.error;return r.createElement(o.A,{mt:4},r.createElement(x.A,{variant:"body1"},"Request Failed!"),r.createElement(o.A,{textAlign:"center"},r.createElement(E.A,{variant:"filled",severity:"error"},t)))},$=function(e){var t=e.error;return r.createElement(o.A,{mt:4},r.createElement(x.A,{variant:"body1"},"Request Failed!"),r.createElement(o.A,{textAlign:"center"},r.createElement(E.A,{variant:"filled",severity:"error"},t)))},J=function(e){if(X(!1),P(!1),z||""!=T){if(e){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,_.R)("csrftoken")}},n={key:T,check_login:z,destination:e};a.A.post("/frontend-api/hub-redirect",n,t).then((function(e){F(!0),D(e.data.redirect_link,{replace:!0,state:{credential:T}})})).catch((function(e){Y(e.response.data.detail),"400"==e.response.status&&Y("Your key is incorrect")}))}}else X(!0)};return r.createElement(c.A,{maxWidth:!1,disableGutters:!0},r.createElement("title",null,"Hub"),r.createElement(d.A,{max_width:"xl"}),r.createElement(c.A,{maxWidth:"lg"},r.createElement(o.A,{my:1,display:"flex",alignItems:"center",gap:4,p:2},r.createElement(l.Ay,{container:!0,spacing:2},!z&&r.createElement(l.Ay,{item:!0,md:12,lg:12},r.createElement("form",{autoComplete:"off",onSubmit:function(e){if(e.preventDefault(),q(!0),X(!1),P(!1),""==T&&X(!0),T){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,_.R)("csrftoken")}},n={key:T};a.A.post("/frontend-api/login",n,t).then((function(e){F(!0),D("/frontend/hub")})).catch((function(e){P(e.response.data.detail),X(!1),Y(!1)}))}q(!1)}},r.createElement(p.A,{defaultValue:"",required:!0},r.createElement(i.A,{ml:1,mt:3,direction:"row",spacing:1},r.createElement(m.A,{margin:"normal",label:"Key",type:"password",size:"small",onChange:function(e){return K(e.target.value)},value:T,error:W,autoComplete:"off",InputProps:{startAdornment:r.createElement(u.A,{position:"start"},r.createElement(s.A,null))}}),r.createElement(M.A,{loading:O,variant:"contained",type:"submit",endIcon:r.createElement(y.A,null)},"Login"),r.createElement(v.A,{orientation:"vertical",flexItem:!0}),r.createElement(M.A,{size:"medium",variant:"contained",component:A.N_,to:"/frontend/key-management"},"  Create New Key ")),G&&r.createElement(Z,{error:G}),V&&r.createElement($,{error:V})))),r.createElement(l.Ay,{item:!0,md:12,lg:12},r.createElement(o.A,{m:1},r.createElement(R.A,{onClick:function(){J("chat")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(o.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(k.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},t("redirect.Chatbot_Mode")),r.createElement(x.A,{variant:"subtitle1",color:"text.secondary",component:"div"},t("redirect.Chatbot_Mode_Content"))),r.createElement(S.A,null,r.createElement(j.A,{size:"small",color:"primary"},t("redirect.Redirect")))),r.createElement(w.A,{component:"img",sx:{width:250},image:"/static/image/robot_line.jpg"})))),r.createElement(o.A,{m:1},r.createElement(R.A,{onClick:function(){J("engineer")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(o.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(k.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},t("redirect.Agent_Mode")),r.createElement(x.A,{variant:"subtitle1",color:"text.secondary",component:"div"},t("redirect.Agent_Mode_Content"))),r.createElement(S.A,null,r.createElement(j.A,{size:"small",color:"primary"},t("redirect.Redirect")))),r.createElement(w.A,{component:"img",sx:{width:250},image:"/static/image/Robot_folow_instruct.jpg"})))),r.createElement(o.A,{m:1},r.createElement(R.A,{onClick:function(){J("toolbox")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(o.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(k.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},t("redirect.LLM_Functions")),r.createElement(x.A,{variant:"subtitle1",color:"text.secondary",component:"div"},t("redirect.LLM_Functions_Content"))),r.createElement(S.A,null,r.createElement(j.A,{size:"small",color:"primary"},t("redirect.Redirect")))),r.createElement(w.A,{component:"img",sx:{width:250},image:"/static/image/Robot_label.jpg"})))),r.createElement(o.A,{m:1},r.createElement(R.A,{onClick:function(){J("hotpot")}},r.createElement(C.A,{sx:{display:"flex"}},r.createElement(o.A,{sx:{display:"flex",flexDirection:"column"}},r.createElement(k.A,{sx:{flex:"1 0 auto"}},r.createElement(x.A,{component:"div",variant:"h5"},t("redirect.Hotpot_Mode")),r.createElement(x.A,{variant:"subtitle1",color:"text.secondary",component:"div"},t("redirect.Hotpot_Mode_Content"))),r.createElement(S.A,null,r.createElement(j.A,{size:"small",color:"primary"},t("redirect.Redirect")))),r.createElement(w.A,{component:"img",sx:{width:250},image:"/static/image/face_to_face.jpeg"})))))))),r.createElement(h.A,null))}}}]);