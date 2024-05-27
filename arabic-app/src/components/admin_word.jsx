import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "./ui/badge";

const getWord = async (id) => {
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection.findOne({ _id: ObjectId.createFromHexString(id) });
};

export default async function AdminWord({ id }) {
  const word = await getWord(id);
  console.log(word);
  return (
    <Card className="w-[1000px]">
      <CardHeader>
        <CardTitle>Edit Word</CardTitle>
        <CardDescription>Edit the details of an arabic word.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
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
                <Badge variant="secondary">{translation}</Badge>
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
              {word.tag && <Badge variant="secondary">{word.tag}</Badge>}
            </div>
            <div className="flex gap-2 py-0.5">
              Root Word:
              {word.root_word && (
                <Badge variant="secondary">{word.root_word}</Badge>
              )}
            </div>
            <div className="flex gap-2 py-0.5">
              Similar Words:
              {word.similar_words.map((similar_word) => (
                <Badge variant="secondary">{similar_word}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4"></div>
      </CardContent>
      <CardFooter>
        {/* <Button className="w-full">
          Mark all as read
        </Button> */}
      </CardFooter>
    </Card>
  );
}
