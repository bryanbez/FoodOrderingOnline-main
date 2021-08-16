import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    checkoutList: []
}

const checkoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_CHECKOUT_INFO: 
            return state
        case ActionTypes.FETCH_SPECIFIC_CHECKOUT_INFO:
            return state
        default: 
            return state
    }

}

export default checkoutReducer