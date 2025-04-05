
import React from "react";
import { ExpenseStats } from "@/components/ExpenseStats";
import { RecentExpenses } from "@/components/RecentExpenses";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your expense statistics and recent activity.
        </p>
      </div>
      
      <ExpenseStats />
      
      <RecentExpenses />
    </div>
  );
};

export default Dashboard;
