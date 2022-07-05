
 
let recupererbarCode;
let envoiCodeBarre = document.querySelector('button');

envoiCodeBarre.addEventListener('click', function() {
    recupererbarCode = document.querySelector('#monId').value;
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

                document.querySelector('.resultat').textContent = resultat;
                document.querySelector(".resultatCode").textContent = resultatCode;
                document.querySelector(".resultatTitre").textContent = resultatTitle;
                document.querySelector(".resultatImg").src= resultatImgLink;
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


let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let video = document.querySelector('#video');
let snap = document.querySelector('#snap');


if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
    });
};

