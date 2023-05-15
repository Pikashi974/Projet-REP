const { remote } = require ("electron");
const main = require("../js/main");

const List = document.querySelector("#listeEmploye");

// demande de promesse pour récupérer les doonnées 
const Liste = async () => {
    listeattente = await main.Liste();
    renderlist(listeattente);
};

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
            <td>${t.nom}</td>
            <td>${t.prenom}</td>
            <td>${t.email}</td>
            <td>${t.telephone}</td>
            <td>${t.statut}</td>
            <td>     
                <button type="button" class="btn btn-warning">Contacter</button>
                <button type="button" class="btn btn-warning">Assigner</button>
                <a href="modifier_employe.html"><button type="button" class="btn btn-warning">Modifier</button></a>
                <a href="supprimer_employe.html"><button type="button" class="btn btn-warning">Supprimer</button></a>                                          
            </td>
        </tr>
        `
    ;
    });
}