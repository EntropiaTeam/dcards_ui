declare global {
  interface Window {
    digitalData: { event: string }[];
  }
}

interface AdobeAnalytics {
  digitalData: Array<{ event: string; page?: { name: string; type: string } }>;
  getInstance: () => AdobeAnalytics;
  pageInit: () => void;
  selectStyle: () => void;
  cancelButton: () => void;
  personalizeCard: () => void;
  goBackButton: () => void;
  doneButton: () => void;
}

class AdobeAnalytics {
  private static instance: AdobeAnalytics;

  private constructor() {
    this.digitalData = (window.digitalData || []);
  }

  public static getInstance(): AdobeAnalytics {
    if (!AdobeAnalytics.instance) {
      AdobeAnalytics.instance = new AdobeAnalytics();
    }
    return AdobeAnalytics.instance;
  }

  public pageInit = (): void => {
    this.digitalData.push({
      event: 'page init'
    });
  };

  public selectStyle = (): void => {
    this.digitalData.push({
      event: 'page data',
      page: {
        name: 'greetingcard-select-style',
        type: 'greeting-card-SPA'
      }
    });
    this.digitalData.push({ event: 'page load completed' });
  };

  public personalizeCard = (): void => {
    this.digitalData.push({
      event: 'page data',
      page: {
        name: 'greetingcard-personalize',
        type: 'greeting-card-SPA'
      }
    });
    this.digitalData.push({ event: 'page load completed' });
  };

  public cancelButton = (): void => {
    this.digitalData.push({ event: 'style-cancel-button' });
  };

  public goBackButton = (): void => {
    this.digitalData.push({ event: 'personalize-back' });
  };

  public doneButton = (): void => {
    this.digitalData.push({ event: 'personalize-done' });
  };
}

export default (AdobeAnalytics);
