"""Génère les pages secondaires à partir du <head> de index.html.
Usage : python3 tools/build_pages.py  (depuis la racine du projet)"""
import re, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
head = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read().split('<body')[0]
head = head.replace('<link rel="preload" as="image" href="assets/img/look-caftan.webp">\n', '')

def page(fname, title, desc, page_attr, main, scripts=()):
    h = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', head)
    h = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{desc}">', h)
    s = ''.join(f'<script src="assets/js/{x}"></script>\n' for x in scripts)
    html = (h + f'<body data-page="{page_attr}">\n\n<main id="main">\n{main}\n</main>\n\n'
            '<script src="assets/js/data.js"></script>\n<script src="assets/js/app.js"></script>\n' + s + '</body>\n</html>\n')
    open(os.path.join(ROOT, fname), 'w', encoding='utf-8').write(html)

def hero(eyebrow, title, text, img):
    return f'''<section class="phero"><img src="assets/img/{img}.webp" alt=""><div class="container phero__in">
  <nav class="crumbs" style="color:rgba(250,247,242,.7);padding:0"><a href="index.html">Accueil</a><span>/</span><span style="color:#fff">{title}</span></nav>
  <span class="eyebrow">{eyebrow}</span><h1 class="h-display" style="font-size:clamp(42px,7vw,76px)">{title}</h1><p>{text}</p></div></section>'''

def content(fname, title, desc, eyebrow, lead, img, body):
    page(fname, f'{title} — Sirène Luxury', desc, 'content',
         hero(eyebrow, title, lead, img) + f'\n<section class="section"><div class="container"><div class="prose reveal">{body}</div></div></section>')

IC = lambda d: f'<svg class="icon" viewBox="0 0 24 24">{d}</svg>'
SPARK='<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M6.3 17.7l2.4-2.4M15.3 8.7l2.4-2.4"/><circle cx="12" cy="12" r="1.6"/>'
HEART='<path d="M12 20s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>'
SHIELD='<path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6z"/><path d="M9 12l2 2 4-4"/>'
WAVE='<path d="M2 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 18.5c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><circle cx="12" cy="6.5" r="2.5"/>'
PHONE='<path d="M5 4h4l1.5 4.5-2.3 1.4a11 11 0 0 0 6 6l1.4-2.3L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z"/>'
MAIL='<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>'
INSTA='<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/>'
PLUS='<path d="M12 5v14M5 12h14"/>'

# ---------- Collection
page('collection.html', 'Collection — Sirène Luxury', 'Colliers, bracelets, bagues, boucles d\'oreilles et parures en acier inoxydable et Xuping plaqué or. Livraison partout au Maroc.', 'collection', '''
<section class="phero" id="phero"></section>
<div class="container">
  <div class="subcats" id="subcats"></div>
  <div class="toolbar">
    <button class="toolbar__btn toolbar__filter" id="filterBtn"><svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>Filtrer</button>
    <span class="muted" style="font-size:12.5px" id="count"></span>
    <label style="display:flex;align-items:center;gap:4px;font-size:12.5px"><span class="muted hide-sm" style="display:none">Trier :</span>
      <select id="sort" aria-label="Trier"><option value="feat">Mis en avant</option><option value="new">Nouveautés</option><option value="rating">Les plus aimés</option><option value="asc">Prix croissant</option><option value="desc">Prix décroissant</option></select></label>
  </div>
  <div class="layout" style="padding-bottom:80px">
    <aside class="filters" id="filters" aria-label="Filtres"></aside>
    <div class="pgrid pgrid--cat" id="grid"></div>
  </div>
</div>
<div class="drawer" id="filterDrawer"><div class="drawer__scrim" data-fclose></div><aside class="drawer__panel" role="dialog" aria-label="Filtres">
  <div class="drawer__head"><span class="drawer__title">Filtres</span><button class="icon-btn" data-fclose aria-label="Fermer"><svg class="icon" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="drawer__body" id="filtersM"></div>
  <div class="cart__foot"><button class="btn btn--dark btn--block" data-fclose>Voir les bijoux</button></div></aside></div>''', ['collection.js'])

