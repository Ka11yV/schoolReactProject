import {
  Clock,
  BookmarkCheck,
  Plus,
  Trophy,
  Calendar,
  Award,
  Target,
} from "lucide-react";
import React from "react";

const iconMap = {
  clock: {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  check: {
    icon: BookmarkCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  plus: {
    icon: Plus,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  trophy: {
    icon: Trophy,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  target: {
    icon: Target,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  calendar: {
    icon: Calendar,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  award: {
    icon: Award,
    color: "text-gray-600",
    bg: "bg-purple-100",
  },
};

function Card({ title, value, iconType }) {
  const { icon: Icon, color, bg } = iconMap[iconType] || {};

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bg}`}>
            {Icon && <Icon className={`h-7 w-7 ${color}`} />}
          </div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
