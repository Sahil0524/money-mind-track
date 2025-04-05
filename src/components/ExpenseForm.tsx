
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Expense, useExpenses } from "@/context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { CategorySelector } from "./expense/CategorySelector";
import { FormActions } from "./expense/FormActions";
import { 
  expenseFormSchema, 
  ExpenseFormData, 
  getDefaultValues, 
  expenseCategories 
} from "@/utils/expenseFormSchema";

interface ExpenseFormProps {
  expenseToEdit?: Expense;
}

export function ExpenseForm({ expenseToEdit }: ExpenseFormProps) {
  const { addExpense, updateExpense } = useExpenses();
  const navigate = useNavigate();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: getDefaultValues(expenseToEdit),
  });

  const onSubmit = (data: ExpenseFormData) => {
    const expenseData: Omit<Expense, "id"> = {
      title: data.title,
      amount: data.amount,
      date: data.date,
      category: data.category,
    };
    
    if (expenseToEdit) {
      updateExpense(expenseToEdit.id, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigate("/expenses");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Expense title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CategorySelector form={form} categories={expenseCategories} />

        <FormActions isEditing={!!expenseToEdit} />
      </form>
    </Form>
  );
}
