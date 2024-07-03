import { type ToastOptions, toast } from 'vue3-toastify';

export function useToasts() {
  const toastOptions = {
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
    dangerouslyHTMLString: true
  } as ToastOptions;

  const addToast = (message: any, options: ToastOptions = toastOptions) => {
    toast(message, { ...toastOptions, ...options });
  };

  return {
    toastOptions,
    addToast
  };
}
