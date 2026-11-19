/* Page commande : réutilise le formulaire de commande unique (app.js) */
(function(){
const { $, icon } = window.SL;
const el = $("#coWrap");
if(!window.SL.mountOrderPage(el)){
  el.innerHTML = `<div class="done"><div class="done__seal">${icon("bag")}</div><h2 class="h-section">Votre panier est vide</h2><p class="muted" style="margin:0">Découvrez nos nouveautés et best-sellers.</p><a class="btn btn--dark" href="collection.html?c=nouveautes">Découvrir la collection</a></div>`;
}
})();
