import { SET_DIMENSIONS } from "./actions";

const initialState = {
    values: {
        streamBandwidth: 0,
        bufferingTime: 0,
        quality: 0,
        timeProgress: 0
    }
};

export function setDimensions(state = initialState, action) {
    switch(action.type) {
        case SET_DIMENSIONS:
            return { ...state, values: { ...action.data } };
        default:
            return state;
    }
}
