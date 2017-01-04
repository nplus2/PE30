angular.module('starter.controllers', [])

.controller('DashCtrl',function($scope,$http){
  //monnaies pour la requete "USD","EUR","CNY","HUF","CAD"
  //https://www.omdbapi.com/ pour une autre base de donnée
  $http.get('//query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("CNYEUR","USDCAD")&format=json&env=store://datatables.org/alltableswithkeys')
      .success(function(response){
        //$scope.texte = response.query.results.rate[0].Rate;
        $scope.rate = response.query.results.rate[0]
        
      });

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