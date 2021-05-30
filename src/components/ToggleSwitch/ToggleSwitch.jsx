import { FormControlLabel, Switch } from "@material-ui/core";
import { useState } from "react";

export default function ToggleSwitch(props) {

  const [playing, setPlaying] = useState(false);

  const handleChange = (e) => {
    console.log(props.prop.event_id, e.target.checked);
    setPlaying(e.target.checked);
  }
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
