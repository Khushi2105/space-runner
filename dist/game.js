!function(t){var e={};function s(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,o){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(o,i,function(e){return t[e]}.bind(null,i));return o},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);class o{constructor(t){const e=document.createElement("audio");e.src=t,e.setAttribute("preload","auto"),e.setAttribute("controls","none"),e.style.display="none",this.sound=e,document.body.appendChild(this.sound)}play(){this.sound.play()}stop(){this.sound.pause()}loopOn(){this.sound.loop=!0}loopOff(){this.sound.loop=!1}}const i=t=>{const e=document.querySelectorAll(t);if(!e)throw new Error(`Element with selector '${t}' is not found`);return 1===e.length?e[0]:e},r=(t,e)=>{if(!t||!e)throw new Error("Element and property name must be passed");return parseInt(window.getComputedStyle(t).getPropertyValue(e))},n=t=>{const e=window.getComputedStyle(t);return new WebKitCSSMatrix(e.webkitTransform).m41},a=t=>t.sort((t,e)=>{const s=Object.values(t)[0];return Object.values(e)[0]-s}),c=["#f2002c","#fcf242","#1cc8f5","#66ff00","#01f9c6","#0ff0fc","#ffcf00","#dfff11","#bf00ff"],l=["#A751CC","#DE9AF9","#F9E0F9","#B5ECFB","#5F86F7"];class h{constructor(t,e,s){this.player=i(t),this.height=r(this.player,"height"),this.width=r(this.player,"width"),this.left=r(this.player,"left"),this.obstacleWidth=e,this.isJumping=!1,this.jumpInterval=0,this.screenHeight=s,this.jumpHandler=this.jump.bind(this),this.jumpOnKeypressHandler=this.jumpOnKeypress.bind(this)}enableJumping(){this.player.style.top="80px",document.addEventListener("click",this.jumpHandler),document.addEventListener("keyup",this.jumpOnKeypressHandler)}jump(){this.stopJumping(),this.isJumping=!0;let t=0;const e=.005274*this.screenHeight;this.jumpInterval=window.setInterval(()=>{const s=this.getTop();s>80&&t<15&&(this.player.style.top=s-e+"px"),t>20&&(this.stopJumping(),this.isJumping=!1,t=0),t++},10)}stopJumping(){clearInterval(this.jumpInterval)}destroyJumping(){document.removeEventListener("click",this.jumpHandler),document.removeEventListener("keyup",this.jumpOnKeypressHandler)}jumpOnKeypress(t){" "===t.key&&this.jump()}getDimensions(){return{height:this.height,width:this.width,left:this.left}}isHit(t,e){const s=this.getTop(),o=this.left+this.width,i=o-this.obstacleWidth,r=.25*(t-80)-this.height,n=s>t-this.height,a=e.pipe1Left<o&&e.pipe1Left>i,c=e.pipe2Left<o&&e.pipe2Left>i,l=s<e.hole1Top||s>e.hole1Top+r,h=s<e.hole2Top||s>e.hole2Top+r;return n||a&&l||c&&h}getTop(){return r(this.player,"top")}initiateGravity(t,e){const s=.00633*t,o=window.setInterval(()=>{const t=this.getTop();this.isJumping||(this.player.style.top=t+s+"px"),e(o)},10)}}class d{constructor(t,e,s,o,i){this.x=e,this.y=s,this.radius=o,this.color=i,this.ctx=t,this.draw=()=>{this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI),this.ctx.fillStyle=this.color,this.ctx.shadowColor=this.color,this.ctx.shadowBlur=15,this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()},this.update=()=>{this.draw()}}}function p(t){const e=t,s=e.getContext("2d"),o=()=>{e.width=window.innerWidth,e.height=window.innerHeight};o();let i=[];let r=1,n=5e-4,a=0;const c=()=>{s.save(),r+=(1-r)*.01,s.fillStyle=`rgba(18, 18, 18, ${r})`,n+=.01*(.001-n),a+=n,s.fillRect(0,0,e.width,e.height),s.translate(e.width/2,e.height/2);for(let t=0;t<i.length;t++)i[t].update();s.restore()},h=()=>{i=[],(t=>{for(let o=0;o<t;o++){const t=Math.floor(5*Math.random()),o=2*Math.random(),r=Math.random()*(e.width+400)-(e.width+400)/2,n=Math.random()*(e.width+400)-(e.width+400)/2;i.push(new d(s,r,n,o,l[t]))}})(2e3),c()};h(),window.addEventListener("resize",()=>{o(),i=[],h()})}const u=i("#startGameBtn"),m=i("#overlay"),f=i("#toggleMusic"),g=i("#toggleSettings"),y=i("#starry");let S=500,v=!0;const L=new o("./dist/assets/audio/bgMusic.ogg"),w=new class{constructor(t){this.obstacles=i(t),this.holes=i(".hole"),this.width=r(this.obstacles[0],"width"),this.currentScore=i("#cScore")}get score(){return void 0===this._score?0:this._score}set score(t){this._score=t}createHoles(){this.obstacles.forEach(t=>{this.randomHoleFn(t),t.addEventListener("animationiteration",()=>{this.randomHoleFn(t),this.updateScore()})})}randomHoleFn(t){const e=-(60*Math.random()+35),s=t.querySelector(".hole"),o=100+e+"%",i=125+e+"%",r=t.querySelector(".pipe"),n=c[Math.floor(Math.random()*c.length)],a=`linear-gradient(\n      ${n} ${o},\n      transparent ${o},\n      transparent ${i},\n      ${n} ${i}\n    )`;s.style.top=e+"%",r.style.backgroundImage=a}updateScore(){this.score+=10,this.currentScore.innerText=this.score.toString()}resetPosition(){let t=50;this.obstacles.forEach(e=>{t+=25,e.style.transform=`translateX(${t}vw)`})}pause(){this.currentScore.innerText="0",this.obstacles.forEach(t=>{const e=n(t)+3;t.classList.remove("moving"),t.style.transform=`translateX(${e}px)`})}move(){this.obstacles.forEach(t=>{t.classList.add("moving")})}getLeftOf(t){return n(this.obstacles[t])}getHoleTop(t,e){return e+80+r(this.holes[t],"top")}}(".obstacle"),b=new class{constructor(){this.topScores=[],this.lowestScore=0}updateLeaderboard(){const t=i("#tScore"),e=i("#leaderboard"),s=this.topScores&&this.topScores.length?this.topScores:JSON.parse(localStorage.getItem("tsSRLB")||"[]");if(s.length){this.topScores=a(s),t.innerText=""+Object.values(this.topScores[0])[0],this.lowestScore=Object.values(this.topScores[this.topScores.length-1])[0];const o=this.topScores.reduce((t,e)=>{const s=Number(Object.keys(e)[0]),o=e[s];let i=(t=>{if(!isNaN(t)){return new Date(t).toLocaleDateString()}return"A few days ago!"})(s);return i=i.padStart(50-((""+o).length+i.length),"."),t+=`<li class="lbScore"><span>${o}</span>${i}</li>`},"");e.innerHTML=o}else e.innerHTML="",t.innerText="",this.lowestScore=0}resetLeaderBoard(){localStorage.removeItem("tsSRLB"),this.topScores=[],setTimeout(()=>{this.updateLeaderboard()},100)}save(t){if(!isNaN(t)&&(this.topScores.length<5||t>this.lowestScore&&0!==this.lowestScore)&&0!==t){const e={[""+Date.now()]:t};this.topScores.push(e);const s=a(this.topScores);this.topScores=s.slice(0,5),localStorage.setItem("tsSRLB",JSON.stringify(this.topScores)),this.updateLeaderboard()}}};let x;const T=()=>{const t=i("#resetScores");p(y),j(),b.updateLeaderboard(),S=document.documentElement.clientHeight,x=new h("#character",w.width,S),w.createHoles(),u.addEventListener("click",M),f.addEventListener("click",H),t.addEventListener("click",()=>{b.resetLeaderBoard()}),g.addEventListener("click",O),window.onresize=()=>{T()}},O=t=>{t.preventDefault(),t.stopImmediatePropagation();const e=i("#settingsModal"),s=i("#authorName");e.classList.contains("lsil")?(g.classList.remove("rotateR"),g.classList.add("rotateL"),e.classList.remove("lsil"),e.classList.add("bod"),setTimeout(()=>{e.classList.add("hidden"),e.classList.remove("bod"),s.classList.remove("animatedText")},1500)):(g.classList.remove("rotateL"),g.classList.add("rotateR"),s.classList.add("animatedText"),e.classList.remove("hidden"),e.classList.add("lsil"))},j=()=>{const t=localStorage.getItem("tsSRMP")||"false";v="true"===t,E()},E=()=>{v?f.classList.remove("btn--checked"):f.classList.add("btn--checked")},H=()=>{v=!v,E();const t=v.toString();localStorage.setItem("tsSRMP",t)},M=()=>{w.resetPosition(),v&&(L.loopOn(),L.play()),x.enableJumping(),m.classList.add("hidden"),x.initiateGravity(S,I),w.move()},I=t=>{x.isHit(S,{pipe1Left:w.getLeftOf(0),pipe2Left:w.getLeftOf(1),hole1Top:w.getHoleTop(0,S),hole2Top:w.getHoleTop(1,S)})&&(clearInterval(t),P())},P=()=>{const t=i("#lastScore");if(x.stopJumping(),x.destroyJumping(),v){L.stop();new o("./dist/assets/audio/hit.mp3").play()}b.save(w.score),(()=>{const t=i("#c_lastscore"),e=i("#gameOverText"),s=i("#greet");e.classList.remove("hidden"),t.classList.remove("hidden"),s.classList.add("hidden")})(),t.innerText=""+w.score,m.classList.remove("hidden"),t.classList.add("highlight"),setTimeout(()=>{t.classList.remove("highlight")},1500),w.score=0,w.pause(),u.innerText="Play Again"};document.addEventListener("DOMContentLoaded",(function(){T()}))}]);