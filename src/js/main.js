const { BrowserWindow, Notification, shell } = require("electron");
const { getConnection } = require("./database"); // connexion BDD
//const bcryptjs = require('bcryptjs');

let window;

const ajout_directeur = async (values) => {
    const connect = await getConnection();
    const result = await connect.query("INSERT INTO directeur SET ?", values);
}

const getIdentification = async (mail, password) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? WHERE mail=?", mail);
    return result;
}

const liste = async (database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? ORDER BY id DESC", database);
    return (result);
}

const getbyId = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? WHERE id=?", [database, id]);
    return (result[0]);
}

const modifier = async (id, values, database) => {
    const connect = await getConnection();
    const result = await connect.query("UPDATE ? SET ? WHERE id=?", [database, values, id,]);
    return (result);
}


// Employé
const ajout_employe = async (employe) => {
    const connect = await getConnection();
    const result = await connect.query("INSERT INTO employe SET ?", employe);
}

const Supprime = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("DELETE FROM employe WHERE id=?", [database, id]);
    return (result);
}

const Editer = async (id) => {
    const connect = await getConnection();
    const resultat = await conn.query("SELECT * FROM employe WHERE id = ?", id); 
    return resultat[0];
}

const Modifier = async (id,employe) => {
    const connect = await getConnection();
    const resultat = await conn.query("UPDATE employe SET ? WHERE id = ?",  [employe,id,]);
    return resultat;
}

// technicien
const ajoutTechnicien = async (technicien) => {
    // faire appel à la constance de getConnection 
    const connect = await getConnection();
    const resultat = await conn.query("INSERT INTO technicien SET ?", technicien);
}

const SupprimerTechnicien = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("DELETE FROM technicien WHERE id=?", [database, id]);
    return (result);
}

const EditerTechnicien = async (id) => {
    const connect = await getConnection();
    const resultat = await conn.query("SELECT * FROM technicien WHERE id = ?", id); 
    return resultat[0];
}

const ModifierTechnicien = async (id,technicien) => {
    const connect = await getConnection();
    const resultat = await conn.query("UPDATE technicien SET ? WHERE id = ?",  [technicien,id,]);
    return resultat;
}


// client
const ajoutClient = async (client) => {
    // faire appel à la constance de getConnection 
    const connect = await getConnection();
    const resultat = await conn.query("INSERT INTO client SET ?", client);
}

const SupprimeClient = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("DELETE FROM client WHERE id=?", [database, id]);
    return (result);
}

const EditerClient = async (id) => {
    const connect = await getConnection();
    const resultat = await conn.query("SELECT * FROM client WHERE id = ?", id); 
    return resultat[0];
}

const ModifierClient = async (id,client) => {
    const connect = await getConnection();
    const resultat = await conn.query("UPDATE client SET ? WHERE id = ?",  [client,id,]);
    return resultat;
}



// const allType = async (database) => {
//     const connect = await getConnection();
//     const result = await connect.query("SELECT type_piece FROM ?", database);
//     return (result);
// }

// const singleType = async (type, database) => {
//     const connect = await getConnection();
//     const result = await connect.query("SELECT * FROM ? WHERE type_piece=?", [database, type]);
//     return (result);
// }

// const mailto = async (text) => {
//     shell.openExternal("mailto:" + text)
// }


function NewWindow() {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    window.loadFile("./src/ui/index.html");
}

module.exports = {
    NewWindow,
    ajout_directeur,
    liste,
    // allType,
    // singleType,
    // supprimer,
    getbyId,
    modifier,
    getIdentification,

    ajout_employe,
    Supprime,
    Editer,
    Modifier,

    ajoutTechnicien,
    SupprimerTechnicien,
    EditerTechnicien,
    ModifierTechnicien,

    ajoutClient,
    SupprimeClient,
    EditerClient,
    ModifierClient
}
