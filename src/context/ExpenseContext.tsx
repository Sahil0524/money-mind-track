
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

// Define types
export type ExpenseCategory = 
  | "food" 
  | "transportation" 
  | "housing" 
  | "utilities" 
  | "entertainment" 
  | "healthcare" 
  | "personal" 
  | "education" 
  | "shopping" 
  | "other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  totalExpenses: number;
  expensesByCategory: Record<ExpenseCategory, number>;
  recentExpenses: Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Sample data
const sampleExpenses: Expense[] = [
  {
    id: "1",
    title: "Grocery shopping",
    amount: 85.97,
    date: "2025-04-02",
    category: "food",
  },
  {
    id: "2",
    title: "Electric bill",
    amount: 120.50,
    date: "2025-04-01",
    category: "utilities",
  },
  {
    id: "3",
    title: "Movie tickets",
    amount: 32.00,
    date: "2025-03-28",
    category: "entertainment",
  },
  {
    id: "4",
    title: "Gas",
    amount: 45.75,
    date: "2025-03-27",
    category: "transportation",
  },
  {
    id: "5",
    title: "Internet bill",
    amount: 65.00,
    date: "2025-03-25",
    category: "utilities",
  },
  {
    id: "6",
    title: "Dinner out",
    amount: 72.30,
    date: "2025-03-24",
    category: "food",
  },
  {
    id: "7",
    title: "New shoes",
    amount: 89.99,
    date: "2025-03-22",
    category: "shopping",
  },
];

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load initial data
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      setExpenses(sampleExpenses);
      localStorage.setItem("expenses", JSON.stringify(sampleExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  // Add a new expense
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    
    setExpenses((prev) => [newExpense, ...prev]);
    toast({
      title: "Expense added",
      description: `${expense.title} ($${expense.amount.toFixed(2)}) was added successfully.`,
    });
  };

  // Update an existing expense
  const updateExpense = (id: string, expense: Omit<Expense, "id">) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...expense, id } : item))
    );
    toast({
      title: "Expense updated",
      description: `${expense.title} was updated successfully.`,
    });
  };

  // Delete an expense
  const deleteExpense = (id: string) => {
    const expenseToDelete = expenses.find((e) => e.id === id);
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    
    if (expenseToDelete) {
      toast({
        title: "Expense deleted",
        description: `${expenseToDelete.title} was deleted successfully.`,
      });
    }
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  // Get recent expenses (last 5)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        totalExpenses,
        expensesByCategory,
        recentExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use the expense context
export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};
