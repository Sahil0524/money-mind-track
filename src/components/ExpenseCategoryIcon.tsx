
import React from "react";
import { ExpenseCategory } from "@/context/ExpenseContext";
import { 
  ShoppingBag, 
  Car, 
  Home, 
  Lightbulb, 
  Film, 
  Heart, 
  User,
  GraduationCap, 
  ShoppingCart, 
  HelpCircle 
} from "lucide-react";

interface ExpenseCategoryIconProps {
  category: ExpenseCategory;
  className?: string;
  size?: number;
}

export const ExpenseCategoryIcon: React.FC<ExpenseCategoryIconProps> = ({
  category,
  className,
  size = 20,
}) => {
  const getIcon = () => {
    switch (category) {
      case "food":
        return <ShoppingBag size={size} className={className} />;
      case "transportation":
        return <Car size={size} className={className} />;
      case "housing":
        return <Home size={size} className={className} />;
      case "utilities":
        return <Lightbulb size={size} className={className} />;
      case "entertainment":
        return <Film size={size} className={className} />;
      case "healthcare":
        return <Heart size={size} className={className} />;
      case "personal":
        return <User size={size} className={className} />;
      case "education":
        return <GraduationCap size={size} className={className} />;
      case "shopping":
        return <ShoppingCart size={size} className={className} />;
      case "other":
      default:
        return <HelpCircle size={size} className={className} />;
    }
  };

  return getIcon();
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  switch (category) {
    case "food":
      return "bg-orange-500";
    case "transportation":
      return "bg-blue-500";
    case "housing":
      return "bg-purple-500";
    case "utilities":
      return "bg-yellow-500";
    case "entertainment":
      return "bg-pink-500";
    case "healthcare":
      return "bg-red-500";
    case "personal":
      return "bg-indigo-500";
    case "education":
      return "bg-green-500";
    case "shopping":
      return "bg-teal-500";
    case "other":
    default:
      return "bg-gray-500";
  }
};

export const getCategoryLightColor = (category: ExpenseCategory): string => {
  switch (category) {
    case "food":
      return "bg-orange-100 text-orange-600";
    case "transportation":
      return "bg-blue-100 text-blue-600";
    case "housing":
      return "bg-purple-100 text-purple-600";
    case "utilities":
      return "bg-yellow-100 text-yellow-600";
    case "entertainment":
      return "bg-pink-100 text-pink-600";
    case "healthcare":
      return "bg-red-100 text-red-600";
    case "personal":
      return "bg-indigo-100 text-indigo-600";
    case "education":
      return "bg-green-100 text-green-600";
    case "shopping":
      return "bg-teal-100 text-teal-600";
    case "other":
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const getCategoryName = (category: ExpenseCategory): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};
