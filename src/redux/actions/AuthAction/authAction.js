import { appAuthentication, appAuthPersistent, profileDB } from "../../../firebase";
import { ActionTypes } from "../actionTypes";
import { fetchUserInfo } from "../ProfileAction/profileAction";

export const registerUser = (userInfo) => {
    return async (dispatch) => {
        appAuthentication.createUserWithEmailAndPassword(userInfo.user_email, userInfo.user_password)
            .then((userInfoSignIn) => {
                userInfoSignIn.user.updateProfile({
                    displayName: userInfo.display_name
                })
            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                console.log(errorCode)
                console.log(errorMessage)
        });

        appAuthentication.onAuthStateChanged((user) => {
            dispatch({ type: ActionTypes.LOG_IN_USER, payload: user })
        })
        await profileDB.add({
            user_email: userInfo.user_email,
            display_name: userInfo.display_name,
            first_name: '',
            last_name: '',
            middle_inital: '',
            user_address: '',
            user_birthdate: '',
            user_mobile_number: ''
        }).then((docRef) => {
            console.log("Successfully register user", docRef.id);
        })
        .catch((error) => {
            console.error("Error registering new user: ", error);
        });
    }
}


export const loginUser = (loginCredentials) => {
    
    return (dispatch) => {
        appAuthPersistent.then(() => {
            appAuthentication.signInWithEmailAndPassword(loginCredentials.user_email, loginCredentials.user_password)
            .then(res => {
                dispatch(fetchUserInfo(res.user.displayName))
            })
        })
        .catch((error) => {
            dispatch({ type: ActionTypes.LOGIN_ERROR, payload: error.message })
        });
        
    }
}

export const logOutUser = () => {
    return (dispatch) => {
        appAuthentication.signOut().then(() => {
            return dispatch({ type: ActionTypes.LOG_OUT_USER, payload: "" })
        }).catch((error) => {
            console.log(error)
        });
    }
}

export const refreshAuth = (displayName) => {
    return (dispatch) => {
        appAuthentication.onAuthStateChanged((user) => {
            dispatch({ type: ActionTypes.LOG_IN_USER, payload: user })
            if (displayName) {
                fetchUserInfo(displayName)
            }
        })
    }
}