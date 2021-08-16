import { checkoutDB } from '../../../firebase'
import { ActionTypes } from './../actionTypes'

export const fetchCheckoutList = () => {


}

export const fetchSpecificCheckoutList = () => {
    

}

export const addCheckoutInfo = (checkoutInfo) => {

    return (dispatch) => {
        try {
            checkoutDB.add(checkoutInfo).then(() => {
                console.log("Checkout Saved")
            })
        }
        catch(err)  {
            console.log("Error saving checkout info")
        }
    }

}