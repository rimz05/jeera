"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const WorkspaceShell = ({
  sidebar,
  main,
}: {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) => {
  const { open } = useSidebar();

  return (
    <div className="min-h-screen w-screen bg-purple-900 flex justify-center items-center md:p-3 overflow-hidden">

      {/* Sidebar */}
      <div
        className={cn(
          "h-full transition-all duration-300 ease-in-out",
          open ? "w-[15%]" : "w-[5%]"
        )}
      >
        {sidebar}
      </div>

      {/* Main */}
      <main
        className={cn(
          "h-full bg-[#fafbff] rounded-4xl shadow-2xl shadow-accent-foreground transition-all duration-300 ease-in-out",
          open ? "w-[85%]" : "w-[95%]"
        )}
      >
        {main}
      </main>

    </div>
  );
};
