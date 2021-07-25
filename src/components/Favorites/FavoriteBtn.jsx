import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { addToFavorites, removeFavoriteFood, isFoodAlreadyFavorite } from '../../redux/actions/FavoriteAction/favoriteAction'
 
export default function FavoriteBtn(foodId) {

    const dispatch = useDispatch()

    const getProfileInfo = useSelector((state) => state.profile.profileInfo)
    const getIsFoodAlreadyFavorite = useSelector((state) => state.favorite.alreadyFavorite)

    useEffect(() => {
        dispatch(isFoodAlreadyFavorite(foodId.foodId))
    }, [dispatch, foodId])

    const addToFoodFavorites = () => {
        dispatch(addToFavorites({
            "food_id": foodId.foodId,
            "user_id": getProfileInfo.docId
        }))
        dispatch(isFoodAlreadyFavorite(foodId.foodId))
    }

    const dislikeFavoriteFood = () => {
        dispatch(removeFavoriteFood(foodId))
    }
 
    return (
        <div>
            <button className="btn btn-outline-danger" onClick={() => getIsFoodAlreadyFavorite === true ? dislikeFavoriteFood() : addToFoodFavorites()}> 
                    <FontAwesomeIcon icon={getIsFoodAlreadyFavorite === true ? faHeartBroken : faHeart} /> 
                    {getIsFoodAlreadyFavorite === true ? " Remove from Favorites" : " Add to Favorites"} 
            </button>
        </div>
    )
}
