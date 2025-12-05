import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "components/ui/app-sidebar";
import { ChartAreaInteractive } from "components/ui/chart-area-interactive";
import { SectionCards } from "components/ui/section-cards";
import { SiteHeader } from "components/ui/site-header";
import React from "react";

export default function AdminDashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="w-full">
     <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
   </div>
  );
}
