import { credential } from 'firebase-admin'
import { initializeApp, getApp, App } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

let app: App

try {
  app = initializeApp({
    credential: credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    })
  })
} catch {
  app = getApp()
}

const auth = getAuth(app)

export {auth}
