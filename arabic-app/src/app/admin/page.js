import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminHome() {
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
