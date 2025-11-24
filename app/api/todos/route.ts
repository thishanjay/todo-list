import { NextRequest, NextResponse } from "next/server";
import { Todo, todos } from "./data";

export async function GET() {
    return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newTodo: Todo = {
        id: Date.now(),
        text: body.text,
    };

    todos.push(newTodo);

    return NextResponse.json(newTodo);
}