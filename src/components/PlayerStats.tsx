'use client';

import { Player } from '@/lib/types';

interface PlayerStatsProps {
  player: Player;
}

const PlayerStats = ({ player }: PlayerStatsProps) => {
  // Calculate health percentage for progress bar
  const healthPercentage = (player.health / player.maxHealth) * 100;
  
  // Calculate experience percentage for progress bar
  const experiencePercentage = (player.experience / player.experienceToNextLevel) * 100;
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-emerald-400">Adventurer</h2>
        <div className="text-amber-300 font-bold">
          <span className="mr-1">🪙</span> {player.coins}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-300">Health</span>
          <span className="text-sm text-gray-300">{player.health}/{player.maxHealth}</span>
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400" 
            style={{ width: `${healthPercentage}%` }} 
          />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-300">Level {player.level}</span>
          <span className="text-sm text-gray-300">{player.experience}/{player.experienceToNextLevel} XP</span>
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400" 
            style={{ width: `${experiencePercentage}%` }} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-2 rounded">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-white">⚔️</span>
            </div>
            <div>
              <div className="text-xs text-gray-400">Attack</div>
              <div className="font-bold text-white">{player.damage}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700 p-2 rounded">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-white">🛡️</span>
            </div>
            <div>
              <div className="text-xs text-gray-400">Armor</div>
              <div className="font-bold text-white">{player.armor}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;