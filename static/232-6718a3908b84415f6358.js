(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[232],{15851:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>w});var n=s(46266),a=s(96540),r=s(97834),o=s(37312),l=s(38960),c=s(17108),i=s(31214),u=s(71710),j=s.n(u),m=s(69067),d=(s(75043),s(4316),s(60538)),f=(s(27292),s(80041),s(74353)),p=s.n(f),b=s(75737),h=s(601),k=s(61087),y=s(8239),v=s(95093),_=s.n(v),g=s(92262),E=s(44731),A=s(25373);function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var s=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=s){var n,a,r,o,l=[],c=!0,i=!1;try{if(r=(s=s.call(e)).next,0===t){if(Object(s)!==s)return;c=!1}else for(;!(c=(n=r.call(s)).done)&&(l.push(n.value),l.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{if(!c&&null!=s.return&&(o=s.return(),Object(o)!==o))return}finally{if(i)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return x(e,t);var s=Object.prototype.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?x(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,n=new Array(t);s<t;s++)n[s]=e[s];return n}window.JSZip=j(),s(17474),s(99848),Intl.DateTimeFormat().resolvedOptions().timeZone,i.vfs=c.b.vfs,g.t1.register(g.PP,g.kc,g.E8,g.hE,g.m_,g.s$);const w=function(){var e="YYYY-MM-DD HH:mm",t=z((0,a.useState)(null),2),s=t[0],c=t[1],i=z((0,a.useState)(null),2),u=i[0],j=i[1],f=z((0,a.useState)(_()().format(e)),2),v=f[0],g=f[1],x=z((0,a.useState)(_()().subtract(7,"days").format(e)),2),w=x[0],C=x[1],S=z((0,a.useState)(_()().format(e)),2),D=S[0],T=(S[1],z((0,a.useState)(_()().subtract(7,"days").format(e)),2)),P=T[0];function O(){for(var e="0123456789ABCDEF".split(""),t="#",s=0;s<6;s++)t+=e[Math.floor(16*Math.random())];return t}return T[1],(0,a.useEffect)((function(){n.A.all([n.A.get("/frontend-api/cost/".concat(w,"/").concat(v))]).then(n.A.spread((function(e){var t=[],s=[],n=[];for(var a in e.data.cost_by_model)t.includes(e.data.cost_by_model[a].created_at__date)||t.push(e.data.cost_by_model[a].created_at__date),s.includes(e.data.cost_by_model[a].model__name)||s.push(e.data.cost_by_model[a].model__name);var r,o=function(a){var o=[],l=[],c=function(n){(r=e.data.cost_by_model.filter((function(e){return e.model__name==s[a]&&e.created_at__date==t[n]}))).length>0&&(o.push(r[0].sum_input_tokens),l.push(r[0].sum_output_tokens))};for(var i in t)c(i);n.push({label:"Input Tokens ".concat(s[a]),data:o,backgroundColor:O(),stack:"Stack 0"},{label:"Output Tokens ".concat(s[a]),data:l,backgroundColor:O(),stack:"Stack 1"})};for(var l in s)o(l);c({labels:t,datasets:n})}))).catch((function(e){console.log(e)}))}),[w,v]),(0,a.useEffect)((function(){n.A.all([n.A.get("/frontend-api/cost/".concat(P,"/").concat(D))]).then(n.A.spread((function(e){var t=["Total"],s=[],n=[];for(var a in e.data.cost_by_model)s.includes(e.data.cost_by_model[a].model__name)||s.push(e.data.cost_by_model[a].model__name);var r,o=function(a){var o=0,l=0;for(var c in t)(r=e.data.cost_by_model.filter((function(e){return e.model__name==s[a]}))).length>0&&(o+=r[0].sum_input_tokens,l+=r[0].sum_output_tokens);n.push({label:"Input Tokens ".concat(s[a]),data:[o],backgroundColor:O()},{label:"Output Tokens ".concat(s[a]),data:[l],backgroundColor:O()})};for(var l in s)o(l);console.log(n),j({labels:t,datasets:n})}))).catch((function(e){console.log(e)}))}),[P,D]),a.createElement(r.A,{maxWidth:!1,disableGutters:!0},a.createElement("title",null,"Cost Monitoring"),a.createElement(o.A,{max_width:"xl"}),a.createElement(r.A,{maxWidth:"xl"},a.createElement(m.A,{mt:4,sx:{overflow:"auto"}},a.createElement(y.Ay,{container:!0,spacing:1},a.createElement(y.Ay,{item:!0,sm:12,md:8},a.createElement(d.A,{pt:2,variant:"outlined",sx:{overflow:"auto"}},a.createElement(m.A,{p:1},a.createElement(m.A,{display:"flex",justifyContent:"flex-end"},w&&v&&a.createElement(b.$,{dateAdapter:h.R},a.createElement(k.j,{components:["DatePicker","DatePicker"]},a.createElement(A.T,{label:"Start Date",value:p()(w),onChange:function(t){return C(t.format(e))},slotProps:{textField:{size:"small"}}}),a.createElement(A.T,{label:"End Date",value:p()(v),onChange:function(t){return g(t.format(e))},slotProps:{textField:{size:"small"}}})))),a.createElement(m.A,{height:600},s&&a.createElement(E.yP,{options:{maintainAspectRatio:!1,responsive:!0,scales:{x:{stacked:!0},y:{stacked:!0}},plugins:{legend:{position:"bottom"},title:{display:!0,text:"Token Consumption By Day"},tooltip:{callbacks:{footer:function(e){return"Cost: ".concat(e[0].raw," (tokens) × 0 (USD) = 0 (USD)")}}}}},data:s}))))),a.createElement(y.Ay,{item:!0,sm:12,md:4},a.createElement(d.A,{pt:2,variant:"outlined",sx:{overflow:"auto"}},a.createElement(m.A,{p:1},a.createElement(m.A,{display:"flex",justifyContent:"flex-end"},P&&D&&a.createElement(b.$,{dateAdapter:h.R},a.createElement(k.j,{components:["DatePicker","DatePicker"]},a.createElement(A.T,{label:"Start Date",value:p()(P),onChange:function(t){return C(t.format(e))},slotProps:{textField:{size:"small"}}}),a.createElement(A.T,{label:"End Date",value:p()(D),onChange:function(t){return g(t.format(e))},slotProps:{textField:{size:"small"}}})))),a.createElement(m.A,{height:600},u&&a.createElement(E.yP,{options:{maintainAspectRatio:!1,responsive:!0,scales:{x:{stacked:!0},y:{stacked:!0}},plugins:{legend:{position:"bottom"},title:{display:!0,text:"Token Consumption Total"},tooltip:{callbacks:{footer:function(e){return"Cost: ".concat(e[0].raw," (tokens) × 0 (USD) = 0 (USD)")}}}}},data:u})))))))),a.createElement(l.A,null))}},35358:(e,t,s)=>{var n={"./af":25177,"./af.js":25177,"./ar":61509,"./ar-dz":41488,"./ar-dz.js":41488,"./ar-kw":58676,"./ar-kw.js":58676,"./ar-ly":42353,"./ar-ly.js":42353,"./ar-ma":24496,"./ar-ma.js":24496,"./ar-ps":6947,"./ar-ps.js":6947,"./ar-sa":82682,"./ar-sa.js":82682,"./ar-tn":89756,"./ar-tn.js":89756,"./ar.js":61509,"./az":95533,"./az.js":95533,"./be":28959,"./be.js":28959,"./bg":47777,"./bg.js":47777,"./bm":54903,"./bm.js":54903,"./bn":61290,"./bn-bd":17357,"./bn-bd.js":17357,"./bn.js":61290,"./bo":31545,"./bo.js":31545,"./br":89089,"./br.js":89089,"./bs":44429,"./bs.js":44429,"./ca":7306,"./ca.js":7306,"./cs":56464,"./cs.js":56464,"./cv":73635,"./cv.js":73635,"./cy":64226,"./cy.js":64226,"./da":93601,"./da.js":93601,"./de":77853,"./de-at":26111,"./de-at.js":26111,"./de-ch":54697,"./de-ch.js":54697,"./de.js":77853,"./dv":60708,"./dv.js":60708,"./el":54691,"./el.js":54691,"./en-au":53872,"./en-au.js":53872,"./en-ca":28298,"./en-ca.js":28298,"./en-gb":56195,"./en-gb.js":56195,"./en-ie":66584,"./en-ie.js":66584,"./en-il":65543,"./en-il.js":65543,"./en-in":9033,"./en-in.js":9033,"./en-nz":79402,"./en-nz.js":79402,"./en-sg":43004,"./en-sg.js":43004,"./eo":32934,"./eo.js":32934,"./es":97650,"./es-do":20838,"./es-do.js":20838,"./es-mx":17730,"./es-mx.js":17730,"./es-us":56575,"./es-us.js":56575,"./es.js":97650,"./et":3035,"./et.js":3035,"./eu":3508,"./eu.js":3508,"./fa":119,"./fa.js":119,"./fi":90527,"./fi.js":90527,"./fil":95995,"./fil.js":95995,"./fo":52477,"./fo.js":52477,"./fr":85498,"./fr-ca":26435,"./fr-ca.js":26435,"./fr-ch":37892,"./fr-ch.js":37892,"./fr.js":85498,"./fy":37071,"./fy.js":37071,"./ga":41734,"./ga.js":41734,"./gd":70217,"./gd.js":70217,"./gl":77329,"./gl.js":77329,"./gom-deva":32124,"./gom-deva.js":32124,"./gom-latn":93383,"./gom-latn.js":93383,"./gu":95050,"./gu.js":95050,"./he":11713,"./he.js":11713,"./hi":43861,"./hi.js":43861,"./hr":26308,"./hr.js":26308,"./hu":90609,"./hu.js":90609,"./hy-am":17160,"./hy-am.js":17160,"./id":74063,"./id.js":74063,"./is":89374,"./is.js":89374,"./it":88383,"./it-ch":21827,"./it-ch.js":21827,"./it.js":88383,"./ja":23827,"./ja.js":23827,"./jv":89722,"./jv.js":89722,"./ka":41794,"./ka.js":41794,"./kk":27088,"./kk.js":27088,"./km":96870,"./km.js":96870,"./kn":84451,"./kn.js":84451,"./ko":63164,"./ko.js":63164,"./ku":98174,"./ku-kmr":6181,"./ku-kmr.js":6181,"./ku.js":98174,"./ky":78474,"./ky.js":78474,"./lb":79680,"./lb.js":79680,"./lo":15867,"./lo.js":15867,"./lt":45766,"./lt.js":45766,"./lv":69532,"./lv.js":69532,"./me":58076,"./me.js":58076,"./mi":19467,"./mi.js":19467,"./mk":30306,"./mk.js":30306,"./ml":73739,"./ml.js":73739,"./mn":99053,"./mn.js":99053,"./mr":86169,"./mr.js":86169,"./ms":73386,"./ms-my":92297,"./ms-my.js":92297,"./ms.js":73386,"./mt":77075,"./mt.js":77075,"./my":72264,"./my.js":72264,"./nb":22274,"./nb.js":22274,"./ne":8235,"./ne.js":8235,"./nl":92572,"./nl-be":43784,"./nl-be.js":43784,"./nl.js":92572,"./nn":54566,"./nn.js":54566,"./oc-lnc":69330,"./oc-lnc.js":69330,"./pa-in":29849,"./pa-in.js":29849,"./pl":94418,"./pl.js":94418,"./pt":79834,"./pt-br":48303,"./pt-br.js":48303,"./pt.js":79834,"./ro":24457,"./ro.js":24457,"./ru":82271,"./ru.js":82271,"./sd":1221,"./sd.js":1221,"./se":33478,"./se.js":33478,"./si":17538,"./si.js":17538,"./sk":5784,"./sk.js":5784,"./sl":46637,"./sl.js":46637,"./sq":86794,"./sq.js":86794,"./sr":45719,"./sr-cyrl":3322,"./sr-cyrl.js":3322,"./sr.js":45719,"./ss":56e3,"./ss.js":56e3,"./sv":41011,"./sv.js":41011,"./sw":40748,"./sw.js":40748,"./ta":11025,"./ta.js":11025,"./te":11885,"./te.js":11885,"./tet":28861,"./tet.js":28861,"./tg":86571,"./tg.js":86571,"./th":55802,"./th.js":55802,"./tk":59527,"./tk.js":59527,"./tl-ph":29231,"./tl-ph.js":29231,"./tlh":31052,"./tlh.js":31052,"./tr":85096,"./tr.js":85096,"./tzl":79846,"./tzl.js":79846,"./tzm":81765,"./tzm-latn":97711,"./tzm-latn.js":97711,"./tzm.js":81765,"./ug-cn":48414,"./ug-cn.js":48414,"./uk":16618,"./uk.js":16618,"./ur":57777,"./ur.js":57777,"./uz":57609,"./uz-latn":72475,"./uz-latn.js":72475,"./uz.js":57609,"./vi":21135,"./vi.js":21135,"./x-pseudo":64051,"./x-pseudo.js":64051,"./yo":82218,"./yo.js":82218,"./zh-cn":52648,"./zh-cn.js":52648,"./zh-hk":1632,"./zh-hk.js":1632,"./zh-mo":31541,"./zh-mo.js":31541,"./zh-tw":50304,"./zh-tw.js":50304};function a(e){var t=r(e);return s(t)}function r(e){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}a.keys=function(){return Object.keys(n)},a.resolve=r,e.exports=a,a.id=35358}}]);