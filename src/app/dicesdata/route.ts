import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const name = searchParams.get('name');
//   const sides = searchParams.get('sides');

//   try {
//     if (!name || !sides) throw new Error('Name and Sides required');
//     await sql`INSERT INTO Dices (Id, Name, Sides) VALUES ( gen_random_uuid (), ${name}, ${sides});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const dices = await sql`SELECT * FROM Dices;`;
//   return NextResponse.json({ dices }, { status: 200 });
// }

export async function GET() {
  try {
    const result = await sql`SELECT * FROM dices;`;

    if (result.rows.length === 0) return nextResponse({ message: "No dices found." }, 404);

    return nextResponse({ dices: result.rows }, 200);
  } catch (error) {
    console.error("Failed to fetch dices:", error);
    return nextResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.name || !data.sides) {
    return nextResponse({ message: "Missing data: name and sides required." }, 404);
  }

  try {
    await sql`INSERT INTO Dices (Id, Name, Sides) VALUES ( gen_random_uuid (), ${data.name}, ${data.sides});`;
  } catch (error) {
    return nextResponse({ error }, 500);
  }

  return nextResponse({ message: `Succesfully added die named ${data.name}` }, 200);
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
