const { remote } = require("electron")

const main = require("../js/main");

const bcryptjs = require('bcryptjs');

const saltRounds = 10;

//Récupérer les données du formulaire

const formulaire = document.querySelector("#createDirecteur");
const email = document.querySelector("#typeEmailX");
const password = document.querySelector("#typePasswordX");
const telephone = document.querySelector("#typephoneX");
const nom = document.querySelector("#typeNomX");
const prenom = document.querySelector("#typePrenomX");

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table directeur
        if (password.value != "") {
            const directeur = {
                email: email.value,
                pass: bcryptjs.hashSync(password.value, saltRounds),
                telephone: telephone.value,
                nom: nom.value,
                prenom: prenom.value,
            };
            //Demande de promesse vers main
            console.log(directeur);
            const ajoutFormulaire = await main.ajout_valeur("directeur", directeur);
            console.log(ajoutFormulaire);
            document.location.href = "dashboard.html";
        }
    }
    catch (error) {
        console.log(error);
    }
});