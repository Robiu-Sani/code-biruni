/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavDocuments({ items }: any) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Create</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: any) => {
          const isActive = pathname === item.url || pathname?.startsWith(`${item.url}/`)
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive}
                className={cn(
                  isActive && "!bg-zinc-950 dark:!bg-gray-100 dark:!text-zinc-950 !text-white font-medium"
                )}
              >
                <Link href={item.url} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}