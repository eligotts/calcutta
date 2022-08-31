import React from 'react'

  export const PlayerCard = ({
    player
  }) => {
  return (
    <>
      <div>
        <p>Name: {player.name}</p>
        <p>Price: {player.price}</p>
      </div>
    </>
  )
}

