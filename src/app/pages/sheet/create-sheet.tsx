import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import { ICategory, toggleDialog } from '@/state/reducers/app'
import { RootState } from '@/state/store'
import { addSheet } from '@/state/reducers/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CreateSheet = () => {
  const { dialog, categories } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isMulti, setMulti] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  const handleSave = () => {
    dispatch(addSheet({ name, description, isMulti, categoryId: selectedCategory }))
    dispatch(toggleDialog('createSheet'))
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
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select value={selectedCategory} onValueChange={(id: string) => setSelectedCategory(id)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: ICategory) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="terms" className="col-span-3">
              <Checkbox id="terms" checked={isMulti} onCheckedChange={(checked) => setMulti(checked as boolean)} />
              &nbsp;&nbsp;Multi Column
            </Label>
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
