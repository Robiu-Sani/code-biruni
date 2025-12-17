/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useState } from "react"

export function NavMain({
  items,
}: any) {
  const pathname = usePathname()
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false)

  // Handle Quick Create functionality
  const handleQuickCreate = () => {
    alert("Redirecting to compose new email...")
    setIsQuickCreateOpen(!isQuickCreateOpen)
  }

  const handleMailClick = () => {
    window.location.href = "mailto:?subject=Inquiry&body=Hello,"
  }

  // Check if a path is active
  const isActive = (url: string) => {
    return pathname === url || pathname?.startsWith(`${url}/`)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Quick Create Section */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className={`bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear ${isQuickCreateOpen ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
              onClick={handleQuickCreate}
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            
            {/* Mail Button */}
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              onClick={handleMailClick}
              title="Send Email"
            >
              <IconMail />
              <span className="sr-only">Compose Email</span>
            </Button>
          </SidebarMenuItem>
          
          {/* Quick Create Options (Conditional) */}
          {isQuickCreateOpen && (
            <div className="ml-4 mt-2 p-2 bg-muted rounded-md space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => window.location.href = "mailto:?subject=New%20Project&body=Project%20Details:"}
              >
                New Email
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => alert("Redirecting to create new item...")}
              >
                New Item
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => alert("Redirecting to create new document...")}
              >
                New Document
              </Button>
            </div>
          )}
        </SidebarMenu>

        {/* Navigation Items with Active States */}
        <SidebarMenu>
          {items.map((item: any) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url} className="block w-full">
                <SidebarMenuButton 
                  tooltip={item.title}
                  isActive={isActive(item.url)}
                  className={isActive(item.url) 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "hover:bg-muted"
                  }
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                  {isActive(item.url) && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}