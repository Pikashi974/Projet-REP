const { remote } = require("electron")
const main = require("../js/main")

//Récupérer les données du formulaire

const formulaire = document.querySelector("#AjoutForm");
const Ajouternom = document.querySelector("#nomClient");
const Ajouterprenom = document.querySelector("#prenomClient");
const Ajouteremail = document.querySelector("#emailClient");
const Ajoutertelephone = document.querySelector("#telephoneClient");
const Ajouterstatut = document.querySelector("#TypestatutClient");

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
        const client = {
            nom: Ajouternom.value,
            prenom: Ajouterprenom.value,
            email: Ajouteremail.value,
            telephone: Ajoutertelephone.value,
            statut: Ajouterstatut.value,
        };
        // le controller va demander au model de récupérer les données et les stocker dans la BDD
        //Demande de promesse vers main
        const ajoutFormulaire = await main.ajoutClient(client).then(showNotification);
        console.log(ajoutFormulaire);
        alert("Super !");

        document.location.href = "clients.html";
    }
    catch (error) {
        console.log(error);
    }
});