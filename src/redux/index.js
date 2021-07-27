import { combineReducers } from 'redux'
import foodCategoryReducer from './reducers/FoodReducers/foodCategoryReducer'
import foodReducer from './reducers/FoodReducers/foodReducer'
import authReducer from './reducers/AuthReducers/authReducer'
import errorReducer from './reducers/MessageOrErrorReducers/errorReducer'
import profileReducer from './reducers/ProfileReducers/profileReducer'
import messageInfoReducer from './reducers/MessageOrErrorReducers/messageInfoReducer'
import favoriteReducer from './reducers/FavoriteReducers/favoriteReducer'
import cartReducer, { CartReducer } from './reducers/CartReducers/cartReducer'

const rootReducers = combineReducers({
    foods: foodReducer,
    foodCategory: foodCategoryReducer,
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    messageInfo: messageInfoReducer,
    favorite: favoriteReducer,
    cart: cartReducer
})

export default rootReducers