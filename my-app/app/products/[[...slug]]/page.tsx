import React from 'react'


interface Props {
    params: {
        slug: string[]
    };
    searchParams: {
        search: string
    };
}

const ProductPage = async (props: Props) => {
    const params = await props.params
    const searchParams = await props.searchParams
    const search = searchParams.search
    const slug = params.slug
    return (
        <div>ProductPage {slug} {search}</div>
    )
}

export default ProductPage