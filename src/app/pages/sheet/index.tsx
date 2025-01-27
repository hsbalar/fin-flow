import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import DefaultMode from './default-mode'
import MultiMode from './multi-mode'

export default function Sheet() {
  const {isMulti} = useSelector((state: RootState) => state.sheet.activeSheet)
  
  return (
      <>
        {isMulti ? <MultiMode /> : <DefaultMode />}
      </>
  )
}
