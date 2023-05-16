const { remote } = require("electron");

const main = require("../js/main");
const { constants } = require("original-fs");

//Liste techniciens

const liste_techniciens = document.querySelector("#tableau_technicien");
const liste_factures = document.querySelector("#tableau_facture");
const liste_tickets = document.querySelector("#tableau_ticket");
const modal_titre = document.querySelector("#suppressionLabel");
const modal_body = document.querySelector("#modal-body-content");
const modal_footer = document.querySelector("#modal-footer-content");
const footer_technicien = document.querySelector("#footer-tab-techniciens");
const footer_factures = document.querySelector("#footer-tab-factures");
const footer_tickets = document.querySelector("#footer-tab-tickets");

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
        <tr id="${element.id}">
            <td>${element.id}</td>
            <td>${element.nom}</td>
            <td>${element.prenom}</td>
            <td>${element.email}</td>
            <td>${element.telephone}</td>
            <td>${element.statut}</td>
            <td>
                <button type="button" class="btn btn-warning">Contacter</button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#suppression" onclick="assignerTicket(${(element.id)})">Assigner</button>
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
        <tr id="${element.id}">
            <td>${element.id}</td>
            <td>${client_data.prenom + " " + client_data.nom}</td>
            <td>${technicien_data.prenom + " " + technicien_data.nom}</td>
            <td>${date}</td>
            <td>${element.somme + " €"}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#suppression" onclick=resoudreFacture("${element.id}")  >Résoudre</button>
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
        <tr id="${element.id}">
            <td>${element.id}</td>
            <td>${technicien_data.prenom + " " + technicien_data.nom}</td>
            <td>${element.id_facture}</td>  
            <td>${date}</td>
            <td>${element.type_vehicule}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#suppression" onclick=resoudreTicket("${element.id}") >Résoudre</button>
            </td>
        </tr>`
    });
}
function renderList(data_technicien, data_facture, data_ticket) {
    if (data_technicien.length > 5) {
        footer_technicien.innerHTML = `
        <p>5 sur ${data_technicien.length} affichés</p>
        <a  class="d-flex justify-content-end" href="techniciens.html" style="color: white; align-items:center;">
            <span>Voir tout</span>
            <i class="fa fa-angle-right"></i>
        </a>
        `
        data_technicien = data_technicien.slice(0, 5)
    }
    else {
        footer_technicien.innerHTML = `
        <p>${data_technicien.length} sur ${data_technicien.length} affichés</p>
        <a  class="d-flex justify-content-end" href="techniciens.html" style="color: white; align-items:center;">
            <span>Voir tout</span>
            <i class="fa fa-angle-right"></i>
        </a>
        `
    }
    if (data_facture.length > 4) {
        footer_factures.innerHTML = `
        <p>4 sur ${data_facture.length} affichés</p>
        <a  class="d-flex justify-content-end" href="factures.html" style="color: white; align-items:center;">
            <span>Voir tout</span>
            <i class="fa fa-angle-right"></i>
        </a>
        `
        data_facture = data_facture.slice(0, 4)
    }
    else {
        footer_factures.innerHTML = `
        <p>${data_facture.length} sur ${data_facture.length} affichés</p>
        <a  class="d-flex justify-content-end" href="factures.html" style="color: white; align-items:center;">
            <span>Voir tout</span>
            <i class="fa fa-angle-right"></i>
        </a>
        `
    }
    if (data_ticket.length > 4) {
        footer_tickets.innerHTML = `
        <p>4 sur ${data_ticket.length} affichés</p>
        <a  class="d-flex justify-content-end" href="tickets.html" style="color: white; align-items:center;">
            <span>Voir tout</span>
            <i class="fa fa-angle-right"></i>
        </a>
        `
        data_ticket = data_ticket.slice(0, 4)
    }
    else {
        footer_tickets.innerHTML = `
        <p>${data_ticket.length} sur ${data_ticket.length} affichés</p>
        <a  class="d-flex justify-content-end" href="tickets.html" style="color: white; align-items:center;">
            <span>Voir tout</span>
            <i class="fa fa-angle-right"></i>
        </a>
        `
        data_ticket = data_ticket.slice(0, 4)
    }
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
async function resoudreFacture(id) {
    modal_titre.innerHTML = "Facture n° " + id;
    facture = await main.getbyId(id, "facture");
    technicien = await main.getbyId(facture.id_technicien, "employe");
    client = await main.getbyId(facture.id_client, "client")
    date = new Date(facture.date).toLocaleDateString() + " à " + new Date(facture.date).toLocaleTimeString();
    try {
        // On essaie de voir si c'est plusieurs informations qui ont été entrés
        infos = facture.description.replace("\n", "</li><li>");
    } catch (error) {
        // Si ce n'est pas le cas, on vérifie qu'il y'a une information
        if (facture.description == null) {
            infos = "";
        } else {
            infos = facture.description;
        }
    }
    modal_body.innerHTML = `
    <p>Client: ${client.prenom} ${client.nom}<p>
    <p>Technicien: ${technicien.prenom} ${technicien.nom}<p>
    <p>Facturé le ${date} pour un montant de ${facture.somme} €<p>
    <p>Informations</p>
    <ul>
        <li>${infos}</li>
    </ul>
    `
    modal_footer.innerHTML = `
    <button type="button" class="btn btn-warning">Valider la facture</button>
    <button type="button" class="btn btn-warning">Contacter le client</button>
    <button type="button" class="btn btn-warning">Annuler la facture</button>
    `
}
async function resoudreTicket(id) {
    modal_titre.innerHTML = "Ticket n° " + id;
    ticket = await main.getbyId(id, "ticket");
    facture = await main.getbyId(ticket.id_facture, "facture");
    technicien = await main.getbyId(ticket.id_technicien, "employe");
    client = await main.getbyId(facture.id_client, "client")
    date = new Date(ticket.date_creation).toLocaleDateString() + " à " + new Date(ticket.date_creation).toLocaleTimeString();
    try {
        // On essaie de voir si c'est plusieurs informations qui ont été entrés
        infos = facture.description.replace("\n", "</li><li>");
    } catch (error) {
        // Si ce n'est pas le cas, on vérifie qu'il y'a une information
        if (facture.description == null) {
            infos = "";
        } else {
            infos = facture.description;
        }
    }
    modal_body.innerHTML = `
    <p>Client: ${client.prenom} ${client.nom}<p>
    <p>Technicien: ${technicien.prenom} ${technicien.nom}<p>
    <p>Facturé le ${date} pour un montant de ${facture.somme} €<p>
    <p>Informations</p>
    <ul>
        <li>${infos}</li>
    </ul>
    `
    modal_footer.innerHTML = `
    <button type="button" class="btn btn-warning" onclick=validerTicket(${id})>Valider le ticket</button>
    <button type="button" class="btn btn-warning">Contacter le client</button>
    <button type="button" class="btn btn-warning">Annuler le ticket</button>
    `
}
async function assignerTicket(id) {
    modal_titre.innerHTML = "Assigner un ticket";
    technicien = await main.getbyId(id, "employe");
    //ticket = await main.getbyId(id, "ticket");
    modal_body.innerHTML = `
    <form method="post" action="/Tests/Post/">      
        <fieldset>      
            <legend></legend>      
            <input type="checkbox" name="favorite_pet" value="Cats">Ticket<br>      
            <input type="checkbox" name="favorite_pet" value="Dogs">Ticket<br>      
            <input type="checkbox" name="favorite_pet" value="Birds">Ticket<br>      
            <br>
        </fieldset>      
    </form>
    `
    modal_footer.innerHTML = `
    <button type="button" class="btn btn-warning">Valider l'assignation</button>
    
    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
    data-bs-target="#suppression">Annuler l'assignation</button>
    `
}
async function validerTicket(id) {
    facture_value = {
        statut:"Réglé"
    }
    const ajoutFormulaire = await main.modifier(facture_value, "facture", "id="+id)
    id_facture = await main.getMaxID("facture");
    ticket = await main.getTicketfromParam("id_facture="+id);
    ticket.statut= facture_value.statut;
    const ticketChange = await main.modifier(ticket, "ticket", "id="+ticket.id);
    location.reload();
}