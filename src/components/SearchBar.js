import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

function SearchBar(props) {
  const [placeholderSearch, setPlaceholderSearch] = useState("Enter a Pokemon");
  useEffect(() => {
    setPlaceholderSearch(props.search);
  }, [props.search]);
  return (
    <Form className="d-flex m-5">
      <Form.Control
        type="search"
        placeholder={placeholderSearch}
        className="me-2"
        aria-label="Search"
        onChange={(e) => props.handleChange(e)}
      />
      {/* <Link to="/search"> */}
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      {/* </Link> */}
    </Form>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     search: state.search,
//     searchResults: state.searchResults,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleChange: (e) => dispatch({ type: "SEARCH", value: e.target.value }),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Search);
export default SearchBar;