import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { increment } from '@/state/reducers/count'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const count = useSelector((state: any) => state.count.count)
  const dispatch = useDispatch()
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{count}</div>
          <Button onClick={() => dispatch(increment())}>Incre</Button>
        </div>
      </ThemeProvider>
    </div>
  )
}
