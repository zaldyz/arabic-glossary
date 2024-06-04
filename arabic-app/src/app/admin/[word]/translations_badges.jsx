import { Badge } from "@/components/ui/badge";

export default function Translation({ translation }) {
  return (
    <div className="flex gap-2">
      {translation.map((translation) => (
        <Badge key={translation} variant="secondary">
          {translation}
        </Badge>
      ))}
    </div>
  );
}
