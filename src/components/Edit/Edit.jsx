import { makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import EditForm from '../EditForm/EditForm'

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default function Edit() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  console.log(id);
  const editDetails = useSelector((store) => store.editDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_EDIT', payload: id })
    dispatch({ type: 'FETCH_GAME' });
  }, [id]);

  return (
    <>
      <Typography className={classes.title} variant="h3" component="h1">
        Edit Event
      </Typography>
      {editDetails ? <EditForm props={editDetails} /> :''}
    </>
  );
}
