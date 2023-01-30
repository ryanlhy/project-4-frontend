import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import { connect } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// useselector gets a small slice of the state object
function CardListing(props) {
  // const { name } = props;
  const [toggleButtonAdd, setToggleButtonAdd] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add to Watchlist
    </Tooltip>
  );

  const convertSgd = 1.41; // can use an api

  return (
    <Card
      className="flex-fill p-2 m-2"
      // border="secondary"
      style={{ width: "14rem" }}
    >
      <div className="card-effects">
        <Card.Img variant="top" src={props.image} />
      </div>
      <Card.Body>
        <Card.Title>
          {props.name} {props.setName} {props.number}/{props.printedTotal}
        </Card.Title>
        <Card.Text></Card.Text>
        <Card.Title>
          {/* SGD ${Math.round(parseInt(props.prices) * convertSgd)} */}
          SGD ${props.pricesSgd}
        </Card.Title>
      </Card.Body>
      {toggleButtonAdd === false ? (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button
            variant="primary"
            onClick={() => {
              props.handleNetValueIncrease(props.pricesSgd); // update cartCount in results.js
              props.handleWatchlist(props);
              setToggleButtonAdd(true);
              console.log(props.watchList);
            }}
          >
            Add
          </Button>
        </OverlayTrigger>
      ) : (
        <Button
          variant="secondary"
          // handleDelete takes in an index
          onClick={() => {
            props.handleNetValueDecrease(props.pricesSgd); // update cartCount in results.js
            props.handleDelete(
              props.watchList.findIndex((watchList) => {
                // find by id of the card
                return watchList.propsObj.id === props.propsObj.id;
              })
            );
            setToggleButtonAdd(false);
          }}
        >
          Added
        </Button>
      )}
    </Card>
  );
}

// step 1: define a mapStateToProps function
const mapStateToProps = (state) => {
  // ownprops can pass in props in component - optional
  return {
    // select part of the data needed from store in this component
    count: state.count,
    watchList: state.watchList,
  };
};

// step 2; define a mapDispatchToProps function
const mapDispatchToProps = (dispatch) => {
  return {
    // handleIncrement: () => dispatch({ type: "INCREMENT", amount: 1 }),
    // handleDecrement: () => dispatch({ type: "DECREMENT", amount: 1 }),
    // handleReset: () => dispatch({ type: "RESET", value: 0 }),
    handleWatchlist: (val) => dispatch({ type: "WATCHLIST", value: val }),
    handleDelete: (index) =>
      dispatch({ type: "WATCHLIST/REMOVE", value: index }),
  };
};

// step 3: connect the above two functions to redux
// ADD THIS ABOVE: import {connect} from "react-redux"
export default connect(mapStateToProps, mapDispatchToProps)(CardListing);

// export default CardListing;
