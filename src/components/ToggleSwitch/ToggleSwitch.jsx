import { FormControlLabel, Switch } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ToggleSwitch(props) {
  const dispatch = useDispatch();

  const [playing, setPlaying] = useState(false);
  const [pid, setPid] = useState('');//pid is id from participant table
  const [owner, setOwner] = useState(true);

  const attending = useSelector((state) => state.attending);
  const user = useSelector((state) => state.user);

  const checkAttending = () => {
    for (event of attending) {
      if (event.event_id === props.prop.event_id) {
        setPlaying(true);
      }
    }
  };
  
  const checkOwner = () => {
    if (props.prop.username === user.username && user.username) {
      setOwner(true);
    };
  };

  // const checkOwnerAttending = (isPlaying, isOwner) => {
  //   console.log('************************************************************************************************************************************************isPlaying', isPlaying, 'isOwner', isOwner);
  //   if (isPlaying === false && isOwner === true) {
  //     dispatch({ type: 'ADD_ATTENDING', payload: {event_id: props.prop.event_id, user_id: user.id}})
  //   } ;
  // }

  useEffect(() => {
    checkOwner()
    checkAttending()
  }, [attending, user]);

  const handleChange = (e) => {
    setPlaying(e.target.checked);
    if (playing === false) {
      dispatch({ type: 'ADD_ATTENDING', payload: {event_id: props.prop.event_id, user_id: user.id}})
    } else {
      dispatch({ type: 'DELETE_ATTENDING', payload: {pid: pid, user: user.id}})
    }
  };

  return (
    <FormControlLabel
      control={
        <Switch
          id={props.prop.event_id}
          checked={playing}
          onChange={(e) => handleChange(e)}
          color="primary"
          disabled={owner}
        />
      }
      label="Playing with us?"
    />
  );
}
