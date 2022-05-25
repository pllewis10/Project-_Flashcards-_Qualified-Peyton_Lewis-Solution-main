import React, { useState, useEffect } from "react";
import { useHistory  } from 'react-router-dom'
import { createDeck, updateDeck } from "../utils/api";

function DeckForm({ nameInput, descriptionInput, deckType, deckId }) {
  const initialDeckState = {
    name: nameInput,
    description: descriptionInput,
    id: deckId
  };
  const [deckData, setDeckData] = useState({ ...initialDeckState });

  useEffect(() => {
    setDeckData({
      name: nameInput,
      description: descriptionInput,
      id: deckId
    });
  }, [nameInput, descriptionInput, deckId]);

  const handleChange = ({ target }) => {
    setDeckData({
      ...deckData,
      [target.name]: target.value,
    });
  };

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (deckType === 'create') {
      const response = await createDeck(deckData)
      setDeckData({ ...initialDeckState })
      history.push(`/decks/${response.id}`)
    } else if (deckType === 'edit') {
      const response = await updateDeck(deckData)
      setDeckData({ ...initialDeckState })
      history.push(`/decks/${response.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <br />
        <input
          type="text"
          id='name'
          name='name'
          onChange={handleChange}
          value={deckData.name}
          required
          />
      </label>
      <br />
      <label htmlFor="description">
        Description
        <br />
          <textarea
            id='description'
            name='description'
            onChange={handleChange}
            value={deckData.description}
            rows='5'
            required
            />
      </label>
      <br />
      <button type="submit" className='btn btn-primary'>Submit</button>

    </form>
  )
}

export default DeckForm