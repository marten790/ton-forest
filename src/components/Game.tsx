// 'use client';

// import { useState, useEffect } from 'react';
// import { useTelegram } from '@/lib/useTelegram';
// import EnemyArea from './EnemyArea';
// import PlayerStats from './PlayerStats';
// import Store from './Store';
// import TonWallet from './TonWallet';
// import { Enemy, Player, Item } from '@/lib/types';

// const Game = () => {
//   const { user } = useTelegram();
  
//   // Player state
//   const [player, setPlayer] = useState<Player>({
//     coins: 100,
//     damage: 1,
//     armor: 0,
//     health: 100,
//     maxHealth: 100,
//     level: 1,
//     experience: 0,
//     experienceToNextLevel: 100,
//   });
  
//   // Wallet state
//   // const [walletConnected, setWalletConnected] = useState(false);
//   // const [walletAddress, setWalletAddress] = useState('');

//   // Current enemy state
//   const [currentEnemy, setCurrentEnemy] = useState<Enemy>({
//     id: 1,
//     name: 'Common Mushroom',
//     health: 10,
//     maxHealth: 10,
//     damage: 1,
//     coins: 5,
//     experience: 10,
//   });

//   // Game state
//   const [enemiesDefeated, setEnemiesDefeated] = useState(0);
//   const [gameMessage, setGameMessage] = useState('');
//   const [showStore, setShowStore] = useState(false);

//   // Store items
//   // const [storeItems, setStoreItems] = useState<Item[]>([
//     const [storeItems] = useState<Item[]>([
//     { id: 1, name: 'Wooden Shield', type: 'armor', value: 5, cost: 50, description: 'A basic wooden shield' },
//     { id: 2, name: 'Iron Chainmail', type: 'armor', value: 15, cost: 150, description: 'Standard iron protection' },
//     { id: 3, name: 'Enchanted Fungi Armor', type: 'armor', value: 30, cost: 300, description: 'Armor with magical mushroom properties' },
//     { id: 4, name: 'Stone Dagger', type: 'damage', value: 2, cost: 100, description: 'A simple stone dagger' },
//     { id: 5, name: 'Iron Sword', type: 'damage', value: 5, cost: 250, description: 'A reliable iron sword' },
//     { id: 6, name: 'Mushroom Bane', type: 'damage', value: 10, cost: 500, description: 'A magical sword effective against fungi enemies' },
//   ]);
  
//   // Enemy types for progression
//   const enemyTypes = [
//     { id: 1, name: 'Common Mushroom', health: 10, damage: 1, coins: 5, experience: 10 },
//     { id: 2, name: 'Poison Mushroom', health: 20, damage: 2, coins: 10, experience: 20 },
//     { id: 3, name: 'Giant Puffball', health: 35, damage: 3, coins: 15, experience: 30 },
//     { id: 4, name: 'Mushroom Guardian', health: 50, damage: 5, coins: 25, experience: 50 },
//     { id: 5, name: 'Ancient Mycelium', health: 100, damage: 8, coins: 50, experience: 100 },
//   ];

  

//   // Save game to localStorage
//   useEffect(() => {
//     if (typeof window !== 'undefined' && user) {
//       const savedData = localStorage.getItem(`tonClicker_${user.id}`);
//       if (savedData) {
//         try {
//           const parsedData = JSON.parse(savedData);
//           setPlayer(parsedData.player);
//           setEnemiesDefeated(parsedData.enemiesDefeated);
//           // Generate a new enemy based on progress
//           generateEnemy(parsedData.enemiesDefeated);
//         } catch (e) {
//           console.error('Error loading saved game:', e);
//         }
//       }
//     }
//   }, [user]);

//   // Save data when player state changes
//   useEffect(() => {
//     if (typeof window !== 'undefined' && user) {
//       localStorage.setItem(
//         `tonClicker_${user.id}`,
//         JSON.stringify({
//           player,
//           enemiesDefeated,
//         })
//       );
//     }
//   }, [player, enemiesDefeated, user]);

//   const generateEnemy = (defeatedCount: number) => {
//     // Select an enemy type based on player progress
//     const enemyLevel = Math.min(
//       Math.floor(defeatedCount / 5),
//       enemyTypes.length - 1
//     );
    
