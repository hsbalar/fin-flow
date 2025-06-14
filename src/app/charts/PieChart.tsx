import { TrendingUp } from 'lucide-react'
import { Pie, PieChart, Cell, Label, LabelList, PieLabel } from 'recharts'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Record, Card as CardModel } from '@/models'
import getColor from '@/lib/getColor'

const PieChartComponent = ({
  data,
  cardInfo,
  showLegend = false,
  type = 'pieWithLabel',
}: {
  data: Record[]
  cardInfo: CardModel
  type?: string
  showLegend?: boolean
}) => {
  const chartColors = data.map((_, index) => getColor(index, data.length))

  const chartConfig: ChartConfig = Object.fromEntries(
    data.map((item, index) => [
      item.name,
      {
        label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        color: `hsl(${chartColors[index]})`,
      },
    ])
  )

  const chartData = data.map((item) => ({ name: item.name, value: Number(item.value) }))

  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  const pieProps = {
    dataKey: 'value',
    ...(type === 'pieWithLabel' ? { label: true } : {}),
    ...(type === 'pieDonutWithLabel' ? { nameKey: 'name', innerRadius: 60, strokeWidth: 5 } : {}),
  }
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{cardInfo.name}</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} {...pieProps}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartConfig[entry.name]?.color || 'var(--chart-1)'} />
              ))}
              {type === 'pieWithLabel' && (
                <LabelList
                  dataKey="name"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                />
              )}
              {type === 'pieDonutWithLabel' && (
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {total}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Total
                          </tspan>
                        </text>
                      )
                    }
                    return null
                  }}
                />
              )}
            </Pie>
            {showLegend && (
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}

export default PieChartComponent
