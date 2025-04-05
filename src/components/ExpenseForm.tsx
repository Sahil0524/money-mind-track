
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expense, ExpenseCategory, useExpenses } from "@/context/ExpenseContext";
import { getCategoryName } from "./ExpenseCategoryIcon";
import { useNavigate } from "react-router-dom";

const expenseFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  amount: z.coerce
    .number()
    .min(0.01, { message: "Amount must be greater than 0." }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please provide a valid date in YYYY-MM-DD format.",
  }),
  category: z.enum([
    "food",
    "transportation",
    "housing",
    "utilities",
    "entertainment",
    "healthcare",
    "personal",
    "education",
    "shopping",
    "other",
  ] as const),
});

type ExpenseFormData = z.infer<typeof expenseFormSchema>;

interface ExpenseFormProps {
  expenseToEdit?: Expense;
}

export function ExpenseForm({ expenseToEdit }: ExpenseFormProps) {
  const { addExpense, updateExpense } = useExpenses();
  const navigate = useNavigate();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: expenseToEdit
      ? {
          title: expenseToEdit.title,
          amount: expenseToEdit.amount,
          date: expenseToEdit.date,
          category: expenseToEdit.category,
        }
      : {
          title: "",
          amount: 0,
          date: new Date().toISOString().split("T")[0],
          category: "other",
        },
  });

  const onSubmit = (data: ExpenseFormData) => {
    if (expenseToEdit) {
      updateExpense(expenseToEdit.id, data);
    } else {
      addExpense(data);
    }
    navigate("/expenses");
  };

  const categories: ExpenseCategory[] = [
    "food",
    "transportation",
    "housing",
    "utilities",
    "entertainment",
    "healthcare",
    "personal",
    "education",
    "shopping",
    "other",
  ];

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

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {getCategoryName(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/expenses")}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
