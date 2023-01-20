import React from "react";
import { useDispatch, useSelector } from "react-redux";


function IncreOrDecre() {

    const value = useSelector((state) => {
        return state
    })
    const dispatch = useDispatch();
    console.log(value.value)
    console.log(value.value1)
    console.log(value.value2)



    return (
        <div>
            <button onClick={() => {
                dispatch({
                    type: "increment"
                })
            }}>incremet</button>
            <p>{value.value}</p>
            <p>{value.value1}</p>
            <p>{value.value2}</p>
            <button onClick={() => {
                dispatch({
                    type: "decrement"
                })
            }}>decrement</button>

        </div>
    )
}

export default IncreOrDecre