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
  const [uploadStep, setUploadStep] = useState(!chatId);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [uploadFiles] = useUploadFilesMutation();
  const [sendMessage] = useSendMessageMutation();
  const [resetChat] = useResetChatMutation();

  const { data: historyData, refetch } = useFetchChatHistoryQuery(chatId, {
    skip: !chatId,
  });

  useEffect(() => {
    if (chatId) localStorage.setItem("chatId", chatId);
  }, [chatId]);

  useEffect(() => {
    if (historyData?.messages) setMessages(historyData.messages);
  }, [historyData]);

  const handleFileUpload = async (files) => {
    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleStartChat = async () => {
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append("files", file));
    const res = await uploadFiles(formData);
    if (res?.data?.chatId) {
      setChatId(res.data.chatId);
      setUploadStep(false);
      setChatStarted(true);
    }
  };

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { role: "user", message: text }]);
    setIsBotTyping(true);

    const res = await sendMessage({ chatId, message: text });
    if (res?.data?.reply) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", message: res.data.reply },
      ]);
      refetch();
    }

    setIsBotTyping(false);
  };

  const handleReset = async () => {
    await resetChat({ chatId });
    localStorage.removeItem("chatId");
    setChatId(null);
    setMessages([]);
    setUploadStep(true);
    setUploadedFiles([]);
    setChatStarted(false);
  };

  return (
    <MainLayout onReset={handleReset}>
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6 flex flex-col h-screen">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center md:text-left">
          {uploadStep ? "Upload Files to Start Chat" : "Chat with AI"}
        </h1>

        {uploadStep ? (
          <>
            <FileUploader onUpload={handleFileUpload} />
            {uploadedFiles.length > 0 && (
              <div className="mt-3">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Uploaded Files:
                </h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
                <button
                  className="mt-4 bg-green-600 text-white px-5 py-2 text-sm rounded hover:bg-green-700 transition w-full sm:w-auto"
                  onClick={handleStartChat}
                >
                  Start Chat
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex-1 mt-2 overflow-y-auto space-y-3 p-3 sm:p-4 border rounded-md bg-gray-50 shadow-inner">
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} role={msg.role} text={msg.message} />
              ))}
              {isBotTyping && <MessageBubble role="bot" text="..." />}
            </div>

            <div className="sticky bottom-0 bg-white pt-2">
              <ChatInput onSend={handleSend} />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ChatPage;
