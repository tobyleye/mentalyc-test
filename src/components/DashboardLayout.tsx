import { ReactNode } from "react";
import Logo from "./Logo";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-black leading-normal flex flex-col absolute top-0 left-0 h-full w-full">
      <nav className="border-b-2 border-primary-500 py-4 mb-7">
        <div className="dashboard-container flex justify-center md:justify-start">
          <Logo />
        </div>
      </nav>
      <main className="flex-1 overflow-auto">
        <div className="dashboard-container h-full">{children}</div>
      </main>
    </div>
  );
}
