angular.module('starter.controllers', [])

 .controller('ParamCtrl',function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/parametres.html', {
     scope: $scope,
     animation: 'slide-in-right'
  }).then(function(modal) {
      $scope.loginModal = modal;
  });

  $scope.coche = {chercheur : false, guide : false, organisateur : false, visiteur : true};
  $scope.statut='visiteur';
  $scope.changeStatut = function(couleur){
    $scope.coche.visiteur = (couleur == 'visiteur')
    $scope.coche.guide = (couleur == 'guide')
    $scope.coche.chercheur = (couleur == 'chercheur')
    $scope.coche.organisateur = (couleur == 'organisateur')
    $scope.statut = couleur;
  };

 })





.controller('TabsCtrl', function($scope) {
  $scope.statut='guide'
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






.controller('EvenementsCtrl', function($scope) {

data = '[{"id_visite" : "1", "heure_depart" : "1235", "nom" : "Labo", "couleur" : "vert"},{"id_visite" : "1", "heure_depart" : "1245", "nom" : "Learning Lab", "couleur" : "bleu"},{"id_visite" : "1", "heure_depart" : "1315", "nom" : "Vie de Campus", "couleur" : "rose"}]';
$scope.listeVisites = JSON.parse(data);
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


.controller('PublicationCtrl', function($scope,$ionicPopup) {

  // .controller('PublicationCtrl', function($scope,requeteHttp) {
//   var choixDestinataire = function (){
//     var listeDestinataire = requeteHttp.requeteLdG();
//     return listeDestinataire;
//   };
  $scope.couleur='bleu';
  $scope.changeCouleur = function(couleur){
    $scope.coche.bleu = (couleur == 'bleu');
    $scope.coche.vert = (couleur == 'vert');
    $scope.coche.violet = (couleur == 'violet');
    $scope.coche.rose = (couleur == 'rose');
    $scope.coche.orange = (couleur == 'orange');
    $scope.couleur = couleur;
  };

  var envoisMessage = function (){
    //var data = [{}]
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
  $scope.corps = '';
  
    $scope.showPopupDestinataires = function() {

    // popup perso
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
       template: 'Etes-vous sûr de vouloir envoyer ce message'
     });

     confirmPopup.then(function(res) {
       if(res) {
         console.log('Envoi du message');
         envoisMessage();
       }
     });
   };

   $scope.showPasDeDestinataire = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Erreur',
       template: 'Veuillez choisir au moins un destinataire.'
     });
   }

   $scope.clicEnvoyer = function(){
    if ($scope.destinataires.length == 0) {
      $scope.showPasDeDestinataire();
    }
    else {$scope.showConfirmerEnvoi();}
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

})





.controller('FilDActualiteCtrl', function($scope,requeteHttp) {
  
  /*$scope.listeMessages = [{id : 0, tete:"titre1", corps: "texte1", heure:123, couleur:'vert'},
                          {id : 1, tete:"titre2", corps: "texte2", heure:123, couleur:'bleu'},
                          {id : 2, tete:"titre3", corps: "texte3", heure:123, couleur:'violet'},
                          {id : 3, tete:"titre4", corps: "texte4", heure:123, couleur:'rose'}];*/

 var callback2 = function(response){
  alert(JSON.stringify(response.data));
 };
  var callback3 = function(response){
  alert(JSON.stringify(response));
 };
 myJSON = JSON.stringify({"idGroupe":[1,2,3],"corp":"test1test2","couleur":"rouge"});
 requeteHttp.requetePublication(callback2,{"data":"abcd"},callback3);



 var callback = function(response){
  $scope.listeMessages = response.data;
 };
 
//$scope.actualiser = function(){requeteHttp.requeteFdA(callback);};
 requeteHttp.requeteFdA(callback,1);
})





.controller('EtatVisitesCtrl', function($scope) {
  
  data = '[{"id_visite" : "12", "etat" : "2", "nom" : "Labo"},{"id_visite" : "13", "etat" : "1", "nom" : "Barbecue"},{"id_visite" : "22", "etat" : "3", "nom" : "Learning Lab"}]';

  //!\\ data est un fichier JSON 
  
  $scope.listeVisites = JSON.parse(data);

  $scope.testStandPasse= function(numeroStand,etat){
         if(numeroStand<=etat) {return "active";}
         else {return "non";} 
       };
  
})






.controller('CheckpointsCtrl', function($scope) {
  data_envoyee = {id_guide : 12};
  data = '{"id" : "125", "nom_stand1" : "Labo mécaflu", "nom_stand2" : "FabLab <3", "nom_stand3" : "Labo H10", "nom_stand4" : "Chambre Acoustique", "etat" : "1"}';
  $scope.visite = JSON.parse(data);
  etat = parseInt(visit.etat);
  $scope.serverSideChange = function(item) {console.log("Selected Serverside, text:", item.text, "value:", item.value);};
});

