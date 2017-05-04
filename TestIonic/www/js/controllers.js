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
  $scope.statut='visiteur'
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

.controller('CarteCtrl', function($scope, $ionicPopup, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
 
//    
//   $scope.zoomMin = 1;
//   $scope.coche={parcours1 : true,
//                 parcours2 : true,
//                 parcours3 : true};
  
  
//    $scope.showPopup = function() {

//     // popup perso
//       var myPopup = $ionicPopup.show({
//       template: '<ul class="list"><li ><ion-checkbox ng-model="coche.parcours1" ng-checked="coche.parcours1">Parcours 1</ion-checkbox></li><li ><ion-checkbox ng-model="coche.parcours2" ng-checked="coche.parcours2">Parcours 2</ion-checkbox></li><li ><ion-checkbox ng-model="coche.parcours3" ng-checked="coche.parcours3">Parcours 3</ion-checkbox></li></ul>',
//       title: 'Affichage Plan',
//       scope: $scope,
//       buttons: [
//         { text: 'Annuler' },
//         {
//           text: '<b>Ok</b>',
//           type: 'button-positive',
//           onTap: function(e) {
//             var i =0;
//             if ($scope.coche.parcours1) {i += 1;}
//             if ($scope.coche.parcours2) {i += 2;}
//             if ($scope.coche.parcours3) {i += 4;}
//             $scope.miseAJourImage(i);
//           }
//         }
//       ]
//     });
//   }

//  $scope.plans = ['img/plan-campus.png','img/ben.png','img/ionic.png','img/max.png','img/mike.png','img/twitter.png','img/facebook.png','img/perry.png'];
//  $scope.plan = $scope.plans[7];
//  $scope.miseAJourImage = function(i){
//   $scope.plan = $scope.plans[i];
//  };


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
  $scope.Visite1List = [
    { text: "Stand 1", value: 1 },
    { text: "Stand 2", value: 2 },
    { text: "Stand 3", value: 3 },
    { text: "Stand 4", value: 4}];
  $scope.Visite2List = [
    { text: "Stand 1", value: 1 },
    { text: "Stand 2", value: 2 },
    { text: "Stand 3", value: 3 },
    { text: "Stand 4", value: 4}];
  $scope.Visite3List = [
    { text: "Stand 1", value: 1 },
    { text: "Stand 2", value: 2 },
    { text: "Stand 3", value: 3 },
    { text: "Stand 4", value: 4}];
  $scope.Visite4List = [
    { text: "Stand 1", value: 1 },
    { text: "Stand 2", value: 2 },
    { text: "Stand 3", value: 3 },
    { text: "Stand 4", value: 4}];
  $scope.data = {
    Visite1List: '1'};
  $scope.serverSideChange = function(item) {console.log("Selected Serverside, text:", item.text, "value:", item.value);};
});

