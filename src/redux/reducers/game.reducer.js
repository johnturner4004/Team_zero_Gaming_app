const gameReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_GAME_LIST':
      return action.payload;
    default:
      return state;
  }
}

export default gameReducer;