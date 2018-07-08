import React from 'react'
import File from './file'

export default class Files extends React.Component {

    componentWillMount() {
        this.props.add([{name: '追加ファイル', owner: 'オーナー1'}, {name: '追加ファイル2', owner: 'オーナー2'}])
    }

    render() {
        console.log(this.props)
        const fileItems = this.props.files.map( (file, idx) => <li onClick={() => this.props.hoge()} key={idx}>{file.name}</li> )
        return (
            <div>
                <h1>ファイル一覧</h1>
                <ul>{fileItems}</ul>
                <File />
            </div>
        )
    }
}
