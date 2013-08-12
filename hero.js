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
      var damage = 0;
      if (this.equippedWeapon.weaponType == 'physical') {
        damage = this.strength * this.equippedWeapon.weaponBaseDamage;      
      }
      if (this.equippedWeapon.weaponType == 'magical') {
        damage = this.magic * this.equippedWeapon.weaponBaseDamage;
      }
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

var chrom = new Hero({
  nickname: 'Chrom',
  weapons: [
    new Weapon({weaponName: 'Falchion', weaponType: 'physical', weaponBaseDamage: 4, weaponBaseAccuracy: 100}),
    new Weapon({weaponName: 'Steel Sword', weaponType: 'physical', weaponBaseDamage: 5, weaponBaseAccuracy: 90})
  ],
  hp: 80,
  strength: 2,
  agility: 4,
  magic: 1
})

var sumia = new Hero({
  nickname: 'Sumia',
  weapons: [
    new Weapon({weaponName: 'Lance of Destiny', weaponType: 'magical', weaponBaseDamage: 7, weaponBaseAccuracy: 85}),
    new Weapon({weaponName: 'Blood Lance', weaponType: 'physical', weaponBaseDamage: 5, weaponBaseAccuracy: 80})
  ],
  hp: 90,
  strength: 1,
  agility: 3,
  magic: 5
})

var tactician = new Hero({
  nickname: 'Tactician',
  weapons: [
    new Weapon({weaponName: 'Tome of Destruction', weaponType: 'magical', weaponBaseDamage: 10, weaponBaseAccuracy: 75})
  ],
  hp: 85,
  strength: 1,
  agility: 2,
  magic: 7
})