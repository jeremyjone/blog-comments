const m={description:"A geek space for front-end developers",author:"JeremyJone",email:"jeremyjone@qq.com",url:"https://www.jeremyjone.com",terminal:{prompt:"jeremyjone@blog$ "}},S=["about.md","README.md","package.json","articles.txt","notes.txt"],T={cat:S},R={whoami:()=>`${m.author}
${m.description}`,pwd:()=>m.url,ls:()=>S.join("    "),help:()=>`Available commands:
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
  Uptime:    2 years`,date:()=>new Date().toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),clear:()=>{const o=document.getElementById("terminal-content");return o&&(o.innerHTML=""),""}};function D(o){const n=o.trim().substring(4).trim();return n==="about.md"?`# About Me

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
xxx`:`cat: ${n}: No such file or directory`}const I=["whoami","help"],N=m.terminal.prompt,j=I,y={...R,history:()=>u.length===0?"No command history":u.map((o,e)=>`  ${e+1}  ${o}`).join(`
`),cat:()=>""};function M(){return Object.keys(y).sort()}let g=[],f=-1,w="",u=[],d=-1,v=!1;function $(o){const e=o.trim();return e===""?"":e.startsWith("cat ")?D(e):e in y?y[e]():`zsh: command not found: ${e.split(" ")[0]}`}function B(o){const e=/(https?:\/\/[^\s]+|mailto:[^\s]+)/g;return(i=>{const t=document.createElement("div");return t.textContent=i,t.innerHTML})(o).replace(e,i=>`<a href="${i}" target="_blank" rel="noopener noreferrer">${i}</a>`)}function A(o){const e=document.getElementById("terminal-content");if(!e)return;const n=document.createElement("div");n.className="terminal-line output",n.innerHTML=B(o),e.appendChild(n),x()}function P(o=""){const e=document.getElementById("terminal-content");if(!e)return null;const n=document.createElement("div");n.className="terminal-line command";const i=document.createElement("span");i.className="prompt",i.textContent=N,n.appendChild(i);const t=document.createElement("span");return t.className="text-content",t.textContent=o,n.appendChild(t),e.appendChild(n),x(),{line:n,textSpan:t}}function x(){const o=document.querySelector(".terminal-body");o&&requestAnimationFrame(()=>{o.scrollTop=o.scrollHeight})}function k(o=!0){const e=document.getElementById("terminal-content");if(!e)return;const n=document.createElement("div");n.className="terminal-line input-line";const i=document.createElement("span");i.className="prompt",i.textContent=N,n.appendChild(i);const t=document.createElement("span");t.className="terminal-input",t.contentEditable="true",t.spellcheck=!1,n.appendChild(t);const s=document.createElement("span");s.className="cursor",s.textContent="█",n.appendChild(s);const r=document.createElement("span");r.className="suggestion",n.appendChild(r),e.appendChild(n),t.focus(),t.addEventListener("keydown",O),t.addEventListener("input",H);const a=()=>{if(!v&&t){const l=document.querySelector(".terminal-body"),c=l?.scrollTop||0;t.focus();const p=document.createRange(),h=window.getSelection();t.childNodes.length>0?p.setStart(t.childNodes[t.childNodes.length-1],t.textContent?.length||0):p.setStart(t,0),p.collapse(!0),h?.removeAllRanges(),h?.addRange(p),l&&c!==null&&(l.scrollTop=c)}};e.removeEventListener("click",a),e.addEventListener("click",a),o&&x()}function H(o){const e=o.target,n=e.parentElement;if(!n)return;const i=n.querySelector(".suggestion");if(!i)return;const t=e.textContent||"",s=t.trim();if(t!==w&&(f=-1,g=[],w=t),s){let r=[],a="",l=!1;for(const[c,p]of Object.entries(T)){const h=new RegExp(`^\\s*${c}\\s+(.*)$`),E=s.match(h);if(E){const C=E[1];C&&(r=p.filter(L=>L.startsWith(C)),a=`${c} ${C}`,l=!0);break}if(new RegExp(`^\\s*${c}\\s+$`).test(t)){r=p,a=`${c} `,l=!0;break}}if(l||(r=M().filter(c=>c.startsWith(s)),a=s),g=r,r.length>0&&r[0]!==s){const c=l?a.split(" ").pop()?.length||0:s.length;i.textContent=r[0].substring(c)}else i.textContent=""}else i.textContent="",g=[]}function O(o){const e=o.target,n=e.parentElement;if(!n)return;const i=n.querySelector(".suggestion");if(o.key==="Enter"){o.preventDefault();const t=e.textContent||"";t.trim()&&(u.push(t),d=u.length),e.contentEditable="false";const s=n.querySelector(".cursor");s&&s.remove(),i&&i.remove(),n.classList.remove("input-line");const r=$(t);r&&r.split(`
`).forEach(l=>A(l)),k()}else if(o.key==="Tab"){o.preventDefault();const s=e.textContent||"";if(!s)return;let r=null;for(const a of Object.keys(T))if(new RegExp(`^\\s*${a}\\s+`).test(s)){r=a;break}if(g.length>0){f=(f+1)%g.length;const a=g[f];r?e.textContent=`${r} ${a}`:e.textContent=a,i&&(i.textContent="");const l=document.createRange(),c=window.getSelection();e.childNodes.length>0?l.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):l.setStart(e,0),l.collapse(!0),c?.removeAllRanges(),c?.addRange(l),w=e.textContent}}else if(o.key==="ArrowUp"){if(o.preventDefault(),d>0){d--,e.textContent=u[d],i&&(i.textContent="");const t=document.createRange(),s=window.getSelection();e.childNodes.length>0?t.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):t.setStart(e,0),t.collapse(!0),s?.removeAllRanges(),s?.addRange(t)}}else if(o.key==="ArrowDown"){o.preventDefault(),d<u.length-1?(d++,e.textContent=u[d]):(d=u.length,e.textContent=""),i&&(i.textContent="");const t=document.createRange(),s=window.getSelection();e.childNodes.length>0?t.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):t.setStart(e,0),t.collapse(!0),s?.removeAllRanges(),s?.addRange(t)}}async function q(o,e){await new Promise(n=>setTimeout(n,1e3));for(let n=0;n<o.length;n++)e.textContent+=o[n],x(),await new Promise(i=>setTimeout(i,150));await new Promise(n=>setTimeout(n,500))}async function b(){v=!0;for(const o of j){const e=P();if(!e)break;const{line:n,textSpan:i}=e,t=document.createElement("span");t.className="cursor",t.textContent="█",n.appendChild(t),await q(o,i),await new Promise(r=>setTimeout(r,300)),t.remove();const s=$(o);s&&s.split(`
`).forEach(a=>A(a)),await new Promise(r=>setTimeout(r,500))}v=!1,k()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(b,300)}):setTimeout(b,300);
