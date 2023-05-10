const { remote } = require("electron")

const main = require("../js/main")

//Récupérer les données du formulaire

const formulaire = document.querySelector("#AjoutForm");
const date = document.querySelector("");
const id_technicien = document.querySelector("");
const id_facture = document.querySelector("");
const type_vehicule = document.querySelector("");

const NOTIFICATION_TITLE = 'SQL Notification'
const NOTIFICATION_BODY = 'La notification a réussi'

function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table ticket
        const ticket = {
            date: date.value,
            id_technicien: id_technicien.value,
            id_facture: id_facture.value,
            type_vehicule: type_vehicule.value,
        };
        //Demande de promesse vers main
        const ajoutFormulaire = await main.ajout(ticket).then(showNotification);
        console.log(ajoutFormulaire);
        document.location.href = "index.html";
    }
    catch (error) {
        console.log(error);
    }
});