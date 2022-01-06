import React, { useEffect, useState } from 'react';

import { useWeb3Modal } from '../hooks/web3';
import web3 from 'web3';

const useChainBalance = () => {
  const [signerBalance, setSignerBalance] = useState(0);

  const { provider, error } = useWeb3Modal();

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();

      const balance = await signer.getBalance();

      setSignerBalance(web3.utils.fromWei(balance.toString(), 'ether'));
    };
    if (provider) getAddress();
  }, [provider]);

  return signerBalance
};

export default useChainBalance;
