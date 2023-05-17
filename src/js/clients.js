const { remote } = require("electron");

const main = require("../js/main");


//Récupérer les données du formulaire

const formulaire = document.querySelector("#formClient");
const email = document.querySelector("#email");
const telephone = document.querySelector("#telephone");
const nom = document.querySelector("#nom");
const prenom = document.querySelector("#prenom");
const mode = document.querySelector("#staticBackdropLabel");
const modal_titre = document.querySelector("#contacterLabel");
const modal_body = document.querySelector("#modal-body-contact");
const modal_footer = document.querySelector("#modal-footer-contact");

formulaire.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        //initialiser les valeurs pour la table client
        const client = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            telephone: telephone.value,
        };
        //Demande de promesse vers main
        console.log(client);
        if (mode.innerHTML == "Modifier un client") {
            const ajoutFormulaire = await main.modifier(client, "client", "id="+mode.value);
        }
        else {
            const ajoutFormulaire = await main.ajout_valeur("client", client);
        }
        location.reload();
    }
    catch (error) {
        console.log(error);
    }
});

//Liste clients

const List = document.querySelector("#tableau_client");

const getData = async () => {
    listeData = await main.liste_clients();
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
                <th><a href="#" class="datatable-sorter">N° Téléphone</a></th>
                <th><a href="#" class="datatable-sorter">Action</a></th>
            </tr>
        </thead>
        <tbody id="liste_clients">
        </tbody>
    </table>`;
    renderValues(data, "#liste_clients");
}
function ajouter_element() {
    mode.innerText = 'Ajouter un employé';;
    nom.value = "";
    prenom.value = "";
    email.value = "";
    telephone.value = "";
}
async function modifier_element(id) {
    mode.innerText = 'Modifier un employé';
    mode.value = id;
    client = await main.getbyId(id, "client");
    nom.value = client.nom;
    prenom.value = client.prenom;
    email.value = client.email;
    telephone.value = client.telephone;
}
async function supprimer_element(id) {
    supprimer = document.querySelector("#supprimer");
    client = await main.getbyId(id, "client");
    label = document.querySelector("#suppressionLabel")
    label.innerHTML = "Supprimer le client " + client.nom + " " + client.prenom;
    supprimer.onclick = async function () {
        const ajoutFormulaire = await main.supprimer(id, "client");
        location.reload();
    }
}
async function contacter(id) {
    modal_titre.innerHTML = "Notifier le client";
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