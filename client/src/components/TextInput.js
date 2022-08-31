import React,{useState, useEffect} from 'react'

  export const TextInput = ({
    handleFormSubmit
  }) => {
    const [data, setData] = useState([{}])
    const playerID = 3

    useEffect(() => {
        fetch(`/api/players/${playerID}/`).then(
            res => res.json()
        ).then(
        data => {
            setData(data)
        }
        )
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
        handleFormSubmit(price,data)
    }


  return (
    <>
        <form onSubmit={handleFormSubmitArgs}>
          <label>Enter a price:</label>
          <input className="inp" required value={price} onChange={handleChange} type="number" name="price" autoComplete="off"/>
          <input type="submit" value="BID" />
        </form>
    </>
  )
}