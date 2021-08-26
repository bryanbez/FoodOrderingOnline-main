import React from 'react'

export default function FoodCardInCheckout(foodInfo) {

    const { foodImage, foodName, foodCategory } = foodInfo.foodInfo

    return (
        <div>
             <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-2">
                    <img src={foodImage} className="img-thumbnail rounded-start" width="200" height="200" alt="..." />
                    </div>
                    <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{foodName}</h5>
                        <p className="card-text"><small className="text-muted">{foodCategory}</small></p>
                    </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}
