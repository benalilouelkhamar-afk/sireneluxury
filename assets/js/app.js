/* =========================================================
   SIRÈNE LUXURY — Composants partagés
   Header, footer, panier, recherche, favoris, i18n, pop-up
   ========================================================= */
(function(){
"use strict";
const C = window.SL_CONFIG, P = window.SL_PRODUCTS, CATS = window.SL_CATS, COLS = window.SL_COLLECTIONS;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const IMG = n => `assets/img/${n}.webp`;
const fmt = n => `${Math.round(n).toLocaleString("fr-FR")} ${C.currency}`;
const store = {
  get(k, d){ try{ const v = localStorage.getItem("sl_"+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("sl_"+k, JSON.stringify(v)); }catch(e){} }
};
const byId = id => P.find(p => p.id === id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------- Icons (fins, 1.2px) ---------- */
const I = {
  menu:'<path d="M3 7h18M3 12h12M3 17h18"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  heart:'<path d="M12 20s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
  user:'<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.2 7.5-5.2s6.3 1.6 7.5 5.2"/>',
  bag:'<path d="M5 8h14l-1.1 12H6.1z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  close:'<path d="M6 6l12 12M18 6L6 18"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  arrow:'<path d="M4 12h16M14 6l6 6-6 6"/>',
  left:'<path d="M15 5l-7 7 7 7"/>', right:'<path d="M9 5l7 7-7 7"/>',
  star:'<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z"/>',
  sparkle:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M6.3 17.7l2.4-2.4M15.3 8.7l2.4-2.4"/><circle cx="12" cy="12" r="1.6"/>',
  shield:'<path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6z"/><path d="M9 12l2 2 4-4"/>',
  truck:'<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  cash:'<rect x="3" y="6.5" width="18" height="11" rx="1.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v5M17.5 9.5v5"/>',
  drop:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/><path d="M9.2 14.5a2.8 2.8 0 0 0 2.8 2.6"/>',
  gift:'<rect x="3.5" y="8.5" width="17" height="4" rx=".6"/><path d="M5 12.5V20h14v-7.5M12 8.5V20M12 8.5c-1.5-3.5-5.5-4-5.5-1.8 0 1.8 3 1.8 5.5 1.8zM12 8.5c1.5-3.5 5.5-4 5.5-1.8 0 1.8-3 1.8-5.5 1.8z"/>',
  wave:'<path d="M2 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 18.5c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><circle cx="12" cy="6.5" r="2.5"/>',
  flask:'<path d="M9.5 3h5M10.5 3v5.5L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3l-5-9.5V3"/><path d="M7.5 15h9"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4"/>',
  rust:'<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  zoom:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5"/>',
  play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  phone:'<path d="M5 4h4l1.5 4.5-2.3 1.4a11 11 0 0 0 6 6l1.4-2.3L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z"/>',
  mail:'<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  pin:'<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  card:'<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3 10h18M6.5 15h4"/>',
  ring:'<circle cx="12" cy="14" r="6"/><path d="M9 6.5L12 3l3 3.5-3 1.8z"/>',
  ruler:'<rect x="2.5" y="8" width="19" height="8" rx="1"/><path d="M6 8v3M9.5 8v4M13 8v3M16.5 8v4"/>',
  refresh:'<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
  filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
  insta:'<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
  tiktok:'<path d="M14 3.5v11.2a3.3 3.3 0 1 1-3.3-3.3M14 3.5c.4 2.6 2.2 4.4 5 4.6"/>',
  facebook:'<path d="M14.5 21v-7.5H17l.4-3H14.5V8.7c0-.9.3-1.5 1.5-1.5h1.5V4.5A19 19 0 0 0 15.3 4.4c-2.2 0-3.8 1.4-3.8 3.9v2.2H9v3h2.5V21"/>',
  wa:'<path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z"/>',
  diamond:'<path d="M12 2l3 3-3 3-3-3z"/>',
  mono:'<circle cx="12" cy="7.2" r="3.4"/><path d="M12 10.6c0 3.4-3.6 5-3.6 8.2 1.4-.9 2.6-1.3 3.6-.8 1-.5 2.2-.1 3.6.8 0-3.2-3.6-4.8-3.6-8.2z"/><path d="M8.4 18.8c-1.2.3-2.4 1.1-2.9 2.2 1.6-.4 3.6-.2 4.9.4M15.6 18.8c1.2.3 2.4 1.1 2.9 2.2-1.6-.4-3.6-.2-4.9.4"/><circle cx="10.8" cy="6" r=".8" fill="currentColor" stroke="none"/>'
};
const icon = (n, cls="") => n==="wa"
  ? `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor;stroke:none">${I.wa}</svg>`
  : `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n]||""}</svg>`;
const stars = (r, lg) => `<span class="stars ${lg?"stars--lg":""}" aria-label="${r} sur 5">${[1,2,3,4,5].map(i=>`<svg class="icon" viewBox="0 0 24 24" style="${i>Math.round(r)?"opacity:.25":""}">${I.star}</svg>`).join("")}</span>`;
const logo = (light) => `<a href="index.html" class="logo ${light?"logo--light":""}" aria-label="Sirène Luxury — Accueil">
  <span class="logo__row"><svg class="logo__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">${I.mono}</svg><span class="logo__word">SIRÈNE</span></span>
  <span class="logo__sub">LUXURY</span></a>`;
const ruleSvg = `<span class="rule"><svg viewBox="0 0 24 24" fill="currentColor">${I.diamond}</svg></span>`;

/* ---------- i18n ---------- */
let LANG = store.get("lang", "fr");
const t = k => (window.SL_I18N[LANG] && window.SL_I18N[LANG][k]) || window.SL_I18N.fr[k] || k;
function applyLang(){
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $$(".lang button").forEach(b => b.classList.toggle("is-active", b.dataset.lang === LANG));
}
function setLang(l){ if(l===LANG) return; LANG = l; store.set("lang", l); location.reload(); }
const catName = (key) => { const c = CATS[key] || COLS[key]; return c ? (LANG==="ar" ? c.ar : c.fr) : key; };

/* ---------- WhatsApp ---------- */
function waLink(msg){ return `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`; }
const COLOR_LABEL = { gold:"Doré", silver:"Argenté", rose:"Or rose" };

/* ---------- Cart ---------- */
let cart = store.get("cart", []);
let gift = store.get("gift", false);
function cartKey(it){ return [it.id, it.color||"", it.size||"", it.variant||""].join("|"); }
function addToCart(id, opts={}, qty=1, silent){
  const p = byId(id); if(!p || p.stock===0) return;
  const it = { id, color: opts.color || (p.colors||["gold"])[0], size: opts.size || (p.sizes ? p.sizes[0] : ""), variant: opts.variant || (p.variants ? p.variants[0] : ""), qty };
  const ex = cart.find(c => cartKey(c) === cartKey(it));
  if(ex) ex.qty += qty; else cart.push(it);
  saveCart();
  if(!silent){ openCart(); }
}
function saveCart(){ store.set("cart", cart); renderCart(); updateCounts(); }
function totalsFor(items, withGift){
  let sub = 0, disc = 0; const lines = {};
  items.forEach(it => { const p = byId(it.id); if(!p) return; sub += p.price * it.qty; if(p.line){ (lines[p.line] = lines[p.line] || new Set()).add(p.id); } });
  // Remise parure automatique : 3 pièces différentes d'une même ligne = -15 % sur ces pièces
  const discLines = Object.keys(lines).filter(l => lines[l].size >= 3);
  items.forEach(it => { const p = byId(it.id); if(p && p.line && discLines.includes(p.line)) disc += p.price * it.qty * C.bundleDiscount; });
  const giftFee = withGift && items.length ? C.giftWrap : 0;
  const after = sub - disc;
  const ship = items.length === 0 ? 0 : (after >= C.freeShipping ? 0 : C.shippingFee);
  return { sub, disc, ship, giftFee, total: after + ship + giftFee, discLines, count: items.reduce((a,b)=>a+b.qty,0) };
}
function cartTotals(){ return totalsFor(cart, gift); }
function itemOpts(it){ return [COLOR_LABEL[it.color]||"", it.size, it.variant].filter(Boolean).join(" · "); }
/* Message WhatsApp structuré (gras WhatsApp avec *…*) */
function orderMessage(items, T, customer, ref){
  const L = [];
  L.push(ref ? `*Nouvelle commande ${ref}*` : `Bonjour Sirène Luxury,`);
  L.push(ref ? `` : `Je souhaite commander :`);
  if(!ref) L.push("");
  items.forEach((it, n) => { const p = byId(it.id); if(!p) return;
    L.push(`*${n+1}. ${p.name}* – ${p.type}`);
    L.push(`    ${itemOpts(it)} · Qté ${it.qty} · ${fmt(p.price*it.qty)}`);
  });
  L.push("");
  L.push(`Sous-total : ${fmt(T.sub)}`);
  if(T.disc) L.push(`Remise parure -15 % : -${fmt(T.disc)}`);
  if(T.giftFee) L.push(`Emballage cadeau : ${fmt(T.giftFee)}`);
  L.push(`Livraison : ${T.ship ? fmt(T.ship) : "offerte"}`);
  L.push(`*Total à payer à la livraison : ${fmt(T.total)}*`);
  if(customer){
    L.push("", "*Livraison*", `Nom : ${customer.name}`, `Téléphone : ${customer.phone}`, `Ville : ${customer.city}`, `Adresse : ${customer.address}`);
    if(customer.note) L.push(`Note : ${customer.note}`);
    L.push("", "Paiement à la livraison. Merci de me confirmer la commande.");
  } else {
    L.push("", "Paiement à la livraison. Merci de m'indiquer la disponibilité.");
  }
  return L.join("\n").replace(/\n{3,}/g, "\n\n");
}
function cartWaMessage(){ return orderMessage(cart, cartTotals()); }
function updateCounts(){
  const n = cartTotals().count, f = favs.length;
  $$("[data-cart-count]").forEach(el => { el.textContent = n; el.classList.toggle("has", n>0); });
  $$("[data-fav-count]").forEach(el => { el.textContent = f; el.classList.toggle("has", f>0); });
}
function renderCart(){
  const body = $("#cartBody"), foot = $("#cartFoot"), ship = $("#cartShip"); if(!body) return;
  const T = cartTotals();
  const left = Math.max(0, C.freeShipping - (T.sub - T.disc));
  const pct = Math.min(100, ((T.sub - T.disc) / C.freeShipping) * 100);
  ship.innerHTML = cart.length ? (left > 0
      ? `Plus que <b>${fmt(left)}</b> pour la livraison gratuite<div class="progress"><i style="width:${pct}%"></i></div>`
      : `<span style="display:flex;gap:8px;align-items:center">${icon("check")} Félicitations, la livraison vous est <b>offerte</b></span><div class="progress"><i style="width:100%"></i></div>`)
    : `Livraison offerte dès <b>${fmt(C.freeShipping)}</b> d'achat<div class="progress"><i style="width:0"></i></div>`;
  if(!cart.length){
    body.innerHTML = `<div class="cart__empty">${icon("bag")}<p class="drawer__title" data-i18n="cart.empty">${t("cart.empty")}</p><a href="collection.html?c=nouveautes" class="btn btn--dark">${t("cart.continue")}</a></div>`;
    foot.hidden = true; return;
  }
  foot.hidden = false;
  body.innerHTML = cart.map((it,i) => { const p = byId(it.id); return `
    <div class="citem">
      <a href="produit.html?id=${p.id}"><img src="${IMG(p.imgs[0])}" alt="${esc(p.name)}" loading="lazy"></a>
      <div>
        <div class="citem__top"><div><b>${esc(p.name)}</b><small>${esc(p.type)}</small><small>${COLOR_LABEL[it.color]||""}${it.size?" · "+it.size:""}${it.variant?" · "+it.variant:""}${p.line && T.discLines.includes(p.line) ? ` · <span class="gold">Parure -15 %</span>`:""}</small></div><span style="font-size:14px;font-weight:500;white-space:nowrap">${fmt(p.price*it.qty)}</span></div>
        <div class="citem__bot"><div class="qty"><button data-q="-1" data-i="${i}" aria-label="Diminuer">${icon("minus")}</button><span>${it.qty}</span><button data-q="1" data-i="${i}" aria-label="Augmenter">${icon("plus")}</button></div><button class="citem__rm" data-rm="${i}">${t("cart.remove")}</button></div>
      </div>
    </div>`; }).join("") + upsellHtml();
  $("#cartSum").innerHTML = `
    <div class="sumrow"><span>${t("cart.sub")}</span><span>${fmt(T.sub)}</span></div>
    ${T.disc ? `<div class="sumrow sumrow--disc"><span>Remise parure (-15 %)</span><span>-${fmt(T.disc)}</span></div>`:""}
    ${T.giftFee ? `<div class="sumrow"><span>${t("cart.gift")}</span><span>${fmt(T.giftFee)}</span></div>`:""}
    <div class="sumrow"><span>${t("cart.ship")}</span><span>${T.ship ? fmt(T.ship) : t("cart.free")}</span></div>
    <div class="sumrow sumrow--total"><span>${t("cart.total")}</span><span>${fmt(T.total)}</span></div>`;
  $("#giftWrap").checked = gift;
}
function upsellHtml(){
  const inCart = new Set(cart.map(c=>c.id));
  // Suggère d'abord les pièces de la même ligne (parure), sinon des best-sellers
  const lines = new Set(cart.map(c => (byId(c.id)||{}).line).filter(Boolean));
  let sug = P.filter(p => !inCart.has(p.id) && p.stock>0 && p.line && lines.has(p.line));
  if(sug.length < 2) sug = sug.concat(P.filter(p => !inCart.has(p.id) && p.stock>0 && p.tags.includes("best") && !sug.includes(p)));
  sug = sug.slice(0,2);
  if(!sug.length) return "";
  return `<div class="cart__up"><h4>${t("cart.upsell")}</h4>${sug.map(p=>`
    <div class="mini"><img src="${IMG(p.imgs[0])}" alt="" loading="lazy"><div><b>${esc(p.name)}</b><small>${fmt(p.price)}${p.line && lines.has(p.line)?" · complète la parure":""}</small></div><button class="pcard__mbtn" data-add="${p.id}" aria-label="Ajouter ${esc(p.name)}">${icon("plus")}</button></div>`).join("")}</div>`;
}

/* ---------- Favorites ---------- */
let favs = store.get("favs", []);
function toggleFav(id){
  favs = favs.includes(id) ? favs.filter(f=>f!==id) : favs.concat(id);
  store.set("favs", favs); updateCounts();
  $$(`[data-fav="${id}"]`).forEach(b => b.classList.toggle("is-on", favs.includes(id)));
  toast(favs.includes(id) ? "Ajouté à vos favoris" : "Retiré de vos favoris");
}

/* ---------- Product card (réutilisable) ---------- */
function badgeFor(p){
  if(p.stock === 0) return `<span class="pbadge pbadge--out">${t("card.out")}</span>`;
  if(p.old) return `<span class="pbadge pbadge--promo">-${Math.round((1-p.price/p.old)*100)} %</span>`;
  if(p.tags.includes("new")) return `<span class="pbadge">${t("card.new")}</span>`;
  if(p.tags.includes("best")) return `<span class="pbadge pbadge--best">${t("card.best")}</span>`;
  return "";
}
function card(p){
  const out = p.stock === 0;
  return `<article class="pcard ${out?"is-out":""}">
    <a class="pcard__media" href="produit.html?id=${p.id}" aria-label="${esc(p.name)} — ${esc(p.type)}">
      ${badgeFor(p)}
      <img class="img-1" src="${IMG(p.imgs[0])}" alt="${esc(p.name)} — ${esc(p.type)}" loading="lazy" width="800" height="800">
      <img class="img-2" src="${IMG(p.imgs[1]||p.imgs[0])}" alt="" loading="lazy" aria-hidden="true">
    </a>
    <button class="pcard__fav ${favs.includes(p.id)?"is-on":""}" data-fav="${p.id}" aria-label="Ajouter aux favoris">${icon("heart")}</button>
    ${out ? "" : `<button class="pcard__add" data-add="${p.id}">${icon("bag")}<span>${t("card.add")}</span></button>`}
    <div class="pcard__body">
      <div class="pcard__row">
        <div><a href="produit.html?id=${p.id}" class="pcard__name">${esc(p.name)}</a><div class="pcard__mat">${esc(p.type)} · ${esc(p.mat)}</div></div>
        <button class="pcard__mbtn pcard__add-m" data-add="${p.id}" aria-label="${t("card.add")}">${icon("plus")}</button>
      </div>
      <div class="pcard__price">${out ? `<span class="muted">${t("card.out")}</span>` : `<span class="${p.old?"price-now--promo":""}">${fmt(p.price)}</span>${p.old?`<span class="price-old">${fmt(p.old)}</span>`:""}`}</div>
      ${p.colors && p.colors.length>1 ? `<div class="pcard__swatches">${p.colors.map(c=>`<span class="sw sw--${c}" title="${COLOR_LABEL[c]}"></span>`).join("")}</div>`:""}
    </div>
  </article>`;
}

/* ---------- Shell: announcement / header / footer / drawers ---------- */
const flag = `<svg class="ann__flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#C1272D"/><path d="M15 6.2l1.1 3.5h3.7l-3 2.2 1.1 3.5-2.9-2.2-2.9 2.2 1.1-3.5-3-2.2h3.7z" fill="none" stroke="#006233" stroke-width=".9"/></svg>`;
function annHtml(){
  const items = [["ann.1",flag],["ann.2",""],["ann.3",""],["ann.4",""]];
  const one = items.map(([k,f])=>`<span class="ann__item">${f}<span data-i18n="${k}">${t(k)}</span></span>`).join("");
  return `<div class="ann" role="region" aria-label="Annonces"><div class="ann__track">${one}${one}${one}${one}</div></div>`;
}
const MEGA = {
  colliers:["c-collier-cubain","c-pendentif-cercle","c-sautoir-nacre","c-pendentif-medaillon"],
  bracelets:["c-bracelet-chaine","c-jonc-clous","c-cubaine-bracelet","c-tennis"],
  bagues:["c-bague-duo","c-bagues-chaines","c-bague-emeraude","jonc-bagues-boucles"],
  boucles:["c-boucles-spirale","c-puces-medaillon","c-boucles-emeraude","c-boucles-trefle-vertes"],
  parures:["parure-emeraude","parure-nacre","parure-trefle-chaine","look-caftan"]
};
function megaHtml(key){
  const c = CATS[key];
  const imgs = MEGA[key];
  return `<div class="mega"><div class="container mega__inner">
    <div class="mega__links"><h4>${catName(key)}</h4>${c.subs.map(s=>`<a href="collection.html?c=${key}&s=${encodeURIComponent(s)}">${s}</a>`).join("")}<a class="link-u" href="collection.html?c=${key}">${t("nav.all")} ${icon("arrow")}</a></div>
    <div class="mega__cards">${c.subs.concat(["Nouveautés"]).slice(0,4).map((s,i)=>`<a class="mega__card" href="collection.html?c=${key}${i<c.subs.length?`&s=${encodeURIComponent(s)}`:""}"><div class="ph"><img src="${IMG(imgs[i])}" alt="" loading="lazy"></div><span>${s}</span></a>`).join("")}</div>
  </div></div>`;
}
function megaCollections(){
  const keys = Object.keys(COLS);
  return `<div class="mega"><div class="container mega__inner">
    <div class="mega__links"><h4>${t("nav.collections")}</h4>${keys.map(k=>`<a href="collection.html?c=${k}">${catName(k)}</a>`).join("")}<a href="collection.html?c=montres">${catName("montres")}</a></div>
    <div class="mega__cards">${keys.map(k=>`<a class="mega__card" href="collection.html?c=${k}"><div class="ph"><img src="${IMG(COLS[k].img)}" alt="" loading="lazy"></div><span>${catName(k)}</span></a>`).join("")}</div>
  </div></div>`;
}
function headerHtml(active){
  const nav = ["colliers","bracelets","bagues","boucles","parures"];
  return `<header class="header" id="header"><div class="container header__bar">
    <div class="header__left">
      <button class="icon-btn header__burger" data-open="menu" aria-label="${t("nav.menu")}">${icon("menu")}</button>
      <div class="lang" role="group" aria-label="Langue"><button data-lang="fr">FR</button><button data-lang="ar" lang="ar">عربي</button></div>
      <button class="icon-btn hide-sm" data-open="search" aria-label="${t("nav.search")}">${icon("search")}</button>
    </div>
    ${logo()}
    <div class="header__right">
      <a class="icon-btn hide-sm" href="collection.html?c=favoris" aria-label="${t("nav.fav")}">${icon("heart")}<span class="badge-count" data-fav-count>0</span></a>
      <a class="icon-btn hide-sm" href="contact.html" aria-label="${t("nav.account")}">${icon("user")}</a>
      <button class="icon-btn" data-open="cart" aria-label="${t("nav.cart")}">${icon("bag")}<span class="badge-count" data-cart-count>0</span></button>
    </div>
  </div>
  <nav class="header__nav" aria-label="Navigation principale">
    ${nav.map(k=>`<div class="nav-item"><a class="nav-link ${active===k?"is-active":""}" href="collection.html?c=${k}">${CATS[k].short ? (LANG==="ar"?CATS[k].ar:CATS[k].short) : catName(k)}</a>${megaHtml(k)}</div>`).join("")}
    <div class="nav-item"><a class="nav-link" href="collection.html?c=nouveautes" data-i18n="nav.collections">${t("nav.collections")}</a>${megaCollections()}</div>
    <div class="nav-item"><a class="nav-link" href="collection.html?c=montres">${catName("montres")}</a></div>
  </nav></header>`;
}
function mobileNavHtml(){
  const nav = ["colliers","bracelets","bagues","boucles","parures"];
  return `<div class="drawer" id="menu" aria-hidden="true"><div class="drawer__scrim" data-close></div><aside class="drawer__panel" role="dialog" aria-label="Menu">
    <div class="drawer__head">${logo()}<button class="icon-btn" data-close aria-label="Fermer">${icon("close")}</button></div>
    <div class="drawer__body"><nav class="mnav">
      ${nav.map(k=>`<details><summary>${catName(k)} ${icon("plus")}</summary>
        <div class="mnav__imgs">${CATS[k].subs.map((s,i)=>`<a href="collection.html?c=${k}&s=${encodeURIComponent(s)}"><img src="${IMG(MEGA[k][i])}" alt="" loading="lazy"><span>${s}</span></a>`).join("")}</div>
        <div class="mnav__sub"><a href="collection.html?c=${k}" class="link-u">${t("nav.all")} ${icon("arrow")}</a></div></details>`).join("")}
      <details><summary>${t("nav.collections")} ${icon("plus")}</summary><div class="mnav__sub">${Object.keys(COLS).map(k=>`<a href="collection.html?c=${k}">${catName(k)}</a>`).join("")}<a href="collection.html?c=montres">${catName("montres")}</a></div></details>
      <a class="mnav__plain" href="a-propos.html">À propos</a>
      <div class="mnav__foot">
        <div class="lang" style="display:inline-flex;width:max-content" role="group" aria-label="Langue"><button data-lang="fr">Français</button><button data-lang="ar">العربية</button></div>
        <a href="collection.html?c=favoris">${icon("heart")} ${t("nav.fav")}</a>
        <a href="contact.html">${icon("user")} ${t("nav.account")}</a>
        <a href="${waLink("Bonjour Sirène Luxury, j'ai une question.")}" target="_blank" rel="noopener">${icon("wa")} WhatsApp</a>
        <a href="${C.instagram}" target="_blank" rel="noopener">${icon("insta")} @sireneluxury59</a>
      </div>
    </nav></div></aside></div>`;
}
function cartDrawerHtml(){
  return `<div class="drawer drawer--right" id="cart" aria-hidden="true"><div class="drawer__scrim" data-close></div><aside class="drawer__panel" role="dialog" aria-label="${t("cart.title")}">
    <div class="drawer__head"><span class="drawer__title" data-i18n="cart.title">${t("cart.title")}</span><button class="icon-btn" data-close aria-label="Fermer">${icon("close")}</button></div>
    <div class="cart__ship" id="cartShip"></div>
    <div class="drawer__body" id="cartBody"></div>
    <div class="cart__foot" id="cartFoot">
      <label class="cart__gift"><input type="checkbox" id="giftWrap"> ${icon("gift")} <span>${t("cart.gift")} (+${fmt(C.giftWrap)})</span></label>
      <div id="cartSum"></div>
      <button class="btn btn--wa btn--block btn--lg" data-order="cart">${icon("wa")}<span>Commander maintenant</span></button>
      <p class="fine" style="text-align:center;margin:2px 0 0" data-i18n="cart.cod">${t("cart.cod")}</p>
    </div></aside></div>`;
}
function searchHtml(){
  return `<div class="search" id="search" role="dialog" aria-label="Recherche" aria-hidden="true">
    <div class="search__top">${icon("search")}<input class="search__input" id="searchInput" type="search" placeholder="Rechercher un bijou…" autocomplete="off"><button class="icon-btn" data-close aria-label="Fermer">${icon("close")}</button></div>
    <div class="search__res"><div class="search__tags">${["Collier","Jonc","Nacre","Trèfle","Émeraude","Montre","Parure","Bague"].map(s=>`<button class="chip" data-q="${s}">${s}</button>`).join("")}</div><div class="search__list" id="searchList"></div></div></div>`;
}
function footerHtml(){
  const col = (title, links) => `<div><h5>${title}</h5><ul>${links.map(([l,h])=>`<li><a href="${h}">${l}</a></li>`).join("")}</ul></div>`;
  return `<footer class="footer"><div class="container">
    <div class="footer__top">
      <div class="footer__brand">${logo(true)}<p data-i18n="ft.tag">${t("ft.tag")}</p>
        <div class="socials">
          <a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("insta")}</a>
          <a href="${C.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${icon("tiktok")}</a>
          <a href="${C.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>
          <a href="${waLink("Bonjour Sirène Luxury !")}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("wa")}</a>
        </div></div>
      <div class="footer__cols">
        ${col(t("ft.shop"), [["Colliers","collection.html?c=colliers"],["Bracelets","collection.html?c=bracelets"],["Bagues","collection.html?c=bagues"],["Boucles d'oreilles","collection.html?c=boucles"],["Parures & coffrets","collection.html?c=parures"],["Montres","collection.html?c=montres"]])}
        ${col(t("ft.help"), [["FAQ","faq.html"],["Livraison & échanges","livraison.html"],["Guide d'entretien","entretien.html"],["Guide des tailles","guide-tailles.html"],["Contact","contact.html"]])}
        ${col(t("ft.about"), [["Notre histoire","a-propos.html"],["Collection Océan","collection.html?c=ocean"],["Best-sellers","collection.html?c=best-sellers"],["Instagram",C.instagram]])}
        ${col(t("ft.legal"), [["CGV","cgv.html"],["Confidentialité","confidentialite.html"],["Mentions légales","cgv.html#mentions"]])}
      </div>
      <div class="footer__news"><h5 data-i18n="ft.news">${t("ft.news")}</h5><p style="margin:0">-10 % sur votre première commande.</p>
        <form data-news><input class="field" type="text" required placeholder="E-mail ou WhatsApp" aria-label="E-mail ou WhatsApp"><button class="btn btn--gold" aria-label="S'inscrire">${icon("arrow")}</button></form></div>
    </div>
    <div class="footer__bottom">
      <span data-i18n="ft.rights">${t("ft.rights")}</span>
      <div class="pay"><span>${icon("cash")} Paiement à la livraison</span><span>${icon("card")} Carte bancaire</span><span>VISA</span><span>Mastercard</span><span>CMI</span></div>
    </div>
  </div></footer>`;
}
function floatHtml(){
  return `<a class="wa-float" href="${waLink("Bonjour Sirène Luxury, j'aimerais avoir des informations.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("wa")}<span class="wa-float__tip" data-i18n="wa.tip">${t("wa.tip")}</span></a>
  <div class="popup" id="popup" aria-hidden="true" role="dialog" aria-label="Offre de bienvenue"><div class="popup__scrim" data-close></div><div class="popup__box">
    <button class="icon-btn popup__close" data-close aria-label="Fermer">${icon("close")}</button>
    <div class="popup__img"><img src="${IMG("look-caftan")}" alt="" loading="lazy"></div>
    <div class="popup__txt"><span class="eyebrow">Bienvenue dans le cercle Sirène</span>${ruleSvg}
      <h3><em data-i18n="pop.title">${t("pop.title")}</em></h3><p class="drawer__title" style="margin:0" data-i18n="pop.sub">${t("pop.sub")}</p>
      <p class="muted" style="margin:0;font-size:14px" data-i18n="pop.text">${t("pop.text")}</p>
      <form data-news style="display:grid;gap:10px;width:100%;margin-top:6px"><input class="field" required placeholder="E-mail ou numéro WhatsApp" aria-label="E-mail ou numéro WhatsApp"><button class="btn btn--dark btn--block" data-i18n="pop.btn">${t("pop.btn")}</button></form>
      <button class="fine" data-close style="text-decoration:underline" data-i18n="pop.no">${t("pop.no")}</button>
    </div></div></div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

/* ---------- Overlays ---------- */
let lastFocus;
function openLayer(id){
  const el = document.getElementById(id); if(!el) return;
  lastFocus = document.activeElement;
  el.classList.add("is-open"); el.setAttribute("aria-hidden","false");
  document.body.classList.add("is-locked");
  if(id==="search") setTimeout(()=>$("#searchInput").focus(), 80);
  if(id==="cart") renderCart();
}
function closeLayers(){
  $$(".drawer.is-open,.search.is-open,.popup.is-open,.osheet.is-open").forEach(el => { el.classList.remove("is-open"); el.setAttribute("aria-hidden","true"); });
  document.body.classList.remove("is-locked");
  if(lastFocus && lastFocus.focus) lastFocus.focus();
}
function openCart(){ openLayer("cart"); }
let toastT;
function toast(msg){ const el = $("#toast"); if(!el) return; el.innerHTML = icon("check")+`<span>${msg}</span>`; el.classList.add("is-show"); clearTimeout(toastT); toastT = setTimeout(()=>el.classList.remove("is-show"), 2400); }

function renderSearch(q){
  const list = $("#searchList"); q = (q||"").trim().toLowerCase();
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
  const res = q ? P.filter(p => norm([p.name,p.type,p.mat,p.sub,CATS[p.cat].fr].join(" ")).includes(norm(q))) : P.filter(p=>p.tags.includes("best")).slice(0,5);
  list.innerHTML = (q?"":`<p class="eyebrow" style="margin:0 0 6px">Recherches populaires</p>`) + (res.length ? res.slice(0,8).map(p=>`<a class="search__row" href="produit.html?id=${p.id}"><img src="${IMG(p.imgs[0])}" alt="" loading="lazy"><div><b>${esc(p.name)}</b><small class="muted">${esc(p.type)} · ${fmt(p.price)}</small></div></a>`).join("") : `<p class="muted">Aucun bijou ne correspond à « ${esc(q)} ».</p>`);
}

/* ---------- Reveal on scroll ---------- */
function initReveal(root=document){
  const els = $$(".reveal:not(.is-in)", root);
  if(!("IntersectionObserver" in window)){ els.forEach(e=>e.classList.add("is-in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin:"0px 0px -8% 0px", threshold:.08 });
  els.forEach(e => io.observe(e));
}

/* ---------- Carousel ---------- */
function initCarousel(root){
  const track = $(".carousel__track", root), bar = $(".carousel__bar i", root);
  const step = () => { const c = track.children[0]; return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap||0) : 300; };
  const rtl = () => document.documentElement.dir === "rtl";
  $$("[data-prev],[data-next]", root).forEach(b => b.addEventListener("click", () => {
    const d = b.hasAttribute("data-next") ? 1 : -1;
    track.scrollBy({ left: d * step() * (rtl()?-1:1), behavior:"smooth" });
  }));
  const upd = () => { if(!bar) return; const max = track.scrollWidth - track.clientWidth; const r = max>0 ? Math.abs(track.scrollLeft)/max : 0; const w = Math.max(.15, track.clientWidth/track.scrollWidth); bar.style.width = (w*100)+"%"; bar.style.transform = `translateX(${(rtl()?-1:1) * r*(1-w)/w*100}%)`; };
  track.addEventListener("scroll", upd, {passive:true}); window.addEventListener("resize", upd); upd();
}

/* ---------- Boot ---------- */
function mountShell(){
  const page = document.body.dataset.page || "";
  const active = document.body.dataset.cat || "";
  document.body.insertAdjacentHTML("afterbegin", annHtml() + headerHtml(active));
  document.body.insertAdjacentHTML("beforeend", footerHtml() + mobileNavHtml() + cartDrawerHtml() + searchHtml() + orderSheetHtml() + floatHtml());
  // Desktop search icon on right
}

function bindGlobal(){
  document.addEventListener("click", e => {
    const od = e.target.closest("[data-order]"); if(od){ e.preventDefault(); openOrder(od.dataset.order); return; }
    const o = e.target.closest("[data-open]"); if(o){ e.preventDefault(); openLayer(o.dataset.open); return; }
    if(e.target.closest("[data-close]")){ closeLayers(); return; }
    const a = e.target.closest("[data-add]"); if(a){ e.preventDefault(); addToCart(a.dataset.add); return; }
    const f = e.target.closest("[data-fav]"); if(f){ e.preventDefault(); toggleFav(f.dataset.fav); return; }
    const q = e.target.closest("[data-q]"); if(q && q.closest("#cartBody")){ const it = cart[+q.dataset.i]; it.qty += +q.dataset.q; if(it.qty<1) cart.splice(+q.dataset.i,1); saveCart(); return; }
    if(q && q.closest("#search")){ $("#searchInput").value = q.dataset.q; renderSearch(q.dataset.q); return; }
    const rm = e.target.closest("[data-rm]"); if(rm){ cart.splice(+rm.dataset.rm,1); saveCart(); return; }
    const l = e.target.closest("[data-lang]"); if(l){ setLang(l.dataset.lang); return; }
  });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeLayers(); });
  document.addEventListener("change", e => { if(e.target.id === "giftWrap"){ gift = e.target.checked; store.set("gift", gift); renderCart(); } });
  document.addEventListener("submit", e => {
    const f = e.target.closest("[data-news]"); if(!f) return; e.preventDefault();
    f.innerHTML = `<p style="margin:0;display:flex;gap:8px;align-items:center;justify-content:center">${icon("check")} ${f.dataset.msg || "Bienvenue dans le cercle Sirène. Votre code : <b>SIRENE10</b>"}</p>`;
    store.set("subscribed", true);
  });
  $("#searchInput").addEventListener("input", e => renderSearch(e.target.value));
  renderSearch("");
  const h = $("#header");
  const onS = () => h.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onS, {passive:true}); onS();
  // Pop-up -10 % après 10 secondes (une seule fois)
  if(!store.get("popupSeen", false) && !store.get("subscribed", false) && document.body.dataset.page !== "checkout"){
    setTimeout(() => { if(!$(".drawer.is-open,.search.is-open,.osheet.is-open")){ openLayer("popup"); store.set("popupSeen", true); } }, 10000);
  }
  document.addEventListener("sl:lang", () => { renderCart(); });
}


/* =========================================================
   COMMANDE — formulaire unique (panier, achat express, page commande)
   ========================================================= */
const TOP_CITIES = ["Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Meknès","Oujda","Kénitra","Tétouan"];
const digits = v => (v||"").replace(/\D/g, "");
function normPhone(v){ let d = digits(v); if(d.startsWith("212")) d = "0" + d.slice(3); else if(d.length === 9) d = "0" + d; return d; }
const phoneOk = v => /^0[5-7]\d{8}$/.test(normPhone(v));
const fmtPhone = d => d.replace(/^(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2}).*/, (m,a,b,c,e,f) => [a,b,c,e,f].filter(Boolean).join(" "));
let orderCtx = null;

function orderSheetHtml(){
  return `<div class="osheet" id="order" aria-hidden="true"><div class="osheet__scrim" data-close></div>
    <div class="osheet__box" role="dialog" aria-modal="true" aria-labelledby="orderTitle">
      <div class="osheet__head"><div><span class="eyebrow">Paiement à la livraison</span><h2 class="osheet__title" id="orderTitle">Finaliser ma commande</h2></div><button class="icon-btn" data-close aria-label="Fermer">${icon("close")}</button></div>
      <div class="osheet__body" id="orderBody"></div>
      <div class="osheet__foot" id="orderFoot"></div>
    </div></div>`;
}
function recapHtml(items, T, editable){
  return `<div class="orecap">
    ${items.map((it,i) => { const p = byId(it.id); return `<div class="orecap__it">
      <span class="thumbqty"><img src="${IMG(p.imgs[0])}" alt=""><em>${it.qty}</em></span>
      <div class="orecap__txt"><b>${esc(p.name)}</b><small>${esc(p.type)}${itemOpts(it)?" · "+itemOpts(it):""}</small>
        ${editable ? `<div class="qty qty--sm"><button type="button" data-oq="-1" data-i="${i}" aria-label="Diminuer">${icon("minus")}</button><span>${it.qty}</span><button type="button" data-oq="1" data-i="${i}" aria-label="Augmenter">${icon("plus")}</button></div>` : ""}</div>
      <span class="orecap__price">${fmt(p.price*it.qty)}</span></div>`; }).join("")}
    <div class="orecap__tot">
      <div class="sumrow"><span>Sous-total</span><span>${fmt(T.sub)}</span></div>
      ${T.disc ? `<div class="sumrow sumrow--disc"><span>Remise parure -15 %</span><span>-${fmt(T.disc)}</span></div>` : ""}
      ${T.giftFee ? `<div class="sumrow"><span>Emballage cadeau</span><span>${fmt(T.giftFee)}</span></div>` : ""}
      <div class="sumrow"><span>Livraison</span><span>${T.ship ? fmt(T.ship) : `<b class="gold">Offerte</b>`}</span></div>
      <div class="sumrow sumrow--total"><span>Total à la livraison</span><span>${fmt(T.total)}</span></div>
    </div></div>`;
}
function formHtml(cust){
  const city = cust.city || "";
  const others = window.SL_CITIES.filter(c => !TOP_CITIES.includes(c));
  return `<form class="oform" id="oform" novalidate>
    <label class="flabel">Nom complet<input class="field" name="name" autocomplete="name" placeholder="Ex. Salma Benali" value="${esc(cust.name||"")}" required><span class="err">Indiquez votre nom et prénom.</span></label>
    <label class="flabel">Téléphone<span class="tel"><span>+212</span><input class="field" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="06 12 34 56 78" value="${esc(cust.phone||"")}" required></span><span class="err">Numéro invalide. Exemple : 06 12 34 56 78</span></label>
    <div class="fgrid fgrid--2">
      <label class="flabel">Ville<select class="field" name="city" required><option value="">Choisir…</option><optgroup label="Grandes villes">${TOP_CITIES.map(c=>`<option ${c===city?"selected":""}>${c}</option>`).join("")}</optgroup><optgroup label="Autres villes">${others.map(c=>`<option ${c===city?"selected":""}>${c}</option>`).join("")}</optgroup></select><span class="err">Choisissez votre ville.</span></label>
      <label class="flabel">Quartier et adresse<input class="field" name="address" autocomplete="street-address" placeholder="Quartier, rue, n°" value="${esc(cust.address||"")}" required><span class="err">Indiquez votre adresse.</span></label>
    </div>
    <details class="onote"><summary>${icon("plus")} Ajouter une note (créneau, message cadeau…)</summary><textarea class="field" name="note" rows="2" placeholder="Ex. livrer après 17 h"></textarea></details>
    <label class="ogift"><input type="checkbox" name="gift" ${orderCtx && orderCtx.gift ? "checked":""}> ${icon("gift")} <span>Emballage cadeau premium <small>+${fmt(C.giftWrap)}</small></span></label>
    <div class="ocod">${icon("cash")}<div><b>Paiement à la livraison</b><small>Vous payez en espèces à la réception. Aucun paiement en ligne.</small></div></div>
    <div id="oSubmitSlot"></div>
  </form>`;
}
function renderOrder(){
  const box = orderCtx.el; const T = totalsFor(orderCtx.items, orderCtx.gift);
  const keep = {}; const f0 = box.querySelector("#oform");
  if(f0) ["name","phone","city","address","note"].forEach(n => keep[n] = f0.elements[n].value);
  const cust = f0 ? keep : store.get("customer", {});
  box.innerHTML = `<ul class="otrust"><li>${icon("cash")} Paiement à la livraison</li><li>${icon("truck")} 24 à 72 h partout au Maroc</li><li>${icon("refresh")} Échange 7 jours</li></ul>`
    + recapHtml(orderCtx.items, T, orderCtx.source === "express") + formHtml(cust);
  if(keep.note){ box.querySelector("[name=note]").value = keep.note; box.querySelector(".onote").open = true; }
  const sub = `<button class="btn btn--wa btn--lg btn--block osubmit" type="submit" form="oform"><span class="osubmit__lbl">${icon("wa")}<span>Commander maintenant</span></span><span class="osubmit__tot">${fmt(T.total)}</span></button>
    <p class="fine" style="text-align:center;margin:0">Votre commande s'ouvre dans WhatsApp : appuyez sur Envoyer pour la valider.</p>`;
  if(orderCtx.foot){ orderCtx.foot.innerHTML = sub; box.querySelector("#oSubmitSlot").remove(); }
  else box.querySelector("#oSubmitSlot").outerHTML = sub;
  bindOrderForm(box);
}
function bindOrderForm(box){
  const f = box.querySelector("#oform");
  const ph = f.elements.phone;
  ph.addEventListener("input", () => { const d = normPhone(ph.value).slice(0,10); if(digits(ph.value).length >= 2) ph.value = fmtPhone(d); });
  f.addEventListener("change", e => {
    if(e.target.name === "gift"){ orderCtx.gift = e.target.checked; if(orderCtx.source === "cart"){ gift = e.target.checked; store.set("gift", gift); renderCart(); } renderOrder(); }
    const lab = e.target.closest(".flabel"); if(lab && lab.classList.contains("is-err")) validate(f, true);
  });
  box.addEventListener("click", e => {
    const q = e.target.closest("[data-oq]"); if(!q) return;
    const it = orderCtx.items[+q.dataset.i]; it.qty = Math.max(1, Math.min(10, it.qty + +q.dataset.oq)); renderOrder();
  });
  f.addEventListener("submit", e => { e.preventDefault(); if(validate(f)) submitOrder(f); });
}
function validate(f, quiet){
  let first = null;
  const chk = (n, ok) => { const lab = f.elements[n].closest(".flabel"); lab.classList.toggle("is-err", !ok); if(!ok && !first) first = f.elements[n]; };
  chk("name", f.elements.name.value.trim().split(/\s+/).join("").length >= 3);
  chk("phone", phoneOk(f.elements.phone.value));
  chk("city", !!f.elements.city.value);
  chk("address", f.elements.address.value.trim().length >= 4);
  if(first && !quiet) first.focus();
  return !first;
}
function submitOrder(f){
  const btn = (orderCtx.foot || f).querySelector(".osubmit"); btn.disabled = true; btn.classList.add("is-loading");
  const customer = { name: f.elements.name.value.trim(), phone: fmtPhone(normPhone(f.elements.phone.value)), city: f.elements.city.value, address: f.elements.address.value.trim(), note: f.elements.note.value.trim() };
  store.set("customer", { name: customer.name, phone: customer.phone, city: customer.city, address: customer.address });
  const items = orderCtx.items.map(x => ({...x}));
  const T = totalsFor(items, orderCtx.gift);
  const ref = "SL-" + Date.now().toString(36).toUpperCase().slice(-6);
  const order = { ref, date: new Date().toISOString(), customer, gift: orderCtx.gift, totals: { sub:T.sub, discount:Math.round(T.disc), shipping:T.ship, gift:T.giftFee, total:Math.round(T.total) },
    items: items.map(it => { const p = byId(it.id); return { id:p.id, name:p.name, type:p.type, options:itemOpts(it), qty:it.qty, price:p.price }; }) };
  const orders = store.get("orders", []); orders.unshift(order); store.set("orders", orders.slice(0,20));
  // Envoi au back-office (Google Sheets, Make, Zapier…) si une URL est configurée dans SL_CONFIG.orderWebhook
  if(C.orderWebhook){ try{ fetch(C.orderWebhook, { method:"POST", mode:"no-cors", headers:{ "Content-Type":"text/plain;charset=utf-8" }, body: JSON.stringify(order) }).catch(()=>{}); }catch(e){} }
  if(orderCtx.source === "cart"){ cart = []; saveCart(); }
  const wa = waLink(orderMessage(items, T, customer, ref));
  const win = window.open(wa, "_blank");
  if(!win) location.href = wa;
  setTimeout(() => {
    orderCtx.el.innerHTML = `<div class="odone">
      <div class="done__seal">${icon("check")}</div>
      <span class="eyebrow">Commande ${ref}</span>
      <h3 class="osheet__title" style="font-size:30px">Merci ${esc(customer.name.split(" ")[0])} !</h3>
      <p class="muted" style="margin:0">Votre commande s'est ouverte dans WhatsApp. Appuyez sur <b>Envoyer</b> pour la valider, nous préparons votre écrin dès réception.</p>
      <a class="btn btn--ghost btn--block" href="${wa}" target="_blank" rel="noopener">${icon("wa")}<span>Rouvrir WhatsApp</span></a>
      <ol class="otimeline"><li class="is-done"><b>Commande reçue</b><small>${items.length} article${items.length>1?"s":""} · ${fmt(T.total)}</small></li><li><b>Confirmation</b><small>Nous vous répondons sur WhatsApp au ${esc(customer.phone)}</small></li><li><b>Livraison à ${esc(customer.city)}</b><small>Sous 24 à 72 h · paiement en espèces</small></li></ol>
      <a class="link-u" href="index.html" data-close>Continuer mes achats</a></div>`;
    if(orderCtx.foot) orderCtx.foot.innerHTML = "";
    orderCtx.el.scrollTop = 0;
  }, 450);
}
function openOrder(source, items){
  if(source === "cart" && !cart.length) return;
  const el = $("#orderBody");
  orderCtx = { source, el, foot: $("#orderFoot"), items: source === "cart" ? cart : items, gift: source === "cart" ? gift : false };
  renderOrder(); closeLayers(); openLayer("order");
}
/* Page commande.html : même formulaire, intégré dans la page */
function mountOrderPage(el){
  if(!cart.length){ return false; }
  orderCtx = { source:"cart", el, foot: null, items: cart, gift }; renderOrder(); return true;
}

window.SL = { $, $$, IMG, fmt, icon, stars, card, byId, addToCart, toggleFav, openCart, toast, waLink, initReveal, initCarousel, ruleSvg, t, catName, COLOR_LABEL, cartTotals, cartWaMessage, orderMessage, totalsFor, openOrder, mountOrderPage, store, esc, logo, get cart(){return cart;}, clearCart(){ cart = []; saveCart(); }, get favs(){return favs;}, get lang(){return LANG;}, get gift(){return gift;} };

mountShell();
applyLang();
bindGlobal();
updateCounts();
renderCart();
document.addEventListener("DOMContentLoaded", () => initReveal());
if(document.readyState !== "loading") initReveal();
})();
