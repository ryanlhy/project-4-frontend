// import Form from "react-bootstrap/Form";
// import SignUpForm from "./SignUpForm";
// import Navigation from "./Navigation";
import React from "react";

import Results from "../Components/Results"
import Search from "../Components/SearchBar";
import { Container } from "react-bootstrap";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="bg-light">
      <h1>Pokemon TCG Watchlist</h1>
      <Container>
        <Search />
      </Container>
      
      <Results />
      {/* <SignUpForm /> */}
      {/* <ApiPokemon /> */}
      <Footer />
    </div>
  );
}

export default Home;
