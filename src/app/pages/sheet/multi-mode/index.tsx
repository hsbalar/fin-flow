import { useSelector, useDispatch } from 'react-redux'
import { Plus } from 'lucide-react'
import { RootState } from '@/state/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from 'react'
import { addColumn } from '@/state/reducers/sheet'
import { getUniqueId } from '@/lib/utils'

import DataTable from './data-table'
import { Column } from '../../model'

export default function MultiMode() {
  const dispatch = useDispatch()
  const { id, columns } = useSelector((state: RootState) => state.sheet.activeSheet)
  const records = useSelector((state: RootState) => state.sheet.records)
  const [activeTab, setActiveTab] = useState(columns[0]?.id)

  const handleTabChange = (value: string) => {
    if (value === 'new') {
      const columnId = getUniqueId()
      dispatch(addColumn({ 
        sheetId: id, 
        column: { 
          id: columnId, 
          name: `Column ${columns.length + 1}` 
        } 
      }))
      setActiveTab(columnId)
    } else {
      setActiveTab(value)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full justify-start overflow-x-auto whitespace-nowrap scrollbar-hide">
          {columns.map((column: Column) => (
            <TabsTrigger key={column.id} value={column.id}>
              {column.name}
            </TabsTrigger>
          ))}
          <TabsTrigger value="new" className="gap-2">
            <Plus className="h-4 w-4" />
            New Column
          </TabsTrigger>
        </TabsList>
        {columns.map((column: Column) => (
          <TabsContent key={column.id} value={column.id}>
            <DataTable data={records[id][column.id] || []} columnId={column.id} sheetId={id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
