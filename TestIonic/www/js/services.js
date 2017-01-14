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
}).factory('Annuaire',function(){
  var annuaire = [{
    id: 0,
    prenom: 'Bobby',
    nom:    'Blanc',
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
  }
  ];


  //fonction qui teste si la chaine chaine A est contenue dans la chaine B
  //renvoi un booleen 
  //il n'y a pas difference si il y a un espace ou une majuscule

  function appartient(chaineA,chaineB){
    return (chaineB.replace(" ","").replace(" ","").replace(" ","").replace(" ","").replace(" ","").toUpperCase().indexOf(chaineA.replace(" ","").replace(" ","").replace(" ","").replace(" ","").replace(" ","").toUpperCase()) != -1);
  }

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

      //tableau des elements de l'annuaire correspondant au motCle
      //valeur a retourner
      ret = [];

      //identifiant des elements rajoutes dans ret
      //permet de ne pas avoir de doublons 
      id = [];

      

      n=annuaire.length;

      //recherche par le nom
      for(var i = 0;i<n;i++){
        if (appartient(motCle,annuaire[i].nom)){
          // on teste si l'element n'est pas deja rajoute 
          if(id.indexOf(annuaire[i].id) == -1 ){
            id.push(annuaire[i].id)
            ret.push(annuaire[i])
          }
        }
      }
      //recherche par le prenom
      for(var i = 0;i<n;i++){
        if (appartient(motCle,annuaire[i].prenom)){
          // on teste si l'element n'est pas deja rajoute 
          if(id.indexOf(annuaire[i].id) == -1 ){
            id.push(annuaire[i].id)
            ret.push(annuaire[i])
          }
        }
      }
      //recherche par le role
      for(var i = 0;i<n;i++){
        if (appartient(motCle,annuaire[i].role)){
          // on teste si l'element n'est pas deja rajoute 
          if(id.indexOf(annuaire[i].id) == -1 ){
            id.push(annuaire[i].id)
            ret.push(annuaire[i])
          }
        }
      }
      //recherche par le numero de telephone
      for(var i = 0;i<n;i++){
        if (appartient(motCle,annuaire[i].numero)){
          // on teste si l'element n'est pas deja rajoute 
          if(id.indexOf(annuaire[i].id) == -1 ){
            id.push(annuaire[i].id)
            ret.push(annuaire[i])
          }
        }
      }

      return ret;
    }
  }
});
