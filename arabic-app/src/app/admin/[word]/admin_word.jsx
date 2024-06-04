import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import RootWord from "./root_word_badge";
import Gender from "./gender_badge";
import Tags from "./tags_badges";
import Translation from "./translations_badges";
import SimilarWords from "./similar_words_badges";

const getWord = async (id) => {
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection.findOne({ _id: ObjectId.createFromHexString(id) });
};

export default async function AdminWord({ id }) {
  const word = await getWord(id);
  return (
    <div className="flex flex-col space-y-1 p-4">
      <p className="text-6xl font-medium leading-none">
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
      <div className="flex flex-row gap-20">
        <div className="flex flex-col">
          <h2 className="scroll-m-20 pt-2 text-lg font-medium first:mt-0">
            Translation
          </h2>
          <Translation className="py-0.5" translation={word.translation} />
          <h2 className="scroll-m-20 pt-2 text-lg font-medium first:mt-0">
            Tags
          </h2>
          <Tags className="py-0.5" tags={word.tags} />
        </div>
        <div className="flex flex-col">
          <h2 className="scroll-m-20 pt-2 text-lg font-medium first:mt-0">
            Gender
          </h2>
          <Gender className="py-0.5" gender={word.gender} />
          <h2 className="scroll-m-20 pt-2 text-lg font-medium first:mt-0">
            Root Word
          </h2>
          <RootWord className="py-0.5" root_word={word.root_word} />
        </div>
      </div>
      <h2 className="scroll-m-20 pt-2 text-lg font-medium first:mt-0">
        Similar Words
      </h2>
      <SimilarWords className="py-0.5" similar_words={word.similar_words} />
    </div>
  );
}
