import React, { useEffect, useState } from 'react'
import  { readFoodCategory } from '../../redux/actions/FoodAction/foodCategoryAction'
import  { readFoodInfo } from '../../redux/actions/FoodAction/foodAction'
import { useDispatch, useSelector } from 'react-redux';

export default function SortFood(sortBy) {

    const dispatch = useDispatch()

    const fetchFoodCategories = useSelector(state => state.foodCategory.listFoodCategory)

    const [toggleActive, setToggleActive] = useState("btn btn-outline-primary m-3")


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
            <button key={category.id} 
                    className={sortBy.sortBy === category.category_name ? "btn btn-primary m-3" : "btn btn-outline-primary m-3"} 
                    disabled={category.category_name !== 'all' ? checkCountSize(category.count) : false} 
                    onClick={() => sortFoodList(category.category_name)}> { category.category_name } </button>
            // yung disabled kahit zero yung count ng all, excluded siya sa checkCountSize function
        )
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-3">
                    <h3 className="m-3"> Filter By: </h3>
                </div>
                <div className="col-sm-12 col-md-9 justify-content-center mb-2">
                    { categoryBtn }
                </div>
            </div>
            
        </div>
    )
}
