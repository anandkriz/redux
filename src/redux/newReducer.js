import {
    GET_USERS_DETAILS,
    USER_DATA, GET_STATUS,
    GET_MODAL_STATUS,
    GET_USER_ID_FOR_DELETE,
    GET_MODAL_DETAILS
} from "./constants"

const initialValues =
{
    getUserDetails: { meta: {}, data: [] },
    getUser: {},
    userData: {},
    createStatus: {},
    updateStatus: {},
    modalStatus: false,
    idForDelete: {},
    modalDetails: { visible: false }


}


function Reducer(State = initialValues, action) {
    switch (action.type) {
        case GET_USERS_DETAILS:
            return {
                ...State,
                getUserDetails: action.data
            }
        case USER_DATA:
            return {
                ...State,
                userData: action.details
            }
        case GET_STATUS:
            return {
                ...State,
                getStatus: action.status
            }
        case GET_MODAL_STATUS:
            return {
                ...State,
                modalStatus: action.status
            }
        case GET_USER_ID_FOR_DELETE:
            return {
                ...State,
                idForDelete: action.deleteId
            }
        case GET_MODAL_DETAILS:
            return {
                ...State,
                modalDetails: action.modaldetails
            }

        default:
            return State
    }
}

export default Reducer