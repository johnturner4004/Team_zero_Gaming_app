import { Card, CardContent } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container'

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: 24,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

function Upcoming() {
  const dispatch = useDispatch();
  // const classes = useStyles();

  const upcomingList = useSelector((store) => store.upcoming);

  useEffect(() => {
    dispatch({ type: "FETCH_UPCOMING" });
  }, []);

  console.log(upcomingList);

  return (
    <Container>
      <Typography
      variant="h3"
      component="h1"e
      >
        Upcoming events
        </Typography>
      {upcomingList
        ? upcomingList.map((event) => {
            return (
              <>
              <Card m={30} key={event.id}>
                <CardContent>
                  <Typography
                    className={/*classes.title*/''}
                    gutterBottom
                  >
                    {event.description}
                  </Typography>
                  <Typography>Game: {event.game}</Typography>
                  <Typography>Date: {moment(event.date).format("M/DD/YYYY")}</Typography>
                  <Typography>Time: {moment(event.time, "HH:mm:ss").format("h:mm A")}</Typography>
                </CardContent>
              </Card><br/></>
            );
          })
        : ""}
    </Container>
  );
}

export default Upcoming;