# ---------- Produit
page('produit.html', 'Bijou — Sirène Luxury', 'Bijou plaqué or qui ne noircit pas, hypoallergénique et résistant à l\'eau. Commandez sur WhatsApp ou payez à la livraison.', 'product', '''
<div class="container"><nav class="crumbs" id="crumbs"></nav><div class="pdp" id="pdp"></div></div>
<section class="section section--pearl" id="bundleWrap"><div class="container" style="max-width:880px">
  <div class="s-head"><span class="eyebrow">-15 % dès 3 pièces</span><h2 class="h-section" data-i18n="pdp.complete">Complétez la parure</h2></div>
  <div class="bundle" id="bundle"></div></div></section>
<section class="section"><div class="container" id="avis"></div></section>
<section class="section section--pearl"><div class="container carousel" id="like">
  <div class="s-head s-head--split"><div><span class="eyebrow">Sélection</span><h2 class="h-section" style="margin-top:10px" data-i18n="pdp.like">Vous aimerez aussi</h2></div>
  <div class="carousel__nav"><button class="carousel__btn" data-prev aria-label="Précédent"><svg class="icon" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button class="carousel__btn" data-next aria-label="Suivant"><svg class="icon" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button></div></div>
  <div class="carousel__track" id="likeTrack"></div><div class="carousel__bar"><i></i></div></div></section>
<div class="sticky-buy" id="stickyBuy"><div style="grid-column:1/-1;font-size:12.5px;display:flex;justify-content:space-between" id="stickyName"></div>
  <button class="btn btn--dark" id="stickyAdd">Ajouter au panier</button><a class="btn btn--wa" id="stickyWa" target="_blank" rel="noopener">Commander</a></div>''', ['product.js'])

# ---------- Commande
page('commande.html', 'Commande — Sirène Luxury', 'Finalisez votre commande Sirène Luxury : paiement à la livraison partout au Maroc.', 'checkout', '''
<div class="container" id="coWrap">
  <nav class="crumbs"><a href="index.html">Accueil</a><span>/</span><span>Commande</span></nav>
  <div class="co">
    <div class="co__box">
      <div class="co__steps"><b>1. Coordonnées</b><i></i><span>2. Confirmation</span><i></i><span>3. Livraison</span></div>
      <h1 class="h-section" style="font-size:clamp(30px,4vw,40px);margin-bottom:6px">Vos coordonnées de livraison</h1>
      <p class="muted" style="margin:0 0 24px;font-size:14px">Aucun paiement en ligne requis : vous réglez en espèces à la réception de votre écrin.</p>
      <form id="coForm" novalidate class="fgrid">
        <label class="flabel">Nom complet<input class="field" name="name" autocomplete="name" placeholder="Ex. Salma Benali" required><span class="err">Merci d'indiquer votre nom complet.</span></label>
        <label class="flabel">Téléphone (WhatsApp de préférence)<span class="tel"><span>+212</span><input class="field" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="6 12 34 56 78" required></span><span class="err">Numéro marocain invalide (ex. 06 12 34 56 78).</span></label>
        <label class="flabel">Ville<select class="field" name="city" id="city" required></select><span class="err">Choisissez votre ville.</span></label>
        <label class="flabel">Adresse complète<input class="field" name="address" autocomplete="street-address" placeholder="Quartier, rue, numéro, étage…" required><span class="err">Merci d'indiquer votre adresse.</span></label>
        <label class="flabel">Note pour la livraison (facultatif)<textarea class="field" name="note" placeholder="Créneau préféré, message pour une carte cadeau…"></textarea></label>
        <div style="margin-top:8px"><h2 style="font-size:24px;margin-bottom:12px">Paiement</h2>
          <div class="fgrid">
            <label class="payopt is-active"><input type="radio" name="pay" value="cod" checked><span><b>Paiement à la livraison</b><small>Réglez en espèces à la réception</small></span><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="6.5" width="18" height="11" rx="1.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v5M17.5 9.5v5"/></svg></label>
            <label class="payopt is-disabled"><input type="radio" name="pay" value="card" disabled><span><b>Carte bancaire</b><small>Bientôt disponible (CMI)</small></span><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3 10h18M6.5 15h4"/></svg></label>
          </div></div>
        <div style="margin-top:8px"><h2 style="font-size:24px;margin-bottom:12px">Confirmation de la commande</h2>
          <div class="confirm-choice">
            <label class="payopt is-active" style="grid-template-columns:22px 1fr"><input type="radio" name="confirm" value="wa" checked><span><b>Par WhatsApp</b><small>Le plus rapide</small></span></label>
            <label class="payopt" style="grid-template-columns:22px 1fr"><input type="radio" name="confirm" value="call"><span><b>Par appel</b><small>Sous 2 h ouvrées</small></span></label>
          </div></div>
        <button class="btn btn--dark btn--lg btn--block" style="margin-top:12px">Valider ma commande</button>
        <p class="fine" style="text-align:center;margin:0">En validant, vous acceptez nos <a href="cgv.html" style="text-decoration:underline">conditions générales de vente</a>.</p>
      </form>
    </div>
    <aside class="co__summary"><div class="co__box" style="background:var(--ivory-2)">
      <h2 style="font-size:26px;margin-bottom:6px">Votre écrin</h2>
      <div id="sumItems"></div><div id="sumTot" style="display:grid;gap:8px;padding-top:16px"></div>
      <div class="perks" style="margin-top:20px;background:var(--ivory)"><div>Livraison 24 à 72 h</div><div>Échange 7 jours</div><div>Ne noircit pas</div><div>Écrin offert</div></div>
    </div></aside>
  </div>
</div>
<script>document.addEventListener("click",function(e){var o=e.target.closest(".confirm-choice .payopt");if(!o)return;document.querySelectorAll(".confirm-choice .payopt").forEach(function(x){x.classList.toggle("is-active",x===o)});});</script>''', ['checkout.js'])

