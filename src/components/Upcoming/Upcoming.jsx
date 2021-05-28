import { Card, CardContent } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnderConstruction from "../UnderConstruction/UnderConstruction";

function Upcoming () {
  const dispatch = useDispatch();
  
  const upcomingList = useSelector(store => store.upcoming)

  useEffect(() => {
    dispatch({ type: 'FETCH_UPCOMING' })
  }, [])

console.log(upcomingList);

  return(
    <>
    <h1>Upcoming events</h1>
    {upcomingList ? 
      upcomingList.map(event => {
        return (
      <Card key={event.id}>
        <CardContent>
        <h2>{event.description}</h2>
        <h3>Game: {event.game}</h3>
        <p>Date: {event.date}</p>
        <p>Time: {event.time}</p>
        </CardContent>
      </Card>
      )}):''}
    </>
  )
}

export default Upcoming;