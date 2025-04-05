
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExpenses } from "@/context/ExpenseContext";
import { ExpenseCategoryIcon, getCategoryLightColor, getCategoryName } from "./ExpenseCategoryIcon";
import { useNavigate } from "react-router-dom";

export function RecentExpenses() {
  const { recentExpenses } = useExpenses();
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Expenses</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate("/expenses")}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/10"
                onClick={() => navigate(`/edit/${expense.id}`)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-1.5 ${getCategoryLightColor(
                      expense.category
                    )}`}
                  >
                    <ExpenseCategoryIcon category={expense.category} size={16} />
                  </div>
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(expense.date)} • {getCategoryName(expense.category)}
                    </p>
                  </div>
                </div>
                <p className="font-medium">${expense.amount.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              No recent expenses
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