# ---------- À propos
content('a-propos.html', 'Notre histoire', 'L\'histoire de Sirène Luxury, joaillerie marocaine en acier inoxydable et Xuping plaqué or.', 'À propos', 'Une maison marocaine née d\'une conviction : le luxe doit pouvoir se porter tous les jours.', 'look-caftan', f'''
<div class="split" style="max-width:none"><div><span class="eyebrow">Depuis l'Atlantique</span><h2 style="margin-top:8px">L'éclat d'une sirène</h2>
<p>Sirène Luxury est née d'une frustration partagée par beaucoup de Marocaines : des bijoux magnifiques le premier jour, qui noircissent après quelques semaines. Nous avons voulu créer une maison qui réconcilie l'élégance des grandes joailleries et la réalité de nos vies : la plage, le hammam, le parfum, la chaleur de l'été.</p>
<p>Comme la sirène qui garde ses trésors intacts au fond de l'océan, nos bijoux sont façonnés pour traverser le temps sans perdre leur lumière.</p></div>
<img src="assets/img/lifestyle-lin.webp" alt="Femme portant un collier Sirène Luxury" loading="lazy"></div>
<h2>Nos valeurs</h2>
<div class="values">
<div class="value">{IC(SPARK)}<h3>Durabilité</h3><p>Uniquement de l'acier inoxydable 316L et du Xuping plaqué or 18 carats, sélectionnés pour ne jamais noircir.</p></div>
<div class="value">{IC(HEART)}<h3>Féminité</h3><p>Des pièces dessinées pour toutes les femmes, du quotidien au jour de fête, du jean au caftan.</p></div>
<div class="value">{IC(SHIELD)}<h3>Confiance</h3><p>Paiement à la livraison, échange sous 7 jours et une conseillère disponible sur WhatsApp.</p></div>
</div>
<h2>Notre promesse qualité</h2>
<div class="steps"><div><h3>Sélection</h3><p>Chaque modèle est testé à l'eau, au parfum et à la transpiration avant d'entrer en collection.</p></div><div><h3>Contrôle</h3><p>Chaque bijou est inspecté à la main : fermoir, soudures, polissage et éclat.</p></div><div><h3>Écrin</h3><p>Livré dans son écrin signature avec chamoisine et carte d'entretien.</p></div></div>
<p class="note">Si un bijou Sirène Luxury change de couleur dans les 6 mois suivant votre achat, nous vous l'échangeons. C'est notre garantie éclat.</p>''')

