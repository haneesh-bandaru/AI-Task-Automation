import React, { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Legend, Pie, PieChart } from "recharts";
import { assignedEmployees } from "@/services/Api";
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
    employees: {
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
    let isMounted = true;
    const fetchData = async () => {
      try {
        const assignedResponse = await assignedEmployees();
        if (isMounted) {
          setAssigned(assignedResponse.data.Assigned);
          setNotAssigned(assignedResponse.data.NotAssigned);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching data:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const chartData = React.useMemo(
    () => [
      {
        status: "Assigned",
        employees: assigned,
        fill: "var(--color-assigned)",
      },
      {
        status: "Not Assigned",
        employees: notAssigned,
        fill: "var(--color-notAssigned)",
      },
    ],
    [assigned, notAssigned]
  );

  const totalEmployees = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.employees, 0);
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
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: "#000" }}>{value}</span>
                  )}
                />
                <Pie
                  data={chartData}
                  dataKey="employees"
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
                              {totalEmployees.toLocaleString()}
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
                      return null;
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
