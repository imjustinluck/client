import React, {useEffect, useState} from 'react'
import axios from "axios"

const Detail = ({product_id}) => {

    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${product_id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <div>
            <h1>Title: {product.title}</h1>
            <h1>Price: ${product.price}</h1>
            <h1>Description: {product.description}</h1>
        </div>
    )
}

export default Detail