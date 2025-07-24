import { FaComments, FaPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white p-4 shadow-md border-r flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">💬 My ChatBot</h2>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 flex items-center gap-2">
          <FaPlus /> New Chat
        </button>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
            <FaComments /> Previous Chats
          </li>
        </ul>
      </div>
      <div className="text-sm text-gray-400 mt-4">© 2025</div>
    </aside>
  );
};

export default Sidebar;
