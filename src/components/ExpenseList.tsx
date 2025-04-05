
import React, { useState } from "react";
import { useExpenses, Expense, ExpenseCategory } from "@/context/ExpenseContext";
import { ExpenseCategoryIcon, getCategoryLightColor, getCategoryName } from "./ExpenseCategoryIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PencilIcon, Trash2Icon, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ExpenseList() {
  const { expenses, deleteExpense } = useExpenses();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ExpenseCategory | "all">("all");

  // Filter expenses based on search term and category filter
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort expenses by date, most recent first
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleEdit = (expense: Expense) => {
    navigate(`/edit/${expense.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categories: (ExpenseCategory | "all")[] = [
    "all",
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select
            value={categoryFilter}
            onValueChange={(value) => setCategoryFilter(value as ExpenseCategory | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : getCategoryName(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => navigate("/add")}>Add Expense</Button>
        </div>
      </div>

      {sortedExpenses.length > 0 ? (
        <div className="space-y-4">
          {sortedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="expense-card animate-fade-in p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${getCategoryLightColor(expense.category)}`}>
                    <ExpenseCategoryIcon category={expense.category} size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">{expense.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{getCategoryName(expense.category)}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">${expense.amount.toFixed(2)}</p>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(expense)}
                      className="h-8 w-8"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this expense? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteExpense(expense.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <p className="mb-4 text-lg font-medium">No expenses found</p>
          <p className="text-muted-foreground">
            {searchTerm || categoryFilter !== "all"
              ? "Try changing your search or filter criteria"
              : "Add your first expense to get started"}
          </p>
          {!searchTerm && categoryFilter === "all" && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/add")}
            >
              Add Expense
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
