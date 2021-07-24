import React, { useEffect } from 'react'
import  { fetchSpecificFood, clearSpecificFoodInfo } from '../../redux/actions/FoodAction/foodAction'
import { useDispatch, useSelector } from 'react-redux';
import SingleFoodCard from './SingleFoodCard';

export default function EditFoodDetails({ match }) {

    const fetchedSpecificFoodInfo = useSelector((state) => state.foods.specificFoodInfo)
    const dispatch = useDispatch()
    const docId = match.params.id

    useEffect(() => {
        dispatch(fetchSpecificFood(docId))
        return () => {
            dispatch(clearSpecificFoodInfo())
        }
    }, [dispatch, docId])

    return (
        <div className="container mt-4 mb-5">
            <SingleFoodCard foodInfo={fetchedSpecificFoodInfo}/>
        </div>
    )
}
