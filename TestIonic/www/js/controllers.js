angular.module('starter.controllers', [])

 .controller('ParamCtrl',function($scope,$rootScope, $ionicModal,requeteHttp,identification,$ionicPopup) {
  $scope.role = identification.role;
  $ionicModal.fromTemplateUrl('templates/parametres.html', {
     scope: $scope,
     animation: 'slide-in-right'
  }).then(function(modal) {
      $scope.loginModal = modal;
  });

  $scope.loginData = {
    username : '',
    password : ''
  };

  var callback = function(response){
    identification.role = response.data.role;
    identification.identifiant = response.data.id;
    if (identification.role != "0") {
      $scope.showConnexionOk();
      $rootScope.$emit("ChangeStatutMethod",{});
      $scope.role = identification.role;
    }
    else {$scope.showErreurConnexion();}
  };

  $scope.login = function(){
    requeteHttp.requeteLogin(callback,$scope.loginData.username,$scope.loginData.password);
  };

  $scope.showErreurConnexion = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Echec de la connexion',
      template: 'Identifiant ou mot de passe incorrect.'
    });
  };

  $scope.showConnexionOk = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Connexion réussie',
      template: 'Vous êtes connecté(e).'
    });
  };

  $scope.showDeconnexion = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Deconnexion réussie',
      template: 'Vous êtes déconnecté(e).'
    });
  };

 })





.controller('TabsCtrl', function($scope,$rootScope,identification) {
  $scope.statut= identification.role;
  $rootScope.$on("ChangeStatutMethod", function(){
    $scope.actualiser();
  })
  $scope.actualiser = function() {$scope.statut = identification.role;}
})




.controller('AnnuaireCtrl',function($scope,requeteHttp,Annuaire){   // RETRAVAILLER

  var callback = function(response){
    $scope.listeDeContacts = response.data;    // nouvelle variable annuaire
  };

  requeteHttp.requeteAnnuaire(callback);

/*  $http.get('//missecl.eclair.ec-lyon.fr/PE/Annuaire')
      .success(function(response){
        //$scope.texte = response.query.results.rate[0].Rate;
        //$scope.rate = response.query.results.rate[0]
       $scope.message = response[0]
        
      });*/

  $scope.actualiser = function(annuaire, motCle){
    $scope.listeDeContacts = Annuaire.recherche(motCle);  //annuaire à rajouter

    if($scope.listeDeContacts.length == 0){
      $scope.listeErreur = ["Aucun Resultat trouvé"];
    }else{
      $scope.listeErreur = [];
    }

  }

  //$scope.listeDeContacts = $scope.annuaire;
})





.controller('InformationsCtrl', function($scope) {
  $scope.goToLink = function(url){
    window.open(url,'_system');
  }
})




.controller('CarteCtrl', function($scope, $ionicPopup, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
})


.controller('QrCodesCtrl', function($scope, $cordovaBarcodeScanner, $ionicPopup) {
$scope.goToLink = function(url){
    window.open(url,'_system');
  }
$scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
        if (imageData.text != 'index.html'){
          $scope.goToLink(imageData.text);
        }
        $scope.goToLink(imageData.text);
        console.log("Barcode Format -> " + imageData.format);
        console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
        console.log("An error happened -> " + error);
    });
};
})




.controller('EvenementsCtrl', function($scope,requeteHttp,identification) {
  $scope.listeMessages = [];
  $scope.listeVisites = [];

  callbackMessages = function(response){
    $scope.listeMessages = response.data;
  }
  callbackVisites = function(response){
    $scope.listeVisites = response.data;;
  }
  $scope.actualiser = function(){
    requeteHttp.requeteVisite(callbackVisites);
    requeteHttp.requeteFdA(callbackMessages,identification.role);
  }
  $scope.actualiser();
})





