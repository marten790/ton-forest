// import { TonConnectUI } from '@tonconnect/ui';

// // Initialize TonConnect
// export const tonConnectUI = new TonConnectUI({
//   manifestUrl: 'https://your-app-url.com/tonconnect-manifest.json',
//   buttonRootId: 'ton-connect-button',
// });

// // Function to check if wallet is connected
// export const isWalletConnected = async (): Promise<boolean> => {
//   const wallets = await tonConnectUI.getWallets();
//   return wallets.length > 0;
// };

// // Function to get connected wallet address
// export const getWalletAddress = async (): Promise<string | null> => {
//   const wallets = await tonConnectUI.getWallets();
//   if (wallets.length > 0 && wallets[0].account) {
//     return wallets[0].account.address;
//   }
//   return null;
// };

// // Function to disconnect wallet
// export const disconnectWallet = async (): Promise<void> => {
//   await tonConnectUI.disconnect();
// };

// // Function to send TON transaction
// export const sendTonTransaction = async (
//   toAddress: string,
//   amount: number,
//   comment?: string
// ): Promise<boolean> => {
//   try {
//     // This is a simplified implementation
//     // In a real implementation, you would need to use the TonConnect SDK
//     // to send a transaction to the TON blockchain
    
//     // Example transaction
//     await tonConnectUI.sendTransaction({
//       validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
//       messages: [
//         {
//           address: toAddress,
//           amount: BigInt(amount * 1000000000), // Convert TON to nanoTON
//           payload: comment ? btoa(comment) : '',
//         },
//       ],
//     });
    
//     return true;
//   } catch (e) {
//     console.error('Error sending TON transaction:', e);
//     return false;
//   }
// };

// // TonConnect manifest for your app
// export const TONCONNECT_MANIFEST = {
//   url: 'https://your-app-url.com',
//   name: 'Mushroom Forest Clicker',
//   iconUrl: 'https://your-app-url.com/app-icon.png',
//   termsOfUseUrl: 'https://your-app-url.com/terms',
//   privacyPolicyUrl: 'https://your-app-url.com/privacy',
// };

// // Replace with your actual app URLs before deploying
import { TonConnectUI } from '@tonconnect/ui';

// Initialize TonConnect
export const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://your-app-url.com/tonconnect-manifest.json',
  buttonRootId: 'ton-connect-button',
});

// // Function to check if wallet is connected
// export const isWalletConnected = async (): Promise<boolean> => {
//   const wallets = await tonConnectUI.getWallets();
//   return wallets.length > 0;
// };
export const isWalletConnected = (): boolean => {
  return !!tonConnectUI.wallet;
};

// // Function to get connected wallet address
// export const getWalletAddress = async (): Promise<string | null> => {
//   const wallets = await tonConnectUI.getWallets();
//   if (wallets.length > 0 && wallets[0].account) {
//     return wallets[0].account.address;
//   }
//   return null;
// };
export const getWalletAddress = (): string | null => {
  const wallet = tonConnectUI.wallet;
  return wallet?.account?.address ?? null;
};



// Function to disconnect wallet
export const disconnectWallet = async (): Promise<void> => {
  await tonConnectUI.disconnect();
};

// Function to send TON transaction
export const sendTonTransaction = async (
  toAddress: string,
  amount: number,
  comment?: string
): Promise<boolean> => {
  try {
    // This is a simplified implementation
    // In a real implementation, you would need to use the TonConnect SDK
    // to send a transaction to the TON blockchain
    
    // Example transaction
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
      messages: [
        {
          address: toAddress,
          amount: (BigInt(amount * 1000000000)).toString(), // Convert TON to nanoTON
          payload: comment ? btoa(comment) : '',
        },
      ],
    });
    
    return true;
  } catch (e) {
    console.error('Error sending TON transaction:', e);
    return false;
  }
};

// TonConnect manifest for your app
export const TONCONNECT_MANIFEST = {
  url: 'https://your-app-url.com',
  name: 'Mushroom Forest Clicker',
  iconUrl: 'https://your-app-url.com/app-icon.png',
  termsOfUseUrl: 'https://your-app-url.com/terms',
  privacyPolicyUrl: 'https://your-app-url.com/privacy',
};

// Replace with your actual app URLs before deploying