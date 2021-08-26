import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFoodInfoInCheckout } from '../../redux/actions/CheckoutAction/checkoutAction'
import FoodCardInCheckout from './FoodCardInCheckout'

export default function FoodInfoDisplay(foodInfo) {

    const { foodId } = foodInfo.foodInfo

    const getSpecificFoodInfo = useSelector((state) => state.checkout.foodInfo)

    const dispatch = useDispatch()

    useEffect(() => {
        if (getSpecificFoodInfo.length === 0) {
            dispatch(fetchFoodInfoInCheckout(foodId))
        }
    }, [getSpecificFoodInfo, dispatch, foodId])

    console.log(getSpecificFoodInfo)

    return (
        <>
            {
                getSpecificFoodInfo.map(food => <h3> { food.foodName } </h3>)
            }
        </>
    )
}
