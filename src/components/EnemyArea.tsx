'use client';

import { useState, useEffect } from 'react';
import { Enemy } from '@/lib/types';

interface EnemyAreaProps {
  enemy: Enemy;
  onAttack: () => void;
}

const EnemyArea = ({ enemy, onAttack }: EnemyAreaProps) => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [enemyImage, setEnemyImage] = useState('');
  
  // Set enemy image based on enemy type
  useEffect(() => {
    // Placeholder images based on enemy type
    // const placeholderSize = 400;
    
    // Use different placeholder images based on enemy id
    // const imageIndex = (enemy.id % 5) + 1;
    setEnemyImage(`/${enemy.id}.png`);
  }, [enemy.id]);
  
  // Calculate health percentage for progress bar
  const healthPercentage = (enemy.health / enemy.maxHealth) * 100;
  
  const handleAttack = () => {
    setIsAttacking(true);
    onAttack();
    
    setTimeout(() => {
      setIsAttacking(false);
    }, 200);
  };
  
  return (
    <div className="relative bg-gray-800 p-4 rounded-lg shadow-inner mb-4">
      <div className="absolute top-0 left-0 w-full h-full opacity-40 bg-cover bg-center rounded-lg" 
           style={{ backgroundImage: 'url(/background.jpg' }} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-amber-400">{enemy.name}</h2>
          <div className="text-gray-300 text-sm">
            {enemy.health}/{enemy.maxHealth} HP
          </div>
        </div>
        
        <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400" 
            style={{ width: `${healthPercentage}%` }} 
          />
        </div>
        
        <div className="flex justify-center mb-4">
          <div 
            className={`relative cursor-pointer transform transition-transform ${isAttacking ? 'scale-95' : 'hover:scale-105'}`}
            onClick={handleAttack}
          >
            <img 
              src={enemyImage} 
              alt={enemy.name} 
              className="w-48 h-48 object-contain rounded-lg"
            />
            {enemy.health <= 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <span className="text-white text-2xl font-bold">Defeated!</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={handleAttack}
            disabled={enemy.health <= 0}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors ${
              enemy.health <= 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {enemy.health > 0 ? 'Attack!' : 'Enemy Defeated'}
          </button>
        </div>
        
        <div className="mt-4 text-center text-gray-400 text-sm">
          <p>Damage: {enemy.damage} | Rewards: {enemy.coins} coins, {enemy.experience} XP</p>
        </div>
      </div>
    </div>
  );
};

export default EnemyArea;