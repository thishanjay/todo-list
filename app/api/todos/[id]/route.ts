import { NextRequest, NextResponse } from "next/server";
import { todos } from "../data";

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {
    const id = parseInt(params.id);

    const index = todos.findIndex((t) => t.id === id);

    if(index === -1) {
        return NextResponse.json({ error: "Not found"}, { status: 404});
    }

    const deleted = todos.splice(index, 1);

    return NextResponse.json({ deleted });
}