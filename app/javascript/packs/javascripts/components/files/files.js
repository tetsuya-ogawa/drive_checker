import React from 'react'
import File from './file'

export default class Files extends React.Component {

    componentWillMount() {
        this.props.add()
    }

    render() {
        const fetching =  this.props.isFetching ? '取得中' : ''
        const fileItems = this.props.files.map( (file, idx) => <File file={file} hoge={this.props.hoge} key={idx} /> )
        return (
            <div>
                <h1>ファイル一覧</h1>
                <p>{fetching}</p>
                <div className="fileItem">{fileItems}</div>
            </div>
        )
    }
}
