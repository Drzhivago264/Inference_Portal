"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[834],{34834:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});var l=n(74692),a=n.n(l),r=n(96540),o=n(97834),i=n(37312),s=n(38960),u=n(17108),c=n(31214),p=n(71710),f=n.n(p),m=n(69067),d=(n(75043),n(4316),n(60538));n(27292),n(80041),window.JSZip=f(),n(17474),n(99848),c.vfs=u.b.vfs;const v=function(){a().DataTable=n(55668);var e=(0,r.useRef)();return(0,r.useEffect)((function(){var t=window.location.pathname.split("/").filter((function(e){return""!==e}));a().fn.dataTable.ext.errMode=function(){return alert("You need to login before viewing log!")};var n=a()(e.current).DataTable({layout:{topStart:"pageLength",top2Start:{buttons:["copyHtml5","excelHtml5","csvHtml5","pdfHtml5","print"]}},columns:[{title:"No."},{title:"Prompts"},{title:"Response"},{title:"Models"},{title:"Created Time"},{title:"Type"},{title:"Input Cost"},{title:"Onput Cost"},{title:"Input Tokens"},{title:"Onput Tokens"}],processing:!0,serverSide:!0,ajax:"/log/"+t[t.length-1],responsive:!0,destroy:!0});return function(){n.destroy()}}),[]),r.createElement(o.A,{maxWidth:!1,disableGutters:!0},r.createElement("title",null,"Log"),r.createElement(i.A,{max_width:"xl"}),r.createElement(o.A,{maxWidth:"xl"},r.createElement(m.A,{mt:4,sx:{overflow:"auto"}},r.createElement(d.A,{pt:2,variant:"outlined",sx:{overflow:"auto"}},r.createElement(m.A,{p:5},r.createElement("table",{className:"display",width:"100%",ref:e}))))),r.createElement(s.A,null))}}}]);