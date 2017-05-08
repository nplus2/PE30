angular.module('starter.services', [])

.factory('identification',function(){
  var identifiant = '',
  role = 'visiteur';
  return {
    identifiant: identifiant,
    role: role
  };
})

.factory('requeteHttp',function($http){
  var requeteVisite = function(callback){
    $http.get('https://pe30.eclair.ec-lyon.fr/evenement.php')
     .then(callback);
  };
  var requeteFdA = function(callback, groupe){
    $http.get('https://pe30.eclair.ec-lyon.fr/actualite.php?groupe=' + groupe)
     .then(callback);
  };

  var requeteCheckpoint = function(callback){
    $http.get('https://pe30.eclair.ec-lyon.fr/checkpoint.php')
     .then(callback);
  };

  var requeteLdG = function(callback){
    $http.get('https://pe30.eclair.ec-lyon.fr/listegroupe.php')
    .then(callback);
  };

  var requetePosition = function(callback, idUtilisateur){
    $http.get('https://pe30.eclair.ec-lyon.fr/position.php')
     .then(callback);
  };

  var requetePublication = function(callback,data,heure,couleur,destinataire,corp){
    $http.get('https://pe30.eclair.ec-lyon.fr/publication.php?heure='+heure+'&couleur='+couleur+'&guide='+destinataire[0]+'&chercheur='+destinataire[1]+'&organisateur='+destinataire[2]+'&corps='+corp)
     .then(callback);
  };

  var requeteLogin = function(callback,idUtilisateur,mdpUtilisateur){
    $http.get('https://pe30.eclair.ec-lyon.fr/connexion.php?identifiant='+idUtilisateur+'&mdp='+mdpUtilisateur)
     .then(callback);
  };

  var requeteAnnuaire = function(callback){
    $http.get('https://pe30.eclair.ec-lyon.fr/annuaire.php')
     .then(callback);
  };

  return {
    requeteFdA : requeteFdA,
    requeteCheckpoint : requeteCheckpoint,
    requeteLdG : requeteLdG,
    requetePosition : requetePosition,
    requetePublication : requetePublication,
    requeteLogin : requeteLogin,
    requeteAnnuaire : requeteAnnuaire,
    requeteVisite : requeteVisite
  };

})
.factory('Annuaire',function(){


  return {
    all: function(annuaire) {
      return annuaire;
    },
    //fonction qui recherche dans annuaire les elements correspondants au mot cle
    // cherche en priorite une concordance avec :
    //      - le nom
    //      - le prenom
    //      - le numero de telephone
    recherche: function(annuaire,motCle){
      resultat = [];                    // Résultat qui sera renvoyé
      id = [];                          // Tableau contenant les id des personnes selectionnées (pour éviter les doublons)
      listeClef = motCle.split(" ");    // Liste des mots recherchés
      for(var i = 0; i<annuaire.length; i++){
        ok = true;                      // Variable indiquant si tous les mots recherchez sont présents
        
        prenom = annuaire[i].prenom.toUpperCase();
        nom = annuaire[i].nom.toUpperCase();
        role = annuaire[i].role.toUpperCase();
        listeRole = role.split(" ");
        numero = annuaire[i].numero.replace(" ","").replace(" ","").replace(" ","").replace(" ","");

        for (var j = 0; j<listeClef.length; j++) {
          clef = listeClef[j].toUpperCase();
          if (nom.indexOf(clef)!= 0 && prenom.indexOf(clef)!= 0 && numero.indexOf(clef)!=0) {
            if (listeRole.length == 2)          // J'ai supposé que la longueur était 1 ou 2 si c'est plus on fera une boucle
              { ok = ok && (listeRole[0].indexOf(clef)==0 || listeRole[1].indexOf(clef)==0)}
            else {ok = ok && listeRole[0].indexOf(clef)==0}
          }
        }
        if (ok && id.indexOf(annuaire[i].id) == -1 ){
           id.push(annuaire[i].id)
           resultat.push(annuaire[i])
        }
      }

      return resultat;
    }
  }
});