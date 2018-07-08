import axios from 'axios'
const getFilesRequest = () => {
    return {
        type: 'GET_FILES_REQUEST'
    }
}

const getFilesSuccess = (json) => {
    return {
        type: 'GET_FILES_SUCCESS',
        payload: {
            data: json,
            receivedAt: Date.now()
        }
    }
}

const getFilesFailure = (error) => {
    return {
        type: 'GET_FILES_FAILURE',
        payload: {
            error
        }
    }
}

export const getFiles = () => {
    return (dispatch) => {
        dispatch(getFilesRequest())
        return axios.get('/api/v1/files')
            .then(res => {
                dispatch(getFilesSuccess(res.data.files))
                }
            ).catch(err =>
                dispatch(getFilesFailure(err))
            )
    }
}