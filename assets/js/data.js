/* =========================================================
   SIRÈNE LUXURY — Données (à remplacer par le catalogue réel
   ou par les objets Liquid / YouCan lors de l'intégration)
   ========================================================= */
window.SL_CONFIG = {
  whatsapp: "212600000000",           // Numéro WhatsApp Business (format international sans +)
  instagram: "https://www.instagram.com/sireneluxury59/",
  tiktok: "https://www.tiktok.com/@sireneluxury59",
  facebook: "https://www.facebook.com/sireneluxury59",
  freeShipping: 400,                  // Livraison offerte dès 400 DH
  shippingFee: 35,
  bundleDiscount: 0.15,               // -15 % sur la parure complète
  giftWrap: 25,
  currency: "DH"
};

window.SL_CATS = {
  colliers:  { fr: "Colliers", ar: "قلادات", img: "colliers-pendentifs", subs: ["Chaînes fines","Pendentifs","Colliers superposés","Ras-de-cou"], desc: "Chaînes fines, pendentifs et colliers superposés pour sublimer chaque décolleté." },
  bracelets: { fr: "Bracelets", ar: "أساور", img: "joncs-flatlay", subs: ["Chaînes","Joncs","Gourmettes","Bracelets de cheville"], desc: "Joncs, gourmettes et chaînes délicates, à porter seuls ou en accumulation." },
  bagues:    { fr: "Bagues", ar: "خواتم", img: "c-bague-emeraude", subs: ["Fines","Larges","Réglables","Avec zircons"], desc: "Des bagues fines ou affirmées, réglables ou en tailles, pour chaque main." },
  boucles:   { fr: "Boucles d'oreilles", ar: "أقراط", short: "Boucles", img: "c-boucles-spirale", subs: ["Créoles","Puces","Pendantes","Ear cuffs"], desc: "Créoles, puces et pendantes qui captent la lumière à chaque mouvement." },
  parures:   { fr: "Parures & coffrets", ar: "أطقم وعلب هدايا", short: "Parures", img: "parure-emeraude", subs: ["Parures complètes","Coffrets cadeaux"], desc: "Des ensembles harmonieux, offerts dans notre écrin signature, avec -15 % sur la parure complète." },
  montres:   { fr: "Montres", ar: "ساعات", img: "c-montre-perles", subs: ["Bracelet acier","Bracelet perles","Bracelet cuir"], desc: "Des montres-bijoux dorées, à la frontière de l'horlogerie et de la joaillerie." }
};

window.SL_COLLECTIONS = {
  nouveautes:   { fr: "Nouveautés", ar: "جديدنا", img: "lifestyle-lin", desc: "Les dernières pièces arrivées dans l'atelier Sirène." },
  "best-sellers": { fr: "Best-sellers", ar: "الأكثر مبيعاً", img: "poignet-bracelets", desc: "Les bijoux préférés de nos clientes, de Tanger à Agadir." },
  ocean:        { fr: "Collection Océan", ar: "مجموعة المحيط", img: "parure-nacre", desc: "Nacre, perles et reflets d'écume : une ode à la sirène." },
  promotions:   { fr: "Promotions", ar: "تخفيضات", img: "chaines-flatlay", desc: "Des pièces d'exception à prix doux, en quantités limitées." }
};

/* Matières */
const M_STEEL = "Acier inoxydable doré";
const M_XUP = "Xuping plaqué or 18 carats";

