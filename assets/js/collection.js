/* Page catégorie / collection */
(function(){
const { $, $$, IMG, card, initReveal, catName, store, icon, esc } = window.SL;
const P = window.SL_PRODUCTS, CATS = window.SL_CATS, COLS = window.SL_COLLECTIONS;
const qs = new URLSearchParams(location.search);
const key = qs.get("c") || "colliers";
let sub = qs.get("s") || "";

const isCat = !!CATS[key], isCol = !!COLS[key], isFav = key === "favoris";
const meta = isCat ? CATS[key] : isCol ? COLS[key] : { fr:"Mes favoris", ar:"المفضلة", img:"lifestyle-lin", desc:"Les bijoux que vous avez mis de côté." };
const base = () => {
  if(isCat) return P.filter(p => p.cat === key);
  if(key === "nouveautes") return P.filter(p => p.tags.includes("new"));
  if(key === "best-sellers") return P.filter(p => p.tags.includes("best"));
  if(key === "ocean") return P.filter(p => p.tags.includes("ocean"));
  if(key === "promotions") return P.filter(p => p.old);
  if(isFav) return P.filter(p => window.SL.favs.includes(p.id));
  return P;
};
document.title = `${meta.fr} — Sirène Luxury`;
document.body.dataset.cat = key;
const navA = $(`.nav-link[href="collection.html?c=${key}"]`); if(navA) navA.classList.add("is-active");

$("#phero").innerHTML = `<img src="${IMG(meta.img)}" alt="" fetchpriority="high"><div class="container phero__in">
  <nav class="crumbs" style="color:rgba(250,247,242,.7);padding:0"><a href="index.html">Accueil</a><span>/</span><span style="color:#fff">${catName(key) || meta.fr}</span></nav>
  <h1 class="h-display" style="font-size:clamp(44px,7vw,80px)">${window.SL.lang==="ar" ? meta.ar : meta.fr}</h1><p>${meta.desc}</p></div>`;

const subs = isCat ? CATS[key].subs : [];
const sw = { gold:"Doré", silver:"Argenté", rose:"Or rose" };
const state = { colors:new Set(), max:1000, stock:false, sort:"feat", sub };

function filtered(){
  let list = base().filter(p => !state.sub || p.sub === state.sub)
    .filter(p => !state.colors.size || (p.colors||[]).some(c => state.colors.has(c)))
    .filter(p => p.price <= state.max)
    .filter(p => !state.stock || p.stock > 0);
  const s = state.sort;
  if(s === "asc") list.sort((a,b)=>a.price-b.price);
  if(s === "desc") list.sort((a,b)=>b.price-a.price);
  if(s === "new") list.sort((a,b)=>(b.tags.includes("new"))-(a.tags.includes("new")));
  if(s === "rating") list.sort((a,b)=>b.reviews-a.reviews);
  if(s === "feat") list.sort((a,b)=>(a.stock===0)-(b.stock===0));
  return list;
}
function filtersHtml(){
  const all = base();
  return `${subs.length ? `<div class="fgroup"><h5>Catégorie</h5>${["", ...subs].map(s=>`<label class="fopt"><input type="radio" name="sub" value="${esc(s)}" ${state.sub===s?"checked":""}> ${s||"Tout"} <small>${all.filter(p=>!s||p.sub===s).length}</small></label>`).join("")}</div>`:""}
  <div class="fgroup"><h5>Couleur</h5>${Object.keys(sw).map(c=>`<label class="fopt"><input type="checkbox" name="color" value="${c}" ${state.colors.has(c)?"checked":""}> <span class="sw sw--${c}"></span> ${sw[c]} <small>${all.filter(p=>(p.colors||[]).includes(c)).length}</small></label>`).join("")}</div>
  <div class="fgroup"><h5>Prix maximum : <span data-maxlbl>${state.max} DH</span></h5><input class="range" type="range" name="max" min="100" max="1000" step="10" value="${state.max}"><div class="fopt" style="justify-content:space-between;color:var(--muted);font-size:12px"><span>100 DH</span><span>1 000 DH</span></div></div>
  <div class="fgroup"><label class="fopt"><input type="checkbox" name="stock" ${state.stock?"checked":""}> Disponible uniquement</label></div>`;
}
function render(){
  const list = filtered();
  $("#count").textContent = `${list.length} bijou${list.length>1?"x":""}`;
  $$(".subcats .chip").forEach(c => c.classList.toggle("is-active", c.dataset.sub === state.sub));
  let html = list.map((p,i)=>`<div class="reveal reveal-d${i%3}">${card(p)}</div>`);
  if(list.length > 5 && !isFav){
    html.splice(4, 0, `<a href="produit.html?id=parure-selma" class="promo-tile reveal"><img src="${IMG("look-caftan")}" alt="" loading="lazy"><div><span class="eyebrow" style="color:var(--gold-l)">Offre parure</span><h3>-15 % sur la parure complète</h3><span class="link-u" style="color:#fff">Composer ma parure</span></div></a>`);
  }
  $("#grid").innerHTML = html.join("") || `<div class="empty"><p class="drawer__title">${isFav ? "Vous n'avez pas encore de favoris." : "Aucun bijou ne correspond à ces filtres."}</p><a class="btn btn--ghost" href="collection.html?c=nouveautes" style="margin-top:16px">Voir les nouveautés</a></div>`;
  initReveal($("#grid"));
}
$("#subcats").innerHTML = subs.length ? ["", ...subs].map(s=>`<button class="chip" data-sub="${esc(s)}">${s||"Tout voir"}</button>`).join("") : Object.keys(COLS).concat(["montres"]).map(k=>`<a class="chip ${k===key?"is-active":""}" href="collection.html?c=${k}">${catName(k)}</a>`).join("");
$("#filters").innerHTML = filtersHtml();
$("#filtersM").innerHTML = filtersHtml().replace(/name="sub"/g,'name="subm"');

function bindFilters(root){
  root.addEventListener("change", e => {
    const el = e.target;
    if(el.name === "sub" || el.name === "subm") state.sub = el.value;
    if(el.name === "color"){ el.checked ? state.colors.add(el.value) : state.colors.delete(el.value); }
    if(el.name === "stock") state.stock = el.checked;
    render();
  });
  root.addEventListener("input", e => { if(e.target.name === "max"){ state.max = +e.target.value; $$("[data-maxlbl]").forEach(l=>l.textContent = state.max+" DH"); render(); } });
}
bindFilters($("#filters")); bindFilters($("#filtersM"));
$("#subcats").addEventListener("click", e => { const c = e.target.closest("[data-sub]"); if(!c) return; state.sub = c.dataset.sub; $("#filters").innerHTML = filtersHtml(); render(); });
$("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
$("#filterBtn").addEventListener("click", () => { $("#filterDrawer").classList.add("is-open"); document.body.classList.add("is-locked"); });
$("#filterDrawer").addEventListener("click", e => { if(e.target.closest("[data-fclose]")){ $("#filterDrawer").classList.remove("is-open"); document.body.classList.remove("is-locked"); } });
render();
})();
