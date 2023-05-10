const { remote } = require("electron")

const main = require("../js/main")

//Récupérer les données du formulaire

const formulaire = document.querySelector("#AjoutForm");
const nom = document.querySelector("");
const prenom = document.querySelector("");
const password = document.querySelector("");
const email = document.querySelector("");
const technicien = document.querySelector("");
const telephone = document.querySelector("");
const statut = document.querySelector("");

const NOTIFICATION_TITLE = 'SQL Notification'
const NOTIFICATION_BODY = 'La notification a réussi'

function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table employe
        const employe = {
            nom: nom.value,
            prenom: prenom.value,
            password: password.value,
            email: email.value,
            technicien: technicien.value,
            telephone: telephone.value,
            statut: statut.value,
        };
        //Demande de promesse vers main
        const ajoutFormulaire = await main.ajout(employe).then(showNotification);
        console.log(ajoutFormulaire);
        document.location.href = "index.html";
    }
    catch (error) {
        console.log(error);
    }
});