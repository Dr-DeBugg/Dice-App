import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sql`DELETE FROM Dices;`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const dices = await sql`SELECT * FROM Dices;`;
  return NextResponse.json({ dices }, { status: 200 });
}
// UPDATE your_table_name SET Color = 'default_value' WHERE Color IS NULL;
// ALTER TABLE your_table_name DROP COLUMN name;

// export async function GET() {
//   try {
//     const result = await sql`SELECT * FROM dices;`;

//     if (result.rows.length === 0) return nextResponse({ message: "No dices found." }, 404);

//     return nextResponse({ dices: result.rows }, 200);
//   } catch (error) {
//     console.error("Failed to fetch dices:", error);
//     return nextResponse({ error: "Internal Server Error" }, 500);
//   }
// }

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
