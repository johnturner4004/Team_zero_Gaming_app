import { Card, CardContent, CardMedia, FormControl, FormControlLabel, Switch } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { flexbox } from "@material-ui/system";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

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
  }
});

function Upcoming() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const upcomingList = useSelector((store) => store.upcoming);

  const [playing, setPlaying] = useState(false);

  const handleChange = (e) => {
    setPlaying(e.target.checked);
    console.log(e.target.checked);
  }


  useEffect(() => {
    dispatch({ type: "FETCH_UPCOMING" });
  }, []);

  console.log(upcomingList);

  return (
    <Container>
      <Typography variant="h3" component="h1">
        Upcoming events
      </Typography>
      {upcomingList
        ? upcomingList.map((event) => {
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
                      <ToggleSwitch prop={event} />
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
