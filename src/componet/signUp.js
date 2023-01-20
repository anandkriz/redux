import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser, getUser } from "../redux/actions";
import { GET_STATUS, GET_USER, USER_DATA } from "../redux/constants";


function SignUp() {

    let { id } = useParams();

    const userdata = useSelector((State) => State.userData)
    const status = useSelector((State) => State.getStatus)
    console.log("status", status)
    const datas = userdata

    useEffect(() => {
        if (id) {
            dispatch(getUser(id))
        }
    }, [])


    useEffect(() => {
        if (status === 201 || status === 200) {
            navigate('/')
            dispatch({ type: GET_STATUS, status: "" })
        }
    })


    cons
    const dispatch = useDispatch();

    const [error, setError] = useState({});

    const handleValidate = () => {
        let error = {}
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const nameReg = /^[a-zA-Z ]*$/;
        if (isEmpty(userdata['name'])) {
            error.name = "Enter Name"
        }
        if (!userdata?.name == "" && !nameReg.test(userdata?.name)) {
            error.name = "please enter valid name"
        }
        if (!userdata?.email == "" && !reg.test(userdata?.email)) {
            error.email = "please enter valid email id"
        }
        if (isEmpty(userdata['email'])) {
            error.email = "Enter email"
        }
        if (isEmpty(userdata['gender'])) {
            error.gender = "please select gender"
        }
        if (isEmpty(userdata['status'])) {
            error.status = "please select status"
        } return error
    }

    const Signup = async () => {
        const error = await handleValidate();
        if (isEmpty(error)) {
            if (!id) {
                dispatch(createUser(userdata))
            } else {
                dispatch(updateUser(userdata, id))
            }
        } else {
            setError({ ...error })
        }
    }
    const navigate = useNavigate();

    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px" }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">{id ? "Update Details" : "Create an account"}</h2>
                                    {!isEmpty(status) ? status?.map((item) =>
                                        <p style={{ color: "red" }} key={item}>{item?.field}  {item?.message}</p>
                                    ) : null}
                                    <form autocomplete="off">
                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example1cg">Name</label>
                                            <input value={datas.name} type="text" onChange={(e) => (
                                                userdata['name'] = e.target.value, delete error['name'],
                                                dispatch({ type: USER_DATA, details: ({ ...userdata }) }))} id="form3Example1cg"
                                                className="form-control form-control-lg" />

                                            <p className="text-danger">{error?.name}</p>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example3cg">Email</label>
                                            <input value={datas.email} type="text" onChange={(e) => (
                                                userdata['email'] = e.target.value, delete error['email'],
                                                dispatch({ type: USER_DATA, details: ({ ...userdata }) }))} id="form3Example1cg"
                                                className="form-control form-control-lg" />
                                            <p className="text-danger">{error?.email}</p>
                                        </div>

                                        <div className="mb-4 pb-2">
                                            <label className="form-label" for="form3Example3cg">Gender</label>
                                            <select value={datas.gender} onChange={(e) => (
                                                userdata['gender'] = e.target.value, delete error['gender'],
                                                dispatch({ type: USER_DATA, details: ({ ...userdata }) }))} class="form-select">
                                                <option value="">Select gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>

                                            </select>
                                            <p className="text-danger">{error?.gender}</p>
                                        </div>

                                        <div className="mb-4 pb-2">
                                            <label className="form-label" for="form3Example3cg">Status</label>
                                            <select value={datas.status} onChange={(e) => (
                                                userdata['status'] = e.target.value, delete error['status'],
                                                dispatch({ type: USER_DATA, details: ({ ...userdata }) }))} class="form-select">
                                                <option value="" default selected>Select status</option>
                                                <option value="active">active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                            <p className="text-danger">{error?.status}</p>
                                        </div>
                                        <div></div>
                                        <div className="d-flex ">

                                            <button onClick={() => (dispatch({ type: USER_DATA, details: {} }), navigate('/'))} type="button"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Cancel</button>
                                            <button onClick={Signup} type="button"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body ms-4">{id ? 'Update' : 'Create user'}</button>


                                        </div>


                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default SignUp

