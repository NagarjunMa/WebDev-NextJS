import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json([
        { id: 1, name: 'Bread', price: 1.99 },
        { id: 2, name: 'Milk', price: 2.99 },
        { id: 3, name: 'Eggs', price: 3.99 },
    ]);
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    return NextResponse.json(body);
}

export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (params.id > 10) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ id: params.id, name: body.name, price: body.price });
}