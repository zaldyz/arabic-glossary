import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

const getWord = async (id) => {
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection.findOne({ _id: ObjectId.createFromHexString(id) });
};

export default async function AdminWord({ id }) {
  const word = await getWord(id);
  return (
    <div className="flex-1 space-y-1 p-4">
      <p className="text-5xl font-medium leading-none">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button>{word.arabic}</button>
          </HoverCardTrigger>
          <HoverCardContent className="w-50">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground pr-1">
                    pronounced as
                  </span>
                  {word.pronounciation}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </p>
      {/* <p className="text-sm text-muted-foreground">Badges go here</p> */}
      <div className="flex gap-2 py-0.5">
        Translation:
        {word.translation.map((translation) => (
          <Badge key={translation} variant="secondary">
            {translation}
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 py-0.5">
        Gender:
        <Badge
          variant={
            word.gender == "Masculine"
              ? "blue"
              : word.gender == "Feminine"
              ? "pink"
              : "outline"
          }
        >
          {word.gender ? word.gender : "Neutral"}
        </Badge>
      </div>
      <div className="flex gap-2 py-0.5">
        Tags:
        {word.tags.map((tag) => (
          <Badge variant="secondary">{tag}</Badge>
        ))}
      </div>
      <div className="flex gap-2 py-0.5">
        Root Word:
        {word.root_word && <Badge variant="secondary">{word.root_word}</Badge>}
      </div>
      <div className="flex gap-2 py-0.5">
        Similar Words:
        {word.similar_words.map((similar_word) => (
          <Badge variant="secondary">{similar_word}</Badge>
        ))}
      </div>
    </div>
  );
}
