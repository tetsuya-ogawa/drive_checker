import { connect } from 'react-redux'
import Files from '../components/files'

function mapStateToProps({ files }){
    return { files }
}

function mapDispatchToProps(dispatch) {
    return {
        hoge() {
            dispatch({type: 'hoge', payload: { file: 'test' }})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files)
