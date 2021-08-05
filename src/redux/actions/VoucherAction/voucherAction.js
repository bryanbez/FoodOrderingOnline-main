import { voucherDB } from "../../../firebase";
import { ActionTypes } from "../actionTypes";
import { singleMessageCustomizedColor } from "../MessageOrErrorAction/infoAction";

export const fetchVoucherCode = (code) => {
    return (dispatch) => {
        voucherDB.where("code", "==", code).get().then(docRef => {
            if (docRef.size === 1) {
                return dispatch({ type: ActionTypes.FETCH_VOUCHER_CODE_INFO, payload: docRef.docs.map(doc => ({ id: doc.id, ...doc.data() })) })
            }
            else {
                return dispatch({ type: ActionTypes.FETCH_VOUCHER_CODE_INFO, payload: [] })
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

export const priceAfterVoucherApplied = (subtotal, voucherInfo) => {
    console.log(voucherInfo)
    return (dispatch) => {
        if (voucherInfo.length === 1) {
            if (voucherInfo[0].isFixedOrPercentage === 'percentage') {
                if (subtotal < voucherInfo[0].min_spend) {
                    dispatch(singleMessageCustomizedColor("Subtotal does not meet min spend to use this voucher", "danger"))
                    dispatch({ type: ActionTypes.PRICE_AFTER_APPLYING_VOUCHER, payload: {'initialPrice': subtotal, 'discount': 0 } })
                }
                else {
                    dispatch({ type: ActionTypes.PRICE_AFTER_APPLYING_VOUCHER, payload: {'initialPrice': subtotal - ((subtotal * voucherInfo[0].max_discount) / 100), 'discount': ((subtotal * voucherInfo[0].max_discount) / 100)} })
                    dispatch(singleMessageCustomizedColor("Voucher Code Applied", "success"))
                }
            }
            else {
                if (subtotal < voucherInfo[0].min_spend) {
                    dispatch(singleMessageCustomizedColor("Subtotal does not meet min spend to use this voucher", "danger"))
                    dispatch({ type: ActionTypes.PRICE_AFTER_APPLYING_VOUCHER, payload: {'initialPrice': subtotal, 'discount': 0 } })
                }
                else {
                    dispatch({ type: ActionTypes.PRICE_AFTER_APPLYING_VOUCHER, payload: {'initialPrice': subtotal - voucherInfo[0].max_discount, 'discount': voucherInfo[0].max_discount} })
                    dispatch(singleMessageCustomizedColor("Voucher Code Applied", "success"))
                }
            }
        }
        else if (voucherInfo.length === 0) { // no voucher code found
            dispatch({ type: ActionTypes.PRICE_AFTER_APPLYING_VOUCHER, payload: {'totalPrice': subtotal, 'discount': 0 }  })
            dispatch(singleMessageCustomizedColor("Wrong voucher code", "danger"))
        }
        else {
            dispatch({ type: ActionTypes.PRICE_AFTER_APPLYING_VOUCHER, payload: {'totalPrice': subtotal, 'discount': 0 }  })
        }
      
    }
}