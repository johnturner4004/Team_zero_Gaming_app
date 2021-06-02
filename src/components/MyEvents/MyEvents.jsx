import { Card, CardContent  } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  frame:{
    width: 100,
    height: 100,
  },
  image: {
    maxHeight: 100,
    maxWidth: 100,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
    alignItems: "center",
  },
});

export default function myEvents() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector(store => store.user);
  const myEvents = useSelector(store => store.myEvents);

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_EVENTS', payload: user.id});
  }, [user]);

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        My events
      </Typography>
      {myEvents
        ? myEvents.map((event) => {
            return (
              <>
                <Card m={30} key={event.event_id}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                    >
                      {event.description}
                    </Typography>
                    <Container className={classes.row}>
                      <Container>
                        <img
                          className={classes.image}
                          src={event.image_url}
                          alt={event.game + " image"}
                        />
                      </Container>
                      <Container>
                        <Typography>Game: {event.game}</Typography>
                        <Typography>
                          Date: {moment(event.date).format("M/DD/YYYY")}
                        </Typography>
                        <Typography>
                          Time:{" "}
                          {moment(event.time, "HH:mm:ss").format("h:mm A")}
                        </Typography>
                      </Container>
                    </Container>
                    <Container className={classes.row}>
                      Edit and Delete here
                    </Container>
                  </CardContent>
                </Card>
                <br />
              </>
            );
          })
        : ""}
    </Container>
  );
}