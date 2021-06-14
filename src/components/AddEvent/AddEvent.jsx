import DateFnsUtils from "@date-io/date-fns"; 
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
import moment from 'moment'
import { useHistory } from "react-router";

// Styling for various page elements
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
  const history = useHistory();

  const [description, setDescription] = useState('');
  const [game, setGame] = useState('');
  // This hook is false by default and changed to true when the value for setGame is changed
  // This is to validate that the user selected a game
  // A user cannot submit an event without selecting a game
  const [gameError, setGameError] = useState(false);
  const [date, setDate] = useState(new Date());
  // Will be set to the same date as the date hook and used to validate that the user
  // selected a date
  const [checkDate, setCheckDate] = useState(new Date('01/01/0001'));
  // Like the gameError this is false by default and will be changed to true if the date does not match the match the checkDate
  const [dateError, setDateError] = useState(false);
  // The following three hooks similar to the date hooks except for time
  const [time, setTime] = useState(new Date());
  const [checkTime, setCheckTime] = useState(new Date('01/01/0001'));
  const [timeError, setTimeError] = useState(false);
  
  const gameList = useSelector((store) => store.game);
  const user = useSelector((store) => store.user);
  const addEvent = useSelector((store) => store.addEvent);

  // dispatches 'FETCH_GAME' to load game list, and sets the check date and time
  // hooks to the same values as the date and time when the page was loaded. If the
  // check hooks are set to the current time like the date and time hooks there is at
  // least a millisecond difference which allows the errors to be set to true and
  // allow the user to submit an event without setting a date or time. To prevent
  // this the check date and check time values are set equal to the date and time
  // values on page load
  useEffect(() => {
    dispatch({ type: "FETCH_GAME" });
    setCheckDate(date);
    setCheckTime(time)
  }, []);

  //the following handle functions capture the changes made while filling out the add
  //games form
  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleChange = (event) => {
    setGameError(false);
    setGame(event.target.value);
  };

  const handleDate = (event) => {
    setDateError(false) 
    setDate(event);
  }

  const handleTime = (event) => {
    setTimeError(false)
    setTime(event)
  }

  // The submit function resets all the errors to false, then checks to see if they
  // should be true unless these all pass as true the function will not pass the let
  // the user submit an event. To make them true the user just needs to fill in all
  // the fields in the form. 
  const handleSubmit = (event) => {
    event.preventDefault();
    setGameError(false);
    setDateError(false);
    setTimeError(false);
    if (game === '') {
      setGameError(true);
    }
    if (date === checkDate) {
      setDateError(true);
    }
    if (time === checkTime) {
      setTimeError(true);
    }
    
    // The following change the time stamp to a more readable format
    const outputDate = moment(date).format('yyyy-MM-DD');
    const outputTime = moment(time).format('HH:mm');
    
    // This checks to validate all forms have been filled in
    if (game !== '' && date !== checkDate && time !== checkTime) {
      let outputDescription;

      // If the description if left blank, this will set it to Playing <selected
      // game>. If the user later decides to add an event name rather than simply a
      // play time they can edit it in the My Events page
      if ((!description || description === undefined || description === '') && game) {
        outputDescription = `Playing ${game.game}`;
      } else {
        outputDescription = description;
      }

      // This organizes the validated variables into an object to be sent to the database
      const newEvent = {
        description: outputDescription,
        game_id: game.game_id,
        date: outputDate,
        time: outputTime,
        created_by: user.id
      }

      // This dispatches the game to the server via the upcoming saga in upcoming.saga.js
      dispatch({ type: 'ADD_UPCOMING', payload: newEvent});
      history.push('/upcoming')
    }
  }

  return (
    <>
    {/* Page title */}
      <Typography className={classes.title} variant="h3" component="h1">
        Add event
      </Typography>

      {/* Container to hold the form fields */}
      <Container className={classes.form}>
        <Paper className={classes.form}>
          <form noValidate autoComplete="off">
            {/* Description field */}
            <TextField
              className={classes.field}
              variant="outlined"
              label="Event name"
              value={description}
              onChange={(e) => handleDescription(e)}
              fullWidth
              helperText="If left blank, default is playing <game>"
            />
            {/* Select game field */}
            <TextField
              className={classes.field}
              variant="outlined"
              label="Select game"
              value={game}
              onChange={handleChange}
              select
              fullWidth
              required
              // from here to the end of the form if the user tries to submit an
              // event with missing or invalid data the form will turn red with an
              // error message
              error={gameError}
              helperText={gameError ? "Game is required" : ''}
            >
              {/* Maps the game list to a dropdown menu to select from */}
              {gameList
                ? gameList.map((thisGame) => {
                    return (
                      <MenuItem
                        className={classes.menuFlex}
                        key={thisGame.game_id}
                        value={thisGame}
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
            {/* Select date field */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.field}
                inputVariant="outlined"
                margin="normal"
                id="date-picker-dialog"
                label="Select date"
                format="MM/dd/yyyy"
                value={date}
                onChange={(e) => handleDate(e)}
                fullWidth
                required
                error={dateError}
                helperText={dateError ? "Date is required" : ''}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                />
              {/* Select time field */}
              <KeyboardTimePicker
                className={classes.field}
                inputVariant="outlined"
                margin="normal"
                id="time-picker"
                label="Select time"
                value={time}
                onChange={(e) => handleTime(e)}
                fullWidth
                required
                error={timeError}
                helperText={timeError ? "Time is required" : ''}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                />
            </MuiPickersUtilsProvider>
            {/* Triggers the handleSubmit function which validates then sends the form data */}
            <Button
              className={classes.btn}
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
