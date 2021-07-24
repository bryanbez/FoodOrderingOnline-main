import React from 'react'
import { displayFoodCategory, displayAvailability } from '../../helper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function SingleFoodInfoStore(foodInfo) {

    const { id, foodSKU, foodImage, foodCategory, foodName, foodPrice, foodDescription, isAvailable } = foodInfo.foodInfo

    const displayLoadingIfDataIsUnavailable = (foodInfo) => {
        if (foodInfo) {
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
                                    <div className="col col-sm-6 col-lg-3">
                                        <button className="btn btn-outline-primary"> <FontAwesomeIcon icon={faCartPlus} /> Add To Cart </button>
                                    </div>
                                    <div className="col col-sm-6 col-lg-3">
                                        <button className="btn btn-outline-danger"> <FontAwesomeIcon icon={faHeart} /> Add To Favorites </button>
                                    </div>
                                    <div className="col col-sm-12 col-lg-6">
                                        { id }
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
               <div className="container">
                   <div className="row">
                       <h1> Loading ... </h1>
                   </div>
               </div>
           )
        }
    }

    return (
        <>
            { displayLoadingIfDataIsUnavailable(foodInfo) }
        </>
    )
}
