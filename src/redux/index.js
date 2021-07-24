import { combineReducers } from 'redux'
import foodCategoryReducer from './reducers/FoodReducers/foodCategoryReducer'
import foodReducer from './reducers/FoodReducers/foodReducer'
import authReducer from './reducers/AuthReducers/authReducer'
import errorReducer from './reducers/MessageOrErrorReducers/errorReducer'
import profileReducer from './reducers/ProfileReducers/profileReducer'
import messageInfoReducer from './reducers/MessageOrErrorReducers/messageInfoReducer'
import favoriteReducer from './reducers/FavoriteReducers/favoriteReducer'

const rootReducers = combineReducers({
    foods: foodReducer,
    foodCategory: foodCategoryReducer,
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    messageInfo: messageInfoReducer,
    favorite: favoriteReducer
})

export default rootReducers