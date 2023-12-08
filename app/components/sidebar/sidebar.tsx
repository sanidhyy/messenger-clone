import type { PropsWithChildren } from "react";

import DesktopSidebar from "@/app/components/sidebar/desktop-sidebar";
import MobileFooter from "@/app/components/sidebar/mobile-footer";

async function Sidebar({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
