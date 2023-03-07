import { ReactNode } from "react";
import Logo from "./Logo";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-black leading-normal">
      <nav className="border-b-2 border-primary-500 py-6 mb-12">
        <div className="dashboard-container">
          <Logo />
        </div>
      </nav>
      <main>
        <div className="dashboard-container">{children}</div>
      </main>
    </div>
  );
}
