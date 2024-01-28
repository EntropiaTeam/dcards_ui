/* eslint-disable @typescript-eslint/prefer-regexp-exec */

export const getImageUrl = (
  fileName: string,
  type: string
  // isOverlayCard = false
): string => {
  // if (window.CLOUDINARY_FEATURE_FLAG) {
  //   return `https://rescloud.ediblearrangements.com/image/private/t_${isOverlayCard && !fileName.endsWith('_inside.png') ? 'ph-' : ''}${type},f_auto,q_auto/Creative-Marketing/Printibles/${fileName}`;
  // }

  const imagePath = `${fileName.substr(0, fileName.lastIndexOf('_') + 1)}${type}${fileName.substr(fileName.lastIndexOf('_'))}`;
  return `/assets/i/${imagePath}`;
};

export const matchMobile = (): boolean => {
  const devices = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  return devices.some((device) => window.navigator.userAgent.match(device));
};

export const isIOs = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
