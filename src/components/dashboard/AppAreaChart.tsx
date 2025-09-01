'use client'

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

// const chartConfig = {
//     desktop: {
//       label: "Desktop",
//       color: "var(--chart-2)",
//     },
//     mobile: {
//       label: "Mobile",
//       color: "var(--chart-1)",
//     },
//   } satisfies ChartConfig

// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 310, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
    orders: {
        label: "Orders",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig


//-- Funcion para agrupar órdenes por mes.
function getOrdersByMonth(orders: any[]) {
    const map = new Map<string, number>();
    orders.forEach((order) => {
        if (order.isPaid && order.paidAt) {
            const date = new Date(order.paidAt);
            const month = date.toLocaleString("en-US", { month: "long" }); 
            map.set(month, (map.get(month) ?? 0) + 1);
        }
    });
    return Array.from(map, ([month, total]) => ({ month, orders: total }));
}

interface Props {
    orders: any;
    totalOrders: number;
}

export const AppAreaChart = ({orders, totalOrders}: Props) => {

    const chartData = getOrdersByMonth(orders);

    return (
        <div>
            <h1 className="font-medium mb-6 text-xl">Total Sales Confirmed <span className="font-bold text-2xl border px-2 rounded-lg">{totalOrders}</span></h1>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <AreaChart accessibilityLayer data={chartData}>

                    <CartesianGrid vertical={false} />

                    <XAxis 
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />

                    <YAxis 
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />

                    {/* hover Tooltip */}
                    <ChartTooltip content={<ChartTooltipContent indicator="dot"/>}/>
                    <ChartLegend content={<ChartLegendContent />} />

                    <defs>
                        <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop
                            offset="5%"
                            stopColor="var(--chart-1)"
                            stopOpacity={0.8}
                            />
                            <stop
                            offset="95%"
                            stopColor="var(--chart-1)"
                            stopOpacity={0.1}
                            />
                        </linearGradient>
                        {/* <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop
                            offset="5%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.8}
                            />
                            <stop
                            offset="95%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.1}
                            />
                        </linearGradient> */}
                    </defs>

                    {/* <Area
                        dataKey="mobile"
                        type="natural"
                        fill="url(#fillMobile)"
                        fillOpacity={0.4}
                        stroke="var(--color-mobile)"
                        stackId="a"
                    /> */}

                    {/* <Area
                        dataKey="desktop"
                        type="natural"
                        fill="url(#fillDesktop)"
                        fillOpacity={0.4}
                        stroke="var(--color-desktop)"
                        stackId="a"
                    /> */}

                    <Area
                        dataKey="orders"
                        type="natural"
                        fill="url(#fillOrders)"
                        fillOpacity={0.4}
                        stroke="var(--color-orders)"
                        stackId="a"
                    />
                
                </AreaChart>
            </ChartContainer>
        </div>
    )
}
