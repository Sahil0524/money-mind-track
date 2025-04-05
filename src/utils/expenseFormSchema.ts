
import { z } from "zod";
import { ExpenseCategory } from "@/context/ExpenseContext";

export const expenseFormSchema = z.object({
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

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;

export const getDefaultValues = (expenseToEdit?: any) => {
  return expenseToEdit
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
        category: "other" as ExpenseCategory,
      };
};

export const expenseCategories: ExpenseCategory[] = [
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
