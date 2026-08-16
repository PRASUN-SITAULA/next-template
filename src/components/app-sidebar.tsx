import {
  Calendar,
  Home,
  Inbox,
  type LucideIcon,
  Search,
  Settings,
} from "lucide-react"
import type { Route } from "next"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items: {
  title: string
  url: Route
  icon: LucideIcon
}[] = [
  {
    icon: Home,
    title: "Home",
    url: "/",
  },
  {
    icon: Inbox,
    title: "Inbox",
    url: "/",
  },
  {
    icon: Calendar,
    title: "Calendar",
    url: "/",
  },
  {
    icon: Search,
    title: "Search",
    url: "/",
  },
  {
    icon: Settings,
    title: "Settings",
    url: "/",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
