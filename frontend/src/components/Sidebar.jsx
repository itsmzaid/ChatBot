import { FaPlus } from "react-icons/fa";

const Sidebar = ({ onReset }) => {
  const handleNewChat = () => {
    onReset();
  };

  return (
    <aside className="w-64 bg-white p-5 shadow-md border-r flex flex-col justify-between min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">💬 My ChatBot</h2>

        <button
          onClick={handleNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center gap-3 mb-4 text-base font-medium transition"
        >
          <FaPlus /> New Chat
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-8">© 2025</p>
    </aside>
  );
};

export default Sidebar;
