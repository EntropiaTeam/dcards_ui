import { useState, useEffect } from 'react';

type IframeParentSize = {
  frameWidth: number;
  frameHeight: number;
};

function useApplicationSize(): IframeParentSize {
  const defaultValue = { frameWidth: 0, frameHeight: 0 };
  const [iframeParrentWidth, setIframeParrentWidth] = useState<IframeParentSize>(defaultValue);

  useEffect(() => {
    function handleResize() {
      const frameWidth = ((window.innerWidth > 960)) ? 840 : 0;
      const frameHeight = ((window.innerWidth > 960)) ? 730 : 0;
      setIframeParrentWidth({
        frameWidth,
        frameHeight
      });
    }

    handleResize();
  }, []);

  return iframeParrentWidth;
}

export default useApplicationSize;
