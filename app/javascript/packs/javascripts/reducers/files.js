const initialState = {
    isFetching: false,
    nextPageToken: null,
    files: [],
}

export default function filesReducer(state = initialState, action) {
    switch(action.type) {
        case 'hoge':
            return {
                ...state,
                files: state.files.concat([action.payload.file])
            }
        case 'GET_FILES_REQUEST':
            return {
                ...state,
                isFetching: true
            }
        case 'GET_FILES_SUCCESS':
            return {
                ...state,
                isFetching: false,
                nextPageToken: (action.payload.nextPageToken),
                files: state.files.concat(action.payload.data)
            }
        case 'GET_FILES_FAILURE':
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
        }
}
