import axios from 'axios';
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import app from '@/app';
import type { CustomAxiosRequestConfig } from '@/types/common.type';
import { type ToastOptions, toast } from 'vue3-toastify';

let baseURL = '/api/v1';

if (import.meta.env.VITE_API_ENDPOINT) {
  baseURL = import.meta.env.VITE_API_ENDPOINT as string;
}

const toastOptions = {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
  type: 'error'
} as ToastOptions;
const $api = axios.create({ baseURL, withCredentials: true });
const { getErrorMessage } = useApiErrorHandler();
const { addToast } = useToasts();
// const { updateUserToken } = useCurrentUserData();

// Add a request interceptor
$api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = useAccessToken();
    const newConfig = config;
    const token = accessToken.value;
    if (newConfig.headers) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

// Response error handler
function handleError(err: AxiosError, catchErrors = true) {
  if (err.response) {
    if (err.response?.status === 400) {
      // addToast(getErrorMessage(err.response), {type: 'error'});
      addToast(getErrorMessage(err.response), { type: 'error' });
    }
    else if (err.response?.status === 401 || err.response?.status === 409) {
      addToast(getErrorMessage(err.response), { type: 'error' });
      if (err.response?.status === 401) {
        // TODO: unauthorized redirect
      }
    }
    else {
      if (catchErrors) {
        // app.config.globalProperties.$toast.add(addToast({ error: err }));
        addToast(getErrorMessage(err.response), { type: 'error' });
      }
      if (!catchErrors) {
        throw {
          error: err,
          message: getErrorMessage(err.response)
        };
      }
    }
    throw err;
  }
  else {
    toast('Unable to connect to server. Please check your internet connectivity', toastOptions);
  }
}

// Add response interceptor
$api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) =>
    handleError(
      err,
      (err.response?.config as CustomAxiosRequestConfig)?.catchErrors || true
    )
);

export default $api;
