import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "@rainbow-me/rainbowkit/dist/index.css";
import {
  connectorsForWallets,
  wallet,
  RainbowKitProvider,
  lightTheme
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import {publicProvider} from "wagmi/providers/public";
import {createTheme, ThemeProvider} from "@mui/material";
import {purple} from "@mui/material/colors";

// Configure supported chains
const {chains, provider, webSocketProvider} = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

// Configure supported wallets, fall back on injected if not specifically supported
const needsInjectedWalletFallback =
  typeof window !== "undefined" &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet;
const connectors = connectorsForWallets([{
  groupName: "Popular",
  wallets: [
    wallet.argent({chains}),
    wallet.brave({chains}),
    wallet.coinbase({chains, appName: "Contract Gifts"}),
    wallet.ledger({chains}),
    wallet.metaMask({chains}),
    wallet.rainbow({chains}),
    wallet.trust({chains}),
    wallet.walletConnect({chains}),
    ...(needsInjectedWalletFallback
      ? [wallet.injected({chains})]
      : []),
  ]
}]);

// Setup blockchain client
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

// Customize MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: purple["900"]
    },
  },
});

ReactDOM.render(
  <WagmiConfig client={wagmiClient}>
    <ThemeProvider theme={theme}>
      <RainbowKitProvider chains={chains}
                          appInfo={{appName: "Contract Gifts"}}
                          theme={lightTheme({
                            borderRadius: "small",
                            fontStack: "system",
                            overlayBlur: "small"
                          })}>
        <App/>
      </RainbowKitProvider>
    </ThemeProvider>
  </WagmiConfig>,
  document.getElementById('root')
);
