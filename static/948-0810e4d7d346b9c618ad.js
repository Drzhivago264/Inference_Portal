"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[948],{40948:(e,t,n)=>{n.r(t),n.d(t,{default:()=>te});var a=n(96540),r=n(72048),l=n(46266),c=n(53705),o=n(69067),i=n(97834),m=n(30995),u=n(29571),s=n(1043),d=n(37312),f=n(36632),p=n(53246),y=n(15001),A=n(25239),E=n(63901),_=n(13718),g=n(48139),h=n(4147),v=n(8676),b=n(50779),k=n(73896),x=n(2621),S=n(10988),w=n(60538),C=n(14073),P=n(90022),I=n(71543),j=n(32389),R=n(45423),O=n(244),K=n(40921),D=n(48719),W=n(16576),z=n(4213),F=n(83186),M=n(75765),X=n(38960),T=n(76544),V=n(51564),B=n(65793),N=n(54937),H=n(21005),q=n(5673),G=n(76768),L=n(11641),U=n(63418),Y=n(22453);function $(e){return $="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},$(e)}function J(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,c,o=[],i=!0,m=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(a=l.call(n)).done)&&(o.push(a.value),o.length!==t);i=!0);}catch(e){m=!0,r=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(m)throw r}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function Z(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var ee=(0,v.A)(w.A)((function(e){var t=e.theme;return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(n),!0).forEach((function(t){var a,r,l,c;a=e,r=t,l=n[t],c=function(e,t){if("object"!=$(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=$(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==$(c)?c:c+"")in a?Object.defineProperty(a,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[r]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Z(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({padding:t.spacing(4)},t.typography.body2)}));const te=function(){var e=(0,j.Bd)(),t=e.t,n=(e.i18n,(0,T.A)());n=(0,V.A)(n);var w=J((0,a.useState)([]),2),$=w[0],Q=w[1],Z=J(a.useState(!1),2),te=Z[0],ne=Z[1],ae=(0,a.useContext)(U.Rs),re=ae.is_authenticated,le=ae.setIsAuthenticated;(0,a.useEffect)((function(){l.A.all([l.A.get("/frontend-api/products")]).then(l.A.spread((function(e){Q(e.data.products)}))).catch((function(e){console.log(e)}))}),[]);var ce="#3399FF",oe="#1C2025",ie=(0,v.A)(c.h)((function(e){var t=e.theme;return"\n        box-sizing: border-box;\n        font-family: 'IBM Plex Sans', sans-serif;\n        font-size: 0.875rem;\n        font-weight: 400;\n        width:100%;\n        line-height: 1.5;\n        padding: 8px 12px;\n        border-radius: 8px;\n        color: ".concat("dark"===t.palette.mode?"#C7D0DD":oe,";\n        background: ").concat("dark"===t.palette.mode?oe:"#fff",";\n        border: 1px solid ").concat("dark"===t.palette.mode?"#434D5B":"#DAE2ED",";\n        box-shadow: 0px 2px 2px ").concat("dark"===t.palette.mode?oe:"#F3F6F9",";\n        &:hover {\n          border-color: ").concat(ce,";\n        }\n        &:focus {\n          border-color: ").concat(ce,";\n          box-shadow: 0 0 0 3px ").concat("dark"===t.palette.mode?"#0072E5":"#b6daff",";\n        }\n        &:focus-visible {\n          outline: 0;\n        }\n      ")})),me=J((0,a.useState)(!1),2),ue=me[0],se=me[1],de=J((0,a.useState)(!1),2),fe=de[0],pe=de[1],ye=J((0,a.useState)(!1),2),Ae=ye[0],Ee=ye[1],_e=J((0,a.useState)(!1),2),ge=_e[0],he=_e[1],ve=J((0,a.useState)(!1),2),be=ve[0],ke=ve[1],xe=J((0,a.useState)(""),2),Se=xe[0],we=xe[1],Ce=J((0,a.useState)(!1),2),Pe=Ce[0],Ie=Ce[1],je=J((0,a.useState)(""),2),Re=je[0],Oe=je[1],Ke=J((0,a.useState)(!1),2),De=Ke[0],We=Ke[1],ze=J((0,a.useState)(""),2),Fe=ze[0],Me=ze[1],Xe=J((0,a.useState)(!1),2),Te=Xe[0],Ve=Xe[1],Be=J((0,a.useState)(1),2),Ne=Be[0],He=Be[1],qe=J((0,a.useState)(null),2),Ge=qe[0],Le=qe[1],Ue=J((0,a.useState)(null),2),Ye=Ue[0],$e=Ue[1],Je=J((0,a.useState)(null),2),Qe=Je[0],Ze=Je[1],et=J((0,a.useState)(null),2),tt=et[0],nt=et[1],at=J((0,a.useState)(null),2),rt=at[0],lt=at[1],ct=J((0,a.useState)(null),2),ot=ct[0],it=ct[1],mt=J((0,a.useState)(null),2),ut=mt[0],st=mt[1],dt=J((0,a.useState)(null),2),ft=dt[0],pt=dt[1],yt=J((0,a.useState)(null),2),At=yt[0],Et=yt[1],_t=function(e){if(e.preventDefault(),se(!0),Le(null),Ve(!1),ke(!1),""==Fe&&(se(!1),Ve(!0)),Fe){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,Y.R)("csrftoken")}},n={key_name:Fe};l.A.post("/frontend-api/generate-key",n,t).then((function(e){Le(e.data)})).catch((function(e){$e(e.response.data.detail)}))}},gt=function(e){var n=e.key_,r=e.key_name,l=e.integrated_wallet,c=e.payment_id;return a.createElement(o.A,{my:4},!be&&a.createElement(o.A,{style:{display:"flex",alignItems:"center",justifyContent:"center"},textAlign:"center",my:1},a.createElement(f.A,{severity:"info"}," Key: ",a.createElement(F.X,{isPlaying:!0,duration:4,revealDuration:1.6,characters:n,onComplete:function(){return ke(!0),se(!1),le(!0)}}))),be&&a.createElement(f.A,{severity:"success",sx:{whiteSpace:"pre-line"}},a.createElement(N.A,null,"Success"),t("key_management.key_create_success")),be&&a.createElement(o.A,{textAlign:"center",my:4},a.createElement(ie,{defaultValue:"Key: ".concat(n,"\nKey Name: ").concat(r,"\nWallet: ").concat(l," \nPayment id: ").concat(c),minRows:4,maxRows:10}),a.createElement(o.A,{textAlign:"center",my:1},a.createElement(g.A,{size:"small",variant:"outlined",onClick:function(){return e="Key: ".concat(n,"\nKey Name: ").concat(r,"\nWallet: ").concat(l," \nPayment id: ").concat(c),t=new Blob([e],{type:"text/plain;charset=utf-8"}),void(0,z.saveAs)(t,"Key_of_ProffesorParakeet_KEEP_IT_SECURE.txt");var e,t}},"Export Key"))))},ht=function(e){var n=e.key_,r=e.key_name,l=e.monero_balance,c=e.fiat_balance;return a.createElement(o.A,{my:4},a.createElement(f.A,{severity:"success"},a.createElement(N.A,null,"Success"),t("key_management.key_check_success")),a.createElement(o.A,{textAlign:"center",mt:4},a.createElement(ie,{defaultValue:"Key: ".concat(n,"\nKey Name: ").concat(r,"\nMonero Balance: ").concat(l," \nFiat Balance: ").concat(c),minRows:4,maxRows:10})))},vt=function(e){var n=e.key_,r=e.key_name,l=e.integrated_wallet,c=e.payment_id;return a.createElement(o.A,{my:4},a.createElement(f.A,{severity:"success"},a.createElement(N.A,null,"Success"),t("key_management.xmr_check_success")),a.createElement(o.A,{textAlign:"center",mt:4},a.createElement(ie,{defaultValue:"Key: ".concat(n,"\nKey Name: ").concat(r,"\nIntergrated Wallet: ").concat(l," \nPayment id: ").concat(c),minRows:4,maxRows:10})))},bt=function(e){var n=e.detail;return a.createElement(o.A,{my:4},a.createElement(f.A,{severity:"success"},a.createElement(N.A,null,"Success"),t("key_management.xmr_confirmation_success")),a.createElement(o.A,{textAlign:"center",mt:4},a.createElement(ie,{defaultValue:"".concat(n),minRows:2,maxRows:10})))},kt=function(e){var t=e.error;return a.createElement(o.A,{mt:2},a.createElement(o.A,{textAlign:"center"},a.createElement(f.A,{variant:"filled",severity:"error"},t)))};return a.createElement(i.A,{maxWidth:!1,disableGutters:!0},a.createElement("title",null,"Key Management"),a.createElement(d.A,null),a.createElement(i.A,{maxWidth:"md"},a.createElement(o.A,{my:1,alignItems:"center",gap:4,p:2},a.createElement(ee,{variant:"outlined"},a.createElement(B.A,{theme:n},a.createElement(C.A,{variant:"h4"},a.createElement(o.A,{sx:{mb:2,fontWeight:"bold"}}," ",t("key_management.Get_started_with_Professor_Parakeet")))),a.createElement(C.A,{variant:"h5"},a.createElement(o.A,{sx:{lineHeight:2,fontWeight:"700"}}," ",t("key_management.1_Create_a_Key")," ")),a.createElement(C.A,{variant:"body1"},t("key_management.Start_by_generating_a_random_key_by_giving_it_a_name")),a.createElement(o.A,{my:4,justifyContent:"center",alignItems:"center",display:"flex"},!re&&a.createElement("form",{autoComplete:"off",onSubmit:_t},a.createElement(b.A,{defaultValue:"",required:!0},a.createElement(m.A,{direction:{xs:"column",sm:"row"},spacing:1},a.createElement(s.A,{margin:"normal",label:"Key Name",type:"text",size:"small",onChange:function(e){return Me(e.target.value)},value:Fe,error:Te,autoComplete:"off",InputProps:{startAdornment:a.createElement(A.A,{position:"start"},a.createElement(E.A,null))}}),a.createElement(_.A,{size:"small",loading:ue,loadingPosition:"end",variant:"contained",type:"submit",endIcon:a.createElement(P.A,null)},"Generate")))),re&&a.createElement("form",{autoComplete:"off",onSubmit:_t},a.createElement(b.A,{defaultValue:"",required:!0},a.createElement(m.A,{direction:{xs:"column",sm:"row"},spacing:1},a.createElement(s.A,{disabled:!0,margin:"normal",label:"Key Name",type:"text",size:"small",defaultValue:"You are logged in",autoComplete:"off",InputProps:{startAdornment:a.createElement(A.A,{position:"start"},a.createElement(E.A,null))}}),a.createElement(g.A,{variant:"outlined",onClick:function(){(0,H.r)(le)},color:"error",endIcon:a.createElement(R.A,null)},"Logout"))))),Ge&&a.createElement(gt,{key_:Ge.key,key_name:Ge.key_name,payment_id:Ge.payment_id,integrated_wallet:Ge.integrated_wallet}),Ye&&a.createElement(kt,{error:Ye}),a.createElement(I.A,null),a.createElement(C.A,{variant:"h5"},a.createElement(o.A,{sx:{lineHeight:2,fontWeight:"700",mt:1}}," ",t("key_management.2_Add_credit_to_your_key"))),a.createElement(m.A,{spacing:1},a.createElement(f.A,{variant:"outlined",severity:"info",sx:{whiteSpace:"pre-line"}},a.createElement(N.A,null,"Info"),t("key_management.Info_1")),a.createElement(f.A,{variant:"outlined",severity:"warning",sx:{whiteSpace:"pre-line"}},a.createElement(N.A,null,"Warning"),t("key_management.Warning_1"))),a.createElement(o.A,{my:4},a.createElement("form",{autoComplete:"off"},a.createElement(m.A,{direction:{xs:"column",sm:"row"},spacing:1,mb:2,justifyContent:"center",alignItems:"center",display:"flex"},a.createElement(s.A,{margin:"normal",label:"Key Name",type:"text",size:"small",onChange:function(e){return Oe(e.target.value)},value:Re,error:De,autoComplete:"off",InputProps:{startAdornment:a.createElement(A.A,{position:"start"},a.createElement(E.A,null))}}),a.createElement(s.A,{margin:"normal",label:"Key",type:te?"text":"password",size:"small",onChange:function(e){return we(e.target.value)},value:Se,error:Pe,autoComplete:"off",InputProps:{startAdornment:a.createElement(A.A,{position:"start"},a.createElement(p.A,null)),endAdornment:a.createElement(A.A,{position:"end"},a.createElement(L.A,{"aria-label":"toggle password visibility",onClick:function(){return ne((function(e){return!e}))},onMouseDown:function(e){e.preventDefault()},edge:"end"},te?a.createElement(G.A,null):a.createElement(q.A,null)))}}),a.createElement(b.A,{defaultValue:"",required:!0,size:"small"},a.createElement(u.A,{id:"demo-simple-select-label"},"Amount"),a.createElement(h.A,{labelId:"demo-simple-select-label",id:"demo-simple-select",onChange:function(e){return He(e.target.value)},value:Ne,label:"Amount"},$.map((function(e){return a.createElement(k.A,{key:e.id,value:e.id},e.name)}))))),a.createElement(K.A,{defaultExpanded:!0},a.createElement(D.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel1-content",id:"panel1-header"},a.createElement(C.A,{variant:"h6"},t("key_management.21_Check_credit_balance"))),a.createElement(W.A,null,a.createElement(C.A,null,t("key_management.21_info")),a.createElement(o.A,{mt:2},a.createElement(_.A,{loading:fe,variant:"contained",name:"checkcredit",onClick:function(e){if(e.preventDefault(),Ze(null),nt(null),pe(!0),We(!1),""==Re&&We(!0),""==Se&&Ie(!0),Re&&Se){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,Y.R)("csrftoken")}},n={key_name:Re,key:Se};l.A.post("/frontend-api/check-credit",n,t).then((function(e){nt(e.data),pe(!1)})).catch((function(e){Ze(e.response.data.detail),pe(!1)}))}}.bind(this),type:"submit",endIcon:a.createElement(S.A,null)},"Check Credit")),tt&&a.createElement(ht,{key_:tt.key,key_name:tt.key_name,monero_balance:tt.monero_balance,fiat_balance:tt.fiat_balance}),Qe&&a.createElement(kt,{error:Qe}))),a.createElement(K.A,null,a.createElement(D.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel2-content",id:"panel2-header"},a.createElement(C.A,{variant:"h6"},t("key_management.22_Pay_by_Stripe"))),a.createElement(W.A,null,a.createElement(C.A,null,t("key_management.22_info")),a.createElement(o.A,{mt:2},a.createElement(g.A,{variant:"contained",onClick:function(e){if(e.preventDefault(),We(!1),""==Re&&We(!0),""==Se&&Ie(!0),Re&&Se&&Ne){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,Y.R)("csrftoken")}},n={key_name:Re,key:Se,product_id:Ne};l.A.post("/frontend-api/stripe-redirect",n,t).then((function(e){window.location.replace(e.data.stripe_checkout_url)})).catch((function(e){console.log(e.response.data.detail),Et(e.response.data.detai)}))}}.bind(this),name:"topup",type:"submit",endIcon:a.createElement(O.A,null)},"Stripe")),At&&a.createElement(kt,{error:At}))),a.createElement(K.A,null,a.createElement(D.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel3-content",id:"panel3-header"},a.createElement(C.A,{variant:"h6"},t("key_management.23_Retrieve_XMR_wallet"))),a.createElement(W.A,null,a.createElement(C.A,null,t("key_management.23_info")),a.createElement(o.A,{mt:2},a.createElement(_.A,{loading:Ae,variant:"contained",type:"submit",onClick:function(e){if(e.preventDefault(),lt(null),it(null),Ee(!0),We(!1),""==Re&&We(!0),""==Se&&Ie(!0),Re&&Se){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,Y.R)("csrftoken")}},n={key_name:Re,key:Se};l.A.post("/frontend-api/get-xmr-wallet",n,t).then((function(e){it(e.data),Ee(!1)})).catch((function(e){lt(e.response.data.detail),Ee(!1)}))}}.bind(this),endIcon:a.createElement(x.A,null)},"Check XMR Wallet")),ot&&a.createElement(vt,{key_:ot.key,key_name:ot.key_name,payment_id:ot.payment_id,integrated_wallet:ot.integrated_wallet}),rt&&a.createElement(kt,{error:rt}))),a.createElement(K.A,null,a.createElement(D.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel4-content",id:"panel4-header"},a.createElement(C.A,{variant:"h6"},t("key_management.24_Confirm_XMR_Payment"))),a.createElement(W.A,null,a.createElement(C.A,null,t("key_management.24_info")),a.createElement(o.A,{mt:2},a.createElement(_.A,{loading:ge,variant:"contained",type:"submit",onClick:function(e){if(e.preventDefault(),st(null),pt(null),he(!0),We(!1),""==Re&&We(!0),""==Se&&Ie(!0),Re&&Se){var t={headers:{"content-type":"application/json","X-CSRFToken":(0,Y.R)("csrftoken")}},n={key_name:Re,key:Se};l.A.post("/frontend-api/confirm-xmr-payment",n,t).then((function(e){pt(e.data),he(!1)})).catch((function(e){st(e.response.data.detail),he(!1)}))}}.bind(this),endIcon:a.createElement(M.A,null,a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"226.777",height:"226.777",viewBox:"0 0 226.777 226.777"},a.createElement("path",{d:"M39.722 149.021v-95.15l73.741 73.741 73.669-73.669v95.079h33.936a113.219 113.219 0 0 0 5.709-35.59c0-62.6-50.746-113.347-113.347-113.347C50.83.085.083 50.832.083 113.432c0 12.435 2.008 24.396 5.709 35.59h33.93z"}),a.createElement("path",{d:"M162.54 172.077v-60.152l-49.495 49.495-49.148-49.148v59.806h-47.48c19.864 32.786 55.879 54.7 97.013 54.7 41.135 0 77.149-21.914 97.013-54.7H162.54z"})))},"Confirm XMR Payment")),ft&&a.createElement(bt,{detail:ft.detail}),ut&&a.createElement(kt,{error:ut}))))),a.createElement(I.A,null),a.createElement(C.A,{variant:"h5"},a.createElement(o.A,{sx:{lineHeight:2,fontWeight:"700",mt:1}}," ",t("key_management.3_Check_user_manual")," ")),a.createElement(C.A,{variant:"body1"},a.createElement(j.x6,{i18nKey:"key_management.3_infor",t,components:{Link:a.createElement(y.A,{href:"/frontend/manual/key"})}}))))),a.createElement(X.A,null))}}}]);