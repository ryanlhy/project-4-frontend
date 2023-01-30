import React from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Results from "../Components/Results";
import Search from "../Components/SearchBar";

function SearchPage(props) {
  return (
    <div>
      <h1>Search Page</h1>
      <Container>
        <Search />
      </Container>
      <Results page={"searchpage"} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    searchResults: state.searchResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
