import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { toggleDialog, createCategory } from '@/state/reducers/app'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  categoryName: z
    .string()
    .trim()
    .min(2, {
      message: 'Category name must be at least 2 characters.',
    })
    .refine((value) => value.replace(/\s/g, '').length > 0, {
      message: 'Category name cannot be only whitespace.',
    }),
})

export function CreateCategoryDialog() {
  const { dialog } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(toggleDialog('createCategory'))
    dispatch(createCategory(values.categoryName))
    form.reset()
  }

  const handleClose = () => {
    dispatch(toggleDialog('createCategory'))
    form.reset()
  }

  return (
    <Dialog open={dialog.createCategory} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Add a new category like assets, liabilities, expenses, etc.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
