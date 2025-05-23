import { Outlet } from 'react-router'

import { ThemeProvider } from '@/components/theme-provider'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import Header from './Header'
import CreateSheetDialog from '../pages/dialog/createSheet'
import CreateCategoryDialog from '../pages/dialog/createCategory'
import CreateDashboardDialog from '../pages/dialog/createDashboard'
import CreateCardDialog from '../pages/dialog/createCard'

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <Outlet />
              </div>
            </div>
          </div>
        </SidebarInset>
        <CreateCardDialog />
        <CreateSheetDialog />
        <CreateCategoryDialog />
        <CreateDashboardDialog />
      </SidebarProvider>
    </ThemeProvider>
  )
}
