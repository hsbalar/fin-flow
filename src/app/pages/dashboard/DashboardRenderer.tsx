import { useDispatch, useSelector } from 'react-redux'
import { toggleDialog } from '@/state/reducers/app'
import EmptyDashboardPlaceholder from './EmptyDashboard'
import { RootState } from '@/state/store'
import { SectionCard } from '@/app/components/SectionCard'
import BarChart from '@/app/charts/BarChart'
import PieChart from '@/app/charts/PieChart'
import { aggregateSheetData, aggregateSheetDataForCharts } from '@/app/utils/aggregation'
import { Card, Sheet } from '@/models'

function DashboardRenderer() {
  const dispatch = useDispatch()
  const { activeDashboard } = useSelector((state: RootState) => state.app)
  const { cards } = useSelector((state: RootState) => state.card)
  const { sheets, records } = useSelector((state: RootState) => state.sheet)

  const handleCreateCard = () => {
    dispatch(toggleDialog('createCard'))
  }

  const dashboardCards = cards.filter((card: Card) => card.dashboardId === activeDashboard?.id)
  const dashboardCardsTypeSection = dashboardCards.filter((card: Card) => card.type === 'Section')
  const dashboardCardsTypeChart = dashboardCards.filter((card: Card) => card.type === 'Chart')

  const renderSectionCard = (card: Card) => {
    const cardSheets = sheets.filter((sheet: Sheet) => {
      return card.sheetIds.includes(sheet.categoryId) || card.sheetIds.includes(sheet.id)
    })
    const total = aggregateSheetData(cardSheets, records)
    return <SectionCard cardInfo={card} value={total} />
  }

  const renderChartCard = (card: Card) => {
    const cardSheets = sheets.filter((sheet: Sheet) => {
      return card.sheetIds.includes(sheet.categoryId) || card.sheetIds.includes(sheet.id)
    })
    const data = aggregateSheetDataForCharts(cardSheets, records)
    if (card.config?.chartType === 'Pie' || card.config?.chartType === 'PieDonut') {
      return <PieChart data={data} cardInfo={card} />
    }
    return <BarChart data={data} cardInfo={card} />
  }

  if (dashboardCards.length === 0) {
    return <EmptyDashboardPlaceholder dashboardName={activeDashboard?.name} onCreateCard={handleCreateCard} />
  }

  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-4">
        {dashboardCardsTypeSection.map((card: Card) => renderSectionCard(card))}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {dashboardCardsTypeChart.map((card: Card) => renderChartCard(card))}
        </div>
      </div>
    </>
  )
}

export default DashboardRenderer
