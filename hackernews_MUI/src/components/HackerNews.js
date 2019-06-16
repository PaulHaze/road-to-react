import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewsList from './NewsList';

import Search from './Search';
import Pagination from './Pagination';

// API constants
const DEFAULT_HPP = '20';

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
      searchString: '',
      pageNumber: 0
    };
  }

  componentDidMount = () => {
    this.requestApiSearch();
  };

  requestApiSearch = (page = 0) => {
    const { searchString } = this.state;
    const searchUrl = searchString
      ? `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchString}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
      : `${PATH_BASE}${PATH_SEARCH}?tags=front_page`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  };

  // setSearchTopStories = result => {
  //   const { hits, page } = result;
  //   const oldHits = page ? this.state.result.hits : [];
  //   const updatedHits = [...oldHits, ...hits];
  //   this.setState({
  //     result: { hits: updatedHits, page }
  //   });
  // };
  setSearchTopStories = result => {
    this.setState({
      result
    });
  };

  onSearchChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };
  onSearchSubmit = e => {
    e.preventDefault();
    this.requestApiSearch();
  };

  removeStory = id => {
    const newHits = this.state.result.hits.filter(x => x.objectID !== id);
    this.setState({
      result: { ...this.state.result, hits: newHits }
    });
  };

  render() {
    const { result, searchTerm, searchString, pageNumber } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            onChange={this.onSearchChange}
            searchString={searchString}
            onSubmit={this.onSearchSubmit}
          />
          <hr />
          <h1 className="text-center">Results:</h1>
          {result && (
            <Grid container>
              <Grid item xs={12}>
                <NewsList
                  result={result.hits}
                  removeStory={this.removeStory}
                  searchTerm={searchTerm}
                />
              </Grid>
            </Grid>
          )}
        </div>
        <div className="interactions">
          <Button
            className="float-right"
            onClick={() => this.requestApiSearch(page + 1)}
          >
            →
          </Button>
          <Button
            className="float-right"
            onClick={() => this.requestApiSearch(page - 1)}
          >
             ←
          </Button>
        </div>
        <hr />
        <h3>Material-ui Table Pagination</h3>
        <Pagination />
      </div>
    );
  }
}
