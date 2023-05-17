const { remote } = require("electron");

const main = require("../js/main");

//Récupérer les données du formulaire

const formulaire = document.querySelector("#formTechnicien");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const telephone = document.querySelector("#telephone");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const statut = document.querySelector("#controlSelect");
const mode = document.querySelector("#staticBackdropLabel");
const modal_titre = document.querySelector("#assignerLabel");
const modal_body = document.querySelector("#modal-body-content");
const modal_footer = document.querySelector("#modal-footer-content");
const modal_titre_contact = document.querySelector("#contacterLabel");
const modal_body_contact = document.querySelector("#modal-body-contact");
const modal_footer_contact = document.querySelector("#modal-footer-contact");


formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table technicien
        const employe = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            technicien: 1,
            telephone: telephone.value,
            statut: statut.value,
        };
        if (password.value != "") {
            employe.pass = password.value;
        }
        //Demande de promesse vers main
        console.log(employe);
        if (mode.innerHTML == "Modifier un technicien") {
            const ajoutFormulaire = await main.modifier(employe, "employe","id="+mode.value);
        }
        else{
            const ajoutFormulaire = await main.ajout_valeur("employe", employe);
        }
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
        <tr data-index="${element.id}">
            <td>${element.id}</td>
            <td>${element.nom}</td>
            <td>${element.prenom}</td>
            <td>
                <a href="mailto:${element.email}">${element.email}</a>
            </td>
            <td>
                <a href="tel:${element.telephone}">${element.telephone}</a>
            </td>
            <td>${element.statut}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#contacter" onclick="contacter(${(element.id)})">Contacter</button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#assigner" onclick="assignerTicket(${element.id})">Assigner</button>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop" onclick="modifier_element(${element.id})">Modifier</button>
                <button type="button" class="btn btn-warning"  data-bs-toggle="modal"
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
function ajouter_element() {
    mode.innerText = 'Ajouter un technicien';;
    nom.value  = "";
    prenom.value  = "";
    password.value  = "";
    email.value  = "";
    telephone.value  = "";
    statut.value  = "";
    
}
async function modifier_element(id) {
    mode.innerText = 'Modifier un technicien';
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
    technicien = await main.getbyId(id, "employe");
    label = document.querySelector("#suppressionLabel")
    label.innerHTML = "Supprimer le technicien " + technicien.nom + " " + technicien.prenom ;
    supprimer.onclick = async function () {
        const ajoutFormulaire = await main.supprimer(id, "employe");
        location.reload();
    }
}
async function assignerTicket(id) {
    modal_titre.innerHTML = "Assigner un ticket";
    tickets = await main.getAllTicketsfromParam("id_technicien=0");
    console.log(tickets);
    input_tickets = ""
    tickets.forEach((element) => {
        console.log(element.id);
        input_tickets += ` 
            <input type="checkbox" id="ticket_${element.id}" name="ticket" value="${element.id}">Ticket n° ${element.id}<br>`
    })
    modal_body.innerHTML = `
    <form id="tickets_vide">      
        <fieldset>      
            <legend></legend>` +
        input_tickets
        + `  
            <br>
        </fieldset>      
    </form>
    `
    modal_footer.innerHTML = `
    <button type="button" class="btn btn-warning" onclick=doAssigner(${id})>Valider l'assignation</button>
    
    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
    data-bs-target="#suppression">Annuler l'assignation</button>
    `
}
async function doAssigner(id) {
    checked_tickets = document.querySelectorAll('input[name=ticket]:checked');
    checked_tickets.forEach(async (element) => {
        // Comme les id de toutes les checkbox commencent par ticket_, on peut le couper
        // pour avoir l'id des tickets
        id_ticket = element.id.slice(7);
        ticket_element = await main.getbyId(id_ticket, "ticket");
        ticket_element.id_technicien = id;
        if (ticket_element.id_facture == 0) {
            const facture = {
                id_client: 0,
                id_technicien: id,
                somme: 0,
                statut: "En cours",
                description: ""
            };
            const newFacture = await main.ajout_valeur("facture", facture);
            newest_facture = await main.liste_factures();
            console.log(newest_facture);
            ticket_element.id_facture = newest_facture[0].id;
            const modifiyFacture = await main.modifier(ticket_element, "ticket", "id=" + ticket_element.id);
        } else {
            const modifiyFacture = await main.modifier(facture, "facture", "id=" + ticket_element.id_facture);
        }
        location.reload();
    })
}
async function contacter(id) {
    modal_titre_contact.innerHTML = "Notifier le technicien";
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
    modal_body_contact.innerHTML = `
    <form id="notification">      
        <fieldset>      
            <legend></legend>` +
        input_tickets
        + `  
            <br>
        </fieldset>      
    </form>
    `
    modal_footer_contact.innerHTML = `
    <button type="button" class="btn btn-warning" onclick=sendNotification("#objet","#message")>Envoyer</button>
    <button type="button" class="btn btn-warning" data-bs-toggle="modal"
    data-bs-target="#contacter">Annuler</button>
    `
}