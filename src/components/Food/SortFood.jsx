import React, { useEffect } from 'react'
import  { readFoodCategory } from '../../redux/actions/FoodAction/foodCategoryAction'
import  { readFoodInfo } from '../../redux/actions/FoodAction/foodAction'
import { useDispatch, useSelector } from 'react-redux';

export default function SortFood() {

    const dispatch = useDispatch()
    const fetchFoodCategories = useSelector(state => state.foodCategory.listFoodCategory)

    useEffect(() => {
        if (fetchFoodCategories.length === 0){
            dispatch(readFoodCategory())
        }
    }, [fetchFoodCategories, dispatch])

    const sortFoodList = (sortBy) => {
        dispatch(readFoodInfo(sortBy))
    }

    const checkCountSize = (count) => {
        return count !== 0 ? false : true
    }

    const categoryBtn = fetchFoodCategories.map(category => {
        return (
            <button key={category.id} className="btn btn-primary m-3" disabled={category.category_name !== 'all' ? checkCountSize(category.count) : false} onClick={() => sortFoodList(category.category_name)}> { category.category_name } </button>
            // yung disabled kahit zero yung count ng all, excluded siya sa checkCountSize function
        )
    })

    return (
        <div>
            { categoryBtn }
        </div>
    )
}
