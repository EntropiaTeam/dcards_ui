/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'url-search-params-polyfill';

interface WindowWebkit extends Window {
  webkit?: any;
}

type SaveOrder = {
  printibleID: string;
  imageLink: string;
  mediumImageLink: string;
};

const urlParams = new URLSearchParams(window.location.search);
const hostUrl = urlParams.get('hostUrl');

class IframeActions {
  public static closeWindow = (): void => {
    const closeWindowMessage = {
      action: 'closePrintibleWindow',
      pdfLink: '',
      orderId: ''
    };

    try {
      if ((window as WindowWebkit).webkit) {
        (window as WindowWebkit)
          .webkit.messageHandlers.callbackHandler.postMessage(closeWindowMessage);
      }
    } finally {
      window.parent.postMessage(
        closeWindowMessage,
        hostUrl || window.location.origin
      );
    }
  };

  public static saveOrder = ({ printibleID, imageLink, mediumImageLink }: SaveOrder): void => {
    const saveOrderMessage = {
      action: 'printibleCreated',
      printibleID,
      imageLink,
      mediumImageLink
    };

    try {
      if ((window as WindowWebkit).webkit) {
        (window as WindowWebkit)
          .webkit.messageHandlers.callbackHandler.postMessage(saveOrderMessage);
      }
    } finally {
      window.parent.postMessage(
        saveOrderMessage,
        hostUrl || window.location.origin
      );
    }
  };

  public static getHostToken = (): string => {
    const token = urlParams.get('token');
    if (!token) return '';
    return token;
  };
}

export default IframeActions;
