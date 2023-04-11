import{S as N,i as b,s as S,O as W,P as D,m as _,h as p,p as w,n as i,b as L,G as O,B as j,k as C,w as T,l as y,x as A,y as R,f as m,t as I,z as B,H as J,o as z,C as ne,a as H,c as M,K as x,g as se,d as ae,D as re,E as oe,F as le,Q as ie,R as ce}from"./index-0618623f.js";import{w as Y}from"./index-f78b2bfc.js";const Z=Y(0),ue=Y(0);var fe=(t=>(t.BLOP="BLOP",t.SWOOSH="SWOOSH",t.FANFARE="FANFARE",t.CLICK="CLICK",t.WIN_WOHOO="WIN_WOHOO",t.WIN_PIANO="WIN_PIANO",t.WIN_BIUING="WIN_BIUING",t.WRONG="WRONG",t.SCRATCH="SCRATCH",t.SWIPE="SWIPE",t.SWIPE2="SWIPE2",t.CORRECT="CORRECT",t.SQUISH="SQUISH",t.SCRIBBLE="SCRIBBLE",t.DRAW="DRAW",t))(fe||{});let k=null;function $(){return k==null&&(k=new AudioContext),k}let X={};function De(t){[...de,...t].forEach(e=>{X[e]==null&&fetch(`/assets/audio/${e}.mp3`).then(n=>n.arrayBuffer()).then(n=>$().decodeAudioData(n)).then(n=>{X[e]=()=>{const s=$().createBufferSource();s.buffer=n,s.connect($().destination),s.start(0)}})})}async function he(t){const e=X[t];e!=null?e():console.warn(`Sound player for ${t} not ready yet.`)}const ee=["WIN_PIANO","WIN_WOHOO","WIN_BIUING"],de=[...ee,"CLICK"];function He(t){const e=[...t];for(let n=e.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[e[n],e[s]]=[e[s],e[n]]}return e}function ge(t){const e=Math.floor(Math.random()*t.length);return t[e]}function Me(t,e){const n=e!=null;return t.filter(s=>{const a=!s.difficulty||s.difficulty===e;return n&&a})}const G=Y(!1);G.subscribe(t=>{t&&he(ge(ee))});function pe(t){let e,n,s;return{c(){e=W("svg"),n=W("circle"),s=W("path"),this.h()},l(a){e=D(a,"svg",{version:!0,id:!0,xmlns:!0,"xmlns:xlink":!0,x:!0,y:!0,width:!0,height:!0,viewBox:!0,style:!0,"xml:space":!0});var r=_(e);n=D(r,"circle",{style:!0,cx:!0,cy:!0,r:!0}),_(n).forEach(p),s=D(r,"path",{style:!0,d:!0}),_(s).forEach(p),r.forEach(p),this.h()},h(){w(n,"fill","white"),i(n,"cx","236.827"),i(n,"cy","236.827"),i(n,"r","236.827"),w(s,"fill","rgb(45,45,45)"),i(s,"d",`M338.465,207.969c-43.487,0-86.975,0-130.459,0c11.08-11.08,22.161-22.161,33.241-33.245
	c25.56-25.56-14.259-65.084-39.883-39.456c-27.011,27.011-54.018,54.022-81.029,81.033c-10.841,10.841-10.549,28.907,0.213,39.669
	c27.011,27.007,54.018,54.018,81.029,81.025c25.56,25.56,65.084-14.259,39.456-39.883c-11.013-11.013-22.026-22.026-33.039-33.035
	c43.357,0,86.713,0,130.066,0C374.283,264.077,374.604,207.969,338.465,207.969z`),i(e,"version","1.1"),i(e,"id","Layer_1"),i(e,"xmlns","http://www.w3.org/2000/svg"),i(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),i(e,"x","0px"),i(e,"y","0px"),i(e,"width",t[0]),i(e,"height",t[0]),i(e,"viewBox","0 0 473.654 473.654"),w(e,"enable-background","new 0 0 473.654 473.654"),w(e,"border","7px solid transparent"),w(e,"border-radius","50%"),i(e,"xml:space","preserve")},m(a,r){L(a,e,r),O(e,n),O(e,s)},p(a,[r]){r&1&&i(e,"width",a[0]),r&1&&i(e,"height",a[0])},i:j,o:j,d(a){a&&p(e)}}}function ve(t,e,n){let{size:s}=e;return t.$$set=a=>{"size"in a&&n(0,s=a.size)},[s]}class me extends N{constructor(e){super(),b(this,e,ve,pe,S,{size:0})}}function _e(t){let e,n,s,a,r,c;return s=new me({props:{size:we}}),{c(){e=C("div"),n=C("a"),T(s.$$.fragment),this.h()},l(o){e=y(o,"DIV",{class:!0});var f=_(e);n=y(f,"A",{href:!0,class:!0});var h=_(n);A(s.$$.fragment,h),h.forEach(p),f.forEach(p),this.h()},h(){i(n,"href",a=t[0]?t[0]:"/"),i(n,"class",r="nav-button nav-button-left "+(t[1]?"finished":"")+" svelte-1x2l5tx"),i(e,"class","nav svelte-1x2l5tx")},m(o,f){L(o,e,f),O(e,n),R(s,n,null),c=!0},p(o,[f]){(!c||f&1&&a!==(a=o[0]?o[0]:"/"))&&i(n,"href",a),(!c||f&2&&r!==(r="nav-button nav-button-left "+(o[1]?"finished":"")+" svelte-1x2l5tx"))&&i(n,"class",r)},i(o){c||(m(s.$$.fragment,o),c=!0)},o(o){I(s.$$.fragment,o),c=!1},d(o){o&&p(e),B(s)}}}const we=70;function Ie(t,e,n){let s;J(t,G,r=>n(1,s=r));let{parent:a=null}=e;return t.$$set=r=>{"parent"in r&&n(0,a=r.parent)},[a,s]}class Le extends N{constructor(e){super(),b(this,e,Ie,_e,S,{parent:0})}}function Oe(t){let e=!1;z(()=>(n(),window.addEventListener("resize",s),()=>{e=!0,window.removeEventListener("resize",s)}));function n(){e||setTimeout(()=>{s(),n()},1e3)}const s=()=>{Z.set(window.innerHeight),ue.set(window.innerWidth)};return s(),[]}class Ce extends N{constructor(e){super(),b(this,e,Oe,null,S,{})}}var te=(t=>(t.SCROLLABLE="SCROLLABLE",t.CLICK_ONLY="CLICK_ONLY",t.DRAG_ONLY="DRAG_ONLY",t))(te||{});function xe(t){return t.identifier??0}function ke(t){return t.changedTouches?t.changedTouches[0]:t}const E=new Map,V=t=>e=>{if(t!=="SCROLLABLE"||e.touches.length>1){const n=e.changedTouches[0],s={pageX:n.pageX,pageY:n.pageY,clientX:n.clientX,clientY:n.clientY,isScroll:!1,originPageX:n.pageX,originPageY:n.pageY,touchMode:t};E.set(n.identifier,{firstTouch:s,lastTouch:s}),{SCROLLABLE:()=>{},DRAG_ONLY:()=>{},CLICK_ONLY:()=>{}}[t]()}},ye=t=>{const e=t.changedTouches[0],n=E.get(e.identifier),s=n.lastTouch,a={...s,clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY};s!=null&&{SCROLLABLE:()=>{s.isScroll||Math.abs(a.pageY-s.originPageY)>5&&(a.isScroll=!0);const c=a.pageY-s.pageY;document.getElementById("scrollable").scrollBy({top:-c,left:0,behavior:"auto"}),E.set(e.identifier,{...n,lastTouch:a})},DRAG_ONLY:()=>{},CLICK_ONLY:()=>{t.preventDefault(),t.stopPropagation()}}[s.touchMode]()},Ee=t=>{const e=t.changedTouches[0],s=E.get(e.identifier).lastTouch;if(s!=null){let a=function(){t.preventDefault(),t.stopPropagation();function c(){const o=e.target,f=Array.from(document.elementsFromPoint(e.pageX,e.pageY))[0];if(o===f){const h=o;if(typeof h.click=="function")h.click();else{const d=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0});h.dispatchEvent(d)}}}c()};({SCROLLABLE:()=>{({...s,pageX:e.pageX,pageY:e.pageY},s.isScroll||a())},DRAG_ONLY:()=>{a()},CLICK_ONLY:()=>{a()}})[s.touchMode](),E.delete(e.identifier)}};function F(){return document.getElementById("scrollable")}function Q(){const t=F().scrollTop.toString();sessionStorage.setItem("scroll-updater-last-scroll",t)}function Ne(){const t=sessionStorage.getItem("scroll-updater-last-scroll");t&&(F().scrollTop=parseInt(t))}function be(){const t=window.location.pathname,e=sessionStorage.getItem("scroll-updater-previous-path");return sessionStorage.setItem("scroll-updater-previous-path",t),e&&e.indexOf(t)===0&&t!==e}function Se(t){return z(()=>{be()&&Ne();const n=F();return n.addEventListener("scroll",Q),()=>{n.removeEventListener("scroll",Q)}}),[]}class Ye extends N{constructor(e){super(),b(this,e,Se,null,S,{})}}const Te=Y(""),Ae=Y("Debugger Turned On");Ae.subscribe(t=>{Te.update(e=>e+"|"+t)});function q(t){let e,n,s;return n=new Le({props:{parent:t[0]}}),{c(){e=C("div"),T(n.$$.fragment),this.h()},l(a){e=y(a,"DIV",{class:!0});var r=_(e);A(n.$$.fragment,r),r.forEach(p),this.h()},h(){i(e,"class","page-nav svelte-1vyg6jt")},m(a,r){L(a,e,r),R(n,e,null),s=!0},p(a,r){const c={};r&1&&(c.parent=a[0]),n.$set(c)},i(a){s||(m(n.$$.fragment,a),s=!0)},o(a){I(n.$$.fragment,a),s=!1},d(a){a&&p(e),B(n)}}}function Re(t){let e,n,s,a,r,c,o,f,h,d,K;e=new Ye({}),s=new Ce({});let u=!t[2]&&q(t);const P=t[6].default,v=ne(P,t,t[5],null);return{c(){T(e.$$.fragment),n=H(),T(s.$$.fragment),a=H(),r=C("div"),u&&u.c(),c=H(),o=C("div"),v&&v.c(),this.h()},l(l){A(e.$$.fragment,l),n=M(l),A(s.$$.fragment,l),a=M(l),r=y(l,"DIV",{class:!0,style:!0});var g=_(r);u&&u.l(g),c=M(g),o=y(g,"DIV",{id:!0,class:!0,style:!0});var U=_(o);v&&v.l(U),U.forEach(p),g.forEach(p),this.h()},h(){i(o,"id","scrollable"),i(o,"class","page-content svelte-1vyg6jt"),i(o,"style",f="height: "+t[4]+"px; "+(t[1]?"overflow: hidden;":"")+";"),i(r,"class","page-wrapper svelte-1vyg6jt"),w(r,"height",t[4]+"px")},m(l,g){R(e,l,g),L(l,n,g),R(s,l,g),L(l,a,g),L(l,r,g),u&&u.m(r,null),O(r,c),O(r,o),v&&v.m(o,null),h=!0,d||(K=[x(r,"touchstart",function(){ce(V(t[3]))&&V(t[3]).apply(this,arguments)}),x(r,"touchend",Ee),x(r,"touchmove",ye)],d=!0)},p(l,[g]){t=l,t[2]?u&&(se(),I(u,1,1,()=>{u=null}),ae()):u?(u.p(t,g),g&4&&m(u,1)):(u=q(t),u.c(),m(u,1),u.m(r,c)),v&&v.p&&(!h||g&32)&&re(v,P,t,t[5],h?le(P,t[5],g,null):oe(t[5]),null),(!h||g&18&&f!==(f="height: "+t[4]+"px; "+(t[1]?"overflow: hidden;":"")+";"))&&i(o,"style",f),(!h||g&16)&&w(r,"height",t[4]+"px")},i(l){h||(m(e.$$.fragment,l),m(s.$$.fragment,l),m(u),m(v,l),h=!0)},o(l){I(e.$$.fragment,l),I(s.$$.fragment,l),I(u),I(v,l),h=!1},d(l){B(e,l),l&&p(n),B(s,l),l&&p(a),l&&p(r),u&&u.d(),v&&v.d(l),d=!1,ie(K)}}}function Be(t,e,n){let s;J(t,Z,d=>n(4,s=d));let{$$slots:a={},$$scope:r}=e,{parent:c=null}=e,{overflowHidden:o=!1}=e,{hideNav:f=!1}=e,{touchMode:h=te.CLICK_ONLY}=e;return z(()=>{G.set(!1)}),t.$$set=d=>{"parent"in d&&n(0,c=d.parent),"overflowHidden"in d&&n(1,o=d.overflowHidden),"hideNav"in d&&n(2,f=d.hideNav),"touchMode"in d&&n(3,h=d.touchMode),"$$scope"in d&&n(5,r=d.$$scope)},[c,o,f,h,s,r,a]}class $e extends N{constructor(e){super(),b(this,e,Be,Re,S,{parent:0,overflowHidden:1,hideNav:2,touchMode:3})}}export{$e as P,fe as S,te as T,xe as a,ke as e,Me as f,G as g,Z as h,De as l,he as p,He as s,ue as w};
