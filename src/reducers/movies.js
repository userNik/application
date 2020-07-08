import { ADD_MOVIE, CLEAR_LIST } from "../actions/keys";

const initialState = {
    list: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MOVIE:
            return { ...state, list: [ ...action.data ] };
        case CLEAR_LIST:
            return { ...initialState };
        default:
            return state;
    }
};

export default reducer;
