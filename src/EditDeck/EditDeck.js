import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import DeckForm from "../CreateDeck/DeckForm";
import { Link, useParams, useHistory } from 'react-router-dom'

function EditDeck() {
  const initialDeckState = {
    name: "",
    description: "",
    id: ""
  };
  const [deckInfo, setDeckInfo] = useState({ ...initialDeckState });
  const params = useParams();
  const history = useHistory();

  

  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(params.deckId);
      setDeckInfo(response);
    }
    getDeck();
  }, [params])

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${params.deckId}`)
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <Link to={'/'}>
            <li className="breadcrumb-item">Home</li>
          </Link>
          <Link to={`/decks/${deckInfo.id}`}>
            <li className="breadcrumb-item">{`/ ${deckInfo.name}`}</li>
          </Link>
          <li className="breadcrumb-item active" aria-current="page">/ Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm 
        descriptionInput={deckInfo.description}
        nameInput={deckInfo.name}
        deckType={'edit'}
        deckId={deckInfo.id}
      />
      <button type="button" onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default EditDeck