import { useState, useEffect } from "react";
function useScroll() {
  
  const [scrollPosition, setScrollPosition] = useState(0);

  
  useEffect(() => {
    document.addEventListener("scroll", function () {
      /*Apply classes for slide in bar*/
      requestAnimationFrame(() => {
        // Calculates the scroll distance
        calculateScrollDistance();
      });
      const calculateScrollDistance = () => {
        const scrollTop = window.pageYOffset;
        const winHeight = window.innerHeight;
        const docHeight = getDocHeight();
        const totalDocScrollLength = docHeight - winHeight;
        const scrollPostions = Math.floor(
          (scrollTop / totalDocScrollLength) * 100
        );
        setScrollPosition(scrollPostions);
      };
      const getDocHeight = () => {
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      };
    });
  }, []);

  return scrollPosition;
}

export default useScroll;
