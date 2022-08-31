import React, {useState, useEffect} from 'react'
//import { Link } from "react-router-dom"; //look up react router dom for all the things you can import
import {PlayerCard} from '../components/PlayerCard'
import {TextInput} from '../components/TextInput'
import { MDBBtn } from 'mdb-react-ui-kit';
import Countdown from 'react-countdown'

function Home() {

  //getting basic data of all players

  //const [data, setData] = useState([{}])
  const [oldPrice, setOldPrice] = useState([{}])


  const playerID = 3

  // useEffect(() => {
  //   fetch(`/api/players/${playerID}/`).then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //     }
  //   )
  // }, [playerID])

  //could probably make this more efficient, try not to have two calls
  //need to figure out how to make an immutable variable
  useEffect(() => {
    fetch(`/api/players/${playerID}/`).then(
      res => res.json()
    ).then(
      oldPrice => {
        setOldPrice(oldPrice)
      }
    )
  }, [playerID])

    //updating price of a player
  // const [price, setPrice] = useState('')
  // const handlePriceChange = (inputValue) => {
  //   setPrice(inputValue)
  // }

  // const handleChange = (event) => {
  //   handlePriceChange(event.target.value)
  //   setData({...data, 'price':event.target.value})
  //   console.log(data)
  // }

  const handleFormSubmit = (price,data) => {
  const isGreater = (price > oldPrice.price)
  if (isGreater) {
  fetch(`/api/players/${playerID}/update/`, {
    method: 'PUT',
    body: JSON.stringify(
      data
    ),
    headers: {
      "Content-type": "application/json"
    }
  }).then(
    res => res.json()
  ).then(
    oldPrice => {
      setOldPrice(oldPrice)
      console.log(oldPrice)
    }
  )}
}

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    console.log("test")
  } else {
    // Render a countdown
    return <span>{seconds}</span>;
  }
};


  //to get a specific player
  // fetch(`/api/notes/${noteId}/`)
  //instead of empty list at the end of useEffect, pass in [noteId], this the dependency


  return (
    <>
      <div>
          <PlayerCard player = {oldPrice}/>
          {/* <form onSubmit={handleFormSubmit}>
              <label>Enter a price:</label>
              <input className="inp" required value={price} onChange={handleChange} type="number" name="price" autoComplete="off"/>
              <input type="submit" value="BID" />
          </form> */}
          <TextInput handleFormSubmit={handleFormSubmit} onComplete={() => (console.log("test"))}/>
          <Countdown date={Date.now() + 20000} key = {oldPrice.price} renderer={renderer}/>
          {/* <MDBBtn onClick={handleFormSubmit(playerID)} color="amber">
              BID
          </MDBBtn> */}
      </div>
    </>
  )
}
  
  export default Home