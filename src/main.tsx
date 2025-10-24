import React from 'react'
import ReactDOM from 'react-dom/client'
import EventPage from '../event.tsx'

// Solana wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

// Network setup (use devnet for local testing; switch to 'mainnet-beta' for production)
const network = 'devnet'
const endpoint = clusterApiUrl(network)
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter()
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <React.StrictMode>
          <EventPage />
        </React.StrictMode>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>,
)
