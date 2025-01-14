import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { toggleDialog } from '@/state/reducers/app'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { setActiveSheet, Sheet } from '@/state/reducers/sheet'

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const dispatch = useDispatch()
  const { sheets, activeSheet } = useSelector((state: RootState) => state.sheet)
  const navigate = useNavigate()

  const handleSetActiveTeam = (sheet: Sheet) => {
    dispatch(setActiveSheet(sheet))
    navigate('/sheet')
  }

  return (
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
                <span className="truncate font-semibold">{activeSheet ? activeSheet.name : 'Create sheet'}</span>
                {/* <span className="truncate text-xs">Test</span> */}
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
            <DropdownMenuLabel className="text-xs text-muted-foreground">Sheets</DropdownMenuLabel>
            {sheets.map((sheet: Sheet) => (
              <DropdownMenuItem key={sheet.name} onClick={() => handleSetActiveTeam(sheet)} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <GalleryVerticalEnd className="size-4 shrink-0" />
                </div>
                {sheet.name}
              </DropdownMenuItem>
            ))}
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
  )
}
