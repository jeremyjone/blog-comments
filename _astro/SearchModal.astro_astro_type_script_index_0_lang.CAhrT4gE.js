import{g as m,d as v}from"./utils.Cuxpda7C.js";let i,s,u,f,l;const p=[{key:"blog",label:"博客文章"},{key:"note",label:"笔记"}];let c=null;function y(){i&&(i.style.display="flex"),s?.focus(),g()}function d(){i&&(i.style.display="none")}function h(e){(e.metaKey||e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),y()),e.key==="Escape"&&d()}async function g(){if(!c)try{window.loadPagefind&&(c=await window.loadPagefind(),await c.init())}catch{console.warn("Pagefind not found. It only works in production build."),l&&(l.innerHTML='<div class="search-placeholder">搜索功能仅在构建后可用 (npm run build)</div>')}}async function w(e){if(!c||!e.trim()){l&&(l.innerHTML="");return}const a=await c.search(e),o=await Promise.all(a.results.map(n=>n.data())),t={};p.forEach(n=>{t[n.key]=[]}),t.other=[],o.forEach(n=>{const r=n.filters?.type?.[0];r&&t[r]?t[r].push(n):t.other.push(n)}),E(t)}function E(e){if(!l)return;let a="";const o=(t,n)=>!n||n.length===0?"":`
        <div class="search-group">
          <div class="search-group-title">${t}</div>
          ${n.map(r=>`
            <a href="${r.url}" class="search-result-item">
              <span class="search-result-title">${r.meta.title}</span>
              <span class="search-result-excerpt">${r.excerpt}</span>
            </a>
          `).join("")}
        </div>
      `;p.forEach(t=>{a+=o(t.label,e[t.key])}),a+=o("其他",e.other),a===""&&(a='<div class="search-placeholder">未找到相关内容</div>'),l.innerHTML=a}const k=v(e=>w(e),300);function b(){i=document.getElementById("search-modal"),s=document.getElementById("search-input-global"),u=document.getElementById("close-search"),f=document.querySelector(".search-overlay"),l=document.getElementById("search-results-global");const e=m()==="mac"?"Cmd+K":"Ctrl+K";s&&(s.placeholder=`搜索全站内容 (${e})...`),u?.addEventListener("click",d),f?.addEventListener("click",d),s?.addEventListener("input",a=>{const o=a.target.value;k(o)}),window.openSearchModal=y,window.removeEventListener("keydown",h),window.addEventListener("keydown",h)}document.addEventListener("astro:page-load",b);
