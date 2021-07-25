import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteFoods } from '../../redux/actions/FavoriteAction/favoriteAction'
import FoodInfoCard from './FoodInfoCard'

export default function FavoriteFoodList() {

    const dispatch = useDispatch()
    const getProfileId = useSelector((state) => state.profile.profileInfo)
    const getAllFavoriteFoods = useSelector((state) => state.favorite.favoriteFoodList)

    useEffect(() => {
        if (getProfileId.docId) {
            dispatch(fetchFavoriteFoods(getProfileId.docId))
        }
    }, [getProfileId, dispatch])

    const fetchAllFoodInfo = getAllFavoriteFoods.map(value => {
        return (
            <FoodInfoCard key={value.foodId} foodInfo={value}></FoodInfoCard>
        )
    })

    return (
        <div>
            <div className="card-group">
               { fetchAllFoodInfo }
            </div>
        </div>
    )
}
