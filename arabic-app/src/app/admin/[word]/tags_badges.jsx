import { Badge } from "@/components/ui/badge";

export default function Tags({ tags }) {
  return (
    <div className="flex gap-2">
      {tags.length ? (
        tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))
      ) : (
        <Badge variant="secondary">{"No Tags"}</Badge>
      )}
      {}
    </div>
  );
}
