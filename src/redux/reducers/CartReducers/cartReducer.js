import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    user_all_items_in_cart: [],
    single_item_in_cart: [],
    sub_total: '',
    total_price_to_pay: '' 
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CART_LIST:
            return {
                ...state,
                user_all_items_in_cart: action.payload
            }
        case ActionTypes.FETCH_SUB_TOTAL: 
            return {
                ...state,
                sub_total: action.payload
            }
        case ActionTypes.FETCH_TOTAL_PRICE: 
            return {
                ...state,
                total_price_to_pay: action.payload
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