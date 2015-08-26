function Map(options) {
  var defaultOptions = {
    width: 10,
    height: 10
  },
  options = $.extend(defaultOptions, options);
  this.width = options.width;
  this.height = options.height;
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
    magic: 1
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
  this.equippedWeapon = this.weapons[0];
}

Hero.prototype = {
  walk: function() {
    console.log('Hero walked');
  },
  attack: function(target) {
    var hitChance = this.calculateHitChance(this, target);
    var chance = Math.floor(Math.random() * 100 + 1);
    if (chance > hitChance) {
      console.log('Ops, the attack has missed!');
    } else {
      var damage = this.calculateDamage(this, target);
      target.hp -= damage;
      console.log(this.nickname + ' has attacked ' + target.nickname + ' for ' + damage + ' damage!');
      if (target.hp <= 0) {
        console.log(target.nickname + ' has died!');
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
    console.log('Hero: ' + this.nickname + ' | HP: ' + this.hp + ' | Weapon: ' + this.equippedWeapon.weaponName);
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
      console.log('You only have one weapon!');
    } else {
      this.equippedWeapon = this.weapons[weapon];
      console.log(this.nickname + ' is now using a ' + this.equippedWeapon.weaponName);
    }    
  }
}

function Stage(options) {
  var defaultOptions = {
    map: new Map(),
    heroes: [new Hero()]
    enemies: [new Hero()]
  },
  options = $.extend(defaultOptions, options);
  this.map = options.map;
  this.heroes = options.heroes;
  this.enemies = options.enemies;
}