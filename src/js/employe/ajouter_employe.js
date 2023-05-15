const { remote } = require("electron")

const main = require("../js/main")

//Récupérer les données du formulaire

const formulaire = document.querySelector("#AjoutForm");
const Ajouternom = document.querySelector("#nomEmploye");
const Ajouterprenom = document.querySelector("#prenomEmploye");
const password = document.querySelector("");
const Ajouteremail = document.querySelector("#emailEmploye");
const technicien = document.querySelector("");
const Ajoutertelephone = document.querySelector("#telephoneEmploye");
const Ajouterstatut = document.querySelector("#TypestatutEmp");

const NOTIFICATION_TITLE = 'SQL Notification'
const NOTIFICATION_BODY = 'La notification a réussi'

function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        // concordance
        //initialiser les valeurs pour la table employe
        const employe = {
            nom: Ajouternom.value,
            prenom: Ajouterprenom.value,
            password: password.value,
            email: Ajouteremail.value,
            technicien: technicien.value,
            telephone: Ajoutertelephone.value,
            statut: Ajouterstatut.value,
        };
        // le controller va demander au model de récupérer les données et les stocker dans la BDD
        //Demande de promesse vers main
        const ajoutFormulaire = await main.ajout_employe(employe).then(showNotification);
        console.log(ajoutFormulaire);
        alert("Super !");

        document.location.href = "index.html";
    }
    catch (error) {
        console.log(error);
    }
});