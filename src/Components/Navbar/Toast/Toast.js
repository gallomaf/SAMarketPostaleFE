import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function toasts() {
  const notify = () => toast("Wow so easy!");
  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}
export const SuccessToast = (message) => {
    toast.success(`${message}`, {
      closeToast: (
        <button className="custom-close-button__success close__btn__common">
          Close
        </button>
      ),
     
    });
    return null;
  };
  export const ErrorToast = (message) => {
    toast.error(`${message}`, {
      closeToast: (
        <button className="custom-close-button__error close__btn__common">
          Close
        </button>
      ),
      
    });
    return null;
  };
  
  
