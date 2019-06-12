import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/paper';
import HackerNews from './components/HackerNews';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#eef7f9'
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <Paper elevation={15} className={`App ${classes.root}`}>
      <h1 className=" text-center">HackerNews API</h1>
      <HackerNews />
    </Paper>
  );
}
