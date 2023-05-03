const { remote } = require("electron")

const main = require("../js/main")

//Récupérer les données du formulaire

const formulaire = document.querySelector("#AjoutForm");
const type = document.querySelector("#typepiece");
const nom = document.querySelector("#nom")
const marque = document.querySelector("#marque");
const prix = document.querySelector("#prix");
const stock = document.querySelector("#stock");
const desc = document.querySelector("#description");

const NOTIFICATION_TITLE = 'SQL Notification'
const NOTIFICATION_BODY = 'La notification a réussi'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table stockage
        const stockage = {
            type_piece: type.value,
            nom: nom.value,
            marque: marque.value,
            prix: prix.value,
            description: desc.value,
            stock: stock.value,
        };
        //Demande de promesse vers main
        const ajoutFormulaire = await main.ajout(stockage).then(showNotification);
        console.log(ajoutFormulaire);
        document.location.href = "index.html";
    }
    catch (error){
        console.log(error);
    }
});