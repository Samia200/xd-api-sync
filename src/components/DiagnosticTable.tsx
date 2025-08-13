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
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under observation':
        return 'text-status-warning';
      case 'cured':
        return 'text-status-normal';
      case 'inactive':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnostic List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Problem/Diagnosis</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {diagnostics.map((item, index) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="py-4 px-4 font-medium">{item.name}</td>
                  <td className="py-4 px-4 text-muted-foreground">{item.description}</td>
                  <td className={`py-4 px-4 font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
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