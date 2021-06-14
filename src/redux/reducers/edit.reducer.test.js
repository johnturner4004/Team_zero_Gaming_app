import editReducer from './edit.reducer';

describe('Testing edit reducer...', () => {

  test('Initial state should be an empty string...', () => {
    let action = {}
    let state = undefined;
    let returnedState = editReducer(state, action);
    expect( returnedState ).toEqual( '' );
  })

})