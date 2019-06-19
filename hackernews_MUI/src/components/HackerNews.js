import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewsList from './NewsList';

import Search from './Search';

// API constants
const DEFAULT_HPP = '20';
// const DEFAULT_SEARCH = 'react';

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
      searchString: '',
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
    this.setState({
      result: { ...result, hits: newHits },
    });
  };
  
  onSearchChange = (e) => {
    this.setState({
      searchString: e.target.value,
    });
  };
  
  onSearchSubmit = (e) => {
    const { searchString } = this.state;
    this.setState({ searchKey: searchString });
    this.requestApiSearch(searchString);
    e.preventDefault();
  };
  
  setSearchTopStories = (result) => {
    this.setState({
      result,
    });
  };
  
  requestApiSearch(searchTerm = '', page = 0) {
    const searchUrl = searchTerm
      ? `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
      : `${PATH_BASE}${PATH_SEARCH}?tags=front_page`;
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
    const {
      result, results, searchKey, searchString,
    } = this.state;
    const page = (result && result.page) || 0;
    // const page = (results && results[searchKey] && results[searchKey].page) || 0;
    // const list = (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className="page">
        <div className="interactions">
          <Search
            onChange={this.onSearchChange}
            value={searchString}
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
                  searchTerm={searchString}
                />
              </Grid>
            </Grid>
          )}
        </div>
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
        {/* <hr />
        <h3>Material-ui Table Pagination</h3>
        <Pagination /> */}
      </div>
    );
  }
}
