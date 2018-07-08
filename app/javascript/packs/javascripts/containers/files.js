import { connect } from 'react-redux'
import Files from '../components/files/files'
import { getFiles } from '../actions/files/index'

function mapStateToProps({ files }){
    return files
}

function mapDispatchToProps(dispatch) {
    return {
        hoge(file) {
            console.log(file)
            // dispatch({type: 'hoge', payload: { file: { name: 'fileee', owner: 'ownerrr' } }})
        },
        add(params) {
            dispatch(getFiles(params))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files)
