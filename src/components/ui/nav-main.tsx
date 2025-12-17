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

  // Handle Quick Create button click - toggle dropdown
  const handleQuickCreate = () => {
    setIsQuickCreateOpen(!isQuickCreateOpen)
  }

  // Handle Mail button click - directly opens mail compose
  const handleMailClick = () => {
    window.open("mailto:", "_blank")
  }

  // Handle specific quick action selection
  const handleQuickAction = (actionType: string, subject = "", body = "") => {
    setIsQuickCreateOpen(false)
    
    const emailParams = new URLSearchParams()
    if (subject) emailParams.append("subject", subject)
    if (body) emailParams.append("body", body)
    
    const mailtoUrl = `mailto:${emailParams.toString() ? '?' + emailParams.toString() : ''}`
    window.open(mailtoUrl, "_blank")
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
            {/* Quick Create Button with Dropdown */}
            <div className="relative flex-1">
              <SidebarMenuButton
                tooltip="Quick Create"
                className={`bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear ${isQuickCreateOpen ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                onClick={handleQuickCreate}
              >
                <IconCirclePlusFilled />
                <span>Quick Create</span>
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isQuickCreateOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </SidebarMenuButton>
              
              {/* Quick Create Options Dropdown */}
              {isQuickCreateOpen && (
                <div className="absolute left-0 top-full mt-1 w-full min-w-[200px] z-50 bg-background border rounded-md shadow-lg">
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => handleQuickAction("newEmail", "New Inquiry", "Hello,\n\nI would like to inquire about...")}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>New Email</span>
                    </button>
                    <button
                      onClick={() => handleQuickAction("newProject", "New Project Proposal", "Project Details:\n\n1. Project Name:\n2. Timeline:\n3. Budget:\n4. Requirements:")}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>New Project</span>
                    </button>
                    <button
                      onClick={() => handleQuickAction("newDocument", "Document Draft", "Document Content:\n\n[Start typing your document here]")}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>New Document</span>
                    </button>
                    <button
                      onClick={() => handleQuickAction("newTask", "Task Assignment", "Task Details:\n\nTask: \nPriority: \nDeadline: \nAssigned to:")}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>New Task</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mail Button - Directly opens mail compose */}
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              onClick={handleMailClick}
              title="Compose New Email"
            >
              <IconMail />
              <span className="sr-only">Compose Email</span>
            </Button>
          </SidebarMenuItem>
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
                    ? "!bg-zinc-950 dark:!bg-gray-100 !text-gray-100 dark:!text-zinc-950  font-medium" 
                    : "hover:bg-muted"
                  }
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                  {isActive(item.url) && (
                    <span className="ml-auto h-2 w-2 rounded-full dark:bg-zinc-950 !bg-gray-100"></span>
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