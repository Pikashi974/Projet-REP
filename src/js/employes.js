const { remote } = require("electron");

const main = require("../js/main");

//Récupérer les données du formulaire

const formulaire = document.querySelector("#formEmploye");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const telephone = document.querySelector("#telephone");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const statut = document.querySelector("#controlSelect")
const technicien = document.querySelector("#controlTech")

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table employe
        const employe = {
            nom: nom.value,
            prenom: prenom.value,
            pass: password.value,
            email: email.value,
            technicien: 0,
            telephone: telephone.value,
            statut: statut.value,
        };
        if (technicien.value == "Oui") {
            employe.technicien = 1
        }
        //Demande de promesse vers main
        console.log(employe);
        const ajoutFormulaire = await main.ajout_valeur("employe",employe);
        console.log(ajoutFormulaire);
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
        <tr data-index="${data.length - element.id}">
            <td>${element.id}</td>
            <td>${element.nom}</td>
            <td>${element.prenom}</td>
            <td>${element.email}</td>
            <td>${element.technicien}</td>
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
function searchList() {
    // Declare variables
    var input, filter, table, tr, td, i, j, txtValue, valid;
    input = document.querySelector("#search");
    filter = input.value.toUpperCase();
    table = document.querySelector("#datatablesSimple");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1  ; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        valid = false;
        for (j = 0; j < td.length-1; j++) {
            current_td = td[j];
            if (current_td) {
                txtValue = current_td.textContent || current_td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    // console.log("Validation")
                    valid = true;
                } 
            }
        }
        if (valid == true) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
    //table.getElementsByTagName("tr")[2].getElementsByTagName("td")[0].textContent.toUpperCase()
}