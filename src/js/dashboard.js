const { remote } = require("electron");

const main = require("../js/main")

//Liste techniciens

const liste_techniciens = document.querySelector("#tableau_technicien");
const liste_factures = document.querySelector("#tableau_facture");
const liste_tickets = document.querySelector("#tableau_ticket");

const getData = async () => {
    liste_techniciens_all = await main.liste_techniciens();
    liste_techniciens_dispo = await main.liste_techniciens_dispo();
    liste_factures_cours = await main.liste_factures_dispo();
    liste_tickets_cours = await main.liste_tickets_dispo();
    liste_clients = await main.liste_clients();
    renderList(liste_techniciens_dispo, liste_factures_cours, liste_tickets_cours);
}

async function init() {
    getData();
}

init();

function renderTechnicien(data, html) {
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

function renderFacture(data, html) {
    body_table = document.querySelector(html)
    body_table.innerHTML = "";
    data.forEach((element) => {
        // On récupère les éléments du client de la liste des clients
        client_data = main.getbyIdfromList(liste_clients, element.id_client);
        // On récupère les éléments du technicien de la liste des clients
        technicien_data = main.getbyIdfromList(liste_techniciens_all, element.id_technicien);
        // On convertit la date en valeur lisible pour le tableau
        date = new Date(element.date).toLocaleDateString() + " à " + new Date(element.date).toLocaleTimeString();
        body_table.innerHTML += `
        <tr data-index="${data.length - element.id}">
            <td>${element.id}</td>
            <td>${client_data.prenom + " " + client_data.nom}</td>
            <td>${technicien_data.prenom + " " + technicien_data.nom}</td>
            <td>${date}</td>
            <td>${element.somme + " €"}</td>
            <td>
                <button type="button" class="btn btn-warning">Résoudre</button>
            </td>
        </tr>`
    });
}
function renderTicket(data, html) {
    body_table = document.querySelector(html)
    body_table.innerHTML = "";
    data.forEach((element) => {
        // On récupère les éléments du client de la liste des clients
        client_data = main.getbyIdfromList(liste_clients, element.id_client);
        // On récupère les éléments du technicien de la liste des clients
        technicien_data = main.getbyIdfromList(liste_techniciens_all, element.id_technicien);
        // On convertit la date en valeur lisible pour le tableau
        date = new Date(element.date_creation).toLocaleDateString() + " à " + new Date(element.date_creation).toLocaleTimeString();
        body_table.innerHTML += `
        <tr data-index="${data.length - element.id}">
            <td>${element.id}</td>
            <td>${technicien_data.prenom + " " + technicien_data.nom}</td>
            <td>${element.id_facture}</td>  
            <td>${date}</td>
            <td>${element.type_vehicule}</td>
            <td>
                <button type="button" class="btn btn-warning">Résoudre</button>
            </td>
        </tr>`
    });
}
function renderList(data_technicien, data_facture, data_ticket) {
    liste_techniciens.innerHTML = "";
    liste_techniciens.innerHTML += `
    <table id="database_technicien" class="datatable-table datatablesSimple">
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
    renderTechnicien(data_technicien, "#liste_techniciens");
    liste_factures.innerHTML = "";
    liste_factures.innerHTML += `
    <table id="database_facture" class="datatable-table datatablesSimple">
        <thead>
            <tr>
                <th><a href="#" class="datatable-sorter">ID</a></th>
                <th><a href="#" class="datatable-sorter">Client</a></th>
                <th><a href="#" class="datatable-sorter">Technicien</a></th>
                <th><a href="#" class="datatable-sorter">Date</a></th>
                <th><a href="#" class="datatable-sorter">Montant</a></th>
                <th><a href="#" class="datatable-sorter">Action</a></th>
            </tr>
        </thead>
        <tbody id="liste_factures">
        </tbody>
    </table>`;
    renderFacture(data_facture, "#liste_factures");
    liste_tickets.innerHTML = "";
    liste_tickets.innerHTML += `
    <table id="database_ticket" class="datatable-table datatablesSimple">
        <thead>
            <tr>
                <th><a href="#" class="datatable-sorter">ID</a></th>
                <th><a href="#" class="datatable-sorter">Technicien</a></th>
                <th><a href="#" class="datatable-sorter">N° Facture</a></th>
                <th><a href="#" class="datatable-sorter">Date ticket</a></th>
                <th><a href="#" class="datatable-sorter">Type de véhicule</a></th>
                <th><a href="#" class="datatable-sorter">Action</a></th>
            </tr>
        </thead>
        <tbody id="liste_tickets">
        </tbody>
    </table>`;
    renderTicket(data_ticket, "#liste_tickets");
}
function searchList(selector, search) {
    // Declare variables
    var input, filter, table, tr, td, i, j, txtValue, valid;
    input = document.querySelector(search);
    filter = input.value.toUpperCase();
    table = document.querySelector(selector);
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        valid = false;
        for (j = 0; j < td.length - 1; j++) {
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