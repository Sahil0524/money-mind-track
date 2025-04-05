
import React from "react";
import { ExpenseList } from "@/components/ExpenseList";

const ExpensesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">All Expenses</h1>
        <p className="text-muted-foreground">
          View and manage all your expenses in one place.
        </p>
      </div>
      
      <ExpenseList />
    </div>
  );
};

export default ExpensesPage;
