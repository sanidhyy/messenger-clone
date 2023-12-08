import type { PropsWithChildren } from "react";

import DesktopSidebar from "@/app/components/sidebar/desktop-sidebar";

async function Sidebar({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
