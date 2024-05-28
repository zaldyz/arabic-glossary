"use client";

import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Clipboard, OctagonX, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// {
//   _id: ObjectId;
//   arabic: string;
//   pronounciation: string;
//   translation: [string];
//   gender: string or null;
//   similar_words: [string];
//   root_word: string or null;
//   tag: string or null;
// }

export const columns = [
  {
    accessorKey: "arabic",
    header: "Word",
    cell: ({ row }) => {
      const value = row.getValue("arabic");
      return <p className="text-3xl">{value}</p>;
    },
  },
  {
    accessorKey: "pronounciation",
    header: "Pronounciation",
  },
  {
    accessorKey: "translation",
    header: "Translation",
    cell: ({ row }) => {
      const value = row.getValue("translation");
      return (
        <div className="flex gap-2">
          {value.map((translation) => (
            <Badge variant="secondary">{translation}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const value = row.getValue("gender");
      return (
        <Badge
          variant={
            value == "Masculine"
              ? "blue"
              : value == "Feminine"
              ? "pink"
              : "outline"
          }
        >
          {value ? value : "Neutral"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "similar_words",
    header: "Similar Words",
  },
  {
    accessorKey: "root_word",
    header: "Root Word",
  },
  {
    accessorKey: "tag",
    header: "Tags",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const word = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(word.arabic)}
              className="flex justify-between items-center hover:cursor-pointer"
            >
              Copy Arabic
              <Clipboard className="h-3 w-3 ml-2" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex justify-between items-center hover:cursor-pointer">
              Edit Word
              <Pencil className="h-3 w-3 ml-2" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between items-center text-red-600 hover:cursor-pointer focus:text-white focus:bg-red-500 dark:focus:bg-red-800/80">
              Delete Word
              <OctagonX className="h-3 w-3 ml-2" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
