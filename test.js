var map = new Map({
  width: 20,
  height: 20
});

var chrom = new Hero({
  nickname: 'Chrom',
  weapons: [
    new Weapon({weaponName: 'Falchion', weaponType: 'physical', weaponBaseDamage: 4, weaponBaseAccuracy: 100}),
    new Weapon({weaponName: 'Steel Sword', weaponType: 'physical', weaponBaseDamage: 5, weaponBaseAccuracy: 90})
  ],
  hp: 80,
  strength: 2,
  agility: 4,
  magic: 1,
  defense: 5,
  resistance: 2
});

var sumia = new Hero({
  nickname: 'Sumia',
  weapons: [
    new Weapon({weaponName: 'Lance of Destiny', weaponType: 'magical', weaponBaseDamage: 7, weaponBaseAccuracy: 85}),
    new Weapon({weaponName: 'Blood Lance', weaponType: 'physical', weaponBaseDamage: 5, weaponBaseAccuracy: 80})
  ],
  hp: 90,
  strength: 1,
  agility: 3,
  magic: 5,
  defense: 1,
  resistance: 4
});

var tactician = new Hero({
  nickname: 'Tactician',
  weapons: [
    new Weapon({weaponName: 'Tome of Destruction', weaponType: 'magical', weaponBaseDamage: 10, weaponBaseAccuracy: 75})
  ],
  hp: 85,
  strength: 1,
  agility: 2,
  magic: 7,
  defense: 3,
  resistance: 3
});

var stage = new Stage({
  map: map,
  heroes: [chrom, sumia],
  enemies: [tactician]
});