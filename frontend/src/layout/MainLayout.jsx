import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto bg-white rounded-l-2xl shadow-lg">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
