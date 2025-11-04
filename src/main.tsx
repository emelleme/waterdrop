import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import EventPage from '../event.tsx'; // Main event page
import GamePage from '../game.tsx'; // Game page

// Import the UnifiedWalletProvider from the Jupiter Aggregator wallet adapter
import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";
import { WalletName } from '@solana/wallet-adapter-base';

// Simple routing hook using hash
function useRoute() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return { route, navigate };
}

// Define the main App component
const App = () => {
  const { route } = useRoute();

  return (
    // Wrap the application with UnifiedWalletProvider for Solana wallet integration
    <UnifiedWalletProvider
      wallets={[]} // An empty array is used here as hardcodedWallets will define the wallets
      config={{
        autoConnect: false, // Set to true to automatically connect to the last used wallet
        env: "mainnet-beta", // Specify the Solana network environment (e.g., "mainnet-beta", "devnet", "testnet")
        metadata: {
          name: "UnifiedWallet", // Name of your application
          description: "UnifiedWallet", // Description of your application
          url: "https://jup.ag", // URL of your application
          iconUrls: ["https://jup.ag/favicon.ico"], // Icon(s) for your application
        },
        notificationCallback: { // Callback functions for wallet connection events
          onConnect: () => {},
          onConnecting: () => {},
          onDisconnect: () => {},
          onNotInstalled: () => {},
        },
        walletPrecedence: ["OKX Wallet", "WalletConnect"], // Order of preference for displaying wallets
        hardcodedWallets: [
          // Phantom Wallet configuration
          {
            id: "Phantom" as WalletName,
            name: "Phantom" as WalletName,
            url: "https://phantom.app/",
            icon: "https://phantom.app/ul/v10/icons/phantom.svg",
          },
          // Solflare Wallet configuration (icon field omitted as requested)
          {
            id: "Solflare" as WalletName,
            name: "Solflare" as WalletName,
            url: "https://solflare.com/",
            icon: "https://solflare.com/favicon.ico",
          },
          // Backpack Wallet configuration (icon field omitted as requested)
          {
            id: "Backpack" as WalletName,
            name: "Backpack" as WalletName,
            url: "https://www.backpack.app/",
            icon: "https://www.backpack.app/favicon.ico",
          },
          // Magic Eden Wallet configuration (icon field omitted as requested)
          {
            id: "Magic Eden" as WalletName,
            name: "Magic Eden" as WalletName,
            url: "https://wallet.magiceden.io/",
            icon: "https://wallet.magiceden.io/favicon.ico",
          },
          // Coinbase Wallet configuration (icon field omitted as requested)
          {
            id: "Coinbase Wallet" as WalletName,
            name: "Coinbase Wallet" as WalletName,
            url: "https://www.coinbase.com/wallet",
            icon: "https://www.coinbase.com/wallet/favicon.ico",
          },
          // OKX Wallet configuration (icon field omitted as requested)
          {
            id: "OKX Wallet" as WalletName,
            name: "OKX Wallet" as WalletName,
            url: "https://www.okx.com/web3",
            icon: "https://www.okx.com/web3/favicon.ico",
          },
        ],
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
        theme: "jupiter", // Theme for the wallet adapter UI
        lang: "en", // Language for the wallet adapter UI
      }}
    >
      {/* Simple routing */}
      {route === '/game' || route === '/#/game' ? <GamePage /> : <EventPage />}
    </UnifiedWalletProvider>
  );
};

// Render the App component into the DOM
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
