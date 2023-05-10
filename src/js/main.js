const { BrowserWindow, Notification, shell } = require("electron");
const { getConnection } = require("./database")
//const bcryptjs = require('bcryptjs');

let window;

const ajout_directeur = async (values) => {
    const connect = await getConnection();
    const result = await connect.query("INSERT INTO directeur SET ?", values);
}

const liste = async (database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? ORDER BY id DESC", database);
    return (result);
}
const allType = async (database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT type_piece FROM ?", database);
    return (result);
}

const getbyId = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? WHERE id=?", [database, id]);
    return (result[0]);
}

const singleType = async (type, database) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? WHERE type_piece=?", [database, type]);
    return (result);
}

const modifier = async (id, values, database) => {
    const connect = await getConnection();
    const result = await connect.query("UPDATE ? SET ? WHERE id=?", [database, values, id,]);
    return (result);
}

const supprimer = async (id, database) => {
    const connect = await getConnection();
    const result = await connect.query("DELETE FROM ? WHERE id=?", [database, id]);
    return (result);
}

const mailto = async (text) => {
    shell.openExternal("mailto:" + text)
}

const getIdentification = async (mail, password) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM ? WHERE mail=?", mail);
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

module.exports = {
    NewWindow,
    ajout_directeur,
    liste,
    allType,
    singleType,
    supprimer,
    getbyId,
    modifier,
    getIdentification
}
