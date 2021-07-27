import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    user_all_items_in_cart: [],
    single_item_in_cart: []   
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CART_LIST:
            return {
                ...state,
                user_all_items_in_cart: action.payload
            }
        case ActionTypes.REMOVE_IN_CART:
            return state
        case ActionTypes.EDIT_QUANTITY_IN_ITEM:
            return state
        default: 
            return state
    }
}

export default CartReducer