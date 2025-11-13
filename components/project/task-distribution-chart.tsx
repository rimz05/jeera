"use client";

import { Pie, PieChart, Label } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

// Define the tasks prop type
interface TaskDistributionProps {
  tasks: {
    completed: number;
    inProgress: number;
    overdue: number;
    todo: number;
    total: number;
  };
}

// Fix chartConfig: `satisfies` must be at the end of the object
const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "oklch(0.6 0.118 184.704)",
  },
  inProgress: {
    label: "In Progress",
    color: "oklch(0.398 0.07 227.392)",
  },
  overdue: {
    label: "Overdue",
    color: "oklch(0.646 0.222 41.116)",
  },
  todo: {
    label: "To Do",
    color: "oklch(0.828 0.189 84.429)",
  },
} satisfies ChartConfig;


export const TaskDistributionCard = ({ tasks }: TaskDistributionProps) => {
  const data = [
    {
      name: "Completed",
      value: tasks.completed,
      fill: chartConfig.completed.color,
    },
    {
      name: "In Progress",
      value: tasks.inProgress,
      fill: chartConfig.inProgress.color,
    },
    {
      name: "To Do",
      value: tasks.todo,
      fill: chartConfig.todo.color,
    },
    {
      name: "Overdues",
      value: tasks.overdue,
      fill: chartConfig.overdue.color,
    },
    
  ].filter((item) => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
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
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
            <Label
                content={({ viewBox }) => {
                    // Type guard: ensure viewBox has cx and cy
                    if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox &&
                    typeof viewBox.cx === "number" &&
                    typeof viewBox.cy === "number"
                    ) {
                    return (
                        <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        >
                        <tspan
                            x={viewBox.cx}
                            y={viewBox.cy - 10}
                            className="fill-foreground text-3xl font-bold"
                        >
                            {tasks.total.toLocaleString()}
                        </tspan>
                        <tspan
                            x={viewBox.cx}
                            y={viewBox.cy + 24}
                            className="fill-muted-foreground"
                        >
                            Tasks
                        </tspan>
                        </text>
                    );
                    }
                    return null; // Return nothing if viewBox is invalid
                }}
            />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="justify-center">
        <div className="text-muted-foreground text-center">
          Showing total task count for the project
        </div>
      </CardFooter>
    </Card>
  );
};