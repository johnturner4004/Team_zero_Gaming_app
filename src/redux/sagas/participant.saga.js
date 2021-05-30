import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchParticipant() {
  try{
    const response = yield axios.get(`/api/participant/${action.payload.id}`)
    yield put({ type: 'SET_PARTICIPANT', payload: response.data})
  } catch (error) {
    console.log(`Unable to get participant list: ${error}`);
  }
}

function* participantSaga() {
  yield takeLatest('FETCH_PARTICIPANT', fetchParticipant)
}

export default participantSaga;