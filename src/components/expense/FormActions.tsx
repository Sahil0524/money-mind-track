
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  isEditing: boolean;
}

export function FormActions({ isEditing }: FormActionsProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex gap-4">
      <Button type="submit" className="flex-1">
        {isEditing ? "Update Expense" : "Add Expense"}
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
  );
}
