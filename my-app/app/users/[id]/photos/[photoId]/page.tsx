
import React from 'react'


interface Props {
    params: {
        id: number,
        photoId: number
    }
}

const PhotoPageId = async (props: Props) => {
    // Wait for the params object to be ready
    const params = await props.params
    // Then destructure after awaiting
    const id = params.id
    const photoId = params.photoId
    return (
        <div>PhotoPageId {id} {photoId} </div>
    )
}

export default PhotoPageId