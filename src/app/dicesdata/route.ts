import { dices } from "./data"


export async function GET(){
    return Response.json(dices);
}

export async function POST(req: Request){
    const comment = await req.json();
    const newComment = {
        id: dices.length + 1,
        text: comment.text
    };
    dices.push(newComment);

    return new Response(JSON.stringify(newComment), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 201
    });
}