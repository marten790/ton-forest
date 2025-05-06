'use client';

import { Item } from '@/lib/types';

interface StoreProps {
  items: Item[];
  playerCoins: number;
  onPurchase: (item: Item) => void;
  onClose: () => void;
}

const Store = ({ items, playerCoins, onPurchase, onClose }: StoreProps) => {
  // Group items by type
  const armorItems = items.filter(item => item.type === 'armor');
  const weaponItems = items.filter(item => item.type === 'damage');

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-amber-400">Mushroom Forest Shop</h2>
        <div className="text-amber-300 font-bold">
          <span className="mr-1">🪙</span> {playerCoins}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-emerald-400 font-bold mb-2">Weapons</h3>
        <div className="space-y-3">
          {weaponItems.map(item => (
            <div key={item.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white">⚔️</span>
                  </div>
                  <div className="font-medium text-white">{item.name}</div>
                </div>
                <div className="text-sm text-gray-300 mt-1">+{item.value} Damage</div>
                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
              </div>
              <button
                onClick={() => onPurchase(item)}
                disabled={playerCoins < item.cost}
                className={`bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-colors ${
                  playerCoins < item.cost ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="mr-1">🪙</span> {item.cost}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-emerald-400 font-bold mb-2">Armor</h3>
        <div className="space-y-3">
          {armorItems.map(item => (
            <div key={item.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white">🛡️</span>
                  </div>
                  <div className="font-medium text-white">{item.name}</div>
                </div>
                <div className="text-sm text-gray-300 mt-1">+{item.value} Armor</div>
                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
              </div>
              <button
                onClick={() => onPurchase(item)}
                disabled={playerCoins < item.cost}
                className={`bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-colors ${
                  playerCoins < item.cost ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="mr-1">🪙</span> {item.cost}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={onClose}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Return to Forest
        </button>
      </div>
    </div>
  );
};

export default Store;