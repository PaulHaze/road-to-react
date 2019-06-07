import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';
import { list } from './data/list';
import BookList from './components/BookTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    backgroundColor: '#fafff9'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Paper elevation={15} className={`App ${classes.root}`} rounded>
      <h1 className=" text-center">Book List</h1>
      <hr />
      <BookList list={list} />
    </Paper>
  );
}
