"use strict";(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[264],{21005:(e,t,n)=>{n.d(t,{r:()=>l,t:()=>r});var a=n(46266);function r(e){a.A.all([a.A.get("/frontend-api/check-login")]).then(a.A.spread((function(t){"200"==t.status&&e(!0)}))).catch((function(t){"401"==t.response.status&&e(!1)}))}function l(e){a.A.get("/frontend-api/logout").then((function(t){e(!1)})).catch((function(e){console.log(e)}))}},39264:(e,t,n)=>{n.r(t),n.d(t,{default:()=>G});var a=n(96540),r=n(72048),l=n(46266),o=n(53705),c=n(69067),i=n(97834),u=n(30995),m=n(29571),s=n(42471),d=n(35453),f=n(36632),y=n(53246),p=n(15001),E=n(25239),A=n(63901),h=n(13718),b=n(48139),g=n(4147),v=n(8676),k=n(50779),w=n(73896),x=n(2621),S=n(10988),_=n(60538),C=n(14073),P=n(90022),I=n(71543),K=n(45423),j=n(244),R=n(40921),O=n(48719),M=n(16576),X=n(4213),D=n(83186),W=n(75765),z=n(38960),F=n(76544),T=n(51564),N=n(65793),B=n(21005);function V(e){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},V(e)}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,l,o,c=[],i=!0,u=!1;try{if(l=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(a=l.call(n)).done)&&(c.push(a.value),c.length!==t);i=!0);}catch(e){u=!0,r=e}finally{try{if(!i&&null!=n.return&&(o=n.return(),Object(o)!==o))return}finally{if(u)throw r}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return U(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?U(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var Y=(0,v.A)(_.A)((function(e){var t=e.theme;return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(Object(n),!0).forEach((function(t){var a,r,l,o;a=e,r=t,l=n[t],o=function(e,t){if("object"!=V(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,"string");if("object"!=V(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==V(o)?o:o+"")in a?Object.defineProperty(a,r,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[r]=l})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({padding:t.spacing(4)},t.typography.body2)}));const G=function(){var e=(0,F.A)();e=(0,T.A)(e);var t=H((0,a.useState)([]),2),n=t[0],_=t[1],V=H((0,a.useState)(!1),2),U=V[0],q=V[1];(0,a.useEffect)((function(){(0,B.t)(q)}),[]),(0,a.useEffect)((function(){l.A.all([l.A.get("/frontend-api/products")]).then(l.A.spread((function(e){_(e.data.products)}))).catch((function(e){console.log(e)}))}),[]);var G="#3399FF",L="#1C2025",$=(0,v.A)(o.h)((function(e){var t=e.theme;return"\n        box-sizing: border-box;\n        font-family: 'IBM Plex Sans', sans-serif;\n        font-size: 0.875rem;\n        font-weight: 400;\n        width:100%;\n        line-height: 1.5;\n        padding: 8px 12px;\n        border-radius: 8px;\n        color: ".concat("dark"===t.palette.mode?"#C7D0DD":L,";\n        background: ").concat("dark"===t.palette.mode?L:"#fff",";\n        border: 1px solid ").concat("dark"===t.palette.mode?"#434D5B":"#DAE2ED",";\n        box-shadow: 0px 2px 2px ").concat("dark"===t.palette.mode?L:"#F3F6F9",";\n    \n        &:hover {\n          border-color: ").concat(G,";\n        }\n    \n        &:focus {\n          border-color: ").concat(G,";\n          box-shadow: 0 0 0 3px ").concat("dark"===t.palette.mode?"#0072E5":"#b6daff",";\n        }\n    \n        // firefox\n        &:focus-visible {\n          outline: 0;\n        }\n      ")}));function J(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var r=n[a].trim();if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}var Q=H((0,a.useState)(!1),2),Z=Q[0],ee=Q[1],te=H((0,a.useState)(!1),2),ne=te[0],ae=te[1],re=H((0,a.useState)(!1),2),le=re[0],oe=re[1],ce=H((0,a.useState)(!1),2),ie=ce[0],ue=ce[1],me=H((0,a.useState)(!1),2),se=me[0],de=me[1],fe=H((0,a.useState)(""),2),ye=fe[0],pe=fe[1],Ee=H((0,a.useState)(!1),2),Ae=Ee[0],he=Ee[1],be=H((0,a.useState)(""),2),ge=be[0],ve=be[1],ke=H((0,a.useState)(!1),2),we=ke[0],xe=ke[1],Se=H((0,a.useState)(""),2),_e=Se[0],Ce=Se[1],Pe=H((0,a.useState)(!1),2),Ie=Pe[0],Ke=Pe[1],je=H((0,a.useState)(1),2),Re=je[0],Oe=je[1],Me=H((0,a.useState)(null),2),Xe=Me[0],De=Me[1],We=H((0,a.useState)(null),2),ze=We[0],Fe=We[1],Te=H((0,a.useState)(null),2),Ne=Te[0],Be=Te[1],Ve=H((0,a.useState)(null),2),He=Ve[0],Ue=Ve[1],qe=H((0,a.useState)(null),2),Ye=qe[0],Ge=qe[1],Le=H((0,a.useState)(null),2),$e=Le[0],Je=Le[1],Qe=H((0,a.useState)(null),2),Ze=Qe[0],et=Qe[1],tt=H((0,a.useState)(null),2),nt=tt[0],at=tt[1],rt=H((0,a.useState)(null),2),lt=rt[0],ot=rt[1],ct=function(e){if(e.preventDefault(),ee(!0),De(null),Ke(!1),de(!1),""==_e&&(ee(!1),Ke(!0)),_e){var t={headers:{"content-type":"application/json","X-CSRFToken":J("csrftoken")}},n={key_name:_e};l.A.post("/frontend-api/generate-key",n,t).then((function(e){De(e.data)})).catch((function(e){Fe(e.response.data.detail)}))}},it=function(e){var t=e.key_,n=e.key_name,r=e.integrated_wallet,l=e.payment_id;return a.createElement(c.A,{my:4},!se&&a.createElement(c.A,{style:{display:"flex",alignItems:"center",justifyContent:"center"},textAlign:"center",my:1},a.createElement(f.A,{severity:"info"}," Key: ",a.createElement(D.X,{isPlaying:!0,duration:4,revealDuration:1.6,characters:t,onComplete:function(){return de(!0),ee(!1)}}))),se&&a.createElement(f.A,{severity:"success"},"Congrats! Here's your Key, before moving on, you may consider: ",a.createElement("br",null),a.createElement("li",null," Export you Key into a text document "),a.createElement("li",null," Before topping up your Key, use the check credit function below to ensure that you get it correctly "),a.createElement("li",null," If you face any problems, please contact us ")),se&&a.createElement(c.A,{textAlign:"center",my:4},a.createElement($,{defaultValue:"Key: ".concat(t,"\nKey Name: ").concat(n,"\nWallet: ").concat(r," \nPayment id: ").concat(l),minRows:4,maxRows:10}),a.createElement(c.A,{textAlign:"center",my:1},a.createElement(b.A,{size:"small",variant:"outlined",onClick:function(){return e="Key: ".concat(t,"\nKey Name: ").concat(n,"\nWallet: ").concat(r," \nPayment id: ").concat(l),a=new Blob([e],{type:"text/plain;charset=utf-8"}),void(0,X.saveAs)(a,"Key_of_ProffesorParakeet_KEEP_IT_SECURE.txt");var e,a}},"Export Key"))))},ut=function(e){var t=e.key_,n=e.key_name,r=e.monero_balance,l=e.fiat_balance;return a.createElement(c.A,{my:4},a.createElement(f.A,{severity:"success"},"Your Key and Key Name are correct!"),a.createElement(c.A,{textAlign:"center",mt:4},a.createElement($,{defaultValue:"Key: ".concat(t,"\nKey Name: ").concat(n,"\nMonero Balance: ").concat(r," \nFiat Balance: ").concat(l),minRows:4,maxRows:10})))},mt=function(e){var t=e.key_,n=e.key_name,r=e.integrated_wallet,l=e.payment_id;return a.createElement(c.A,{my:4},a.createElement(f.A,{severity:"success"},"Wallet Information:"),a.createElement(c.A,{textAlign:"center",mt:4},a.createElement($,{defaultValue:"Key: ".concat(t,"\nKey Name: ").concat(n,"\nIntergrated Wallet: ").concat(r," \nPayment id: ").concat(l),minRows:4,maxRows:10})))},st=function(e){var t=e.detail;return a.createElement(c.A,{my:4},a.createElement(f.A,{severity:"success"},"Confirmation Status:"),a.createElement(c.A,{textAlign:"center",mt:4},a.createElement($,{defaultValue:"".concat(t),minRows:2,maxRows:10})))},dt=function(e){var t=e.error;return a.createElement(c.A,{mt:4},a.createElement(c.A,{textAlign:"center",my:2},a.createElement(f.A,{variant:"filled",severity:"error"},t)))};return a.createElement(i.A,{maxWidth:!1,disableGutters:!0},a.createElement("title",null,"Key Management"),a.createElement(d.A,null),a.createElement(i.A,{maxWidth:"md"},a.createElement(c.A,{my:1,alignItems:"center",gap:4,p:2},a.createElement(Y,{variant:"outlined"},a.createElement(N.A,{theme:e},a.createElement(C.A,{variant:"h4"},a.createElement(c.A,{sx:{mb:2,fontWeight:"bold"}},"  Get started with Professor Parakeet"))),a.createElement(C.A,{variant:"h5"},a.createElement(c.A,{sx:{lineHeight:2,fontWeight:"700"}}," 1. Create a Key ")),a.createElement(C.A,{variant:"body1"},"Start by generating a random key by giving it a name."),a.createElement(c.A,{my:4,justifyContent:"center",alignItems:"center",display:"flex"},!U&&a.createElement("form",{autoComplete:"off",onSubmit:ct},a.createElement(k.A,{defaultValue:"",required:!0},a.createElement(u.A,{direction:{xs:"column",sm:"row"},spacing:1},a.createElement(s.A,{margin:"normal",label:"Key Name",type:"text",size:"small",onChange:function(e){return Ce(e.target.value)},value:_e,error:Ie,autoComplete:"off",InputProps:{startAdornment:a.createElement(E.A,{position:"start"},a.createElement(A.A,null))}}),a.createElement(h.A,{size:"small",loading:Z,loadingPosition:"end",variant:"contained",type:"submit",endIcon:a.createElement(P.A,null)},"Generate")))),U&&a.createElement("form",{autoComplete:"off",onSubmit:ct},a.createElement(k.A,{defaultValue:"",required:!0},a.createElement(u.A,{direction:{xs:"column",sm:"row"},spacing:1},a.createElement(s.A,{disabled:!0,margin:"normal",label:"Key Name",type:"text",size:"small",defaultValue:"You are logged in",autoComplete:"off",InputProps:{startAdornment:a.createElement(E.A,{position:"start"},a.createElement(A.A,null))}}),a.createElement(b.A,{variant:"outlined",onClick:function(){(0,B.r)(q)},color:"error",endIcon:a.createElement(K.A,null)},"Logout"))))),Xe&&a.createElement(it,{key_:Xe.key,key_name:Xe.key_name,payment_id:Xe.payment_id,integrated_wallet:Xe.integrated_wallet}),ze&&a.createElement(dt,{error:ze}),a.createElement(I.A,null),a.createElement(C.A,{variant:"h5"},a.createElement(c.A,{sx:{lineHeight:2,fontWeight:"700",mt:1}},"2. Add credit to your key")),a.createElement(u.A,{spacing:1},a.createElement(f.A,{variant:"outlined",severity:"info"},"We offer 2 payment methods via Stripe or XMR transfer.  ",a.createElement("br",null),a.createElement("li",null," To pay by Stripe, include the Key and Key Name in the form below and click Stripe. "),a.createElement("li",null," To pay by XMR, transfer your desired amount into the intergrated address provided in your Key file (you don't need to matched the amount listed in the below form.) ")),a.createElement(f.A,{variant:"outlined",severity:"warning"},a.createElement("li",null," If you pay by XMR, you need to click on confirm XMR payment after 10 confirmation blocks. "),a.createElement("li",null," To ensure that people with access to your computer or session cannot retrieve your wallet information, you are required to fill up the credit-related forms, even if you are logged in. "))),a.createElement(c.A,{my:4},a.createElement("form",{autoComplete:"off"},a.createElement(u.A,{direction:{xs:"column",sm:"row"},spacing:1,mb:2,justifyContent:"center",alignItems:"center",display:"flex"},a.createElement(s.A,{margin:"normal",label:"Key Name",type:"text",size:"small",onChange:function(e){return ve(e.target.value)},value:ge,error:we,autoComplete:"off",InputProps:{startAdornment:a.createElement(E.A,{position:"start"},a.createElement(A.A,null))}}),a.createElement(s.A,{margin:"normal",label:"Key",type:"password",size:"small",onChange:function(e){return pe(e.target.value)},value:ye,error:Ae,autoComplete:"off",InputProps:{startAdornment:a.createElement(E.A,{position:"start"},a.createElement(y.A,null))}}),a.createElement(k.A,{defaultValue:"",required:!0,size:"small"},a.createElement(m.A,{id:"demo-simple-select-label"},"Amount"),a.createElement(g.A,{labelId:"demo-simple-select-label",id:"demo-simple-select",onChange:function(e){return Oe(e.target.value)},value:Re,label:"Amount"},n.map((function(e){return a.createElement(w.A,{key:e.id,value:e.id},e.name)}))))),a.createElement(R.A,{defaultExpanded:!0},a.createElement(O.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel1-content",id:"panel1-header"},a.createElement(C.A,{variant:"h6"},"2.1 Check credit balance")),a.createElement(M.A,null,a.createElement(C.A,null,"Before paying, you may check your current balance (and Key and Key Name) to avoid undesirable accidents."),a.createElement(c.A,{mt:2},a.createElement(h.A,{loading:ne,variant:"contained",name:"checkcredit",onClick:function(e){if(e.preventDefault(),Be(null),Ue(null),ae(!0),xe(!1),""==ge&&xe(!0),""==ye&&he(!0),ge&&ye){var t={headers:{"content-type":"application/json","X-CSRFToken":J("csrftoken")}},n={key_name:ge,key:ye};l.A.post("/frontend-api/check-credit",n,t).then((function(e){Ue(e.data)})).catch((function(e){Be(e.response.data.detail)}))}ae(!1)}.bind(this),type:"submit",endIcon:a.createElement(S.A,null)},"Check Credit")),He&&a.createElement(ut,{key_:He.key,key_name:He.key_name,monero_balance:He.monero_balance,fiat_balance:He.fiat_balance}),Ne&&a.createElement(dt,{error:Ne}))),a.createElement(R.A,null,a.createElement(O.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel2-content",id:"panel2-header"},a.createElement(C.A,{variant:"h6"},"2.2 Pay by Stripe")),a.createElement(M.A,null,a.createElement(C.A,null,"You will be redirected to Stripe Payment portal by choosing this payment option."),a.createElement(c.A,{mt:2},a.createElement(b.A,{variant:"contained",onClick:function(e){if(e.preventDefault(),xe(!1),""==ge&&xe(!0),""==ye&&he(!0),ge&&ye&&Re){var t={headers:{"content-type":"application/json","X-CSRFToken":J("csrftoken")}},n={key_name:ge,key:ye,product_id:Re};l.A.post("/frontend-api/stripe-redirect",n,t).then((function(e){window.location.replace(e.data.stripe_checkout_url)})).catch((function(e){console.log(e.response.data.detail),ot(e.response.data.detai)}))}}.bind(this),name:"topup",type:"submit",endIcon:a.createElement(j.A,null)},"Stripe")),lt&&a.createElement(dt,{error:lt}))),a.createElement(R.A,null,a.createElement(O.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel3-content",id:"panel3-header"},a.createElement(C.A,{variant:"h6"},"2.3 Retrieve XMR wallet")),a.createElement(M.A,null,a.createElement(C.A,null,"If (for issues with our XMR node) your Key is not associated with a XMR intergrated wallet, you can associate your Key with a Wallet here. You can also use this function to retrieve your Wallet before payment."),a.createElement(c.A,{mt:2},a.createElement(h.A,{loading:le,variant:"contained",type:"submit",onClick:function(e){if(e.preventDefault(),Ge(null),Je(null),oe(!0),xe(!1),""==ge&&xe(!0),""==ye&&he(!0),ge&&ye){var t={headers:{"content-type":"application/json","X-CSRFToken":J("csrftoken")}},n={key_name:ge,key:ye};l.A.post("/frontend-api/get-xmr-wallet",n,t).then((function(e){Je(e.data)})).catch((function(e){Ge(e.response.data.detail)}))}oe(!1)}.bind(this),endIcon:a.createElement(x.A,null)},"Check XMR Wallet")),$e&&a.createElement(mt,{key_:$e.key,key_name:$e.key_name,payment_id:$e.payment_id,integrated_wallet:$e.integrated_wallet}),Ye&&a.createElement(dt,{error:Ye}))),a.createElement(R.A,null,a.createElement(O.A,{expandIcon:a.createElement(r.A,null),"aria-controls":"panel4-content",id:"panel4-header"},a.createElement(C.A,{variant:"h6"},"2.4 Confirm XMR Payment")),a.createElement(M.A,null,a.createElement(C.A,null,"Processing the XMR payment may take up to 30 minutes after it has been confirmed on the blockchain. Use sufficient fees so the transactions gets confirmed on time."),a.createElement(c.A,{mt:2},a.createElement(h.A,{loading:ie,variant:"contained",type:"submit",onClick:function(e){if(e.preventDefault(),et(null),at(null),ue(!0),xe(!1),""==ge&&xe(!0),""==ye&&he(!0),ge&&ye){var t={headers:{"content-type":"application/json","X-CSRFToken":J("csrftoken")}},n={key_name:ge,key:ye};l.A.post("/frontend-api/confirm-xmr-payment",n,t).then((function(e){at(e.data)})).catch((function(e){et(e.response.data.detail)}))}ue(!1)}.bind(this),endIcon:a.createElement(W.A,null,a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"226.777",height:"226.777",viewBox:"0 0 226.777 226.777"},a.createElement("path",{d:"M39.722 149.021v-95.15l73.741 73.741 73.669-73.669v95.079h33.936a113.219 113.219 0 0 0 5.709-35.59c0-62.6-50.746-113.347-113.347-113.347C50.83.085.083 50.832.083 113.432c0 12.435 2.008 24.396 5.709 35.59h33.93z"}),a.createElement("path",{d:"M162.54 172.077v-60.152l-49.495 49.495-49.148-49.148v59.806h-47.48c19.864 32.786 55.879 54.7 97.013 54.7 41.135 0 77.149-21.914 97.013-54.7H162.54z"})))},"Confirm XMR Payment")),nt&&a.createElement(st,{detail:nt.detail}),Ze&&a.createElement(dt,{error:Ze}))))),a.createElement(I.A,null),a.createElement(C.A,{variant:"h5"},a.createElement(c.A,{sx:{lineHeight:2,fontWeight:"700",mt:1}}," 3. Check user manual ")),a.createElement(C.A,{variant:"body1"},"Check the ",a.createElement(p.A,{href:"/frontend/manual/key",variant:"body1"},"User Manual")," to learn more about how to pay and use our services.")))),a.createElement(z.A,null))}}}]);