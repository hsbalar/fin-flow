import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toggleDialog } from '@/state/reducers/app'
import { RootState } from '@/state/store'
import { addSheet } from '@/state/reducers/sheet'

const CreateSheet = () => {
  const { dialog } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  const handleSave = () => {
    dispatch(addSheet({ name, description }))
  }
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
            <Input id="name" value={name} className="col-span-3" onChange={handleNameChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input id="username" value={description} className="col-span-3" onChange={handleDescriptionChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleSave()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSheet
