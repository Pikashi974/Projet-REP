const { remote } = require("electron")
const main = require("../js/main")

// récupérer les entrées (input) du formulaire pour les ajouter dans la BDD

const AjoutForm = document.querySelector("#AjoutForm");
const Ajouternom = document.querySelector("#nomTech");
const Ajouterprenom = document.querySelector("#prenomTech");
const Ajouteremail = document.querySelector("#emailTech");
const Ajoutertelephone = document.querySelector("#telephoneTech");
const Ajouterstatut = document.querySelector("#TypestatutTech");

// fonction js écouter d'événement, lors qu'on clique on récupère les données
AjoutForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        // concordance
        // initialiser les valeurs INPUT vers champ table technicien
        const technicien = {
            nom: Ajouternom.value,
            prenom: Ajouterprenom.value,
            email: Ajouteremail.value,
            telephone: Ajoutertelephone.value,
            statut: Ajouterstatut.value,
        };

        // le controller va demander au model de récupérer les données et les stocker dans la BDD
        // demande de promesse vers le main
        const Ajoutertechnicien = await.main.ajoutTechnicien(technicien);
        console.log(Ajoutertechnicien);
        alert("Super !");

        document.location.href="techniciens.html"; // redirection
        // le controller va controler la direction

    } catch (error) {
        console.log(error);
    }
});
