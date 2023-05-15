const { remote } = require ("electron");
const main = require("../js/main");

const List = document.querySelector("#listesupEmp");

// je vais dire au controller de mettre en place une fonction qui va se synchroniser avec la BDD et
// récupérer des infos sous forme d'objet afin de pouvoir les afficher

// demande de promesse à main pour récupérer les données dans la BDD
const Liste = async () => {
    // je veux qu'il va stocker dans une liste d'attente
    listeattente = await main.Liste(); // faire la requête où il ya la fonction Liste
    // retour avec une fonction renderlist
    renderlist(listeattente);
};

// et comme les données doivent être au format JSON
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
                <button class="btn btn-secondary btn-sm" onclick="Supprime('${t.id}')">
                    Supprimer
                </button>
            </td>
        </tr>
        `
        // quand on clique sur Supprimer, il va récupérer l'id; LE BOUTON ONCLICK VA RÉCUPÉRÉ l'id
    ;
  });
}

const Supprime = async(id) => {
    const reponse = confirm("Êtes-vous sur de vouloir supprimer cet employé ?");
    if(reponse){
        await main.Supprime(id); // lancer une demande 
        document.location.href="supprimer_employe.html";
    }
    else{
        console.log(error);
    }
    return;
};