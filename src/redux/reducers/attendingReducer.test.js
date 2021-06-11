import attendingReducer from './attending.reducer';

describe('Testing attendingReducer...', () => {
  
  test('Initial state should be an empty string...', () => {
    let action = {};
    let state = undefined;
    let returnedState = attendingReducer(state, action);
    expect( returnedState ).toEqual( '' );
  });
  
});