import { useState, useEffect } from "react";
import { useRouter } from "next/router";
function useIsEn() {
  const router = useRouter();
  const [isEn, setIsEn] = useState(true);
  const { locale } = router;
  useEffect(() => {
    setIsEn(locale == "en");
  });

  return isEn;
}

export default useIsEn;
