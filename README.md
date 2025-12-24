# LearnSet: AI-Powered Study Platform

## Description

LearnSet is a comprehensive web application designed to empower students, particularly those following the **Maharashtra State Board of Technical Education (MSBTE)** curriculum.

It solves the problem of scattered and outdated study materials by providing a **one-stop hub** for:

- High-quality notes
- Previous Year Questions (PYQs)
- An intelligent AI assistant trained specifically on the entire MSBTE syllabus

## Features

- **Centralized Resources**  
  Access up-to-date, high-quality study notes and Previous Year Questions (PYQs) — all in one place

- **AI-Powered Assistant**  
  Ask questions and get instant, context-aware answers from an AI trained on the MSBTE curriculum

- **Secure User Accounts**  
  Register and log in to track your progress and personalize your learning experience

- **Password Management**  
  Secure email-based password reset system

- **Fully Responsive Design**  
  Clean, fast, mobile-first user interface that works beautifully on any device

## Tech Stack

- **Framework:** Next.js (App Router) + React  
- **Language:** TypeScript  
- **Backend & Database:** Firebase (Firestore + Firebase Authentication)  
- **Styling:** Tailwind CSS  
- **Email Delivery:** Nodemailer  
- **Background Jobs:** Inngest  

## Target Audience

Primarily built for students enrolled in **MSBTE diploma programs**, but useful for any technical education student looking for structured study resources.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/learnset.git
   cd learnset
   
2. **Install dependencies**
    ```bash
    npm install

3. **Set up environment variables**
    <br>Create a ```.env.local``` file in the root directory and add the required variables (see Configuration below).

4. **Run the development server**
    ```
    npm run dev

## Configuration

Create ```.env.local``` in the project root and add:

```
# ─────────────── Firebase Public (client-side) ───────────────
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# ─────────────── Firebase Admin SDK (server-side) ───────────────
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_CLIENT_EMAIL="your-client-email"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# ─────────────── Email (Nodemailer + Gmail) ───────────────
EMAIL="your-gmail-address@gmail.com"
EMAIL_PASS="your-gmail-app-password"

# ─────────────── Application ───────────────
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# ─────────────── Inngest (optional) ───────────────
INNGEST_EVENT_KEY="your-inngest-event-key"
```

> _**Important**: Never commit your ```.env.local``` to version control_

## Usage

After running ```npm run dev```, you can:
* Create a new account
* Log in
* Browse notes & PYQs
* Use the AI assistant on the Ask AI page

## Project Structure

```
app/                  → App Router pages & layouts
├── (auth)/           → Login, Register, Forgot Password
├── (pages)/          → Main app pages (Home, About, Ask AI, etc.)
├── api/              → Serverless API routes
components/           → Reusable UI components
lib/                  → Utilities, Firebase init, nodemailer, etc.
public/               → Static files (images, fonts…)
```

## Contributing

We welcome contributions!

1. Fork the repository
2. Create your feature branch
    
    ```
    git checkout -b feature/amazing-feature

3. Commit your changes

    ```
    git commit -m 'Add some amazing feature'

4. Push to the branch
    ```
    git push origin feature/amazing-feature
5. Open a Pull Request

## Testing

Testing setup is under development. Information about running tests will be added soon.

## License
This project is licensed under the **MIT License** — see the LICENSE file for details.

## Author

* __Sayyed Mudassir__ - [GitHub](https://github.com/SayyedMudassir2) · [Initial work & maintainer]