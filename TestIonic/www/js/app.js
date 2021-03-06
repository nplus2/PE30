// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers', 'starter.services','ngCordova'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
  
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:'TabsCtrl'

  })

  // Each tab has its own nav history stack:

  .state('tab.annuaire', {
    url: '/annuaire',
    views: {
      'tab-annuaire': {
        templateUrl: 'templates/tab-annuaire.html',
        controller: 'AnnuaireCtrl'
      }
    }
  })

  .state('tab.evenements', {
    url: '/evenements',
    views: {
      'tab-evenements': {
        templateUrl: 'templates/tab-evenements.html',
        controller: 'EvenementsCtrl'
      }
    }
  })

  .state('tab.qrCodes', {
    url: '/qrCodes',
    views: {
      'tab-qrCodes': {
        templateUrl: 'templates/tab-qrCodes.html',
        controller: 'QrCodesCtrl'
      }
    }
  })

  .state('tab.carte', {
    url: '/carte',
    views: {
      'tab-carte': {
        templateUrl: 'templates/tab-carte.html',
        controller: 'CarteCtrl'
      }
    }
  })

  .state('tab.prochaine', {
    url: '/prochaine',
    views: {
      'tab-prochaine': {
        templateUrl: 'templates/tab-prochaine.html',
        controller: 'ProchaineCtrl'
      }
    }
  })

  .state('tab.informations', {
    url: '/informations',
    views: {
      'tab-informations': {
        templateUrl: 'templates/tab-informations.html',
        controller: 'InformationsCtrl'
      }
    }
  })

  .state('tab.publication', {
    url: '/publication',
    views: {
      'tab-publication': {
        templateUrl: 'templates/tab-publication.html',
        controller: 'PublicationCtrl'
      }
    }
  })

  .state('tab.filDActualite', {
    url: '/filDActualite',
    views: {
      'tab-filDActualite': {
        templateUrl: 'templates/tab-filDActualite.html',
        controller: 'FilDActualiteCtrl'
      }
    }
  })

  .state('tab.etatVisites', {
    url: '/etatVisites',
    views: {
      'tab-etatVisites': {
        templateUrl: 'templates/tab-etatVisites.html',
        controller: 'EtatVisitesCtrl'
      }
    }
  })

  .state('tab.checkpoint',{
    url:'/checkpoint',
    views:{
      'tab-checkpoint': {
        templateUrl:'templates/tab-checkpoint.html',
        controller: 'CheckpointsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/carte');

});
