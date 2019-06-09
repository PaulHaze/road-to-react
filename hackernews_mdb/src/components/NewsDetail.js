import React from 'react';
import { MDBBtn } from 'mdbreact';

const NewsDetail = ({
  url,
  id,
  title,
  author,
  points,
  comments,
  removeStory
}) => (
  <tr className="text-mdb-color darken-1 mt-5">
    <td>
      <span>
        <a href={url} target="blank">
          {' '}
          {title}
        </a>
      </span>
    </td>
    <td>{author}</td>
    <td className="text-center">{points}</td>
    <td className="text-center">{comments}</td>
    <td>
      <MDBBtn
        style={{
          maxWidth: '40px',
          maxHeight: '40px',
          minWidth: '30px',
          minHeight: '30px',
          padding: '5px',
          verticalAlign: 'bottom'
        }}
        onClick={() => removeStory(id)}
        color="danger"
        outline
        size="sm"
      >
        <i className="fas fa-minus-circle" />
      </MDBBtn>
    </td>
  </tr>
);

export default NewsDetail;
