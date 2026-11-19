# Sirène Luxury — Maquette e-commerce

Maquette HTML/CSS/JS statique (sans dépendance ni build) d'une boutique de joaillerie premium marocaine.

## Pages
| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : hero slider, réassurance, catégories, nouveautés, Collection Océan, best-sellers, pourquoi Sirène, shop the look, parures, avis, Instagram, newsletter |
| `collection.html?c=bracelets` | Page catégorie / collection avec filtres et tri (`c` = colliers, bracelets, bagues, boucles, parures, montres, nouveautes, best-sellers, ocean, promotions, favoris) |
| `produit.html?id=selma` | Fiche produit : galerie + zoom + vidéo portée, options, WhatsApp prérempli, onglets, « Complétez la parure », barre mobile fixe |
| `commande.html` | Commande adaptée au Maroc (paiement à la livraison, confirmation appel / WhatsApp) |
| `a-propos`, `entretien`, `guide-tailles`, `faq`, `livraison`, `cgv`, `confidentialite`, `contact` | Pages de contenu |

## À personnaliser
- `assets/js/data.js` → `SL_CONFIG` : **numéro WhatsApp** (`212651508257`, soit 06 51 50 82 57), liens réseaux, seuil de livraison offerte, remise parure.
- `assets/js/data.js` → `SL_PRODUCTS` : catalogue (noms, prix, photos, stock). `line` regroupe les pièces d'une même parure : 3 pièces d'une ligne dans le panier = -15 % automatique.
- `SL_REVIEWS` : avis de démonstration à remplacer.
- `assets/img/` : remplacer les photos (WebP). Les vignettes `c-*.webp` sont des recadrages carrés des photos fournies.
- Mentions légales (CGV, RC, ICE) et déclaration CNDP.

## Structure
- `assets/css/styles.css` : design system (variables couleurs / typos) et sections réutilisables.
- `assets/js/app.js` : header + méga-menu, panier latéral, recherche, favoris, FR/AR (RTL), pop-up -10 %, bouton WhatsApp, carte produit.
- `home.js`, `collection.js`, `product.js`, `checkout.js` : logique par page.
- `tools/build_pages.py` : régénère les pages secondaires (`python3 tools/build_pages.py`).

Adaptation Shopify / YouCan : chaque section correspond à une section de thème ; remplacer `SL_PRODUCTS` par les objets produits de la plateforme.

## Commandes
- **Commander maintenant** (fiche produit) et **Passer la commande** (panier) ouvrent le même formulaire court : nom, téléphone, ville, adresse. Le paiement se fait à la livraison.
- Après validation, la cliente voit sa référence (SL-XXXXXX) et un bouton **Confirmer sur WhatsApp**. Ce bouton envoie la commande complète (articles, total, adresse) au numéro de la boutique.
- **WhatsApp direct** : chaque bouton WhatsApp envoie un message déjà rempli (produit, options, quantité, total).
- **Recevoir les commandes dans Google Sheets** (facultatif) : suivez `tools/google-sheets-commandes.gs` puis collez l'URL dans `SL_CONFIG.orderWebhook`.
- Les coordonnées de la cliente sont mémorisées sur son téléphone pour pré-remplir sa prochaine commande.
