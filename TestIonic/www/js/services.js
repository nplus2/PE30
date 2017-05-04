angular.module('starter.services', [])

.factory('requeteHttp',function($http){

  var requeteFdA = function(callback, idGroupe){
    $http.get('https://pe30.eclair.ec-lyon.fr/actualite.php?groupe=' + idGroupe)
     .then(callback)
  };

  var requeteCheckpoint = function(callback){
    $http.get('https://pe30.eclair.ec-lyon.fr/checkpoint.php')
     .then(callback)
  };

  var requeteLdG = function(callback){
    $http.get('https://pe30.eclair.ec-lyon.fr/listegroupe.php')
    .then(callback)
  };

  var requetePosition = function(callback, idUtilisateur){
    $http.get('https://pe30.eclair.ec-lyon.fr/position.php')
     .then(callback)
  };

  var requetePublication = function(callback,data){
    $http.post('https://pe30.eclair.ec-lyon.fr/publication.php',data)
    .then(callback)
  };

  var requeteLogin = function(callback,idUtilisateur,mdpUtilisateur){
    $http.get('').then(callback)
  };

  var requeteAnnuaire = function(callback){
    $http.get('').then(callback)
  };

  return {
    requeteFdA : requeteFdA,
    requeteCheckpoint : requeteCheckpoint,
    requeteLdG : requeteLdG,
    requetePosition : requetePosition,
    requetePublication : requetePublication,
    requeteLogin : requeteLogin,
    requeteAnnuaire : requeteAnnuaire
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
  var annuaire = [{
    id: 0,
    prenom: 'Bobby',
    nom:    'Bernard',
    role: 'guide',
    numero: '02 43 54 12 93'
  },{
    id:1,
    prenom: 'Teddy',
    nom:     'Baco',
    role: 'organisateur',
    numero: '07 23 54 94 36'
  },{
    id:2,
    prenom: 'Renaud',
    nom:     'Jester',
    role: 'VP crumble',
    numero: '01 32 98 56 83'
  },{
    id:3,
    prenom: 'Christine',
    nom: 'Louboutin',
    role: 'guide',
    numero: '06 73 54 91 23'
  },{
    id:4,
    prenom: 'Jean-Pierre',
    nom: 'Bridou',
    role: 'sponsor saucisson',
    numero: '06 06 06 06 07'
  },{
    id:5,
    prenom: 'Pascal',
    nom: 'Bernard',
    role: 'chercheur',
    numero: '06 99 21 96 38'
  },{
    id:6,
    prenom: 'Sylvain',
    nom: 'Dupond',
    role:'VP chapeaux',
    numero: '06 79 22 11 88'
  },{
    id:7,
    prenom: 'Jean',
    nom:'Dupont',
    role:'VP cannes',
    numero: '06 86 52 12 48'
  },{
    id:8,
    prenom: 'Simon',
    nom:'Gomez',
    role:'organisateur',
    numero: '01 25 68 55 42'
  },
  {
    id:9,
    prenom: 'Paul',
    nom:'Cerisier',
    role:'VP mécanique',
    numero: '06 22 73 26 82'
  }
  ];

  return {
    all: function() {
      return annuaire;
    },
    //fonction qui recherche dans annuaire les elements correspondants au mot cle
    // cherche en priorite une concordance avec :
    //      - le nom
    //      - le prenom
    //      - le numero de telephone
    recherche: function(motCle){
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