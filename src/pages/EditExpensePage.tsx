
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Card } from "@/components/ui/card";
import { useExpenses } from "@/context/ExpenseContext";

const EditExpensePage = () => {
  const { id } = useParams<{ id: string }>();
  const { expenses } = useExpenses();
  
  const expenseToEdit = id ? expenses.find((e) => e.id === id) : undefined;
  
  if (!expenseToEdit) {
    return <Navigate to="/expenses" replace />;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Edit Expense</h1>
        <p className="text-muted-foreground">
          Update the details of your expense.
        </p>
      </div>
      
      <Card className="mx-auto max-w-lg p-6">
        <ExpenseForm expenseToEdit={expenseToEdit} />
      </Card>
    </div>
  );
};

export default EditExpensePage;
