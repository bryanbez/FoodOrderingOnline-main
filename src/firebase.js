import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBezwYWUjH7xkB8HsmbX-crCAGICE2hVnQ",
    authDomain: "storeapp-eee5c.firebaseapp.com",
    projectId: "storeapp-eee5c",
    storageBucket: "storeapp-eee5c.appspot.com",
    messagingSenderId: "323982053105",
    appId: "1:323982053105:web:9b07f58e91a777614b6350",
    measurementId: "G-EE67PKGYSW"
}

const registerConfig = firebase.initializeApp(config)

const firestoreDB = registerConfig.firestore();
const firebaseStorage = registerConfig.storage();

export const firebaseAll = firebase
export const foodDB = firestoreDB.collection("products")
export const foodCategoryDB = firestoreDB.collection("food_category")
export const archivedFood = firestoreDB.collection("archived_food")
export const profileDB = firestoreDB.collection("profile")
export const userFavoriteFoodDB = firestoreDB.collection("user_favorite_food")
export const cartDB = firestoreDB.collection("cart")
export const voucherDB = firestoreDB.collection("voucher")
export const courierDB = firestoreDB.collection("courier")
export const checkoutDB = firestoreDB.collection('checkout')

export const foodImageStorage = firebaseStorage.ref('food_images/')

export const appAuthentication = registerConfig.auth()
export const appAuthPersistent = registerConfig.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)