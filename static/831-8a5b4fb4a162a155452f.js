"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[831],{32831:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var a=n(96540),r=n(46266),l=n(40921),i=n(48719),c=n(16576),o=n(72048),d=n(84758),u=n(69067),s=n(8239),m=n(36632),p=n(97834),f=n(37312),h=n(30995),y=n(38960);function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,i,c=[],o=!0,d=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;o=!1}else for(;!(o=(a=l.call(n)).done)&&(c.push(a.value),c.length!==t);o=!0);}catch(e){d=!0,r=e}finally{try{if(!o&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(d)throw r}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?A(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}const b=function(){var e=v((0,a.useState)([]),2),t=e[0],n=e[1],A=v((0,a.useState)([]),2),b=A[0],E=A[1];(0,a.useEffect)((function(){r.A.all([r.A.get("/frontend-api/model")]).then(r.A.spread((function(e){n(e.data.servers),E(e.data.models)}))).catch((function(e){console.log(e)}))}),[]);for(var g=0,w=[];g<t.length;)w.push({id:t[g].id,server:"Server-".concat(t[g].id),model:t[g].model_name,status:t[g].status,availability:t[g].availability,input_price_usd:t[g].model_price_input,output_price_usd:t[g].model_price_output}),g++;return a.createElement(p.A,{maxWidth:!1,disableGutters:!0},a.createElement("title",null,"Models"),a.createElement(f.A,null),a.createElement(p.A,{maxWidth:"xl"},a.createElement(u.A,{my:4,display:"flex",alignItems:"center",gap:4,p:2},a.createElement(s.Ay,{container:!0,spacing:2},a.createElement(s.Ay,{item:!0,md:6},b.map((function(e){return"Reddit Helper 2.7B"==e.name?a.createElement(l.A,{key:e.id,defaultExpanded:!0},a.createElement(i.A,{expandIcon:a.createElement(o.A,null),id:e.id},e.name),a.createElement(c.A,{style:{whiteSpace:"pre-wrap"}},e.desc)):a.createElement(l.A,{key:e.id},a.createElement(i.A,{expandIcon:a.createElement(o.A,null),id:e.id},e.name),a.createElement(c.A,{style:{whiteSpace:"pre-wrap"}},e.desc))}))),a.createElement(s.Ay,{item:!0,md:6},a.createElement(h.A,{spacing:1},a.createElement("div",{style:{height:400,width:"100%"}},a.createElement(d.z,{rows:w,columns:[{field:"server",headerName:"Server",width:80},{field:"model",headerName:"Model",width:150},{field:"status",headerName:"Status",width:80},{field:"availability",headerName:"Availability",width:140},{field:"input_price_usd",headerName:"Input (USD)",width:100},{field:"output_price_usd",headerName:"Output (USD)",width:100}],initialState:{pagination:{paginationModel:{page:0,pageSize:5}}},disableRowSelectionOnClick:!0,pageSizeOptions:[5,10]})),a.createElement(m.A,{variant:"outlined",severity:"info"},a.createElement("li",null,' Status can be "pending", "running", "stopping" and "stopped" which refers to the current stage of the servers'),a.createElement("li",null,' Availability can be "availabe" and "not availabe" which refers to the ability of users to boot the instance by themselves'),a.createElement("li",null," Highly demanded models are load-balanced across multiple servers"))))))),a.createElement(y.A,null))}}}]);