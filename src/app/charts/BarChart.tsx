import { Bar, BarChart, CartesianGrid, LabelList, XAxis, XAxisProps, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card as CardModel, Record } from '@/models'

const chartConfig = {
  value: {
    label: 'Value',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function BarChartComponent({ data, cardInfo }: { data: Record[]; cardInfo: CardModel }) {
  const { layout, showLegend } = cardInfo.config || {}
  const axisProp = {
    tickLine: false,
    tickMargin: 10,
    axisLine: false,
    tickFormatter: (value: string) => value.slice(0, 3),
    ...(layout === 'vertical' && { hide: true }),
  }
  const xAxisProp: XAxisProps = {
    ...(layout === 'horizontal' && { dataKey: 'name', ...axisProp }),
    ...(layout === 'vertical' && { type: 'number', dataKey: 'value', hide: true }),
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardInfo.name}</CardTitle>
        {cardInfo.description && <CardDescription>{cardInfo.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout={layout}
            margin={{
              ...(layout === 'vertical' && { right: 16 }),
              ...(layout === 'horizontal' && { top: 20 }),
            }}
          >
            <CartesianGrid vertical={layout === 'vertical'} />
            <XAxis {...xAxisProp} />
            {layout === 'vertical' && <YAxis dataKey="name" type="category" {...axisProp} />}
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={4}>
              {layout === 'vertical' && (
                <LabelList
                  dataKey="name"
                  position="insideLeft"
                  offset={8}
                  stroke="none"
                  className="fill-background"
                  fontSize={12}
                />
              )}
              <LabelList
                dataKey="value"
                position={layout === 'vertical' ? 'right' : 'top'}
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
