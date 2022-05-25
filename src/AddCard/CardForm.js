import React from "react";


function CardForm({ card, handleSubmit, handleChange }) {;


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Front">
        Front
        <br />
        <textarea
            id='front'
            name='front'
            onChange={handleChange}
            value={card.front}
            rows='5'
            required
            />
      </label>
      <br />
      <label htmlFor="back">
        Back
        <br />
          <textarea
            id='back'
            name='back'
            onChange={handleChange}
            value={card.back}
            rows='5'
            required
            />
      </label>
      <br />
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  )
}

export default CardForm