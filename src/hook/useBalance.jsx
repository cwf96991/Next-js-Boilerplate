// The minimum ABI to get ERC20 Token balance
let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

import React, { useEffect, useState } from "react";

import { useWeb3Modal } from "../hooks/web3";
import web3 from "web3";

const useBalance = (tokenAddress) => {
  const { provider } = useWeb3Modal();

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      let contract = web3.eth.contract(minABI).at(tokenAddress);
      contract.balanceOf(address, (error, balance) => {
        // Get decimals
        contract.decimals((error, decimals) => {
          // calculate a balance
          balance = balance.div(10 ** decimals);
          return balance.toString();
        });
      });
    };
    if (provider) getAddress();
    else return 0;
  }, [provider]);

  return;
};

export default useBalance;
