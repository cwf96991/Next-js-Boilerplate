import React, { useEffect, useState } from "react";
import Blockies from "react-blockies";

import { useWeb3Modal } from "../hook/web3";
import web3 from "web3";
const truncateAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

const ConnectWallet = ({ chain }) => {
  const [signerAddress, setSignerAddress] = useState("");
  const [signerBalance, setSignerBalance] = useState(0);

  const { networks, connectWallet, disconnectWallet, provider, error } =
    useWeb3Modal();

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await signer.getBalance();

      setSignerBalance(web3.utils.fromWei(balance.toString(), "ether"));
      setSignerAddress(address);
      await checkNetwork(chain ?? "polygon");
    };
    if (provider) getAddress();
    else setSignerAddress("");
  }, [provider]);
  const networkChanged = async (chainId) => {
    await checkNetwork(chain ?? "polygon");
  };
  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  const handleClickConnect = async () => {
    await connectWallet();
  };

  const handleClickAddress = () => {
    disconnectWallet();
  };
  const checkNetwork = async (network) => {
    try {
      if (window.ethereum.networkName !== network) {
        switchNetwork(network);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const switchNetwork = async (networkName) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      // setError(err.message);
    }
  };
  return (
    <button
      className="flex flex-row btn btn-outline btn-base-100 text-gray-500 rounded-full mx-2 btn-sm md:btn-md"
      onClick={signerAddress ? handleClickAddress : handleClickConnect}
    >
      <Blockies
        className="rounded-full  mr-2"
        seed={signerAddress.toLowerCase()}
        size={8}
        scale={3}
      />

      <div>
        {signerAddress ? truncateAddress(signerAddress) : "Connect Wallet"}
      </div>
    </button>
  );
};

export default ConnectWallet;
