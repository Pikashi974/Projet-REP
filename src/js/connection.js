const { remote } = require("electron")

const main = require("../js/main")

const List = document.querySelector("#data");
const ListType = document.querySelector("#ListeAllType");

const getData = async () => {
    listeData = await main.liste();
    listeTypes = await main.allType();
    listeSingleType = await main.singleType("elec");
    renderList(listeData, List);
    renderTypes(listeTypes);
}

async function init() {
    getData();
}

// init();


