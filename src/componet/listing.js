
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { getUsersDetails, deleteUser } from "../redux/actions";
import {
    USER_DATA,
    GET_MODAL_STATUS,
    GET_USER_ID_FOR_DELETE,
    GET_STATUS,
    GET_MODAL_DETAILS
} from "../redux/constants";
import ModalApp from "./Modal";
import { MdSystemUpdateAlt } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Listing() {

    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const modaldetails = useSelector((State) => State.modalDetails)
    const deleteResponse = useSelector((state) => state.getStatus)
    const id = useSelector((state) => state.idForDelete)

    const closeModal = () => {
        modaldetails['visible'] = false;
        dispatch({ type: GET_MODAL_DETAILS, modaldetails: modaldetails })
    }

    const onDelete = () => {
        dispatch(deleteUser(id))

    }

    useEffect(() => {
        if (deleteResponse == 204) {
            modaldetails['visible'] = false;
            dispatch({ type: GET_MODAL_DETAILS, modaldetails: modaldetails })
            dispatch({ type: GET_STATUS, status: {} })
        }
    })
    const modalDetails = {
        visible: true,
        modal_title: "Delete",
        modal_labal: "Are you sure you want to delete this User?",
        data: [
            {
                type: "button",
                onclick: closeModal,
                label: "Close",
                class_name: "btn btn-secondary"
            },
            {
                type: "button",
                onclick: onDelete,
                label: "Delete",
                class_name: "btn btn-danger ms-1"
            }
        ]
    }
    useEffect(() => {
        dispatch(getUsersDetails(page))
        dispatch({ type: USER_DATA, details: {} })
    }, [page])

    const value = useSelector((state) => state.getUserDetails);
    const pageNum = value?.data?.meta?.pagination?.pages;

    const onDeletePop = (id) => {
        dispatch({ type: GET_USER_ID_FOR_DELETE, deleteId: id })
        dispatch({ type: GET_STATUS, status: {} })
        dispatch({ type: GET_MODAL_DETAILS, modaldetails: modalDetails })
    }

    const navigate = useNavigate();
    const onUpdate = (id) => {
        navigate(`/Update/${id}`)
    }


    return (
        <div className="container p-5">
            <div className="text-end"><button onClick={() => navigate("/create")} className="btn btn-success">Add User</button></div>
            <div>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value?.data?.data?.map((item, key) => {
                            return (
                                <tr >
                                    <th scope="row">{item?.name}</th>
                                    <td>{item?.email}</td>
                                    <td>{item?.gender}</td>
                                    <td style={{ color: item?.status === "inactive" ? "red" : "green" }}>{item?.status}</td>
                                    <td><h2 style={{ color: "blue", cursor: "pointer" }}><MdSystemUpdateAlt onClick={() => onUpdate(item?.id)} /></h2></td>

                                    <td><h2 style={{ color: "red", cursor: "pointer" }}><RiDeleteBin6Line onClick={() => (onDeletePop(item?.id))} /></h2></td>

                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>



            <div
                className="d-flex justify-content-end">
                <Stack spacing={2}>
                    <Pagination count={pageNum} page={page} onChange={handleChange} />
                </Stack>
            </div>

            <ModalApp />
        </div>
    )
}


export default Listing