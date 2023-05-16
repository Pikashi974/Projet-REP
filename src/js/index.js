const { remote } = require("electron")

const main = require("../js/main");

const bcryptjs = require('bcryptjs');

const saltRounds = 10;

//Récupérer les données du formulaire

const identifie = document.querySelector("#identifie");
const mail = document.querySelector("#typeEmailX");
const password = document.querySelector("#typePasswordX");
const error = document.querySelector("#error");
const button = document.querySelector("#button_connexion")


async function connexion() {
    directeur = await main.getIdentification(mail.value, password.value, error);
}

document.querySelectorAll("input").forEach((element) => {
    element.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          button.click();
        }
      });
})
