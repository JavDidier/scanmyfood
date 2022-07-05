
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




(function() {

    

    var streaming = false,
        video        = document.querySelector('#video'),
        cover        = document.querySelector('#cover'),
        canvas       = document.querySelector('#canvas'),
        photo        = document.querySelector('#photo'),
        startbutton  = document.querySelector('#startbutton'),
        width = 320,
        height = 0;
  
    navigator.getMedia = (navigator.getUserMedia);
  
    navigator.getMedia(
      {
        video: true,
        audio: false
      },

      function(stream) {
        if (navigator.GetUserMedia) {
            video.getVideoTracks()[0].stop();
          video.SrcObject = stream;
        } else {
            video.getVideoTracks()[0].stop();
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
       
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  
    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }
  
    startbutton.addEventListener('click', function(ev){
        takepicture();
      ev.preventDefault();
    }, false);
  
  })();