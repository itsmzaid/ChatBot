import axios from "axios";
import toast from "react-hot-toast";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body, params, formData = false }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers: {
          "Content-Type": formData ? "multipart/form-data" : "application/json",
        },
      });

      if (method !== "GET" && result?.data?.status != 204) {
        toast.success(result?.data?.message || "Success");
      }

      return { data: result.data };
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred!");
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
