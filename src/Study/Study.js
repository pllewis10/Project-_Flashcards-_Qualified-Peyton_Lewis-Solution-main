import React, { useEffect, useState } from "react";
import { Link, useParams} from 'react-router-dom'
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import Cards from "./Cards";

function Study() {
  const [deckInfo, setDeckInfo] = useState([]);
  const { deckId } = useParams();

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

  const deckLength = deckInfo.cards && deckInfo.cards.length 
  if (deckLength < 3) {
    return (
      <NotEnoughCards deckLength={deckLength} deckInfo={deckInfo}/>
    )
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <Link to={'/'}>
            <li className="breadcrumb-item">Home / </li>
          </Link>
          <Link to={`/decks/${deckInfo.id}`}>
            <li className="breadcrumb-item">{deckInfo.name}</li>
          </Link>
          <li className="breadcrumb-item active" aria-current="page">/ Study</li>
        </ol>
      </nav>
      <h1>Study: {deckInfo.name}</h1>
      <Cards />
    </div>
  )
};

export default Study