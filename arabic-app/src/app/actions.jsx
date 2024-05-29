"use server";

import { revalidatePath } from "next/cache";
import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";

export async function addSimilarWord(id, word_id) {
  if (id === word_id) {
    return {
      success: false,
      message: "A word cannot be added to its own similar words list",
    };
  }
  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");

  const bulkOperations = [
    {
      updateOne: {
        filter: { _id: ObjectId.createFromHexString(id) },
        update: {
          $addToSet: { similar_words: word_id },
        },
      },
    },
    {
      updateOne: {
        filter: { _id: ObjectId.createFromHexString(word_id) },
        update: {
          $addToSet: { similar_words: id },
        },
      },
    },
  ];

  const result = await collection.bulkWrite(bulkOperations);
  if (result.matchedCount == 2) {
    if (result.modifiedCount == 2) {
      revalidatePath("/");
      return { success: true, message: "Successfully Added Word" };
    }
    return {
      success: false,
      message: "That word has already been Added as similar",
    };
  }
  return { success: false, message: "Something went wrong" };
}

export async function addRootWord(id, word_id) {
  if (id === word_id) {
    return {
      success: false,
      message: "Cannot add itself as root word",
    };
  }
  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");

  const result = await collection.updateOne(
    { _id: ObjectId.createFromHexString(id) },
    {
      $set: {
        root_word: word_id,
      },
    }
  );
  if (result.matchedCount == 1) {
    if (result.modifiedCount == 1) {
      revalidatePath("/");
      return { success: true, message: "Successfully Added Root Word" };
    }
    return {
      success: false,
      message: "That word has already been been set as the Root word",
    };
  }
  return { success: false, message: "Something went wrong" };
}
