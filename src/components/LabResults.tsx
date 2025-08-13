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
    <Card>
      <CardHeader>
        <CardTitle>Lab Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {labResults.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="font-medium">{item.name}</span>
            <button className="p-2 hover:bg-muted rounded">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};