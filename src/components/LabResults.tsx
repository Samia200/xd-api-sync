import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

interface LabResultItem {
  name: string;
}

interface LabResultsProps {
  labResults: LabResultItem[];
}

export const LabResults = ({ labResults }: LabResultsProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">Lab Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {labResults.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
            <span className="font-medium text-sm">{item.name}</span>
            <button className="p-2 hover:bg-background/50 rounded transition-colors">
              <Download className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};