import AdminWord from "@/components/admin_word";
import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page({ params }) {
  if (!params.word || params.word.length !== 24) {
    // Invalid word hexstring
    return notFound();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[1000px]">
        <CardHeader>
          <CardTitle>Edit Word</CardTitle>
          <CardDescription>Edit the details of an arabic word.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <AdminWord id={params.word} />
          </div>
          <div className=" flex items-center space-x-4 rounded-md border p-4"></div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
