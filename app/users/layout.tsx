import type { PropsWithChildren } from "react";

import Sidebar from "@/app/components/sidebar/sidebar";

export default async function UsersLayout({ children }: PropsWithChildren) {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
