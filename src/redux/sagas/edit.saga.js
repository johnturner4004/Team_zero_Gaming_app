import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchEdit(action) {
  try{
    const id = action.payload;
    const response = yield axios.get(`/api/edit/${id}`)
    yield put({ type: 'SET_EDIT', payload: response.data})
  } catch (error) {
    console.log(`Unable to get edit details: ${error}`);
  }
}

function* editSaga() {
  yield takeLatest('FETCH_EDIT', fetchEdit);
}

export default editSaga;