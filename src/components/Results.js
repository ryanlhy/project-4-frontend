import CardListing from "./Card/CardListing";
import React from "react";
import derivePriceFromUnstructuredData from "../deriveUnstructureData";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import * as dotenv from "dotenv";
dotenv.config();

function Results(props) {
  const convertSgd = 1.41;
  const [pokemonArray, setPokemonArray] = useState([]);
  const [cartValue, setCartValue] = useState(0); // create another cart to meet project requirements in GA

  const key = process.env;
  // const pageSize = 10;
  // let pokeName = "charizard";
  const callTenCharizard = async () => {
    const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"charizard"&pageSize=10&api_key=${key}`;
    // const res = await fetch(urlSrc);
    // const json = await res.json();
    // await setPokemonArray(json.data[0].images.small);
    // return json.data[0].images.small;
    apiFunc(urlSrc);
  };

  const callApiSearch = async () => {
    if (props.search === "") {
      console.log("did not call api from search");
    } else {
      // reset at every search query
      let pageSize = 10;
      if (props.page === "searchpage") {
        pageSize = 50;
      }
      const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:"${props.search}"&pageSize=${pageSize}&${props.pageNum}&api_key=${key}`;
      console.log(urlSrc)
      apiFunc(urlSrc);
    }
    // if dont return any pokemon, enter set name?
  };

  const apiFunc = (urlSrc) => {
    // const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:${props.search}&pageSize=${pageSize}&api_key=${key}`;
    try {
      const fetchPromise = fetch(urlSrc);
      fetchPromise
        .then((response) => response.json())
        .then((data) => {
          setPokemonArray(data.data);
        })
        .catch((err) => {
          console.log(err)
          setPokemonArray([])
        });
    } catch (err) {
      console.log(err)
      setPokemonArray([])
    }
  };

  useEffect(() => {
    // check if empty array, dont procees with useEffect
    if (pokemonArray !== []) {
      console.log(pokemonArray);
      if (props.search === "") {
        callTenCharizard();
      } else {
        callApiSearch();
      }
    }
  }, [props.search, props.pageNum]);

  const handleNetValueIncrease = (pricesSgd) => {
    setCartValue(cartValue + pricesSgd);
  };

  const handleNetValueDecrease = (pricesSgd) => {
    setCartValue(cartValue - pricesSgd);
  };

  const mapPokemonArray = pokemonArray.map((arr, i) => {
    return (
      <CardListing
        className="p-5"
        propsObj={arr}
        name={arr.name}
        image={arr.images.small}
        number={arr.number}
        printedTotal={arr.set.printedTotal}
        setName={arr.set.name}
        pricesSgd={Math.round(
          parseInt(derivePriceFromUnstructuredData(arr)) * convertSgd
        )}
        key={arr.id}
        handleNetValueIncrease={handleNetValueIncrease}
        handleNetValueDecrease={handleNetValueDecrease}
      />
    );
  });
  const cardPlaceholderArr = [0, 0, 0, 0, 0, , 0, 0, 0, 0, 0];
  const cardsPlaceholder = cardPlaceholderArr.map((e, i) => {
    return (
      <Card className="flex-fill p-2 m-2" style={{ width: "14rem" }} key={i}>
        <Card.Img
          variant="top"
          src="https://preview.redd.it/hugjub0fziw61.jpg?width=640&crop=smart&auto=webp&s=ea0ef094a2b3c6a16931978da63e8288bcb0be64"
          alt="placeholder"
          height={"330px"}
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className="h-100">
      <Container className="float-right">
        <h1>
          <Badge bg="secondary">Value: ${cartValue}</Badge>
        </h1>
      </Container>
      <Container className="rowC bg-light">
        {" "}
        {pokemonArray.length === 0 ? cardsPlaceholder : <></>}
        {/* {cardsPlaceholder} */}
        {mapPokemonArray}
      </Container>
      {/* {pokemonArray !== [] ? (
        <Button variant="primary" type="submit" onClick={props.handlePageNum}>
          Search More
        </Button>
      ) : (
        <h1></h1>
      )} */}
      {/* <Alert>hi</Alert> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    searchResults: state.searchResults, // not needed anymore?
    pageNum: state.pageNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchPoke: (searchArr) =>
      dispatch({ type: "SEARCH/RESULTS", value: searchArr }),
    handlePageNum: () => dispatch({ type: "PAGENUMBER" }),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
