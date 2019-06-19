/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import NewsList from './NewsList';

import Search from './Search';

// API constants
const DEFAULT_HPP = '5';
const DEFAULT_SEARCH = 'gatsby';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

export default class HackerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchString: DEFAULT_SEARCH,
      error: null,
    };
  }

  componentDidMount() {
    const { searchString } = this.state;
    this.setState({
      searchKey: searchString,
    });
    this.requestApiSearch(searchString);
  }

  removeStory = (id) => {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    const updatedHits = hits.filter(x => x.objectID !== id);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
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
    if (this.needsToSearchApi(searchString)) {
      this.requestApiSearch(searchString);
    }
    e.preventDefault();
  };

  needsToSearchApi = searchTerm => !this.state.results[searchTerm];

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits,
    ];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  };

  requestApiSearch = (searchTerm, page = 0) => {
    const searchUrl = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
                       &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(searchUrl)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { results, searchKey, searchString, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
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

            {error
              ? (
                <h3 className="text-center">
                  Something went wrong:
                  <span>
                    <br />
                    <h5>{error.message}</h5>
                  </span>
                </h3>
              )
              : (
                <NewsList
                  result={list}
                  removeStory={this.removeStory}
                  searchTerm={searchString}
                />
              )
            }

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
                  onClick={() => this.requestApiSearch(searchKey, page - 1)}
                  href="#"
                >
                  ←
                </Button>
              )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
