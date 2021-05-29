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
        let succeeded = 0;
        let failed = 0;

        for (const res of results) {
            if (res.status === "success") {
                yield put({ type: SET_REPLAY, value: res })
                succeeded++;
            } else {
                failed++;
            }
        }

        if (succeeded === 1) toast.success("1 replay successfully analyzed!");
        else if (succeeded > 1) toast.success(`${succeeded} replays successfully analyzed!`);

        if (failed === 1) toast.error("1 file failed to analyze.");
        else if (failed > 1) toast.error(`${failed} replays failed to analyze.`);

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
