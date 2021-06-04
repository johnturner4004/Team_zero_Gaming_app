import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import './Footer.css';
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles({
  text: {
    color: grey[50],
  },
})

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  const classes = useStyles()

  return (
  // <footer>&copy; Prime Digital Academy</footer>
  <footer>
  <Typography className={classes.text}>&copy; Team zero Gaming</Typography>
  </footer>
  )
}

export default Footer;
