import React, {useState, useEffect} from "react"
import {navigate} from "@reach/router"
import axios from "axios"

const Edit = ({product_id}) => {

    const [formState, setFormState] = useState({
        title: "",
        price: 0,
        description: ""
    })

    const [errorState, setErrorState] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${product_id}`)
            .then(res => setFormState(res.data))
            .catch(err => console.log(err))
    }, [])

    const changeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/products/${product_id}`, formState)
            .then(res => navigate(`/${product_id}`))
            .catch(err => {
                const {errors} = err.response.data
                const errorObj = {}
                for(let [key, value] of Object.entries(errors)){
                    errorObj[key] = value.message
                }
                setErrorState(errorObj)
            })
    }

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/products/${product_id}`)
            .then(res => navigate("/"))
            .catch(err => console.log(err))
    }

    return(
        <div>
            <h1>Edit Product Manager</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <h3>Title</h3>
                    <input type="text" name="title" value={formState.title} onChange={changeHandler}/>
                    {(errorState.title) && <p>{errorState.title}</p>}
                </div>
                <div>
                    <h3>Price</h3>
                    <input type="number" name="price" value={formState.price} onChange={changeHandler}/>
                    {(errorState.price) && <p>{errorState.price}</p>}
                </div>
                <div>
                    <h3>Description</h3>
                    <input type="text" name="description" value={formState.description} onChange={changeHandler}/>
                    {(errorState.description) && <p>{errorState.description}</p>}
                </div>
                <button type="submit">Edit Product</button>
            </form>
            <button onClick={deleteHandler} >Delete</button>
        </div>
    )
}

export default Edit