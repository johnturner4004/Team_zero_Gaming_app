import { FormControlLabel, Switch } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ToggleSwitch(props) {
  const [playing, setPlaying] = useState(false);

  const attending = useSelector((state) => state.attending);
  const user = useSelector((state) => state.user);

  const checkAttending = () => {
    for (event of attending) {
      if (event.event_id === props.prop.event_id) {
        console.log("attending === true");
        setPlaying(true);
      }
    }
  };

  useEffect(() => {
    checkAttending();
  }, [attending, user]);

  const handleChange = (e) => {
    console.log(props.prop.event_id, e.target.checked);
    setPlaying(e.target.checked);
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
