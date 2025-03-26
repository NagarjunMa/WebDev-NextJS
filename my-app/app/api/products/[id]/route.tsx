import { NextRequest, NextResponse } from "next/server"

interface Props {
    params: {
        id: number
    }
}

export async function GET(request: NextRequest, props: Props) {
    const params = await props.params
    const id = params.id
    if (id > 10)
        return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json({ id: id, name: 'Milk', price: 2.99 })

}