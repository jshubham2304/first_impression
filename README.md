# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
# first_impression

## Running the Project Locally

To run this project on your local machine, you must configure your Firebase credentials.

1.  **Set up Firebase:**
    *   Go to the Firebase Console (https://console.firebase.google.com/).
    *   Create a new Firebase project or use an existing one.
    *   In your project, go to Project Settings (click the gear icon).
    *   Under "Your apps", create a new Web app or use an existing one.
    *   Find and copy your Firebase configuration details (apiKey, authDomain, projectId, etc.).
    *   Enable Firestore and Storage in your Firebase project.

2.  **Configure Environment Variables:**
    *   In the root directory of this project, find the file named `.env.local.example`.
    *   Create a copy of this file and rename it to `.env.local`.
    *   Open `.env.local` and replace the placeholder values (like `YOUR_API_KEY`) with the actual credentials you copied from your Firebase project settings.

    Your `.env.local` file should look something like this:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy...rest_of_your_key"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="my-cool-project.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="my-cool-project"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="my-cool-project.appspot.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
    NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"
    ```
3. **Run the app**: Once your `.env.local` is configured, you can run the app without credential errors.
