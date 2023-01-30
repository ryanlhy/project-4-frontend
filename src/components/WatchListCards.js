import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import { connect } from "react-redux";

function WatchListCards(props) {
  return (
    <div className="rowC">
      {props.watchList.map((arr, i) => {
        return (
          <Card className="p-2 m-2" key={i} style={{ width: "14rem" }}>
            <Card.Img variant="top" src={arr.image} />
            <Card.Body>
              <Card.Title>
                {arr.name} {arr.setName} {arr.number}/{arr.printedTotal}
              </Card.Title>
              <Card.Title>SGD ${arr.pricesSgd}</Card.Title>
              <Card.Text></Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  props.handleDelete(i);
                }}
              >
                Delete
              </Button>{" "}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    watchList: state.watchList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (index) =>
      dispatch({ type: "WATCHLIST/REMOVE", value: index }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListCards);
