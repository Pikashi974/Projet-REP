const { remote } = require("electron");

const main = require("../js/main");

//Récupérer les données du formulaire

const formulaire = document.querySelector("#formTicket");
const technicien = document.querySelector("#technicien");
const facture = document.querySelector("#facture");
const type_vehicule = document.querySelector("#type_vehicule");
const mode = document.querySelector("#staticBackdropLabel");

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
            id_technicien: Number,
            id_facture: Number,
            type_vehicule: String,
            statut: String,
        }
        ticket.id_technicien = technicien.value;
        ticket.id_facture = facture.value;
        ticket.type_vehicule = type_vehicule.value;
        ticket.statut = statut.value;
        facture_lie = {
            id_client: Number, 
            id_technicien: Number,
            somme: Number, 
            statut: ticket.statut,
            description: String,
        }
        if (mode.innerHTML == "Modifier un ticket") {
            const ajoutFormulaire = await main.modifier(ticket, "ticket", "id=" + mode.value);
            const changeStatut = await main.modifier(facture_lie, "facture", "id=" + ticket.id_facture);
        }
        else {
            console.log(ticket.id_technicien == 0);
            if (ticket.id_facture == 0) {
                facture_lie.id_client = 0;
                facture_lie.id_technicien = ticket.id_technicien,
                facture_lie.somme = 0,
                facture_lie.description = "";
                const newFacture = await main.ajout_valeur("facture",facture_lie);
                ticket_id_facture = await main.getMaxID("facture");
                console.log(ticket_id_facture);
                ticket.id_facture = ticket_id_facture.id;
                const ajoutFormulaire = await main.ajout_valeur("ticket", ticket);
            } else {
                const ajoutFormulaire = await main.ajout_valeur("ticket", ticket);
                const changeStatut = await main.modifier(facture_lie, "facture", "id=" + ticket.id_facture);
            }
        }
        //Demande de promesse vers main
        console.log(ticket);
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
        <tr data-index="${element.id}">
            <td>${element.id}</td>
            <td>${technicien_data.prenom + " " + technicien_data.nom}</td>
            <td>${element.id_facture}</td>
            <td>${date}</td>
            <td>${element.type_vehicule}</td>
            <td>${element.statut}</td>
            <td>
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
    data.forEach((element) => {
        elem = document.createElement("option");
        elem.value = element.id;
        elem.text = element.prenom + " " + element.nom;
        html.add(elem)
    })
}
function ajouter_element() {
    mode.innerText = 'Ajouter un ticket';
    options_techniciens();
}
async function modifier_element(id) {
    mode.innerText = 'Modifier un ticket';
    mode.value = id;
    ticket = await main.getbyId(id, "ticket");
    facture.value = ticket.id_facture;
    technicien.value = ticket.id_technicien;
    type_vehicule.value = ticket.type_vehicule;
    options_techniciens();
}
async function supprimer_element(id) {
    supprimer = document.querySelector("#supprimer");
    label = document.querySelector("#suppressionLabel")
    label.innerHTML = "Supprimer le ticket " + id;
    supprimer.onclick = async function () {
        const ajoutFormulaire = await main.supprimer(id, "ticket");
        location.reload();
    }
}
async function options_techniciens() {
    liste_facture = await main.liste_factures();
    console.log(technicien.value);
    facture.innerHTML = `<option value="0">Aucune facture</option>`;
    if (liste_facture.length == 0) {
        elem = document.createElement("option");
        elem.value = 0;
        elem.text = "Aucune facture";
        facture.add(elem);
    }
    else {
        liste_facture.forEach((element) => {
            elem = document.createElement("option");
            elem.value = element.id;
            elem.text = element.id;
            facture.add(elem);
        })
    }
}