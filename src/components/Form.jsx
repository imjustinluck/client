import React, {useState} from "react"
import axios from "axios"

const Form = ({submitState, setSubmitState}) => {

    const [formState, setFormState] = useState({
        title: "",
        price: 0,
        description: ""
    })

    const [errorState, setErrorState] = useState([])

    const changeHandler = e => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/products", formState)
            .then(res => {
                setFormState({
                    title: "",
                    price: 0,
                    description: ""
                })
                setSubmitState(!submitState)
            })
            .catch(err => {
                const {errors} = err.response.data
                const errorObj = {}
                for(let [key, value] of Object.entries(errors)){
                    errorObj[key] = value.message
                }
                setErrorState(errorObj)
            })
    }
    
    return(
        <div>
            <h1>Product Manager</h1>
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
                <button type="submit">Create Product</button>
            </form>
        </div>
    )
}

export default Form