/* p(id, name, type, cat, sub, mat, price, old, tags, imgs, opts) */
window.SL_PRODUCTS = [
  // ---------- Colliers
  { id:"lina", name:"Lina", type:"Collier double cercle", cat:"colliers", sub:"Pendentifs", mat:M_STEEL, price:229, tags:["new"], imgs:["c-pendentif-cercle","parure-trefle-chaine","lifestyle-lin","colliers-pendentifs"], colors:["gold","silver","rose"], rating:4.9, reviews:38, stock:12, line:"lumiere" },
  { id:"yasmine", name:"Yasmine", type:"Collier maille cubaine", cat:"colliers", sub:"Chaînes fines", mat:M_XUP, price:269, old:329, tags:["best","promo"], imgs:["c-collier-cubain","chaines-flatlay","collier-nacre","look-caftan"], colors:["gold","silver"], rating:4.8, reviews:112, stock:7 },
  { id:"nour", name:"Nour", type:"Pendentif nacre", cat:"colliers", sub:"Pendentifs", mat:M_STEEL, price:249, tags:["new","ocean"], imgs:["c-pendentif-nacre","collier-nacre","parure-nacre","lifestyle-montre"], colors:["gold","silver"], rating:5, reviews:21, stock:9, line:"nacre" },
  { id:"selma", name:"Selma", type:"Collier trèfles émeraude", cat:"colliers", sub:"Colliers superposés", mat:M_XUP, price:289, tags:["best"], imgs:["parure-emeraude","look-caftan","c-boucles-emeraude","c-jonc-emeraude"], colors:["gold"], rating:4.9, reviews:86, stock:15, line:"emeraude" },
  { id:"ines", name:"Inès", type:"Collier cœur & épingle", cat:"colliers", sub:"Pendentifs", mat:M_STEEL, price:199, tags:["new"], imgs:["c-pendentif-coeur","colliers-pendentifs","lifestyle-lin"], colors:["gold","rose"], rating:4.7, reviews:14, stock:3 },
  { id:"kenza", name:"Kenza", type:"Sautoir trèfles nacre", cat:"colliers", sub:"Colliers superposés", mat:M_XUP, price:279, tags:["ocean","best"], imgs:["c-sautoir-nacre","parure-nacre","c-joncs-nacre","poignet-bracelets"], colors:["gold"], rating:4.9, reviews:64, stock:10, line:"nacre" },
  { id:"imane", name:"Imane", type:"Collier médaillon soleil", cat:"colliers", sub:"Ras-de-cou", mat:M_STEEL, price:219, old:269, tags:["promo"], imgs:["c-pendentif-medaillon","colliers-pendentifs","look-caftan"], colors:["gold"], rating:4.8, reviews:29, stock:6 },
  // ---------- Bracelets
  { id:"aya", name:"Aya", type:"Bracelet trèfles", cat:"bracelets", sub:"Chaînes", mat:M_XUP, price:189, old:249, tags:["best","promo"], imgs:["bracelets-trefles","poignet-bracelets","c-sautoir-nacre","parure-emeraude"], colors:["gold"], variants:["Onyx","Nacre","Quartz rose","Émeraude"], rating:4.9, reviews:203, stock:20 },
  { id:"rim", name:"Rim", type:"Jonc à vis", cat:"bracelets", sub:"Joncs", mat:M_STEEL, price:239, tags:["best"], imgs:["c-jonc-clous","jonc-bagues-boucles","c-bague-duo","lifestyle-montre"], colors:["gold","silver","rose"], sizes:["16 cm","17 cm","18 cm"], rating:4.8, reviews:141, stock:18, line:"vis" },
  { id:"salma", name:"Salma", type:"Gourmette maille cubaine", cat:"bracelets", sub:"Gourmettes", mat:M_XUP, price:199, tags:[], imgs:["c-cubaine-bracelet","bracelets-maillons","chaines-flatlay"], colors:["gold","silver"], rating:4.7, reviews:52, stock:11 },
  { id:"hiba", name:"Hiba", type:"Bracelet maillons plats", cat:"bracelets", sub:"Chaînes", mat:M_STEEL, price:229, tags:["new"], imgs:["c-maillons","montre-acier-joncs","bracelets-maillons"], colors:["gold"], rating:4.8, reviews:17, stock:8 },
  { id:"leila", name:"Leïla", type:"Jonc clou pavé", cat:"bracelets", sub:"Joncs", mat:M_STEEL, price:219, tags:["best"], imgs:["c-jonc-clou","joncs-flatlay","poignet-bracelets"], colors:["gold","silver"], sizes:["16 cm","17 cm","18 cm"], rating:4.9, reviews:97, stock:14 },
  { id:"sofia", name:"Sofia", type:"Rivière de zircons", cat:"bracelets", sub:"Chaînes", mat:M_STEEL, price:249, tags:["new"], imgs:["c-tennis","colliers-pendentifs","lifestyle-montre"], colors:["gold","silver"], rating:4.8, reviews:12, stock:5 },
  { id:"maya", name:"Maya", type:"Jonc émail corail", cat:"bracelets", sub:"Joncs", mat:M_STEEL, price:199, tags:[], imgs:["c-jonc-orange","joncs-flatlay"], colors:["gold"], rating:4.6, reviews:23, stock:0 },
  { id:"farah", name:"Farah", type:"Jonc trèfles émeraude", cat:"bracelets", sub:"Joncs", mat:M_XUP, price:259, tags:[], imgs:["c-jonc-emeraude","parure-emeraude","look-caftan"], colors:["gold"], rating:4.9, reviews:41, stock:9, line:"emeraude" },
  { id:"lamia", name:"Lamia", type:"Duo de joncs nacre", cat:"bracelets", sub:"Joncs", mat:M_XUP, price:239, tags:["ocean"], imgs:["c-joncs-nacre","parure-nacre","poignet-bracelets"], colors:["gold"], rating:4.8, reviews:33, stock:7, line:"nacre" },
  { id:"sara", name:"Sara", type:"Bracelet chaîne trombone", cat:"bracelets", sub:"Bracelets de cheville", mat:M_STEEL, price:159, tags:[], imgs:["c-bracelet-chaine","collier-nacre","lifestyle-lin"], colors:["gold","silver"], rating:4.7, reviews:58, stock:25 },
  // ---------- Bagues
  { id:"dounia", name:"Dounia", type:"Duo d'anneaux à vis", cat:"bagues", sub:"Fines", mat:M_STEEL, price:179, tags:["best"], imgs:["c-bague-duo","jonc-bagues-boucles","c-jonc-clous"], colors:["gold","silver","rose"], sizes:["50","52","54","56","58"], rating:4.9, reviews:77, stock:16, line:"vis" },
  { id:"ghita", name:"Ghita", type:"Bague trèfle émeraude", cat:"bagues", sub:"Réglables", mat:M_XUP, price:169, tags:["new"], imgs:["c-bague-emeraude","parure-emeraude","look-caftan"], colors:["gold"], sizes:["Réglable"], rating:4.8, reviews:26, stock:12, line:"emeraude" },
  { id:"zineb", name:"Zineb", type:"Bague maille cubaine", cat:"bagues", sub:"Larges", mat:M_STEEL, price:149, old:189, tags:["promo"], imgs:["c-bagues-chaines","chaines-flatlay"], colors:["gold","silver"], sizes:["52","54","56","58"], rating:4.7, reviews:31, stock:4 },
  // ---------- Boucles
  { id:"amira", name:"Amira", type:"Boucles spirales torsadées", cat:"boucles", sub:"Puces", mat:M_XUP, price:179, tags:["best"], imgs:["c-boucles-spirale","jonc-bagues-boucles","lifestyle-lin"], colors:["gold"], rating:4.9, reviews:94, stock:13, line:"vis" },
  { id:"malak", name:"Malak", type:"Pendantes trèfles émeraude", cat:"boucles", sub:"Pendantes", mat:M_XUP, price:199, tags:["best"], imgs:["c-boucles-emeraude","parure-emeraude","look-caftan"], colors:["gold"], rating:4.9, reviews:58, stock:10, line:"emeraude" },
  { id:"nada", name:"Nada", type:"Puces médaillon zircons", cat:"boucles", sub:"Puces", mat:M_STEEL, price:139, tags:["new"], imgs:["c-puces-medaillon","colliers-pendentifs"], colors:["gold","silver"], rating:4.8, reviews:19, stock:22 },
  { id:"assia", name:"Assia", type:"Puces trèfle vert", cat:"boucles", sub:"Puces", mat:M_XUP, price:129, tags:[], imgs:["c-boucles-trefle-vertes","parure-trefle-chaine"], colors:["gold"], rating:4.7, reviews:36, stock:15, line:"lumiere" },
  // ---------- Parures
  { id:"parure-selma", name:"Parure Selma", type:"Collier, pendantes, bague & jonc", cat:"parures", sub:"Parures complètes", mat:M_XUP, price:779, old:916, tags:["best","promo"], imgs:["parure-emeraude","look-caftan","c-boucles-emeraude","c-bague-emeraude","c-jonc-emeraude"], colors:["gold"], rating:5, reviews:47, stock:6, bundle:["selma","malak","ghita","farah"] },
  { id:"coffret-oceane", name:"Coffret Océane", type:"Sautoir, pendentif & joncs nacre", cat:"parures", sub:"Coffrets cadeaux", mat:M_XUP, price:652, old:767, tags:["ocean","new"], imgs:["parure-nacre","c-sautoir-nacre","c-joncs-nacre","c-pendentif-nacre"], colors:["gold"], rating:4.9, reviews:18, stock:5, bundle:["kenza","nour","lamia"] },
  { id:"coffret-lumiere", name:"Coffret Lumière", type:"Collier, puces & gourmette", cat:"parures", sub:"Coffrets cadeaux", mat:M_STEEL, price:459, old:539, tags:["promo"], imgs:["parure-trefle-chaine","c-pendentif-cercle","c-boucles-trefle-vertes","c-gourmette-cubaine"], colors:["gold"], rating:4.8, reviews:29, stock:8 },
  // ---------- Montres
  { id:"jade", name:"Jade", type:"Montre-bijou perles", cat:"montres", sub:"Bracelet perles", mat:"Acier doré, perles nacrées", price:389, tags:["new","ocean"], imgs:["c-montre-perles","lifestyle-montre","montres-perles"], colors:["gold"], rating:4.9, reviews:22, stock:6 },
  { id:"camelia", name:"Camélia", type:"Montre cuir carmin", cat:"montres", sub:"Bracelet cuir", mat:"Boîtier acier doré, cuir", price:329, tags:[], imgs:["c-montre-rouge","montres-perles"], colors:["gold"], rating:4.7, reviews:15, stock:9 },
  { id:"oceane", name:"Océane", type:"Montre trèfles nacre", cat:"montres", sub:"Bracelet acier", mat:"Acier doré, cadran nacre", price:359, tags:["ocean","best"], imgs:["montre-nacre-trefle","poignet-bracelets"], colors:["gold"], rating:4.9, reviews:44, stock:7 },
  { id:"rania", name:"Rania", type:"Montre carrée bicolore", cat:"montres", sub:"Bracelet acier", mat:"Acier inoxydable bicolore", price:349, old:429, tags:["promo"], imgs:["montre-carree","montres-collection"], colors:["gold","silver"], rating:4.8, reviews:38, stock:4 },
  { id:"lyna", name:"Lyna", type:"Montre jubilé", cat:"montres", sub:"Bracelet acier", mat:"Acier inoxydable", price:399, tags:[], imgs:["montres-collection","montres-duo","montre-acier-joncs"], colors:["gold","silver"], rating:4.8, reviews:61, stock:0 }
];

