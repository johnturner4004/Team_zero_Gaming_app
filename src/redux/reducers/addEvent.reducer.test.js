import addEvent from './addEvent.reducer';

describe('Testing addEvent reducer...', () => {

  test('Initial state should be empty string...', () => {
    let action = {};
    let state = undefined;
    let returnedState = addEvent(state, action);
    expect( returnedState ).toEqual( '' );
  });

  test('Test "ADD_EVENT" should return payload...', () => {
    let action = {type: 'ADD_EVENT', payload: {data: 'testing payload'}};
    let state = '';
    let returnedState = addEvent(state, action);
    expect( returnedState ).toEqual({data: 'testing payload'});
  });

});