import React, {useState, useEffect} from 'react'
//import { Link } from "react-router-dom"; //look up react router dom for all the things you can import
import PlayerCard from '../components/PlayerCard'
import { MDBBtn } from 'mdb-react-ui-kit';

function Home() {

  //getting basic data of all players
  const [data, setData] = useState([{}])
  const [oldPrice, setOldPrice] = useState([{}])

  const playerID = 2

  useEffect(() => {
    fetch(`/api/players/${playerID}/`).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [playerID])

  //could probably make this more efficient, try not to have two calls
  //need to figure out how to make an immutable variable
  useEffect(() => {
    fetch(`/api/players/${playerID}/`).then(
      res => res.json()
    ).then(
      oldPrice => {
        setOldPrice(oldPrice.price)
      }
    )
  }, [playerID])


  //to get a specific player
  // fetch(`/api/notes/${noteId}/`)
  //instead of empty list at the end of useEffect, pass in [noteId], this the dependency


  //updating price of a player
  const [price, setPrice] = useState('')
  const handlePriceChange = (inputValue) => {
    setPrice(inputValue)
  }

  const handleChange = (event) => {
    handlePriceChange(event.target.value)
    setData({...data, 'price':event.target.value})
    console.log(data)
  }

  const handleFormSubmit = (playerID) => {
    const isGreater = (price > oldPrice)
    if (isGreater) {
    fetch(`/api/players/${playerID}/update/`, {
      method: 'PUT',
      body: JSON.stringify(
        data
      ),
      headers: {
        "Content-type": "application/json"
      }
    })}
  }

  return (
    <>
      <div>
          <p>Hello World</p>
          <input type = "text" />
          <button>Add</button>
          <form>
              <label>Enter a price:</label>
              <input className="inp" required value={price} onChange={handleChange} type="number" name="price" autoComplete="off"/>
          </form>
          <MDBBtn onClick={handleFormSubmit(playerID)} color="amber">
              CONTINUE
          </MDBBtn>
          <PlayerCard/>
      </div>
    </>
  )
}
  
  export default Home