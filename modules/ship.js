import { initGuns } from './gun.js';
import { initModules } from './module.js';

export class Ship {
    constructor(id, life, lifeMax, shield, shieldRecovery, gunsMax, modulesMax) {
        this.id = id
        this.life = life;
        this.lifeMax = lifeMax;
        this.shield = shield;
        this.shieldMax = shield;
        this.shieldRecovery = shieldRecovery;
        this.shieldRecoveryNormal = this.shieldRecovery;
        this.gunsMax = gunsMax;
        this.modulesMax = modulesMax;
    }

    updateStats() {
        document.querySelector(`#${this.id} .stats .health span`).textContent = this.life;
        document.querySelector(`#${this.id} .stats .shield span`).textContent = this.shield;
        document.querySelector(`#${this.id} .stats .speed span`).textContent = this.speed;
        document.querySelector(`#${this.id} .stats .damage span`).textContent = this.damage;
        document.querySelector(`#${this.id} .stats .shieldRecovery span`).textContent = this.shieldRecovery;
    }

    updateUpgrade(bag, module) {
        let equipment = '';

        bag.forEach(equip => {
            equipment += equip.display() + "<br>";
        })
        document.querySelector(`#${this.id} .upgrade ${module}`).innerHTML = equipment;
    }

    recoverShield() {
        if (this.shield < this.shieldMax) {
            this.shield += 1;
        }
    }

    checkGunStats = (equipment, drop) => {
        if (drop) {
            this.speed -= equipment.speed;
            this.damage -= equipment.damage;
        } else {
            this.speed += equipment.speed;
            this.damage += equipment.damage;
        }
    }

    checkModuleStats = (equipment, drop) => {
        switch(equipment.type) {
            case 'shield':
                if (drop) {
                    this.shield -= equipment.value;
                } else {
                    if (this.shield + equipment.value >= this.shieldMax) {
                        this.shield = this.shieldMax;
                    } else {
                        this.shield += equipment.value;
                    }
                }
                break;

            case 'life':
                if (drop) {
                    this.life -= equipment.value;
                } else {
                    if (this.life += equipment.value >= this.lifeMax) {
                        this.life = this.lifeMax;
                    } else {
                        this.life += equipment.value;
                    }
                }
                break;

            case 'speed':
                if (drop) {
                    this.speed += this.speed * equipment.value;
                } else {
                    this.speed -= this.speed * equipment.value;
                }
                break;

            case 'shieldRecovery':
                if (drop) {
                    this.shieldRecovery -= this.shieldRecoveryNormal * equipment.value;
                } else {
                    this.shieldRecovery += this.shieldRecoveryNormal * equipment.value;
                }
                break;
        }
    }

    checkBag(module, bag, max, names, checker, equipment) {
        if (names.includes(equipment.name) == false) {
            if (bag.length == max) {
                checker(bag[0], true);
                bag.shift();
                names.shift();
            }

            checker(equipment, false);
            bag.push(equipment);
            names.push(equipment.name);
            this.updateUpgrade(bag, module);
        }
    }

    upgrade(module, equipment) {
        switch (module) {
            case '.shipGuns':
                this.checkBag(
                    module, 
                    this.guns, 
                    this.gunsMax, 
                    this.gunsNames, 
                    this.checkGunStats, 
                    equipment
                );
                break;
            case '.shipModules':
                this.checkBag(
                    module, 
                    this.modules, 
                    this.modulesMax, 
                    this.modulesNames, 
                    this.checkModuleStats, 
                    equipment
                );
                break;
        }

        this.updateStats();
    }

    selectOption(module, initOptionSelector) {
        const element = document.querySelector(`#${this.id} .weapon ${module}`);

        element.addEventListener('change', () => {
            const option = element.value;
            const equipment = initOptionSelector(option);
            this.upgrade(module, equipment);    
        });
    }

    reload() {
        this.life = this.lifeMax;
        this.shield = this.shieldMax;
        this.guns = [];
        this.modules = [];
        this.gunsNames = [];
        this.modulesNames = [];
        this.damage = 0;
        this.speed = 0;
        this.shieldRecovery = this.shieldRecoveryNormal;
        
        document.querySelector(`#${this.id} .upgrade .shipGuns`).innerHTML = '';
        document.querySelector(`#${this.id} .upgrade .shipModules`).innerHTML = '';
    }

    init() {
        this.reload();
        this.updateStats();
        this.selectOption('.shipGuns', initGuns);
        this.selectOption('.shipModules', initModules);
    }
}