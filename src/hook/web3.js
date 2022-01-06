import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
const providerOptions = {
  walletconnect: {
    
    package: WalletConnectProvider,
    options: {
      infuraId: '196440d5d02d41dfa2a8ee5bfd2e96bd',
    },
  },
};

const web3Modal = new Web3Modal({
  network: 'kovan',
  cacheProvider: true,
  providerOptions,
});

export function useWeb3Modal() {
  const [provider, setProvider] = useState(undefined);
  const [error, setError] = useState(null);

  // Automatically connect if the provider is cashed but has not yet
  // been set (e.g. page refresh)
  if (web3Modal.cachedProvider && !provider) {
    connectWallet();
  }

  async function connectWallet() {
    try {
      const externalProvider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(
        externalProvider,
      );

      setProvider(ethersProvider);
    } catch (e) {
      setError('NO_WALLET_CONNECTED');
      console.log('NO_WALLET_CONNECTED', e);
    }
  }

  function disconnectWallet() {
    web3Modal.clearCachedProvider();
    setProvider(undefined);
  }
  async function getAccount(){
    const externalProvider = await web3Modal.connect();
    const web3 = new Web3(externalProvider);
    return await web3.eth.getAccounts();
  }
  async function connectContract(networks, abi) {
    const externalProvider = await web3Modal.connect();
    const web3 = new Web3(externalProvider);
    const networkId = await web3.eth.net.getId();
    const address = networks[networkId].address;
    const contract = new web3.eth.Contract(abi, address);
    return contract;
  }
  const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org"
      ],
      blockExplorerUrls: ["https://bscscan.com"]
    }
  };
  return {networks, connectWallet, disconnectWallet, provider, error, connectContract,getAccount };
}
