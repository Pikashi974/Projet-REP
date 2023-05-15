const { remote } = require("electron");

const main = require("../js/main");

//Récupérer les données du formulaire

const formulaire = document.querySelector("#formTechnicien");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const telephone = document.querySelector("#telephone");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const statut = document.querySelector("#controlSelect")




formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table technicien
        const technicien = {
            nom: nom.value,
            prenom: prenom.value,
            pass: password.value,
            email: email.value,
            technicien: 1,
            telephone: telephone.value,
            statut: statut.value,
        };
        //Demande de promesse vers main
        console.log(technicien);
        const ajoutFormulaire = await main.ajout_valeur("employe",technicien);
        console.log(ajoutFormulaire);
        location.reload();
    }
    catch (error) {
        console.log(error);
    }
});

//Liste techniciens

const List = document.querySelector("#tableau_technicien");

const getData = async () => {
    listeData = await main.liste_techniciens();
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
        body_table.innerHTML += `
        <tr data-index="${data.length - element.id}">
            <td>${element.id}</td>
            <td>${element.nom}</td>
            <td>${element.prenom}</td>
            <td>${element.email}</td>
            <td>${element.telephone}</td>
            <td>${element.statut}</td>
            <td>
                <button type="button" class="btn btn-warning">Contacter</button>
                <button type="button" class="btn btn-warning">Assigner</button>
                <button type="button" class="btn btn-warning">Supprimer</button>
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
                <th><a href="#" class="datatable-sorter">N° Téléphone</a></th>
                <th><a href="#" class="datatable-sorter">Statut</a></th>
                <th><a href="#" class="datatable-sorter">Action</a></th>
            </tr>
        </thead>
        <tbody id="liste_techniciens">
        </tbody>
    </table>`;
    renderValues(data, "#liste_techniciens");
}