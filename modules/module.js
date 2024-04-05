import { Weapon } from './weapon.js';

class Module extends Weapon {
    constructor(name, type, value) {
        super(name);
        this.type = type;
        this.value = value;
    }

    display() {
        return `${this.name} - ${this.type}: ${this.value}`;
    }
}

export function initModules(option) {
    switch (option) {
        case 'ModuleA':
            return new Module('ModuleA', 'shield', 50);
        case 'ModuleB':
            return new Module('ModuleB', 'life', 50);
        case 'ModuleC':
            return new Module('ModuleC', 'speed', -0.2);
        case 'ModuleD':
            return new Module('ModuleD', 'shieldRecovery', 0.2);
        default:
            return null;
    }
}