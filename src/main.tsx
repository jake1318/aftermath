import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "./utils/theme";
import { AftermathProvider } from "./contexts/AftermathContext";
import { Network } from "@mysten/dapp-kit";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={Network.MAINNET}>
        <WalletProvider>
          <AftermathProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </AftermathProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
