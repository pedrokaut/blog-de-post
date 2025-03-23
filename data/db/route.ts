import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Caminho para o arquivo db.json
const dbPath = path.join(process.cwd(), "data", "db.json");

// Método GET para obter os dados do JSON
export async function GET() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}
