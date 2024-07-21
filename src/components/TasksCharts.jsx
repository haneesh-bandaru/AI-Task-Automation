import { useEffect, useState } from "react";
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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { getProjectTaskStatus } from "@/services/Api";

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
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjectTaskStatus();
        const formattedData = response.data.map((project) => ({
          project: project.project_name,
          completed: project.completed_count,
          inprogress: project.inprogress_count,
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching task status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Card className="h-[300px]">
        <CardHeader>
          <CardTitle>Tasks Status by each project</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                width={500}
                height={0}
              >
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
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="completed"
                  fill="var(--color-completed)"
                  radius={4}
                  height={100}
                />
                <Bar
                  dataKey="inprogress"
                  fill="var(--color-inprogress)"
                  radius={4}
                  barSize={50}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksCharts;
