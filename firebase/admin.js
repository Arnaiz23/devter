const admin = require("firebase-admin")

// const serviceAccount = require("./firebase-keys.json")
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG)

/* admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
}) */

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
} catch (e) {}

export const firestore = admin.firestore()
