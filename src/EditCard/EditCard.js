import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "../AddCard/CardForm";
import { Link, useParams, useHistory } from 'react-router-dom'

function EditCard () {
  const [deckInfo, setDeckInfo] = useState([]);
  const [cardData, setCardData] = useState([]);
  const params = useParams();
  const history = useHistory();

  const handleChange = ({ target }) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    const getDeck = async () => {
      const response = await readDeck(params.deckId);
      setDeckInfo(response);
    }
    getDeck();
  }, [params])

  useEffect(() => {
    const getCard = async () => {
      const response = await readCard(params.cardId);
      setCardData(response);
    }
    getCard();
  }, [params])

  const handleCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${params.deckId}`)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
      console.log(cardData)
        await updateCard(cardData)
        //setCardData({ ...cardInfo })
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
            <li className="breadcrumb-item">{`/ Deck ${deckInfo.name}`}</li>
          </Link>
          <li className="breadcrumb-item active" aria-current="page">{`/ Edit Card ${params.cardId}`}</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm 
        setCard={setCardData}
        card={cardData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <button type="button" className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default EditCard 