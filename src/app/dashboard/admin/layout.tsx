import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "components/ui/app-sidebar";
// import { ChartAreaInteractive } from "components/ui/chart-area-interactive";
// import { SectionCards } from "components/ui/section-cards";
import { SiteHeader } from "components/ui/site-header";
import React from "react";

export default function AdminDashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="w-full h-screen">
     <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="overflow-hidden">
        <SiteHeader />
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
   </div>
  );
}
