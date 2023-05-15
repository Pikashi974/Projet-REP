const { remote } = require ("electron");
const main = require("../js/main");

// Récupération des valeurs du formulaire
const List = document.querySelector("#listemodClient");

let ModificationId;

// demande de promesse pour récupérer des données dans la BDD
const Liste = async () => {
    listeattente = await main.Liste(); // stocke les données dans une liste d'attente
    renderlist(listeattente, List);
};

// initialiser la fonction renderList() pour la mettre sous forme de tableau
async function init() {
    Liste();
}

init();

// récupération des éléments de la BDD
function renderlist (tasks, html) {
    html.innerHTML = "";
    tasks.forEach((t) => {
        List.innerHTML += `
        <tr>
            <td>${t.nom}</td>
            <td>${t.prenom}</td>
            <td>${t.email}</td>
            <td>${t.telephone}</td>
            <td>${t.statut}</td>
            <td>     
                <button class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="Modification(${t.id})">
                Modifier
                </button>

                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" role="dialog" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div style="color: black;" class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modifier le client</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="AjoutForm">
                                    <div class="form-group">
                                        <label for="nomClient" class="col-form-label">Nom :</label>
                                        <input type="text" class="form-control" id="nomClient">
                                    </div>
                                    <div class="form-group">
                                        <label for="prenomClient" class="col-form-label">Prénom :</label>
                                        <input type="text" class="form-control" id="prenomClient">
                                    </div>
                                    <div class="form-group">
                                        <label for="emailClient" class="col-form-label">Adresse e-mail :</label>
                                        <input type="mail" class="form-control" id="emailClient">
                                    </div>
                                    <div class="form-group">
                                        <label for="telephoneClient" class="col-form-label">Téléphone :</label>
                                        <input type="text" class="form-control" id="telephoneClient">
                                    </div>
                                    <div class="form-group">
                                        <label for="TypestatutClient" class="col-form-label">Statut :</label>
                                        <select class="form-control" id="TypestatutClient">
                                            <option value="N.C">Choisir le statut du technicien</option>
                                            <option value="Disponible">Disponible</option>
                                            <option value="Occupe">Occupé</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" id="ajouter" class="btn btn-primary">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>


            </td>
        </tr>
        `
        // quand on clique sur "Modifier", le bouton "onClick" va récupéré l'id
    ;
  });
}

// récupération des infos de la BDD par rapport à l'ID
const Modification = async (id)=> {
    const client = await main.EditerClient(id); 

    // ce que je récupère dans la BDD doit être égal à tel champ
    // initialiser les valeurs de la table employe vers l'INPUT, cohérant dans chaque input
    nomClient.value = client.nom;
    prenomClient.value = client.prenom;
    emailClient.value = client.email;
    telephoneClient.value = client.telephone;
    TypestatutClient.value = client.statut;

    ModificationId = id;
    // dès qu'il clique sur le bouton "Modifier", il va faire une MAJ dans la BDD
};

AjoutForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        // initialiser les valeurs INPUT VS champ table "client"
        const client = {
            nom: nomClient.value,
            prenom: prenomClient.value,
            email: emailClient.value,
            telephone: telephoneClient.value,
            statut: TypestatutClient.value,
        };

        // demande de promesse vers le main
        const Modifier= await main.ModifierClient(ModificationId, client);
        console.log(Modifier);

        document.location.href="modifier_client.html";
        
    } catch (error) {
        console.log(error);
    }
});