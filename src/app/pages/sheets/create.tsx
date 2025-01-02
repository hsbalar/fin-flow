import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toggleDialog } from '@/state/reducers/app'

export function DialogDemo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dialog } = useSelector((state: any) => state.app)
  const dispatch = useDispatch()

  return (
    <Dialog open={dialog.createSheet} onOpenChange={() => dispatch(toggleDialog('createSheet'))}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Sheet</DialogTitle>
          <DialogDescription>Create new sheet. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => dispatch(toggleDialog('createSheet'))}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
