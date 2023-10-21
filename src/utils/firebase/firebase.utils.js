import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1S3aCuhZrInMqqcTZTlMgc11xOZjypN0",
  authDomain: "withbloom-ed430.firebaseapp.com",
  projectId: "withbloom-ed430",
  storageBucket: "withbloom-ed430.appspot.com",
  messagingSenderId: "1087202800945",
  appId: "1:1087202800945:web:4f7e1a4489655a6209ec10",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additonalInformation
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additonalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
