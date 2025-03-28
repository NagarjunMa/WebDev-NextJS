import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";


//post request
export async function POST(request: NextRequest) {
    const body = await request.json();

    prisma.user.findUnique({
        where: {
            email: body.email
        }
    }).then((user) => {
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
    });
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
        }
    })

    return NextResponse.json(user, { status: 201 });
}

//get request
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}





