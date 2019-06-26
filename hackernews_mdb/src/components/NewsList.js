import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import NewsDetail from './NewsDetail';

const Sort = ({ sortKey, onSort, children }) => (
  <button
    type="button"
    className="btn btn-light btn-block"
    onClick={() => onSort(sortKey)}
  >
    {children}
  </button>
);

const NewsList = ({ result, SORTS, sortKey, onSort, removeStory }) => (
  <MDBTable responsiveSm striped>
    <MDBTableHead style={{ justifyContent: 'space-between' }}>
      <tr className="grey-text">
        <th scope="col">
          <Sort
            sortKey="TITLE"
            onSort={onSort}
          >
            Title
          </Sort>
        </th>
        <th scope="col">
          <Sort
            sortKey="AUTHOR"
            onSort={onSort}
          >
            Author
          </Sort>
        </th>
        <th className="text-center" scope="col">
          <Sort
            sortKey="POINTS"
            onSort={onSort}
          >
            Points
          </Sort>
        </th>
        <th className="text-center" scope="col">
          <Sort
            sortKey="COMMENTS"
            onSort={onSort}
          >
            <i className="fas fa-comment-alt" />
          </Sort>

        </th>
        <th scope="col" />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {SORTS[sortKey](result).map(story => (
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
      ))
      }
      {/* {result */}
      {/*  && result.map(story => ( */}
      {/*    <NewsDetail */}
      {/*      key={story.objectID} */}
      {/*      id={story.objectID} */}
      {/*      url={story.url} */}
      {/*      title={story.title} */}
      {/*      author={story.author} */}
      {/*      comments={story.num_comments} */}
      {/*      removeStory={removeStory} */}
      {/*      points={story.points} */}
      {/*    /> */}
      {/*  ))} */}
    </MDBTableBody>
  </MDBTable>
);

export default NewsList;
