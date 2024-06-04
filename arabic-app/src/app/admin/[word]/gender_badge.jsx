import { Badge } from "@/components/ui/badge";

export default function Gender({ gender }) {
  return (
    <div className="flex gap-2">
      <Badge
        variant={
          gender == "Masculine"
            ? "blue"
            : gender == "Feminine"
            ? "pink"
            : "outline"
        }
      >
        {gender ? gender : "Neutral"}
      </Badge>
    </div>
  );
}
