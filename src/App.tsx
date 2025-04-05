
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExpenseLayout } from "@/components/layout/ExpenseLayout";
import Dashboard from "@/pages/Dashboard";
import ExpensesPage from "@/pages/ExpensesPage";
import AddExpensePage from "@/pages/AddExpensePage";
import EditExpensePage from "@/pages/EditExpensePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<ExpenseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/add" element={<AddExpensePage />} />
            <Route path="/edit/:id" element={<EditExpensePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
