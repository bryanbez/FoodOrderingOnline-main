
import React, { useEffect } from 'react'
import FoodCard from '../../components/Food/FoodCard'
import  { readFoodInfo } from '../../redux/actions/FoodAction/foodAction'
import { useDispatch, useSelector } from 'react-redux';
import SearchFood from '../../components/Food/SearchFood';
import SortFood from '../../components/Food/SortFood';
import LoadingCircle from '../../components/Loading/LoadingCircle';

export default function FoodList() {

    const fetchFoodList = useSelector((state) => state.foods.foodList)
    const dispatch = useDispatch()
    const lengthOfFoodList = fetchFoodList.length; // prevent infinite loop of fetchfoodList
    
    useEffect(() => {
        setTimeout(() => {
            if (lengthOfFoodList === 0) {
                dispatch(readFoodInfo())
            }
           }, 3000)
    }, [dispatch, fetchFoodList, lengthOfFoodList])

    const loopFoodList = () => {
        if (fetchFoodList.foodList) {
            return fetchFoodList.foodList.map(food => <FoodCard key={food.id} foodList={food}></FoodCard>)
        }
        else {
            return (
                <LoadingCircle></LoadingCircle>
            )
        }
        
    }

    const showLoading = () => {
        return (
            <div className="alert alert-primary" role="alert"> <h2> Loading .... </h2> </div>
        )
    }

    const showContent = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6">
                            <SearchFood></SearchFood>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-12">
                            <SortFood sortBy={fetchFoodList.sortBy}></SortFood>
                    </div>
                </div>

                <div className="row">
                    { loopFoodList() }
                </div>
            </div>
        )
    }

    return (
        <>
        { (fetchFoodList === 0 ? showLoading() : showContent()) }
        </>
    )
}
