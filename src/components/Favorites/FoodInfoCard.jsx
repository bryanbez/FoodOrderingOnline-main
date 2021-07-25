import React, { useEffect } from 'react'
import FavoriteBtn from './FavoriteBtn'

export default function FoodInfoCard(props) {

    const { foodId, foodName, foodCategory, foodImage, foodPrice } = props.foodInfo
    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="card border-secondary m-2" >
                <img className="card-img-top card-image-thumbnail" src={foodImage} alt="foodImage" />
                    <div className="card-body">
                        <h5 className="card-title"> { foodName } </h5>
                        <p className="card-text">{ foodCategory }</p>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">&#8369; { foodPrice }</small>
                    </div> 
                    <div className="card-footer">
                        <FavoriteBtn foodId={foodId}></FavoriteBtn>
                    </div> 
            </div>
        </div>
    )
}
