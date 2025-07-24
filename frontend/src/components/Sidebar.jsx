import { FaPlus, FaTimes } from "react-icons/fa";

const Sidebar = ({ onReset, onCloseMobileSidebar }) => {
  return (
    <aside className="w-64 bg-white p-5 shadow-md border-r flex flex-col justify-between h-full relative">
      <button
        className="absolute top-4 right-4 text-gray-500 text-xl md:hidden"
        onClick={onCloseMobileSidebar}
      >
        <FaTimes />
      </button>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">💬 My ChatBot</h2>
        <button
          onClick={onReset}
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
