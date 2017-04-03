angular.module('starter.controllers', [])

 .controller('ParamCtrl',function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/parametres.html', {
     scope: $scope,
     animation: 'slide-in-right'
  }).then(function(modal) {
      $scope.loginModal = modal;
  });

 })

.controller('TabsCtrl', function($scope) {
  $scope.statut='organisateur'
})

.controller('AnnuaireCtrl',function($scope,$http,Annuaire){

  //monnaies pour la requete "USD","EUR","CNY","HUF","CAD"
  //https://www.omdbapi.com/ pour une autre base de donnée
  $http.get('//missecl.eclair.ec-lyon.fr/PE/Annuaire')
      .success(function(response){
        //$scope.texte = response.query.results.rate[0].Rate;
        //$scope.rate = response.query.results.rate[0]
       $scope.message = response[0]
        
      });

  $scope.actualiser = function(motCle){
    $scope.listeDeContacts = Annuaire.recherche(motCle);

    if($scope.listeDeContacts.length == 0){
      $scope.listeErreur = ["Aucun Resultat trouvé"];
    }else{
      $scope.listeErreur = [];
    }

  }

  $scope.listeDeContacts = Annuaire.all();
})





.controller('InformationsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CarteCtrl', function($scope) {
})

.controller('QrCodesCtrl', function($scope) {
})

.controller('EvenementsCtrl', function($scope) {

  $scope.listeVisites = [{id : 1, couleur : 'vert', nom : 'Labo', depart : 1234},
                        {id : 2, couleur : 'bleu', nom : 'Assos', depart : 1234},
                        {id : 3, couleur : 'violet', nom : 'Amphis', depart : 1234},
                        {id : 4, couleur : 'rose', nom : 'Totale', depart : 1234}];

})


.controller('ProchaineCtrl', function($scope) {

  $scope.listeVisites = [{id : 1,   arrive : 7},
                        {id : 2,   arrive : 10},
                        {id : 3,   arrive : 12},
                        {id : 4,  arrive : 18}];

})


.controller('PublicationCtrl', function($scope,requeteHttp) {
  var choixDestinataire = function (){
    var listeDestinataire = requeteHttp.requeteLdG();
    return listeDestinataire;
  };

    
  var envoisMessage = function (){
    
  };

  return {
    choixDestinataire: choixDestinataire,
    envoisMessage: envoisMessage
  };
})

.controller('FilDActualiteCtrl', function($scope) {
  
  $scope.listeMessages = [{id : 0, tete:"titre1", corps: "texte1", heure:123, couleur:'vert'},
                          {id : 1, tete:"titre2", corps: "texte2", heure:123, couleur:'bleu'},
                          {id : 2, tete:"titre3", corps: "texte3", heure:123, couleur:'violet'},
                          {id : 3, tete:"titre4", corps: "texte4", heure:123, couleur:'rose'}];

})

.controller('EtatVisitesCtrl', function($scope) {
  
  $scope.listeMessages = [{id : 0, tete:"titre1", etape:1,},
                          {id : 1, tete:"titre2", etape:2,},
                          {id : 2, tete:"titre3", etape:3,},
                          {id : 3, tete:"titre4", etape:4,}];

  $scope.testStandPasse= function(numeroStand,idVisite){
         if(numeroStand<=$scope.listeMessages[idVisite].etape) {return "active";}
         else {return "non";} 
       };
    
})

.controller('CheckpointsCtrl', function($scope) {
  
  $scope.listeMessages = [{id : 0, tete:"titre1", whichstep:1,},
                          {id : 1, tete:"titre2", whichstep:2,},
                          {id : 2, tete:"titre3", whichstep:3,},
                          {id : 3, tete:"titre4", whichstep:4,}];

  $scope.whatClassIsIt= function(someValue,i){
         if(someValue<=$scope.listeMessages[i].whichstep) {return "active";}
         else {return "non";}              };
    
});

