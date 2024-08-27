import axios from "axios";

const domain = "https://66cd3dd88ca9aa6c8cc9c66d.mockapi.io/api/v1/";

const REQUEST_TIMEOUT = 60000;

const axiosInstance = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: domain,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    //TODO: handle token and stored here
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    return Promise.reject({
      data: error?.response,
      status: error?.response?.status,
    });
  }
);

const buildURLWithParams = (url, params = {}) => {
  let requestedURL = url;
  if (params) {
    const keys = Object.keys(params);

    if (Array.isArray(keys) && keys.length > 0) {
      requestedURL += "?";
      for (var property of keys) {
        const index = keys.indexOf(property);
        if (index > 0 && index < keys.length) {
          requestedURL += "&";
        }
        requestedURL += `${property}=${params[property]}`;
      }
    }
  }
  return requestedURL;
};

export default class APIUtils {
  static accessToken = "";
  static setAccessToken = (accessToken) => {
    APIUtils.accessToken = accessToken;
  };
  static get(url, config = { headers: {}, params: {} }) {
    return new Promise(async (resolve, reject) => {
      const { headers, params, ...restConfig } = config;
      const requestedURL = buildURLWithParams(url, params);
      const controller = new AbortController();
      const signal = controller.signal;
      const fetchConfig = {
        cache: "default",
        credentials: "include",
        headers: {
          ...config.headers,
        },
        ...restConfig,
        signal,
      };
      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      try {
        const response = await axiosInstance.get(requestedURL, fetchConfig);
        resolve({ data: response.data, status: response.status });
      } catch (error) {
        console.log(">>>>>error>>>>>", error);
        reject(error);
      }
    });
  }

  static post(url, config = { headers: {} }) {
    return new Promise(async (resolve, reject) => {
      const { headers, body, params, ...restConfig } = config;
      const controller = new AbortController();
      const signal = controller.signal;
      const fetchConfig = {
        cache: "default",
        credentials: "include",
        headers: {
          ...config.headers,
        },
        ...restConfig,
        signal,
      };
      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      try {
        const response = await axiosInstance.post(
          url,
          config.body,
          fetchConfig
        );
        resolve({ data: response.data, status: response.status });
      } catch (error) {
        console.log(">>>>>error>>>>>", error);
        reject(error);
      }
    });
  }
  static delete(url, config = { headers: {} }) {
    return new Promise(async (resolve, reject) => {
      const { headers, body, params, ...restConfig } = config;
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchConfig = {
        cache: "default",
        credentials: "include",
        headers: {
          ...config.headers,
        },
        ...restConfig,
        signal,
        body: JSON.stringify(config.body),
      };
      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      try {
        const response = await axiosInstance.delete(url, fetchConfig);
        resolve({ data: response.data, status: response.status });
      } catch (error) {
        console.log(">>>>>error>>>>>", error);
        reject(error);
      }
    });
  }
  static put(url, config = { headers: {} }) {
    return new Promise(async (resolve, reject) => {
      const { headers, body, params, ...restConfig } = config;

      const controller = new AbortController();
      const signal = controller.signal;

      const fetchConfig = {
        cache: "default",
        credentials: "include",
        headers: {
          ...config.headers,
        },
        ...restConfig,
        signal,
      };
      setTimeout(() => {
        controller.abort();
      }, REQUEST_TIMEOUT);
      try {
        const response = await axiosInstance.put(url, config.body, fetchConfig);
        resolve({ data: response.data, status: response.status });
      } catch (error) {
        console.log(">>>>>error>>>>>", error);
        reject(error);
      }
    });
  }
}
