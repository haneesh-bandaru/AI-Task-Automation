import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import API from "@/services/Api";

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))"
  },
  inprogress: {
    label: "In progress",
    color: "hsl(var(--chart-2))"
  }
};

const CustomXAxis = ({
  dataKey = "project",
  tickLine = false,
  tickMargin = 10,
  axisLine = false,
  tickFormatter = (value) => value.slice(0, 15)
}) => {
  return (
    <XAxis
      dataKey={dataKey}
      tickLine={tickLine}
      tickMargin={tickMargin}
      axisLine={axisLine}
      tickFormatter={tickFormatter}
    />
  );
};

const TasksCharts = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getProjectTaskStatus();
        const formattedData = response.data.map(project => ({
          project: project.project_name,
          completed: project.completed_count,
          inprogress: project.inprogress_count
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Tasks Status by each project</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-500">
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData} width={800} height={600}>
                  <CartesianGrid vertical={false} />
                  <CustomXAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="completed" fill="var(--color-completed)" radius={4} barSize={40} />
                  <Bar
                    dataKey="inprogress"
                    fill="var(--color-inprogress)"
                    radius={4}
                    barSize={40}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TasksCharts;
