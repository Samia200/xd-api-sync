import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface VitalCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  unit: string;
  status: string;
  bgColor: string;
  iconColor: string;
}

export const VitalCard = ({ icon, title, value, unit, status, bgColor, iconColor }: VitalCardProps) => {
  return (
    <Card className={`${bgColor} border-0 rounded-xl`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${iconColor} bg-white/80`}>
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">
              {value}
              <span className="text-lg text-gray-600 ml-1">{unit}</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">{status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};