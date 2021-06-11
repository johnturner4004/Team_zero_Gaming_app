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
  const [gameError, setGameError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [checkDate, setCheckDate] = useState(new Date('01/01/0001'));
  const [dateError, setDateError] = useState(false);
  const [time, setTime] = useState(new Date());
  const [checkTime, setCheckTime] = useState(new Date('01/01/0001'));
  const [timeError, setTimeError] = useState(false);
  
  const gameList = useSelector((store) => store.game);
  const user = useSelector((store) => store.user);
  const addEvent = useSelector((store) => store.addEvent);


  useEffect(() => {
    dispatch({ type: "FETCH_GAME" });
    setCheckDate(date);
    setCheckTime(time)
  }, []);

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
    
    const outputDate = moment(date).format('yyyy-MM-DD');
    const outputTime = moment(time).format('HH:mm');
    
    if (game !== '' && date !== checkDate && time !== checkTime) {
      let outputDescription;

      if ((!description || description === undefined || description === '') && game) {
        outputDescription = `Playing ${game.game}`;
      } else {
        outputDescription = description;
      }

      const newEvent = {
        description: outputDescription,
        game_id: game.game_id,
        date: outputDate,
        time: outputTime,
        created_by: user.id
      }

      dispatch({ type: 'ADD_UPCOMING', payload: newEvent});
      history.push('/upcoming')
    }
  }

  return (
    <>
      <Typography className={classes.title} variant="h3" component="h1">
        Add event
      </Typography>
      <Container className={classes.form}>
        <Paper className={classes.form}>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.field}
              variant="outlined"
              label="Event name"
              value={description}
              onChange={(e) => handleDescription(e)}
              fullWidth
              helperText="If left blank, default is playing <game>"
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
              error={gameError}
              helperText={gameError ? "Game is required" : ''}
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
