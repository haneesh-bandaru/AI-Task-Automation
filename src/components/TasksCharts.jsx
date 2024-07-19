import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  inprogress: {
    label: "In progress",
    color: "hsl(var(--chart-2))",
  },
};

const TasksCharts = () => {
  const chartData = [
    { project: "Project Alpha", completed: 186, inprogress: 80 },
    { project: "Project Beta", completed: 305, inprogress: 200 },
  ];

  return (
    <div>
      <Card className="h-[300px]">
        <CardHeader>
          <CardTitle>Tasks Status by each project</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="project"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 15)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="completed"
                fill="var(--color-completed)"
                radius={4}
              />
              <Bar
                dataKey="inprogress"
                fill="var(--color-inprogress)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksCharts;
