import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  Button,
  Container,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    marginTop: 20,
  },
  menuImage: {
    maxHeight: 50,
    maxWidth: 50,
  },
  menuFrame: {
    marginLeft: 0,
  },
  form: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
  },
  field: {
    marginTop: 10,
    display: "block",
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    display: "block",
  },
});

export default function AddEvent() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [game, setGame] = useState("");

  const gameList = useSelector((store) => store.game);

  useEffect(() => {
    dispatch({ type: "FETCH_GAME" });
  }, []);

  const handleChange = (event) => {
    setGame(event.target.value);
  };

  return (
    <>
      <Typography className={classes.title} variant="h3" component="h1">
        Add event
      </Typography>
      <Container className={classes.form}>
        <Paper className={classes.form}>
          <form noValidate autoCapitalize="off">
            <TextField
              className={classes.field}
              variant="outlined"
              label="Event name"
              value={description}
              onChange={setDescription}
              fullWidth
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Select game"
              value={game}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              {gameList
                ? gameList.map((thisGame) => {
                    return (
                      <MenuItem
                        className={classes.menuFlex}
                        key={thisGame.game_id}
                        value={thisGame.game_id}
                      >
                        <Container className={classes.menuFrame}>
                          <img
                            className={classes.menuImage}
                            src={thisGame.image_url}
                          />
                        </Container>
                        {thisGame.game}
                      </MenuItem>
                    );
                  })
                : ""}
            </TextField>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.field}
                inputVariant="outlined"
                margin="normal"
                id="date-picker-dialog"
                label="Select date"
                format="MM/dd/yyyy"
                value={date}
                onChange={setDate}
                fullWidth
                required
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardTimePicker
                className={classes.field}
                inputVariant="outlined"
                margin="normal"
                id="time-picker"
                label="Select time"
                value={time}
                onChange={setTime}
                fullWidth
                required
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </MuiPickersUtilsProvider>
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
