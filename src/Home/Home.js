import { listDecks } from "../utils/api";
import React, { useEffect, useState } from "react";
import DeckTile from "./DeckTile";
import { Link } from 'react-router-dom'


function Home() {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller
    const getDecks = async () => {
      try {
        const response = await listDecks(signal);
        setDeckList(response);
      } catch(e) {
        console.log(e)
      }
    }
    getDecks();
    return () => {
      controller.abort()
    }
  }, [])

  const decks = deckList.map((deck, i) => {
    return (
      <DeckTile deck={deck} key={deck.id}/>
    )
  });

  return (
    <div>
      <Link to= {`/decks/new`}>
        <button type="button" className="btn btn-secondary">Create Deck</button>
      </Link>
      { decks }
    </div>
  )
}

export default Home