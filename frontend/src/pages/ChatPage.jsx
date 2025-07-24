import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import FileUploader from "../components/FileUploader";
import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import {
  useUploadFilesMutation,
  useSendMessageMutation,
  useResetChatMutation,
  useFetchChatHistoryQuery,
} from "../redux/api/chatApi";

const ChatPage = () => {
  const [chatId, setChatId] = useState(localStorage.getItem("chatId"));
  const [messages, setMessages] = useState([]);
  const [uploadStep, setUploadStep] = useState(!chatId); // Show upload screen if no chatId

  const [uploadFiles] = useUploadFilesMutation();
  const [sendMessage] = useSendMessageMutation();
  const [resetChat] = useResetChatMutation();

  const { data: historyData, refetch } = useFetchChatHistoryQuery(chatId, {
    skip: !chatId,
  });

  useEffect(() => {
    if (chatId) {
      localStorage.setItem("chatId", chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (historyData?.messages) {
      setMessages(historyData.messages);
    }
  }, [historyData]);

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    const res = await uploadFiles(formData);
    if (res?.data?.chatId) {
      setChatId(res.data.chatId);
      setUploadStep(false);
    }
  };

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { role: "user", message: text }]);
    const res = await sendMessage({ chatId, message: text });
    if (res?.data?.reply) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", message: res.data.reply },
      ]);
    }
  };

  const handleReset = async () => {
    await resetChat({ chatId });
    localStorage.removeItem("chatId");
    setChatId(null);
    setMessages([]);
    setUploadStep(true);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {uploadStep ? "Upload Files to Start Chat" : "Chat with AI"}
        </h1>

        {uploadStep ? (
          <FileUploader onUpload={handleFileUpload} />
        ) : (
          <>
            <div className="flex flex-col mt-6 space-y-2 max-h-[50vh] overflow-y-auto p-4 border rounded-md bg-gray-50">
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} role={msg.role} text={msg.message} />
              ))}
            </div>

            <ChatInput onSend={handleSend} />

            <button
              onClick={handleReset}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              End Chat
            </button>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ChatPage;
