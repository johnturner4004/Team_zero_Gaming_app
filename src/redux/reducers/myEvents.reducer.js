const myEventsReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_MY_EVENTS':
      return action.payload;
    default:
      return state;
  }
}

export default myEventsReducer;