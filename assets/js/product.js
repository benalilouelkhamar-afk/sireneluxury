/* Fiche produit */
(function(){
const { $, $$, IMG, fmt, icon, stars, card, byId, addToCart, waLink, initReveal, initCarousel, ruleSvg, t, catName, COLOR_LABEL, toggleFav, openCart, esc } = window.SL;
const P = window.SL_PRODUCTS, C = window.SL_CONFIG;
const id = new URLSearchParams(location.search).get("id") || "selma";
const p = byId(id) || byId("selma");
document.title = `${p.name} — ${p.type} | Sirène Luxury`;
const nav = $(`.nav-link[href="collection.html?c=${p.cat}"]`); if(nav) nav.classList.add("is-active");

const sel = { color:(p.colors||["gold"])[0], size:p.sizes?p.sizes[0]:"", variant:p.variants?p.variants[0]:"", qty:1 };
const out = p.stock === 0;
const off = p.old ? Math.round((1-p.price/p.old)*100) : 0;

/* Galerie : photos (complétées jusqu'à 5) + vidéo portée */
const extra = ["lifestyle-lin","poignet-bracelets","look-caftan","lifestyle-montre"];
const photos = p.imgs.slice(); extra.forEach(e => { if(photos.length < 5 && !photos.includes(e)) photos.push(e); });
const videoPoster = ["colliers","boucles"].includes(p.cat) ? "lifestyle-lin" : p.cat === "montres" ? "lifestyle-montre" : "poignet-bracelets";
const media = photos.map(src => ({type:"img", src})).concat([{type:"video", src:videoPoster}]);

const descs = {
  colliers:"Une chaîne délicate, pensée pour se porter seule ou en accumulation. Son fermoir mousqueton et sa chaînette d'extension de 5 cm permettent d'ajuster la longueur au décolleté.",
  bracelets:"Un bracelet à l'éclat chaud, à porter seul pour un style épuré ou en accumulation avec vos joncs préférés. Fermoir sécurisé, finitions polies à la main.",
  bagues:"Une bague confortable au quotidien, aux arêtes adoucies et au poli miroir. Disponible en plusieurs tailles ou en version réglable.",
  boucles:"Des boucles légères, confortables du matin au soir, avec tiges en acier chirurgical pour les oreilles sensibles.",
  parures:"Un ensemble harmonieux, présenté dans notre écrin signature. La parure complète bénéficie automatiquement de -15 % par rapport aux pièces achetées séparément.",
  montres:"Une montre-bijou au mouvement quartz japonais, au boîtier doré et au cadran lumineux, à la frontière de l'horlogerie et de la joaillerie."
};

$("#crumbs").innerHTML = `<a href="index.html">Accueil</a><span>/</span><a href="collection.html?c=${p.cat}">${catName(p.cat)}</a><span>/</span><span>${esc(p.name)}</span>`;
$("#pdp").innerHTML = `
<div class="gallery">
  <div class="gallery__thumbs" role="tablist">${media.map((m,i)=>`<button class="${i===0?"is-active":""}" data-g="${i}" aria-label="${m.type==="video"?"Vidéo portée":"Photo "+(i+1)}"><img src="${IMG(m.src)}" alt="" loading="lazy">${m.type==="video"?`<span class="play">${icon("play")}</span>`:""}</button>`).join("")}</div>
  <div class="gallery__main" id="gMain"><img src="${IMG(media[0].src)}" alt="${esc(p.name)} — ${esc(p.type)}" id="gImg">
    ${p.old?`<span class="pbadge pbadge--promo">-${off} %</span>`:p.tags.includes("new")?`<span class="pbadge">Nouveau</span>`:p.tags.includes("best")?`<span class="pbadge pbadge--best">Best-seller</span>`:""}
    <span class="gallery__hint">${icon("zoom")} Survolez pour zoomer</span></div>
</div>
<div class="pinfo">
  <div><span class="eyebrow">${catName(p.cat)} · ${esc(p.sub)}</span>
  <h1 class="pinfo__title" style="margin-top:8px">${esc(p.name)}</h1>
  <p class="muted" style="margin:4px 0 0">${esc(p.type)} — ${esc(p.mat)}</p></div>
  <div class="pinfo__meta">${stars(p.rating)}<a href="#avis" style="text-decoration:underline">${p.rating.toString().replace(".",",")} · ${p.reviews} avis</a><span>·</span><span>Réf. SL-${p.id.toUpperCase().slice(0,6)}</span></div>
  <div class="pinfo__price"><span class="${p.old?"price-now--promo":""}">${fmt(p.price)}</span>${p.old?`<span class="price-old">${fmt(p.old)}</span><span class="save">Économisez ${fmt(p.old-p.price)}</span>`:""}</div>
  <p class="fine" style="margin:-8px 0 0">Ou payez à la livraison · Livraison offerte dès ${fmt(C.freeShipping)}</p>
  <div style="height:1px;background:var(--line-gold)"></div>
  ${p.variants?`<div class="opt"><h6>Pierre <span id="vLbl">${sel.variant}</span></h6><div class="sizes">${p.variants.map((v,i)=>`<button class="size ${i===0?"is-active":""}" data-variant="${v}">${v}</button>`).join("")}</div></div>`:""}
  <div class="opt"><h6>${t("pdp.color")} <span id="cLbl">${COLOR_LABEL[sel.color]}</span></h6><div class="colors">${["gold","silver","rose"].map(c=>{ const av = (p.colors||[]).includes(c); return `<button class="color ${c===sel.color?"is-active":""}" data-color="${c}" ${av?"":"disabled style=\"opacity:.35;cursor:not-allowed\" title=\"Indisponible\""}><span class="sw sw--${c}"></span>${COLOR_LABEL[c]}</button>`; }).join("")}</div></div>
  ${p.sizes?`<div class="opt"><h6>${t("pdp.size")} <a href="guide-tailles.html">${t("pdp.guide")}</a></h6><div class="sizes">${p.sizes.map((s,i)=>`<button class="size ${i===0?"is-active":""}" data-size="${s}">${s}</button>`).join("")}</div></div>`:""}
  <div class="stock ${out?"is-out":p.stock<=5?"is-low":""}"><i></i>${out?"Rupture de stock — prévenez-moi au retour":p.stock<=5?`Plus que ${p.stock} pièces disponibles`:"En stock · expédié sous 24 h"}</div>
  <div class="buy">
    <div class="buy__row"><div class="qty"><button data-qty="-1" aria-label="Diminuer">${icon("minus")}</button><span id="qtyV">1</span><button data-qty="1" aria-label="Augmenter">${icon("plus")}</button></div>
    <button class="btn btn--wa btn--lg" id="buyNow" ${out?"disabled style=\"opacity:.5\"":""}>${out?"":icon("wa")}<span>${out?t("card.out"):"Commander maintenant"}</span></button></div>
    <button class="btn btn--ghost btn--lg btn--block" id="addBtn" ${out?"disabled style=\"opacity:.5\"":""}>${icon("bag")}<span>${t("pdp.add")}</span></button>
    <p class="buy__cod">${icon("cash")} Paiement à la livraison · ${p.price >= C.freeShipping ? "Livraison offerte" : `Livraison ${fmt(C.shippingFee)}, offerte dès ${fmt(C.freeShipping)}`}</p>
    <button class="link-u" id="favBtn" style="justify-self:center;margin-top:4px">${icon("heart")} <span>${window.SL.favs.includes(p.id)?"Dans vos favoris":"Ajouter aux favoris"}</span></button>
  </div>
  <div class="perks">
    <div>${icon("sparkle")}Ne noircit pas</div><div>${icon("drop")}Résiste à l'eau</div>
    <div>${icon("shield")}Hypoallergénique</div><div>${icon("truck")}Livraison 24 à 72 h</div>
  </div>
  <div class="tabs">
    <details open><summary>${t("pdp.desc")} ${icon("plus")}</summary><div class="tab-b"><p style="margin-top:0">${descs[p.cat]}</p><ul><li>Matière : ${esc(p.mat)}</li><li>Finition : plaquage or 18 carats, poli miroir</li><li>Livré dans son écrin Sirène Luxury</li>${p.bundle?`<li>Contenu : ${p.bundle.map(b=>byId(b).name+" ("+byId(b).type.toLowerCase()+")").join(", ")}</li>`:""}</ul></div></details>
    <details><summary>${t("pdp.care")} ${icon("plus")}</summary><div class="tab-b"><p style="margin-top:0">L'acier inoxydable 316L et le Xuping ne noircissent pas, ne rouillent pas et résistent à l'eau, au parfum et à la transpiration.</p><ul><li>Essuyez avec la chamoisine offerte pour raviver l'éclat.</li><li>Rangez chaque bijou séparément dans son pochon.</li><li>Évitez le contact avec le chlore concentré et les produits abrasifs.</li></ul><a href="entretien.html" style="text-decoration:underline">Lire le guide d'entretien complet</a></div></details>
    <details><summary>${t("pdp.ship")} ${icon("plus")}</summary><div class="tab-b"><ul style="margin-top:0"><li>Livraison partout au Maroc en 24 à 72 h.</li><li>${fmt(C.shippingFee)}, offerte dès ${fmt(C.freeShipping)} d'achat.</li><li>Paiement à la livraison, confirmation par appel ou WhatsApp.</li><li>Échange gratuit sous 7 jours (bijou non porté, dans son emballage).</li></ul><a href="livraison.html" style="text-decoration:underline">Livraison et échanges</a></div></details>
  </div>
  <div class="share">Partager : <a href="#" id="shareWa">${icon("wa")}</a><a href="${C.instagram}" target="_blank" rel="noopener">${icon("insta")}</a><a href="#" id="shareCopy" style="text-decoration:underline">Copier le lien</a></div>
</div>`;

/* Gallery behaviour */
const gMain = $("#gMain");
function showMedia(i){
  $$(".gallery__thumbs button").forEach((b,k)=>b.classList.toggle("is-active",k===i));
  const m = media[i];
  const old = gMain.querySelector(".vid"); if(old) old.remove();
  if(m.type === "video"){
    // Emplacement vidéo portée : remplacer par <video src="…mp4" autoplay muted loop playsinline>
    gMain.insertAdjacentHTML("beforeend", `<div class="vid"><img src="${IMG(m.src)}" alt="Vidéo portée"><span class="vid__lbl"><i></i>Vidéo portée</span></div>`);
  } else { $("#gImg").src = IMG(m.src); }
}
$$(".gallery__thumbs button").forEach(b => b.addEventListener("click", () => showMedia(+b.dataset.g)));
gMain.addEventListener("mousemove", e => { if(gMain.querySelector(".vid")) return; const r = gMain.getBoundingClientRect(); $("#gImg").style.transformOrigin = `${(e.clientX-r.left)/r.width*100}% ${(e.clientY-r.top)/r.height*100}%`; gMain.classList.add("is-zoom"); });
gMain.addEventListener("mouseleave", () => gMain.classList.remove("is-zoom"));
let gi = 0, x0 = null;
gMain.addEventListener("touchstart", e => x0 = e.touches[0].clientX, {passive:true});
gMain.addEventListener("touchend", e => { if(x0===null) return; const dx = e.changedTouches[0].clientX - x0; if(Math.abs(dx)>40){ gi = (gi + (dx<0?1:-1) + media.length) % media.length; showMedia(gi); } x0 = null; });

/* Options */
const selItem = () => ({ id:p.id, color:sel.color, size:sel.size, variant:sel.variant, qty:sel.qty });
function waMsg(){ const it = [selItem()]; return window.SL.orderMessage(it, window.SL.totalsFor(it, false)) + "\n" + location.href.split("#")[0]; }
function syncWa(){ $$("#waBtn").forEach(a => a.href = waLink(waMsg())); }
document.addEventListener("click", e => {
  const c = e.target.closest("[data-color]"); if(c && !c.disabled){ sel.color = c.dataset.color; $$("[data-color]").forEach(x=>x.classList.toggle("is-active",x===c)); $("#cLbl").textContent = COLOR_LABEL[sel.color]; syncWa(); }
  const s = e.target.closest("[data-size]"); if(s){ sel.size = s.dataset.size; $$("[data-size]").forEach(x=>x.classList.toggle("is-active",x===s)); syncWa(); }
  const v = e.target.closest("[data-variant]"); if(v){ sel.variant = v.dataset.variant; $$("[data-variant]").forEach(x=>x.classList.toggle("is-active",x===v)); $("#vLbl").textContent = sel.variant; syncWa(); }
  const q = e.target.closest("[data-qty]"); if(q){ sel.qty = Math.max(1, Math.min(10, sel.qty + +q.dataset.qty)); $("#qtyV").textContent = sel.qty; syncWa(); }
});
syncWa();
const doAdd = () => { if(out) return; addToCart(p.id, sel, sel.qty); };
$("#addBtn").addEventListener("click", doAdd);
const doBuy = () => { if(out) return; window.SL.openOrder("express", [selItem()]); };
$("#buyNow").addEventListener("click", doBuy);
$("#stickyAdd").addEventListener("click", doBuy);
$("#stickyCart").addEventListener("click", doAdd);
$("#favBtn").addEventListener("click", () => { toggleFav(p.id); $("#favBtn span").textContent = window.SL.favs.includes(p.id)?"Dans vos favoris":"Ajouter aux favoris"; });
$("#shareWa").href = waLink(`Regarde ce bijou Sirène Luxury : ${p.name} – ${location.href}`); $("#shareWa").target = "_blank";
$("#shareCopy").addEventListener("click", e => { e.preventDefault(); navigator.clipboard && navigator.clipboard.writeText(location.href); window.SL.toast("Lien copié"); });

/* Sticky mobile bar */
$("#stickyName").innerHTML = `<b style="font-family:var(--serif);font-size:17px;font-weight:500">${esc(p.name)}</b><span>${fmt(p.price)} · paiement à la livraison</span>`;
if(out){ ["#stickyAdd","#stickyCart"].forEach(x => { $(x).disabled = true; $(x).style.opacity = .5; }); }
const sticky = $("#stickyBuy"), addBtn = $("#addBtn");
new IntersectionObserver(([e]) => { const show = !e.isIntersecting && e.boundingClientRect.top < 0; sticky.classList.toggle("is-show", show); document.body.classList.toggle("has-sticky", show); }).observe(addBtn);

/* Complétez la parure */
(function(){
  let set = [];
  if(p.bundle) set = []; // une parure est déjà complète
  else if(p.line) set = P.filter(x => x.line === p.line && x.cat !== "parures");
  else set = [p].concat(P.filter(x => x.cat !== p.cat && x.cat !== "parures" && x.cat !== "montres" && x.stock>0 && x.colors.includes("gold")).slice(0,2));
  if(set.length < 2){ $("#bundleWrap").remove(); return; }
  set = set.filter(x=>x.stock>0).slice(0,4);
  const lineDisc = !!p.line;
  $("#bundle").innerHTML = `<div class="bundle__items">${set.map(x=>`<label class="bundle__it"><input type="checkbox" checked data-b="${x.id}" ${x.id===p.id?"disabled":""}><img src="${IMG(x.imgs[0])}" alt=""><span><b>${esc(x.name)}</b><small>${esc(x.type)}</small></span><span style="font-size:14px;font-weight:500">${fmt(x.price)}</span></label>`).join("")}</div>
    <div class="bundle__sum"><div><small class="muted" id="bLbl"></small><div><b id="bTot"></b> <span class="price-old" id="bOld"></span></div></div><button class="btn btn--gold" id="bAdd">Ajouter la parure</button></div>`;
  const upd = () => { const ids = $$("[data-b]").filter(i=>i.checked).map(i=>i.dataset.b); const sum = ids.reduce((a,i)=>a+byId(i).price,0); const disc = lineDisc && ids.length>=3; $("#bTot").textContent = fmt(disc?sum*(1-C.bundleDiscount):sum); $("#bOld").textContent = disc?fmt(sum):""; $("#bLbl").textContent = disc ? `${ids.length} pièces · -15 % parure appliqué` : lineDisc ? `Sélectionnez 3 pièces ou plus pour -15 %` : `${ids.length} pièces`; return ids; };
  $("#bundle").addEventListener("change", upd); upd();
  $("#bAdd").addEventListener("click", () => { upd().forEach(i => addToCart(i, i===p.id?sel:{}, 1, true)); openCart(); });
})();

/* Avis produit */
const revs = window.SL_REVIEWS.slice(0,3);
$("#avis").innerHTML = `<div class="s-head"><span class="eyebrow">Avis clientes</span><h2 class="h-section">${p.rating.toString().replace(".",",")} sur 5</h2>${stars(p.rating,true)}<p class="muted" style="margin:0">${p.reviews} avis vérifiés</p></div>
  <div class="pgrid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${revs.map(r=>`<article class="review"><div class="review__body">${stars(r.rating)}<p>« ${r.text} »</p><div class="review__who"><span><b>${r.name}</b> · ${r.city}</span><span class="verified">${icon("check")} Achat vérifié</span></div></div></article>`).join("")}</div>
  <p class="demo-note">Avis de démonstration, à remplacer par les avis réels.</p>`;

/* Vous aimerez aussi */
const like = P.filter(x => x.id !== p.id && (x.cat === p.cat || x.line === p.line) && x.stock>0).concat(P.filter(x=>x.tags.includes("best") && x.id!==p.id)).filter((x,i,a)=>a.indexOf(x)===i).slice(0,8);
$("#likeTrack").innerHTML = like.map(card).join("");
initCarousel($("#like"));
initReveal();
})();
