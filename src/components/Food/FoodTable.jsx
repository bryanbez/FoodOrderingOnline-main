import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import  { readFoodInfo, archiveFood, restoreFood } from '../../redux/actions/FoodAction/foodAction'
import { useDispatch, useSelector } from 'react-redux';

export default function FoodTable() {

    const fetchedFoodList = useSelector((state) => state.foods.foodList)
    const archiveFoodMessage = useSelector((state) => state.foods.archiveFoodMessage)
    const lengthOfFoodList = fetchedFoodList.length;
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (lengthOfFoodList === 0) {
            dispatch(readFoodInfo())
        }
    }, [dispatch, fetchedFoodList, lengthOfFoodList]);


    const renderFoodList = fetchedFoodList.map((food) => {
     
        const { id, foodName, foodPrice, isAvailable, isArchived} = food
        return (
            <tr key={id}>
                <td> { foodName } </td>
                <td> { foodPrice } </td>
                <td> { isAvailable }</td>
                <td> <Link to={`/store/${id}/view`}> <button className="btn btn-primary">View</button></Link></td>
                <td> <Link to={{ pathname: `/store/${id}/edit`, query: food } }>  <button className="btn btn-secondary">Edit</button></Link></td>
                <td> <button className={isArchived === false ? "btn btn-danger" : "btn btn-success"} onClick={() => isArchived === false ? archiveFoodInfo(id) : restoreFoodInfo(id)}> { isArchived === false ? "Archived" : "Restore" }</button></td>
            </tr>   
        )
    })


    const archiveFoodInfo = (foodId) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure to remove this food info?")) {
            dispatch(archiveFood(foodId))
        }
    }

    const restoreFoodInfo = (foodId) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure to restore this food info?")) {
            dispatch(restoreFood(foodId))
        }
    }

    const displayArchiveFoodMessage = () => {
        setTimeout(() => {
            dispatch(restoreFood(null))
        }, 3000)
        return (
            <div className="alert alert-primary" hidden={(!archiveFoodMessage ? true : false)} role="alert">
                { archiveFoodMessage }
            </div>
        ) 
    }

    const showLoading = () => {
        return (
            <div className="alert alert-primary" role="alert"> <h2> Loading .... </h2> </div>
        )
    }

    const showContent = () => {
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Is Available</th>
                        <th colSpan="3">Options</th>
                    </tr>
                </thead>
                <tbody>
                    { renderFoodList }
                </tbody>
            </table>
        )
    }

    return (
        <div>
            { displayArchiveFoodMessage() }
            { (lengthOfFoodList === 0 ? showLoading() : showContent())}
        </div>
    
    )
}
