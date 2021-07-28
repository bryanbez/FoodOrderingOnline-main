import React, { useState, useEffect } from 'react'
import QuantityTextBox from './QuantityTextBox'

export default function CartCard(params) {

    const [cartFoodInfo, setCartFoodInfo] = useState([])

    useEffect(() => {
        setCartFoodInfo(params.cartInfo)
        
    }, [params])

    const showFoodInfoCart = () => {
        if (cartFoodInfo.length !== 0) {
            return (       
                <div className="card mb-3" key={cartFoodInfo.docId}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={cartFoodInfo.foodInfo["foodImage"]} className="card-image-thumbnail rounded-start" alt="pagkain" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{cartFoodInfo.foodInfo["foodName"]}</h5>
                      <p className="card-text"><small className="text-muted"> {cartFoodInfo.foodInfo["foodCategory"]} </small></p>
                        <QuantityTextBox data={{
                            "quantity": cartFoodInfo.quantity,
                            "initialPrice": cartFoodInfo.initialPrice,
                            "docId": cartFoodInfo.docId
                        }}></QuantityTextBox>
                      <div className="input-group">
                      <div className="input-group-prepend">
                            <span className="input-group-text">Total Price</span>
                        </div>
                        <input type="text"
                            className="form-control" name="total_price" readOnly value={cartFoodInfo.totalPrice} aria-describedby="helpId" placeholder="Total Price" />
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            )
        }
    }

    return (       
       <>
       { showFoodInfoCart() }
       </>
    )
}
