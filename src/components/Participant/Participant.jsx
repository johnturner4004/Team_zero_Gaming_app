import { Backdrop, Card, Container, Grid, Link, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  link: {
    width: 135,
    marginRight: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  listCard: {
    width: "80%",
    padding: "5%",
  },
}))

export default function Participant(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const participant = useSelector(store => store.participant);

  const handleToggle = () => {
    setOpen(!open);
    dispatch({ type: 'FETCH_PARTICIPANT', payload: props.prop})
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Container className={classes.link}>
      <Typography>
        <Link color="primary" value={props.prop} onClick={handleToggle}>
          Who's playing
        </Link>
      </Typography>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Card className={classes.listCard}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Players:
              </Typography>
          {participant ? participant.map(user => {
          return(
              <div>
                <List>
                    <ListItem>
                      <ListItemText
                        primary={user.username}
                      />
                      
                    </ListItem>
                </List>
              </div>
            )
          }): ''}
            </Grid>
            </Grid>
        </Card>
      </Backdrop>
    </Container>
  )
}