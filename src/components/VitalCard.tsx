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
    <Card className={`${bgColor} border-0`}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`p-3 rounded-full ${iconColor}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">
              {value}
              <span className="text-lg text-muted-foreground ml-1">{unit}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">{status}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};