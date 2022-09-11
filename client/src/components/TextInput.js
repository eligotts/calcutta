import React,{useState, useEffect} from 'react'
import './css/TextInput.css'


  export const TextInput = ({
    handleFormSubmit,
    playerID
  }) => {
    const [data, setData] = useState([{}])
    //const playerID = 3

    useEffect(() => {
        fetch(`/api/players/${playerID}/`).then(
            res => res.json()
        ).then(
        data => {
            setData(data)
        })
    }, [playerID])

    const [price, setPrice] = useState('')
    const handlePriceChange = (inputValue) => {
        setPrice(inputValue)
    }

    const handleChange = (event) => {
        handlePriceChange(event.target.value)
        setData({...data, 'price':event.target.value})
        //console.log(data)
      }
    
    const handleFormSubmitArgs = (e) => {
        e.preventDefault()
        handleFormSubmit(data)
    }


  return (
    <>
        <form className="bid-form" onSubmit={handleFormSubmitArgs}>
          <label>Enter a price:</label>
          <input required value={price} onChange={handleChange} type="number" name="price" autoComplete="off"/>
          <input type="submit" value="BID" />
        </form>
    </>
  )
}