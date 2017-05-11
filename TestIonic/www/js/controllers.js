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
      $scope.loginModal.hide();
    }
    else {$scope.showErreurConnexion();}
  };

  $scope.login = function(){
    requeteHttp.requeteLogin(callback,$scope.loginData.username,$scope.loginData.password);
  };

  $scope.logout = function(){
    identification.role = 'visiteur';
    identification.identifiant = 0;
    $scope.showDeconnexion();
    $rootScope.$emit("ChangeStatutMethod",{});
    $scope.role = identification.role;
  }

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
  $scope.data = [];
  $scope.listeDeContacts = [];

  var callback = function(response){
    $scope.data = (response.data);
    $scope.listeDeContacts = $scope.data;    // nouvelle variable annuaire
  };

  requeteHttp.requeteAnnuaire(callback);


  $scope.actualiser = function(motCle){
    $scope.listeDeContacts = Annuaire.recherche($scope.data,motCle);  //annuaire à rajouter

    // if (motCle.length == 0) {
    //   $scope.listeDeContacts = data;
    // }
   
    if($scope.listeDeContacts.length == 0){
      $scope.listeErreur = ["Aucun Resultat trouvé"];
    }else{
      $scope.listeErreur = [];
    }

  };
})





.controller('InformationsCtrl', function($scope,$cordovaInAppBrowser) {
  $scope.goToLink = function(url){
    $cordovaInAppBrowser.open(url,'_system');
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
        if (imageData.text != 'index.html' && imageData.text !=''){
          $scope.goToLink(imageData.text);
        }
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





.controller('ProchaineCtrl', function($scope,requeteHttp,identification) {
  var ladate = new Date();
  var h = ladate.getHours();
  if (h<10) {
  h = "0" + h;
  }
  var m=ladate.getMinutes();
  if (m<10) {
   m = "0" + m;
  }
  var heureActuelle= parseInt(String(h)+String(m));

  
  minutes = function(heure){
    h = parseInt(heure1/100);
    alert(h);
    m = heure1%100;
    return 60*h +m; 
  };
  

  data = '[{"id_visite" : "3", "id_stand1" : "5", "id_stand2" : "7", "id_stand3" : "4", "id_stand4" : "1", "numero_stand_chercheur" : "3", "heure": "1400", "etat" : "2"},{"id_visite" : "5", "duree_stand1" : "5", "duree_stand2" : "7", "duree_stand3" : "4", "duree_stand4" : "1", "numero_stand_chercheur" : "4", "heure": "1400", "etat" : "1"},{"id_visite" : "23", "duree_stand1" : "5", "duree_stand2" : "7", "duree_stand3" : "4", "duree_stand4" : "1", "numero_stand_chercheur" : "2", "heure": "1400", "etat" : "0"}]'
  data2 = JSON.parse(data);
  $scope.listeVisites = [];

  callback = function(response){
    $scope.listeVisites = [];
    visites = response.data;
    for(i=0; i<visites.length;i++){
      visite = visites[i];
      //alert(JSON.stringify(visite));
      var maVisite = {id : visite.id_visite, heure : (Number(visite.heure) - heureActuelle)};
    if (visite.etat <= 3 && visite.numero_stand_chercheur ==4) {maVisite.heure += (visite.duree_stand3 | 0);}
    if (visite.etat <= 2 && visite.numero_stand_chercheur >=3) {maVisite.heure += (visite.duree_stand2 | 0);}
    if (visite.etat <= 1 && visite.numero_stand_chercheur >=2) {maVisite.heure += (visite.duree_stand1 | 0);}
    if (visite.etat == 0) {maVisite.heure += 5;}
    if (maVisite.heure <= 2) {maVisite.heure = 'moins de 2';}

    $scope.listeVisites.push(maVisite);
  }
  $scope.listeVisites.sort(function(a,b){return a.heure-b.heure;})
  };

  
  $scope.listeVisites.sort(function(a,b){return a.heure-b.heure;})
  $scope.actualiser = function(){
    requeteHttp.nextVisite(callback,identification.identifiant);
  }
  requeteHttp.nextVisite(callback,identification.identifiant);


})


.controller('PublicationCtrl', function($scope,$ionicPopup,requeteHttp) {

  $scope.changeCouleur = function(couleur){
    $scope.coche.bleu = (couleur == 'bleu');
    $scope.coche.vert = (couleur == 'vert');
    $scope.coche.violet = (couleur == 'violet');
    $scope.coche.rose = (couleur == 'rose');
    $scope.coche.orange = (couleur == 'orange');
    $scope.couleur = couleur;
  };
 $scope.couleur = 'bleu';
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
 };

   $scope.showPasDeDestinataire = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Aucun destinataire',
       template: 'Veuillez choisir au moins un destinataire.'
     });
   };

   $scope.showPasDeMessage = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Aucun message',
       template: 'Veuillez saisir un message.'
     });
   };

 var contient = function(x, l) {
  for (i = 0 ; i < l.length ; i++) {
    if (l[i] == x) {
      return 1;
    }
  }
  return 0;
 };

 var envoisMessage = function(){
  var ladate = new Date();
  var h = ladate.getHours();
  if (h<10) {
  h = "0" + h;
  }
  var m=ladate.getMinutes();
  if (m<10) {
   m = "0" + m;
  }
  var heure1= parseInt(String(h)+String(m));
  var callback = function(response){
    var MessageEnvoyer = $ionicPopup.alert({
      title: 'Statut',
      template: response.data
    });
  };
  requeteHttp.requetePublication(callback, heure1, $scope.couleur, contient('Guides',$scope.destinataires), contient('Chercheurs',$scope.destinataires), contient('Organisateurs',$scope.destinataires), contient('Visiteurs',$scope.destinataires), $scope.message.corps);  //data
 };
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
  $scope.actualiser();
  $scope.testStandPasse= function(numeroStand,etat){
         if(numeroStand<=etat) {return "active";}
         else {return "non";} 
       };
  
})






