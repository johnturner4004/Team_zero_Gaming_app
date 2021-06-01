import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUpcoming() {
  try {
    const response = yield axios.get('/api/upcoming');
    yield put({ type: 'SET_UPCOMING', payload: response.data})
  } catch (error) {
    console.log('Unable to get event list', error);
  }
}

function* addUpcoming(action) {
  try {
    yield axios.post('/api/upcoming', action.payload)
    yield put({ type: 'FETCH_UPCOMING'})
  } catch (error) {
    console.log('Unable to add new event', error);
  }
}

function* upcomingSaga() {
  yield takeLatest('FETCH_UPCOMING', fetchUpcoming);
  yield takeLatest('ADD_UPCOMING', addUpcoming);
}

export default upcomingSaga;