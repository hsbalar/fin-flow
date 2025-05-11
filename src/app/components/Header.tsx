import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { toggleDialog } from '@/state/reducers/app'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontalIcon, LayoutGridIcon, PieChartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RootState } from '@/state/store'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { activeDashboard } = useSelector((state: RootState) => state.app)
  const { activeSheet } = useSelector((state: RootState) => state.sheet)

  const handleAddCard = (cardType: 'Section' | 'Chart') => {
    dispatch(toggleDialog('createCard'))
  }

  const getCurrentRouteName = () => {
    const path = window.location.pathname

    if (path.startsWith('/dashboard') && activeDashboard) {
      return activeDashboard.name
    }

    if (path.startsWith('/sheet') && activeSheet) {
      return activeSheet.name
    }

    return ''
  }

  const currentRouteName = getCurrentRouteName()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-1 px-4 h-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" />
        <ThemeToggle />
        <Separator orientation="vertical" className="mr-1" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {currentRouteName && (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentRouteName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Add to Dashboard</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleAddCard('Section')}>
              <LayoutGridIcon className="mr-2 h-4 w-4" />
              <span>Section Card</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddCard('Chart')}>
              <PieChartIcon className="mr-2 h-4 w-4" />
              <span>Chart Card</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
