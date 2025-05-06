export interface Player {
  coins: number;
  damage: number;
  armor: number;
  health: number;
  maxHealth: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
}

export interface Enemy {
  id: number;
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  coins: number;
  experience: number;
}

export interface Item {
  id: number;
  name: string;
  type: 'armor' | 'damage';
  value: number;
  cost: number;
  description: string;
}