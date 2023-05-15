const { remote } = require("electron")
const main = require("../js/main")

const List = document.querySelector("#listeTech");

const Liste = async () => {
    listeattente = await main.Liste(); // stocke les données dans une liste d'attente
    renderlist(listeattente);
};

// et comme les données doit être au format JSON
// initialiser la fonction renderlist pour la mettre dans un tableau
async function init() {
    Liste();
}

init();

// permet de récupérer les éléments de la BDD
function renderlist(tasks) {
    tasks.forEach((t) => {
        List.innerHTML += `
        <tr>
            <td>${t.id}</td>
            <td>${t.nom}</td>
            <td>${t.prenom}</td>
            <td>${t.email}</td>
            <td>${t.telephone}</td>
            <td>${t.statut}</td>
            <td>
                <button type="button" class="btn btn-warning">Contacter</button>
                <button type="button" class="btn btn-warning">Assigner</button>
                <a href=""><button type="button" class="btn btn-warning">Modifier</button></a>
                <a href=""><button type="button" class="btn btn-warning">Supprimer</button></a>
            </td>
        </tr>
        `
    ;
    });
}