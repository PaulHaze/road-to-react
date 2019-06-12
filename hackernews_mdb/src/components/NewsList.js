import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import NewsDetail from './NewsDetail';

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.author.toLowerCase().includes(searchTerm.toLowerCase());

const NewsList = ({ result, removeStory, searchTerm }) => (
  <MDBTable responsiveSm striped>
    <MDBTableHead style={{ justifyContent: 'space-between' }}>
      <tr className="grey-text">
        <th scope="col">TITLE</th>
        <th scope="col">AUTHOR</th>
        <th className="text-center" scope="col">
          RATING
        </th>
        <th className="text-center" scope="col">
          <i className="fas fa-comment-alt" />
        </th>
        <th scope="col" />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {result &&
        result.map(story => (
          <NewsDetail
            key={story.objectID}
            id={story.objectID}
            url={story.url}
            title={story.title}
            author={story.author}
            comments={story.num_comments}
            removeStory={removeStory}
            points={story.points}
          />
        ))}
    </MDBTableBody>
  </MDBTable>
);

export default NewsList;
