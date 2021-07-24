import { foodCategoryDB, foodDB } from '../../../firebase'
import { ActionTypes } from '../actionTypes'

export const readFoodCategory = () => {
   
    return (dispatch) => {
        foodCategoryDB.onSnapshot(snapshot => {
                const getFoodCategories = snapshot.docs.map(async doc => { 
                    return await foodDB.where('foodCategory', '==', doc.data().category_name).get().then(querySnapshot => {
                       return {
                            'id': doc.id,
                            'category_name': doc.data().category_name,
                            'count': querySnapshot.size
                        }
                    })
                })
                Promise.all(getFoodCategories).then(value => {
                    dispatch({ type: ActionTypes.READ_FOOD_CATEGORY, payload: value }) 
                });
        })
       
        
    }
}

export const countOfEveryCategory = () => {
    
    return (dispatch) => {
        foodCategoryDB.onSnapshot(snapshot => {
            dispatch({ type: ActionTypes.COUNT_EVERY_FOOD_CATEGORY, payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) })
             
        })
    }

}