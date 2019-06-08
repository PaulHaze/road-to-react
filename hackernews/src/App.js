import React, { Component } from 'react';
// import SearchComp from './components/Search';

// Setup default URL constants
const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const list = [];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.author.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  // THE CONSTRUCTOR
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      list,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
  // METHODS
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    /* destructuring the component
           makes searchTerm & list = 
           this.state.searchTerm & this.state.list */
    const { searchTerm, result } = this.state;

    if (!result) {
      return null;
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            <h5>Search</h5>
          </Search>

          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>

        <div className="interactions">
          <div className="row">
            <div className="col">
              <Button className="" type="button">
                Shop
              </Button>
            </div>
            <div className="col">
              <Button className="" onClick={this.reset} type="button">
                Reload List
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
  <form>
    {children}
    <input type="text" value={value} onChange={onChange} />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID} className="table-row">
        <span style={{ width: '30%' }}>
          <a href={item.url}> {item.title},</a>
        </span>
        <span style={{ width: '30%' }}> {item.author}. </span>
        <span style={{ width: '20%' }}> {item.num_comments} comments </span>
        <span style={{ width: '10%' }}> Rating: {item.points} </span>
        <span style={{ width: '10%' }}>
          <Button
            className="button-inline"
            onClick={() => onDismiss(item.objectID)}
          >
            <i className="material-icons medium">cancel</i>
          </Button>
        </span>
        <br />
        <br />
      </div>
    ))}
  </div>
);

const Button = ({ onClick, className = '', children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;
