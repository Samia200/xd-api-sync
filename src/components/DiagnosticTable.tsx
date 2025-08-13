import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DiagnosticItem {
  name: string;
  description: string;
  status: string;
}

interface DiagnosticTableProps {
  diagnostics: DiagnosticItem[];
}

export const DiagnosticTable = ({ diagnostics }: DiagnosticTableProps) => {
  return (
    <Card className="border-0 shadow-sm bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">Diagnostic List</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="max-h-[220px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-muted/30 sticky top-0">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Problem/Diagnosis</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {diagnostics.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="py-4 px-6 font-medium text-sm">{item.name}</td>
                  <td className="py-4 px-6 text-muted-foreground text-sm">{item.description}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="text-foreground">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};