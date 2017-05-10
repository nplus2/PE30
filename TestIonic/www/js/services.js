angular.module('starter.services', [])
.factory('identification',function(){
  var identifiant = '',
  role = '';

  return{
    identifiant:identifiant,
    role:role
  };
  
})

.factory('identification',function(){
  var identifiant = '',
  role = 'visiteur';
  return {
    identifiant: identifiant,
    role: role
  };
})

.factory('requeteHttp',function($http){

   var etatVisite = function(callback){
     $http.get('https://pe30.eclair.ec-lyon.fr/etat_visite.php')
     .then(callback);
   };
   var requeteVisite = function(callback){
    $http.get('https://pe30.eclair.ec-lyon.fr/evenement.php')
     .then(callback);
  };
  var requeteFdA = function(callback, idGroupe){
    $http.get('https://pe30.eclair.ec-lyon.fr/actualite.php?groupe=' + idGroupe)
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
  }

  var requetePublication = function(callback, heure, couleur, guide, chercheur, organisateur, visiteur, corps){     //data
    $http.get('https://pe30.eclair.ec-lyon.fr/publication.php?heure='+ heure +'&couleur='+ couleur +'&guide='+ guide +'&chercheur='+ chercheur +'&organisateur='+ organisateur +'&visiteur=' + visiteur + '&corps='+ corps)
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

  var lastCheckpoint =   function(callback,idGuide){
    $http.get('https://pe30.eclair.ec-lyon.fr/last_checkpoint.php?guide='+idGuide)
     .then(callback);
  };
  var nomStand = function(callback,idStand){
    $http.get('https://pe30.eclair.ec-lyon.fr/nom_stand.php?id='+idStand)
     .then(callback);
  };
  var envoiCheckpoint = function(callback,etat,id,heure){
    $http.get('https://pe30.eclair.ec-lyon.fr/checkpoint.php?id=1&heure='+heure+'&etat='+etat+'&id='+id)
     .then(callback);
  };
  var nextVisite = function(callback,id){
    $http.get('https://pe30.eclair.ec-lyon.fr/next_visite.php?chercheur='+id)
     .then(callback);
  }
  return {
    etatVisite : etatVisite,
    requeteFdA : requeteFdA,
    requeteCheckpoint : requeteCheckpoint,
    requeteLdG : requeteLdG,
    requetePosition : requetePosition,
    requetePublication : requetePublication,
    requeteLogin : requeteLogin,
    requeteAnnuaire : requeteAnnuaire,
    requeteVisite : requeteVisite,
    lastCheckpoint : lastCheckpoint,
    nomStand : nomStand,
    envoiCheckpoint : envoiCheckpoint,
    nextVisite : nextVisite
  };


})

// .factory('requeteHttp12',function($scope,$http){    

//   var requeteFdA = function(idUtilisateur){
//     $http.get('/filActualite/'+idUtilisateur)
//      .then(function(response){
//       return response.data;
//     },function(){$scope.erreur = 'Le serveur n\'a pas renvoye d\'info'});
//   };

//   var requeteLdG = function(){
//     $http.get('/listeGroupe')
//      .then(function(response){
//       return response.data;
//      },function(){$scope.erreur = 'Le serveur n\'a pas renvoye d\'info'});
//   };

//   var requetePublication = function(data){
//     $http.post('/publication',data)
//     .then(function(){$scope.publicationReussie = 'Message envoyé'},
//       function(){$scope.erreur = 'Le serveur n\'a pas renvoye d\'info'});
//   };

//   var requeteLogin = function(idUtilisateur,mdpUtilisateur){
//     $http.get('/login/'+idUtilisateur+'/'+mdpUtilisateur)
//      .then(function(response){
//       return response.data;
//      },function(){$scope.erreur = 'Le serveur n\'a pas renvoye d\'info'});
//   };

//   var requeteCheckpoint = function(idUtilisateur,parcour,etat){
//     $http.get('/checkpoint/'+idUtilisateur+'/'+parcour+'/'+etat)
//     .then(function(response){
//       return response.data;
//     },function(){$scope.erreur = 'Le serveur n\'a pas renvoye d\'info'});
//   };

//   var requetePGuide = function(idUtilisateur){
//     $http.get('/positionGuide/'+idUtilisateur)
//     .then(function(response){
//       return response.data;
//     },function(){$scope.erreur = 'Le serveur n\'a pas renvoye d\'info'});
//   };


//   return {
//     requeteFdA: requeteFdA,
//     requeteLdG: requeteLdG,
//     requetePublication: requetePublication,
//     requeteLogin: requeteLogin,
//     requeteCheckpoint: requeteCheckpoint,
//     requetePGuide: requetePGuide
//   };
// })

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
        if (ok && id.indexOf(i) == -1 ){
           id.push(i)
           resultat.push(annuaire[i])
        }
      }

      return resultat;
    }
  }
});
