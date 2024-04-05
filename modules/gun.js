import { Weapon } from './weapon.js';

class Gun extends Weapon {
    constructor(name, speed, damage) {
        super(name);
        this.speed = speed;
        this.damage = damage;
    }

    display() {
        return `${this.name} - speed: ${this.speed}, damage: ${this.damage}`;
    }
}

export function initGuns(option) {
    switch (option) {
        case 'GunA':
            return new Gun('GunA', 3, 5);
        case 'GunB':
            return new Gun('GunB', 2, 4);
        case 'GunC':
            return new Gun('GunC', 5, 20);
        default:
            return null;
    }
}