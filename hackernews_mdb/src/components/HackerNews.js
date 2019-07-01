/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { sortBy } from '../../node_modules/lodash';
import MyButton from './MyButton';

import NewsList from './NewsList';
import Search from './Search';
import {
  DEFAULT_HPP,
  DEFAULT_SEARCH,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../api/api_constants';
import Loading from './Loading';
import withFeature from './withFeature';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
};

export default class HackerNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchString: DEFAULT_SEARCH,
      error: null,
      isLoading: false,
      sortKey: 'NONE'
    };
  }

  componentDidMount = () => {
    const { searchString } = this.state;
    this.setState({
      searchKey: searchString
    });
    this.requestApiSearch(searchString);
  };

  removeStory = id => {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    const updatedHits = hits.filter(x => x.objectID !== id);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  };

  onSearchChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  onSearchSubmit = e => {
    const { searchString } = this.state;
    this.setState({ searchKey: searchString });
    if (this.needsToSearchApi(searchString)) {
      this.requestApiSearch(searchString);
    }
    e.preventDefault();
  };

  onSort = sortKey => {
    this.setState({ sortKey });
  };

  needsToSearchApi = searchTerm => !this.state.results[searchTerm];

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
    });
  };

  requestApiSearch = (searchTerm, page = 0) => {
    this.setState({ isLoading: true });
    const searchUrl = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
                       &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    axios(searchUrl)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  };

  render() {
    const { results, searchKey, searchString, error, isLoading, sortKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    const tableHeader = isLoading ? <Loading /> : 'Results:';
    const ButtonWithLoading = withFeature(MyButton);
    return (
      <MDBContainer>
        {/* SEARCH */}
        <MDBRow className="py-2">
          <MDBCol md="12">
            <Search
              onChange={this.onSearchChange}
              searchString={searchString}
              onSubmit={this.onSearchSubmit}
            />
          </MDBCol>
        </MDBRow>

        {/* RESULTS */}
        <MDBRow>
          <MDBCol md="12">
            <h1 className="text-center">{tableHeader}</h1>
            {error ? (
              <h3 className="text-center">
                Something went wrong:
                <span>
                  <br />
                  <h5>{error.message}</h5>
                </span>
              </h3>
            ) : (
              <NewsList
                result={list}
                SORTS={SORTS}
                sortKey={sortKey}
                onSort={this.onSort}
                removeStory={this.removeStory}
              />
            )}
            <div className="interactions">
              <ButtonWithLoading
                isLoading={isLoading}
                className="float-right"
                onClick={() => this.requestApiSearch(searchKey, page + 1)}
                color="purple lighten-5"
                outline
                size="sm"
                href="#"
              >
                <i className="fas fa-arrow-right" />
              </ButtonWithLoading>

              {page > 0 && (
                <MDBBtn
                  className="float-right"
                  onClick={() => this.requestApiSearch(searchKey, page - 1)}
                  color="purple lighten-3"
                  outline
                  size="sm"
                  href="#"
                >
                  <i className="fas fa-arrow-left" />
                </MDBBtn>
              )}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
