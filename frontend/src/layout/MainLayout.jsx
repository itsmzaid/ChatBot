import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

const MainLayout = ({ children, onReset }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed z-40 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out bg-white w-64 border-r shadow-md md:relative md:translate-x-0 md:block`}
      >
        <Sidebar
          onReset={() => {
            setSidebarOpen(false);
            onReset();
          }}
          onCloseMobileSidebar={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <div className="md:hidden bg-white shadow-md flex items-center p-4">
          <button
            className="text-gray-700 text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-blue-600">
            My ChatBot
          </h1>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
