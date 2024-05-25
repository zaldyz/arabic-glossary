import 'dotenv/config';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import { exit } from 'process';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("MongoDB URI not in environment, place it in a .env file at the root of the project"); 
}

let clientInstance;

const closeMongoClient = async () => {
  try {
    const conn = await clientInstance;
    await conn.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  }
}


const file = fs.readFileSync("words.psv", 'utf-8');
let lines = file.split('\n');
lines.shift();
lines = lines.map(line => {
  const fields = line.split('|').map(field => field.trim());
  return {
    arabic: fields[0],
    pronounciation: fields[1].normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
    translation: fields[2].split(',').map(word => word.trim()),
    gender: fields[3] ? fields[3] : null,
    similar_words: [],
    root_word: null,
    tag: fields[4] ? fields[4] : null
  }
})

try {

  let mongoClient = new MongoClient(uri, options);
  clientInstance = mongoClient.connect();

  const client = await clientInstance;
  const db = client.db("arabic-glossary");
  const collection = db.collection("words");

  const result = await collection.insertMany(lines);
  console.log(result.insertedCount);

  closeMongoClient();
} catch {
  throw new Error("Error connecting to cluster");
}