# ---------- Entretien
content('entretien.html', 'Guide d\'entretien', 'Comment entretenir vos bijoux en acier inoxydable et Xuping pour qu\'ils gardent leur éclat.', 'Conseils', 'Quelques gestes simples pour que vos bijoux gardent leur éclat d\'origine pendant des années.', 'c-macro', f'''
<h2 style="margin-top:0">Ce que vos bijoux supportent</h2>
<div class="table-wrap"><table class="table"><thead><tr><th>Situation</th><th>Acier inoxydable</th><th>Xuping</th></tr></thead><tbody>
<tr><td>Douche, mer, piscine</td><td>Oui</td><td>Oui, rincer à l'eau claire</td></tr>
<tr><td>Parfum et crèmes</td><td>Oui</td><td>Oui, appliquer avant de mettre le bijou</td></tr>
<tr><td>Transpiration, sport</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Hammam, gommage</td><td>Oui</td><td>Retirer de préférence</td></tr>
<tr><td>Produits ménagers, chlore concentré</td><td>Éviter</td><td>Éviter</td></tr></tbody></table></div>
<h2>Les bons gestes</h2>
<div class="steps"><div><h3>Essuyer</h3><p>Passez la chamoisine offerte après chaque port pour retirer sébum et résidus de parfum.</p></div><div><h3>Nettoyer</h3><p>Une fois par mois : eau tiède, une goutte de savon doux, brosse souple, puis séchage complet.</p></div><div><h3>Ranger</h3><p>Chaque bijou dans son pochon, à l'abri de l'humidité, pour éviter les rayures entre pièces.</p></div></div>
<h2>Les zircons et la nacre</h2>
<p>Les pierres et la nacre se nettoient uniquement avec un chiffon doux et sec. Évitez les ultrasons et les produits à bijoux abrasifs qui pourraient ternir leur surface.</p>
<p class="note">Une question sur un bijou en particulier ? Écrivez-nous sur WhatsApp, nous vous répondons avec plaisir.</p>''')

# ---------- Guide des tailles
content('guide-tailles.html', 'Guide des tailles', 'Trouvez votre taille de bague et de bracelet Sirène Luxury.', 'Bagues & bracelets', 'Trouvez la taille parfaite en quelques secondes, avec un simple fil ou une bague que vous possédez déjà.', 'c-bague-duo', '''
<h2 style="margin-top:0">Bagues</h2>
<p>Enroulez un fil autour de la base de votre doigt, marquez le point de jonction puis mesurez la longueur en millimètres : c'est votre tour de doigt.</p>
<div class="ring-tool"><label class="flabel">Votre tour de doigt (mm)<input class="range" type="range" min="44" max="64" value="54" id="rt"></label><div style="display:flex;align-items:baseline;gap:12px"><output id="rtOut">54</output><span class="muted">taille française recommandée</span></div></div>
<div class="table-wrap"><table class="table"><thead><tr><th>Taille FR</th><th>Tour de doigt</th><th>Diamètre</th></tr></thead><tbody>
<tr><td>50</td><td>50 mm</td><td>15,9 mm</td></tr><tr><td>52</td><td>52 mm</td><td>16,5 mm</td></tr><tr><td>54</td><td>54 mm</td><td>17,2 mm</td></tr><tr><td>56</td><td>56 mm</td><td>17,8 mm</td></tr><tr><td>58</td><td>58 mm</td><td>18,5 mm</td></tr><tr><td>Réglable</td><td>50 à 58 mm</td><td>—</td></tr></tbody></table></div>
<h2>Bracelets et joncs</h2>
<p>Mesurez votre tour de poignet juste sous l'os, puis ajoutez 1 à 2 cm selon l'aisance souhaitée.</p>
<div class="table-wrap"><table class="table"><thead><tr><th>Tour de poignet</th><th>Taille conseillée</th><th>Porté</th></tr></thead><tbody>
<tr><td>14 à 15 cm</td><td>16 cm</td><td>Ajusté</td></tr><tr><td>15 à 16 cm</td><td>17 cm</td><td>Classique</td></tr><tr><td>16 à 17 cm</td><td>18 cm</td><td>Classique</td></tr></tbody></table></div>
<p class="note">Entre deux tailles ? Choisissez la plus grande. L'échange de taille est gratuit sous 7 jours.</p>
<script>(function(){var r=document.getElementById("rt"),o=document.getElementById("rtOut");function u(){var v=+r.value,s=[50,52,54,56,58].reduce(function(a,b){return Math.abs(b-v)<Math.abs(a-v)?b:a});o.textContent=s;}r.addEventListener("input",u);u();})();</script>''')

