import React, { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { GlobalProvider } from './context/GlobalProvider';
import { InitialDataProvider } from './context/initialData';
import { Main } from './containers';
import mainTheme from './config/theme';
import AdobeAnalytics from './utils/AdobeAnalytics';
import TelemtryProvider from './utils/TelemetryProvider';
import './AppFonts.css';

const App: FC = () => {
  if (window.APP_INSIGHTS_INSTRUMENTATION_KEY) {
    TelemtryProvider.init(window.APP_INSIGHTS_INSTRUMENTATION_KEY);
  } else {
    // eslint-disable-next-line no-console
    console.log('Fault: Telemetry fallback to PRD.');
    TelemtryProvider.init('52f7878a-ed5d-4c41-add6-af83ce6315f3');
  }
  AdobeAnalytics.getInstance().pageInit();

  return (
    <GlobalProvider>
      <InitialDataProvider>
        <ThemeProvider theme={mainTheme}>
          <Main />
        </ThemeProvider>
      </InitialDataProvider>
    </GlobalProvider>
  );
};

export default App;
