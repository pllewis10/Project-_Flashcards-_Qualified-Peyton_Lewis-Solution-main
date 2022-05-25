import React from "react";
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { deleteDeck } from "../utils/api";


function DeckTile({ deck }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const deleteButton = async (event) => {
    if (window.confirm('Delete this deck? You will not be able to recover it.')) {
      await deleteDeck(deck.id)
      history.go(0)
    }
  }

  return(
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</h6>
        <p className="card-text">{deck.description}</p>
        <Link to= {`${url}decks/${deck.id}`}>
          <button type="button" className="btn btn-secondary mr-2">View</button>
        </Link>
        <Link to= {`${url}decks/${deck.id}/study`}>
          <button type="button" className="btn btn-primary mr-2">Study</button>
        </Link>
        <button type="button" className="btn btn-danger" onClick={deleteButton}>Delete</button>
      </div>
    </div>
  )
}

export default DeckTile