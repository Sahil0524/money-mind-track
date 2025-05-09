
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExpenseCategory } from "@/context/ExpenseContext";
import { getCategoryName } from "../ExpenseCategoryIcon";
import { UseFormReturn } from "react-hook-form";
import { ExpenseFormData } from "@/utils/expenseFormSchema";

interface CategorySelectorProps {
  form: UseFormReturn<ExpenseFormData>;
  categories: ExpenseCategory[];
}

export function CategorySelector({ form, categories }: CategorySelectorProps) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
  );
}
