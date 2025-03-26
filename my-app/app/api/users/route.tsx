import { NextRequest, NextResponse } from "next/server";

//post request
export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    return NextResponse.json(body);
}

//get request
export function GET() {
    return NextResponse.json([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Doe' },
    ]);
}


export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (params.id > 10) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ id: params.id, name: body.name });
}


export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    if (params.id > 10) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ id: params.id, deleted: true });
}
