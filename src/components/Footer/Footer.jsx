import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import './Footer.css';
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles({
  text: {
    color: grey[50],
  },
})

function Footer() {
  const classes = useStyles()

  return (
  <footer>
  <Typography className={classes.text}>&copy; Team zero Gaming</Typography>
  </footer>
  )
}

export default Footer;
