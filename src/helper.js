import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export const validateEmail = (email) => {
    const regexCode = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexCode.test(String(email).toLowerCase());
}

export const alertMessageSuccess = (message) => {
    return (
        <div className="alert alert-primary">
            <h3> <FontAwesomeIcon icon={faExclamationCircle} /> { message } </h3>
        </div>
    )
}

export const displayFoodCategory = (category) => {
    switch(category) {
        case "breakfast":
            return "Breakfast";
        case "lunch":
            return "Lunch";
        case "dessert":
            return "Dessert";
        case "dinner":
            return "Dinner"
        default:
    }
}

export const displayAvailability = (isAvailable) => {
    if (isAvailable === "available") {
        return "Available"
    }
    else {
        return "Unavailable"
    }
}