window.SL_REVIEWS = [
  { name:"Salma", city:"Casablanca", rating:5, text:"Je porte mon jonc tous les jours, même à la plage. Trois mois après, il brille comme au premier jour.", img:"poignet-bracelets", product:"rim" },
  { name:"Hajar", city:"Rabat", rating:5, text:"L'écrin est magnifique, ma sœur a cru que je l'avais acheté dans une grande maison. Livrée en 24 h.", img:"look-caftan", product:"parure-selma" },
  { name:"Nisrine", city:"Marrakech", rating:5, text:"Enfin des bijoux qui ne me donnent aucune allergie. La qualité est vraiment au rendez-vous.", img:"lifestyle-lin", product:"lina" },
  { name:"Imane", city:"Tanger", rating:4, text:"Très belle montre, élégante et légère. Le service WhatsApp m'a conseillée avec beaucoup de patience.", img:"lifestyle-montre", product:"jade" },
  { name:"Ghizlane", city:"Agadir", rating:5, text:"J'ai payé à la livraison, le livreur était ponctuel. Les trèfles nacre sont encore plus beaux en vrai.", img:"parure-nacre", product:"kenza" },
  { name:"Meryem", city:"Fès", rating:5, text:"Offert pour l'anniversaire de ma mère, elle ne le quitte plus. Merci pour le petit mot manuscrit.", img:"bracelets-trefles", product:"aya" }
];

