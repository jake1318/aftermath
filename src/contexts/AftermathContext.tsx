import { createContext, useContext, ReactNode } from "react";
import { AftermathApi, Network, getFullnodeUrl } from "aftermath-ts-sdk";

const aftermathSDK = new AftermathApi({
  network: Network.MAINNET,
  fullnode: getFullnodeUrl("mainnet"),
});

const AftermathContext = createContext<AftermathApi>(aftermathSDK);

export const AftermathProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AftermathContext.Provider value={aftermathSDK}>
      {children}
    </AftermathContext.Provider>
  );
};

export const useAftermath = () => useContext(AftermathContext);
