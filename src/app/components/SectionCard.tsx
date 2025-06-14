import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUpIcon } from 'lucide-react'

export function SectionCard({ cardInfo, value }: { cardInfo: any; value: number }) {
  const formattedValue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{cardInfo.name}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">{formattedValue}</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">Visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  )
}
