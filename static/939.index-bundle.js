"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[939],{56939:(e,t,n)=>{n.r(t),n.d(t,{default:()=>N});var r=n(96540),a=n(46266),i=n(69067),l=n(8239),o=n(97834),c=n(42471),u=n(35453),s=n(38960),d=n(14073),m=n(49799),f=n(36632),p=n(11641),h=n(6561),y=n(31330),b=n(50779),g=n(67034),E=n(40529),A=n(30995),v=n(98984),_=n(37211),S=n(57873),x=n(82241),w=n(24521),j=n(74097),O=n(22453),P=n(13718),C=n(33066);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function I(){return I=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},I.apply(this,arguments)}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){var r,a,i,l;r=e,a=t,i=n[t],l=function(e,t){if("object"!=k(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(a),(a="symbol"==k(l)?l:l+"")in r?Object.defineProperty(r,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[a]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function D(e){return function(e){if(Array.isArray(e))return H(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||W(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function L(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,i,l,o=[],c=!0,u=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(o.push(r.value),o.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(u)throw a}}return o}}(e,t)||W(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}const N=function(){var e=L((0,r.useState)(!1),2),t=e[0],n=e[1],k=L((0,r.useState)(!1),2),R=k[0],W=k[1],H=L((0,r.useState)(!1),2),N=H[0],V=H[1],F=L((0,r.useState)(""),2),X=F[0],z=F[1],G=L((0,r.useState)(!1),2),J=G[0],M=G[1],U=L((0,r.useState)(!1),2),Y=U[0],$=U[1],q=L((0,r.useState)(""),2),B=q[0],K=q[1],Q=L((0,r.useState)([]),2),Z=Q[0],ee=Q[1],te=L((0,r.useState)(0),2),ne=te[0],re=te[1],ae=L((0,r.useState)(!1),2),ie=ae[0],le=ae[1],oe=L((0,r.useState)(!1),2),ce=oe[0],ue=oe[1],se=L((0,r.useState)(!0),2),de=se[0],me=se[1],fe=L((0,r.useState)(!1),2),pe=fe[0],he=fe[1],ye=L((0,r.useState)([{id:null,name:"",instruction:""}]),2),be=ye[0],ge=ye[1],Ee=L((0,r.useState)({id:null,name:"Empty Template",instruction:"",template_list_index:0}),2),Ae=Ee[0],ve=Ee[1],_e=function(e,t){var n=Ae;n[t]=e,ve(n);var r=D(Z),a=T({},Z[Ae.template_list_index]);a[t]=e,r[Ae.template_list_index]=a,ee(r)},Se=function(e){var t=(0,O.R)("csrftoken");a.A.delete("/frontend-api/delete-user-instruction",{data:{id:e},headers:{"content-type":"application/json","X-CSRFToken":t}}).then((function(e){M(!0)})).catch((function(e){$(!0),K(e.response.data.detail)}))},xe=function(e,t,n){var r=D(be),a=T({},be[e]);a[t]=n,r[e]=a,ge(r)},we=function(e,t){var n={template_list_index:t,id:Z[t].id,name:Z[t].name,instruction:Z[t].instruction};ve(n);var r=[];if(null===Z[t].children)ge([{id:null,name:"",instruction:""}]);else{for(var a in Z[t].children)r.push({id:Z[t].children[a].id,name:Z[t].children[a].displayed_name,instruction:Z[t].children[a].instruct});ge(r)}re(t)},je=function(e){if(Z.length<5){if("add"==e){me(!1);var t=[].concat(D(Z),[{id:null,name:"Empty Template",instruction:"",children:null}]);ee(t),ge([{id:null,name:"",instruction:""}]),ve({id:null,name:"Empty Template",instruction:"",template_list_index:Z.length-1}),re(Z.length)}else if("delete"==e){var n=D(Z),r=Z[ne];null!==r.id&&(Se(r.id),M(!0)),n.splice(ne,1),ee(n),n.length>0?(we(0,0),M(!0)):(we(0,0),ee([{id:null,name:"Empty Template",instruction:"",children:null}]),ge([{id:null,name:"",instruction:""}]),ve({id:null,name:"Empty template",instruction:"",template_list_index:null}))}}else if(ue(!0),"delete"==e){var a=D(Z),i=Z[ne];null!==i.id&&(Se(i.id),M(!0)),a.splice(ne,1),ee(a),ue(!1),we(0,0)}},Oe=function(e){if(be.length<3){if(le(!1),"add"==e){var t=[].concat(D(be),[{id:null,name:"",instruction:""}]);ge(t)}else if("delete"==e){var n=D(be),r=be[be.length-1];console.log(r.id),null!==r.id&&(Se(r.id),M(!0)),n.splice(-1),ge(n)}}else if(le(!0),"delete"==e){var a=D(be),i=be[be.length-1];null!==i.id&&(Se(i.id),M(!0)),a.splice(-1),ge(a),le(!1)}};return(0,r.useEffect)((function(){var e;e=pe?ne:0,a.A.all([a.A.get("/frontend-api/get-user-instruction")]).then(a.A.spread((function(t){if(204!=t.status){var n=[];if(t.data.root_nodes.length>=5&&ue(!0),0==t.data.root_nodes.length)ee([{template_list_index:0,id:null,name:"Empty template",instruction:"",children:[{id:null,name:"",instruction:""}]}]);else{for(var r in t.data.root_nodes){if(r==e){ve({template_list_index:r,id:t.data.root_nodes[r].id,name:t.data.root_nodes[r].displayed_name,instruction:t.data.root_nodes[r].instruct});var a=[];for(var i in t.data.root_nodes[r].children)a.push({id:t.data.root_nodes[r].children[i].id,name:t.data.root_nodes[r].children[i].displayed_name,instruction:t.data.root_nodes[r].children[i].instruct});ge(a)}n.push({id:t.data.root_nodes[r].id,name:t.data.root_nodes[r].displayed_name,instruction:t.data.root_nodes[r].instruct,children:t.data.root_nodes[r].children})}ee(n)}}}))).catch((function(e){console.log(e)}))}),[pe]),r.createElement(o.A,{maxWidth:!1,sx:{minWidth:1200},disableGutters:!0},r.createElement("title",null,"Templates"),r.createElement(u.A,null),r.createElement(o.A,{maxWidth:"lg"},r.createElement(i.A,{m:2},r.createElement(l.Ay,{container:!0,spacing:2},r.createElement(l.Ay,{item:!0,xs:4},r.createElement(d.A,{mt:1,mb:1,variant:"body1"},"Instruction Template"),r.createElement(m.A,null,Z.map((function(e,t){return r.createElement(_.A,{sx:{height:38},key:t,selected:ne===t,onClick:function(e){return we(0,t)}},r.createElement(S.A,null,ne===t&&r.createElement(j.A,null),ne!==t&&r.createElement(w.A,null)),r.createElement(x.A,{primaryTypographyProps:{fontWeight:"medium",variant:"body2"},primary:e.name}))})),r.createElement(i.A,{display:"flex",justifyContent:"center",alignItems:"center"},ce&&r.createElement(f.A,{severity:"warning"},"Reaching the maximum number of parent (5)."),!ce&&de&&r.createElement(p.A,{"aria-label":"add",onClick:function(){je("add")}},r.createElement(y.A,null)),r.createElement(p.A,{"aria-label":"delete",onClick:function(){je("delete")}},r.createElement(g.A,null))))),r.createElement(l.Ay,{item:!0,xs:8},r.createElement(b.A,{fullWidth:!0,sx:{m:1},variant:"standard"},Z.map((function(e,t){if(ne==t)return r.createElement(i.A,{key:t,display:"flex"},r.createElement(b.A,{fullWidth:!0,variant:"standard"},r.createElement(A.A,{direction:"column",spacing:1,mb:1,style:{width:"100%"}},r.createElement(c.A,{label:"Template Name",multiline:!0,maxRows:1,InputLabelProps:{shrink:!0},defaultValue:e.name,onChange:function(e){_e(e.target.value,"name")},inputProps:{maxLength:35}}),r.createElement(c.A,{label:"Parent Instruction",multiline:!0,minRows:4,maxRows:8,InputLabelProps:{shrink:!0},onChange:function(e){_e(e.target.value,"instruction")},defaultValue:e.instruction,inputProps:{maxLength:2500}}))))})),r.createElement(h.JY,{onDragEnd:function(e){var t=Array.from(be),n=L(t.splice(e.source.index,1),1)[0];t.splice(e.destination.index,0,n),console.log(t),ge(t)}},r.createElement(h.gL,{droppableId:"childrens"},(function(e){return r.createElement(i.A,I({className:"childrens"},e.droppableProps,{ref:e.innerRef}),be&&be.map((function(e,t){return r.createElement(h.sx,{key:e.id,draggableId:"".concat(e.id),index:t},(function(n){return r.createElement(i.A,I({mt:1,mb:1,display:"flex",ref:n.innerRef},n.draggableProps,n.dragHandleProps),r.createElement(A.A,{direction:"row",spacing:2,style:{width:"100%"}},r.createElement(i.A,null,r.createElement(p.A,{"aria-label":"delete"},r.createElement(E.A,null))),r.createElement(b.A,{fullWidth:!0,sx:{m:1},variant:"standard"},r.createElement(c.A,{label:"Children No.".concat(t," Name"),inputProps:{maxLength:35},maxRows:1,defaultValue:e.name,InputLabelProps:{shrink:!0},onChange:function(e){return xe(t,"name",e.target.value)}}),r.createElement(i.A,{mt:1,mb:1},r.createElement(c.A,{label:"Child No.".concat(t," Instruction"),multiline:!0,minRows:4,inputProps:{maxLength:2500},InputLabelProps:{shrink:!0},fullWidth:!0,maxRows:8,defaultValue:e.instruction,onChange:function(e){return xe(t,"instruction",e.target.value)}})))))}))})),e.placeholder)}))),r.createElement(i.A,{display:"flex",justifyContent:"center",alignItems:"center"},r.createElement(i.A,{mr:1},r.createElement(P.A,{size:"small",loading:t,loadingPosition:"end",variant:"contained",onClick:function(){n(!0);var e={headers:{"content-type":"application/json","X-CSRFToken":(0,O.R)("csrftoken")}},t={parent_instruction:Ae,childrens:be};a.A.post("/frontend-api/post-user-instruction",t,e).then((function(e){he(!0),W(!0),n(!1),me(!0)})).catch((function(e){n(!1),V(!0),z(e.response.data.detail)}))},endIcon:r.createElement(v.A,null)},"Save")),ie&&r.createElement(f.A,{severity:"warning"},"Reaching the maximum number of child (3)."),!ie&&r.createElement(p.A,{"aria-label":"add",onClick:function(){Oe("add")}},r.createElement(y.A,null)),r.createElement(p.A,{"aria-label":"delete",onClick:function(){Oe("delete")}},r.createElement(g.A,null)),r.createElement(C.A,{open:R,autoHideDuration:3e3,onClose:function(){W(!1)},message:"Saved !"}),r.createElement(C.A,{open:N,autoHideDuration:6e3,onClose:function(){V(!1)},message:X}),r.createElement(C.A,{open:J,autoHideDuration:3e3,onClose:function(){M(!1)},message:"Deleted !"}),r.createElement(C.A,{open:Y,autoHideDuration:6e3,onClose:function(){$(!1)},message:B}))))))),r.createElement(s.A,null))}}}]);