import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
    color: '#203b61'
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

export default function Search({ onChange, onSubmit, value }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        type="text"
        className={classes.input}
        placeholder="Search HackerNews API"
        value={value}
        onChange={onChange}
        inputProps={{ 'aria-label': 'Search Google Maps' }}
      />
      <Divider className={classes.divider} component={'hr'} />
      <IconButton
        onClick={onSubmit}
        className={classes.iconButton}
        aria-label="Search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
