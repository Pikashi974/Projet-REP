const { BrowserWindow, shell } = require("electron");
const { getConnection } = require("./database")
//const bcryptjs = require('bcryptjs');

let window;


const liste = async (database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? ORDER BY id DESC", database);
    return (result);
}
const liste_techniciens = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT id, nom, prenom, email, telephone, statut FROM employe WHERE technicien=1 ORDER BY id DESC");
    return (result);
}
const liste_techniciens_dispo = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT id, nom, prenom, email, telephone, statut FROM employe WHERE technicien=1 AND statut = 'Disponible' ORDER BY id DESC");
    return (result);
}
const liste_tickets_dispo = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT id, date_creation, id_technicien, id_facture, type_vehicule FROM ticket WHERE statut = 'En cours' ORDER BY id DESC");
    return (result);
}
const liste_factures_dispo = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT id, id_client, id_technicien, date, somme FROM facture WHERE statut = 'En cours' ORDER BY id DESC");
    return (result);
}
const liste_employes = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT id, nom, prenom, email, technicien, telephone, statut FROM employe ORDER BY id DESC");
    return (result);
}
const liste_factures = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM facture ORDER BY id DESC");
    return (result);
}
const liste_factures_technicien = async (value) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM facture where id_technicien=? ORDER BY id DESC", value);
    return (result);
}
const liste_clients = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM client ORDER BY id DESC");
    return (result);
}
const liste_tickets = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ticket ORDER BY id DESC");
    return (result);
}
const ajout_valeur = async (database, values) => {
    const connect = await getConnection();
    const result = await connect.query("INSERT INTO " + database + " SET ?", values);
}
const update_employe = async (id, values) => {
    const connect = await getConnection();
    const result = await connect.query("UPDATE employe SET ? WHERE id = ?", values, id);
}
const employe_occupe = async (id) => {
    const connect = await getConnection();
    const result = await connect.query("UPDATE employe SET statut='Occupé' WHERE (id = ?)", id);
}
const getbyId = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM " + database + " WHERE id=?", id);
    return (result[0]);
}
function getbyIdfromList(liste, value) {
    text = "";
    liste.forEach(element => {
        if (element.id == value) {
            text = element;
        }
    });
    return text;
}
const modifier = async (id, values, database) => {
    const connect = await getConnection();
    const result = await connect.query("UPDATE " + database + " SET ? WHERE id=?", [values, id,]);
    return (result);
}

const supprimer = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("DELETE FROM " + database + " WHERE id=?",id);
    return (result);
}

const mailto = async (text) => {
    shell.openExternal("mailto:" + text)
}

const getIdentification = async (mail, password) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM directeur WHERE mail=?", mail);
    return result;
}
const getIDClient = async (nom, prenom, email, telephone) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT id FROM client WHERE nom = ? AND prenom = ? AND email = ? AND telephone = ?", [nom, prenom, email, telephone]);
    return result;
}
function NewWindow() {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    window.loadFile("./src/ui/index.html");
}

function searchList() {
    // Declare variables
    var input, filter, table, tr, td, i, j, txtValue, valid;
    input = document.querySelector("#search");
    filter = input.value.toUpperCase();
    table = document.querySelector("#datatablesSimple");
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
}

module.exports = {
    NewWindow,
    liste_techniciens,
    liste_techniciens_dispo,
    liste_tickets_dispo,
    liste_factures_dispo,
    liste_employes,
    liste_factures,
    liste_factures_technicien,
    liste_clients,
    liste_tickets,
    ajout_valeur,
    update_employe,
    employe_occupe,
    supprimer,
    getbyIdfromList,
    modifier,
    getIdentification,
    getIDClient,
    searchList,
}
