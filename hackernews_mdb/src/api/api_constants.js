// API constants

// sets the default amount of hits returned per page
export const DEFAULT_HPP = '5';

// the initial default serach term
export const DEFAULT_SEARCH = 'gatsby';

// variables to build the final search string
export const PATH_BASE = 'https://hn.algolia.com/api/v1';
export const PATH_SEARCH = '/search';
export const PARAM_SEARCH = 'query=';
export const PARAM_PAGE = 'page=';
export const PARAM_HPP = 'hitsPerPage=';