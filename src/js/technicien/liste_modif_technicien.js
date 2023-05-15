const { remote } = require("electron")
const main = require("../js/main")

const List = document.querySelector("#listemodTechnicien");

let ModificationId;

// afficher les résultats de la BDD dans un tableau 
// dire au controller de mettre en place une fonction qui va se synchroniser avec la BDD, 
// récupérer des infos sous forme d'objet afin de pouvoir les afficher

// demande de promesse à main pour récupérer les données dans la BDD
const Liste = async () => {
    listeattente = await main.Liste(); // stocke les données dans une liste d'attente
    // retour avec une fonction renderlist
    renderlist(listeattente);
};

// initialiser la fonction renderlist pour la mettre dans un tableau
async function init() {
    Liste();
}

init();

// permet de récupérer les éléments de la BDD
// récupération des éléments de la BDD
function renderlist (tasks, html) {
    html.innerHTML = "";
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
                <button class="btn btn-secondary btn-sm" onclick="Modification(${t.id})">Modifier</button>
            </td>
        </tr>
        `
        // quand on clique sur "Modifier", le bouton "onClick" va récupéré l'id
    ;
  });
}

// récupération des infos de la BDD par rapport à l'ID
const Modification = async (id) => {
    const technicien = await main.EditerTechnicien(id);

    // ce que tu récupère dans la bdd doit être égal à tel champs
    // le champs qui s'appelle .. doit être égal au champ dans la BDD
    // initialiser les valeurs de la table stockage vers INPUT, cohérent dans chaque INPUT
    nomTech.value = technicien.nom;
    prenomTech.value = technicien.prenom;
    emailTech.value = technicien.email;
    telephoneTech.value = technicien.telephone;
    TypestatutTech.value = technicien.statut;

    ModificationId = id;
    // dès qu'on clique sur le bouton "Modifier", cela va effectuer une MAJ dans la BDD
};

AjoutForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        //initialiser les valeurs INPUT VS champ table stockage
        const technicien = {
            nom: nomTech.value,
            prenom: prenomTech.value,
            email: emailTech.value,
            telephone: telephoneTech.value,
            statut:TypestatutTech.value,
        };

        // demande de promesse vers le main
        const Modifier = await main.ModifierTechnicien(ModificationId, technicien);
        console.log(Modifier)

        document.location.href="modifier_technicien.html"; // redirection
    } catch (error) {
        console.log(error);
    }
});