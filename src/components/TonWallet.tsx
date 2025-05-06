'use client';

import { useState, useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

interface TonWalletProps {
  onConnected: (address: string) => void;
  onDisconnected: () => void;
}

const TonWallet = ({ onConnected, onDisconnected }: TonWalletProps) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Check wallet connection status
  useEffect(() => {
    // This is a placeholder for the actual wallet connection check
    // You would use TonConnect SDK functions here
    const checkConnection = async () => {
      try {
        // In a real implementation, you would use the TonConnect SDK here
        // to check if the wallet is connected
        // const wallet = await tonConnectUI.getWallets();
        // if (wallet?.length > 0) {
        //   setConnected(true);
        //   setWalletAddress(wallet[0].address);
        //   onConnected(wallet[0].address);
        // }
      } catch (e) {
        console.error('Error checking wallet connection:', e);
      }
    };

    checkConnection();
  }, [onConnected]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-lg font-bold text-emerald-400 mb-3">TON Wallet</h2>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm mb-1">
            {connected ? 'Wallet Connected' : 'Connect your TON wallet to purchase premium items'}
          </p>
          {connected && walletAddress && (
            <p className="text-xs text-gray-400">
              Address: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
            </p>
          )}
        </div>
        
        <div>
          <TonConnectButton />
        </div>
      </div>
      
      {connected && (
        <div className="mt-3 p-2 bg-gray-700 rounded">
          <p className="text-xs text-gray-300 mb-2">
            You can use your TON coins to purchase premium items in the store
          </p>
          <div className="flex justify-between">
            <button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm py-1 px-3 rounded transition-colors"
              onClick={() => {
                // Implement TON transaction logic here
                alert('TON transaction feature coming soon!');
              }}
            >
              Buy Mushroom Coins
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white text-sm py-1 px-3 rounded transition-colors"
              onClick={() => {
                setConnected(false);
                setWalletAddress('');
                onDisconnected();
                // In a real implementation, you would disconnect the wallet here
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TonWallet;