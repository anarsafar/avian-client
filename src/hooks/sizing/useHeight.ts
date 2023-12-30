import { useEffect, useLayoutEffect, useState } from 'react';

function useHeight() {
  const [height, setHeigth] = useState<number | string>(0);

  const updateContainerHeight = () => {
    setHeigth(window.innerHeight);
  };

  useEffect(() => {
    updateContainerHeight();

    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  useLayoutEffect(() => {
    if (Number(height) < 680) {
      setHeigth('auto');
      window.removeEventListener('resize', updateContainerHeight);
    }
  }, [height]);

  return height;
}

export default useHeight;
