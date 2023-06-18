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
import DefaultNavbar from '@/components/DefaultNavbar';
import { AuthProvider } from '@/context/AuthContext';
import "./navbar.css"


const filecoinCalibration = {
  id: 314159,
  name: 'Filecoin - Calibration testnet',
  network: 'Filecoin - Calibration testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tFIL',
    symbol: 'tFIL',
  },
  rpcUrls: {
    public: { http: ['https://filecoin-calibration.chainup.net/rpc/v1'] },
    default: { http: ['https://filecoin-calibration.chainup.net/rpc/v1'] },
  },
  blockExplorers: {
    etherscan: { name: 'filscan', url: 'https://calibration.filfox.info/en' },
    default: { name: 'filscan', url: 'https://calibration.filfox.info/en' },
  },
 
} 
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum,polygonMumbai,filecoinCalibration],
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
    <RainbowKitProvider chains={chains} initialChain={80001}>
      <AuthProvider>

    <DefaultNavbar/>
    <Component {...pageProps} />
      </AuthProvider>
    </RainbowKitProvider>
  </WagmiConfig>
  )
}
