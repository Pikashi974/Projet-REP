const { remote } = require("electron");

const main = require("../js/main");

//Récupérer les données du formulaire

const formulaire = document.querySelector("#formTicket");
const technicien = document.querySelector("#technicien");
const facture = document.querySelector("#facture");
const type_vehicule = document.querySelector("#type_vehicule");

//Liste tickets

const List = document.querySelector("#tableau_ticket");
//const ListType = document.querySelector("#ListeAllType");

const getData = async () => {
    listeData = await main.liste_tickets();
    liste_techniciens = await main.liste_techniciens();
    liste_clients = await main.liste_clients();
    liste_factures = await main.liste_factures();
    renderList(listeData);
    add_options(liste_techniciens, technicien);

}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table facture
        const ticket = {
            id_technicien: technicien.value,
            id_facture: facture.value,
            type_vehicule: type_vehicule.value,
            statut: "En cours",
        }
        //Demande de promesse vers main
        console.log(ticket);
        const ajoutFormulaire = await main.ajout_valeur("ticket", ticket);
        console.log(ajoutFormulaire);
        // await main.employe_occupe(facture.id_technicien);
        location.reload();
    }
    catch (error) {
        console.log(error);
    }
});


async function init() {
    getData();
}

init();

function renderValues(data, html) {
    body_table = document.querySelector(html)
    body_table.innerHTML = "";
    data.forEach((element) => {
        // On récupère les éléments du client de la liste des clients
        client_data = main.getbyIdfromList(liste_clients, element.id_client);
        // On récupère les éléments du technicien de la liste des clients
        technicien_data = main.getbyIdfromList(liste_techniciens, element.id_technicien);
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
                <button type="button" class="btn btn-warning">Modifier</button>
                <button type="button" class="btn btn-warning">Supprimer</button>
                <button type="button" class="btn btn-warning">Assigner</button>
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
                <th><a href="#" class="datatable-sorter">Technicien</a></th>
                <th><a href="#" class="datatable-sorter">N° Facture</a></th>
                <th><a href="#" class="datatable-sorter">Date ticket</a></th>
                <th><a href="#" class="datatable-sorter">Type de véhicule</a></th>
                <th><a href="#" class="datatable-sorter">Statut</a></th>
                <th><a href="#" class="datatable-sorter">Action</a></th>
            </tr>
        </thead>
        <tbody id="liste_tickets">
        </tbody>
    </table>`;
    renderValues(data, "#liste_tickets");
}
function add_options(data, html) {
    html.innerHTML = "";
    data.forEach((element) => {
        elem = document.createElement("option");
        elem.value = element.id;
        elem.text = element.prenom + " " + element.nom;
        html.add(elem)
    })
}
['change', 'load'].forEach(function (e) {
    technicien.addEventListener(e, async function () {
        liste_factures_technicien = await main.liste_factures_technicien(technicien.value);
        facture.innerHTML = "";
        liste_factures_technicien.forEach((element) => {
            elem = document.createElement("option");
            elem.value = element.id;
            elem.text = element.id;
            facture.add(elem)
        })
    });
});
// technicien.addEventListener('change', function () {
//     var sel = document.querySelector("select").value;
//     var new_client = document.querySelector("#client_new");
//     var old_client = document.querySelector("#client_known");
//     if (sel == 'new') {
//         new_client.style['display'] = "block"
//         old_client.style['display'] = "none"
//     } else if (sel == 'known') {
//         new_client.style['display'] = "none"
//         old_client.style['display'] = "block"
//     }
// }); 