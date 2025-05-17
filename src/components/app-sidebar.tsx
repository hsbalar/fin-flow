/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import {
  BookOpen,
  Bot,
  ChevronsUpDown,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  Map,
  PieChart,
  Plus,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavDashboard } from '@/components/nav-dashboard'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { ICategory, IDashboard, toggleDialog } from '@/state/reducers/app'
import { RootState } from '@/state/store'
import { Sheet } from '@/models'

const data = {
  user: {
    name: 'Hitesh',
    email: 'hitesh@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sheets = useSelector((state: RootState) => state.sheet.sheets)
  const { categories, dashboards } = useSelector((state: RootState) => state.app)
  const { isMobile } = useSidebar()
  const dispatch = useDispatch()

  const sheetByCategory: Record<string, Sheet[]> = {}
  sheets.forEach((sheet: Sheet) => {
    if (!sheetByCategory[sheet.categoryId]) {
      sheetByCategory[sheet.categoryId] = []
    }
    sheetByCategory[sheet.categoryId].push(sheet)
  })
  const navMain = categories.map((category: ICategory) => ({
    name: category.name,
    id: category.id,
    icon: null,
    isActive: true,
    items: sheetByCategory[category.id] || [],
  }))
  const navDashboard = dashboards.map((dashboard: IDashboard) => ({
    ...dashboard,
    icon: null,
    isActive: true,
  }))
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Fin Flows</span>
                    <span className="truncate text-[0.625rem] text-muted-foreground">
                      Your Finances, Always with You.
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={isMobile ? 'bottom' : 'right'}
                sideOffset={4}
              >
                <DropdownMenuItem className="gap-2 p-2" onClick={() => dispatch(toggleDialog('createCategory'))}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Create Category</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2" onClick={() => dispatch(toggleDialog('createDashboard'))}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Create Dashboard</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2" onClick={() => dispatch(toggleDialog('createSheet'))}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Add Sheet</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard items={navDashboard} />
        <NavMain items={navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  )
}
