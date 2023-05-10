const { remote } = require("electron")

const main = require("../js/main")

//Récupérer les données du formulaire

const formulaire = document.querySelector("#AjoutForm");
const id_client = document.querySelector("");
const id_technicien = document.querySelector("");
const date = document.querySelector("");
const somme = document.querySelector("");

const NOTIFICATION_TITLE = 'SQL Notification'
const NOTIFICATION_BODY = 'La notification a réussi'

function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table facture
        const facture = {
            id_client: id_client.value,
            id_technicien: id_technicien.value,
            date: date.value,
            somme: somme.value,
        };
        //Demande de promesse vers main
        const ajoutFormulaire = await main.ajout(facture).then(showNotification);
        console.log(ajoutFormulaire);
        document.location.href = "index.html";
    }
    catch (error) {
        console.log(error);
    }
});