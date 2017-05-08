var Util = (function() {
 return {
    writeToLog: function (message) {
      li = document.createElement('li');
      liMessage = document.createTextNode(message);
      li.appendChild(liMessage);
      document.getElementById('game-log').appendChild(li);
    },
 }
}());

function Map(options) {
  var defaultOptions = {
    pattern: [],
    width: 10,
    height: 10,
    defaultEl: 'map-div'
  },
  options = $.extend(defaultOptions, options);
  this.pattern = options.pattern;
  this.width = options.width;
  this.height = options.height;
  this.defaultEl = options.defaultEl;
}

function Stage(options) {
  var defaultOptions = {
    map: new Map(),
    heroes: [new Hero()],
    enemies: [new Hero()]
  },
  options = $.extend(defaultOptions, options);
  this.map = options.map;
  this.heroes = options.heroes;
  this.enemies = options.enemies;
}

function Tile(options) {
  var defaultOptions = {
    identifier: 'n',
    description: 'Normal Tile',
    walkingModifier: 0,
    color: '#FFFFFF'
  }
  options = $.extend(defaultOptions, options);
  this.identifier = options.identifier;
  this.description = options.description;
  this.walkingModifier = options.walkingModifier;
  this.color = options.color;
}

function Weapon(options) {
  var defaultOptions = {
    weaponType: 'physical', 
    weaponName: 'barehands', 
    weaponBaseDamage: 1, 
    weaponBaseAccuracy: 70
  }
  options = $.extend(defaultOptions, options);
  this.weaponType = options.weaponType;
  this.weaponName = options.weaponName;
  this.weaponBaseDamage = options.weaponBaseDamage;
  this.weaponBaseAccuracy = options.weaponBaseAccuracy;
}

function Hero(options) {
  var defaultOptions = {
    nickname: 'Default Hero',
    weapons: [new Weapon()], 
    hp: 50, 
    strength: 1,
    agility: 1,
    magic: 1,
    currentPosition: [0, 0]
  }
  options = $.extend(defaultOptions, options);
  this.nickname = options.nickname;
  this.weapons = options.weapons;
  this.hp = options.hp;
  this.strength = options.strength;
  this.agility = options.agility;
  this.magic = options.magic;
  this.defense = options.defense;
  this.resistance = options.resistance;
  this.currentPosition = options.currentPosition;
  this.equippedWeapon = this.weapons[0];
}

Hero.prototype = {
  walk: function(xPos, yPos) {
    var newPosition = [xPos, yPos];
    Util.writeToLog(this.nickname + ' moved from ' + this.currentPosition + ' to ' + newPosition);
    this.currentPosition = newPosition;
  },
  attack: function(target) {
    var hitChance = this.calculateHitChance(this, target);
    var chance = Math.floor(Math.random() * 100 + 1);
    if (chance > hitChance) {
      Util.writeToLog('Ops, the attack has missed!');
    } else {
      var damage = this.calculateDamage(this, target);
      target.hp -= damage;
      Util.writeToLog(this.nickname + ' has attacked ' + target.nickname + ' for ' + damage + ' damage!');
      if (target.hp <= 0) {
        Util.writeToLog(target.nickname + ' has died!');
      }
    }
  },
  buff: function() {
    this.strength += 1;
    this.agility += 1;
    this.magic += 1;
  },
  heal: function() {
    this.hp += 10;
  },
  info: function() {
    Util.writeToLog('INFO -> Hero: ' + this.nickname + ' | HP: ' + this.hp + ' | Weapon: ' + this.equippedWeapon.weaponName);
  },
  calculateDamage: function(attacker, attacked) {
    if (attacker.equippedWeapon.weaponType == 'physical') {
      return (attacker.strength * attacker.equippedWeapon.weaponBaseDamage) - attacked.defense * 2;
    }
    if (attacker.equippedWeapon.weaponType == 'magical') {
      return (attacker.magic * attacker.equippedWeapon.weaponBaseDamage) - attacked.resistance * 2;
    }
  },
  calculateHitChance: function(attacker, attacked) {
    return attacker.equippedWeapon.weaponBaseAccuracy - attacked.agility * 5
  },
  changeWeapon: function(weapon) {
    if (this.weapons.length <= 1) {
      Util.writeToLog('You only have one weapon!');
    } else {
      this.equippedWeapon = this.weapons[weapon];
      Util.writeToLog(this.nickname + ' is now using a ' + this.equippedWeapon.weaponName);
    }    
  }
}

Map.prototype = {
  bindEvents: function(heroes) {
    for (var k = 0; k < heroes.length; k++) {
      var char = heroes[k];
      var charSpan = document.getElementById(heroes[k].nickname);
      charSpan.addEventListener("click", clickDelegate.bind(this, char), false);

      function clickDelegate(char) {
        char.info();
      }
    }
  },
  translatePattern: function() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        switch(this.pattern[i][j]) {
          case 'w':
            this.pattern[i][j] = new Tile({identifier: 'w', description: 'Water Tile', color: '#4286f4', walkingModifier: -2})
            break;
          case 'r':
            this.pattern[i][j] = new Tile({identifier: 'r', description: 'Road Tile', color: '#f4cc8b', walkingModifier: 0})
            break;
          case 'f':
            this.pattern[i][j] = new Tile({identifier: 'f', description: 'Forest Tile', color: '#3d7a45', walkingModifier: 0})
            break;
          case 'm':
            this.pattern[i][j] = new Tile({identifier: 'm', description: 'Mountain Tile', color: '#594331', walkingModifier: -1})
            break;
          default:
            this.pattern[i][j] = new Tile({})
            break;
        }
      }
    }
  },
  plotHtml: function(heroes, enemies) {
    var mapDiv = document.getElementById(this.defaultEl);
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");        
    for (var i = 0; i < this.width; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < this.height; j++) {
        var cell = document.createElement("td");
        for (var k = 0; k < heroes.length; k++) {
          if (heroes[k].currentPosition[1] === i && heroes[k].currentPosition[0] == j) {
            var cellText = document.createTextNode(heroes[k].nickname); 
            var spanText = document.createElement("span");
            spanText.setAttribute("id", heroes[k].nickname);
            spanText.appendChild(cellText);
            cell.appendChild(spanText);
          }
        }
        for (var k = 0; k < enemies.length; k++) {
          if (enemies[k].currentPosition[1] === i && enemies[k].currentPosition[0] == j) {
            var cellText = document.createTextNode(enemies[k].nickname); 
            cell.appendChild(cellText);
          }
        }
        cell.setAttribute("height", "40px");
        cell.setAttribute("width", "40px");
        cell.setAttribute("style", "background-color: " + this.pattern[i][j].color);
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    mapDiv.appendChild(table);
    table.setAttribute("border", "2");
    this.bindEvents(heroes);
  }  
}

Stage.prototype = {
  moveChar: function(char, xPos, yPos) {
    char.walk(xPos, yPos)
    var mapDiv = document.getElementById(this.map.defaultEl);
    while (mapDiv.firstChild) {
      mapDiv.removeChild(mapDiv.firstChild);
    }
    this.map.plotHtml(this.heroes, this.enemies);
  }
}