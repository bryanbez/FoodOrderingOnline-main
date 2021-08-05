import { ActionTypes } from "../actionTypes";
import { courierDB } from "../../../firebase"

export const fetchCouriers = () => {
    return (dispatch) => {
        return courierDB.onSnapshot(snapshot => {
            return dispatch({ type: ActionTypes.FETCH_COURIERS, payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))})
        })
    }
}

export const putCourierPrice = (price) => {
    return {
        type: ActionTypes.FETCH_PRICE_OF_CHOSEN_COURIER,
        payload: price
    }
}