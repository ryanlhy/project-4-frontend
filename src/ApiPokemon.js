import React from "react";
// import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

function ApiPokemon(props) {
  console.group("apipokemon");
  console.log(props);
  return (
    <div>
      <Button onClick={props.APICallclicked}>API Call</Button>
      <img src={props.img} alt="" />
      <h2>display count: {props.count}</h2>
    </div>
  );
}
const key = "4485d77b-72a5-4262-a292-e52f5be06f10";

// const callTenCharizard = async () => {
//   const key = "4485d77b-72a5-4262-a292-e52f5be06f10";

//   const urlSrc = `https://api.pokemontcg.io/v2/cards?q=name:charizard&pageSize=10&api_key=${key}`;
//   const res = await fetch(urlSrc);
//   const json = await res.json();
// };

const apiLogic = () => {
  return async (dispatch) => {
    const urlSrc = `https://api.pokemontcg.io/v2/cards/xy1-1?api_key=${key}`;

    const res = await fetch(urlSrc);
    const json = await res.json();

    dispatch({ type: "CARDS", url: json.data.images.small });
  };
};

//////////////////////////////////////////////////////////////
// step 1: define a mapStateToProps function
const mapStateToProps = (state) => {
  return {
    // img: state.img,
    img: state.img,
  };
};

// step 2; define a mapDispatchToProps function
const mapDispatchToProps = (dispatch) => {
  return {
    APICallclicked: () => dispatch(apiLogic()),
  };
};

// step 3: connect the above two functions to redux
export default connect(mapStateToProps, mapDispatchToProps)(ApiPokemon);
