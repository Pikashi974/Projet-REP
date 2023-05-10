const { remote } = require("electron")

const main = require("./main")

//Récupérer les données du formulaire

const formulaire = document.querySelector("#createDirecteur");
const email = document.querySelector("#typeEmailX");
const password = document.querySelector("#typePasswordX");
const telephone = document.querySelector("#typephoneX");
const nom = document.querySelector("#typeNomX");
const prenom = document.querySelector("#typePrenomX");

const NOTIFICATION_TITLE = 'SQL Notification'
const NOTIFICATION_BODY = 'La notification a réussi'

function showNotification() {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table directeur
        const directeur = {
            email: email.value,
            pass: password.value,
            telephone: telephone.value,
            nom: nom.value,
            prenom: prenom.value,
        };
        //Demande de promesse vers main
        console.log(directeur);
        const ajoutFormulaire = await main.ajout_directeur(directeur).then(showNotification);
        console.log(ajoutFormulaire);
        document.location.href = "dashboard.html";
    }
    catch (error) {
        console.log(error);
    }
});