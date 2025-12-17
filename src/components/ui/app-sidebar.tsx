"use client"

import * as React from "react"
import {
  IconCamera,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavDocuments } from "./nav-documents"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { Briefcase, Cable, DollarSign, FolderGit2, FolderKanban, HandCoins,  HelpCircle,  LayoutDashboard,  LayoutTemplate,  PcCase,  Phone,  ScanEye, ShoppingCart, Star, Target, Telescope, Transgender, UserPlus, Users } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
  {
    title: "Dashboard",
    url: "/dashboard/admin/",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    url: "/dashboard/admin/order",
    icon: ShoppingCart,
  },
  {
    title: "Projects",
    url: "/dashboard/admin/project",
    icon: FolderKanban,
  },
  {
    title: "Templates",
    url: "/dashboard/admin/template",
    icon: LayoutTemplate,
  },
  {
    title: "Pricing",
    url: "/dashboard/admin/pricing",
    icon: DollarSign,
  },
  {
    title: "Targeted Clients",
    url: "/dashboard/admin/target-client",
    icon: Target,
  },
  {
    title: "Members",
    url: "/dashboard/admin/member",
    icon: Users,
  },
  {
    title: "Reviews",
    url: "/dashboard/admin/review",
    icon: Star,
  },
  {
    title: "FAQ",
    url: "/dashboard/admin/faq",
    icon: HelpCircle,
  },
  {
    title: "Contact Info",
    url: "/dashboard/admin/contact-info",
    icon: Phone,
  },
  {
    title: "Case Studies",
    url: "/dashboard/admin/case-studies",
    icon: Briefcase,
  },
],

  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      title: "Add Project",
      url: "/dashboard/admin/add-project",
      icon: FolderGit2 ,
    },
    {
      title: "Add Templates",
      url: "/dashboard/admin/add-template",
      icon: IconListDetails,
    },
    {
      title: "Add Target Client",
      url: "/dashboard/admin/add-target-client",
      icon: Telescope ,
    },
    {
      title: "Add Review",
      url: "/dashboard/admin/add-review",
      icon: ScanEye ,
    },
    {
      title: "Add Pricing",
      url: "/dashboard/admin/add-pricing",
      icon: HandCoins,
    },
    {
      title: "Add Member",
      url: "/dashboard/admin/add-member",
      icon: UserPlus,
    },
    {
      title: "Add FAQ",
      url: "/dashboard/admin/add-faq",
      icon: Transgender,
    },
    {
      title: "Add Case Studies",
      url: "/dashboard/admin/add-case-studies",
      icon: PcCase,
    },
    {
      title: "Add Contact Info",
      url: "/dashboard/admin/add-contact-info",
      icon: Cable,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