# ---------- FAQ
faqs = [
 ("Produits", "Est-ce que les bijoux noircissent ?", "Non. Nos bijoux sont en acier inoxydable 316L ou en Xuping plaqué or 18 carats : ils ne noircissent pas, ne rouillent pas et ne laissent pas de traces vertes sur la peau. Ils sont couverts par notre garantie éclat de 6 mois."),
 ("Produits", "Puis-je les porter sous la douche ou à la mer ?", "Oui. Ils résistent à l'eau, à la mer, au parfum et à la transpiration. Un simple rinçage à l'eau claire après la mer ou la piscine suffit."),
 ("Produits", "Les bijoux sont-ils hypoallergéniques ?", "Oui, ils sont sans nickel et conviennent aux peaux sensibles, y compris pour les boucles d'oreilles."),
 ("Livraison", "Quels sont les délais de livraison ?", "Nous livrons partout au Maroc en 24 à 48 h pour Casablanca, Rabat et les grandes villes, et en 48 à 72 h pour les autres villes."),
 ("Livraison", "Combien coûte la livraison ?", "La livraison coûte 35 DH et elle est offerte dès 400 DH d'achat."),
 ("Paiement", "Comment puis-je payer ?", "Le paiement se fait en espèces à la livraison. Vous ne payez qu'à la réception de votre colis. Le paiement par carte bancaire arrive bientôt."),
 ("Paiement", "Comment ma commande est-elle confirmée ?", "Après votre commande, une conseillère vous contacte par appel ou par WhatsApp pour confirmer l'adresse et le créneau de livraison."),
 ("Échanges", "Puis-je échanger un bijou ?", "Oui, l'échange est gratuit sous 7 jours après réception, pour un bijou non porté et dans son emballage d'origine. Contactez-nous sur WhatsApp pour l'organiser."),
 ("Échanges", "Et si ma taille ne convient pas ?", "L'échange de taille de bague ou de bracelet est gratuit sous 7 jours. Consultez notre guide des tailles avant de commander."),
 ("Cadeaux", "Proposez-vous un emballage cadeau ?", "Chaque bijou est livré dans son écrin. Vous pouvez ajouter l'emballage cadeau premium (écrin velours, ruban satin et carte manuscrite) pour 25 DH dans le panier."),
]
cats = []
[cats.append(c) for c,_,_ in faqs if c not in cats]
faq_html = '<div class="faq-cats">' + ''.join(f'<a class="chip" href="#{c.lower()}">{c}</a>' for c in cats) + '</div>'
for c in cats:
    faq_html += f'<h2 id="{c.lower()}">{c}</h2><div class="faq">' + ''.join(f'<details><summary>{q}{IC(PLUS)}</summary><div class="ans">{a}</div></details>' for cc,q,a in faqs if cc==c) + '</div>'
