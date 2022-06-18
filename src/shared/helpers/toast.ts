import { toast, ToastContent } from 'react-toastify';

export const displaySuccessToast = (message: ToastContent) => {
  toast(message, { type: toast.TYPE.SUCCESS });
};

export const displayFailToast = (message: ToastContent) => {
  toast(message, { type: toast.TYPE.WARNING });
};

export const displayInfoToast = (message: ToastContent) => {
  toast(message, { type: toast.TYPE.INFO });
};
