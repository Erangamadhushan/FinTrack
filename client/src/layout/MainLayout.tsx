import type { ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import RightPanel from "../components/dashboard/RightPanel";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex">
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
