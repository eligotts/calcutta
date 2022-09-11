import React, {useState, useEffect} from 'react'
//import { Link } from "react-router-dom"; //look up react router dom for all the things you can import
import {PlayerCard} from '../components/PlayerCard'
import {TextInput} from '../components/TextInput'
import { MDBBtn } from 'mdb-react-ui-kit';
import Countdown from 'react-countdown'
import './css/Home.css'

function Home() {

  //getting basic data of all players

  //const [data, setData] = useState([{}])
  const [oldPrice, setOldPrice] = useState([{}])
  const [curIndex, setCurIndex] = useState(0)
  const [totPlayers, setTotPlayers] = useState([{}])
  const playerIDs = []


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
    fetch('/api/players/').then(
      res => res.json()
    ).then(
      numPlayers => {
        setTotPlayers(numPlayers)
      }
    )
  }, [])

  for (let i = 0; i < totPlayers.length; i++) {
    playerIDs.push(totPlayers[i]["id"])
  }


  const [playerID, setPlayerID] = useState(() => playerIDs[curIndex])
  console.log(playerID)



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
  if (curIndex < totPlayers.length - 1) {
    setCurIndex(curIndex + 1)
    setPlayerID(playerIDs[curIndex])
  }
}

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <p>Times up!</p>
  } else {
    // Render a countdown
    return <span>Time remaining: {seconds} seconds</span>;
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
          <PlayerCard player = {oldPrice}/>
          <TextInput handleFormSubmit={handleFormSubmit} playerID={playerID}/>
      </div>
      <div className="timer">
          <Countdown className="timer" date={Date.now() + 10000} key = {oldPrice.price} renderer={renderer} onComplete={handleTimerDone}/>
      </div>
          {/* <MDBBtn onClick={handleFormSubmit(playerID)} color="amber">
              BID
          </MDBBtn> */}
          {/* <button onClick={testSocket}>Test WebSocket</button> */}
      
    </>
  )
}
  
  export default Home