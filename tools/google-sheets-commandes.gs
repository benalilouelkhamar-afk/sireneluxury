/**
 * Sirène Luxury : recevoir chaque commande du site dans un Google Sheet.
 *
 * 1. Créez un Google Sheet, puis Extensions > Apps Script.
 * 2. Collez ce code et enregistrez.
 * 3. Déployer > Nouveau déploiement > Type « Application Web »
 *    - Exécuter en tant que : Moi
 *    - Qui a accès : Tout le monde
 * 4. Copiez l'URL obtenue (…/exec) dans assets/js/data.js > SL_CONFIG.orderWebhook
 */
function doPost(e) {
  var o = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Date", "Réf.", "Nom", "Téléphone", "Ville", "Adresse", "Note", "Articles", "Cadeau", "Livraison", "Total (DH)", "Statut"]);
  }
  var articles = o.items.map(function (i) { return i.qty + " x " + i.name + " (" + i.options + ")"; }).join("\n");
  sheet.appendRow([new Date(o.date), o.ref, o.customer.name, "'" + o.customer.phone, o.customer.city, o.customer.address,
    o.customer.note || "", articles, o.gift ? "Oui" : "Non", o.totals.shipping, o.totals.total, "À confirmer"]);
  return ContentService.createTextOutput("ok");
}
