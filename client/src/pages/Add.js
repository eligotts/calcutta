import React, { useState } from 'react'

function Add() {
    const [name, setName] = useState('')
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const [link, setLink] = useState('')
    const handleLinkChange = (e) => {
        setLink(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        fetch('/api/addplayer/', {
          method: 'POST',
          body: JSON.stringify(
            {
                name: name,
                img_link: link
            }
          ),
          headers: {
            "Content-type": "application/json"
          }
        }).then(
          res => res.json()
        ).then(message => console.log(message))}

    // const handleChange = (event) => {
    //     handleNameChange(event.target.value)
    //     setData({...data, 'name':event.target.value})
    //     //console.log(data)
    //   }


    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input required value={name} onChange={handleNameChange} type="text" name="name" autoComplete="off"/>
                <label>Image link:</label>
                <input required value={link} onChange={handleLinkChange} type="text" name="link" autoComplete="off"/>
                <input type="submit" value="ADD" />
            </form>
        </>
    )
}

export default Add