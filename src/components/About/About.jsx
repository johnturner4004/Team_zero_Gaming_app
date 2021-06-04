import { Container, Grid, List, ListItemText, Paper, Typography } from "@material-ui/core";

export default function About() {
  return(
    <Container>
    <Typography variant="h3" component="h1">
      About
    </Typography>
    <Paper>
    <Typography variant="h4">
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