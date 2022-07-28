import React, {useState, useEffect} from 'react'
//import { Link } from "react-router-dom"; //look up react router dom for all the things you can import
import PlayerCard from '../components/PlayerCard'

function Home() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api/players/").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  // fetch(`/api/notes/${noteId}/`)
  //instead of empty list at the end of useEffect, pass in [noteId], this the dependency

  return (
    <>
      <div>
          <p>Hello World</p>
          <input type = "text" />
          <button>Add</button>
          <PlayerCard/>
      </div>
    </>
  )
}
  
  export default Home