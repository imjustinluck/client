import React, { useState } from "react"
import Form from './Form';
import List from './List';

const Home = props => {

    const [submitState, setSubmitState] = useState(false)

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Form submitState={submitState} setSubmitState={setSubmitState} />
            <List submitState={submitState} setSubmitState={setSubmitState} />
        </div>
    )
}

export default Home