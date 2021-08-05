import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    listOfCouriers: [],
    selectedCourierPrice: 0
}


const courierReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_COURIERS: 
            return {
                ...state,
                listOfCouriers: action.payload
            }
        case ActionTypes.FETCH_PRICE_OF_CHOSEN_COURIER:
            return {
                ...state,
                selectedCourierPrice: action.payload
            }
        default: 
            return state
    }

}

export default courierReducer