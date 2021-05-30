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

function* upcomingSaga() {
  yield takeLatest('FETCH_UPCOMING', fetchUpcoming);
}

export default upcomingSaga;