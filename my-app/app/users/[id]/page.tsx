import { notFound } from 'next/navigation'
import React from 'react'

//programmatical navigation with router.push
interface Props {
    params: {
        id: number
    }
}
const UserDetailPage = async (props: Props) => {
    const params = await props.params
    const id = params.id

    if (id > 10) notFound()
    return (
        <div>
            UserDetailPage {id}

        </div>


    )
}

export default UserDetailPage