window.SL_CITIES = ["Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Meknès","Oujda","Kénitra","Tétouan","Salé","Témara","Mohammédia","El Jadida","Safi","Béni Mellal","Nador","Khouribga","Settat","Essaouira","Ouarzazate","Laâyoune","Dakhla","Errachidia","Taza","Larache","Ifrane","Al Hoceïma","Berrechid","Guelmim","Autre ville"];

/* ---------- Traductions (interface) ---------- */
window.SL_I18N = {
  fr: {
    "ann.1":"Livraison partout au Maroc","ann.2":"Paiement à la livraison","ann.3":"Bijoux qui ne noircissent pas, garantis","ann.4":"Commandez sur WhatsApp en 1 clic",
    "nav.menu":"Menu","nav.collections":"Collections","nav.all":"Tout voir","nav.search":"Rechercher","nav.fav":"Favoris","nav.account":"Compte","nav.cart":"Panier",
    "hero.eyebrow":"Maison marocaine de joaillerie","hero.title":"L'éclat qui ne s'efface jamais","hero.t1":"L'éclat qui ne s'efface","hero.t2":"jamais","hero.badge":"1re commande","hero.s1":"1 248 avis clientes","hero.s2":"Partout au Maroc","hero.s3":"Payé avant livraison","hero.sub":"Bijoux en acier inoxydable et Xuping, conçus pour durer.","hero.cta1":"Découvrir la collection","hero.cta2":"Commander sur WhatsApp",
    "re.1":"Ne noircit pas","re.1s":"Éclat garanti","re.2":"Hypoallergénique","re.2s":"Sans nickel","re.3":"Livraison partout au Maroc","re.3s":"En 24 à 72 h","re.4":"Paiement à la livraison","re.4s":"Payez à réception",
    "cats.eyebrow":"Nos univers","cats.title":"Trouvez votre éclat",
    "new.eyebrow":"Fraîchement arrivés","new.title":"Nouveautés",
    "ocean.eyebrow":"Collection Océan","ocean.title":"Née de l'écume","ocean.poem":"« Comme la sirène garde ses trésors au creux des vagues, chaque perle garde un peu de lumière pour vous. »","ocean.text":"Nacre irisée, perles d'eau et reflets dorés : une collection inspirée des rivages de l'Atlantique, de Essaouira à Dakhla.","ocean.cta":"Explorer la collection",
    "best.eyebrow":"Les préférés","best.title":"Best-sellers",
    "why.eyebrow":"Pourquoi Sirène Luxury ?","why.title":"Un éclat pensé pour la vraie vie",
    "look.eyebrow":"Shop the look","look.title":"Le look Fès Doré",
    "gift.eyebrow":"Parures & coffrets","gift.title":"L'art d'offrir",
    "rev.eyebrow":"Avis clientes","rev.title":"Elles portent Sirène",
    "ig.eyebrow":"@sireneluxury59","ig.title":"Sirène sur Instagram","ig.cta":"Suivez-nous @sireneluxury59",
    "nl.eyebrow":"Le cercle Sirène","nl.title":"Rejoignez le cercle Sirène","nl.sub":"Recevez -10 % sur votre première commande, nos avant-premières et nos conseils d'entretien.","nl.email":"E-mail","nl.wa":"WhatsApp","nl.btn":"Je m'inscris",
    "card.add":"Ajouter au panier","card.out":"Rupture de stock","card.new":"Nouveau","card.best":"Best-seller",
    "cart.title":"Votre panier","cart.empty":"Votre panier est vide","cart.continue":"Continuer mes achats","cart.sub":"Sous-total","cart.ship":"Livraison","cart.free":"Offerte","cart.total":"Total","cart.checkout":"Passer la commande","cart.wa":"Commander sur WhatsApp","cart.cod":"Paiement à la livraison · Confirmation par appel ou WhatsApp","cart.gift":"Emballage cadeau premium","cart.remove":"Retirer","cart.upsell":"Complétez votre écrin",
    "pdp.add":"Ajouter au panier","pdp.wa":"Commander sur WhatsApp","pdp.color":"Couleur","pdp.size":"Taille","pdp.guide":"Guide des tailles","pdp.desc":"Description","pdp.care":"Matière et entretien","pdp.ship":"Livraison et retours","pdp.complete":"Complétez la parure","pdp.like":"Vous aimerez aussi",
    "ft.tag":"Des bijoux qui gardent leur éclat, comme les trésors d'une sirène.","ft.shop":"Boutique","ft.help":"Aide","ft.about":"À propos","ft.legal":"Légal","ft.news":"Newsletter","ft.rights":"© 2026 Sirène Luxury — Tous droits réservés",
    "pop.title":"-10 %","pop.sub":"sur votre première commande","pop.text":"Rejoignez le cercle Sirène et recevez votre code par e-mail ou WhatsApp.","pop.btn":"Recevoir mon code","pop.no":"Non merci",
    "wa.tip":"Une question ? Écrivez-nous"
  },
  ar: {
    "ann.1":"التوصيل لجميع مدن المغرب","ann.2":"الدفع عند الاستلام","ann.3":"مجوهرات لا يتغير لونها، مضمونة","ann.4":"اطلبي عبر واتساب بنقرة واحدة",
    "nav.menu":"القائمة","nav.collections":"المجموعات","nav.all":"عرض الكل","nav.search":"بحث","nav.fav":"المفضلة","nav.account":"حسابي","nav.cart":"السلة",
    "hero.eyebrow":"دار مغربية للمجوهرات","hero.title":"بريق لا يزول أبداً","hero.t1":"بريق لا يزول","hero.t2":"أبداً","hero.badge":"على أول طلب","hero.s1":"1248 تقييم","hero.s2":"لكل مدن المغرب","hero.s3":"تدفعين عند الاستلام","hero.sub":"مجوهرات من الفولاذ المقاوم للصدأ والشوبينغ، صُنعت لتدوم.","hero.cta1":"اكتشفي المجموعة","hero.cta2":"اطلبي عبر واتساب",
    "re.1":"لا يتغير لونها","re.1s":"لمعان مضمون","re.2":"مضادة للحساسية","re.2s":"بدون نيكل","re.3":"التوصيل لكل المغرب","re.3s":"من 24 إلى 72 ساعة","re.4":"الدفع عند الاستلام","re.4s":"ادفعي عند التوصل",
    "cats.eyebrow":"عوالمنا","cats.title":"اكتشفي بريقك",
    "new.eyebrow":"وصل حديثاً","new.title":"جديدنا",
    "ocean.eyebrow":"مجموعة المحيط","ocean.title":"وُلدت من زبد البحر","ocean.poem":"« كما تحفظ حورية البحر كنوزها بين الأمواج، تحفظ كل لؤلؤة قليلاً من النور لأجلك. »","ocean.text":"صدف لامع، لآلئ وانعكاسات ذهبية: مجموعة مستوحاة من شواطئ الأطلسي، من الصويرة إلى الداخلة.","ocean.cta":"اكتشفي المجموعة",
    "best.eyebrow":"المفضلة لديكن","best.title":"الأكثر مبيعاً",
    "why.eyebrow":"لماذا سيرين لاكشري؟","why.title":"بريق مصمم للحياة اليومية",
    "look.eyebrow":"تسوقي الإطلالة","look.title":"إطلالة فاس الذهبية",
    "gift.eyebrow":"أطقم وعلب هدايا","gift.title":"فن الإهداء",
    "rev.eyebrow":"آراء الزبونات","rev.title":"هن يرتدين سيرين",
    "ig.eyebrow":"@sireneluxury59","ig.title":"سيرين على إنستغرام","ig.cta":"تابعينا @sireneluxury59",
    "nl.eyebrow":"دائرة سيرين","nl.title":"انضمي إلى دائرة سيرين","nl.sub":"احصلي على خصم 10% على طلبك الأول، وعلى عروضنا الحصرية ونصائح العناية.","nl.email":"البريد الإلكتروني","nl.wa":"واتساب","nl.btn":"اشتركي",
    "card.add":"أضيفي إلى السلة","card.out":"نفدت الكمية","card.new":"جديد","card.best":"الأكثر مبيعاً",
    "cart.title":"سلتك","cart.empty":"سلتك فارغة","cart.continue":"متابعة التسوق","cart.sub":"المجموع الفرعي","cart.ship":"التوصيل","cart.free":"مجاني","cart.total":"المجموع","cart.checkout":"إتمام الطلب","cart.wa":"اطلبي عبر واتساب","cart.cod":"الدفع عند الاستلام · تأكيد عبر الهاتف أو واتساب","cart.gift":"تغليف هدية فاخر","cart.remove":"حذف","cart.upsell":"أكملي علبتك",
    "pdp.add":"أضيفي إلى السلة","pdp.wa":"اطلبي عبر واتساب","pdp.color":"اللون","pdp.size":"المقاس","pdp.guide":"دليل المقاسات","pdp.desc":"الوصف","pdp.care":"المادة والعناية","pdp.ship":"التوصيل والاستبدال","pdp.complete":"أكملي الطقم","pdp.like":"قد يعجبك أيضاً",
    "ft.tag":"مجوهرات تحافظ على بريقها، ككنوز حورية البحر.","ft.shop":"المتجر","ft.help":"المساعدة","ft.about":"من نحن","ft.legal":"قانوني","ft.news":"النشرة الإخبارية","ft.rights":"© 2026 سيرين لاكشري — جميع الحقوق محفوظة",
    "pop.title":"-10%","pop.sub":"على طلبك الأول","pop.text":"انضمي إلى دائرة سيرين واحصلي على رمزك عبر البريد أو واتساب.","pop.btn":"احصلي على الرمز","pop.no":"لا، شكراً",
    "wa.tip":"لديك سؤال؟ راسلينا"
  }
};
