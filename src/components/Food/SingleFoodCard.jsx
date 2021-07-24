import React from 'react'
import { displayAvailability, displayFoodCategory } from '../../helper'

export default function SingleFoodCard(foodInfo) {

    const { foodSKU, foodImage, foodName, foodPrice, foodDescription, foodCategory, isAvailable } = foodInfo.foodInfo

    const displayLoadingIfDataIsUnavailable = (foodInfo) => {
        if (foodInfo.foodInfo.length === 0) {
            return <div className="row">
                <h3> Loading... </h3> 
            </div>
        }
        else {
            return  <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col col-lg-9">
                            <h1 className="card-title">{foodName}</h1>
                            <h4 className="card-subtitle text-muted">{displayFoodCategory(foodCategory)} ({ displayAvailability(isAvailable) })</h4>
                        </div>
                        <div className="col col-lg-3">
                        <h1 className="card-title">₱ {foodPrice}</h1>
                        </div>
                    </div>
                
                </div>
                <img src={foodImage} alt=""/>
                <div className="card-body">
                    <h5 className="card-text">{foodDescription}</h5>
                    <button className="btn btn-primary card-link">Link 1</button>
                    <button className="btn btn-primary card-link">Link 2</button>
                </div>
              </div>
        }
    }

    return (
        <div className="container">
             { displayLoadingIfDataIsUnavailable(foodInfo) }
        </div>
       
    )
}
