import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

interface Props {
    params: {
        id: string
    }
}

export async function GET(request: NextRequest, props: Props) {
    const params = await props.params
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if (!user)
        return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json(user)

}


export async function PUT(request: NextRequest, props: Props) {
    const params = await props.params
    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({ error: 'Body  is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if (!user)
        return NextResponse.json({ error: "Not found" }, { status: 404 })


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

    // const body = await request.json();
    // if (!body.name) {
    //     return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    // }
    // if (params.id > 10) {
    //     return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // }
    // return NextResponse.json({ id: params.id, name: body.name });
}

export async function DELETE(request: NextRequest, props: Props) {
    const params = await props.params
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if (!user) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await prisma.user.delete({
        where: {
            id: parseInt(params.id)
        }
    });

    // Return a message with status 200
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
// Compare this snippet from my-app/app/api/products/%5Bid%5D/route.tsx: