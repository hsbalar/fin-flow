import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { DataTable } from './default-mode/table'
import data from './default-mode/data.json'

export default function Sheet() {
  const { isMulti } = useSelector((state: RootState) => state.sheet.activeSheet)

  return (
    <>
      <DataTable data={data} />
    </>
  )
}
