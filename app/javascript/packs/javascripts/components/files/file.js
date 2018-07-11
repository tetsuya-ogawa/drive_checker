import React from 'react'

export default function File({file, hoge}) {
    const ownerName = file.owners[0].display_name
    const ownerEmail = file.owners[0].email_address
    let permissionsWithType = (file.permissions || []).reduce((result, current) => {
        if(!result[current.type]) result[current.type] = []
        result[current.type].push(current)
        return result
    }, {})

    const jampFileLink = link => {
        window.open(link);
    }

    const permissionItems = permissions => {
        if(!permissions) return 'なし'
        return permissions.map( (permission, idx) => <div key={file.id + permission.id}><strong>{permission.role}</strong> - {permission.display_name} ({permission.email_address})</div> )
    }

    return (
        <div className="c-file">
            <div className="c-file__fileName" onClick={() => jampFileLink(file.web_view_link)}>
                <h3>{file.name}</h3>
            </div>
            <div>
                <h4>共有ユーザー(ドメイン)</h4>
                {permissionItems(permissionsWithType['domain'])}
                <h4>共有ユーザー(ユーザー)</h4>
                {permissionItems(permissionsWithType['user'])}
            </div>
        </div>
    )
}
