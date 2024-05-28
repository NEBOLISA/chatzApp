/* eslint-disable no-unused-vars */

export const baseUrl = "https://chatzapp-1.onrender.com/api";
//export const uploadUrl = "https://chatzapp-1.onrender.com";
// export const baseUrl = "http://localhost:5000/api";
//  export const uploadUrl = "http://localhost:5000";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const postFileRequest = async (url, formData) => {
  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
    return { error: true, message: "An error occurred" };
  }
  
};
export const postRequest = async (url, body, credentials="include") => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials,
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = JSON.stringify(data); 
    }

    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url, credentials = "include") => {
  const response = await fetch(url, {
    method: "GET",
    credentials,
  
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = JSON.stringify(data);
    }

    return { error: true, message };
  }
  return data;
};
export const putRequest = async (url, body = "", credentials = "omit") => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials,
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = JSON.stringify(data); 
    }

    return { error: true, message };
  }
  return data;
};
export const deleteRequest = async (url,credentials="include") => {
  const response = await fetch(url, {
    method: "DELETE",
    credentials
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
      toast.error("Error deleting chat, try again", { autoClose: 1000 });
    } else {
      toast.error("Cannot delete", { autoClose: 1000 });
      message = JSON.stringify(data); 
    }

    return { error: true, message };
  }
  toast.success("Chat successfully deleted", { autoClose: 1000 });
  return data;
};
