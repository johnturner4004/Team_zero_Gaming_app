const upcomingReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_UPCOMING':
      return action.payload;
    default:
      return state;
  }
}

export default upcomingReducer;