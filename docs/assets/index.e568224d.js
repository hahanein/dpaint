var wt=Object.defineProperty;var Z=Object.getOwnPropertySymbols;var gt=Object.prototype.hasOwnProperty,St=Object.prototype.propertyIsEnumerable;var V=(t,n,e)=>n in t?wt(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,tt=(t,n)=>{for(var e in n||(n={}))gt.call(n,e)&&V(t,e,n[e]);if(Z)for(var e of Z(n))St.call(n,e)&&V(t,e,n[e]);return t};var et=(t,n,e)=>(V(t,typeof n!="symbol"?n+"":n,e),e),nt=(t,n,e)=>{if(!n.has(t))throw TypeError("Cannot "+e)};var p=(t,n,e)=>(nt(t,n,"read from private field"),e?e.call(t):n.get(t)),x=(t,n,e)=>{if(n.has(t))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(t):n.set(t,e)},S=(t,n,e,s)=>(nt(t,n,"write to private field"),s?s.call(t,e):n.set(t,e),e);const kt=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}};kt();const ot=document.createElement("template");ot.innerHTML=`
<style>
button {
    width: 1.5rem;
    height: 1.5rem;
}
</style>
<button></button>
`;var P;class st extends HTMLElement{constructor(){super();x(this,P,void 0);const n=this.attachShadow({mode:"closed"});n.appendChild(ot.content.cloneNode(!0)),S(this,P,n.querySelector("button"))}static get observedAttributes(){return["value"]}attributeChangedCallback(n,e,s){n=="value"&&(p(this,P).style.background="#"+s)}}P=new WeakMap;window.customElements.define("p-color",st);const it=document.createElement("template");it.innerHTML=`
<style>
:host {
    display: flex;
}

#current {
  position: relative;
  width: 4rem;
  height: 4rem;
}

#primary {
  position: absolute;
  top: .5rem;
  left: .5rem;
}

#secondary {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

#available {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
</style>
<div id="current">
    <p-color id="secondary" value="FFFFFF"></p-color>
    <p-color id="primary" value="000000"></p-color>
</div>
<div id="available">
    <slot></slot>
</div>
`;var U,B;class rt extends HTMLElement{constructor(){super();x(this,U,void 0);x(this,B,void 0);const n=this.attachShadow({mode:"closed"});n.appendChild(it.content.cloneNode(!0)),S(this,U,n.querySelector("#primary")),S(this,B,n.querySelector("#secondary"))}static get observedAttributes(){return["primary","secondary"]}attributeChangedCallback(n,e,s){switch(n){case"primary":p(this,U).setAttribute("value",s);break;case"secondary":p(this,B).setAttribute("value",s);break}}}U=new WeakMap,B=new WeakMap;window.customElements.define("p-colors",rt);const ct=document.createElement("template");ct.innerHTML=`
<style>
:host {
    position: absolute;
}

textarea {
    box-sizing: border-box;
    border: none;
    resize: none;
    outline: none;
    width: 100%;
    height: 100%;
}
</style>
<textarea></textarea>
`;function vt(t,n){var o;const e=document.createElement("span");e.style.font=n,e.textContent="A",(o=t.parentElement)==null||o.appendChild(e);const s=e.clientHeight;return e.remove(),s}function Et(t,n,e,s){let o=s;const i=n.split(`
`).map(c=>c.split(" "));for(let c of i){let r="";for(let l of c){const a=r+l+" ";if(t.measureText(a).width<e){r=a;continue}t.fillText(r,0,o),r=l+" ",o+=s}t.fillText(r,0,o),o+=s}}var D,y,k,F,N,I;class at extends HTMLElement{constructor(){super();x(this,D,void 0);x(this,y,void 0);x(this,k,void 0);et(this,"value");x(this,F,"1.2rem Helvetica, Arial, Verdana sans-serif");x(this,N,"black");x(this,I,"white");S(this,D,this.attachShadow({mode:"closed"})),p(this,D).appendChild(ct.content.cloneNode(!0)),S(this,y,p(this,D).querySelector("textarea")),p(this,y).style.font=p(this,F),p(this,y).style.color=p(this,N),p(this,y).style.background=p(this,I),S(this,k,document.createElement("canvas"))}static get observedAttributes(){return["color","background"]}attributeChangedCallback(n,e,s){switch(n){case"color":S(this,N,s),p(this,y).style.color=s;break;case"background":S(this,I,s),p(this,y).style.background=s;break}}connectedCallback(){p(this,y).focus();const n=p(this,y).offsetWidth,e=p(this,y).offsetHeight;p(this,k).style.width=n+"px",p(this,k).style.height=e+"px",p(this,k).width=n,p(this,k).height=e,p(this,y).addEventListener("keyup",s=>{const o=vt(this,p(this,F)),i=p(this,k).getContext("2d");i.fillStyle=p(this,I),i.fillRect(0,0,n,e),i.fillStyle=p(this,N),i.font=p(this,F),Et(i,p(this,y).value,n,o),this.value=i.getImageData(0,0,n,e)})}}D=new WeakMap,y=new WeakMap,k=new WeakMap,F=new WeakMap,N=new WeakMap,I=new WeakMap;window.customElements.define("p-text",at);function lt(t,n,e,s,o){const i=Math.sin(o),c=Math.cos(o);e-=t,s-=n;const r=e*c-s*i,l=e*i+s*c;return e=r+t,s=l+n,[e,s]}function Mt(t,n,e,s,o){const i=Math.sqrt((e-t)**2+(s-n)**2);return Number.isNaN(i)||i<o?[NaN,NaN]:(t=e-o*(e-t)/i,n=s-o*(s-n)/i,[t,n])}function dt(t,n){return function(s,o,i){const c=n(o,i);if(c){const r=~(c>>24)&255,l=~(c>>16)&255,a=~(c>>8)&255,d=c&255,u=r*Math.pow(2,24)+l*Math.pow(2,16)+a*Math.pow(2,8)+d;t(u,o,i)}}}function jt(t,n,e,s,o,i,c=12,r=500){if([e,s]=Mt(e,s,o,i,c),e&&s){const[l,a]=lt(e,s,o,i,r),[d,u]=lt(e,s,o,i,-r);q(t,n,Math.floor(l),Math.floor(a),o,i),q(t,n,Math.floor(d),Math.floor(u),o,i)}}function mt(t,n=8){const e=n*2;let s=0;return function(i,c,r){s<n&&t(i,c,r),s=(s+1)%e}}function Lt(t,n,e,s,o){const i=n(s,o);if(i&&i!==e){const c=[[s,o]];for(let r=c.pop();r;r=c.pop())[s,o]=r,n(s,o)===i&&(t(e,s,o),c.push([s,o+1],[s,o-1],[s+1,o],[s-1,o]))}}function j(t,n){if(n===1)return t;if(n>1)return function(s,o,i){for(let c=0;c<n;c++)for(let r=0;r<n;r++)t(s,o+c,i+r)};throw new Error("Size must be greater than or equal 1")}function q(t,n,e,s,o,i){const c=Math.abs(o-e),r=e<o?1:-1,l=-Math.abs(i-s),a=s<i?1:-1;let d=c+l;for(;t(n,e,s),!(e==o&&s==i);){const u=2*d;u>=l&&(d+=l,e+=r),u<=c&&(d+=c,s+=a)}}function X(t,n,e,s,o,i){const c=Math.abs(e-o),r=Math.abs(s-i),l=e<o?e:o,a=s<i?s:i;for(let d=0;d<c;d++)for(let u=0;u<r;u++)t(n,l+d,a+u)}function $(t,n,e,s,o,i){const c=e<o?1:-1,r=s<i?1:-1;let l=e,a=s;for(;t(n,l,s),t(n,l,i),l!==o;)l+=c;for(;t(n,e,a),t(n,o,a),a!==i;)a+=r}let pt=2;const E={get sizes(){return[1,2,3,5]},get currentSize(){return pt},set currentSize(t){if(E.sizes.some(n=>n===t))pt=t;else throw new Error("Custom sizes not allowed")}};function L(){let t;return[s=>{window.cancelAnimationFrame(t),t=window.requestAnimationFrame(function o(i){s(i),t=window.requestAnimationFrame(o)})},()=>{window.cancelAnimationFrame(t)}]}function At({buffer:t,colors:n,target:e}){let s,o;const[i,c]=L(),r=a=>{t.unstash();let d=j(t.plot,E.currentSize);q(d,e.main?n.primary:n.secondary,s,o,e.x,e.y),jt(d,e.main?n.primary:n.secondary,s,o,e.x,e.y),t.commit()};return Object.freeze({begin(){c(),t.stash(),j(t.plot,E.currentSize)(e.main?n.primary:n.secondary,e.x,e.y),s=e.x,o=e.y,t.commit(),i(r)},close(){c(),t.snapshot()},get modifiers(){return E.sizes.map(a=>({name:`${a}px`,isActive:a===E.currentSize,set(){E.currentSize=a}}))}})}function Ct({buffer:t,colors:n,target:e}){let s,o;const[i,c]=L(),r=a=>{q(t.plot,e.secondary?n.secondary:n.primary,s,o,e.x,e.y),s=e.x,o=e.y,t.commit()};return Object.freeze({begin(){c(),t.plot(e.secondary?n.secondary:n.primary,e.x,e.y),s=e.x,o=e.y,t.commit(),i(r)},close(){c(),t.snapshot()}})}const H=1<<0,R=1<<1,zt=[{name:"outline",flags:H},{name:"full",flags:H|R},{name:"fill",flags:R}];let A=H;function Tt({buffer:t,colors:n,target:e}){let s,o;const[i,c]=L(),r=a=>{if(t.unstash(),(R&A)>0&&X(t.plot,e.main?n.secondary:n.primary,s,o,e.x,e.y),(H&A)>0){let d=j(t.plot,E.currentSize);$(d,e.main?n.primary:n.secondary,s,o,e.x,e.y)}t.commit()};return Object.freeze({begin(){c(),t.stash(),(R&A)>0&&t.plot(e.main?n.secondary:n.primary,e.x,e.y),(H&A)>0&&j(t.plot,E.currentSize)(e.main?n.primary:n.secondary,e.x,e.y),s=e.x,o=e.y,t.commit(),i(r)},close(){c(),t.snapshot()},get modifiers(){return zt.map(({name:a,flags:d})=>({name:a,isActive:d===A,set(){A=d}}))}})}const ut=[2,3,5,7,9,11,13,15,17,19,21];let C=ut[0];document.addEventListener("wheel",({deltaY:t})=>{const n=Math.floor(C+t*.01);n>=2&&(C=n)});function Ot({buffer:t,colors:n,target:e}){let s,o;const[i,c]=L(),r=a=>{let d=j(t.plot,C);q(d,e.main?n.primary:n.secondary,s,o,e.x,e.y),s=e.x,o=e.y,t.commit()};return Object.freeze({begin(){c(),j(t.plot,C)(e.main?n.primary:n.secondary,e.x,e.y),s=e.x,o=e.y,t.commit(),i(r)},close(){c(),t.snapshot()},get modifiers(){return ut.map(a=>({name:`${a}px`,isActive:a===C,set(){C=a}}))}})}function Dt({buffer:t,colors:n,target:e}){return Object.freeze({begin(){},close(){const o=t.pick(e.x,e.y);o&&e.main&&(n.primary=o),o&&e.secondary&&(n.secondary=o)}})}function Ft({buffer:t,colors:n,target:e}){return Object.freeze({begin(){},close(){Lt(t.plot,t.pick,e.main?n.primary:n.secondary,e.x,e.y),t.commit(),t.snapshot()}})}function Nt({buffer:t,colors:n,target:e}){let s="select",o,i;const c=dt(mt(t.plot),t.pick),[r,l]=L(),a=u=>{t.unstash(),$(c,n.primary,o,i,e.x,e.y),t.commit()};return Object.freeze({begin(){s==="select"&&(l(),t.stash(),c(0,e.x,e.y),t.commit(),r(a)),o=e.x,i=e.y},close(){if(s==="select"){l(),s="edit",t.unstash();const{x:u,y:m,offsetLeft:h,offsetTop:M}=e,b=o<u?o:u,_=i<m?i:m,g=Math.abs(o-u),v=Math.abs(i-m);o=u,i=m,$(c,n.primary,b-1,_,b+g,_+v+1);const f=new at;f.style.left=`${b+h}px`,f.style.top=`${_+M}px`,f.style.width=`${g}px`,f.style.height=`${v}px`;const bt=e.main?n.primaryString:n.secondaryString,xt=e.main?n.secondaryString:n.primaryString;f.setAttribute("color",`#${bt.substring(0,6)}`),f.setAttribute("background",`#${xt}`),document.body.appendChild(f),t.commit(),f.addEventListener("focusout",Rt=>{t.unstash(),f.remove(),f.value&&t.putImageData(f.value,b,_),t.commit(),t.snapshot(),s="done"})}else s==="done"&&(s="select")}})}function It({buffer:t,colors:n,target:e}){let s="select",o,i,c,r,l;const[a,d]=L(),u=dt(mt(t.plot),t.pick),m=g=>{t.unstash(),$(u,n.primary,c,r,e.x,e.y),t.commit()},h=g=>{t.unstash(),X(t.plot,n.secondary,o.x,o.y,o.x+o.dx-1,o.y+o.dy-1),$(u,n.primary,i.x-1,i.y-1,i.x+i.dx,i.y+i.dy),t.putImageData(l,i.x,i.y),t.commit()},M=g=>{const v=c-e.x,f=r-e.y;c=e.x,r=e.y,i={x:i.x-v,y:i.y-f,dx:o.dx,dy:o.dy},h()},b=()=>i.x<e.x&&e.x<i.dx+i.x&&i.y<e.y&&e.y<i.dy+i.y;return Object.freeze({begin(){if(!(e.x<0||e.y<0)){switch(s){case"select":t.stash(),a(m);break;case"edit":b()?a(M):(d(),s="done",t.unstash(),X(t.plot,n.secondary,o.x,o.y,o.x+o.dx-1,o.y+o.dy-1),t.putImageData(l,i.x,i.y),t.commit());break}c=e.x,r=e.y}},close(){if(!(e.x<0||e.y<0))switch(s){case"select":s="edit";const{x:g,y:v}=e;o={x:c<g?c:g,y:r<v?r:v,dx:Math.abs(c-g),dy:Math.abs(r-v)},i=tt({},o),t.unstash(),l=t.getImageData(o.x,o.y,o.dx,o.dy),a(h);break;case"edit":a(h);break;case"done":s="select";break}}})}function _t({buffer:t,target:n}){let e=2;return Object.freeze({begin(){n.zoom(e),t.commit()},close(){},get modifiers(){return[1,2,6,8].map(o=>({name:`${o}X`,isActive:e===o,set(){e=o}}))}})}var qt={createLine:At,createPencil:Ct,createBrush:Ot,createRectangle:Tt,createPicker:Dt,createBucket:Ft,createText:Nt,createSelect:It,createMagnifier:_t};let G=255,J=4294967295;const K=new Set;function ht(){for(const t of K)t()}function yt(t){if(typeof t=="number")return t;if(typeof t=="string")return Number.parseInt(t,16);throw new Error("Not implemented")}const w={get colors(){return[255,4294967295,2155905279,3233857791,2147483903,4278190335,2155872511,4294902015,8388863,16711935,8421631,16777215,33023,65535,2147516671,4278255615,2155888895,4294934783,4210943,16744703,8454143,2164260863,4227327,2155937791,2147549183,4278223103,2151678207,4286595327]},get colorStrings(){return w.colors.map(t=>t.toString(16).padStart(8,"0"))},get primary(){return G},get secondary(){return J},get primaryString(){return G.toString(16).padStart(8,"0")},get secondaryString(){return J.toString(16).padStart(8,"0")},set primary(t){G=yt(t),ht()},set secondary(t){J=yt(t),ht()},subscribe(t){return K.add(t),K.delete.bind(K,t)}};function $t(t){for(let n=0;n<t.length;n++)t[n]=255}function Ht({width:t,height:n}){const e=new Set,s=new Uint8ClampedArray(t*n*4);$t(s);const o=new Uint8ClampedArray(s),i=[new Uint8ClampedArray(s)],c=[];return Object.freeze({subscribe(r){return e.add(r),e.delete.bind(e,r)},plot(r,l,a){if(0>l||l>=t||0>a||a>=n)return;let d=l*4+a*t*4;s[d]=r>>24&255,s[++d]=r>>16&255,s[++d]=r>>8&255,s[++d]=r&255},pick(r,l){if(0>r||r>=t||0>l||l>=n)return;let a=r*4+l*t*4;return s[a]*Math.pow(2,24)+s[++a]*Math.pow(2,16)+s[++a]*Math.pow(2,8)+s[++a]},commit(){for(const r of e)r()},stash(){o.set(s)},unstash(){s.set(o)},snapshot(){c.length=0,i.push(new Uint8ClampedArray(s)),i.splice(0,i.length-50)},undo(){const r=i.pop();r&&(c.push(r),s.set(r))},redo(){const r=c.pop();r&&(i.push(r),s.set(r))},get imageData(){return new ImageData(s,t,n)},getImageData(r,l,a,d){const u=new Uint8ClampedArray(a*d*4);for(let m=0;m<d;m++){const h=r*4+(l+m)*t*4,M=(r+a)*4+(l+m)*t*4,b=m*a*4;u.set(s.slice(h,M),b)}return new ImageData(u,a,d)},putImageData(r,l,a){const d=l*4,u=a*t*4,m=r.width*4;for(let h=0;h<r.data.length;h++){const M=h%m,b=Math.floor(h/m)*t*4;s[d+u+M+b]=r.data[h]}}})}function Pt({canvas:t,buffer:n}){const e=t.getContext("2d");e.imageSmoothingEnabled=!1;const s=t.width,o=t.height;let i=1;n.subscribe(()=>e.putImageData(n.imageData,0,0));let c,r,l,a,d;const u=m=>{r=m.button===0,l=m.button===2};return document.addEventListener("mousemove",({clientX:m,clientY:h})=>{a=m-t.offsetLeft,d=h-t.offsetTop}),document.addEventListener("mousedown",m=>{u(m),c.begin()}),document.addEventListener("mouseup",m=>{u(m),c.close()}),document.addEventListener("contextmenu",m=>m.preventDefault()),{get offsetLeft(){return t.offsetLeft},get offsetTop(){return t.offsetTop},get x(){return Math.floor(a/i)},get y(){return Math.floor(d/i)},get main(){return r},get secondary(){return l},set tool(m){c=m},zoom(m){i=m,t.width=s/i,t.height=o/i}}}const Q=1024,Y=720,z=document.querySelector("canvas");z.style.width=Q+"px";z.style.height=Y+"px";z.width=Q;z.height=Y;const T=Ht({width:Q,height:Y}),ft=Pt({canvas:z,buffer:T}),Ut={buffer:T,colors:w,target:ft},Bt=document.getElementById("toolbox"),W=document.getElementById("toolbox-modifiers");for(const[t,n]of Object.entries(qt)){const e=t.substr("create".length),s=document.createElement("button");s.innerText=e;const o=()=>{const i=n(Ut);for(ft.tool=i;W.firstChild;)W.removeChild(W.firstChild);if(i.modifiers)for(const c of i.modifiers){const r=document.createElement("button");r.innerText=c.name,r.addEventListener("click",c.set),W.appendChild(r)}};s.addEventListener("click",o),e==="Pencil"&&o(),Bt.appendChild(s)}const O=new rt;O.setAttribute("primary",w.primaryString);O.setAttribute("secondary",w.secondaryString);for(const t of w.colorStrings){const n=new st;n.setAttribute("value",t),n.addEventListener("click",e=>w.primary=n.getAttribute("value")),n.addEventListener("contextmenu",e=>{e.preventDefault(),w.secondary=n.getAttribute("value")}),O.appendChild(n)}w.subscribe(()=>{O.setAttribute("primary",w.primaryString),O.setAttribute("secondary",w.secondaryString)});document.querySelector("footer").appendChild(O);document.addEventListener("keydown",function(n){n.ctrlKey&&n.key==="z"&&(T.undo(),T.commit()),n.ctrlKey&&n.key==="r"&&(n.preventDefault(),T.redo(),T.commit()),n.ctrlKey&&n.key==="s"&&(n.preventDefault(),z.toBlob(function(s){const o=document.createElement("a");o.href=window.URL.createObjectURL(s),o.download="Untitled.bmp",o.click()},"image/bmp"))});
