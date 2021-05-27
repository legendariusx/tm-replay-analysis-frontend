import { put, takeLatest, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { uploadFileRequest } from "../lib/API";
import {
    SET_FILE_UPLOADING,
    SET_FILE_UPLOAD_FAILED,
    SET_FILE_UPLOAD_SUCCESS,
    UPLOAD_FILES,
} from "../actions/backend";
import { SET_REPLAY } from "../actions/replay";

function* uploadFiles(action) {
    yield put({ type: SET_FILE_UPLOADING });

    try {
        const results = yield call(uploadFileRequest, action.value);
        for (const res of results) {
            if (res.status === "success") {
                yield put({ type: SET_REPLAY, value: res })
                toast.success("Replay successfully analyzed!");
            } else {
                toast.error("File upload or analysis failed.");
            }
        }
        yield put({ type: SET_FILE_UPLOAD_SUCCESS });
    } catch (e) {
        yield put({ type: SET_FILE_UPLOAD_FAILED, value: e });
        toast.error("File upload or analysis failed.");
    }
}

function* uploadFilesSaga() {
    yield takeLatest(UPLOAD_FILES, uploadFiles);
}

export default uploadFilesSaga;
