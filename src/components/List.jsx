import React, { useState, useEffect } from "react"
import {Link} from '@reach/router'
import axios from "axios"

const List = ({submitState, setSubmitState}) => {

    const [listState, setListState] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => setListState(res.data.allProducts))
            .catch(err => console.log(err))
    }, [submitState])

    const deleteHandler = (product_id) => {
        axios.delete(`http://localhost:8000/api/products/${product_id}`)
            .then(res => setSubmitState(!submitState))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>List:</h1>
            {
                listState.map((product, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/${product._id}`}>{product.title}</Link> 
                            <Link to={`/${product._id}/edit`}> | Edit | </Link>
                            <button onClick={() => deleteHandler(product._id)} >Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default List