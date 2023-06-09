const { remote } = require("electron");

const main = require("../js/main");

//Récupérer les données du formulaire

const formulaire = document.querySelector("#formFacture");
const client = document.querySelector("#client");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const email = document.querySelector("#email");
const telephone = document.querySelector("#telephone");
const technicien = document.querySelector("#technicien");
const list_client = document.querySelector("#list_client");
const montant = document.querySelector("#montant");
const type_vehicule = document.querySelector("#type_vehicule");
const statut = document.querySelector("#statut");
const infos = document.querySelector("#infos");
const new_client = document.querySelector("#client_new");
const old_client = document.querySelector("#client_known");
const mode = document.querySelector("#staticBackdropLabel");

//Liste factures

const List = document.querySelector("#tableau_facture");
//const ListType = document.querySelector("#ListeAllType");

const getData = async () => {
    listeData = await main.liste_factures();
    liste_techniciens = await main.liste_techniciens();
    liste_clients = await main.liste_clients();
    renderList(listeData);
    add_options(liste_techniciens, technicien);
    add_options(liste_clients, list_client);
}

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //On vérifie si on choisit un nouveau client ou non
        const client_data = {
            id: String,
            nom: String,
            prenom: String,
            email: String,
            telephone: String,
        };
        const facture = {
            id_client: Number,
            id_technicien: Number,
            somme: Number,
            statut: String,
            description: String
        };
        const ticket = {
            id_technicien: Number,
            id_facture: Number,
            type_vehicule: String,
            statut: String,
        }
        if (mode.innerHTML == "Modifier une facture") {
            facture.id_client = list_client.value;
            facture.id_technicien = ticket.id_technicien = technicien.value;
            facture.somme = montant.value;
            facture.statut = ticket.statut = statut.value;
            facture.description = infos.value;
            ticket.id_facture = mode.value;
            ticket.type_vehicule = type_vehicule.value;
            const ajoutFormulaire = await main.modifier(facture, "facture", "id="+mode.value);
            const ticketChange = await main.modifier(ticket, "ticket", "id_facture="+mode.value);
        }
        else{
            if (client.value == "new") {
                client_data.nom = nom.value;
                client_data.prenom = prenom.value;
                client_data.email = email.value;
                client_data.telephone = telephone.value;
                const ajoutClient = await main.ajout_valeur("client", client_data);
                var id_client = await main.getIDClient(client_data.nom, client_data.prenom, client_data.email, client_data.telephone);
                client_data.id = id_client[0].id;
            } else {
                client_data.id = list_client.value
            }
            //initialiser les valeurs pour la table facture
            facture.id_client = client_data.id,
            facture.id_technicien = ticket.id_technicien = technicien.value;
            facture.somme = montant.value;
            facture.statut = ticket.statut = statut.value;
            facture.description = infos.value;
            ticket.type_vehicule = type_vehicule.value;
            //Demande de promesse vers main
            // console.log(facture);
            const ajoutFormulaire = await main.ajout_valeur("facture", facture)
            id_facture= await main.getMaxID("facture");
            ticket.id_facture = id_facture.id;
            console.log(id_facture.id);
            const ticketChange = await main.ajout_valeur("ticket", ticket);
        }
        // console.log(ajoutFormulaire);
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
        date = new Date(element.date).toLocaleDateString() + " à " + new Date(element.date).toLocaleTimeString();
        body_table.innerHTML += `
        <tr data-index="${element.id}">
            <td>${element.id}</td>
            <td>${client_data.prenom + " " + client_data.nom}</td>
            <td>${technicien_data.prenom + " " + technicien_data.nom}</td>
            <td>${date}</td>
            <td>${element.somme + " €"}</td>
            <td>${element.statut}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" onclick="modifier_element(${element.id})" >Modifier</button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#suppression" onclick="supprimer_element(${element.id})">Supprimer</button>
            </td>
        </tr>`
    });

}

function renderList(data) {
    List.innerHTML = "";
    List.innerHTML += `
    <table id="datatablesSimple" class="datatable-table datatablesSimple">
        <thead>
            <tr>
                <th><a href="#" class="datatable-sorter">ID</a></th>
                <th><a href="#" class="datatable-sorter">Client</a></th>
                <th><a href="#" class="datatable-sorter">Technicien</a></th>
                <th><a href="#" class="datatable-sorter">Date</a></th>
                <th><a href="#" class="datatable-sorter">Montant</a></th>
                <th><a href="#" class="datatable-sorter">Statut</a></th>
                <th><a href="#" class="datatable-sorter">Action</a></th>
            </tr>
        </thead>
        <tbody id="liste_factures">
        </tbody>
    </table>`;
    renderValues(data, "#liste_factures");
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
function ajouter_element() {
    mode.innerText = 'Ajouter une facture';
    client.value = "new";
    new_client.style['display'] = "block"
    old_client.style['display'] = "none";
    montant.value = "";
    infos.value = "";
}
async function modifier_element(id) {
    client.value = "known";
    new_client.style['display'] = "none"
    old_client.style['display'] = "block"
    mode.innerText = 'Modifier une facture';
    mode.value = id;
    facture = await main.getbyId(id, "facture");
    ticket = await main.getFirstTicketfromParam("id_facture="+id);
    list_client.value = facture.id_client;
    technicien.value = facture.id_technicien;
    montant.value = facture.somme;
    infos.value = facture.description;
    statut.value = facture.statut;
    type_vehicule.value = ticket.type_vehicule;
}
async function supprimer_element(id) {
    supprimer = document.querySelector("#supprimer");
    label = document.querySelector("#suppressionLabel")
    label.innerHTML = "Supprimer la facture " + id ;
    supprimer.onclick = async function () {
        const ajoutFormulaire = await main.supprimer(id, "facture");
        location.reload();
    }
}
client.addEventListener('change', function () {
    var sel = document.querySelector("select").value;
    if (sel == 'new') {
        new_client.style['display'] = "block"
        old_client.style['display'] = "none"
    } else if (sel == 'known') {
        new_client.style['display'] = "none"
        old_client.style['display'] = "block"
    }
}); 