import { connect } from 'react-redux'
import Files from '../components/files/files'

function mapStateToProps({ files }){
    return files
}

function mapDispatchToProps(dispatch) {
    return {
        hoge() {
            dispatch({type: 'hoge', payload: { file: { name: 'fileee', owner: 'ownerrr' } }})
        },
        add(files) {
            dispatch({type: 'add', payload: { files }})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files)