//     // Add some randomness to the enemy stats
//     const baseEnemy = enemyTypes[enemyLevel];
//     const healthVariation = Math.floor(baseEnemy.health * 0.2);
//     const health = baseEnemy.health + Math.floor(Math.random() * healthVariation);
    
//     setCurrentEnemy({
//       ...baseEnemy,
//       health,
//       maxHealth: health,
//     });
//   };

//   const attackEnemy = () => {
//     if (currentEnemy.health <= 0) return;
    
//     // Apply damage to enemy
//     const newHealth = Math.max(0, currentEnemy.health - player.damage);
//     setCurrentEnemy({
//       ...currentEnemy,
//       health: newHealth,
//     });

//     // Check if enemy is defeated
//     if (newHealth <= 0) {
//       handleEnemyDefeated();
//     } else {
//       // Enemy attacks back
//       const damageTaken = Math.max(0, currentEnemy.damage - player.armor / 10);
//       const newPlayerHealth = Math.max(0, player.health - damageTaken);
      
//       setPlayer(prev => ({
//         ...prev,
//         health: newPlayerHealth,
//       }));

//       if (newPlayerHealth <= 0) {
//         handlePlayerDefeated();
//       }
//     }
//   };

//   const handleEnemyDefeated = () => {
//     // Update player stats
//     const newCoins = player.coins + currentEnemy.coins;
//     const newExperience = player.experience + currentEnemy.experience;
//     let newLevel = player.level;
//     let newExperienceToNextLevel = player.experienceToNextLevel;
    
//     // Check for level up
//     if (newExperience >= player.experienceToNextLevel) {
//       newLevel += 1;
//       newExperienceToNextLevel = Math.floor(player.experienceToNextLevel * 1.5);
      
//       // Heal player on level up
//       setGameMessage(`Level up! You are now level ${newLevel}!`);
      
//       setTimeout(() => {
//         setGameMessage('');
//       }, 3000);
//     }
    
//     setPlayer(prev => ({
//       ...prev,
//       coins: newCoins,
//       experience: newExperience,
//       level: newLevel,
//       experienceToNextLevel: newExperienceToNextLevel,
//       health: Math.min(prev.maxHealth, prev.health + Math.floor(prev.maxHealth * 0.2)), // Heal 20% on enemy defeat
//     }));
    
//     // Track defeated enemies and generate a new one
//     const newEnemiesDefeated = enemiesDefeated + 1;
//     setEnemiesDefeated(newEnemiesDefeated);
//     generateEnemy(newEnemiesDefeated);
    
//     setGameMessage(`You defeated the ${currentEnemy.name} and earned ${currentEnemy.coins} coins!`);
    
//     setTimeout(() => {
//       setGameMessage('');
//     }, 3000);
//   };

//   const handlePlayerDefeated = () => {
//     // Player is defeated, lose some coins
//     const coinsLost = Math.floor(player.coins * 0.2); // Lose 20% of coins
    
//     setPlayer(prev => ({
//       ...prev,
//       coins: Math.max(0, prev.coins - coinsLost),
//       health: prev.maxHealth * 0.5, // Restore 50% health
//     }));
    
//     setGameMessage(`You were defeated! Lost ${coinsLost} coins.`);
    
//     setTimeout(() => {
//       setGameMessage('');
//     }, 3000);
//   };

//   const buyItem = (item: Item) => {
//     // Check if player has enough coins
//     if (player.coins < item.cost) {
//       setGameMessage('Not enough coins!');
//       setTimeout(() => setGameMessage(''), 3000);
//       return;
//     }

//     // Apply item effects based on type
//     setPlayer(prev => {
//       const newPlayer = { ...prev, coins: prev.coins - item.cost };
      
//       if (item.type === 'armor') {
//         newPlayer.armor = prev.armor + item.value;
//       } else if (item.type === 'damage') {
//         newPlayer.damage = prev.damage + item.value;
//       }
      
//       return newPlayer;
//     });
    
//     setGameMessage(`Purchased ${item.name}!`);
//     setTimeout(() => setGameMessage(''), 3000);
//   };

//   const toggleStore = () => {
//     setShowStore(!showStore);
//   };
  
//   const handleWalletConnected = (address: string) => {
//     // setWalletConnected(true);
//     // setWalletAddress(address);
//     setGameMessage('Wallet connected successfully!');
//     setTimeout(() => setGameMessage(''), 3000);
//   };
  