.controller('ProchaineCtrl', function($scope) {

  heureActuelle = 1403;
  data = '[{"id_visite" : "3", "id_stand1" : "5", "id_stand2" : "7", "id_stand3" : "4", "id_stand4" : "1", "numero_stand_chercheur" : "3", "heure": "1400", "etat" : "2"},{"id_visite" : "5", "duree_stand1" : "5", "duree_stand2" : "7", "duree_stand3" : "4", "duree_stand4" : "1", "numero_stand_chercheur" : "4", "heure": "1400", "etat" : "1"},{"id_visite" : "23", "duree_stand1" : "5", "duree_stand2" : "7", "duree_stand3" : "4", "duree_stand4" : "1", "numero_stand_chercheur" : "2", "heure": "1400", "etat" : "0"}]'
  data2 = JSON.parse(data);
  $scope.listeVisites = [];
  for (i = 0 ; i < data2.length ; i++) {
    var visite = data2[i];
    // j'ai pas trouvé mieux
    visite.id_visite = parseInt(visite.id_visite);
    visite.duree_stand1 = 5; // ICI \\
    visite.duree_stand2 = 6; // ICI \\
    visite.duree_stand3 = 7; // ICI \\
    visite.duree_stand4 = 8; // ICI \\
    visite.numero_stand_chercheur = parseInt(visite.numero_stand_chercheur);
    visite.heure = parseInt(visite.heure);
    visite.etat = parseInt(visite.etat);
    //
    var maVisite = {id : visite.id_visite, heure : visite.heure-heureActuelle};
    if (visite.etat <= 3 && visite.numero_stand_chercheur ==4) {maVisite.heure += (visite.duree_stand3);}
    if (visite.etat <= 2 && visite.numero_stand_chercheur >=3) {maVisite.heure += (visite.duree_stand2);}
    if (visite.etat <= 1 && visite.numero_stand_chercheur >=2) {maVisite.heure += (visite.duree_stand1);}
    if (visite.etat == 0) {maVisite.heure += 5;}
    if (maVisite.heure <= 2) {maVisite.heure = 'moins de 2';}
    $scope.listeVisites.push(maVisite);
  }
  $scope.listeVisites.sort(function(a,b){return a.heure-b.heure;})

})


.controller('PublicationCtrl', function($scope,$ionicPopup,requeteHttp) {

  var envoisMessage = function (){
    var CorpsMessage = 'test';  //ng-model
    var Heure = 'Null';  // horloge interne à trouver
    var Couleur = 'Null';
    var Guide = 0;
    var Organisateur = 0;
    var Chercheur = 0;

    //alert($scope.coche.violet)

    if ($scope.coche.bleu){
      couleur = 'bleu';     // a verifier avec le css
    }
    if ($scope.coche.vert){
      couleur = 'vert';
    }
    if($scope.coche.violet){
      couleur = 'violet';
      alert('test')
    }
    if ($scope.coche.Organisateurs){
      organisateur = 1;
    }
    if ($scope.coche.Guides){
      guide = 1;
    }
    if ($scope.coche.Chercheurs){
      chercheur = 1;
    }


    var data = [{'heure': Heure, 'couleur': Couleur, 'guide': Guide, 'chercheur': Chercheur, 'organisateur': Organisateur, 'corps': CorpsMessage}];
    alert(JSON.stringify(data));
  };

  $scope.couleur='bleu';

  $scope.changeCouleur = function(couleur){
    $scope.coche.bleu = (couleur == 'bleu');
    $scope.coche.vert = (couleur == 'vert');
    $scope.coche.violet = (couleur == 'violet');
    $scope.coche.rose = (couleur == 'rose');
    $scope.coche.orange = (couleur == 'orange');
    $scope.couleur = couleur;
  };

  $scope.coche={Organisateurs : false,
                Guides : false,
                Chercheurs : false,
                Visiteurs : false,
                bleu : true,
                vert : false,
                violet : false,
                rose : false,
                orange : false};

  $scope.destinataires = [];

  $scope.texteDestinataires = 'Aucun destinataire';
  $scope.message = {corps :''};
  
  $scope.showPopupDestinataires = function() {

    var myPopup = $ionicPopup.show({
    template: '<ul class="list"><li ><ion-checkbox ng-model="coche.Organisateurs" ng-checked="coche.Organisateurs">Organisateurs</ion-checkbox></li><li ><ion-checkbox ng-model="coche.Guides" ng-checked="coche.Guides">Guides</ion-checkbox></li><li ><ion-checkbox ng-model="coche.Chercheurs" ng-checked="coche.Chercheurs">Chercheurs</ion-checkbox></li><li ><ion-checkbox ng-model="coche.Visiteurs" ng-checked="coche.Visiteurs">Visiteurs</ion-checkbox></li></ul>',
    title: 'Affichage Plan',
    scope: $scope,
    buttons: [
      { text: 'Annuler' },
      {
        text: '<b>Ok</b>',
        type: 'button-positive',
        onTap: function(e) {
          $scope.miseAJourDestinataires();
        }
      }
    ]
    });
  };

    $scope.showConfirmerEnvoi = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Confirmation',
       template: 'Etes-vous sûr de vouloir envoyer ce message ?',
       buttons: [
        { text: 'Annuler' },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',
          onTap: function(e) {
            envoisMessage();
          }
        }
      ]  
     });
   }

   $scope.showPasDeDestinataire = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Aucun destinataire',
       template: 'Veuillez choisir au moins un destinataire.'
     });
   }

   $scope.showPasDeMessage = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Aucun message',
       template: 'Veuillez saisir un message.'
     });
   }

   $scope.clicEnvoyer = function(){
    if ($scope.message.corps.length == 0) {
      $scope.showPasDeMessage();
    }
    else {
      if ($scope.destinataires.length == 0) {
        $scope.showPasDeDestinataire();
      }
      else {$scope.showConfirmerEnvoi();
      }
    }
   }

 $scope.miseAJourDestinataires = function(){
  $scope.destinataires =[];
  i = false;
  if ($scope.coche.Organisateurs) {
    $scope.destinataires.push('Organisateurs');
  }
  if ($scope.coche.Guides) {
    $scope.destinataires.push('Guides');
  }
  if ($scope.coche.Chercheurs) {
    $scope.destinataires.push('Chercheurs');
  }
  if ($scope.coche.Visiteurs) {
    $scope.destinataires.push('Visiteurs');
  }
  if ($scope.destinataires.length > 0) {
    $scope.texteDestinataires = $scope.destinataires.join(', ');
  }
  else {
    $scope.texteDestinataires ='Aucun destinataire';
  }
 };


 var contient = function(x, l) {
  for (i = 0 ; i < l.length ; i++) {
    if (l[i] == x) {return true;}
  }
  return false;
 }

 var envoisMessage = function(){
   var ladate= new Date()
   var h=ladate.getHours();
   if (h<10) {h = "0" + h}
   var m=ladate.getMinutes();
   if (m<10) {m = "0" + m}
   var heure=(h+"h"+m)
   datae={corps: $scope.message.corps, heure : h, couleur : $scope.couleur, guide : (contient('Guides',$scope.destinataires)),organisateur: (contient('Organisateurs',$scope.destinataires)) ,chercheur : (contient('Chercheurs',$scope.destinataires)), visiteur : (contient('Visiteurs',$scope.destinataires))};
 }
})





