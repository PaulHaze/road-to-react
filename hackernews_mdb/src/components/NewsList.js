import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import NewsDetail from './NewsDetail';

const Sort = ({ sortKey, onSort, children }) => (
  <button
    style={{
      maxWidth: '20px',
      maxHeight: '20px',
      minWidth: '20x',
      minHeight: '20px',
      padding: '1px',
      marginLeft: '10px'
    }}
    type="button"
    className="btn btn-outline-light btn-sm"
    onClick={() => onSort(sortKey)}
  >
    {children}
  </button>
);
const SortTh = ({ sortKey, onSort, children }) => (
  <th onClick={() => onSort(sortKey)}>{children}</th>
);

const NewsList = ({ result, SORTS, sortKey, onSort, removeStory, isSortReverse }) => {
  const sortedList = SORTS[sortKey](result);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
  return (
    <MDBTable responsiveSm striped>
      <MDBTableHead color="primary-color">
        <tr>
          <th scope="col">
            Title
            <Sort sortKey="TITLE" onSort={onSort}>
              <i class="fas fa-chevron-up"></i>
            </Sort>
          </th>
          <th scope="col">
            Author
            <Sort sortKey="AUTHOR" onSort={onSort}>
              <i class="fas fa-chevron-up"></i>
            </Sort>
          </th>
          <th className="text-center" scope="col">
            Points
            <Sort sortKey="POINTS" onSort={onSort}>
              <i class="fas fa-chevron-up"></i>
            </Sort>
          </th>
          <th className="text-center" scope="col">
            <i className="fas fa-comment-alt" />
            <Sort sortKey="COMMENTS" onSort={onSort}>
              <i class="fas fa-chevron-up"></i>
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
        ))}
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
};

export default NewsList;
