(self.webpackChunkinference_portal=self.webpackChunkinference_portal||[]).push([[2042],{21400:(e,t,r)=>{var a,s=Object.create,l=Object.defineProperty,n=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,o=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,h=(e,t,r,a)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of i(t))p.call(e,s)||s===r||l(e,s,{get:()=>t[s],enumerable:!(a=n(t,s))||a.enumerable});return e},y=(e,t,r)=>(((e,t,r)=>{t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r),d={};((e,t)=>{for(var r in t)l(e,r,{get:t[r],enumerable:!0})})(d,{default:()=>P}),e.exports=(a=d,h(l({},"__esModule",{value:!0}),a));var c=((e,t,r)=>(r=null!=e?s(o(e)):{},h(e&&e.__esModule?r:l(r,"default",{value:e,enumerable:!0}),e)))(r(96540)),u=r(75635),m=r(50327);class P extends c.Component{constructor(){super(...arguments),y(this,"callPlayer",u.callPlayer),y(this,"playerID",this.props.config.playerId||`twitch-player-${(0,u.randomString)()}`),y(this,"mute",(()=>{this.callPlayer("setMuted",!0)})),y(this,"unmute",(()=>{this.callPlayer("setMuted",!1)}))}componentDidMount(){this.props.onMount&&this.props.onMount(this)}load(e,t){const{playsinline:r,onError:a,config:s,controls:l}=this.props,n=m.MATCH_URL_TWITCH_CHANNEL.test(e),i=n?e.match(m.MATCH_URL_TWITCH_CHANNEL)[1]:e.match(m.MATCH_URL_TWITCH_VIDEO)[1];t?n?this.player.setChannel(i):this.player.setVideo("v"+i):(0,u.getSDK)("https://player.twitch.tv/js/embed/v1.js","Twitch").then((t=>{this.player=new t.Player(this.playerID,{video:n?"":i,channel:n?i:"",height:"100%",width:"100%",playsinline:r,autoplay:this.props.playing,muted:this.props.muted,controls:!!n||l,time:(0,u.parseStartTime)(e),...s.options});const{READY:a,PLAYING:o,PAUSE:p,ENDED:h,ONLINE:y,OFFLINE:d,SEEK:c}=t.Player;this.player.addEventListener(a,this.props.onReady),this.player.addEventListener(o,this.props.onPlay),this.player.addEventListener(p,this.props.onPause),this.player.addEventListener(h,this.props.onEnded),this.player.addEventListener(c,this.props.onSeek),this.player.addEventListener(y,this.props.onLoaded),this.player.addEventListener(d,this.props.onLoaded)}),a)}play(){this.callPlayer("play")}pause(){this.callPlayer("pause")}stop(){this.callPlayer("pause")}seekTo(e,t=!0){this.callPlayer("seek",e),t||this.pause()}setVolume(e){this.callPlayer("setVolume",e)}getDuration(){return this.callPlayer("getDuration")}getCurrentTime(){return this.callPlayer("getCurrentTime")}getSecondsLoaded(){return null}render(){return c.default.createElement("div",{style:{width:"100%",height:"100%"},id:this.playerID})}}y(P,"displayName","Twitch"),y(P,"canPlay",m.canPlay.twitch),y(P,"loopOnEnded",!0)}}]);