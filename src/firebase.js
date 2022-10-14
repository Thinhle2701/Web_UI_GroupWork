// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7LpbHNCa-2tLFgq32N8e4SBXJTR20jUI",
  authDomain: "ecommerce-image-product.firebaseapp.com",
  projectId: "ecommerce-image-product",
  storageBucket: "ecommerce-image-product.appspot.com",
  messagingSenderId: "975205157731",
  appId: "1:975205157731:web:6984383f26dad077d56156",
  measurementId: "G-15FPM46Y31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)