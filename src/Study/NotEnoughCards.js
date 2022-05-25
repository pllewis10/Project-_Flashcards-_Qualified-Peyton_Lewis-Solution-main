import React from "react"
import { Link, useParams } from 'react-router-dom'


function NotEnoughCards({ deckLength, deckInfo }) {
  const { deckId } = useParams()
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <Link to={'/'}>
            <li class="breadcrumb-item">Home /</li>
          </Link>
          <Link to={'/'}>
            <li class="breadcrumb-item">{deckInfo.name}</li>
          </Link>
            <li class="breadcrumb-item active" aria-current="page">/ Study</li>
        </ol>
      </nav>
      <h1>Study: {deckInfo.name}</h1>
      <h2>Not enough cards.</h2>
      <p>{`You need at least 3 cards to study. There are ${deckLength} cards in this deck`}</p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type='button' className='btn btn-primary'>Add Cards</button>
      </Link>
    </div>
  )
}

export default NotEnoughCards