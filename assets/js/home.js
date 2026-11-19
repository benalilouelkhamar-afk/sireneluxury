/* Page d'accueil */
(function(){
const { $, $$, IMG, fmt, icon, stars, card, byId, addToCart, waLink, initReveal, initCarousel, ruleSvg, t, catName, openCart, toast } = window.SL;
const P = window.SL_PRODUCTS, C = window.SL_CONFIG;

$$("[data-rule]").forEach(el => el.outerHTML = ruleSvg);
$$("[data-wa-general]").forEach(a => { a.href = waLink("Bonjour Sirène Luxury, j'aimerais découvrir vos bijoux et passer commande."); a.target = "_blank"; a.rel = "noopener"; });

/* Hero slider */
(function(){
  const slides = $$(".hero__slide"), dots = $$(".hero__dot"), num = $("#heroNum"); let i = 0, tm;
  const go = n => { i = (n + slides.length) % slides.length;
    slides.forEach((s,k)=>s.classList.toggle("is-active",k===i));
    dots.forEach((d,k)=>{ d.classList.remove("is-active"); void d.offsetWidth; d.classList.toggle("is-active",k===i); });
    num.textContent = "0"+(i+1); clearTimeout(tm); tm = setTimeout(()=>go(i+1), 6000); };
  dots.forEach((d,k)=>d.addEventListener("click",()=>go(k)));
  // swipe
  let x0 = null; const h = $(".hero");
  h.addEventListener("touchstart", e => x0 = e.touches[0].clientX, {passive:true});
  h.addEventListener("touchend", e => { if(x0===null) return; const dx = e.changedTouches[0].clientX - x0; if(Math.abs(dx)>50) go(i + (dx<0?1:-1)); x0=null; });
  go(0);
})();

/* Réassurance */
$("#reassure").innerHTML = [["sparkle","re.1","re.1s"],["shield","re.2","re.2s"],["truck","re.3","re.3s"],["cash","re.4","re.4s"]]
  .map(([ic,a,b],k)=>`<div class="reassure__item reveal reveal-d${k}">${icon(ic)}<b>${t(a)}</b><small>${t(b)}</small></div>`).join("");

/* Catégories */
const catList = [["colliers","Chaînes, pendentifs"],["bracelets","Joncs, gourmettes"],["bagues","Fines, réglables"],["boucles","Créoles, puces"],["parures","-15 % sur l'ensemble"]];
$("#cats").innerHTML = catList.map(([k,s],n)=>{ const c = window.SL_CATS[k]; const count = P.filter(p=>p.cat===k).length;
  return `<a class="cat reveal reveal-d${n%3}" href="collection.html?c=${k}"><img src="${IMG(c.img)}" alt="${catName(k)}" loading="lazy"><div class="cat__label"><div><h3>${c.short && window.SL.lang!=="ar" ? c.short : catName(k)}</h3><small>${s} · ${count} pièces</small></div><span class="cat__arrow">${icon("arrow")}</span></div></a>`; }).join("");

/* Nouveautés (8) */
$("#newTrack").innerHTML = P.filter(p=>p.tags.includes("new")).slice(0,8).map(card).join("");

/* Best-sellers (8) */
$("#bestGrid").innerHTML = P.filter(p=>p.tags.includes("best") && p.cat!=="parures").slice(0,8).map((p,i)=>`<div class="reveal reveal-d${i%4}">${card(p)}</div>`).join("");

/* Pourquoi */
$("#whyList").innerHTML = [
  ["sparkle","Ne noircit pas","Le plaquage or épais et l'acier 316L gardent leur couleur, même portés chaque jour."],
  ["rust","Ne rouille pas","Aucune oxydation : vos bijoux restent nets, sans traces vertes sur la peau."],
  ["drop","Résiste à l'eau","Douche, piscine, plage : nul besoin de les retirer."],
  ["flask","Parfum & transpiration","Insensibles au parfum, aux crèmes et à la chaleur de l'été marocain."]
].map(([ic,h,p])=>`<div class="why__row">${icon(ic)}<div><h4>${h}</h4><p>${p}</p></div></div>`).join("");

/* Shop the look */
(function(){
  const spots = [ ["malak",63,35], ["lina",56,52], ["imane",53,70], ["hiba",27,62], ["dounia",32,84], ["rim",51,83] ];
  const media = $(".look__media"), pop = $("#lookPop"), list = $("#lookList");
  media.insertAdjacentHTML("beforeend", spots.map(([id,x,y],i)=>`<button class="hotspot" style="left:${x}%;top:${y}%" data-spot="${i}" aria-label="Voir ${byId(id).name}"></button>`).join(""));
  list.innerHTML = spots.map(([id],i)=>{ const p = byId(id); return `<a class="look__item" href="produit.html?id=${p.id}" data-item="${i}"><span class="look__num">0${i+1}</span><img src="${IMG(p.imgs[0])}" alt="" loading="lazy"><div><b>${p.name}</b><small>${p.type}</small></div><span style="font-size:14px;font-weight:500">${fmt(p.price)}</span></a>`; }).join("");
  const total = spots.reduce((a,[id])=>a+byId(id).price,0);
  $("#lookTotal").innerHTML = `<span>${fmt(total)}</span>`;
  const show = i => {
    const [id,x,y] = spots[i]; const p = byId(id);
    $$(".hotspot").forEach((h,k)=>h.classList.toggle("is-active",k===i));
    $$(".look__item").forEach((h,k)=>h.classList.toggle("is-active",k===i));
    pop.innerHTML = `<img src="${IMG(p.imgs[0])}" alt=""><div><b>${p.name}</b><small>${p.type}<br>${fmt(p.price)}</small><br><a class="link-u" href="produit.html?id=${p.id}">Voir la fiche</a></div>`;
    const left = Math.min(Math.max(x, 4), 96 - (230/media.clientWidth*100));
    pop.style.left = left + "%"; pop.style.top = (y > 60 ? y - 22 : y + 5) + "%";
    pop.classList.add("is-open");
  };
  media.addEventListener("click", e => { const h = e.target.closest(".hotspot"); if(h){ e.preventDefault(); show(+h.dataset.spot); } else if(!e.target.closest(".look__pop")) { pop.classList.remove("is-open"); $$(".hotspot").forEach(x=>x.classList.remove("is-active")); } });
  $$(".look__item").forEach(el => el.addEventListener("mouseenter", () => show(+el.dataset.item)));
  $("#lookAdd").addEventListener("click", () => { spots.forEach(([id])=>addToCart(id,{},1,true)); openCart(); });
})();

/* Avis */
$("#bigStars").innerHTML = stars(5, true);
$("#revTrack").innerHTML = window.SL_REVIEWS.map(r=>{ const p = byId(r.product); return `<article class="review"><div class="review__img"><img src="${IMG(r.img)}" alt="Bijou porté par ${r.name}" loading="lazy"></div><div class="review__body">${stars(r.rating)}<p>« ${r.text} »</p><a class="fine" href="produit.html?id=${p.id}" style="text-decoration:underline">${p.name} — ${p.type}</a><div class="review__who"><span><b>${r.name}</b> · ${r.city}</span><span class="verified">${icon("check")} Achat vérifié</span></div></div></article>`; }).join("");

/* Instagram */
$("#insta").innerHTML = ["look-caftan","bracelets-trefles","lifestyle-montre","parure-emeraude","poignet-bracelets","chaines-flatlay"].map(n=>`<a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Voir sur Instagram"><img src="assets/img/${n}-sm.webp" alt="" loading="lazy">${icon("insta")}</a>`).join("");
$("#igBtn").href = C.instagram;
$("#igBtn").insertAdjacentHTML("afterbegin", icon("insta"));

/* Newsletter toggle */
$$("#nlToggle button").forEach(b => b.addEventListener("click", () => {
  $$("#nlToggle button").forEach(x=>x.classList.toggle("is-active", x===b));
  const f = $("#nlField"); if(!f) return;
  if(b.dataset.mode === "wa"){ f.type = "tel"; f.placeholder = "06 00 00 00 00"; f.setAttribute("aria-label","Numéro WhatsApp"); }
  else { f.type = "email"; f.placeholder = "Votre adresse e-mail"; f.setAttribute("aria-label","Adresse e-mail"); }
}));

$$("[data-carousel]").forEach(initCarousel);
initReveal();
})();
