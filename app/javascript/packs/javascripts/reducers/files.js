const initialState = {
    files: [{name: 'file名', owner: '社長'}],
}

export default function filesReducer(state = initialState, action) {
    switch(action.type) {
        case 'hoge':
            console.log(state)
            return {
                ...state,
                files: state.files.concat([action.payload.file])
            }
        default:
            return state
        }
}
