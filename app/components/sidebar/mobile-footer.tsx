"use client";

import useRoutes from "@/app/hooks/use-routes";
import useConversation from "@/app/hooks/use-conversation";
import MobileItem from "@/app/components/sidebar/mobile-item";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) return null;

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem key={route.href} {...route} />
      ))}
    </div>
  );
};

export default MobileFooter;
