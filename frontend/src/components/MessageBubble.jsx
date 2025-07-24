import ReactMarkdown from "react-markdown";

const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div
      className={`p-3 my-1 rounded-xl max-w-[70%] whitespace-pre-wrap prose prose-sm ${
        isUser
          ? "bg-blue-500 text-white self-end ml-auto"
          : "bg-gray-100 text-black self-start mr-auto"
      }`}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default MessageBubble;
