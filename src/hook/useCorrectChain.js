import { useState, useEffect } from "react";
function useCorrectChain(network) {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    try {
      setIsCorrect(window.ethereum.networkName == network);
    } catch (error) {
      setIsCorrect(false);
    }
  });

  return isCorrect;
}

export default useCorrectChain;
