
import * as admin from 'firebase-admin';

const serviceAccountB64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountB64) {
  throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set or is empty.');
}

// Decode the Base64 string to a JSON string
const serviceAccountJson = Buffer.from(serviceAccountB64, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(serviceAccountJson);

// Check if there are any initialized apps and initialize one if not
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
