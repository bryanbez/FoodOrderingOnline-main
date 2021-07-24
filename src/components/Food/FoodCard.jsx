/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link } from 'react-router-dom'

export default function FoodCard(food) {

    const { foodSKU, foodName, foodPrice, isAvailable, foodImage, foodCategory } = food.foodList

    return (
        <Link className="col-sm-6 col-md-4 col-lg-3 cursor-pointer" to={`/food/${foodSKU}`} style={{ textDecoration: "inherit", color: "black"}}>
            <div className="card border-secondary mb-4" >
                <img className="card-img-top card-image-thumbnail" src={foodImage} alt="food image"/>
                    <div className="card-body">
                    <h5 className="card-title"> { foodName } </h5>
                    <p className="card-text">{ foodCategory }</p>
                    </div>
                    <div className="card-footer">
                    <small className="text-muted">{ foodPrice }</small>
                    </div> 
            </div>
        </Link>
        
    )
}
