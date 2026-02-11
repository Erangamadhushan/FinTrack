import { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import RightPanel from "../components/dashboard/RightPanel";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  );
};

export default MainLayout;
