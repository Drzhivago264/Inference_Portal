"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[831],{32831:(e,t,a)=>{a.r(t),a.d(t,{default:()=>b});var n=a(96540),r=a(46266),l=a(40921),i=a(48719),c=a(16576),o=a(72048),d=a(30756),u=a(69067),s=a(8239),m=a(36632),p=a(97834),f=a(37312),h=a(30995),y=a(38960);function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,l,i,c=[],o=!0,d=!1;try{if(l=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;o=!1}else for(;!(o=(n=l.call(a)).done)&&(c.push(n.value),c.length!==t);o=!0);}catch(e){d=!0,r=e}finally{try{if(!o&&null!=a.return&&(i=a.return(),Object(i)!==i))return}finally{if(d)throw r}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return A(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?A(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}const b=function(){var e=v((0,n.useState)([]),2),t=e[0],a=e[1],A=v((0,n.useState)([]),2),b=A[0],E=A[1];(0,n.useEffect)((function(){r.A.all([r.A.get("/frontend-api/model")]).then(r.A.spread((function(e){a(e.data.servers),E(e.data.models_info)}))).catch((function(e){console.log(e)}))}),[]);for(var g=0,w=[];g<t.length;)w.push({id:t[g].id,server:"Server-".concat(t[g].id),model:t[g].model_name,status:t[g].status,availability:t[g].availability,input_price_usd:t[g].model_price_input,output_price_usd:t[g].model_price_output}),g++;return n.createElement(p.A,{maxWidth:!1,disableGutters:!0},n.createElement("title",null,"Models"),n.createElement(f.A,{max_width:"xl"}),n.createElement(p.A,{maxWidth:"xl"},n.createElement(u.A,{my:4,display:"flex",alignItems:"center",gap:4,p:2},n.createElement(s.Ay,{container:!0,spacing:2},n.createElement(s.Ay,{item:!0,md:6},b.map((function(e){return"Reddit Helper 2.7B"==e.name?n.createElement(l.A,{key:e.id,defaultExpanded:!0},n.createElement(i.A,{expandIcon:n.createElement(o.A,null),id:e.id},e.name),n.createElement(c.A,{style:{whiteSpace:"pre-wrap"}},e.desc)):n.createElement(l.A,{key:e.id},n.createElement(i.A,{expandIcon:n.createElement(o.A,null),id:e.id},e.name),n.createElement(c.A,{style:{whiteSpace:"pre-wrap"}},e.desc))}))),n.createElement(s.Ay,{item:!0,md:6},n.createElement(h.A,{spacing:1},n.createElement("div",{style:{height:400,width:"100%"}},n.createElement(d.z,{rows:w,columns:[{field:"server",headerName:"Server",width:80},{field:"model",headerName:"Model",width:150},{field:"status",headerName:"Status",width:80},{field:"availability",headerName:"Availability",width:140},{field:"input_price_usd",headerName:"Input (USD)",width:100},{field:"output_price_usd",headerName:"Output (USD)",width:100}],initialState:{pagination:{paginationModel:{page:0,pageSize:5}}},disableRowSelectionOnClick:!0,pageSizeOptions:[5,10]})),n.createElement(m.A,{variant:"outlined",severity:"info"},n.createElement("li",null,' Status can be "pending", "running", "stopping" and "stopped" which refers to the current stage of the servers'),n.createElement("li",null,' Availability can be "availabe" and "not availabe" which refers to the ability of users to boot the instance by themselves'),n.createElement("li",null," Highly demanded models are load-balanced across multiple servers"))))))),n.createElement(y.A,null))}}}]);