const editReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_EDIT':
      return action.payload;
    case 'CLEAR_EDIT':
      return '';
    default:
      return state;
  }
}

export default editReducer;