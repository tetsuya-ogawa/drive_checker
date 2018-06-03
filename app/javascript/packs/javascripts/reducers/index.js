import {combineReducers} from "redux"
import Files from './files'

const rootReducer = combineReducers({
    files: Files,
})

export default rootReducer