//   const handleWalletDisconnected = () => {
//     // setWalletConnected(false);
//     // setWalletAddress('');
//     setGameMessage('Wallet disconnected');
//     setTimeout(() => setGameMessage(''), 3000);
//   };

//   return (
//     <div className="flex flex-col w-full max-w-md mx-auto bg-gray-900 text-gray-100 min-h-screen p-4 rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold text-center mb-4 text-emerald-400">Mystical Mushroom Forest</h1>
      
//       {gameMessage && (
//         <div className="bg-emerald-800 text-white p-2 rounded-md mb-4 text-center">
//           {gameMessage}
//         </div>
//       )}
      
//       <PlayerStats player={player} />
      
//       <TonWallet 
//         onConnected={handleWalletConnected} 
//         onDisconnected={handleWalletDisconnected} 
//       />
      
//       {showStore ? (
//         <Store 
//           items={storeItems} 
//           playerCoins={player.coins} 
//           onPurchase={buyItem} 
//           onClose={toggleStore} 
//         />
//       ) : (
//         <>
//           <EnemyArea 
//             enemy={currentEnemy} 
//             onAttack={attackEnemy} 
//           />
          
//           <div className="mt-4 flex justify-center">
//             <button 
//               onClick={toggleStore}
//               className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
//             >
//               Visit Store
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Game;
'use client';

import { useState, useEffect } from 'react';
import { useTelegram } from '@/lib/useTelegram';
import EnemyArea from './EnemyArea';
import PlayerStats from './PlayerStats';
import Store from './Store';
import TonWallet from './TonWallet';
import { Enemy, Player, Item } from '@/lib/types';

const enemyTypes = [
  { id: 1, name: 'Common Mushroom', health: 10, damage: 1, coins: 5, experience: 10 },
  { id: 2, name: 'Poison Mushroom', health: 20, damage: 2, coins: 10, experience: 20 },
  { id: 3, name: 'Giant Puffball', health: 35, damage: 3, coins: 15, experience: 30 },
  { id: 4, name: 'Mushroom Guardian', health: 50, damage: 5, coins: 25, experience: 50 },
  { id: 5, name: 'Ancient Mycelium', health: 100, damage: 8, coins: 50, experience: 100 },
];

const generateEnemy = (defeatedCount: number): Enemy => {
  const enemyLevel = Math.min(Math.floor(defeatedCount / 5), enemyTypes.length - 1);
  const baseEnemy = enemyTypes[enemyLevel];
  const healthVariation = Math.floor(baseEnemy.health * 0.2);
  const health = baseEnemy.health + Math.floor(Math.random() * healthVariation);

  return {
    ...baseEnemy,
    health,
    maxHealth: health,
  };
};

