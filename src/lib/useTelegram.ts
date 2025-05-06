// import { useEffect, useState } from 'react';
// import { retrieveLaunchParams } from '@telegram-apps/sdk';

// interface TelegramUser {
//   id: number;
//   first_name: string;
//   username?: string;
//   last_name?: string;
//   photo_url?: string;
//   is_bot?: boolean;
//   language_code?: string;
//   is_premium?: boolean;
//   added_to_attachment_menu?: boolean;
//   allows_write_to_pm?: boolean;
// }

// interface InitData {
//   user?: TelegramUser;
//   [key: string]: unknown;
// }

// export const useTelegram = () => {
//   const [user, setUser] = useState<TelegramUser | null>(null);
//   const [initData, setInitData] = useState<InitData | null>(null);
//   const [debugLog, setDebugLog] = useState<string[]>([]);

//   const debug = (msg: string) => {
//     console.log(msg);
//     setDebugLog((prev) => [...prev, msg]);
//   };

//   useEffect(() => {
//     try {
//       const launchParams = retrieveLaunchParams();

//       // Directly use the object; no JSON.parse needed
//       const tgWebAppData = launchParams.tgWebAppData;

//       debug(`📦 tgWebAppData: ${JSON.stringify(tgWebAppData)}`);

//       if (tgWebAppData && typeof tgWebAppData === 'object' && 'user' in tgWebAppData) {
//         debug('✅ Telegram user data retrieved via SDK');
//         setUser(tgWebAppData.user as TelegramUser);
//         setInitData(tgWebAppData);
//       } else {
//         debug('❌ User data not found in tgWebAppData');
//       }
//     } catch (e) {
//       debug(`❌ Failed to retrieve launch params: ${(e as Error).message}`);
//     }

//     if (typeof window !== 'undefined') {
//       const tg = (window as any).Telegram;
//       const webApp = tg?.WebApp;
//       debug(`🧠 window.Telegram: ${tg ? '✅ present' : '❌ missing'}`);
//       debug(`🧩 Telegram.WebApp: ${webApp ? '✅ present' : '❌ missing'}`);
//       debug(`📦 initDataUnsafe: ${webApp?.initDataUnsafe ? '✅ present' : '❌ missing'}`);
//     }
//   }, []);

//   return { user, initData, debugLog };
// };
import { useEffect, useState } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import setupMockTelegram from './mockTelegram';

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  last_name?: string;
  photo_url?: string;
  is_bot?: boolean;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
}

interface InitData {
  user?: TelegramUser;
  [key: string]: unknown;
}

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<InitData | null>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [isDev, setIsDev] = useState(false);

  const debug = (msg: string) => {
    console.log(msg);
    setDebugLog((prev) => [...prev, msg]);
  };

  useEffect(() => {
    // Check if we're in development mode
    const isDevEnvironment = process.env.NODE_ENV === 'development';
    setIsDev(isDevEnvironment);
    
    // Setup mock Telegram data in development mode
    if (isDevEnvironment) {
      setupMockTelegram();
      debug('🧪 Development mode detected, using mock Telegram data');
    }

    try {
      // Try to get launch params from SDK
      const launchParams = retrieveLaunchParams();
      const tgWebAppData = launchParams.tgWebAppData;
      
      debug(`📦 tgWebAppData: ${JSON.stringify(tgWebAppData)}`);
      
      if (tgWebAppData && typeof tgWebAppData === 'object' && 'user' in tgWebAppData) {
        debug('✅ Telegram user data retrieved via SDK');
        setUser(tgWebAppData.user as TelegramUser);
        setInitData(tgWebAppData);
      } else {
        debug('❌ User data not found in tgWebAppData');
        
        // Try to get from window.Telegram in case mock data is available
        if (typeof window !== 'undefined') {
          const tg = (window as any).Telegram;
          const webApp = tg?.WebApp;
          
          if (webApp?.initDataUnsafe?.user) {
            debug('✅ Telegram user data retrieved from window.Telegram');
            setUser(webApp.initDataUnsafe.user);
            setInitData(webApp.initDataUnsafe);
          }
        }
      }
    } catch (e) {
      debug(`❌ Failed to retrieve launch params: ${(e as Error).message}`);
      
      // Even if SDK fails, try window.Telegram
      if (typeof window !== 'undefined') {
        const tg = (window as any).Telegram;
        const webApp = tg?.WebApp;
        
        if (webApp?.initDataUnsafe?.user) {
          debug('✅ Fallback: Telegram user data retrieved from window.Telegram');
          setUser(webApp.initDataUnsafe.user);
          setInitData(webApp.initDataUnsafe);
        }
      }
    }

    // Add debug info about Telegram object
    if (typeof window !== 'undefined') {
      const tg = (window as any).Telegram;
      const webApp = tg?.WebApp;
      debug(`🧠 window.Telegram: ${tg ? '✅ present' : '❌ missing'}`);
      debug(`🧩 Telegram.WebApp: ${webApp ? '✅ present' : '❌ missing'}`);
      debug(`📦 initDataUnsafe: ${webApp?.initDataUnsafe ? '✅ present' : '❌ missing'}`);
    }
  }, []);

  return { user, initData, debugLog, isDev };
};