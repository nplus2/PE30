angular.module('starter.controllers', [])

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
// convertit un objet en chaine JSON 
//JSON.stringify()

.controller('ChatsCtrl', function($scope, Chats, $ionicModal) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


    // define create account view
  $ionicModal.fromTemplateUrl('templates/parametres.html', {
     scope: $scope,
     animation: 'slide-in-right'
  }).then(function(modal) {
      $scope.loginModal = modal;
  });


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('InformationsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('EvenementsCtrl', function($scope) {

  $scope.listeVisites = [{id : 1, couleur : 'vert', nom : 'Labo', depart : 1234},
                        {id : 2, couleur : 'bleu', nom : 'Assos', depart : 1234},
                        {id : 3, couleur : 'violet', nom : 'Amphis', depart : 1234},
                        {id : 4, couleur : 'rose', nom : 'Totale', depart : 1234}];

})


.controller('tripsCtrl', function($scope) {
  $scope.listetrips  = [{id : 1, couleur : 'vert', number : 4, depart : 1234},
                        {id : 2, couleur : 'bleu', number : 4, depart : 1234},
                        {id : 3, couleur : 'violet', number: 4, depart : 1234},
                        {id : 4, couleur : 'rose', number : 4, depart : 1234}];
})

.controller('PublicationCtrl', function($scope) {
  

})

.controller('FilDActualiteCtrl', function($scope) {
  
  $scope.listeMessages = [{id : 0, tete:"titre1", corps: "texte1", heure:123, couleur:'vert'},
                          {id : 1, tete:"titre2", corps: "texte2", heure:123, couleur:'bleu'},
                          {id : 2, tete:"titre3", corps: "texte3", heure:123, couleur:'violet'},
                          {id : 3, tete:"titre4", corps: "texte4", heure:123, couleur:'rose'}];

});

// .controller('MasterCtrl', function($scope, $ionicModal) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});


//     // define create account view
//   $ionicModal.fromTemplateUrl('templates/parametres.html', {
//      scope: $scope,
//      animation: 'slide-in-right'
//   }).then(function(modal) {
//       $scope.loginModal = modal;
//   });
// });
