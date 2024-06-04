import { Badge } from "@/components/ui/badge";
import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import Link from "next/link";

const getWord = async (id) => {
  if (!id) {
    return {};
  }
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection.findOne({ _id: ObjectId.createFromHexString(id) });
};

export default async function RootWord({ root_word }) {
  const word = await getWord(root_word);

  return (
    <div className="flex gap-2">
      {word.arabic ? (
        <Link href={`/admin/${word._id}`}>
          <Badge variant="secondary">{word.arabic}</Badge>
        </Link>
      ) : (
        <Badge variant="secondary">{"N/A"}</Badge>
      )}
    </div>
  );
}
