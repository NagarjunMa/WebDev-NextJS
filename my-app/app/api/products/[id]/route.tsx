import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/client"

interface Props {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, props: Props) {
    const params = await props.params
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!product)
        return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json(product)

}

export async function DELETE(request: NextRequest, props: Props) {
    const params = await props.params
    // if (params.id > 10) {
    //     return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // }
    // return NextResponse.json({ id: params.id, deleted: true });

    const user = await prisma.user.delete({
        where: {
            id: parseInt(params.id)
        }
    });
    return NextResponse.json(user, { status: 204 });
}

export async function PUT(request: NextRequest, props: Props) {
    const params = await props.params
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: 'Body  is required' }, { status: 400 });
    }

    const user = await prisma.product.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });
    if (!user) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            name: body.name,
            email: body.email,
        }
    });
    return NextResponse.json(updatedUser, { status: 201 });

}