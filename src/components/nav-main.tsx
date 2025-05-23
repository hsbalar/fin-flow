'use client'

import { ChevronRight, LayoutDashboardIcon, type LucideIcon } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { setActiveSheet } from '@/state/reducers/sheet'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Sheet } from '@/models'

export function NavMain({
  items,
}: {
  items: {
    id: string
    name: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: Sheet[]
  }[]
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (sheet: Sheet) => {
    dispatch(setActiveSheet(sheet))
    navigate(`/sheet`)
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Category</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.id} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.name}>
                <span>{item.name}</span>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.id}>
                          <SidebarMenuSubButton onClick={() => handleClick(subItem)}>
                            <span>{subItem.name}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
