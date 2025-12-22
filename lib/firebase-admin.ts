
import * as admin from 'firebase-admin';

// Ensure the service account JSON is parsed correctly from the environment variable
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// Check if there are any initialized apps and initialize one if not
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
