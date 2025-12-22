const m={description:"A geek space for front-end developers",author:"JeremyJone",email:"jeremyjone@qq.com",url:"https://www.jeremyjone.com",terminal:{prompt:"jeremyjone@blog$ "}},$=["about.md","README.md","package.json","articles.txt","notes.txt"],L={cat:$},j={whoami:()=>`${m.author}
${m.description}`,pwd:()=>m.url,ls:()=>$.join("    "),help:()=>`Available commands:
`+`
  whoami          Display user information
  pwd             Print blog URL
  ls              List directory contents
  ps              Show blog statistics
  cat <file>      Display file contents
  clear           Clear terminal screen
  history         Show command history
  date            Show current date and time
  help            Show this help message`.split(`
`).sort().join(`
`),ps:()=>`BLOG STATISTICS
  Articles:  42
  Notes:     28
  Tags:      15
  Views:     10,000+
  Uptime:    2 years`,date:()=>new Date().toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),clear:()=>{const o=document.getElementById("terminal-content");return o&&(o.innerHTML=""),""}};function B(o){const n=o.trim().substring(4).trim();return n==="about.md"?`# About Me

Hi! I'm ${m.author}, a passionate developer who loves
building elegant solutions and sharing knowledge.

📧 Email: ${m.email}
🌐 Blog: ${m.url}
💻 GitHub: @${m.author}`:n==="README.md"?`# Welcome to My Blog
This is the personal blog of ${m.author}, where I share my
thoughts on programming, technology, and life.
Feel free to explore the articles and notes I've written!`:n==="package.json"?`{
    "name": "${m.author}'s blog",
    "version": "1.0.0",
    "description": "${m.description}",
    "main": "index.js",
    "scripts": {
        "start": "astro dev",
        "build": "astro build",
        "preview": "astro preview"
    },
    "author": "${m.author}",
    "license": "Belongs to ${m.author}",
    "dependencies": {
        "astro": "^5.0.0"
    },
    "devDependencies": {
        "typescript": "^5.3.3"
    }
}`:n==="articles.txt"?`Articles List:
xxx`:n==="notes.txt"?`Notes List:
xxx`:`cat: ${n}: No such file or directory`}const M=["whoami","help"],A=m.terminal.prompt,N=M,v={...j,history:()=>u.length===0?"No command history":u.map((o,e)=>`  ${e+1}  ${o}`).join(`
`),cat:()=>""};function H(){return Object.keys(v).sort()}let g=[],x=-1,S="",u=[],p=-1,y=!1,f=!1,h=0;function k(o){const e=o.trim();return e===""?"":e.startsWith("cat ")?B(e):e in v?v[e]():`zsh: command not found: ${e.split(" ")[0]}`}function P(o){const e=/(https?:\/\/[^\s]+|mailto:[^\s]+)/g;return(r=>{const t=document.createElement("div");return t.textContent=r,t.innerHTML})(o).replace(e,r=>`<a href="${r}" target="_blank" rel="noopener noreferrer">${r}</a>`)}function I(o){const e=document.getElementById("terminal-content");if(!e)return;const n=document.createElement("div");n.className="terminal-line output",n.innerHTML=P(o),e.appendChild(n),w()}function q(o=""){const e=document.getElementById("terminal-content");if(!e)return null;const n=document.createElement("div");n.className="terminal-line command";const r=document.createElement("span");r.className="prompt",r.textContent=A,n.appendChild(r);const t=document.createElement("span");return t.className="text-content",t.textContent=o,n.appendChild(t),e.appendChild(n),w(),{line:n,textSpan:t}}function w(){const o=document.querySelector(".terminal-body");o&&requestAnimationFrame(()=>{o.scrollTop=o.scrollHeight})}function R(o=!0){const e=document.getElementById("terminal-content");if(!e)return;const n=document.createElement("div");n.className="terminal-line input-line";const r=document.createElement("span");r.className="prompt",r.textContent=A,n.appendChild(r);const t=document.createElement("span");t.className="terminal-input",t.contentEditable="true",t.spellcheck=!1,n.appendChild(t);const s=document.createElement("span");s.className="cursor",s.textContent="█",n.appendChild(s);const i=document.createElement("span");i.className="suggestion",n.appendChild(i),e.appendChild(n),t.focus(),t.addEventListener("keydown",F),t.addEventListener("input",O);const a=()=>{if(!y&&t){const l=document.querySelector(".terminal-body"),c=l?.scrollTop||0;t.focus();const d=document.createRange(),C=window.getSelection();t.childNodes.length>0?d.setStart(t.childNodes[t.childNodes.length-1],t.textContent?.length||0):d.setStart(t,0),d.collapse(!0),C?.removeAllRanges(),C?.addRange(d),l&&c!==null&&(l.scrollTop=c)}};e.removeEventListener("click",a),e.addEventListener("click",a),o&&w()}function O(o){const e=o.target,n=e.parentElement;if(!n)return;const r=n.querySelector(".suggestion");if(!r)return;const t=e.textContent||"",s=t.trim();if(t!==S&&(x=-1,g=[],S=t),s){let i=[],a="",l=!1;for(const[c,d]of Object.entries(L)){const C=new RegExp(`^\\s*${c}\\s+(.*)$`),T=s.match(C);if(T){const E=T[1];E&&(i=d.filter(D=>D.startsWith(E)),a=`${c} ${E}`,l=!0);break}if(new RegExp(`^\\s*${c}\\s+$`).test(t)){i=d,a=`${c} `,l=!0;break}}if(l||(i=H().filter(c=>c.startsWith(s)),a=s),g=i,i.length>0&&i[0]!==s){const c=l?a.split(" ").pop()?.length||0:s.length;r.textContent=i[0].substring(c)}else r.textContent=""}else r.textContent="",g=[]}function F(o){const e=o.target,n=e.parentElement;if(!n)return;const r=n.querySelector(".suggestion");if(o.key==="Enter"){o.preventDefault();const t=e.textContent||"";t.trim()&&(u.push(t),p=u.length),e.contentEditable="false";const s=n.querySelector(".cursor");s&&s.remove(),r&&r.remove(),n.classList.remove("input-line");const i=k(t);i&&i.split(`
`).forEach(l=>I(l)),R()}else if(o.key==="Tab"){o.preventDefault();const s=e.textContent||"";if(!s)return;let i=null;for(const a of Object.keys(L))if(new RegExp(`^\\s*${a}\\s+`).test(s)){i=a;break}if(g.length>0){x=(x+1)%g.length;const a=g[x];i?e.textContent=`${i} ${a}`:e.textContent=a,r&&(r.textContent="");const l=document.createRange(),c=window.getSelection();e.childNodes.length>0?l.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):l.setStart(e,0),l.collapse(!0),c?.removeAllRanges(),c?.addRange(l),S=e.textContent}}else if(o.key==="ArrowUp"){if(o.preventDefault(),p>0){p--,e.textContent=u[p],r&&(r.textContent="");const t=document.createRange(),s=window.getSelection();e.childNodes.length>0?t.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):t.setStart(e,0),t.collapse(!0),s?.removeAllRanges(),s?.addRange(t)}}else if(o.key==="ArrowDown"){o.preventDefault(),p<u.length-1?(p++,e.textContent=u[p]):(p=u.length,e.textContent=""),r&&(r.textContent="");const t=document.createRange(),s=window.getSelection();e.childNodes.length>0?t.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):t.setStart(e,0),t.collapse(!0),s?.removeAllRanges(),s?.addRange(t)}}async function J(o,e){if(await new Promise(n=>setTimeout(n,1e3)),!f){for(let n=0;n<o.length;n++){if(f)return;e.textContent+=o[n],w(),await new Promise(r=>setTimeout(r,150))}await new Promise(n=>setTimeout(n,500))}}const b="terminal-history-cache";function U(){const o=document.getElementById("terminal-content");if(!o)return;const e=o.cloneNode(!0),n=e.querySelector(".input-line");if(n&&n.remove(),e.querySelectorAll(".cursor").forEach(t=>t.remove()),y){const t=e.lastElementChild;t&&t.classList.contains("command")&&t.remove()}sessionStorage.setItem(b,JSON.stringify({html:e.innerHTML,history:u,autoCmdCount:h}))}function W(){const o=sessionStorage.getItem(b);if(!o)return!1;try{const{html:e,history:n,autoCmdCount:r}=JSON.parse(o),t=document.getElementById("terminal-content");return t?(t.innerHTML=e,u=n||[],p=u.length,h=r||0,sessionStorage.removeItem(b),!0):!1}catch(e){return console.error("Failed to restore terminal state",e),!1}}async function _(){const o=document.getElementById("terminal-content");if(!o)return;W()||(o.innerHTML="",h=0),y=!0;for(let n=0;n<N.length&&!f;n++){if(n<h)continue;const r=N[n],t=q();if(!t)break;const{line:s,textSpan:i}=t,a=document.createElement("span");if(a.className="cursor",a.textContent="█",s.appendChild(a),await J(r,i),f||(await new Promise(c=>setTimeout(c,300)),f))break;a.remove();const l=k(r);l&&l.split(`
`).forEach(d=>I(d)),h++,await new Promise(c=>setTimeout(c,500))}y=!1,!f&&R()}function z(){f=!1,setTimeout(_,300)}document.addEventListener("astro:page-load",()=>{document.getElementById("terminal-content")&&z()});document.addEventListener("astro:before-swap",()=>{f=!0,U()});
