import { FC, ReactNode } from 'react';
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import dynamic from 'next/dynamic';
require('@solana/wallet-adapter-react-ui/styles.css');


//prevent hydration error
const WalletProviderDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react')).WalletProvider,
    { ssr: false }
);


const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = web3.clusterApiUrl('devnet')
	const wallets = [new walletAdapterWallets.PhantomWalletAdapter()]

	return (
		
		<ConnectionProvider endpoint={endpoint}>
	    <WalletProviderDynamic wallets={wallets}>
	       <WalletModalProvider> 
	        <>{ children  }</>
         </WalletModalProvider>
    </WalletProviderDynamic> 
    </ConnectionProvider>
	
	)
}

export default WalletContextProvider