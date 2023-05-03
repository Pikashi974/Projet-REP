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

init();

function renderList(data, html) {
    html.innerHTML = "";
    data.forEach((element) => {
        html.innerHTML += `
        <tr>
            <td>${element.id}</td>
            <td>${element.type_piece}</td>
            <td>${element.nom}</td>
            <td>${element.marque}</td>
            <td>${element.prix}</td>
            <td>${element.description}</td>
            <td>${element.stock}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="Supprime(${element.id})">Supprimer</button>
            </td>
        </tr>`
    });
}
const Supprime = async (id) => {
    const reponse = confirm("Vous confirmez?");
    if (reponse) {
        await main.supprimer(id);
        document.location.href="supprimer.html";
    }
    else {
       console.error();
    }
    return;
};