import {
    SET_FILE_UPLOADING,
    SET_FILE_UPLOAD_FAILED,
    SET_FILE_UPLOAD_SUCCESS,
} from "../actions/backend";
import { REMOVE_REPLAY, SET_REPLAY } from "../actions/replay";

const initState = {
    replays: [],
    error: {},
    uploading: false,
    uploadSuccess: false,
    uploadFailed: false,
};

const replays = (state = initState, action) => {
    switch (action.type) {
        // FILE UPLOAD
        case SET_FILE_UPLOADING:
            return {
                ...state,
                uploading: true,
                uploadSuccess: false,
                uploadFailed: false,
            };
        case SET_FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                uploading: false,
                uploadSuccess: true,
                uploadFailed: false,
            };
        case SET_FILE_UPLOAD_FAILED:
            return {
                ...state,
                error: action.value,
                uploading: false,
                uploadSuccess: false,
                uploadFailed: true,
            };
        case SET_REPLAY:
            return {
                ...state,
                replays: [...state.replays, action.value],
            };
        case REMOVE_REPLAY:
            const filteredReplays = state.replays.filter(
                (rep) => rep.id === action.value
            );
            return {
                ...state,
                replays: filteredReplays,
            };
        default:
            return state;
    }
};

export default replays;
