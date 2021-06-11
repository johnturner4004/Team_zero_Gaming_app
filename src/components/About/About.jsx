import { Container, Grid, List, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  padding: {
    padding: "5%"
  }
})

export default function About() {
  const classes = useStyles();
  return(
    <Container >
    <Typography variant="h4" component="h1" className={classes.padding}>
      About
    </Typography>
    <Paper className={classes.padding}>
    <Typography variant="h5" component="h2">
      Technologies used:
    </Typography>
    <Grid container>
    <Grid item xs="6">
    <List>
      <ListItemText>React</ListItemText>
      <ListItemText>Material-UI</ListItemText>
      <ListItemText>Moment</ListItemText>
      <ListItemText>HTML</ListItemText>
      <ListItemText>Redux</ListItemText>
      
    </List>
    </Grid>
    <Grid item xs="6">
    <List>
      <ListItemText>Axios</ListItemText>
      <ListItemText>Express</ListItemText>
      <ListItemText>Passport.js</ListItemText>
      <ListItemText>Node.js</ListItemText>
      <ListItemText>PostgreSQL</ListItemText>
      
    </List>
    </Grid>
    </Grid>
    </Paper>
    </Container>
  )
}