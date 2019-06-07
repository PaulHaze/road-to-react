import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/paper';
import BookTable from './components/BookTable';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(8),
    backgroundColor: '#fafff9'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Paper elevation={15} className={`App ${classes.root}`}>
      <h1 className=" text-center">Book List</h1>
      <hr />
      <BookTable />
    </Paper>
  );
}
