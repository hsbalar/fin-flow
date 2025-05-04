import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleDialog } from '@/state/reducers/app'
import EmptyDashboardPlaceholder from './EmptyDashboard'

interface DashboardRendererProps {
  dashboardId: string
  dashboardName?: string
  cards?: any[] // Replace 'any' with your actual card type when available
}

function DashboardRenderer({ dashboardId, dashboardName, cards = [] }: DashboardRendererProps) {
  const dispatch = useDispatch()

  const handleCreateCard = () => {
    dispatch(toggleDialog('createCard'))
  }

  if (cards.length === 0) {
    return <EmptyDashboardPlaceholder dashboardName={dashboardName} onCreateCard={handleCreateCard} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cards.map((card) => (
        <div key={card.id} className="bg-white shadow-md rounded-lg p-4">
          {/* Placeholder for individual card rendering */}
          <h3>{card.title}</h3>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardRenderer
