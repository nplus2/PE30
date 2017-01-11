angular.module('starter.controllers', [])
/*Cooolin*/

.filter('customFilter', function(){
    return function(x){
      return {'id':1, 'nom':"Cros", 'prenom':"Colin", 'numero':"06 79 22 11 88", 'role':"Patron"};
    };
})

.controller('AnnuaireCtrl',function($scope,$http){
  //monnaies pour la requete "USD","EUR","CNY","HUF","CAD"
  //https://www.omdbapi.com/ pour une autre base de donnée
  $http.get('//missecl.eclair.ec-lyon.fr/PE/Annuaire')
      .success(function(response){
        //$scope.texte = response.query.results.rate[0].Rate;
        //$scope.rate = response.query.results.rate[0]
       $scope.message = response[0]
        
      });
  $scope.listeDeContacts = [
      {'id':1, 'nom':"Cros", 'prenom':"Colin", 'numero':"06 79 22 11 88", 'role':"Patron"},
      {'id':2, 'nom':"Sobkowicz", 'prenom':"Konrad", 'numero':"06 07 09 11 52", 'role':"SG"},
      {'id':2, 'nom':"Haguenaueur", 'prenom':"Timothée", 'numero':"06 22 36 58 14", 'role':"Suceur"}];
})
// convertit un objet en chaine JSON 
//JSON.stringify()

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
