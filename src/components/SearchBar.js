import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Autocomplete from 'react-autocomplete';
import { pokemons } from "../Resources/data";


function Search(props) {
  const [placeholderSearch, setPlaceholderSearch] = useState("Enter a Pokemon");
  const [value, setValue] = useState("");
  const [pokemonItem, setPokemonItem] = useState(pokemons)
  useEffect(() => {
    setPlaceholderSearch(props.search);
    // setItems(pokemons)
  }, [props.search]);

  useEffect(() => {
    setPokemonItem(pokemons.filter(pokemon => 
        pokemon.toLowerCase().includes(props.search.toLowerCase())
    ));
}, [props.search]);

  // const handleItems = (e) => {
  //   setValue(e.target.value);
  //   setPokemonItem(pokemonItem.filter(pokemon => {
  //       return pokemon.toLowerCase().includes(String(e.target.value).toLowerCase())    }));
  //   props.dispatchChange(e);
  // };
  

  // to provide a list of suggestions to items.prop
  return (
    <Form className="d-flex m-5">
      <Autocomplete
        value={placeholderSearch}
        items={pokemonItem}
        getItemValue={(item) => item}
        onChange={(e) => {
          setPlaceholderSearch(e.target.value);
          props.dispatchChange(e.target.value);
        }}
        onSelect={(val) => {
          setPlaceholderSearch(val);
          console.log(val)
          props.dispatchChange(val)
        }}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item}
          </div>
        )}
      />
      <Form.Control
        type="search"
        placeholder={placeholderSearch}
        className="me-2"
        aria-label="Search"
        onChange={(e) => props.dispatchChange(e.target.value)}
      />
      <Link to="/search">
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Link>
    </Form>
  );
}
const mapStateToProps = (state) => {
  return {
    search: state.search,
    searchResults: state.searchResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchChange: (e) => dispatch({ type: "SEARCH", value: e}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
