import * as firebase from "firebase/app"
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth"

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDdD7-nxwimdYRjvViqCrH41EQPfM2WpsI",
  authDomain: "devter-b92d1.firebaseapp.com",
  projectId: "devter-b92d1",
  storageBucket: "devter-b92d1.appspot.com",
  messagingSenderId: "270724186431",
  appId: "1:270724186431:web:648f9e5522a5cf1327538a",
  measurementId: "G-WKYKB2DGE4",
}
const app = firebase.initializeApp(firebaseConfig)

const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (userCredential) => {
  const { photoURL, displayName, uid } = userCredential

  return {
    avatar: photoURL,
    username: displayName,
    uid,
  }
}

export const onAuthStateChangedF = (onChange) => {
  return onAuthStateChanged(getAuth(), (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth()
  return signInWithPopup(auth, githubProvider).then((userCredential) => {
    const { photoURL, displayName, uid } = userCredential.user

    return {
      avatar: photoURL,
      username: displayName,
      uid,
    }
  })
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    userId,
    userName,
    content,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return getDocs(collection(db, "devits")).then(({ docs }) => {
    return docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      const date = new Date(createdAt.seconds * 1000)
      const normalizeCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)
      return { ...data, id, createdAt: normalizeCreatedAt }
    })
  })
}
