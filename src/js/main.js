const { BrowserWindow, Notification, shell } = require("electron");
const { getConnection } = require("./database")

let window;

const ajout = async (stockage) => {
    const connect = await getConnection();
    const result = await connect.query("INSERT INTO stockage SET ?", stockage)
}

const liste = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM stockage ORDER BY id DESC");
    return (result);
}
const allType = async () => {
    const connect = await getConnection();
    const result = await connect.query("SELECT type_piece FROM stockage");
    return (result);
}

const getbyId = async (id) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM stockage WHERE id=?", id);
    return (result[0]);
}

const singleType = async (type) => {
    const connect = await getConnection();
    const result = await connect.query("SELECT * FROM stockage WHERE type_piece=?", type);
    return (result);
}

const modifier = async (id, stockage) => {
    const connect = await getConnection();
    const result = await connect.query("UPDATE stockage SET ? WHERE id=?", [stockage, id,]);
    return (result);
}

const supprimer = async (id) => {
    const connect = await getConnection();
    const result = await connect.query("DELETE FROM stockage WHERE id=?", id);
    return (result);
}

const mailto = async (text) => {
    shell.openExternal("mailto:" + text)
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
    ajout,
    liste,
    allType,
    singleType,
    supprimer,
    getbyId,
    modifier
}