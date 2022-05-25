import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from 'react-router-dom'
import Home from "../Home/Home";
import CreateDeck from "../CreateDeck/CreateDeck";
import DeckView from "../DeckView/DeckView";
import EditDeck from "../EditDeck/EditDeck";
import Study from "../Study/Study";
import AddCard from "../AddCard/AddCard";
import EditCard from "../EditCard/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route exact path='/decks/:deckId'>
            <DeckView />
          </Route>
          <Route exact path='/decks/:deckId/edit'>
          <EditDeck />
          </Route>
          <Route exact path='/decks/:deckId/study'>
            <Study />
          </Route>
          <Route exact path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route>
          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </ Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;

