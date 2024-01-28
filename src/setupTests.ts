// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

window.matchMedia = window.matchMedia
  || function setupTest() {
    return {
      matches: false,
      addListener() {},
      removeListener() {}
    };
  };
/* the assignment here to window global scope for APP_INSIGHTS_INSTRUMENTATION_KEY
will ensure this variable is available for App.test.ts during testing of the App.ts module
without this assignment, the Telemetry Provider will fall back to the production instrumentation
key (by desing) and we don't want to log telemetry traffic to prod Application Insights
for simple test failures.
*/
window.APP_INSIGHTS_INSTRUMENTATION_KEY = 'd490e89c-c956-44ce-990b-a4981db66f1d';
Enzyme.configure({ adapter: new Adapter() });
