'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useDispatch } from 'react-redux'
import { addRecord, updateRecord } from '@/state/reducers/sheet'
import { useState, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.union([z.number(), z.string()]).transform((val) => {
    if (val === '') return ''
    return Number(val)
  }),
})

interface CreateRowProps {
  open: boolean
  handleClose: () => void
  mode?: 'create' | 'edit'
  editData?: {
    index: number
    name: string
    amount: number | string
  }
}

const CreateRow: React.FC<CreateRowProps> = ({ open, handleClose, mode = 'create', editData }) => {
  const [addAnother, setAddAnother] = useState(false)
  const dispatch = useDispatch()
  const date = new Date().toISOString().split('T')[0]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: '',
    },
  })

  useEffect(() => {
    if (mode === 'edit' && editData) {
      form.reset({
        name: editData.name,
        amount: editData.amount ? Number(editData.amount) : '',
      })
    }
  }, [mode, editData, form])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode === 'edit' && editData) {
      dispatch(
        updateRecord({
          index: editData.index,
          data: {
            ...values,
            date,
          },
        })
      )
      handleClose()
    } else {
      dispatch(addRecord({ name: values.name, amount: values.amount || 0, date }))
      if (!addAnother) {
        handleClose()
      }
      form.reset({
        name: '',
        amount: '',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add Record' : 'Edit Record'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === 'create' && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={addAnother}
                  onCheckedChange={(checked) => setAddAnother(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Add another record
                </label>
              </div>
            )}
            <DialogFooter>
              <Button type="submit">{mode === 'create' ? 'Submit' : 'Save changes'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRow
