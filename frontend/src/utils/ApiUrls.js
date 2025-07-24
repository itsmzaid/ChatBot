export const CHATBOT_ENDPOINTS = {
  UPLOAD_FILES: "api/chat/upload",
  SEND_MESSAGE: (chatId) => `api/chat/${chatId}/message`,
  RESET_CHAT: (chatId) => `api/chat/${chatId}/reset`,
  CHAT_HISTORY: (chatId) => `api/chat/history/${chatId}`,
};
