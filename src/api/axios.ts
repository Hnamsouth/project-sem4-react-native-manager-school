import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Storage } from '@/constants/storage';
import { decodeJwt } from '@/utils/jwt';
import { deleteLocalData } from '@/utils/local-data-handler';
import { deleteCookie, getCookie, setCookie } from '@/utils/storage/cookie-storage';
import { removeLocalStorageItem } from '@/utils/storage/local-storage';

class MainAxios {
  private static instance: AxiosInstance;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */

  // eslint-disable-next-line
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */

  public static getInstance(config: AxiosRequestConfig<any> | undefined): AxiosInstance {
    if (!MainAxios.instance) {
      MainAxios.instance = axios.create(config);
    }

    return MainAxios.instance;
  }

  public static setInstance(config: AxiosRequestConfig<any> | undefined) {
    MainAxios.instance = axios.create(config);
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public someBusinessLogic() {
    // ...
  }
}

// variable
let isRefreshing = false;
const refreshSubscribers: any[] = [];

// functions
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((cb) => cb(accessToken));
};

const isAccessTokenExpired = (token: string) => {
  const decoder: any = decodeJwt(token, {
    complete: false,
  });

  if (Date.now() >= decoder?.exp * 1000) {
    return true;
  }

  return false;
};

const handleRefreshToken = async (
  refreshToken: string,
  isRequest: boolean,
  originalConfig?: any,
) => {
  if (refreshToken && !isRefreshing) {
    isRefreshing = true;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/general/auth/refresh-token`,
        { refreshToken },
      );

      const newToken = response?.data?.data?.accessToken;
      const newRefreshToken = response?.data?.data?.refreshToken;

      if (!newToken) {
        deleteLocalData();
      }

      setCookie(Storage.token, newToken);
      setCookie(Storage.refresh_token, newRefreshToken);

      onTokenRefreshed(newToken);

      if (isRequest) {
        const config = {
          ...originalConfig,
          headers: {
            ...originalConfig.headers,
            Authorization: `Bearer ${response.data.data.accessToken}`,
          },
        };

        return await mainAxios(config);
      }
    } catch (error) {
      deleteLocalData();
      return await Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
};

// instance
const mainAxios = MainAxios.getInstance({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

mainAxios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    if (typeof window === 'undefined') return config;

    const token = getCookie(Storage.token);
    const refreshToken = getCookie(Storage.refresh_token);

    if (token && config && config?.headers) {
      if (!config.url?.includes('/auth/login') && isAccessTokenExpired(token) && refreshToken) {
        handleRefreshToken(refreshToken, false, config);

        // Create a new promise to wait for the token refresh
        return new Promise((resolve) => {
          subscribeTokenRefresh((accessToken) => {
            const configHere = {
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
              },
            };
            resolve(configHere);
          });
        });
      }

      config.headers.Authorization = `Bearer ${getCookie(Storage.token)}`;
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

mainAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  async (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      removeLocalStorageItem(Storage.lock_device);
    }

    if (
      error.response?.status === 401 &&
      typeof window !== 'undefined' &&
      getCookie(Storage.token)
    ) {
      deleteCookie(Storage.token);
      window.location.reload();
    }

    const originalConfig = error?.config;

    if (typeof window === 'undefined') return originalConfig;

    const refreshToken = getCookie(Storage.refresh_token);

    if (originalConfig.url !== '/auth/login' && error.response) {
      // Access Token was expired
      if (error.response?.status === 401) {
        handleRefreshToken(refreshToken, true, originalConfig);

        const retryOriginalRequest = new Promise((resolve) => {
          subscribeTokenRefresh((accessToken) => {
            const config = {
              ...originalConfig,
              headers: {
                ...originalConfig.headers,
                Authorization: `Bearer ${accessToken}`,
              },
            };

            resolve(mainAxios(config));
          });
        });

        return retryOriginalRequest;
      }
    }

    return Promise.reject(error);
  },
);

export default mainAxios;
