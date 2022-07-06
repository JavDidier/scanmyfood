let recupererbarCode;
let envoiCodeBarre = document.querySelector('button');

let nombreProduit = 1;
let nombreMaxProduits = 5;


envoiCodeBarre.addEventListener('click', function() {
    recupererbarCode = document.querySelector('#champBarreCode').value;
    nouveauProduit();
    appel(recupererbarCode);
    
});


/* APPEL A L API */
function appel(barCode) {
    let url = "https://world.openfoodfacts.org/api/v0/product/" + barCode;

    /* CRÉER UNE REQUETE */
    let requete = new XMLHttpRequest();
    requete.open("GET", url );
    requete.responseType = 'json';
    requete.send();

    /* QUAND ON A LA REPONSE */
    requete.onload = function() {
        if(requete.readyState === XMLHttpRequest.DONE) {
            if(requete.status === 200) {
                let reponse = requete.response; // récupérer la requette complète
                let resultatCode = reponse.code; // récupérer code barre
                let resultatTitle = reponse.product.generic_name_fr; // récupérer code barre

                let resultat = reponse.product.ingredients_text_fr;
                let resultatImgLink = reponse.product.image_front_thumb_url;
                let resulatScore = reponse.product.nutriscore_grade;

                document.querySelector('.resultat').textContent = resultat;
                document.querySelector(".resultatCode").textContent = resultatCode;
                document.querySelector(".resultatTitre").textContent = resultatTitle;
                document.querySelector(".resultatImg").src= resultatImgLink;
                document.querySelector(".score").textContent = resulatScore;
           }
            else {
                alert("Erreur de fichier ...");
            }
        }
        else {
            console.log("Erreur");
        }
    }
}

// création de la fonction ajouter produits
function nouveauProduit() {
    let containerProduit = document.createElement('div');
    containerProduit.className = "en-tete-resultat";

    if(nombreProduit < nombreMaxProduits) {
        containerProduit.innerHTML = "<div class='image-div'> <img class='resultatImg' src=''></div><div class='en-tete-resultat-description'><h2>TITRE : <br><span class='resultatTitre'></span></h2><h3> CODE BARRE : <br><span class='resultatCode'></span></h3> <p class='description-produit'>Description : <br><span class='resultat'></span></p></div><div class='divScore'> <p>Nutri-Score : <br><span class='score'></span></p></div>";
        document.querySelector('#div-resultat').prepend(containerProduit);
        nombreProduit++;
    }

    else if(nombreProduit == nombreMaxProduits) {
        let atRemove = document.querySelector("#div-resultat").lastChild;
        atRemove.remove();
        containerProduit.innerHTML = "<div class='image-div'> <img class='resultatImg' src=''></div><div class='en-tete-resultat-description'><h2>TITRE : <br><span class='resultatTitre'></span></h2><h3> CODE BARRE : <br><span class='resultatCode'></span></h3> <p class='description-produit'>Description : <br><span class='resultat'></span></p></div><div class='divScore'> <p>Nutri-Score : <br><span class='score'></span></p></div>";
        document.querySelector('#div-resultat').prepend(containerProduit);
        nombreProduit == 5;
    }

    else {
        alert("Une erreur s'est produite, veuillez essayer plus tard !" );
    }   
}

