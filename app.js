(() => {
 const tools=window.ATLAS_TOOLS||[], search=document.querySelector("#searchInput"), filters=document.querySelector("#filters"), grid=document.querySelector("#toolGrid"), featured=document.querySelector("#featuredGrid"), empty=document.querySelector("#emptyState"), count=document.querySelector("#resultCount");
 let category="Alles";
 const categories=["Alles",...new Set(tools.map(t=>t.category))];
 const card=t=>{const tags=t.tags.map(x=>'<span class="tag">'+x+'</span>').join("");const badge=t.type==="ATLAS"?"badge atlas":"badge";const attrs=t.url?'href="'+t.url+'"':'aria-disabled="true"';return '<a class="tool-card '+(!t.url?'disabled':'')+'" '+attrs+'><div class="card-top"><span class="icon">'+t.icon+'</span><span class="'+badge+'">'+(t.status==="soon"?"Binnenkort":t.type)+'</span></div><h3>'+t.title+'</h3><p>'+t.description+'</p><div class="card-meta">'+tags+'</div></a>'};
 const render=()=>{const q=search.value.trim().toLowerCase();const matches=tools.filter(t=>(category==="Alles"||t.category===category)&&(!q||[t.title,t.description,t.category,...t.tags].join(" ").toLowerCase().includes(q)));grid.innerHTML=matches.map(card).join("");empty.hidden=matches.length>0;count.textContent=matches.length+" "+(matches.length===1?"resultaat":"resultaten");featured.parentElement.hidden=!!q||category!=="Alles";};
 filters.innerHTML=categories.map((c,i)=>'<button class="filter '+(i===0?"active":"")+'" data-category="'+c+'">'+c+'</button>').join("");
 filters.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;category=b.dataset.category;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));render()});
 search.addEventListener("input",render);document.addEventListener("keydown",e=>{if(e.key==="/"&&document.activeElement!==search){e.preventDefault();search.focus()}});
 featured.innerHTML=tools.filter(t=>t.featured).slice(0,6).map(card).join("");render();
 let deferred;const install=document.querySelector("#installButton");window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;install.hidden=false});install.addEventListener("click",async()=>{if(!deferred)return;deferred.prompt();await deferred.userChoice;deferred=null;install.hidden=true});
 if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
})();