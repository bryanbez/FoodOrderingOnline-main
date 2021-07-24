import React ,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificFoodBySKU } from '../../redux/actions/FoodAction/foodAction';
import SingleFoodInfoStore from './SingleFoodInfoStore';
import { addToFavorites, fetchSpecificFavoriteFood } from '../../redux/actions/FavoriteAction/favoriteAction'
import { fetchUserInfo } from '../../redux/actions/ProfileAction/profileAction'

export default function ViewFoodDetailsSKU(linkParams) {

    const { params } = linkParams.match;
    
    const dispatch = useDispatch()

    const getSpecificFoodInfo = useSelector((state) => state.foods.specificFoodInfo)

    const getLoggedInDisplayName = useSelector(state => state.auth.display_name)
    const getProfileInfo = useSelector((state) => state.profile.profileInfo)
    const getIsFoodAlreadyFavorite = useSelector((state) => state.favorite.alreadyFavorite)

   useEffect(() => {
       if (getProfileInfo.length === 0) {
           dispatch(fetchUserInfo(getLoggedInDisplayName))
       }
       if (getSpecificFoodInfo.id) {
            dispatch(fetchSpecificFavoriteFood(getSpecificFoodInfo.id))
       }
       
   }, [dispatch, getLoggedInDisplayName, getProfileInfo, getSpecificFoodInfo])

   const mergeFavoriteToFoodInfo = {
       ...getSpecificFoodInfo,
       "isFavorite": getIsFoodAlreadyFavorite 
   }


    useEffect(() => {
        if (params.sku) {
            dispatch(fetchSpecificFoodBySKU(params.sku))
        }
    }, [params, dispatch])

    return (
        <div className="container mb-2 mt-2">
           <SingleFoodInfoStore foodInfo={mergeFavoriteToFoodInfo}></SingleFoodInfoStore>
        </div>
    )
}
