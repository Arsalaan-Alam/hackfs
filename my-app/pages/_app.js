import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum ,polygonMumbai} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum,polygonMumbai],
  [
  
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'hackFs-app',
  projectId: 'b1401597fcc3d461e2aa26fe24b9381d',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
    <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
  )
}
