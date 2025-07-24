import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../utils/axios";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: `/api/file/upload`,
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, message }) => ({
        url: `/api/chat/${chatId}/message`,
        method: "POST",
        body: { chatId, message },
      }),
    }),
    fetchChatHistory: builder.query({
      query: (chatId) => ({
        url: `/api/chat/history/${chatId}`,
        method: "GET",
      }),
    }),
    resetChat: builder.mutation({
      query: ({ chatId }) => ({
        url: `/api/chat/${chatId}/reset`,
        method: "POST",
        body: { chatId },
      }),
    }),
  }),
});

export const {
  useUploadFilesMutation,
  useSendMessageMutation,
  useFetchChatHistoryQuery,
  useResetChatMutation,
} = chatApi;
