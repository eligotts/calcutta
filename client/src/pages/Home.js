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
  const [playerID, setPlayerID] = useState(1)
  const [numPlayers, setNumPlayers] = useState([{}])


  //const playerID = 3

  // useEffect(() => {
  //   fetch(`/api/players/${playerID}/`).then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //     }
  //   )
  // }, [playerID])

  useEffect(() => {
    fetch('/api/numplayers/').then(
      res => res.json()
    ).then(
      numPlayers => {
        setNumPlayers(numPlayers)
      }
    )
  }, [])

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

  const handleFormSubmit = (data) => {
  if (data.price > oldPrice.price) {
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
  )}}


const handleTimerDone = () => {
  if (playerID < numPlayers) {
    setPlayerID(playerID + 1)
  }
}

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <p>Times up!</p>
  } else {
    // Render a countdown
    return <span>{seconds}</span>;
  }
}

useEffect(() => {
  var socket = new WebSocket('ws://' + window.location.host + '/ws/socket-server/')
  socket.onopen = e => {
    console.log('open', e)
  }
  console.log(socket)
  socket.onmessage = e => {
    let data = JSON.parse(e.data)
    console.log('Data:',data)
  }
}, [])

// const testSocket = () => {
//   // var socket = new WebSocket('ws://' + window.location.host + '/users/')
//   var socket = new WebSocket(`ws://${window.location.host}/ws/socket-server/`)

//   console.log(socket)

//   socket.onmessage = function(e){
//     let data = JSON.parse(e.data)
//     console.log('Data:',data)
//   }

  // socket.onopen = function(event) {
  //   console.log('WebSockets connection created.')
  // }

  // if (socket.readyState === WebSocket.OPEN) {
  //   socket.onopen()
  // }



  //to get a specific player
  // fetch(`/api/notes/${noteId}/`)
  //instead of empty list at the end of useEffect, pass in [noteId], this the dependency


  return (
    <>
      <div>
          {/* <script type='text/javascript'>
            let socket = new WebSocket(`ws://${window.location.host}/ws/socket-server/`)

            console.log(socket)

            socket.onmessage = function(e) {
              let data = JSON.parse(e.data)
              console.log('Data:',data)
            }
          </script> */}
          <PlayerCard player = {oldPrice}/>
          {/* <form onSubmit={handleFormSubmit}>
              <label>Enter a price:</label>
              <input className="inp" required value={price} onChange={handleChange} type="number" name="price" autoComplete="off"/>
              <input type="submit" value="BID" />
          </form> */}
          <TextInput handleFormSubmit={handleFormSubmit} playerID={playerID}/>
          <Countdown date={Date.now() + 10000} key = {oldPrice.price} renderer={renderer} onComplete={handleTimerDone}/>
          {/* <MDBBtn onClick={handleFormSubmit(playerID)} color="amber">
              BID
          </MDBBtn> */}
          {/* <button onClick={testSocket}>Test WebSocket</button> */}
      </div>
    </>
  )
}
  
  export default Home