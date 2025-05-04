import { Button } from '@/components/ui/button'
import { Plus, LayoutDashboard } from 'lucide-react'

function EmptyDashboardPlaceholder({
  dashboardName,
  onCreateCard,
}: {
  dashboardName?: string
  onCreateCard: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-6 text-center">
      <div className="bg-background border border-dashed border-primary/20 rounded-2xl p-8 max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 text-primary p-4 rounded-full">
            <LayoutDashboard className="h-12 w-12 stroke-[1.5]" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            {dashboardName ? `${dashboardName} is Empty` : 'Your Dashboard is Empty'}
          </h2>
          <p className="text-muted-foreground mb-6">
            Start tracking your financial insights by adding your first card. Visualize your data, set goals, and gain
            deeper understanding.
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={onCreateCard}
            className="flex items-center gap-2 mx-auto cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            Add First Card
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EmptyDashboardPlaceholder
