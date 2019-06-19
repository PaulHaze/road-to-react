/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NewsList from './NewsList';

import Search from './Search';

// API constants
const DEFAULT_HPP = '5';
const DEFAULT_SEARCH = 'react';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

export default class HackerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      results: null,
      searchKey: '',
      searchString: DEFAULT_SEARCH,
      pageNumber: 0,
    };
    this.requestApiSearch = this.requestApiSearch.bind(this);
  }

  componentDidMount() {
    const { searchString } = this.state;
    this.requestApiSearch(searchString);
  }

  removeStory = (id) => {
    const { result } = this.state;
    const newHits = result.hits.filter(x => x.objectID !== id);
    this.setState(prevState => ({
      result: { ...prevState.result, hits: newHits },
    }));
  };

  onSearchChange = (e) => {
    this.setState({
      searchString: e.target.value,
    });
  };

  onSearchSubmit = (e) => {
    e.preventDefault();
    const { searchString } = this.state;
    this.setState({ searchKey: searchString });
    this.requestApiSearch(searchString);
  };

  // setSearchTopStories = (result) => {
  //   this.setState({
  //     result,
  //   });
  // };

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits,
    ];
    this.setState({
      result: { hits: updatedHits, page },
    });
  };

  requestApiSearch(searchTerm, page = 0) {
    const searchUrl = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }


  // setSearchTopStories = result => {
  //   const { hits, page } = result;
  //   const { searchKey, results } = this.state;
  //   const oldHits =
  //     results && results[searchKey]
  //       ? results[searchKey].hits
  //       : [];
  //
  //   const updatedhits = [...oldHits, ...hits];
  //   this.setState({
  //     results: {
  //       ...results,
  //       [searchKey]: { hits: updatedhits, page }
  //     }
  //   });
  // };


  render() {
    const { result, results, searchKey, searchString } = this.state;
    const page = (result && result.page) || 0;
    // const page = (results && results[searchKey] && results[searchKey].page) || 0;
    // const list = (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className="page">
        <div className="interactions">

          {/* SEARCH */}
          <Search
            onChange={this.onSearchChange}
            value={searchString}
            onSubmit={this.onSearchSubmit}
          />
          <hr />

          <div className="Table-one">
            <h1 className="text-center">Results: Table One</h1>
            {result && (
              <NewsList
                result={result.hits}
                removeStory={this.removeStory}
                searchTerm={searchString}
              />
            )}

            {/* BUTTONS */}
            <div className="interactions">
              <Button
                className="float-right"
                onClick={() => this.requestApiSearch(searchString, page + 1)}
                href="#"
              >
                →
              </Button>
              {page > 0
              && (
                <Button
                  className="float-right"
                  onClick={() => this.requestApiSearch(searchString, page - 1)}
                  href="#"
                >
                  ←
                </Button>
              )
              }
            </div>
          </div>

          {/* TABLE SECOND */}
          <div className="Table-one mt-5">
            <h1 className="text-center">Results: Table Two</h1>
            {result && (
              <NewsList
                result={result.hits}
                removeStory={this.removeStory}
                searchTerm={searchString}
              />

            )}

            {/* BUTTONS */}
            <div className="interactions change-page">
              <Button
                className="float-right"
                onClick={() => this.requestApiSearch(searchString, page + 1)}
                href="#"
              >
                LOAD MORE
              </Button>
            </div>
          </div>
        </div>

        {/* <hr />
        <h3>Material-ui Table Pagination</h3>
        <Pagination /> */}
      </div>
    );
  }
}
