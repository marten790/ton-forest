// This file provides mock Telegram data for development mode

export const setupMockTelegram = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Only inject mock data in development mode
    if (!(window as any).Telegram) {
      console.log('Setting up mock Telegram environment for development');
      
      // Mock Telegram user
      const mockUser = {
        id: 12345678,
        first_name: 'Dev',
        last_name: 'User',
        username: 'dev_user',
        language_code: 'en',
        is_premium: true
      };
      
      // Mock Telegram WebApp object
      (window as any).Telegram = {
        WebApp: {
          initDataUnsafe: {
            user: mockUser,
            chat_instance: 'mock_instance',
            chat_type: 'sender',
            start_param: 'TCG'
          },
          ready: () => console.log('Mock WebApp ready'),
          expand: () => console.log('Mock WebApp expand'),
          close: () => console.log('Mock WebApp close'),
          sendData: (data: string) => console.log('Mock WebApp sendData:', data),
          MainButton: {
            text: '',
            isVisible: false,
            isActive: false,
            setText: (text: string) => {
              console.log('Mock MainButton setText:', text);
              (window as any).Telegram.WebApp.MainButton.text = text;
              return (window as any).Telegram.WebApp.MainButton;
            },
            show: () => {
              console.log('Mock MainButton show');
              (window as any).Telegram.WebApp.MainButton.isVisible = true;
              return (window as any).Telegram.WebApp.MainButton;
            },
            hide: () => {
              console.log('Mock MainButton hide');
              (window as any).Telegram.WebApp.MainButton.isVisible = false;
              return (window as any).Telegram.WebApp.MainButton;
            },
            enable: () => {
              console.log('Mock MainButton enable');
              (window as any).Telegram.WebApp.MainButton.isActive = true;
              return (window as any).Telegram.WebApp.MainButton;
            },
            disable: () => {
              console.log('Mock MainButton disable');
              (window as any).Telegram.WebApp.MainButton.isActive = false;
              return (window as any).Telegram.WebApp.MainButton;
            }
          },
          version: '6.0',
          colorScheme: 'dark',
          themeParams: {
            bg_color: '#1a1a1a',
            text_color: '#ffffff',
            hint_color: '#aaaaaa',
            link_color: '#2ecc71',
            button_color: '#2ecc71',
            button_text_color: '#ffffff'
          }
        }
      };
      
      console.log('Mock Telegram environment ready');
    }
  }
};

export default setupMockTelegram;