.controller('FilDActualiteCtrl', function($scope,requeteHttp,identification) {

  

 var callback = function(response){
  $scope.listeMessages = response.data;
 };
  $scope.listeMessages = [];
  $scope.actualiser = function(){
    requeteHttp.requeteFdA(callback,identification.role);
  }
  $scope.actualiser();
 
})





.controller('EtatVisitesCtrl', function($scope,requeteHttp) {
  
  $scope.listeVisite = [];
  
  var callback = function(response){

    $scope.listeVisite = response.data;
 };
  
  $scope.actualiser = function(){
    requeteHttp.etatVisite(callback);
  };
  //$scope.actualiser();
  $scope.testStandPasse= function(numeroStand,etat){
         if(numeroStand<=etat) {return "active";}
         else {return "non";} 
       };
  
})






.controller('CheckpointsCtrl', function($scope, $ionicPopup) {
  data_envoyee = {id_guide : 12};
  data = '{"id" : "125", "nom_stand1" : "Labo mécaflu", "nom_stand2" : "FabLab <3", "nom_stand3" : "Labo H10", "nom_stand4" : "Chambre Acoustique", "etat" : "2"}';
  $scope.visite = JSON.parse(data);
  $scope.visite.etat = parseInt($scope.visite.etat);
  $scope.coche = {depart : ($scope.visite.etat == 0), stand1 : ($scope.visite.etat == 1), stand2 : ($scope.visite.etat == 2), stand3 : ($scope.visite.etat == 3), stand4 : ($scope.visite.etat == 4), arrivee : ($scope.visite.etat == 5)};
  $scope.changeEtat = function(etat){
    $scope.coche.depart = (etat == 0);
    $scope.coche.stand1 = (etat == 1);
    $scope.coche.stand2 = (etat == 2);
    $scope.coche.stand3 = (etat == 3);
    $scope.coche.stand4 = (etat == 4);
    $scope.coche.arrivee = (etat == 5);
  };
  $scope.showConfirmerEtat = function(etat) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Confirmation',
       template: 'Etes-vous sûr de vouloir valider le checkpoint ?',
       buttons: [
        { text: 'Annuler',
          onTap: function(e){
            $scope.changeEtat($scope.visite.etat);
          } 
        },
        {
          text: '<b>Ok</b>',
          type: 'button-positive',
          onTap: function(e) {
            $scope.changeEtat(etat);
            $scope.visite.etat = etat;
            $scope.envoiEtat(etat,parseInt($scope.visite.id));
          }
        }
      ]  
     });
   }
  $scope.envoiEtat = function (etat,id){}
});

