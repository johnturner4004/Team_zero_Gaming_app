import { FormControlLabel, Switch } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ToggleSwitch(props) {
  const dispatch = useDispatch();

  const [playing, setPlaying] = useState(false);

  const attending = useSelector((state) => state.attending);
  const user = useSelector((state) => state.user);

  const checkAttending = () => {
    for (event of attending) {
      if (event.event_id === props.prop.event_id) {
        setPlaying(true);
      }
    }
  };

  useEffect(() => {
    checkAttending();
  }, [attending, user]);

  const handleChange = (e) => {
    setPlaying(e.target.checked);
    if (playing === false) {
      console.log(`payload ${props.prop.event_id}, ${user.id}`);
      dispatch({ type: 'ADD_ATTENDING', payload: {event_id: props.prop.event_id, user_id: user.id}})
    }
  };

  console.log(props);
  console.log(props.prop.event_id);
  return (
    <FormControlLabel
      control={
        <Switch
          id={props.prop.event_id}
          checked={playing}
          onChange={(e) => handleChange(e)}
          color="primary"
        />
      }
      label="Playing with us?"
    />
  );
}
