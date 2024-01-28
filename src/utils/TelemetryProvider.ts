import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import AxiosException from '../types/exceptions/AxiosException';

class TelemetryProvider {
  private static telemetryProvider: TelemetryProvider;

  private static AI: ApplicationInsights;

  constructor() {
    if (!TelemetryProvider.telemetryProvider) { TelemetryProvider.telemetryProvider = this; }
  }

  public static init(aiInstrumentationKey: string): void {
    this.AI = new ApplicationInsights({
      config: {
        instrumentationKey: aiInstrumentationKey
      }
    });
    this.AI.loadAppInsights();
    this.AI.trackPageView();
  }

  public static axiosException(error: string): void {
    const ex = new AxiosException(error);
    this.AI.trackException({ exception: ex });
  }
}
export default TelemetryProvider;
