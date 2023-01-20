import axios from "axios";
import { GET_USERS_DETAILS, USER_DATA, GET_STATUS } from "./constants";


const token = "97f18f9aae8033aaf39880c0ac19badc88b3cde7de1fd65f8459e46859d79ee3";
const header = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
}


export const getUsersDetails = (page) => {
    return async (dispatch) => {

        try {
            const resp = await axios(`https://gorest.co.in/public/v1/users?page=${page}`, { headers: header })
            dispatch({
                type: GET_USERS_DETAILS,
                data: resp
            })
        } catch (err) {
            console.log(err)
        }
    }
}


export const deleteUser = (id) => {
    console.log(id)
    return async (dispatch) => {
        try {
            const resp = await axios.delete(`https://gorest.co.in/public/v1/users/${id}`, { headers: header })
            dispatch({ type: GET_STATUS, status: resp.status })

        } catch (err) {
            dispatch({ type: GET_STATUS, status: err?.response?.data })
        }
    }
}

export const createUser = (data) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post('https://gorest.co.in/public/v1/users',
                data,
                { headers: header }
            );
            dispatch({ type: GET_STATUS, status: resp.status })

        } catch (err) {
            dispatch({ type: GET_STATUS, status: err?.response?.data?.data })

        }
    }
}
export const getUser = (id) => {
    return async (dispatch) => {
        try {
            const resp = await axios.get(`https://gorest.co.in/public/v1/users/${id}`, { headers: header })
            dispatch({
                type: USER_DATA, details: resp?.data?.data
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const updateUser = (data, id) => {

    return async (dispatch) => {
        try {
            const resp = await axios.put(`https://gorest.co.in/public/v1/users/${id}`,
                data,
                { headers: header }
            );
            dispatch({ type: GET_STATUS, status: resp.status })

        } catch (err) {
            // console.log(err?.response?.data?.data)
            dispatch({ type: GET_STATUS, status: err?.response?.data?.data })
        }
    }
}