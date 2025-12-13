const E=["about.md","README.md","package.json","articles.txt","notes.txt"],T={cat:E},L={whoami:()=>`Jeremy Jone
Full-stack Developer | Tech Blogger`,pwd:()=>"https://www.jeremyjone.com",ls:()=>E.join("    "),help:()=>`Available commands:
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
  Uptime:    2 years`,date:()=>new Date().toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0}),clear:()=>{const o=document.getElementById("terminal-content");return o&&(o.innerHTML=""),""}};function R(o){const n=o.trim().substring(4).trim();return n==="about.md"?`# About Me

Hi! I'm Jeremy Jone, a passionate developer who loves
building elegant solutions and sharing knowledge.

📧 Email: jeremyjone@qq.com
🌐 Blog: https://www.jeremyjone.com
💻 GitHub: @jeremyjone`:n==="README.md"?`# Welcome to My Blog
This is the personal blog of Jeremy Jone, where I share my
thoughts on programming, technology, and life.
Feel free to explore the articles and notes I've written!`:n==="package.json"?`{
    "name": "jeremyjone-blog",
    "version": "1.0.0",
    "description": "Personal blog of Jeremy Jone",
    "main": "index.js",
    "scripts": {
        "start": "astro dev",
        "build": "astro build",
        "preview": "astro preview"
    },
    "author": "Jeremy Jone",
    "license": "Belongs to me personally",
    "dependencies": {
        "astro": "^5.0.0"
    },
    "devDependencies": {
        "typescript": "^5.3.3"
    }
}`:n==="articles.txt"?`Articles List:
xxx`:n==="notes.txt"?`Notes List:
xxx`:`cat: ${n}: No such file or directory`}const D=["whoami","help"],S="jeremyjone@blog$ ",I=D,y={...L,history:()=>d.length===0?"No command history":d.map((o,e)=>`  ${e+1}  ${o}`).join(`
`),cat:()=>""};function $(){return Object.keys(y).sort()}let p=[],f=-1,C="",d=[],m=-1,w=!1;function N(o){const e=o.trim();return e===""?"":e.startsWith("cat ")?R(e):e in y?y[e]():`zsh: command not found: ${e.split(" ")[0]}`}function M(o){const e=/(https?:\/\/[^\s]+|mailto:[^\s]+)/g;return(s=>{const t=document.createElement("div");return t.textContent=s,t.innerHTML})(o).replace(e,s=>`<a href="${s}" target="_blank" rel="noopener noreferrer">${s}</a>`)}function j(o){const e=document.getElementById("terminal-content");if(!e)return;const n=document.createElement("div");n.className="terminal-line output",n.innerHTML=M(o),e.appendChild(n),h()}function B(o=""){const e=document.getElementById("terminal-content");if(!e)return null;const n=document.createElement("div");n.className="terminal-line command";const s=document.createElement("span");s.className="prompt",s.textContent=S,n.appendChild(s);const t=document.createElement("span");return t.className="text-content",t.textContent=o,n.appendChild(t),e.appendChild(n),h(),{line:n,textSpan:t}}function h(){const o=document.querySelector(".terminal-body");o&&requestAnimationFrame(()=>{o.scrollTop=o.scrollHeight})}function k(o=!0){const e=document.getElementById("terminal-content");if(!e)return;const n=document.createElement("div");n.className="terminal-line input-line";const s=document.createElement("span");s.className="prompt",s.textContent=S,n.appendChild(s);const t=document.createElement("span");t.className="terminal-input",t.contentEditable="true",t.spellcheck=!1,n.appendChild(t);const i=document.createElement("span");i.className="cursor",i.textContent="█",n.appendChild(i);const r=document.createElement("span");r.className="suggestion",n.appendChild(r),e.appendChild(n),t.focus(),t.addEventListener("keydown",H),t.addEventListener("input",P);const l=()=>{if(!w&&t){const a=document.querySelector(".terminal-body"),c=a?.scrollTop||0;t.focus();const u=document.createRange(),g=window.getSelection();t.childNodes.length>0?u.setStart(t.childNodes[t.childNodes.length-1],t.textContent?.length||0):u.setStart(t,0),u.collapse(!0),g?.removeAllRanges(),g?.addRange(u),a&&c!==null&&(a.scrollTop=c)}};e.removeEventListener("click",l),e.addEventListener("click",l),o&&h()}function P(o){const e=o.target,n=e.parentElement;if(!n)return;const s=n.querySelector(".suggestion");if(!s)return;const t=e.textContent||"",i=t.trim();if(t!==C&&(f=-1,p=[],C=t),i){let r=[],l="",a=!1;for(const[c,u]of Object.entries(T)){const g=new RegExp(`^\\s*${c}\\s+(.*)$`),v=i.match(g);if(v){const x=v[1];x&&(r=u.filter(A=>A.startsWith(x)),l=`${c} ${x}`,a=!0);break}if(new RegExp(`^\\s*${c}\\s+$`).test(t)){r=u,l=`${c} `,a=!0;break}}if(a||(r=$().filter(c=>c.startsWith(i)),l=i),p=r,r.length>0&&r[0]!==i){const c=a?l.split(" ").pop()?.length||0:i.length;s.textContent=r[0].substring(c)}else s.textContent=""}else s.textContent="",p=[]}function H(o){const e=o.target,n=e.parentElement;if(!n)return;const s=n.querySelector(".suggestion");if(o.key==="Enter"){o.preventDefault();const t=e.textContent||"";t.trim()&&(d.push(t),m=d.length),e.contentEditable="false";const i=n.querySelector(".cursor");i&&i.remove(),s&&s.remove(),n.classList.remove("input-line");const r=N(t);r&&r.split(`
`).forEach(a=>j(a)),k()}else if(o.key==="Tab"){o.preventDefault();const i=e.textContent||"";if(!i)return;let r=null;for(const l of Object.keys(T))if(new RegExp(`^\\s*${l}\\s+`).test(i)){r=l;break}if(p.length>0){f=(f+1)%p.length;const l=p[f];r?e.textContent=`${r} ${l}`:e.textContent=l,s&&(s.textContent="");const a=document.createRange(),c=window.getSelection();e.childNodes.length>0?a.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):a.setStart(e,0),a.collapse(!0),c?.removeAllRanges(),c?.addRange(a),C=e.textContent}}else if(o.key==="ArrowUp"){if(o.preventDefault(),m>0){m--,e.textContent=d[m],s&&(s.textContent="");const t=document.createRange(),i=window.getSelection();e.childNodes.length>0?t.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):t.setStart(e,0),t.collapse(!0),i?.removeAllRanges(),i?.addRange(t)}}else if(o.key==="ArrowDown"){o.preventDefault(),m<d.length-1?(m++,e.textContent=d[m]):(m=d.length,e.textContent=""),s&&(s.textContent="");const t=document.createRange(),i=window.getSelection();e.childNodes.length>0?t.setStart(e.childNodes[e.childNodes.length-1],e.textContent?.length||0):t.setStart(e,0),t.collapse(!0),i?.removeAllRanges(),i?.addRange(t)}}async function J(o,e){await new Promise(n=>setTimeout(n,1e3));for(let n=0;n<o.length;n++)e.textContent+=o[n],h(),await new Promise(s=>setTimeout(s,150));await new Promise(n=>setTimeout(n,500))}async function b(){w=!0;for(const o of I){const e=B();if(!e)break;const{line:n,textSpan:s}=e,t=document.createElement("span");t.className="cursor",t.textContent="█",n.appendChild(t),await J(o,s),await new Promise(r=>setTimeout(r,300)),t.remove();const i=N(o);i&&i.split(`
`).forEach(l=>j(l)),await new Promise(r=>setTimeout(r,500))}w=!1,k()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(b,300)}):setTimeout(b,300);
