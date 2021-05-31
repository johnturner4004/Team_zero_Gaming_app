import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchParticipant(action) {
  try{
    console.log(action.payload);
    
    const response = yield axios.get(`/api/participant/${action.payload}`)
    yield put({ type: 'SET_PARTICIPANT', payload: response.data})
  } catch (error) {
    console.log(`Unable to get participant list: ${error}`);
  }
}

function* participantSaga() {
  yield takeLatest('FETCH_PARTICIPANT', fetchParticipant)
}

export default participantSaga;