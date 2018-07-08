import React from 'react'
import File from './file'

export default class Files extends React.Component {
    constructor() {
        super()
        this.onScroll = this.onScroll.bind(this)
        this.getScrollBottom = this.getScrollBottom.bind(this)
    }

    componentWillMount() {
        this.props.add()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll() {
        if (300 > this.getScrollBottom() && !this.props.isFetching) {
            this.props.add()
        }
    }

    getScrollBottom() {
        const body = window.document.body;
        const html = window.document.documentElement;
        const scrollTop = body.scrollTop || html.scrollTop;
        return html.scrollHeight - html.clientHeight - scrollTop
    }

    render() {
        const fetching =  this.props.isFetching ? '取得中...' : ''
        const fileItems = this.props.files.map( (file, idx) => <File file={file} hoge={this.props.hoge} key={idx} /> )
        return (
            <div>
                <h1>ファイル一覧</h1>
                <div className="fileItem">{fileItems}</div>
                <p>{fetching}</p>
            </div>
        )
    }
}
