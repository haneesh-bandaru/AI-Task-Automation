import React, { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Pie, PieChart } from "recharts";
import { assignedEmployees, notAssignedEmployees } from "@/services/Api";
import { Skeleton } from "./ui/skeleton";

function SkeletonComponent() {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-[150px] w-[150px] rounded-full" />
      </div>
    </div>
  );
}

const EmployeeChart = () => {
  const chartConfig = {
    visitors: {
      label: "Employees",
    },
    assigned: {
      label: "Assigned",
      color: "hsl(var(--chart-1))",
    },
    notAssigned: {
      label: "Not Assigned",
      color: "hsl(var(--chart-5))",
    },
  };

  const [assigned, setAssigned] = useState(0);
  const [notAssigned, setNotAssigned] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assignedResponse = await assignedEmployees();
        setAssigned(assignedResponse.data[0].assigned_to);
        const notAssignedResponse = await notAssignedEmployees();
        const val = notAssignedResponse.data[0].not_assigned_to;
        setNotAssigned(val);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = [
    { status: "Assigned", visitors: assigned, fill: "var(--color-assigned)" },
    {
      status: "Not Assigned",
      visitors: notAssigned,
      fill: "var(--color-notAssigned)",
    },
  ];

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <Card className="flex flex-col h-[300px] w-[300px]">
          <CardHeader className="items-center pb-0">
            <CardTitle>Status of the Employees</CardTitle>
            {/* <CardDescription>Number of employees assigned and not assigned</CardDescription> */}
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Employees
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeChart;
