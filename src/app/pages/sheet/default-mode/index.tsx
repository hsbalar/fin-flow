import { useSelector } from 'react-redux'
import { columns } from './columns'
import { DataTable } from './data-table'
import { RootState } from '@/state/store'

export default function DefaultMode() {
  const { id, columns: [column] } = useSelector((state: RootState) => state.sheet.activeSheet)
  const { id: columnId } = column
  const records = useSelector((state: RootState) => state.sheet.records)
  const tableData = records[id][columnId]

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tableData} />
    </div>
  )
}
