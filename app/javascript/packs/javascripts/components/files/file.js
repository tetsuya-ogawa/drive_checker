import React from 'react'

export default function File({file, hoge}) {
    const ownerName = file.owners[0].display_name
    const ownerEmail = file.owners[0].email_address
    return (
        <div onClick={() => hoge(file)}>
            <h3>{file.name}</h3>
            <div>{ownerName} ({ownerEmail})</div>
        </div>
    )
}
