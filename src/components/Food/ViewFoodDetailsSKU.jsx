import React ,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificFoodBySKU } from '../../redux/actions/FoodAction/foodAction';
import SingleFoodInfoStore from './SingleFoodInfoStore';

export default function ViewFoodDetailsSKU(linkParams) {

    const { params } = linkParams.match;
    
    const dispatch = useDispatch()

    const getSpecificFoodInfo = useSelector((state) => state.foods.specificFoodInfo)

    useEffect(() => {
        if (params.sku) {
            dispatch(fetchSpecificFoodBySKU(params.sku))
        }
    }, [params, dispatch])

    return (
        <div className="container mb-2 mt-2">
           <SingleFoodInfoStore foodInfo={getSpecificFoodInfo}></SingleFoodInfoStore>
        </div>
    )
}
