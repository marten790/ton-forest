'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

interface TonProviderProps {
  children: React.ReactNode;
}

const TonProvider = ({ children }: TonProviderProps) => {
  return (
    <TonConnectUIProvider manifestUrl="https://your-app-url.com/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
};

export default TonProvider;