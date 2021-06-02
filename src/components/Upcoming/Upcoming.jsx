import { Card, CardContent  } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Participant from "../Participant/Participant";
import green from "@material-ui/core/colors/green"

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
  confirm: {
    backgroundColor: green['A400'],
  },
});

function Upcoming() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const upcomingList = useSelector(store => store.upcoming);
  const attending = useSelector(store => store.attending);
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_UPCOMING" });
    dispatch({ type: 'FETCH_ATTENDING', payload: user.id})
  }, [user]);

  const getClass = (id) => {
    for (event of attending) {
      if (event.event_id === id) {
        return classes.confirm
      }
    }
  }

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Upcoming events
      </Typography>
      {upcomingList
        ? upcomingList.map((event) => {
            return (
              <>
                <Card className={getClass(event.event_id)} m={30} key={event.event_id}>
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
                      <ToggleSwitch prop={event} />
                      <Participant prop={event.event_id} />
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

export default Upcoming;