faq_html += '<p class="note" style="margin-top:36px">Vous ne trouvez pas votre réponse ? <a href="contact.html">Contactez-nous</a>, nous répondons sur WhatsApp 7 jours sur 7.</p>'
content('faq.html', 'Questions fréquentes', 'FAQ Sirène Luxury : noircissement, livraison, paiement à la livraison, échanges.', 'FAQ', 'Tout ce que vous devez savoir sur nos bijoux, la livraison et les échanges.', 'poignet-bracelets', faq_html)

# ---------- Livraison
content('livraison.html', 'Livraison et échanges', 'Livraison partout au Maroc en 24 à 72 h, paiement à la livraison, échange sous 7 jours.', 'Service client', 'Livraison partout au Maroc, paiement à la réception et échange gratuit sous 7 jours.', 'parure-trefle-chaine', '''
<h2 style="margin-top:0">Livraison</h2>
<div class="table-wrap"><table class="table"><thead><tr><th>Destination</th><th>Délai</th><th>Tarif</th></tr></thead><tbody>
<tr><td>Casablanca, Rabat, Mohammédia</td><td>24 h</td><td>35 DH · offerte dès 400 DH</td></tr>
<tr><td>Marrakech, Tanger, Fès, Agadir, Meknès</td><td>24 à 48 h</td><td>35 DH · offerte dès 400 DH</td></tr>
<tr><td>Autres villes du Maroc</td><td>48 à 72 h</td><td>35 DH · offerte dès 400 DH</td></tr></tbody></table></div>
<div class="steps"><div><h3>Commande</h3><p>Sur le site ou sur WhatsApp, en moins d'une minute.</p></div><div><h3>Confirmation</h3><p>Une conseillère vous appelle ou vous écrit pour valider l'adresse.</p></div><div><h3>Livraison</h3><p>Vous payez en espèces au livreur à la réception de votre écrin.</p></div></div>
<h2>Échanges</h2>
<p>Vous disposez de 7 jours après réception pour échanger un bijou. Il doit être non porté, dans son écrin et son emballage d'origine. Les boucles d'oreilles ne sont pas échangeables pour des raisons d'hygiène, sauf défaut.</p>
<ul><li>Contactez-nous sur WhatsApp avec votre numéro de commande.</li><li>Nous organisons la récupération par notre livreur.</li><li>Le nouveau bijou vous est envoyé dès réception, sans frais pour un échange de taille.</li></ul>
<h2 id="garantie">Garantie éclat</h2>
<p>Si un bijou change de couleur dans les 6 mois suivant l'achat dans des conditions normales d'utilisation, nous le remplaçons.</p>''')

# ---------- CGV
content('cgv.html', 'Conditions générales de vente', 'Conditions générales de vente de Sirène Luxury.', 'Légal', 'Conditions applicables à toute commande passée sur le site ou via WhatsApp.', 'chaines-flatlay', '''
<p class="note" style="margin-top:0">Modèle de démonstration, à faire valider par un professionnel du droit avant mise en ligne.</p>
<h2>1. Objet</h2><p>Les présentes conditions régissent les ventes de bijoux réalisées par Sirène Luxury auprès de clients particuliers résidant au Maroc, conformément à la loi n° 31-08 édictant des mesures de protection du consommateur.</p>
<h2>2. Produits et prix</h2><p>Les prix sont indiqués en dirhams marocains (DH), toutes taxes comprises. Les photographies sont aussi fidèles que possible mais ne sont pas contractuelles.</p>
<h2>3. Commande</h2><p>La commande est validée après confirmation téléphonique ou par WhatsApp. Sirène Luxury se réserve le droit d'annuler toute commande non confirmée.</p>
<h2>4. Paiement</h2><p>Le paiement s'effectue en espèces à la livraison. D'autres moyens de paiement pourront être proposés ultérieurement.</p>
<h2>5. Livraison</h2><p>Les délais et tarifs sont détaillés sur la page <a href="livraison.html">Livraison et échanges</a>.</p>
<h2>6. Droit de rétractation et échanges</h2><p>Le client dispose de 7 jours à compter de la réception pour exercer son droit de rétractation ou demander un échange, selon les conditions décrites sur la page Livraison et échanges.</p>
<h2>7. Garantie</h2><p>Les bijoux bénéficient de la garantie légale des défauts de la chose vendue et de la garantie éclat Sirène Luxury de 6 mois.</p>
<h2 id="mentions">Mentions légales</h2><p>Sirène Luxury — [Raison sociale], [adresse], RC [numéro], ICE [numéro], IF [numéro]. Contact : via la page <a href="contact.html">Contact</a>.</p>''')

