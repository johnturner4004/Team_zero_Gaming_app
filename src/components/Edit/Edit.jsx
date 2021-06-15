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
  // This gets the id from the params in the url so if the page is reloaded it will load the same event for the user.
  const { id } = useParams();
  const editDetails = useSelector((store) => store.editDetails);

  useEffect(() => {
    dispatch({ type: 'FETCH_EDIT', payload: id })
    dispatch({ type: 'FETCH_GAME' });
  }, [id]);

  return (
    <>
      {/* Page title */}
      <Typography className={classes.title} variant="h3" component="h1">
        Edit Event
      </Typography>
      {/* This waits until the edit details have been received from the database then passes them as props to the edit form */}
      {editDetails ? <EditForm props={editDetails} /> :''}
    </>
  );
}
