import { InitalizeApp, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
};
  // initallize app

  initializeApp(firebaseConfig)

  // get firestore

  const db = getFirestore()

  // get auth

  const auth = getAuth()


// get storage

const storage = getStorage()

// get functions

const functions = getFunctions()




export { db, auth, storage, functions}


