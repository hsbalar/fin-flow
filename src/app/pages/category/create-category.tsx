import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { toggleDialog, createCategory } from '@/state/reducers/app'

export function CreateCategoryDialog() {
  const { dialog } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const [categoryName, setCategoryName] = useState('')

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }
  const handleClose = () => {
    dispatch(toggleDialog('createCategory'))
  }
  const handleCreate = () => {
    dispatch(createCategory(categoryName))
  }

  return (
    <Dialog open={dialog.createCategory} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Add a new category like assets, liabilities, expenses, etc.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="categoryName" className="sr-only">
              Category Name
            </Label>
            <Input id="categoryName" value={categoryName} onChange={handleCategoryNameChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleCreate()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
