import { useEffect } from 'react'
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
import { toggleDialog, createDashboard } from '@/state/reducers/app'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  dashboardName: z
    .string()
    .trim()
    .min(2, {
      message: 'Dashboard name must be at least 2 characters.',
    })
    .refine((value) => value.replace(/\s/g, '').length > 0, {
      message: 'Dashboard name cannot be only whitespace.',
    }),
})

function CreateDashboardDialog() {
  const { dialog } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dashboardName: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(toggleDialog('createDashboard'))
    dispatch(createDashboard(values.dashboardName))
    form.reset()
  }

  const handleClose = () => {
    dispatch(toggleDialog('createDashboard'))
    form.reset()
  }

  useEffect(() => {
    return () => {
      setTimeout(() => {
        document.body.style.removeProperty('pointer-events')
      }, 500)
    }
  }, [])

  return (
    <Dialog open={dialog.createDashboard} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Dashboard</DialogTitle>
          <DialogDescription>Add a new dashboard to track your financial insights.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dashboardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dashboard Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dashboard name" {...field} />
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

export default CreateDashboardDialog
