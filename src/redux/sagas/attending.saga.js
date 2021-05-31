import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchAttending(action) {
  try{
    console.log('fetch attending payload', action.payload);
    const id = action.payload;
    const response = yield axios.get(`/api/attending/${id}`)
    yield put({ type: 'SET_ATTENDING', payload: response.data})
    console.log('fetch attending response', response.data);
    
  } catch (error) {
    console.log(`Unable to get attending list: ${error}`);
  }
}

function* addAttending(action) {
  try{
    yield axios.post(`api/attending`, action.payload)
    yield put({ type: 'FETCH_ATTENDING', payload: action.payload.user_id })
  } catch (error) {
    console.log('Unable to add to attending list', error);
  }
}

function* deleteAttending(action) {
  try{
    yield axios.delete(`api/attending/${action.payload.pid}`)
    yield put({ type: 'FETCH_ATTENDING', payload: action.payload.user })
  } catch (error) {
    console.log('Unable to delete from attending list', error);
  }
}

function* attendingSaga() {
  yield takeLatest('FETCH_ATTENDING', fetchAttending),
  yield takeLatest('ADD_ATTENDING', addAttending),
  yield takeLatest('DELETE_ATTENDING', deleteAttending)
}

export default attendingSaga;