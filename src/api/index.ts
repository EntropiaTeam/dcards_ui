import axios, {
  AxiosError, Method, AxiosRequestConfig
} from 'axios';
import { config } from '../config';
import TelemtryProvider from '../utils/TelemetryProvider';

export enum Endpoint {
  Order = 'order',
  Init = 'init'
}

type Headers = {
  [key: string]: string;
};

type HttpResponse<T> = {
  data: T;
  errors?: string;
};

export const callAPI = async <T, U>(
  endpoint: Endpoint,
  method: Method,
  body: T,
  headers?: Headers,
  requestConfig?: AxiosRequestConfig
): Promise<U> => {
  try {
    const modifiedHeaders = {
      ...headers,
      'Custom-Referer': document.referrer,
      'x-service-version': config.appVersion
    };

    const response = await axios.request<HttpResponse<U>>({
      url: `${Object.values(config.api).join('')}/${endpoint}`,
      method,
      ...requestConfig,
      headers: { ...modifiedHeaders },
      data: body
    });

    const resp = response.data;

    return resp.data;
  } catch (ex) {
    const error = ex as AxiosError;
    let caughtError: string;
    if (error.response) {
      caughtError = `axiosExceptionType: "response",
        responseStatus: "${error.response.status}",
        responseStatusText: "${error.response.statusText}",
        responseData: "${JSON.stringify(error.response.data, null, 2)}",
        responseHeaders: "${JSON.stringify(error.response.headers, null, 2)}"`;
    } else if (error.request) {
      caughtError = `axiosExceptionType: "request",
        requestMessage: "${JSON.stringify(error.request, null, 2)}"`;
    } else {
      // see https://github.com/axios/axios#handling-errors for information on requestSetup exception potential
      caughtError = `axiosExceptionType: "requestSetup",
        requestMessage: "${error.message}"`;
    }
    TelemtryProvider.axiosException(caughtError);
    throw error;
  }
};
