import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchAttending(action) {
  try{
    console.log('fetch attending payload', action.payload);
    const id = String(action.payload)
    const response = yield axios.get(`/api/attending/${id}`)
    yield put({ type: 'SET_ATTENDING', payload: response.data})
    console.log('fetch attending response', response.data);
    
  } catch (error) {
    console.log(`Unable to get attending list: ${error}`);
  }
}

function* attendingSaga() {
  yield takeLatest('FETCH_ATTENDING', fetchAttending)
}

export default attendingSaga;