# ---------- Confidentialité
content('confidentialite.html', 'Politique de confidentialité', 'Politique de confidentialité et protection des données de Sirène Luxury.', 'Légal', 'Comment nous collectons, utilisons et protégeons vos données personnelles.', 'lifestyle-montre', '''
<p class="note" style="margin-top:0">Modèle de démonstration, à adapter et à déclarer auprès de la CNDP avant mise en ligne.</p>
<h2>Données collectées</h2><p>Nom, numéro de téléphone, ville, adresse de livraison et, si vous vous inscrivez à la newsletter, votre e-mail ou numéro WhatsApp.</p>
<h2>Utilisation</h2><ul><li>Traiter, confirmer et livrer vos commandes.</li><li>Vous envoyer nos offres, uniquement avec votre accord.</li><li>Améliorer notre service client.</li></ul>
<h2>Partage</h2><p>Vos données sont transmises uniquement à notre partenaire de livraison pour l'acheminement de votre colis. Elles ne sont jamais vendues.</p>
<h2>Vos droits</h2><p>Conformément à la loi n° 09-08, vous disposez d'un droit d'accès, de rectification et d'opposition. Il suffit de nous écrire via la page <a href="contact.html">Contact</a>.</p>
<h2>Cookies</h2><p>Le site utilise uniquement le stockage local de votre navigateur pour mémoriser votre panier, vos favoris et votre langue.</p>''')

# ---------- Contact
content('contact.html', 'Contact', 'Contactez Sirène Luxury par WhatsApp, téléphone ou e-mail.', 'Nous sommes là', 'Une conseillère vous répond 7 jours sur 7 pour vous aider à choisir, commander ou suivre votre colis.', 'lifestyle-lin', f'''
<div class="contact-cards" style="margin-bottom:40px">
<a class="ccard" href="https://wa.me/212600000000" target="_blank" rel="noopener"><svg class="icon" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2z"/></svg><h3>WhatsApp</h3><p>Réponse en moins d'une heure, de 9 h à 22 h.</p><span class="link-u">Écrire</span></a>
<a class="ccard" href="tel:+212600000000">{IC(PHONE)}<h3>Téléphone</h3><p>+212 6 00 00 00 00<br>Du lundi au samedi.</p><span class="link-u">Appeler</span></a>
<a class="ccard" href="https://www.instagram.com/sireneluxury59/" target="_blank" rel="noopener">{IC(INSTA)}<h3>Instagram</h3><p>@sireneluxury59<br>Nouveautés et coulisses.</p><span class="link-u">Suivre</span></a>
</div>
<h2 style="margin-top:0">Écrivez-nous</h2>
<form class="fgrid" data-news data-msg="Merci, votre message est bien envoyé. Nous vous répondons très vite.">
<div class="fgrid fgrid--2"><label class="flabel">Prénom<input class="field" required></label><label class="flabel">Téléphone ou e-mail<input class="field" required></label></div>
<label class="flabel">Sujet<select class="field"><option>Conseil sur un bijou</option><option>Suivi de commande</option><option>Échange</option><option>Partenariat</option></select></label>
<label class="flabel">Message<textarea class="field" required></textarea></label>
<button class="btn btn--dark" style="justify-self:start">Envoyer</button></form>''')
print('pages ok')
