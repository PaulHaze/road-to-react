import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HackerNews from './components/HackerNews';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingBottom: '50px',
    backgroundColor: '#f1f1f6',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Paper elevation={15} className={`${classes.root} App `}>
      <h1 className=" text-center">HackerNews API</h1>
      <HackerNews />
    </Paper>
  );
}
