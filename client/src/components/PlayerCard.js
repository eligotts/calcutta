import React from 'react'
import './css/PlayerCard.css'

  export const PlayerCard = ({
    player
  }) => {
  return (
    <>
      <div className="player-card">
        <p>Name: {player.name}</p>
        <p>Price: {player.price}</p>
        <img className="imagetest" src= {player.img_link} alt="" width="50px" />
      </div>
    </>
  )
}

