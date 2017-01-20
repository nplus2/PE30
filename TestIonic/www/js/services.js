angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

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
    prenom: 'Justin',
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
    nom:'Gopez',
    role:'guide',
    numero: '01 25 68 55 42'
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
