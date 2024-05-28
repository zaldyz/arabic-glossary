import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import clientInstance from "@/lib/mongo";

async function getWords() {
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection.find({}).toArray();
}

export default async function DemoPage() {
  const words = await getWords();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={words} />
    </div>
  );
}
