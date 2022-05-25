import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from 'react-router-dom'
import { readDeck, createCard} from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const [deckInfo, setDeckInfo] = useState([]);
  const { deckId } = useParams();
  const initialCardState = { card: {front: '', back: ''} };
  const [cardData, setCardData] = useState({ ...initialCardState });

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
     const getDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setDeckInfo(response);
      } catch(e) {
        console.log(e)
      }
      
    }
    getDeck();
    return () => {
      controller.abort()
    }
  }, [deckId])

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
      await createCard(deckId, cardData)
      //setCardData({ ...initialCardState })
      history.go(0)
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
          <li className="breadcrumb-item active" aria-current="page">/ Add Card</li>
        </ol>
      </nav>
      <h1><span>{deckInfo.name}</span>: <span>Add Card</span></h1>
      <CardForm handleSubmit={handleSubmit} card={cardData} setCard={setCardData}/>
      <br />
      <Link to={`/decks/${deckId}`}>
        <button type="button" className="btn btn-secondary">Done</button>
      </Link>
    </div>
  )
};

export default AddCard