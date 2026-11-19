/* Commande (paiement à la livraison) */
(function(){
const { $, $$, IMG, fmt, icon, byId, cartTotals, cartWaMessage, waLink, COLOR_LABEL, esc, store } = window.SL;
const C = window.SL_CONFIG;

$("#city").innerHTML = `<option value="">Choisissez votre ville</option>` + window.SL_CITIES.map(c=>`<option>${c}</option>`).join("");

function summary(){
  const cart = window.SL.cart, T = cartTotals();
  if(!cart.length){
    $("#coWrap").innerHTML = `<div class="done"><div class="done__seal">${icon("bag")}</div><h1 class="h-section">Votre panier est vide</h1><p class="muted">Découvrez nos nouveautés et best-sellers.</p><a class="btn btn--dark" href="collection.html?c=nouveautes">Découvrir la collection</a></div>`;
    return false;
  }
  $("#sumItems").innerHTML = cart.map(it=>{ const p = byId(it.id); return `<div class="citem"><span class="thumbqty"><img src="${IMG(p.imgs[0])}" alt=""><em>${it.qty}</em></span><div><div class="citem__top"><div><b>${esc(p.name)}</b><small>${esc(p.type)} · ${COLOR_LABEL[it.color]||""}${it.size?" · "+it.size:""}${it.variant?" · "+it.variant:""}</small></div><span style="font-size:14px;font-weight:500">${fmt(p.price*it.qty)}</span></div></div></div>`; }).join("");
  $("#sumTot").innerHTML = `
    <div class="sumrow"><span>Sous-total</span><span>${fmt(T.sub)}</span></div>
    ${T.disc?`<div class="sumrow sumrow--disc"><span>Remise parure (-15 %)</span><span>-${fmt(T.disc)}</span></div>`:""}
    ${T.giftFee?`<div class="sumrow"><span>Emballage cadeau premium</span><span>${fmt(T.giftFee)}</span></div>`:""}
    <div class="sumrow"><span>Livraison</span><span>${T.ship?fmt(T.ship):"Offerte"}</span></div>
    <div class="sumrow sumrow--total" style="font-size:20px;font-family:var(--serif)"><span>Total à payer à la livraison</span><span>${fmt(T.total)}</span></div>`;
  return true;
}
if(!summary()) return;

$$(".payopt").forEach(o => o.addEventListener("click", () => { if(o.classList.contains("is-disabled")) return; $$(".payopt").forEach(x=>x.classList.toggle("is-active",x===o)); o.querySelector("input").checked = true; }));

const phoneOk = v => /^(?:\+?212|0)?[5-7]\d{8}$/.test(v.replace(/[\s.-]/g,""));
$("#coForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target; let ok = true;
  const check = (name, valid) => { const lab = f.querySelector(`[name="${name}"]`).closest(".flabel"); lab.classList.toggle("is-err", !valid); if(!valid) ok = false; };
  check("name", f.elements["name"].value.trim().length >= 3);
  check("phone", phoneOk(f.phone.value));
  check("city", !!f.city.value);
  check("address", f.address.value.trim().length >= 6);
  if(!ok){ f.querySelector(".is-err .field").focus(); return; }
  const T = cartTotals();
  const num = "SL-" + Date.now().toString().slice(-6);
  const confirmBy = f.confirm.value;
  const msg = `Commande ${num}\nNom : ${f.elements["name"].value}\nTéléphone : ${f.phone.value}\nVille : ${f.city.value}\nAdresse : ${f.address.value}${f.note.value?`\nNote : ${f.note.value}`:""}\n\n` + cartWaMessage();
  store.set("lastOrder", { num, total:T.total, name:f.elements["name"].value, city:f.city.value });
  // Intégration : envoyer ici la commande à votre back-office (Shopify Draft Order, YouCan, Google Sheet…)
  window.SL.clearCart();
  $("#coWrap").innerHTML = `<div class="done">
    <div class="done__seal">${icon("check")}</div>
    <span class="eyebrow">Commande ${num}</span>
    <h1 class="h-section">Merci ${esc(f.elements["name"].value.split(" ")[0])}, votre commande est enregistrée</h1>
    <p class="lead" style="margin:0">${confirmBy==="wa"?"Confirmez-la en un clic sur WhatsApp, notre conseillère vous répond dans l'heure.":"Notre conseillère va vous appeler au "+esc(f.phone.value)+" pour confirmer votre commande."} Livraison sous 24 à 72 h à ${esc(f.city.value)}.</p>
    <div class="done__card"><div class="sumrow"><span>Montant à payer à la livraison</span><b>${fmt(T.total)}</b></div><div class="sumrow"><span>Mode de paiement</span><span>Espèces à la livraison</span></div><div class="sumrow"><span>Adresse</span><span style="text-align:end">${esc(f.address.value)}, ${esc(f.city.value)}</span></div></div>
    <a class="btn btn--wa btn--lg btn--block" target="_blank" rel="noopener" href="${waLink(msg)}">${icon("wa")} Confirmer sur WhatsApp</a>
    <a class="link-u" href="index.html">Retour à la boutique</a></div>`;
  window.scrollTo({top:0, behavior:"smooth"});
});
})();
