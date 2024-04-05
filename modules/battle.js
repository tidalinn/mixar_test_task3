export class Battle {
    constructor() {
        this.winner = '';
        this.attackInterval = null;
    }

    displayWinner() {
        document.querySelector('#battleOutcome').textContent = `Game over. ${this.winner} won`;
    }

    attack(attacker, defender) {
        if (defender.shield <= 0) {
            defender.life -= attacker.damage;
        } else {
            defender.shield -= attacker.damage;
        }

        if (defender.life <= 0) {
            clearInterval(this.attackInterval);
            this.winner = attacker.id;
            this.displayWinner();

            setTimeout(() => {
                this.battle(attacker, defender);
            }, 5 * 1000);
        }

        attacker.recoverShield();
        defender.recoverShield();

        attacker.updateStats();
        defender.updateStats();
    }

    battle(opponentA, opponentB) {
        opponentA.init();
        opponentB.init();

        this.winner = '';

        this.attackInterval = setInterval(() => {
            this.attack(opponentA, opponentB);
            this.attack(opponentB, opponentA);
        }, 1000);

        document.querySelector('#battleOutcome').textContent = '';
    }
}