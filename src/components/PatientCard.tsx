import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

interface PatientCardProps {
  name: string;
  gender: string;
  age: number;
  profilePicture: string;
  isSelected?: boolean;
}

export const PatientCard = ({ name, gender, age, profilePicture, isSelected }: PatientCardProps) => {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
      isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-muted/30'
    }`}>
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback className="text-sm font-medium">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-foreground text-sm">{name}</p>
          <p className="text-sm text-muted-foreground">{gender}, {age}</p>
        </div>
      </div>
      <button className="p-1 hover:bg-muted rounded">
        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
};