.controller('CheckpointsCtrl', function($scope, $ionicPopup,identification,requeteHttp) {
  



  callbackStand1 = function(response){
      $scope.visite.nom_stand1 = response.data.nom;
  }
  callbackStand2 = function(response){
      $scope.visite.nom_stand2 = response.data.nom;
  }
  callbackStand3 = function(response){
      $scope.visite.nom_stand3 = response.data.nom;
  }
  callbackStand4 = function(response){
      $scope.visite.nom_stand4 = response.data.nom;
  }


  callback = function(response){
    if(response.data != []){
      $scope.visite = response.data[0];
      $scope.visite.nom_stand1 = "";
      $scope.visite.nom_stand2 = "";
      $scope.visite.nom_stand3 = "";
      $scope.visite.nom_stand4 = "";
      
      requeteHttp.nomStand(callbackStand1,$scope.visite.id_stand1);
      requeteHttp.nomStand(callbackStand2,$scope.visite.id_stand2);
      requeteHttp.nomStand(callbackStand3,$scope.visite.id_stand3);
      requeteHttp.nomStand(callbackStand4,$scope.visite.id_stand4);
    }
  };
  

  $scope.visite = {
    id : 0,
    id_stand1 : 0,
    nom_stand1 : "",
    id_stand2 : 0,
    nom_stand2 : "",
    id_stand3 : 0,
    nom_stand3 : "",
    id_stand4 : 0,
    nom_stand4 : "",
    etat : 0
  };

  $scope.actualiser = function(){
    requeteHttp.lastCheckpoint(callback,identification.identifiant);
  };
  $scope.actualiser();


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
   };
  $scope.envoiEtat = function (etat,id){

    var ladate = new Date();
    var h = ladate.getHours();
    if (h<10) {
      h = "0" + h;
    }
    var m=ladate.getMinutes();
    if (m<10) {
      m = "0" + m;
    }
    var heure= parseInt(String(h)+String(m));
    callbackEnvoi = function(response){
      $scope.actualiser();
    };
    requeteHttp.envoiCheckpoint(callbackEnvoi,etat,id,heure);

    
  };
});

