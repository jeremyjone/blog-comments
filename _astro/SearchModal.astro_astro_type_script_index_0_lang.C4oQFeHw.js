import{g as h,d as p}from"./utils.Cuxpda7C.js";const c=document.getElementById("search-modal"),i=document.getElementById("search-input-global"),y=document.getElementById("close-search"),m=document.querySelector(".search-overlay"),s=document.getElementById("search-results-global"),g=h()==="mac"?"Cmd+K":"Ctrl+K";i&&(i.placeholder=`搜索全站内容 (${g})...`);const u=[{key:"blog",label:"博客文章"},{key:"note",label:"笔记"}];let l=null;function f(){c&&(c.style.display="flex"),i?.focus(),v()}function d(){c&&(c.style.display="none")}window.addEventListener("keydown",e=>{(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),f()),e.key==="Escape"&&d()});y?.addEventListener("click",d);m?.addEventListener("click",d);window.openSearchModal=f;async function v(){if(!l)try{window.loadPagefind&&(l=await window.loadPagefind(),await l.init())}catch{console.warn("Pagefind not found. It only works in production build."),s&&(s.innerHTML='<div class="search-placeholder">搜索功能仅在构建后可用 (npm run build)</div>')}}async function w(e){if(!l||!e.trim()){s&&(s.innerHTML="");return}const a=await l.search(e),o=await Promise.all(a.results.map(n=>n.data())),t={};u.forEach(n=>{t[n.key]=[]}),t.other=[],o.forEach(n=>{const r=n.filters?.type?.[0];r&&t[r]?t[r].push(n):t.other.push(n)}),E(t)}function E(e){if(!s)return;let a="";const o=(t,n)=>!n||n.length===0?"":`
        <div class="search-group">
          <div class="search-group-title">${t}</div>
          ${n.map(r=>`
            <a href="${r.url}" class="search-result-item">
              <span class="search-result-title">${r.meta.title}</span>
              <span class="search-result-excerpt">${r.excerpt}</span>
            </a>
          `).join("")}
        </div>
      `;u.forEach(t=>{a+=o(t.label,e[t.key])}),a+=o("其他",e.other),a===""&&(a='<div class="search-placeholder">未找到相关内容</div>'),s.innerHTML=a}const k=p(e=>w(e),300);i?.addEventListener("input",e=>{const a=e.target.value;k(a)});
