import { combineReducers } from 'redux'
import foodCategoryReducer from './reducers/FoodReducers/foodCategoryReducer'
import foodReducer from './reducers/FoodReducers/foodReducer'
import authReducer from './reducers/AuthReducers/authReducer'
import errorReducer from './reducers/MessageOrErrorReducers/errorReducer'
import profileReducer from './reducers/ProfileReducers/profileReducer'
import messageInfoReducer from './reducers/MessageOrErrorReducers/messageInfoReducer'
import favoriteReducer from './reducers/FavoriteReducers/favoriteReducer'
import cartReducer from './reducers/CartReducers/cartReducer'
import voucherReducer from './reducers/VoucherReducers/voucherReducer'
import courierReducer from './reducers/CourierReducers/courierReducer'


const rootReducers = combineReducers({
    foods: foodReducer,
    foodCategory: foodCategoryReducer,
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer,
    messageInfo: messageInfoReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    voucher: voucherReducer,
    courier: courierReducer
})

export default rootReducers