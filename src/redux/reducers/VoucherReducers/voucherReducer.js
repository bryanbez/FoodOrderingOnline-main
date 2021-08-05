import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    voucherInfo: [],
    priceAfterVoucherApplied: 0,
    discountPrice: ''

}

const voucherReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_VOUCHER_CODE_INFO: 
            return {
                ...state,
                voucherInfo: action.payload
            }
        case ActionTypes.PRICE_AFTER_APPLYING_VOUCHER: 
            return {
                ...state,
                priceAfterVoucherApplied: action.payload.initialPrice,
                discountPrice: action.payload.discount
            }
        default:
            return state
    }
}

export default voucherReducer