import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  { addFoodForm, updateFoodForm } from '../../redux/actions/FoodAction/foodAction'

export default function FoodInputs(foodInfoToEdit = {}) {

    const message = useSelector(state => state.foods.addFormMessage)

    const [foodInfo, setFoodInfo] = useState({
        foodSKU: '',
        foodImage: '',
        foodName: '',
        foodPrice: '',
        foodDescription: '',
        foodCategory: '',
        isAvailable: '',
    });

    const [isEdit, setEdit] = useState(false)

    const getFoodInfo = foodInfoToEdit.foodInfoToEdit

    const handleButtonName = () => isEdit === true ? "Update Food" : "Add Food"

    useEffect(() => {
        if (foodInfoToEdit.foodInfoToEdit) {
            setFoodInfo(getFoodInfo)
            setEdit(true)
        }
    }, [foodInfoToEdit, getFoodInfo])
      
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFoodInfo(prevState => ({
            ...prevState,
            [name]: value,
        }))
        if (name === 'foodImage') {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (event) => {
                setFoodInfo(prevState => ({
                    ...prevState,
                    [name]: event.target.result,
                }))
            }
        }
    }

    return (
        <div className="container mb-5">
            <form onSubmit={e => { e.preventDefault(); }}>
                <div className="form-group">
                    <label htmlFor="">Food SKU</label>
                    <input type="text"
                        className="form-control" name="foodSKU" value={foodInfo ? foodInfo.foodSKU : ""} onChange={handleChange}  aria-describedby="helpId" placeholder="Food SKU" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Food Image</label>
                    <input type="file"
                        className="form-control" name="foodImage" onChange={handleChange} aria-describedby="helpId" placeholder="Food Image" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Food Name</label>
                    <input type="text"
                        className="form-control" name="foodName" value={foodInfo ? foodInfo.foodName : ""} onChange={handleChange} aria-describedby="helpId" placeholder="Food Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Food Price</label>
                    <input type="text"
                        className="form-control" name="foodPrice" value={foodInfo ? foodInfo.foodPrice : ""} onChange={handleChange} aria-describedby="helpId" placeholder="Food Price" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Food Description</label>
                    <textarea className="form-control" name="foodDescription" value={foodInfo ? foodInfo.foodDescription : ""} onChange={handleChange} cols="30" rows="10"></textarea>
                </div>
                
                <div className="form-group">
                    <label htmlFor=""> Food Category </label>
                        <select name="foodCategory" defaultValue={getFoodInfo ? foodInfo.foodCategory : 'DEFAULT'} onChange={handleChange} className="form-control">
                            <option value="DEFAULT" disabled>Select Category...</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dessert">Dessert</option>
                            <option value="dinner">Dinner</option>
                        </select>
                </div>
                <div className="form-group">
                    <label> Is Available </label>
                    <select name="isAvailable" defaultValue={getFoodInfo ? foodInfo.isAvailable : 'DEFAULT'} onChange={handleChange} className="form-control">
                        <option value="DEFAULT" disabled>Select Availability...</option>
                        <option value="unavailable">Unavailable</option>
                        <option value="available">Available</option>
                    </select>
                </div>


                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" onClick={() => {
                        if (isEdit === true) {
                            dispatch(updateFoodForm(foodInfo))
                        }
                        else {
                            dispatch(addFoodForm(foodInfo))
                        }
                    }}>
                        { handleButtonName() }
                    </button>
                </div>
            </form>
        </div>
    )
}
