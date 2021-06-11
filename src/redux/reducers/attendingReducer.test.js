import attendingReducer from './attending.reducer';

describe('Testing attendingReducer...', () => {
  
  test('Initial state should be an empty string...', () => {
    let action = {};
    let state = undefined;
    let returnedState = attendingReducer(state, action);
    expect( returnedState ).toEqual( '' );
  });
  
  let payload = { user_id: 1, username: 'zeroone4004'}
  test('testing set attinding used when getting list of players for an event...', () => {
    let action = { type: 'SET_ATTENDING', payload: payload};
    let state = '';
    let returnedState = attendingReducer(state, action);
    expect( returnedState ).toEqual( payload );
  });

});