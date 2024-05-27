import AdminWord from "@/components/admin_word";
import { notFound } from "next/navigation";

export default function Page({ params }) {
  if (!params.word || params.word.length !== 24) {
    // Invalid word hexstring
    return notFound();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AdminWord id={params.word} />
      </div>
    </main>
  );
}
