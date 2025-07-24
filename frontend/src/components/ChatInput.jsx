import { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 bg-white border-t p-3 rounded-t-md shadow-md">
      <input
        type="text"
        className="flex-1 border text-black border-gray-300 rounded-lg p-3 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
