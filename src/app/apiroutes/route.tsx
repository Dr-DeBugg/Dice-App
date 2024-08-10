import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sql`DELETE FROM dices;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const dices = await sql`SELECT * FROM Dices;`;
  return NextResponse.json({ dices }, { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.color || !data.sides) {
    return nextResponse({ message: "Missing data: color and sides required." }, 404);
  }

  try {
    await sql`INSERT INTO Dices (Id, Color, Sides) VALUES ( gen_random_uuid (), ${data.color}, ${data.sides});`;
  } catch (error) {
    return nextResponse({ error }, 500);
  }

  return nextResponse({ message: `Succesfully added die with hex color: ${data.color}` }, 200);
}

export async function DELETE(req: Request) {
  const data = await req.json();

  if (!data?.id) return nextResponse({ error: "Missing data: id required" }, 400);

  try {
    const result = await sql`DELETE FROM dices WHERE id = ${data.id}`;

    if (result.rowCount === 1) {
      return nextResponse({ message: "Successfully removed a die" }, 200);
    }

    return nextResponse({ error: "Die not found or already deleted" }, 404);
  } catch (error) {
    console.error(error);
    return nextResponse({ error: "Internal server error" }, 500);
  }
}

function nextResponse(response: object, statusCode: number) {
  return NextResponse.json(response, { status: statusCode });
}
