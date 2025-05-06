'use client';

import { useTelegram } from '@/lib/useTelegram';
import Game from '@/components/Game';

export default function Page() {
  const { user, debugLog } = useTelegram();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4 text-base bg-gray-900 text-gray-100">
        <h1 className="text-2xl font-bold text-emerald-400 mb-4">Mystical Mushroom Forest</h1>
        <p>Loading user data...</p>
        <p className="text-sm text-gray-400 mt-2">
          If this doesnt load please make sure youre opening the app from inside Telegram.
        </p>

        <div className="mt-6 bg-gray-800 p-4 rounded-md w-full max-w-md text-left text-xs">
          <strong className="block mb-1 text-emerald-400">✅ Debug Log:</strong>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            {debugLog.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 bg-gray-800 p-3 rounded text-left text-xs w-full max-w-md text-gray-300">
          <div>window.Telegram: {typeof window !== 'undefined' && (window as any).Telegram ? '✅' : '❌'}</div>
          <div>Telegram.WebApp: {typeof window !== 'undefined' && (window as any).Telegram?.WebApp ? '✅' : '❌'}</div>
          <div>initDataUnsafe: {typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initDataUnsafe ? '✅' : '❌'}</div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-gray-100 p-4">
      <Game />
    </main>
  );
}