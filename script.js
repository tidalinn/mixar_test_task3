import { Ship } from './modules/ship.js';
import { Battle } from './modules/battle.js';

const shipA = new Ship('shipA', 100, 100, 80, 1, 2, 2);
const shipB = new Ship('shipB', 60, 60, 120, 1, 2, 3);

const battle = new Battle();

battle.battle(shipA, shipB);