const Game = () => {
  const { user } = useTelegram();

  const [player, setPlayer] = useState<Player>({
    coins: 100,
    damage: 1,
    armor: 0,
    health: 100,
    maxHealth: 100,
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
  });

  const [currentEnemy, setCurrentEnemy] = useState<Enemy>(generateEnemy(0));
  const [enemiesDefeated, setEnemiesDefeated] = useState(0);
  const [gameMessage, setGameMessage] = useState('');
  const [showStore, setShowStore] = useState(false);

  const [storeItems] = useState<Item[]>([
    { id: 1, name: 'Wooden Shield', type: 'armor', value: 5, cost: 50, description: 'A basic wooden shield' },
    { id: 2, name: 'Iron Chainmail', type: 'armor', value: 15, cost: 150, description: 'Standard iron protection' },
    { id: 3, name: 'Enchanted Fungi Armor', type: 'armor', value: 30, cost: 300, description: 'Armor with magical mushroom properties' },
    { id: 4, name: 'Stone Dagger', type: 'damage', value: 2, cost: 100, description: 'A simple stone dagger' },
    { id: 5, name: 'Iron Sword', type: 'damage', value: 5, cost: 250, description: 'A reliable iron sword' },
    { id: 6, name: 'Mushroom Bane', type: 'damage', value: 10, cost: 500, description: 'A magical sword effective against fungi enemies' },
  ]);

  // Load game from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      const savedData = localStorage.getItem(`tonClicker_${user.id}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setPlayer(parsedData.player);
          setEnemiesDefeated(parsedData.enemiesDefeated);
          setCurrentEnemy(generateEnemy(parsedData.enemiesDefeated));
        } catch (e) {
          console.error('Error loading saved game:', e);
        }
      }
    }
  }, [user]);

  // Save game when state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem(
        `tonClicker_${user.id}`,
        JSON.stringify({ player, enemiesDefeated })
      );
    }
  }, [player, enemiesDefeated, user]);

  const attackEnemy = () => {
    if (currentEnemy.health <= 0) return;

    const newHealth = Math.max(0, currentEnemy.health - player.damage);
    setCurrentEnemy({ ...currentEnemy, health: newHealth });

    if (newHealth <= 0) {
      handleEnemyDefeated();
    } else {
      const damageTaken = Math.max(0, currentEnemy.damage - player.armor / 10);
      const newPlayerHealth = Math.max(0, player.health - damageTaken);
      setPlayer(prev => ({ ...prev, health: newPlayerHealth }));

      if (newPlayerHealth <= 0) handlePlayerDefeated();
    }
  };

  const handleEnemyDefeated = () => {
    const newCoins = player.coins + currentEnemy.coins;
    const newExperience = player.experience + currentEnemy.experience;
    let newLevel = player.level;
    let newExpToNext = player.experienceToNextLevel;

    if (newExperience >= player.experienceToNextLevel) {
      newLevel += 1;
      newExpToNext = Math.floor(player.experienceToNextLevel * 1.5);
      setGameMessage(`Level up! You are now level ${newLevel}!`);
      setTimeout(() => setGameMessage(''), 3000);
    }

    setPlayer(prev => ({
      ...prev,
      coins: newCoins,
      experience: newExperience,
      level: newLevel,
      experienceToNextLevel: newExpToNext,
      health: Math.min(prev.maxHealth, prev.health + Math.floor(prev.maxHealth * 0.2)),
    }));

    const newEnemiesDefeated = enemiesDefeated + 1;
    setEnemiesDefeated(newEnemiesDefeated);
    setCurrentEnemy(generateEnemy(newEnemiesDefeated));

    setGameMessage(`You defeated the ${currentEnemy.name} and earned ${currentEnemy.coins} coins!`);
    setTimeout(() => setGameMessage(''), 3000);
  };

  const handlePlayerDefeated = () => {
    const coinsLost = Math.floor(player.coins * 0.2);
    setPlayer(prev => ({
      ...prev,
      coins: Math.max(0, prev.coins - coinsLost),
      health: prev.maxHealth * 0.5,
    }));

    setGameMessage(`You were defeated! Lost ${coinsLost} coins.`);
    setTimeout(() => setGameMessage(''), 3000);
  };

  const buyItem = (item: Item) => {
    if (player.coins < item.cost) {
      setGameMessage('Not enough coins!');
      setTimeout(() => setGameMessage(''), 3000);
      return;
    }

    setPlayer(prev => {
      const newPlayer = { ...prev, coins: prev.coins - item.cost };
      if (item.type === 'armor') newPlayer.armor += item.value;
      if (item.type === 'damage') newPlayer.damage += item.value;
      return newPlayer;
    });

    setGameMessage(`Purchased ${item.name}!`);
    setTimeout(() => setGameMessage(''), 3000);
  };

  const toggleStore = () => setShowStore(!showStore);

  const handleWalletConnected = () => {
    setGameMessage('Wallet connected successfully!');
    setTimeout(() => setGameMessage(''), 3000);
  };

  const handleWalletDisconnected = () => {
    setGameMessage('Wallet disconnected');
    setTimeout(() => setGameMessage(''), 3000);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-gray-900 text-gray-100 min-h-screen p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4 text-emerald-400">Mystical Mushroom Forest</h1>

      {gameMessage && (
        <div className="bg-emerald-800 text-white p-2 rounded-md mb-4 text-center">
          {gameMessage}
        </div>
      )}

      <PlayerStats player={player} />

      <TonWallet onConnected={handleWalletConnected} onDisconnected={handleWalletDisconnected} />

      {showStore ? (
        <Store items={storeItems} playerCoins={player.coins} onPurchase={buyItem} onClose={toggleStore} />
      ) : (
        <>
          <EnemyArea enemy={currentEnemy} onAttack={attackEnemy} />
          <div className="mt-4 flex justify-center">
            <button
              onClick={toggleStore}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Visit Store
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
