import axios from "axios";
import { toast } from "sonner";
import { getSession } from "next-auth/react";

const unAuthorized = () => {
  window.location.href = "/";
  toast.error("Unauthorized. Please log in again.");
};

// Create Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    } catch (error: unknown) {
      toast.error("Error encrypting API key");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor
api.interceptors.response.use(
  (response) => response, // ✅ Handle successful responses properly
  (error) => {
    if (error.response) {
      const status = error.response.status;
      let message: string =
        error.response.data?.message ||
        (status === 400
          ? "Bad Request"
          : status === 404
            ? "Not Found"
            : status === 500
              ? "Internal Server Error"
              : "An error occurred");

      if (status === 401) {
        unAuthorized();
      } else {
        toast.error(message);
      }
    } else {
      toast.error("Unable to connect to the server. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default api;
