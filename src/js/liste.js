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

//init();

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
        </tr>`
    });
}

function renderTypes(type) {
    ListType.innerHTML = "";
    type.forEach((element) => {
        liste_single_type = main.singleType(element)
        ListType.innerHTML += `
        <div class="card mb-4">
            <div class="card-header">
            <i class="fas fa-table me-1"></i>
                ${element.type_piece}
            </div>
            <div class="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type de pièce</th>
                            <th>Nom</th>
                            <th>Marque</th>
                            <th>Prix</th>
                            <th>Description</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody id="liste_${element.type_piece}">
                    </tbody>
                </table>
            </div>
        </div>`
        renderList(listeSingleType, "liste_" + element.type_piece);
    });
}

async function renderType(data) {
    await main.singleType(data)
}