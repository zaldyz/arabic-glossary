import { Badge } from "@/components/ui/badge";
import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import Link from "next/link";

const getWords = async (ids) => {
  if (!ids) {
    return [];
  }
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection
    .find({ _id: { $in: ids.map((id) => ObjectId.createFromHexString(id)) } })
    .toArray();
};

export default async function SimilarWords({ similar_words }) {
  const words = await getWords(similar_words);
  return (
    <div className="flex gap-2">
      {words.length ? (
        words.map((similar_word) => (
          <Link href={`/admin/${similar_word._id}`}>
            <Badge key={similar_word._id} variant="secondary">
              {similar_word.arabic}
            </Badge>
          </Link>
        ))
      ) : (
        <Badge variant="secondary">{"No Similar Words"}</Badge>
      )}
    </div>
  );
}
