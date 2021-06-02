import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMyEvents(action) {
  try {
    const response = yield axios.get(`/api/my-events/${action.payload}`);
    yield put({ type: 'SET_MY_EVENTS', payload: response.data})
  } catch (error) {
    console.log('Unable to get event list', error);
  }
}

function* myEventsSaga() {
  yield takeLatest('FETCH_MY_EVENTS', fetchMyEvents);
}

export default myEventsSaga;