import { profileDB } from "../../../firebase";
import { ActionTypes } from "../actionTypes";

export const updateProfileInfo = (profileInfo) => {
    return async (dispatch) => {

        return await profileDB.doc(profileInfo.docId).update(profileInfo).then(() => {
            dispatch({ type: ActionTypes.MESSAGE_INFO, payload: "Profile Updated Successfully"})
        }).catch(error => {
            console.log(`There was an error updating your profile. Please try again ${error}`)
        })
    }
}

export const fetchUserInfo = (displayName) => {
    return async (dispatch) => {
        return await profileDB.where("display_name", "==", displayName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    dispatch({ type: ActionTypes.FETCH_PROFILE, payload: {
                        'docId': doc.id,
                        ...doc.data()
                    } })
                })
            })
    }
}

export const clearMessageInfo = () => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.MESSAGE_INFO, payload: null})
    }
    
}