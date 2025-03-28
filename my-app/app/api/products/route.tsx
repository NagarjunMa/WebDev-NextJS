import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";

export function GET() {
    const products = prisma.product.findMany();
    return NextResponse.json(products);
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await prisma.product.findUnique({
        where: {
            name: body.name
        }
    }).then((product) => {
        if (product) {
            return NextResponse.json({ error: "Product already exists" }, { status: 400 });
        }
    });

    const newProduct = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price,
            stock: body.stock,
        }
    });

    return NextResponse.json(newProduct, { status: 201 });
}