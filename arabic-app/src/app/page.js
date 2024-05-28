import clientInstance from "@/lib/mongo";
import react from "react";
import { ModeToggle } from "@/components/mode_toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchWords() {
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection.find({}).toArray();
}

export default async function Home() {
  const words = await fetchWords();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button asChild>
        <Link href="/admin/words">View Words</Link>
      </Button>
      <div>
        {/* {words.map(word => {
                    return (<p key={word._id}>{word.pronounciation}</p>);
                })} */}
        Test
      </div>
    </main>
  );
}
