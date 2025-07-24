const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div
      className={`p-3 my-1 rounded-xl max-w-[70%] ${
        isUser
          ? "bg-blue-500 text-white self-end ml-auto"
          : "bg-gray-200 text-black self-start mr-auto"
      }`}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
