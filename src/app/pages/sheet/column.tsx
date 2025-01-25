import { useSelector } from 'react-redux'
import { columns } from './default-mode/columns'
import { DataTable } from './default-mode/data-table'
import { RootState } from '@/state/store'

export default function DemoPage() {
  // Get active sheet and records from Redux store
  const activeSheet = useSelector((state: RootState) => state.sheet.activeSheet)
  const records = useSelector((state: RootState) => state.sheet.records)
  
  const tableData = records[activeSheet.id].default
  console.log("🚀 ~ file: index.tsx:9 ~ DemoPage ~ tableData:", tableData)
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tableData} />
    </div>
  )
}
