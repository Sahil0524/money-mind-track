
import React from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Card } from "@/components/ui/card";

const AddExpensePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Add Expense</h1>
        <p className="text-muted-foreground">
          Create a new expense entry to track your spending.
        </p>
      </div>
      
      <Card className="mx-auto max-w-lg p-6">
        <ExpenseForm />
      </Card>
    </div>
  );
};

export default AddExpensePage;
