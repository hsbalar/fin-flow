import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, toggleDialog } from '@/state/reducers/app'
import EmptyDashboardPlaceholder from './EmptyDashboard'
import { RootState } from '@/state/store'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { SectionCard } from '@/app/components/SectionCard'
import BarChart from '@/app/charts/BarChart'
import PieChart from '@/app/charts/PieChart'

function DashboardRenderer() {
  const dispatch = useDispatch()
  const { activeDashboard } = useSelector((state: RootState) => state.app)
  const { cards } = useSelector((state: RootState) => state.card)
  const { sheets, records } = useSelector((state: RootState) => state.sheet)

  const handleCreateCard = () => {
    dispatch(toggleDialog('createCard'))
  }

  const dashboardCards = cards.filter((card: any) => card.dashboardId === activeDashboard?.id)

  const renderSectionCard = (card: any) => {
    const cardSheets = sheets.filter((sheet: any) => card.sheet.includes(sheet.categoryId))
    let total = 0
    cardSheets.forEach((sheet: any) => {
      const sheetRecords = records[sheet.id] || {}
      Object.entries(sheetRecords).forEach(([_, columnData]) => {
        const columnTotal = (columnData as any[]).reduce((sum, column) => {
          return sum + (Number(column.value) || 0)
        }, 0)
        total += columnTotal
      })
    })

    return <SectionCard key={card.id} cardName={card.name} value={total} />
  }

  const renderChartCard = (card: any) => {
    const cardSheets = sheets.filter((sheet: any) => {
      return card.sheet.includes(sheet.categoryId) || card.sheet.includes(sheet.id)
    })
    let data: any = []
    console.log('cardSheets', cardSheets)
    cardSheets.forEach((sheet: any) => {
      const sheetRecords = records[sheet.id] || {}
      Object.entries(sheetRecords).forEach(([_, columnData]: any) => {
        data = [...data, ...columnData]
      })
    })
    console.log(data, card.chartType)
    if (card.chartType === 'Pie') {
      return <PieChart data={data} cardName={card.name} />
    }
    return <BarChart data={data} cardName={card.name} />
  }

  if (dashboardCards.length === 0) {
    return <EmptyDashboardPlaceholder dashboardName={activeDashboard?.name} onCreateCard={handleCreateCard} />
  }

  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-4">
        {dashboardCards.map((card: any) => (card.type === 'Section' ? renderSectionCard(card) : <></>))}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {dashboardCards.map((card: any) => (card.type === 'Chart' ? renderChartCard(card) : <></>))}
        </div>
      </div>
    </>
  )
}

export default DashboardRenderer
