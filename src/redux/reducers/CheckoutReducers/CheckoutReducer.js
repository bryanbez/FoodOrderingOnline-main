import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    checkoutList: [],
    specificCheckoutInfo: [],
    foodInfo: []
}

const checkoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_CHECKOUT_INFO: 
            return {
                ...state,
                checkoutList: action.payload
            }
        case ActionTypes.FETCH_SPECIFIC_CHECKOUT_INFO:
            return {
                ...state,
                specificCheckoutInfo: action.payload
            }
        case ActionTypes.CHECKOUT_FOOD_LIST: 
            return {
                ...state,
                foodInfo: state.foodInfo.concat(action.payload)
            }
            // return {
            //     ...state,
            //     specificCheckoutInfo: action.payload
            // }
        default: 
            return state
    }

}

export default checkoutReducer