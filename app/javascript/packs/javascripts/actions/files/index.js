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
            data: json.files,
            nextPageToken: json.next_page_token,
            receivedAt: Date.now(),
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

export const getFiles = params => {
    return (dispatch) => {
        dispatch(getFilesRequest())
        return axios.get('/api/v1/files', { params: params })
            .then(res => {
                dispatch(getFilesSuccess(res.data))
                }
            ).catch(err =>
                dispatch(getFilesFailure(err))
            )
    }
}