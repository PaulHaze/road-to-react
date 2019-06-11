import React from 'react';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NewsDetail from './NewsDetail';

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.author.toLowerCase().includes(searchTerm.toLowerCase());

const NewsList = ({ result, removeStory, searchTerm }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>TITLE</TableCell>
        <TableCell align="left">AUTHOR</TableCell>
        <TableCell align="center">RATING</TableCell>
        <TableCell align="center">
          <Icon>comment</Icon>
        </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {result &&
        result
          .filter(isSearched(searchTerm))
          .map(story => (
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
    </TableBody>
  </Table>
);

export default NewsList;
