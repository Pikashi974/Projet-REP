const { remote } = require("electron");

const main = require("../js/main");

const bcryptjs = require('bcryptjs');

const saltRounds = 10;

//Récupérer les données du formulaire

const formulaire = document.querySelector("#formEmploye");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const telephone = document.querySelector("#telephone");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const statut = document.querySelector("#statut");
const technicien = document.querySelector("#technicien");
const mode = document.querySelector("#staticBackdropLabel");
const modal_titre = document.querySelector("#contacterLabel");
const modal_body = document.querySelector("#modal-body-contact");
const modal_footer = document.querySelector("#modal-footer-contact");

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table employe
        const employe = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            technicien: 0,
            telephone: telephone.value,
            statut: statut.value,
        };
        if (password.value != "") {
            employe.pass = bcryptjs.hashSync(password.value, saltRounds);
        }
        if (technicien.value == "Oui") {
            employe.technicien = 1
        }
        //Demande de promesse vers main
        console.log(employe);
        if (mode.innerHTML == "Modifier un employé") {
            const ajoutFormulaire = await main.modifier(employe, "employe", "id="+mode.value);
        }
        else {
            const ajoutFormulaire = await main.ajout_valeur("employe", employe);
        }
        location.reload();
    }
    catch (error) {
        console.log(error);
    }
});

//Liste employes

const List = document.querySelector("#tableau_employe");
//const ListType = document.querySelector("#ListeAllType");

const getData = async () => {
    listeData = await main.liste_employes();
    renderList(listeData);
}

async function init() {
    getData();
}

init();

function renderValues(data, html) {
    body_table = document.querySelector(html)
    body_table.innerHTML = "";
    data.forEach((element) => {
        if (element.technicien == 0) {
            element.technicien = "Non"
        } else {
            element.technicien = "Oui"
        }
        body_table.innerHTML += `
        <tr data-index="${element.id}">
            <td>${element.id}</td>
            <td>${element.nom}</td>
            <td>${element.prenom}</td>
            <td>
                <a href="mailto:${element.email}">${element.email}</a>
            </td>
            <td>${element.technicien}</td>
            <td>
                <a href="tel:${element.telephone}">${element.telephone}</a>
            </td>
            <td>${element.statut}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#contacter" onclick="contacter(${(element.id)})">Contacter</button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" onclick="modifier_element(${element.id})">Modifier</button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#suppression" onclick="supprimer_element(${element.id})">Supprimer</button>
            </td>
        </tr>`
    });

}

function renderList(data) {
    List.innerHTML = "";
    List.innerHTML += `
    <table id="datatablesSimple" class="datatable-table">
        <thead>
            <tr>
                <th><a href="#" class="datatable-sorter">ID</a></th>
                <th><a href="#" class="datatable-sorter">Nom</a></th>
                <th><a href="#" class="datatable-sorter">Prénom</a></th>
                <th><a href="#" class="datatable-sorter">Adresse mail</a></th>
                <th><a href="#" class="datatable-sorter">Technicien</a></th>
                <th><a href="#" class="datatable-sorter">N° Téléphone</a></th>
                <th><a href="#" class="datatable-sorter">Statut</a></th>
                <th><a href="#" class="datatable-sorter">Action</a></th>
            </tr>
        </thead>
        <tbody id="liste_employes">
        </tbody>
    </table>`;
    renderValues(data, "#liste_employes");
}
function ajouter_element() {
    mode.innerText = 'Ajouter un employé';;
    nom.value = "";
    prenom.value = "";
    password.value = "";
    email.value = "";
    telephone.value = "";
    statut.value = "";

}
async function modifier_element(id) {
    mode.innerText = 'Modifier un employé';
    mode.value = id;
    employe = await main.getbyId(id, "employe");
    nom.value = employe.nom;
    prenom.value = employe.prenom;
    email.value = employe.email;
    telephone.value = employe.telephone;
    statut.value = employe.statut;
    if (employe.technicien == 1) {
        technicien.value = "Oui";
    }
    else {
        technicien.value = "Non";
    }
}
async function supprimer_element(id) {
    supprimer = document.querySelector("#supprimer");
    employe = await main.getbyId(id, "employe");
    label = document.querySelector("#suppressionLabel")
    label.innerHTML = "Supprimer l'employé " + employe.nom + " " + employe.prenom;
    supprimer.onclick = async function () {
        const ajoutFormulaire = await main.supprimer(id, "employe");
        location.reload();
    }
}
async function contacter(id) {
    modal_titre.innerHTML = "Notifier l'employé";
    input_tickets = `
    <div class="form-group">
        <label for="objet" class="col-form-label">Objet :</label>
        <input type="text" class="form-control" id="objet">
    </div>
    <div class="form-group" style="display: grid;">
        <label for="message">Message: </label>
        <textarea id="message" rows="5" cols="33" placeholder="Informations supplémentaires"></textarea>
    </div>
    `
    modal_body.innerHTML = `
    <form id="notification">      
        <fieldset>      
            <legend></legend>` +
        input_tickets
        + `  
            <br>
        </fieldset>      
    </form>
    `
    modal_footer.innerHTML = `
    <button type="button" class="btn btn-warning" onclick=sendNotification("#objet","#message")>Envoyer</button>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
    data-bs-target="#contacter">Annuler</button>
    `
}