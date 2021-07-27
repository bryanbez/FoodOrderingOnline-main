import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { clearSpecificFoodInfo } from '../../redux/actions/FoodAction/foodAction'
import FavoriteBtn from '../Favorites/FavoriteBtn'
import LoadingCircle from '../Loading/LoadingCircle'
import { Link } from 'react-router-dom'
import { addToCartAction } from '../../redux/actions/CartAction/cartAction.js'
import { useSelector } from 'react-redux'
import AlertInfo from '../Messages/AlertInfo'

export default function SingleFoodInfoStore(foodInfo) {

    const { id, foodImage, foodCategory, foodName, foodPrice, foodDescription, isAvailable} = foodInfo.foodInfo
    
    const getProfileInfo = useSelector((state) => state.profile.profileInfo)

    const dispatch = useDispatch()

    const addToCartItem = (foodDetails) => {
        dispatch(addToCartAction({
            "food_id": foodDetails.id,
            "initial_price": foodDetails.foodPrice,
            "user_id": getProfileInfo.docId
        }))
    }

    useEffect(() => {
        // return function cleaup() {
        //     //dispatch(clearSpecificFoodInfo())
        // }
    }, [dispatch])

    const displayLoadingIfDataIsUnavailable = (foodInfo) => {
        if (foodInfo.foodInfo.id) { 
            return (
                <div className="container mt-4">
                    <div className="row mt-3 mb-3">
                        <h2> Food Information </h2>
                    </div>
                    <div className="row mb-2">
                        <div className="col col-sm-12 col-md-6 col-lg-4 mb-2">
                            <div className="img-thumbnail">
                                <img src={foodImage} alt="foodImage" style={{ width: "100%", height: "20em" }}/>
                            </div>
                        </div>
                        <div className="col col-sm-12 col-md-6 col-lg-8 mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title"> { foodName } </h3>
                                <h5 className="card-subtitle mb-2 text-muted"> { foodCategory }</h5>
                                <hr />
                                <h1 className="card-title"> &#8369; { foodPrice } </h1>
                                <hr />
                                <div className="row">
                                    <div className="col col-sm-12 col-lg-4 d-flex justify-content-center mb-2">
                                        <button className="btn btn-outline-primary" onClick={() => addToCartItem({
                                                "id": id,
                                                "foodPrice": foodPrice
                                        })}> <FontAwesomeIcon icon={faCartPlus} /> Add To Cart </button>
                                    </div>
                                    <div className="col col-sm-12 col-lg-4 d-flex justify-content-center mb-2">
                                        <FavoriteBtn foodId={id}></FavoriteBtn>
                                    </div>
                                    <div className="col col-sm-12 col-lg-4 d-flex justify-content-center mb-2">
                                        <Link className="btn btn-outline-secondary" to="/store/list"> Back </Link>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="container">
                                       <AlertInfo></AlertInfo>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* Food Description */}
                    <div className="row mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">
                                    Food Description
                                </h3>
                                <h6 className="card-text">
                                    { foodDescription }
                                </h6>
                            </div>
                        </div>
                    </div>
                    {/* Ratings */}
                    <div className="row mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">
                                    Ratings
                                </h3>
                            </div>
                        </div>
                    </div>
                    {/* Comments */}
                    <div className="row mb-2">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">
                                    Comments
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
           return (
               <LoadingCircle></LoadingCircle>
           )
        }
    }

    return (
        <>
            { displayLoadingIfDataIsUnavailable(foodInfo) }
        </>
    )
}
