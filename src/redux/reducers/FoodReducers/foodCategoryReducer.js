import { ActionTypes } from '../../actions/actionTypes'
const initialState = {
    listFoodCategory: []
}

const foodCategoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.READ_FOOD_CATEGORY: 
            return {
                ...state,
                listFoodCategory: action.payload
            }
        default:
            return state
    }
}



export default foodCategoryReducer