"use client";

import { useState } from "react";
import type { User } from "@prisma/client";

import useRoutes from "@/app/hooks/use-routes";
import DesktopItem from "@/app/components/sidebar/desktop-item";
import Avatar from "@/app/components/avatar";
import SettingsModal from "@/app/components/modals/settings-modal";

type DesktopSidebarProps = {
  currentUser: User;
};

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((route) => (
              <DesktopItem key={route.label} {...route} />
            ))}
          </ul>
        </nav>

        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            role="button"
            tabIndex={0}
            title={currentUser?.name!}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
