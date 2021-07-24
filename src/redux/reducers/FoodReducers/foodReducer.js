import { ActionTypes } from '../../actions/actionTypes'
import  { foodImageStorage, foodDB } from '../../../firebase'

const initialState = {
    foodList: [],
    specificFoodInfo: [],
    addFormMessage: '',
    archiveFoodMessage: ''
}

const foodReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FOOD: 
            return addFood(state, action.payload)
        case ActionTypes.MODIFY_FOOD:
            return state - 1
        case ActionTypes.ARCHIVE_FOOD:
            return state
        case ActionTypes.READ_FOOD:
            return {
                ...state,
                foodList: action.payload
            }
            
        case ActionTypes.READ_SPECIFIC_FOOD_INFO: 
            return {
                ...state,
                specificFoodInfo: action.payload
            }
        case ActionTypes.UPDATE_FOOD_INFO:
            return updateFood(state, action.payload)
        case ActionTypes.ARCHIVE_FOOD_MESSAGE: 
            return {
                ...state,
                archiveFoodMessage: action.payload
            }
        case ActionTypes.RESET_SPECIFIC_FOOD_INFO:
            return {
                ...state,
                specificFoodInfo: []
            }
        default: 
            return state
    }
}

const addFood = (state, payload) => {

    let randomImageName = Math.random().toString(36).substring(7);

    try {
        uploadImage(randomImageName, payload.foodImage)
        saveFoodInfoToFirestore(randomImageName, payload)
        state.addFormMessage = {
            'code': 200,
            'message': 'Food Information Sucessfully Added'
        }
        return state;
    }
    catch(err) {
        state.addFormMessage = {
            'code': 404,
            'message': `There was an error saving the food information or uploading the image. ${err}`
        }
        return state;
    } 

}

const updateFood = (state, payload) => {

    let randomImageName = Math.random().toString(36).substring(7);

    if (payload.foodImage.includes("https://firebasestorage.googleapis.com")){
        updateFoodInfo(null, payload)
    }
    else {
        uploadImage(randomImageName, payload.foodImage)
        updateFoodInfo(randomImageName, payload)
        deleteImage(payload.foodImageName)
    }

    return state

}


const updateFoodInfo = (randomImageName, payload) => {
    if (randomImageName) {
        foodDB.doc(payload.id).set({
            foodSKU: payload.foodSKU,
            foodImage: randomImageName,
            foodName: payload.foodName,
            foodPrice: payload.foodPrice,
            foodDescription: payload.foodDescription,
            foodCategory: payload.foodCategory,
            isAvailable: payload.isAvailable,
        }).then(() => console.log("Food Info Updated"))
    }
    else {
        foodDB.doc(payload.id).set({
            foodSKU: payload.foodSKU,
            foodName: payload.foodName,
            foodPrice: payload.foodPrice,
            foodDescription: payload.foodDescription,
            foodCategory: payload.foodCategory,
            isAvailable: payload.isAvailable,
        }, { merge: true }).then(() => console.log("Food Info Updated"))
    }
}

const uploadImage = (randomImageName, base64urlImg) => {
    return foodImageStorage.child(randomImageName)
                .putString(base64urlImg, 'data_url')
                .then(() => console.log("Image Uploaded"))
                .catch(err => console.log(`Error uploading image ${err}` ))
}

const deleteImage = (imageName) => {
    return foodImageStorage.child(imageName).delete()
    .then(() => {
        console.log("Image Deleted")
    }).catch((err) => {
        console.log(`An error occured: ${err}`)
    })
}

const saveFoodInfoToFirestore = async (randomImageName, foodInfo) => {
    return await foodDB.add({
        foodSKU: foodInfo.foodSKU,
        foodImage: randomImageName,
        foodName: foodInfo.foodName,
        foodPrice: foodInfo.foodPrice,
        foodDescription: foodInfo.foodDescription,
        foodCategory: foodInfo.foodCategory,
        isAvailable: foodInfo.isAvailable,
        }).then(() => console.log("Food Information Saved"))
            .catch(err => console.log(`Error saving food information ${err}`))
}



export default foodReducer