/* eslint-disable no-unused-vars */
export const baseUrl = "http://localhost:5000/api";
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
  // const data = await response.data;

  // if (!response.ok) {
  //   let message;
  //   if (response?.data) {
  //     message = response?.data;
  //   } else {
  //     message = response.data; //"Network error";
  //   }

  //   return { error: true, message };
  // }
  // return data;
};
export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = JSON.stringify(data); //"Network error";
    }

    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = JSON.stringify(data); //"Network error";
    }

    return { error: true, message };
  }
  return data;
};
export const putRequest = async (url, body = "") => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = JSON.stringify(data); //"Network error";
    }

    return { error: true, message };
  }
  return data;
};
export const deleteRequest = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
      toast.error("Error deleting chat, try again", { autoClose: 1000 });
    } else {
      toast.error("Cannot delete", { autoClose: 1000 });
      message = JSON.stringify(data); //"Network error";
    }

    return { error: true, message };
  }
  toast.success("Chat successfully deleted", { autoClose: 1000 });
  return data;
};
