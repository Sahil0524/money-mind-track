
import React from "react";
import { useExpenses, ExpenseCategory } from "@/context/ExpenseContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ExpenseCategoryIcon, getCategoryColor, getCategoryName } from "./ExpenseCategoryIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, DollarSign, TrendingUp } from "lucide-react";

export function ExpenseStats() {
  const { totalExpenses, expensesByCategory } = useExpenses();

  const pieChartData = Object.entries(expensesByCategory)
    .filter(([_, amount]) => amount > 0)
    .map(([category, amount]) => ({
      name: getCategoryName(category as ExpenseCategory),
      value: amount,
      category: category as ExpenseCategory,
    }));

  // Calculate top spending categories
  const topCategories = [...pieChartData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  // Colors for the pie chart
  const COLORS = [
    "#FF6384", // red-pink
    "#36A2EB", // blue
    "#FFCE56", // yellow
    "#4BC0C0", // teal
    "#9966FF", // purple
    "#FF9F40", // orange
    "#8DD1E1", // light blue
    "#EA80FC", // pink
    "#A5D6A7", // green
    "#E6EE9C", // lime
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg bg-white p-3 shadow-md">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary">${data.value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  // Format dollar amounts
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Expenses Card */}
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold">
                {formatCurrency(totalExpenses)}
              </div>
            </div>
            <div className="rounded-full bg-expense/10 px-2 py-1 text-xs font-medium text-expense">
              <ArrowUpIcon className="mr-1 inline-block h-3 w-3" />
              <span>4.3%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Average Expense Card */}
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Monthly Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-warning/10 p-2">
                <TrendingUp className="h-4 w-4 text-warning" />
              </div>
              <div className="text-2xl font-bold">{formatCurrency(2500)}</div>
            </div>
            <div className="rounded-full bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
              <ArrowDownIcon className="mr-1 inline-block h-3 w-3" />
              <span>{((totalExpenses / 2500) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart Card */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {pieChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[220px] items-center justify-center">
              <p className="text-muted-foreground">No expense data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Categories Card */}
      <Card className="col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Top Spending Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {topCategories.length > 0 ? (
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div
                  key={category.category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${getCategoryColor(
                        category.category
                      )} text-white`}
                    >
                      <ExpenseCategoryIcon
                        category={category.category}
                        className="h-4 w-4"
                      />
                    </div>
                    <span>{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {formatCurrency(category.value)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      (
                      {((category.value / totalExpenses) * 100).toFixed(1)}
                      %)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[120px] items-center justify-center">
              <p className="text-muted-foreground">No expense data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
