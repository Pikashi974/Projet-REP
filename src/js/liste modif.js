const { remote } = require("electron")

const main = require("../js/main")

const List = document.querySelector("#data");
const formulaire = document.querySelector("#AjoutForm");
const type = document.querySelector("#typepiece");
const nom = document.querySelector("#nom")
const marque = document.querySelector("#marque");
const prix = document.querySelector("#prix");
const stock = document.querySelector("#stock");
const desc = document.querySelector("#description");

let modificationId;

const getData = async () => {
    listeData = await main.liste();
    renderList(listeData, List);
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
                <button class="btn btn-secondary btn-sm" onclick="Modifie(${element.id})">Modifier</button>
            </td>
        </tr>`
    });
}
const Modifie = async (id) => {

    const stockage = await main.getbyId(id);
    console.log(stockage);
    type.value = stockage.type_piece;
    nom.value = stockage.nom;
    marque.value = stockage.marque;
    prix.value = stockage.prix;
    stock.value = stockage.stock;
    desc.value = stockage.desc;

    ModificationId = id;
};

AjoutForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        //initialiser les valeurs INPUT VS champ table stockage
        const stockage = {
            type_piece: type.value,
            nom: nom.value,
            marque: marque.value,
            prix: prix.value,
            description: desc.value,
            stock: stock.value,

        };
        //demande de promese vers le main
        const Modifier = await main.modifier(ModificationId, stockage);
        console.log(Modifier);
        document.location.href = "modifier.html";

    } catch (error) {
        console.log(error);
    }

});