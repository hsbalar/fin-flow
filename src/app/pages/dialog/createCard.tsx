import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { RootState } from '@/state/store'
import { ICategory, toggleDialog } from '@/state/reducers/app'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { TreeSelect } from '@/app/components/tree-select/tree-select'
import { createCard } from '@/state/reducers/card'

const cardFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'Card name must be at least 2 characters.' })
      .max(50, { message: 'Card name must be less than 50 characters.' })
      .refine((value) => value.replace(/\s/g, '').length > 0, {
        message: 'Card name cannot be only whitespace.',
      }),
    type: z.enum(['Section', 'Chart'], {
      errorMap: () => ({ message: 'Please select a card type' }),
    }),
    sheet: z.array(z.string()).min(1, { message: 'Please select at least one sheet' }),
    chartType: z.enum(['Bar', 'Pie']).optional(),
  })
  .refine(
    (data) => {
      // Conditional validation
      if (data.type === 'Chart') {
        return !!data.sheet && !!data.chartType
      }
      return true
    },
    {
      message: 'Sheet and Chart Type are required for Chart cards',
      path: ['sheet'],
    }
  )

export default function CreateCardDialog() {
  const dispatch = useDispatch()
  const { createCard: isOpen } = useSelector((state: RootState) => state.app.dialog)

  const { sheets } = useSelector((state: RootState) => state.sheet)
  const { categories, activeDashboard } = useSelector((state: RootState) => state.app)

  const sheetTreeData = categories
    .map((category: ICategory) => ({
      name: category.name,
      value: category.id,
      children: sheets
        .filter((sheet: any) => sheet.categoryId === category.id)
        .map((sheet: any) => ({
          name: sheet.name,
          value: sheet.id,
        })),
    }))
    .filter((category: any) => category.children.length > 0)

  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      name: '',
      type: 'Section',
      sheet: [],
      chartType: undefined,
    },
  })

  const cardType = form.watch('type')

  const onSubmit = (values: z.infer<typeof cardFormSchema>) => {
    dispatch(createCard({ ...values, dashboardId: activeDashboard?.id }))
    dispatch(toggleDialog('createCard'))
    form.reset()
  }

  const handleClose = () => {
    dispatch(toggleDialog('createCard'))
    form.reset()
  }

  useEffect(() => {
    return () => {
      setTimeout(() => {
        document.body.style.removeProperty('pointer-events')
      }, 1500)
    }
  }, [])

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose()
        }
      }}
      direction="right"
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New Card</DrawerTitle>
            <DrawerDescription>Set the card details</DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 p-4 space-y-4 overflow-y-auto">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter card name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select card type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Section">Section</SelectItem>
                        <SelectItem value="Chart">Chart</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {cardType === 'Chart' && (
                <FormField
                  control={form.control}
                  name="chartType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chart Type</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select chart type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bar">Bar Chart</SelectItem>
                          <SelectItem value="Pie">Pie Chart</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="sheet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Sheet</FormLabel>
                    <FormControl>
                      <TreeSelect
                        className="w-full"
                        data={sheetTreeData}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">Create Card</Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
