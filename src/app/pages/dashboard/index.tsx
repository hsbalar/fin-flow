import BarChart from '@/app/charts/BarChart'
import PieChart from '@/app/charts/PieChart'
import AreaInteractive from '@/app/charts/AreaInteractive'
import { SectionCard } from '@/app/components/SectionCard'

export default function Dashboard() {
  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-4">
        <SectionCard cardName="Total Revenue" value={125000} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <AreaInteractive />
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <PieChart />
          <BarChart />
        </div>
      </div>
    </>
  )
}
