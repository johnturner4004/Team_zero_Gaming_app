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
import { useHistory, useParams } from "react-router";

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

export default function EditForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const originalDetails = props.props[0];

  const [description, setDescription] = useState('');
  const [game, setGame] = useState('')//{game_id: originalDetails.game_id, game: originalDetails.game, image_url: originalDetails.image_url});
  const [date, setDate] = useState(new Date('01/01/2021'));
  const [time, setTime] = useState(new Date('01/01/2021'));
  
  const gameList = useSelector((store) => store.game);
  const user = useSelector((store) => store.user);

  // This useEffect function fills in the edit form with the current event details so
  // the user can edit them
  useEffect(() => {
    setEdit();
  }, [gameList]);
  const setEdit = () => {
    setDescription(originalDetails.description);
    for (let thisGame of gameList) {
      if (thisGame.game_id === originalDetails.game_id) {
        setGame(thisGame);
      }
    }
    setDate(originalDetails.date);
    setTime(moment(originalDetails.time, 'HH:mm:ss'));
    console.log(originalDetails);
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }
  
  const handleChange = (event) => {
    console.log('event', event);
    setGame(event.target.value);
  };
  
  const handleDate = (event) => {
    setDate(event);
  }

  const handleTime = (event) => {
    setTime(event)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //This reformats the date string to one that is easier to read
    const outputDate = moment(date).format('yyyy-MM-DD');
    const outputTime = moment(time).format('HH:mm');
    // This verifies that all required fields are filled in before submitting
    if (game !== '' && date !== '' && time !== '') {
      let outputDescription;
      // This checks to see if there is an event description and fills it in with
      // "Playing <game>" where <game> is the game selected from the list if none is
      // entered
      if ((!description || description === undefined || description === '') && game) {
        outputDescription = `Playing ${game.game}`;
      } else {
        outputDescription = description;
      }
      // This puts all the new values in an object to be send to the database
      const newDetails = {
        event_id: originalDetails.event_id,
        description: outputDescription,
        game_id: game.game_id,
        date: outputDate,
        time: outputTime,
        created_by: user.id
      }
      // This sends the object created above to the edit.saga.js to be added to the
      // database
      dispatch({ type: 'EDIT', payload: newDetails})
      history.push('/my-events');
    }
  }
  return (
    // Container for form elements to load in
    <Container className={classes.form}>
        <Paper className={classes.form}>
          <form noValidate autoComplete="off">
            {/* Event description field */}
            <TextField
              className={classes.field}
              variant="outlined"
              label="Event name"
              value={description}
              onChange={(e) => handleDescription(e)}
              fullWidth
              helperText="If left blank, default is playing <game>"
            />
            {/* Dropdown for the game field */}
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
            {/* This is the field for the date picker */}
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
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                />
              {/* This is the field for the time picker */}
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
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                />
            </MuiPickersUtilsProvider>
            {/* Submit button to trigger the handle submit button */}
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
)};